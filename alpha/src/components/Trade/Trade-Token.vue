<template>
  <div class="exchange-mid-bottom mb-3">
    <b-tabs>
      <!-- <b-tab > -->
        <div class="zethyr-fee">
            <span class="trading-fee">
              {{$t('message.trade.YourTradingPower')}}: {{ numberWithCommas(displayFloatValue(tradingPowerPageTrade)) }} ({{$t('message.trade.freeTradingQuota')}} {{ numberWithCommas(displayFloatValue(freeTradingQuota)) }} TRX)  
            </span>
            <span class="trading-fee-set">
              <a target="_blank" href="/#/trading-power"> {{$t('message.trade.setText')}}</a>/ 
              <a target="_blank" href="/#/trading-power"> {{$t('message.trade.detail')}}</a> 
            </span>
        </div>  
        <div class="buy-sell-btc p-3">

          <div class="buy-btc buy-sell-btc-col">
            <div class="mb-3"><span class="title">{{$t('message.trade.buy')}} {{ tradeToken.tokenName }}</span><span class="float-right">{{numberWithCommas(userBalance)}} TRX</span></div>

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
              <label>{{$t('message.trade.total')}}</label>
              <div class="input-group">
                <b-form-input v-model="buyAmountTrx"  readonly placeholder="0.000000" type="number"></b-form-input>
                <div class="input-group-append">
                  <span class="input-group-text">TRX</span>
                </div>
              </div>
            </div>
            <button type="button" @click="showModal" style="margin-bottom: 5px;" v-if="!accountActive()"><span>{{$t('message.menu.Login')}}</span>  {{$t('message.menu.Or')}}  <span>{{$t('message.menu.Register')}}</span> {{$t('message.menu.Totrade')}}</button>
            <button type="button"  v-on:click="buyTokens"  v-if="accountActive()">{{$t('message.trade.buy')}}</button>

          </div>
          <div class="sell-btc buy-sell-btc-col">
            <div class="mb-3"><span class="title">{{$t('message.trade.sell')}} {{ tradeToken.tokenName }}</span> <span class="float-right">{{numberWithCommasWithMathfloor(userToken)}} {{ tradeToken.tokenName }}</span></div>
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
              <label>{{$t('message.trade.total')}}</label>
              <div class="input-group">
                <b-form-input v-model="sellAmountTrx" readonly placeholder="0.000000" type="number"></b-form-input>
                <div class="input-group-append">
                  <span class="input-group-text">TRX</span>
                </div>
              </div>
            </div>
            <button  @click="showModal" style="margin-bottom: 5px;"  v-if="!accountActive()"><span>{{$t('message.menu.Login')}}</span>  {{$t('message.menu.Or')}}  <span>{{$t('message.menu.Register')}}</span> {{$t('message.menu.Totrade')}}</button>
            <button  @click="sellTokens" v-if="accountActive()">{{$t('message.trade.sell')}}</button>
          </div>
        </div>
      <!-- </b-tab> -->
      <!-- <b-tab title="Market">
        <p>This is Page Market</p>
      </b-tab>
      <b-tab title="Stop-Limit">
        <p>This is Page Stop-Limit</p>
      </b-tab> -->
    </b-tabs>

    <!-- -------------- MODAL ------------------- -->
    <b-modal ref="modal-register" class="modal-unlock"  hide-footer hide-header>
          <div class="d-block">
                         <b-row align-h="between" class="header">
                            <b-col cols='9' >
                              <h4 class="title">{{$t('message.register.register')}}</h4>
                            </b-col>
                            <b-col cols='3'>
                               <button type="button" aria-label="Close" class="close" @click="hideModal()"><img src="../../assets/images/exit.png"></button>
                            </b-col>
                          </b-row>
                          <p style="color: black">{{$t('message.register.registerText')}}</p>
                      </div>
                      <b-button class="btn-lock mb-3" style="width: 100% !important ; " @click="registerAccount" >{{$t('message.register.registerButon')}}</b-button>
                      <p style="color: black"><a target="_blank" href="https://www.tronlink.org">{{$t('message.register.registerClickHere')}}</a></p>
    </b-modal>



    <b-modal ref="modal-check-login" class="modal-unlock-2"  hide-footer hide-header>

            <div class="d-block">
              <div class="header-modal clearfix">
                  <button type="button" aria-label="Close" class="close" @click="hideModalCheckLogin()"><img src="../../assets/images/exit.png"></button>
                  <h2 class="text-center">{{$t('message.err.errorCccurred')}}</h2>
               </div>
              <div class="modal-info">
                  <h6 class="text-center">{{$t('message.err.errorTronlinkCannot')}}</h6>
              </div>
            </div>
                      
    </b-modal>


    <b-modal ref="modal-check-switch-node" class="modal-unlock-2"  hide-footer hide-header>
                      <div class="d-block">
                        <div class="header-modal clearfix">
                            <button type="button" aria-label="Close" class="close" @click="hideModalCheckSwitchNode()"><img src="../../assets/images/exit.png"></button>
                            <h2 class="text-center">{{$t('message.err.errorCccurred')}}</h2>
                        </div>
                        <div class="modal-info">
                            <h6 class="text-center">
                                <span>{{$t('message.err.errorTronlink')}}</span>
                                <span style="font-weight: bold">{{$t('message.err.errNodeName')}}</span>
                                <span>{{$t('message.err.errNetwork')}}</span>
                            </h6>
                            <h6 class="text-center">
                                <span>{{$t('message.err.errorCurrently')}}</span>
                                <span style="font-weight: bold">{{$t('message.err.errorCurrentlyNodeName')}}</span>
                                <span>{{$t('message.err.errorNetworkInstead')}}</span>
                            </h6>
                          </div>
                      </div>
                      
    </b-modal>

    

    <!-- --------------END MODAL ------------------- -->


  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import { ZtrNetwork } from '../../js/ZtrNetwork.js'; 
  import MYTronWeb from './../../js/tron-web.js';

  import ConfigSessionKey from '../../../../config/session.key.js'
  export default {
    
    data () {
      return {
        textMessageErrSellAmount:'',
        textMessageErrSellPrice:'',
        sellPriceToken: '',
        sellAmountToken: '',
        sellAmountTrx: '',

        buyPriceToken: '',
        buyAmountToken: '',
        buyAmountTrx: '',
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
        'freeTradingQuota',
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
                let balance = parseFloat((this.userBalance - 10) / (1001 / 1000));
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
      numberWithCommasWithMathfloor(x, decimals = 3) {
        if (isNaN(x) == true) x = 0;
        x =  (Math.floor(x* 1000) / 1000).toFixed(decimals);
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
              let balance = parseFloat((this.userBalance - 10) / (1001 / 1000));
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
      showModal() {
        if (typeof(window.tronWeb) === 'undefined') {
          this.showModalCheckLogin();
        } else if(tronWeb.fullNode.host != process.env.FUll_NODE && tronWeb.fullNode.host != process.env.FUll_NODE_DEFAULT) {
          this.showModalCheckSwitchNode();
        } else if (MYTronWeb.getAccount() == false) {
          this.showModalCheckLogin();
        } else {
          this.$refs['modal-register'].show();
        }
      },
      hideModal() {
        this.$refs['modal-register'].hide();
      },
      showModalCheckLogin(){
        this.$refs['modal-check-login'].show();
      },
      hideModalCheckLogin() {
        this.$refs['modal-check-login'].hide();
      },
      showModalCheckSwitchNode(){
        this.$refs['modal-check-switch-node'].show();
      },
      hideModalCheckSwitchNode() {
        this.$refs['modal-check-switch-node'].hide();
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


        /* Check Node*/
        
        let switchNode = tronWeb.fullNode.host;


        if(switchNode != process.env.FUll_NODE){
            this.showModalCheckSwitchNode();
        }

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



        /* Check Node*/


        let switchNode = tronWeb.fullNode.host;
        if(switchNode != process.env.FUll_NODE){
            this.showModalCheckSwitchNode();
        }

        /* validate from */

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
