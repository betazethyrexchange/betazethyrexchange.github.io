<template>
  <div class="exchange-mid-bottom mb-3">
    <b-tabs>
      <!-- <b-tab > -->
        <!-- <div class="zethyr-fee">
            <span class="trading-fee">
              Trading Power: {{ numberWithCommas(displayFloatValue(tradingPowerPageTrade)) }} (Free Trading Quota {{ numberWithCommas(displayFloatValue(tradingPowerPageTrade)) }} TRX)  
            </span>
            <span class="trading-fee-set">
              <a target="_blank" href="/#/trading-power">Set</a>/ 
              <a target="_blank" href="/#/trading-power">Detail</a> 
            </span>
        </div>   -->
        <div class="trade-current cursor">
          <label class="cursor" @click="showMarket">{{ tradeToken.tokenName }} / TRX</label>
          <img src="../../../assets/images/arrowdown.png" @click="showMarket">
        </div>
        <div class="buy-sell-btc p-3">
          <b-tabs content-class="mt-3" v-model="tabBuySellIndex">
            <b-tab :title="buy">
               <div class="buy-btc buy-sell-btc-col">
                <div class="mb-3"><span>{{numberWithCommas(userBalance)}} TRX</span></div>

                <div class="item">
                  <label>{{$t('message.label.price')}}</label>
                  <div class="input-group mb-1 input-group-coin">
                    <b-form-input :value="buyPriceToken" name="buyPriceToken"  @focus.native="onFocusBuyPrice($event)"    type="number" step="0.000001" min="0.000001"></b-form-input>
                    <div class="input-group-append">
                      <span class="input-group-text">TRX</span>
                    </div>
                  </div>
                  <div class="info-error">
                  <!-- <span class="error" v-if="checkBuyPrice">{{$t('message.errPriceTrade')}}</span> -->
                  <span class="error">{{textMessageErrBuyPrice}}</span>
                  </div>
                </div>

                <div class="item">
                  <label>{{$t('message.label.amount')}}</label>
                  <div class="input-group mb-1 input-group-coin">
                    <b-form-input :value="buyAmountToken"  @focus.native="onFocusBuyAmount($event)"  name="buyAmountToken" placeholder="0.000" type="number" step="0.001" min="0.001"></b-form-input>
                    <div class="input-group-append">
                      <span class="input-group-text">{{ tradeToken.tokenName }}  </span>
                    </div>
                  </div>
                  <div class="info-error mb-2">
                  <!-- <span class="error" v-if="textMessageErrBuy == true">{{$t('message.errTrade')}}</span>
                  <span class="error" v-if="checkBuyAmount">{{$t('message.errAmountTrade')}}</span> -->
                  <span class="error">{{textMessageErrBuyAmount}}</span>
                  </div>
                  <div class="list-btn">
                    <button type="button" @click="buyTokenPercent(25)">25%</button>
                    <button type="button" @click="buyTokenPercent(50)">50%</button>
                    <button type="button" @click="buyTokenPercent(75)">75%</button>
                    <button type="button" @click="buyTokenPercent(100)">100%</button>
                  </div>
                </div>

                <div class="item">
                  <label>{{$t('message.trade.total')}} <span>{{ buyAmountTrx }} TRX</span></label>
                </div>
                <button type="button" @click="showModal" style="margin-bottom: 5px;" v-if="!accountActive()"><span>{{$t('message.menu.Login')}}</span>  {{$t('message.menu.Or')}}  <span>{{$t('message.menu.Register')}}</span> {{$t('message.menu.Totrade')}}</button>
                <button type="button"  v-on:click="buyTokens"  v-if="accountActive()">{{$t('message.trade.buy')}}</button>

              </div>
            </b-tab>
            <b-tab :title="sell">
               <div class="sell-btc buy-sell-btc-col">
                <div class="mb-3"><span>{{numberWithCommas(displayFloatValue(userToken))}} {{ tradeToken.tokenName }}</span></div>
                <div class="item">
                  <label >{{$t('message.label.price')}}</label>
                  <div class="input-group mb-1 input-group-coin">
                    <b-form-input :value="sellPriceToken"  name="sellPriceToken"  @focus.native="onFocusSellPrice($event)" type="number" step="0.000001" min="0.000001"></b-form-input>
                    <div class="input-group-append">
                      <span class="input-group-text">TRX</span>
                    </div>
                  </div>
                  <div class="info-error">
                    <span class="error">{{textMessageErrSellPrice}}</span>
                  </div>
                </div>
                
                <div class="item">
                  <label>{{$t('message.label.amount')}}</label>
                  <div class="input-group mb-1 input-group-coin">
                    <b-form-input :value="sellAmountToken"     @focus.native="onFocusSellAmount($event)"  name="sellAmountToken" placeholder="0.000" type="number" step="0.001" min="0.001"></b-form-input>
                    <div class="input-group-append">
                      <span class="input-group-text">{{ tradeToken.tokenName }}</span>
                    </div>
                  </div>
                  <div class="info-error mb-2">
                    <span class="error">{{textMessageErrSellAmount}}</span>
                  </div>
                  <div class="list-btn">
                    <button type="button" @click="sellTokenPercent(25)">25%</button>
                    <button type="button" @click="sellTokenPercent(50)">50%</button>
                    <button type="button" @click="sellTokenPercent(75)">75%</button>
                    <button type="button" @click="sellTokenPercent(100)">100%</button>
                  </div>
                </div>
                <div class="item">
                  <label>{{$t('message.trade.total')}} <span>{{ sellAmountTrx }} TRX</span></label>
                </div>
                <button  @click="showModal" style="margin-bottom: 5px;"  v-if="!accountActive()"><span>{{$t('message.menu.Login')}}</span>  {{$t('message.menu.Or')}}  <span>{{$t('message.menu.Register')}}</span> {{$t('message.menu.Totrade')}}</button>
                <button  @click="sellTokens" v-if="accountActive()">{{$t('message.trade.sell')}}</button>
              </div>
            </b-tab>
          </b-tabs>
         
         
        </div>
      <!-- </b-tab> -->
      <!-- <b-tab title="Market">
        <p>This is Page Market</p>
      </b-tab>
      <b-tab title="Stop-Limit">
        <p>This is Page Stop-Limit</p>
      </b-tab> -->
    </b-tabs>
    <b-modal ref="modal-register" class="modal-unlock"  hide-footer hide-header>
          <div class="d-block">
                         <b-row align-h="between" class="header">
                            <b-col cols='9' >
                              <h4 class="title">{{$t('message.register.register')}}</h4>
                            </b-col>
                            <b-col cols='3'>
                               <button type="button" aria-label="Close" class="close" @click="hideModal()"><img src="../../../assets/images/exit.png"></button>
                            </b-col>
                          </b-row>
                          <p style="color: black">{{$t('message.register.registerText')}}</p>
                      </div>
                      <b-button class="btn-lock mb-3" style="width: 100% !important ; " @click="registerAccount" >{{$t('message.register.registerButon')}}</b-button>
                      <p style="color: black"><a target="_blank" href="https://www.tronlink.org">{{$t('message.register.registerClickHere')}}</a></p>
    </b-modal>
    <TradeMarket ref='mobile-trade-market'/>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import { ZtrNetwork } from '../../../js/ZtrNetwork.js'; 
  import TRONWEB from '../../../js/tron-web.js';

  import TradeMarket from './TradeMarket.vue'

  import ConfigSessionKey from '../../../../../config/session.key.js'
  export default {
    components: {
      TradeMarket
    },
    data () {
      return {
        tabBuySellIndex: 0,
        buy: '',
        sell: '',
        textMessageErrSellAmount:'',
        textMessageErrSellPrice:'',
        sellPriceToken: '',
        sellAmountToken: '',
        sellAmountTrx: '0.000000',

        buyPriceToken: '',
        buyAmountToken: '',
        buyAmountTrx: '0.000000',
        textMessageErrBuyAmount:'',
        textMessageErrBuyPrice : '',

        keywords:'',
        checkBuyPrice : false,
        checkBuyAmount : false,

        checkSellPrice:false,
        checkSellAmout:false,

        messageErr:false,
        textMessageErrBuy:false,
        textMessageErrSell:false
      }
    },
    computed: {
      ...mapGetters([
        'tradeHistoryList',
        'tradingPowerPageTrade',
        'tradeListToken',
        'tradeIdActive',
        'tradeOrderBuyActive',
        'tradeOrderSellActive',
        'tradeCheckLogin',
        'userBalance',
        'userToken',
        'checkRegister',
        'tradeToken',
        'loadPage',
        'priceLastTrade',
        'accountAddress',
        'tradePriceToken'
      ])
    },
    mounted () {
      let self = this;
      this.buy = self.$t('message.trade.buy');
      this.sell = self.$t('message.trade.sell');
      this.makeJqueryEvent();
      this.onOrderBuyActiveChange();
      this.onOrderSellActiveChange();
      this.onTradePriceChange();
      this.onAccountChange();
      this.onPairChange();
      this.setPriceTokenDefault();
    },
    methods: {
      /** ---------------------------------------------------------------------------------------------------------
      * Action Map By Store
      *  ----------------------------------------------------------------------------------------------------------
      */
      ...mapActions([
          'setUserActiveRegister'
      ]),

      /*--------------------------------- INIT ---------------------------------*/

      /*--------------------------- ON CHANGE STORE ----------------------------*/

      onAccountChange() {
        this.$store.watch(
          (state)=>{
            return this.$store.getters.accountAddress;
          },
          (val)=>{
              this.textMessageErrSellAmount = '';
              this.textMessageErrSellPrice = '';
              this.textMessageErrBuy= '';
              this.textMessageErrSell='';
              this.textMessageErrBuyPrice = '';
              this.textMessageErrBuyAmount = '';
              this.sellAmountTrx = '';
              this.sellAmountToken = '';
              this.buyAmountTrx = '';
              this.buyAmountToken = '';
          },
          {
            deep:true
          }
        ); 
      },
      onPairChange() {
        this.$store.watch(
          (state)=>{
            return this.$store.getters.tradeIdActive
          },
          (val)=>{
           //something changed do something
              this.setPriceTokenDefault();
              this.textMessageErrBuy= '';
              this.textMessageErrSell='';
              this.sellAmountTrx = '';
              this.sellAmountToken = '';
              this.textMessageErrSellAmount = '';
              this.textMessageErrSellPrice = '';
              this.textMessageErrBuyPrice = '';
              this.textMessageErrBuyAmount = '';
              this.buyAmountTrx = '';
              this.buyAmountToken = '';
          },
          {
            deep:true
          }
        ); 
      },
      onOrderBuyActiveChange() {
        this.$store.watch(
          (state)=>{
            return this.$store.getters.tradeOrderBuyActive
          },
          (val)=>{
           //something changed do something
            this.textMessageErrSellAmount = '';
            this.textMessageErrSellPrice = '';
            this.textMessageErrBuyPrice = '';
            this.textMessageErrBuyAmount = '';
            this.buyAmountTrx = '';
            this.buyAmountToken = '';
            this.buyPriceToken   = parseFloat(this.displayFloatValue(val.price, 6));
            this.sellPriceToken  = parseFloat(this.displayFloatValue(val.price, 6));
            this.sellAmountToken = parseFloat(this.displayFloatValue(val.tokens, 3));
            this.sellAmountTrx   = parseFloat(this.displayFloatValue(this.sellPriceToken * this.sellAmountToken, 6));
            if (this.sellAmountToken > this.userToken){
                this.sellAmountToken = parseFloat(this.displayFloatValue(this.userToken, 3));
                this.sellAmountTrx = parseFloat(this.displayFloatValue(this.sellPriceToken * this.sellAmountToken, 6));
            }
          },
          {
            deep:true
          }
        ); 
      },
      onOrderSellActiveChange() {
        this.$store.watch(
          (state)=>{
            return this.$store.getters.tradeOrderSellActive
          },
          (val)=>{
           //something changed do something
            this.textMessageErrSellAmount = '';
            this.textMessageErrSellPrice = '';
            this.textMessageErrBuyPrice = '';
            this.textMessageErrBuyAmount = '';
            this.sellAmountTrx = '';
            this.sellAmountToken = '';
            this.buyPriceToken  = parseFloat(this.displayFloatValue(val.price, 6));
            this.sellPriceToken = parseFloat(this.displayFloatValue(val.price, 6));
            this.buyAmountToken = parseFloat(this.displayFloatValue(val.tokens, 3));
            this.buyAmountTrx   = parseFloat(this.displayFloatValue(this.buyAmountToken * this.buyPriceToken * (1001/1000), 6));
            if (this.buyAmountTrx > this.userBalance + 10) {
                // // this.buyAmountToken = parseFloat(this.displayFloatValue(this.userBalance / val.price , 6));
                let balance = parseInt((this.userBalance - 10) / (1001 / 1000));
                if (balance <= 0) {
                  this.buyAmountTrx = '';
                  this.buyAmountToken = '';
                } else {
                  this.buyAmountTrx   = parseFloat(this.displayFloatValue(balance, 6)); 
                  this.buyAmountToken = this.displayFloatValue(this.buyAmountTrx / this.buyPriceToken, 3);
                  this.buyAmountTrx   = this.displayFloatValue((this.buyPriceToken * this.buyAmountToken) * (1001/1000), 6);
                }
            }
          },
          {
            deep:true
          }
        ); 
      },

      onTradePriceChange() {
        this.$store.watch(
          (state)=>{
            return this.$store.getters.tradePriceToken
          },
          (val)=>{
              this.textMessageErrSellPrice = '';
              this.textMessageErrSellAmount = '';
              this.textMessageErrBuyPrice = '';
              this.textMessageErrBuyAmount = '';
              this.buyPriceToken = parseFloat(this.displayFloatValue(val, 6));
              this.sellPriceToken = parseFloat(this.displayFloatValue(val, 6));
              this.sellAmountTrx = '';
              this.sellAmountToken = '';
              this.buyAmountTrx = '';
              this.buyAmountToken = '';
          },
          {
            deep:true
          }
        ); 
      },

      /*----------------------- VALIDATE , CHECK , EVENT -----------------------*/
      onFocusBuyAmount(event){
        this.textMessageErrBuyAmount = '';
      },
      onFocusBuyPrice(event){
        this.textMessageErrBuyPrice = '';
      },
      onFocusSellAmount(event){
        this.textMessageErrSellAmount = '';
      },
      onFocusSellPrice(event){
        this.textMessageErrSellPrice = '';
      },
       numberWithCommas(x, decimals = 3) {
        if (isNaN(x) == true) x = 0;
        x = parseFloat(x).toFixed(decimals);
        x  = x.split(".");
        x[0] = x[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        x = x.join('.');
        return x;
    },
     
      setPriceTokenDefault() {
        let self = this;
        let tradeHistoryList = this.tradeHistoryList;
        if (!this.tradeHistoryList || !this.tradeHistoryList[this.$route.params.id]) {
          return setTimeout(() => {
            self.setPriceTokenDefault();
          }, 100);
        }
        let lastPrice = this.tradeHistoryList[this.$route.params.id][0] ? this.tradeHistoryList[this.$route.params.id][0].price : 0;
        this.buyPriceToken  =  lastPrice;
        this.sellPriceToken =  lastPrice;
      },
      changeTabBuySellIndex(idx) {
        this.tabBuySellIndex = idx;
      },
      makeJqueryEvent() {
        const REGEX_PRICE = /\d{0,99}(\.\d{0,6})?/;
        const REGEX_TOKEN = /\d{0,99}(\.\d{0,3})?/;
        let self = this;
        $(function() {
          makeEventChangeBuyPrice();
          makeEventChangeSellPrice();
          makeEventChangeBuyAmount();
          makeEventChangeSellAmount();
        });
        function makeEventChangeBuyPrice() {
          $('input[type=number][name="buyPriceToken"]').on('input', function() {
            this.value = this.value.match(REGEX_PRICE)[0];
            self.buyPriceToken = this.value;
            if(self.buyPriceToken.length > 0){
                self.buyAmountTrx = self.displayFloatValue((self.buyPriceToken * self.buyAmountToken) * (1001/1000), 6);
            }
          });
        }
        function makeEventChangeSellPrice() {
          $('input[type=number][name="sellPriceToken"]').on('input', function() {
            this.value = this.value.match(REGEX_PRICE)[0];
            self.sellPriceToken = this.value;
            if (self.sellPriceToken.length > 0) {
              self.sellAmountTrx = self.displayFloatValue(self.sellAmountToken * self.sellPriceToken, 6);
            }
          });
        }
        function makeEventChangeBuyAmount() {
          $('input[type=number][name="buyAmountToken"]').on('input', function() {
            this.value = this.value.match(REGEX_TOKEN)[0];
            self.buyAmountToken = this.value;
            if(self.buyAmountToken.length > 0 ){
              self.buyAmountTrx = self.displayFloatValue((self.buyPriceToken * self.buyAmountToken) * (1001/1000), 6);
            }
          });
        }
        function makeEventChangeSellAmount() {
          $('input[type=number][name="sellAmountToken"]').on('input', function() {
            this.value = this.value.match(REGEX_TOKEN)[0];
            if(this.value > self.userToken){
              self.messageErr = true;
            }else if( this.value==0.000){
              self.messageErr = false;
            }else{
              self.messageErr = false; 
            }
            self.sellAmountToken = this.value;
            if (self.sellAmountToken.length > 0) {
                self.sellAmountTrx = self.displayFloatValue(self.sellAmountToken * self.sellPriceToken, 6);
            }
          });
        }    
      },
      accountActive() {
        if (this.checkRegister == true && this.tradeCheckLogin == false) {
          return true;
        }
        return false;
      },
      displayFloatValue(value, num = 3) {
        return parseFloat(value).toFixed(num); 
      },
      buyTokenPercent(value){
        this.textMessageErrBuyAmount = '';
        if(this.userBalance - 10 < 0 ){
            this.buyAmountToken = 0 ;
            return;
        }
        this.checkBuyAmount = false;
        if(this.buyPriceToken == ''){
          this.checkBuyPrice = true;
        } else {
              this.checkBuyPrice = false;
              let balance = parseInt((this.userBalance - 10) / (1001 / 1000));
              let buyAmountTrx = (value / 100) * (balance);
              this.buyAmountTrx   = this.displayFloatValue(buyAmountTrx); 
              this.buyAmountToken = this.displayFloatValue(this.buyAmountTrx / this.buyPriceToken);
              this.buyAmountTrx   = this.displayFloatValue((this.buyPriceToken * this.buyAmountToken) * (1001/1000), 6);
        }
      },
      sellTokenPercent(value){
        this.textMessageErrSellAmount = '';
          this.checkSellAmout = false;
          if(this.sellPriceToken == ''){
              this.sellAmountTrx = 0;
          }
          this.sellAmountToken =  Math.floor(((value /100) * this.userToken));
          this.sellAmountTrx = this.displayFloatValue(this.sellPriceToken * this.sellAmountToken, 6);
      },
      showMarket() {
         this.$refs['mobile-trade-market'].showModal();
      },
      showModal() {
        this.$refs['modal-register'].show()
      },
      hideModal() {
        this.$refs['modal-register'].hide()
      },

      /*---------------------------- LOAD , GET DATA ---------------------------*/
      getTradeToken(){
        var tradeToken = this.tradeListToken.filter(token=>{
          if(token.tokenPair == this.$route.params.id){
              return token;
          }
        })
        return tradeToken[0];
      },

      /*------------------------------- FUNCTION -------------------------------*/

      buyTokens() {
        /* validate token address */
        let self = this;
        let tradeDetail = this.getTradeToken();
        if (!tradeDetail) return false;
        let tokenBridgeAddr = tradeDetail.tokenBridgeAddr;
        let tokenDecimals   = tradeDetail.tokenDecimals;
        if (tokenBridgeAddr == '') return false;

        /* validate from */
        
        if((this.buyPriceToken == 0 || this.buyPriceToken =='' )&& (this.buyAmountToken == '' || this.buyAmountToken == 0)){
          this.textMessageErrBuyPrice = this.$t('message.errPriceTrade');
          this.textMessageErrBuyAmount = this.$t('message.errAmountTrade');
          return false;
        }
        else if(this.buyPriceToken > 0 && (this.buyAmountToken == '' || this.buyAmountToken == 0)){
          this.textMessageErrBuyPrice = '';
          this.textMessageErrBuyAmount = this.$t('message.errAmountTrade');
          return false;
        }
        else if(this.buyAmountToken > 0 && (this.buyPriceToken == '' || this.buyPriceToken == 0)){
          this.textMessageErrBuyAmount = '';
          this.textMessageErrBuyPrice = this.$t('message.errPriceTrade');
          return false;
        }
        else if(this.buyAmountTrx  < 10){
          this.textMessageErrBuyPrice = '';
          this.textMessageErrBuyAmount = this.$t('message.errTrade');
          return false;
        }
        else if(parseFloat(this.buyAmountTrx)   -  parseFloat(this.userBalance) > 0){
          this.textMessageErrBuyPrice = '';
          this.textMessageErrBuyAmount = this.$t('message.errTokenEnoght');
          return false;
        }
        else{
          this.textMessageErrBuyPrice = '';
          this.textMessageErrBuyAmount = '';
        }


        /*---------------* handle *----------------------*/
        ZtrNetwork.buyTokens({ tokenBridgeAddr, tokens: this.buyAmountToken, price: this.buyPriceToken, tokenDecimals }, function (err) {
            self.buyAmountToken = '';
            self.buyAmountTrx = '';
            if(err){
              return console.log(err);
            }
        });
      },
      sellTokens() {
        let self = this;
        let tradeDetail = this.getTradeToken();
        if (!tradeDetail) return false;
        let tokenType = tradeDetail.tokenType;
        let trcTokenId = tradeDetail.trcTokenId;
        let tokenAddr = tradeDetail.tokenAddr;
        let tokenDecimals = tradeDetail.tokenDecimals;
        let tokenBridgeAddr = tradeDetail.tokenBridgeAddr;
        
        if((this.sellAmountToken == 0  || this.sellAmountToken == 0 ) && (this.sellPriceToken == '' || this.sellPriceToken == '')){
            this.textMessageErrSellPrice = this.$t('message.errPriceTrade');
            this.textMessageErrSellAmount = this.$t('message.errAmountTrade');
            return false;
        }
        else if(this.sellAmountToken > 0 && (this.sellPriceToken == '' || this.sellPriceToken == '')){
            this.textMessageErrSellAmount = '';
            this.textMessageErrSellPrice = this.$t('message.errPriceTrade');
            return false;
        }
        else if(this.sellPriceToken > 0 && (this.sellAmountToken == '' || this.sellAmountToken == '')){
            this.textMessageErrSellPrice = '';
            this.textMessageErrSellAmount = this.$t('message.errAmountTrade');
            return false;
        }else if(this.sellAmountTrx < 10){
            this.textMessageErrSellPrice = '';
            this.textMessageErrSellAmount = this.$t('message.errTrade');
            return false;
        }
        else if(this.sellAmountToken > this.userToken){
            this.textMessageErrSellPrice = '';
            this.textMessageErrSellAmount = this.$t('message.errTokenEnoght');
            return false;
        }
        else{
            this.textMessageErrSellAmount = '';
            this.textMessageErrSellPrice = '';
        }


       /*---------------* handle *----------------------*/
        initTokenContract();
        function initTokenContract() {
          if (tokenType != 2) return sell();
          tronWeb
            .contract()
            .at(tokenAddr)
            .then(approveTokens)
            .catch(error);
        }
        function approveTokens(tokenContract) {
          tokenContract
            .approve(tokenBridgeAddr, tronWeb.toHex(self.sellAmountToken * (10 ** tokenDecimals)))
            .send()
            .then(sell)
            .catch(error);
        } //sellTokensTRC10
        function sell() {
          if (tokenType == 2) {
            ZtrNetwork.sellTokensTRC20({ tokenBridgeAddr, tokens: self.sellAmountToken, price: self.sellPriceToken, tokenDecimals } , function(err) {
              self.sellAmountToken = '';
              self.sellAmountTrx = '';
            });
          } else {
            ZtrNetwork.sellTokensTRC10({ tokenBridgeAddr, tokens: self.sellAmountToken, price: self.sellPriceToken, tokenDecimals, tokenId: parseInt(trcTokenId) } , function(err) {
              self.sellAmountToken = '';
              self.sellAmountTrx = '';
            });
          }
        }
        function error(e) { 
          return console.log(e); 
        }  
      },
      registerAccount() {
        let self = this;
        ZtrNetwork.registerAccount((err, status) => {
          if (err) return false;
          if (status == false) return false;
          self.setUserActiveRegister(true);
          self.hideModal();
        });
      }
    }
  }
</script>
