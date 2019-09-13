<template>
  <div  style="overflow: hidden;">         
      <MarketView />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
// components
import MarketView from './../../view/Market/';
import { Trade } from '../../js/Trade.js'; 
// API
import ThirdPartyApi from '../../api/thirdParty';

import HomeTradeAPi from '../../api/home';

import ConfigSessionKey from '../../../../config/session.key.js';

export default {
  name: 'market',
  components: {
    MarketView,
  },
  computed: {
    ...mapGetters([
      'tradeListToken',
    ])
  },
  data () {
    return {
      isSocketEmit: false
    }
  },
  created() {
    this.getCoinList();
    this.convertTrxToUsd();
  },
  mounted(){
    let self = this;
    let updateTradeListInterval = self.$session.get(ConfigSessionKey.updateTradeListInterval);
    self.updateTradeList();
    this.intervalPageMarket = setInterval(() => {
      self.updateTradeList();
    }, 1000);
    self.$session.set(ConfigSessionKey.updateTradeListInterval, updateTradeListInterval);
  },
  destroyed() {
   clearInterval(this.intervalPageMarket);
  },
  methods:{
    ...mapActions([
          'setCoinList',
          'setTradeList',
          'setPriceUsdOnTrx'
    ]),

    /*--------------------------------- INIT ---------------------------------*/

    loadData(){
      // this.getCoinList();
    },

    /*----------------------- VALIDATE , CHECK , EVENT -----------------------*/

    convertTrxToUsd(){
        let self = this;
        let params = {
          fsym:'TRX',
          tsyms:'USD'
        };
          HomeTradeAPi
            .exchangeTrxtoUsd(params)
            .then(response)
            .catch(error);

          function response(priceUsdOnTrx) {
            if(!priceUsdOnTrx){
              self.setPriceUsdOnTrx(0);
            }
            self.setPriceUsdOnTrx(priceUsdOnTrx.USD);
          }
          function error(e){
            return console.log(e);
          }
    },

    /*---------------------------- LOAD , GET DATA ---------------------------*/
    
    getCoinList() {
      let self = this;
      ThirdPartyApi
        .getCoinList()
        .then(response)
        .catch(error);
      function response(res) {
        if (res.code != 'SUCCESS') return false;
          self.setCoinList(res.data.marketCap);
        } 
      function error(e) {
        console.log(e);
      } 
    },
    updateTradeList(isSocketEmit = false) {
      if (!this.tradeListToken) return false;
      let self = this;
      self.isSocketEmit = isSocketEmit;
      let promises = this.tradeListToken.map(item=> self.loadLastTransaction(item));
      Promise
        .all(promises)
        .then(response)
        .catch(error);
      function response(tradeList) {
        if (self.isSocketEmit == false) {
          self.setTradeList(tradeList);
        } else if (isSocketEmit == true) {
          self.setTradeList(tradeList);
        }
        self.isSocketEmit = false;    
      } 
      function error(e) {
        console.log(e);
      } 
    },
    loadLastTransaction(tradeDetail) {
      return new Promise((resolve, reject)=>{
        let tokenBridgeAddr = tradeDetail.tokenBridgeAddr;
        let tokenDecimals = tradeDetail.tokenDecimals;
        let self = this;
        let priceChange;
        if (tokenBridgeAddr == '') return resolve(tradeDetail);
        Trade.getTransactionIdLastTime(tokenBridgeAddr,function (err, transactionIdLastTime) {
          if (err) return false;
          if (transactionIdLastTime == 0) return resolve(tradeDetail);
          let promises = [];
          // if(transactionIdLastTime && transactionIdLastTime >=2){     
            for(let idTran = transactionIdLastTime - 1 ; idTran <= transactionIdLastTime ; idTran++){
                promises.push(self.getTransactionDetail(tokenBridgeAddr, tokenDecimals, idTran));
            }
            Promise 
            .all(promises)
            .then(transaction=>{
                priceChange = transaction.reduce(function (transactionA, transactionB) {
                    return transactionB.price - transactionA.price
                })
                tradeDetail.priceChange = priceChange;
                let lastTrade = transaction[1];
                if(tradeDetail.price == 0) {
                  tradeDetail.changed = 0;
                  if (lastTrade.price > 0) {
                    tradeDetail.changed = 100;
                  }
                } else {
                  tradeDetail.changed = ((lastTrade.price - tradeDetail.price ) / tradeDetail.price )  * 100 ;
                }
                tradeDetail.lastPrice = lastTrade.price;
                return resolve(tradeDetail);
            })
            .catch(e=>{
               return reject(e);
            })
        });
      });
    },
    getTransactionDetail(tokenBridgeAddr , tokenDecimals , transactionId){
      return new Promise((resolve, reject) => {
        Trade.getTransactionDetail(tokenBridgeAddr ,tokenDecimals, transactionId ,function(err,transaction){
          if(err) return reject(err);
          return resolve(transaction);
        });
      });
    },
  
  }
}
</script>

<style lang="scss">
</style>