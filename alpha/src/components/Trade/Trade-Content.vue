<template>
      <div class="exchange-content trade-page">
        <b-container>
            <b-row class="row-exchange">
                <b-col xl="9" class="row-col-exchange">
                    <b-row class="row-exchange">
                        <b-col lg="12" class="row-col-exchange mb-3">
                            <div class="exchange-content-top">
                                <div class="exchange-content-top-item">
                                    <div><span>{{ tradeToken.tokenName }}</span> / TRX</div>
                                    <!-- <div>{{$t('message.tradeBitcoint')}}</div> -->
                                </div>
                                <div class="exchange-content-top-item">
                                    <div>{{$t('message.trade.LastPrice')}}</div>
                                    <div v-if="tradeToken && tradeToken.lastPrice">
                                      <span class="up mr-1"><span :class="{down:(checkMarketToken < 0) , up :(checkMarketToken > 0 )}">{{ numberWithCommas(tradeToken.lastPrice , 6) }}</span></span> <span>${{numberWithCommas(tradeToken.lastPrice * priceUsdOnTrx,6 , 6)}}</span>
                                    </div>
                                    <div v-else>_</div>

                                   <!--  <div>{{$t('message.tradeLastPrice')}}</div>
                                    <div>
                                      <span class="up mr-1">{{tradeToken.lastPrice}}</span> <span>${{displayFloatValue(tradeToken.lastPrice * 0.03222,tradeSortByDecimal)}}</span></div> -->
                                </div>
                                <div class="exchange-content-top-item">
                                    <div>{{$t('message.trade.Change')}}</div>
                                    <div v-if="tradeToken && tradeToken.lastPrice">
                                      <span class="up mr-1"
                                       :class="{down:(!displayCssByPrice(tradeToken.lastPrice,tradeToken.price)) , up :(displayCssByPrice(tradeToken.lastPrice,tradeToken.price))}">
                                       {{numberWithCommas(tradeToken.lastPrice  -  tradeToken.price , 6)}}
                                     </span>  
                                      <span class="up" v-if="tradeToken.price == 0 || tradeToken.price  == 'undefined'">+ {{displayFloatValuePercent(get24hChange(tradeToken))}}%</span>

                                      <span v-else >

                                            <span class="up" >
                                              {{displayOperater(tradeToken.lastPrice  , tradeToken.price)}} 
                                            </span>

                                      <span :class="{down : (((tradeToken.lastPrice  -  tradeToken.price) / tradeToken.price) * 100 <0) ,
                                                    up : (((tradeToken.lastPrice  -  tradeToken.price) / tradeToken.price) * 100 >= 0) 
                                        }">
                                        {{displayFloatValuePercent(get24hChange(tradeToken))}}%
                                      </span>

                                    </span>
                                    </div>
                                    <div v-else>_</div>
                                </div>
                                <div class="exchange-content-top-item">
                                    <div>{{$t('message.trade.High')}}</div>
                                    <div v-if="tradeToken && tradeToken.lastPrice">
                                      <span>{{ numberWithCommas(tradeToken.high  , 6) }}</span>
                                    </div>
                                    <div v-else>_</div>
                                </div>
                                <div class="exchange-content-top-item">
                                    <div>{{$t('message.trade.Low')}}</div>
                                    <div v-if="tradeToken && tradeToken.lastPrice">
                                      <span>{{ numberWithCommas(tradeToken.low  , 6) }}</span>
                                    </div>
                                    <div v-else>_</div>
                                </div>
                                <div class="exchange-content-top-item">
                                    <div>{{$t('message.trade.Volume')}}</div>
                                    <div v-if="tradeToken && tradeToken.lastPrice">
                                      <span>{{numberWithCommas(tradeToken.volume)}} TRX</span>
                                    </div>
                                    <div v-else>_</div>
                                </div>
                            </div>
                        </b-col>  
                        <b-col lg="4" class="row-col-exchange" style="padding: 0 2px;padding-left: 0">
                            <TradeOrderListSell />
                        </b-col>
                        <b-col lg="8" class="row-col-exchange">
                            <TradeChart />
                            <TradeToken />
                        </b-col>
                    </b-row>
                </b-col>
                <b-col xl="3" class="row-col-exchange">
                    <TradeMarket />
                    <TradeOrderHistory />
                    <!-- <TradeRecentMarketActivity /> -->
                </b-col>
                 <b-col xl="12" class="row-col-exchange">
                    <MyOrder />
                 </b-col>
            </b-row>
        </b-container>
      </div>
</template>

<script>
  import TradeOrderListSell from './Trade-Order-List-Sell.vue'
  import TradeMarket from './Trade-Market.vue'
  import TradeOrderHistory from './Trade-Order-History.vue'
  import TradeRecentMarketActivity from './Trade-Recent-Market-Activity.vue'
  import TradeChart from './Trade-Chart.vue'
  import TradeToken from './Trade-Token.vue'
  import MyOrder from '../Elements/MyOrder.vue'
  import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    TradeOrderListSell,
    TradeMarket,
    TradeOrderHistory,
    TradeRecentMarketActivity,
    TradeChart,
    TradeToken,
    MyOrder
  },
  data () {
      return {
        tradeDetail: {},
      }
    },
    computed: {
      ...mapGetters([
        'tradeListToken',
        'tradeIdActive',
        'tradeToken',
        'priceLastTrade',
        'tradeSortByDecimal',
        'priceUsdOnTrx',
        'checkMarketToken'
      ])
    },
    mounted () {
      
    },
    methods:{

      /*----------------------- VALIDATE , CHECK , EVENT -----------------------*/
     
    numberWithCommas(x, decimals = 3) {
        if (isNaN(x) == true) x = 0;
        x = parseFloat(x).toFixed(decimals);
        x  = x.split(".");
        x[0] = x[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        x = x.join('.');
        return x;
    },
      get24hChange(tradeDetail) {
        if (!tradeDetail) return 0;
        if (!tradeDetail.lastPrice) tradeDetail.lastPrice = 0;
        if (tradeDetail.price == 0 && tradeDetail.lastPrice > 0) return 100;
        if (tradeDetail.price == 0 && tradeDetail.lastPrice <= 0) return 0;
        return ((tradeDetail.lastPrice  -  tradeDetail.price) / tradeDetail.price) * 100;
      },
      displayCssByPrice(lastPrice, price){
          if((parseFloat(lastPrice)  - parseFloat(price) >= 0) ||  price == 0){
              return true;
              
          }else{
              return false;
          }
      },
      displayOperater(lastPrice , price){
          if(price == 0){
            return '+';
          }else if(((parseFloat(lastPrice)  - parseFloat(price)) / parseFloat(price)) >=0){
            return '+';
          }
      },
      displayPercentPrice(lastPrice , price){
          lastPrice = parseFloat(lastPrice);
          price     = parseFloat(price);
          if((lastPrice - price) / price * 100  >= 0 ){
            return true;
          }else{
            return false;
          }
      },
      displayFloatValue(value, num = 6) {
        if (isNaN(value) == true) value = 0;
        return parseFloat(value).toFixed(num); 
      },
      displayFloatValuePercent(value, num = 2) {
        return parseFloat(value).toFixed(num); 
      },
    }
}
</script>
<style type="text/css">
  .up{
    color: green;
  }
  .down{
    color: red;
  }
</style>