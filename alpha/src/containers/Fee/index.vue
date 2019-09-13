<template>
  <div  style="overflow: hidden;">         
      <FeeView />
  </div>
</template>

<script>
// components
import FeeView from './../../view/Fee/';

import { mapGetters, mapActions } from 'vuex'

import  TradingPower  from '../../js/TradingPower.js';

import MYTronWeb from './../../js/tron-web.js';

export default {
  components: {
    FeeView,
  },
  computed: {
      ...mapGetters([
        'accountAddress',
      ])
  },
  mounted(){
    let self = this;
    this.init();
    this.onAccountChange();
  },
  methods: {
     ...mapActions([  
          'setUserTradingPower',
          'setUserTradingPowerLock',
          'setFeeTradingPowerMax'
      ]),
      init(){
        let self = this;
        if (!TradingPower.CONTRACT_CALL_DATA || MYTronWeb.getAccount() == false) {
          return setTimeout(() => {
              self.init();
          }, 100);
        }
        this.loadTradingPowerLock();
        this.loadTradingPower();
        this.loadFeeTradingPower();
      },
      onAccountChange() {
        this.$store.watch(
          (state)=>{
              return this.$store.getters.accountAddress;
          },
          (val)=>{
              this.init();
          },
          {
            deep:true
          }
        ); 
      },
  	 loadTradingPowerLock(){
        let self = this;
        console.log(MYTronWeb.getAccount());
          TradingPower.getTokenLockByTrader(MYTronWeb.getAccount(),function(err, tradingPowerLock){
          if(err){
            console.log(err);
          }else{
            self.setUserTradingPowerLock(tradingPowerLock.tokensLock / (10 ** parseInt(process.env.ZTR_DECIMALS)));
          }
        })
      },
      loadTradingPower(){
        let self = this;
          TradingPower.getTradingPower(MYTronWeb.getAccount(),function(err,tradingPower){
          if(err){
            console.log(err);
          }else{
            self.setUserTradingPower(tradingPower /(10 ** 6));
          }
        })
      },
      loadFeeTradingPower(){
        let self = this;
        TradingPower.getTotalStakeTradingPower(function(err, totalStake){
          if(err) return false;
            TradingPower.getTokenLockByTrader(MYTronWeb.getAccount(),function(err, tradingPowerLock){
                if(err) return false;
                TradingPower.calFeeTradingPower(tradingPowerLock.tokensLock, totalStake , function(err,feeTradingPowerMax){
                    if(err) return false;
                    self.setFeeTradingPowerMax(feeTradingPowerMax / 10 ** 6);
                })
               
            })

        })
      }
  }
}
</script>
