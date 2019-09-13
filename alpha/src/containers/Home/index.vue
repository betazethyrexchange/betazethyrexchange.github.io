<template>
  <div  style="overflow: hidden;" class="homepage">         
      <HomeView ref='home'/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
// contract
import { Trade } from '../../js/Trade.js'; 
import ThirdPartyApi from '../../api/thirdParty';
// components
import HomeView from './../../view/Home';

import HomeTradeAPi from '../../api/home';

import ConfigSessionKey from '../../../../config/session.key.js';

export default {
  name: 'home',
  components: {
    HomeView,
  },
  computed: {
    ...mapGetters([
      'tradeListToken'
    ])
  },
  data () {
    return {
      isSocketEmit: false
    }
  },
  created() {
    this.getCryptoNews();
    this.getCoinList();
    this.convertTrxToUsd();
  },
  mounted () {
    let self = this;
    let updateTradeListInterval = self.$session.get(ConfigSessionKey.updateTradeListInterval);
    self.updateTradeList();
    self.updateTradeListInterval = setInterval(() => {
      self.updateTradeList();
    }, 1000);
    self.$session.set(ConfigSessionKey.updateTradeListInterval, updateTradeListInterval);
  },
  destroyed() {
   clearInterval(this.updateTradeListInterval);
  },
  methods:{
      ...mapActions([
          'setTradeList',
          'setCryptoNews',
          'setCoinList',
          'setPriceUsdOnTrx'
      ]),

      /*--------------------------------- INIT ---------------------------------*/

      loadData() {

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
      getCryptoNews() {
        let self = this;
        ThirdPartyApi
          .getCryptoNewList()
          .then(response)
          .catch(error);
        function response(res) {
          if (res.code != 'SUCCESS') return false;
          self.setCryptoNews(res.data.cryptoNews);
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
          Trade.getTransactionIdLastTime(tokenBridgeAddr,function (err, transactionIdLastTime) {
            if (err) return reject(err);
            if (transactionIdLastTime == 0) return resolve(tradeDetail);
            let promises = [];
            for(let idTran = transactionIdLastTime - 1 ; idTran <= transactionIdLastTime ; idTran++) {
              promises.push(self.getTransactionDetail(tokenBridgeAddr, tokenDecimals, idTran));
            } 
            Promise 
              .all(promises)
              .then(trans => {
                priceChange = trans.reduce(function (transactionA, transactionB) {
                  return transactionB.price - transactionA.price
                });
                tradeDetail.priceChange = priceChange;
                let lastTrade = trans[1];
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
                return reject(e)
              });
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
      }
  }
}
</script>

<style lang="scss">
</style>