<template>
  <div  style="overflow: hidden;">
      <ZtrProcessView  />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { ZtrNetwork } from '../../js/ZtrNetwork.js';
import  Ztr  from '../../js/Ztr.js';
import  TradingPower  from '../../js/TradingPower.js';
import MYTronWeb from './../../js/tron-web.js';
// components
import ZtrProcessView from './../../view/MyAccount/ztrProcess.vue';

// API
import UserApi from '../../api/user';
export default {
  name :'MyAccount',
  computed: {
      ...mapGetters([
        'tradeCheckLogin',
        'userToken',

        'accountAddress'
      ])
  },
  components: {
    ZtrProcessView,
  },
  created() {   
    let self = this; 
    this.tradingPowerInterval = setInterval(() => {
        self.loadTokens();
        self.loadUserRewardPoint();

    }, 3000)
    this.initData();
  },

  destroyed() {
     clearInterval(this.tradingPowerInterval);
  },
  mounted(){
    this.onTradeCheckLoginChange();
    this.onAccountChange();
  },
  methods:{
      ...mapActions([
          'setUserZethyr',
          'setUserRewardPoint',
          'setDifficulty',

      ]),

      getDifficulty(){
        let self = this;
        Ztr.getDifficulty(function(err,difficulty){
          if(err) {
            return console.log(err);
          }else{
            self.setDifficulty(parseFloat(difficulty));
          }
        })
      },
      /*--------------------------------- INIT ---------------------------------*/
  
      initData() {
        let self = this;
        let addrTrader  =  MYTronWeb.getAccount();
        if (!addrTrader || addrTrader == process.env.ADDRESS_DEFAULT || !TradingPower.CONTRACT_CALL_DATA || !Ztr.CONTRACT_CALL_DATA) {
          return setTimeout(() => {
              self.initData();
          }, 100);
        }

        this.loadTokens();
        this.loadUserRewardPoint();
        this.getDifficulty();
      },

      /*--------------------------- ON CHANGE STORE ----------------------------*/

      onTradeCheckLoginChange() {
        this.$store.watch(
          (state)=>{
              return this.$store.getters.tradeCheckLogin;
          },
          (val)=>{
                if(this.tradeCheckLogin == true && this.$router.history.current.name == 'ztr'){
                  this.$router.push({name:'home'});
                }
          },
          {
            deep:true
          }
        ); 
      },
      onAccountChange() {
        this.$store.watch(
          (state)=>{
              return this.$store.getters.accountAddress;
          },
          (val)=>{
              this.initData();
          },
          {
            deep:true
          }
        ); 
      },

      /*---------------------------- LOAD , GET DATA ---------------------------*/

      loadTokens(){
        let self = this;
          Ztr.getTokenZTR(function(err, tokens){
          if(err){
            console.log(err);
          }else{
            tokens = tokens / (10 ** parseInt(process.env.ZTR_DECIMALS));

            self.setUserZethyr(tokens);
          }
        })
      },
      loadUserRewardPoint() {
        let self = this; 
          Ztr.getRewardPoint(MYTronWeb.getAccount() ,function(err, userRewardPoint) {
            if (err) return false;
            self.setUserRewardPoint(parseFloat(userRewardPoint));
        })
      },
      
  }
}
</script>

<style lang="scss">
</style>
