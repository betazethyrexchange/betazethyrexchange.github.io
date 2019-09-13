<template>
  <div class="exchange-mid-top mb-3">
    <!-- TradingView Widget BEGIN -->
    <div class="tradingview-widget-container">
      <div id="chart_container"></div>
    </div>
    <!-- TradingView Widget END -->
  </div>
</template>

<script>

  import { mapGetters, mapActions } from 'vuex';
  import { widget } from '../../charting_library.min';
  import CandleApi from '../../api/candle';
  import ConfigSessionKey from '../../../../config/session.key.js'


  function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }


  function getLanguageFromURL() {
    const regex = new RegExp('[\\?&]lang=([^&#]*)');
    const results = regex.exec(window.location.search);
    return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }
  export default {
    data () {
      return {
        loading: true,
        totalChange: 0,
        chart: null,
        feed: null,
        saved_chart: null,
        onRealtimeCallback: null,
        pair: '',
        type: '',
        symbol: 'ANTE / TRX',
        userId: 'public_user_id',
        clientId: 'zethyr.exchange',
        bars: []
      }
    },
    computed: {
      ...mapGetters([
        'tradeToken',
        'tradeIdActive',
        'tradeListToken',
      ])
    },
    created() {    
      this.makeSocketEvent();
    },
    mounted() {
      this.initData();
      this.onTradeChange();
    },
    destroyed() {
      if (this.chart !== null) {
        this.chart.remove();
        this.chart = null;
      }
    },
    methods: {
      makeSocketEvent() {
        let self = this;
        let socket = io(process.env.URL_BACKEND);
        socket.on('chart-change', function(data) {
          if (data.pair == self.pair && data.type == self.type && self.onRealtimeCallback && self.loading == false && data.candleNew) {
            let candleNew = {
              time: parseFloat(data.candleNew.time),
              close: parseFloat(data.candleNew.close),
              open: parseFloat(data.candleNew.open),
              high: parseFloat(data.candleNew.high),
              low: parseFloat(data.candleNew.low),
              volume: parseFloat(data.candleNew.volume)
            };
            self.loading = true;
            self.onRealtimeCallback(candleNew);
            self.loading = false;
          }
        });
      },
      changePair() {
        if(this.chart && this.feed){
          this.feed._fireEvent('pair_change');
          this.chart.activeChart().resetData();
          this.chart.activeChart().setSymbol(this.symbol, function(e){
            // console.log("GOWNO :: proba zmiany");
          });
        }
      },
      onTradeChange() {
        let self = this;
        this.$store.watch(
          (state)=>{
            return this.$store.getters.tradeIdActive;
          },
          (val)=>{
           //something changed do something
            let tradeDetail = self.tradeListToken ? self.getTradeDetail(self.tradeListToken, val) : [];
            if (!tradeDetail) return false;
            let tokenName = tradeDetail.tokenName;
            let symbolNew = tokenName + ' / TRX';
            if (self.loading == false && self.symbol != symbolNew) {
              self.symbol = symbolNew;
              self.changePair();
            }
          },
          {
            deep:true
          }
        ); 
      },
      initData() {
        let self = this;
        let tradeToken = this.tradeToken;
        if (!tradeToken || !tradeToken.tokenPair) {
          return setTimeout(() => {
            self.initData();
          }, 300);
        }
        self.symbol = tradeToken.tokenName + ' / TRX';
        self.initChart();
      },
      initChart() {
        let self = this;
        self.feed = self.createFeed();
      
        const widgetOptions = {
          "width": '100%',
          "height": 455,
          "timezone": "UTC",
          "theme": getParameterByName('theme'),
          "style": "1",
          "toolbar_bg": "#fff",
          "symbol": this.symbol,
          // BEWARE: no trailing slash is expected in feed URL
          "datafeed": self.feed,
          "interval": '5',
          "container_id": 'chart_container',
          "library_path": '../../../public/charting_library/',

          "locale": getLanguageFromURL() || 'en',
          "enable_publishing": false,
          "allow_symbol_change": true,
          "hideideas": true,
          "loading_screen": { backgroundColor: "#000000",foregroundColor: "#000000" },//todo:do it
          drawings_access: {
            type: 'black',
            // tools: [{name: "Regression Trend"}]//todo: moje
            tools: [{name: "Trend Line", grayed: true}, {name: "Trend Angle", grayed: true}] //todo: bb
          },
            time_frames: [
                        {text: "5m", resolution: "5"},
                        {text: "15m", resolution: "15"},
                        {text: "30m", resolution: "30"},
                        {text: "1h", resolution: "60"},
                        {text: "4h", resolution: "240"},
                        {text: "1d", resolution: "1D"},
                        {text: "1w", resolution: "1W"},
                        {text: "1Mo", resolution: "1M"},
            ],
            disabled_features: [
                        "header_symbol_search",
                        "header_interval_dialog_button",
                        // "symbol_search_hot_key",
                        // "study_dialog_search_control",
                        "display_market_status",
                        "header_compare",
                        "edit_buttons_in_legend",
                        "datasource_copypaste",
                        "volume_force_overlay",
                        "go_to_date"
          ],

          enabled_features: [
              // "save_chart_properties_to_local_storage",
          ],
          overrides: {
            // "mainSeriesProperties.style": 0,
            // "symbolWatermarkProperties.color" : "#944",
            "volumePaneSize": "medium",
            "paneProperties.topMargin": 21,
            "paneProperties.bottomMargin": 5,
          },
          studies_overrides: {
            // "bollinger bands.median.color": "#33FF88",
            "bollinger bands.upper.linewidth": 7
          },
          // debug: true,
        
          custom_css_url: 'chart.css',
          charts_storage_url: 'http://saveload.tradingview.com',
          charts_storage_api_version: "1.1",
          client_id: this.clientId,
          user_id: this.userId,
        };

        const chart = new widget(widgetOptions);
        this.chart = chart;
      },
      getChartData(type, listenerGUID, onRealtimeCallback) {
        let self = this;
        let tradeToken = this.tradeToken;
        if (!tradeToken || !tradeToken.tokenPair) {
          return setTimeout(() => {
            self.getChartData(type, listenerGUID, onRealtimeCallback);
          }, 1000);
        }
        const betweenTime = {
          '5': 5 * 60 * 1000,
          '15': 15 * 60 * 1000,
          '30': 30 * 60 * 1000,
          '60': 60 * 60 * 1000,
          '240': 240 * 60 * 1000,
          '1D': 24 * 60 * 60 * 1000,
          '1W': 7* 24 * 60 * 60 * 1000,
          '1M': 30* 24 * 60 * 60 * 1000
        };
        let now = (new Date()).getTime();
        let params = {
          type: type,
          pair: tradeToken.tokenPair,
          limit: 1000
        };
        self.loading = true;
        self.pair = params.pair;
        self.type = params.type;
        self.onRealtimeCallback = onRealtimeCallback;
        
        let currentChartData = [];
        let startTime;
        let chartData = self.$session.get(ConfigSessionKey.chartData);
        if (!chartData) chartData = {};

        if (chartData[listenerGUID] && chartData[listenerGUID].length > 0) {
          currentChartData = chartData[listenerGUID];
          startTime = chartData[listenerGUID][chartData[listenerGUID].length - 1].time;
        }
        if (startTime) {
          params.startTime = startTime;
        }
        if (startTime && startTime + betweenTime[type] > now) {
          return initBars(currentChartData);
        }
        
        loadData();
        function loadData() {
          CandleApi
            .getCandleList(params)
            .then(response)
            .catch(error);
        }
        function response(res) {
          if (res.code != 'SUCCESS') return false;
            let bars = [...currentChartData, ...res.data.candleList];
            chartData[listenerGUID] = bars;
            if (chartData[listenerGUID].length > params.limit) {
              chartData[listenerGUID] = chartData[listenerGUID].slice(chartData[listenerGUID].length - params.limit, chartData[listenerGUID].length);
            }
            self.$session.set(ConfigSessionKey.chartData, chartData);
            initBars(bars);
          }
        function initBars(bars) {

          // console.log(bars);

          if (bars.length == 0) {
            bars.push({
              time: parseFloat( process.env.TIME_ZTR_NETWORK_DEPLOY),
              close: 0,
              open: 0,
              high: 0,
              low: 0,
              volume: 0
            });
          }

          bars.forEach(item => {
            onRealtimeCallback(item);
          });
          self.loading = false;
        }  
        function error(e) {
          console.log(e);
        }
      }, 
      createFeed() {
        let self = this;
        let Datafeed = {};

        Datafeed.DataPulseUpdater = function(datafeed, updateFrequency) {

        };
        Datafeed.DataPulseUpdater.prototype.periodLengthSeconds = function(resolution, requiredPeriodsCount) {
          var daysCount = 0;

          if (resolution === 'D') {
            daysCount = requiredPeriodsCount;
          } else if (resolution === 'M') {
            daysCount = 31 * requiredPeriodsCount;
          } else if (resolution === 'W') {
            daysCount = 7 * requiredPeriodsCount;
          } else {
            daysCount = requiredPeriodsCount * resolution / (24 * 60);
          }

          return daysCount * 24 * 60 * 60;
        };

        Datafeed.DataPulseUpdater.prototype.subscribeDataListener = function(symbolInfo, resolution, newDataCallback, listenerGUID) {
          if (!this._subscribers.hasOwnProperty(listenerGUID)) {
            this._subscribers[listenerGUID] = {
              symbolInfo: symbolInfo,
              resolution: resolution,
              lastBarTime: NaN,
              listeners: []
            };
          }
          this._subscribers[listenerGUID].listeners.push(newDataCallback);
        };

        Datafeed.DataPulseUpdater.prototype.unsubscribeDataListener = function(listenerGUID) {

        };

        Datafeed.Container = function(updateFrequency){
          this._configuration = {
            supports_search: false,
            supports_group_request: false,
            supported_resolutions: ['5', '15', '30', '60', '240', '1D', '1W', '1M'],
            supports_marks: true,
            supports_timescale_marks: true,
            exchanges: ['ZTR_EXCHANGE']
          };

          this._barsPulseUpdater = new Datafeed.DataPulseUpdater(this, updateFrequency || 10 * 1000);
          // this._quotesPulseUpdater = new Datafeed.QuotesPulseUpdater(this);

          this._enableLogging = true;
          this._callbacks = {};

          this._initializationFinished = true;
          this._fireEvent('initialized');
          this._fireEvent('configuration_ready');
        };

        Datafeed.Container.prototype._fireEvent = function(event, argument) {

            if (this._callbacks.hasOwnProperty(event)) {

              var callbacksChain = this._callbacks[event];
              for (var i = 0; i < callbacksChain.length; ++i) {
                callbacksChain[i](argument);
              }

              this._callbacks[event] = [];
            }
        };

        Datafeed.Container.prototype._logMessage = function(message) {
          if (this._enableLogging) {
            var now = new Date();
          }
        };

        Datafeed.Container.prototype.on = function(event, callback) {
          if (!this._callbacks.hasOwnProperty(event)) {
            this._callbacks[event] = [];
          }

          this._callbacks[event].push(callback);
          return this;
        };

        Datafeed.Container.prototype.onReady = function(callback) {
          let that = this;
          if (this._configuration) {
            setTimeout(function() {
              callback(that._configuration);
            }, 0);
          }
          else {
            this.on('configuration_ready', function() {
              callback(that._configuration);
            });
          }
        };

        Datafeed.Container.prototype.resolveSymbol = function(symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {
          let timezone = 'Europe/Warsaw';
    

            Promise.resolve().then(() => {

              function adjustScale() {
                if(self.last_price>1000)
                  return 100;
                else
                  return 100000000;
              }
              onSymbolResolvedCallback({
                "name": self.symbol,
                "timezone": timezone,
                "pricescale": adjustScale(),
                "minmov": 1,
                "minmov2": 1,
                "ticker": self.symbol,
                // "description": "",
                "session": "24x7",
                "type": "bitcoin",
                // "exchange-traded": "[ZTR_EXCHANGE]:+" + symbolName,
                // "exchange-listed": "myExchange",
                "has_intraday": true,
                "intraday_multipliers": ['5', '15', '30', '60', '240', '1D', '1W', '1M'], //It is an array containing intraday resolutions (in minutes) the datafeed wants to build by itself. E.g., if the datafeed reported he supports resolutions ["1", "5", "15"], but in fact it has only 1 minute bars for symbol X, it should set intraday_multipliers of X = [1]. This will make Charting Library to build 5 and 15 resolutions by itself.
                "has_weekly_and_monthly": true,
                "has_no_volume": false,
                "regular_session": "24x7"
              });
            })
        };

        Datafeed.Container.prototype.getBars = function(symbolInfo, resolution, rangeStartDate, rangeEndDate, onDataCallback, onErrorCallback) {
          if (rangeStartDate > 0 && (rangeStartDate + '').length > 10) {
            throw new Error(['Got a JS time instead of Unix one.', rangeStartDate, rangeEndDate]);
          }
          onDataCallback([], { noData: true });
        };

        Datafeed.Container.prototype.subscribeBars = function(symbolInfo, resolution, onRealtimeCallback, listenerGUID, onResetCacheNeededCallback) {
          self.getChartData(resolution, listenerGUID, onRealtimeCallback);
        };

        Datafeed.Container.prototype.unsubscribeBars = function(listenerGUID) {
          this._barsPulseUpdater.unsubscribeDataListener(listenerGUID);
        };

        return new Datafeed.Container;
      },
      adjustChart() {
        let chart_iframe = $("#chart_container").find("iframe");
        let chart_top = chart_iframe.contents().find(".header-chart-panel");
        let chart_top_container = chart_iframe.contents().find(".header-chart-panel-content");
        let chart_bottom = chart_iframe.contents().find(".date-range-wrapper");

        chart_bottom.appendTo(chart_top_container);
      },
      getTradeDetail(tradeList, pair) {
        var tradeDetail = tradeList.filter(trade=>{
          if(trade.tokenPair == pair){
              return trade;
          }
        });
        return tradeDetail[0];
      }
    },
   
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>