<template>
  <div  style="overflow: hidden;">
      <TradingPowerView  />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { ZtrNetwork } from '../../js/ZtrNetwork.js';
import  Ztr  from '../../js/Ztr.js';
import  TradingPower  from '../../js/TradingPower.js';
import MYTronWeb from './../../js/tron-web.js';
// components
import TradingPowerView from './../../view/MyAccount/tradingPower.vue';

// API
import UserApi from '../../api/user';
export default {
  name :'MyAccount',
  computed: {
      ...mapGetters([
        'tradeListToken',
        'tradeIdActive',
        'tradeCheckLogin',
        'userToken',
        'loadPage',
        'pageLockToken',
        'accountAddress'
      ])
  },
  components: {
    TradingPowerView,
  },
  created() {   
    let self = this; 
    // this.makeSocketEvent();
    this.tradingPowerInterval = setInterval(() => {
        self.initUserListBlock({page : 1 , limit: 100000, type : 1});
        self.loadTokens();
        // self.loadUserRewardPoint();
        self.loadTradingPowerLock();
        self.loadTradingPower();
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
          'setUserToken',
          'setUserTradingPowerLock',
          'setUserTradingPower',
          'setUserZethyr',
          'setUserRewardPoint',
          'setUserListBlock',
          'setUserTrx',
          'setNumberPageTradingPower',
          'setNumberLockByDayTrading',
          'initUserListBlock'

      ]),

      /*--------------------------------- INIT ---------------------------------*/

      makeSocketEvent() {
        let self = this;
        let socket = io(process.env.URL_BACKEND);
        socket.on('lock-change', function(data) {
          let users = data && data.users ? data.users : [];
          if (users.includes(MYTronWeb.getAccount()) == true && data.contractAddr == process.env.TradingPowerContractAddress) {
            self.initData();
          }
        });
      },
      
      initData() {
        let self = this;
        let addrTrader  =  MYTronWeb.getAccount();
        if (!addrTrader || addrTrader == process.env.ADDRESS_DEFAULT || !TradingPower.CONTRACT_CALL_DATA || !Ztr.CONTRACT_CALL_DATA) {
          return setTimeout(() => {
              self.initData();
          }, 100);
        }


        this.initUserListBlock({page : 1 , limit: 100000, type : 1});
        this.loadTokens();
        // this.loadUserRewardPoint();
        this.loadTradingPowerLock();
        this.loadTradingPower();
        // this.getNumberTimesLockedToday();
      },

      /*--------------------------- ON CHANGE STORE ----------------------------*/

      onTradeCheckLoginChange() {
        this.$store.watch(
          (state)=>{
              return this.$store.getters.tradeCheckLogin;
          },
          (val)=>{
                if(this.tradeCheckLogin == true && this.$router.history.current.name == 'trading-power'){
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
            self.setUserRewardPoint(userRewardPoint);
        })
      },
      loadTradingPowerLock(){
        let self = this;
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
      getNumberTimesLockedToday(){
        let self = this;
        TradingPower.getNumberTimesLockedToday(function(err,getNumberTimesLockedToday){
            if(err){
              return console.log(err);
            }else{
              self.setNumberLockByDayTrading(getNumberTimesLockedToday);
            }
        });
      },
  }
}
</script>

<style lang="scss">
</style>
