<template>
  <div  style="overflow: hidden;">         
      <DividendsView/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import  ZTRDividends  from '../../js/ZTRDividends.js'; 
import  Ztr  from '../../js/Ztr.js'; 
import  EcoPowerContract  from '../../js/EcoPower.js'; 
import  TradingPowerContract  from '../../js/TradingPower.js'; 
import  VotingPowerContract  from '../../js/VotingPower.js'; 
import MYTronWeb from './../../js/tron-web.js';
// components
import DividendsView from './../../view/Dividends/';
import UtilsConvertTime from './../../utils/convertTime.js'
// API
import HomeApi from '../../api/home';
export default {
  name :'dividends',
  computed: {
      ...mapGetters([
        'loadPage',
        'pageLockEcoPower',
        'accountAddress',
        'totalDividends',
        'tradeCheckLogin'
      ])
  },
  components: {
    DividendsView
  },
  data () {
      return {
        GameDetailInterval: null,
      }
  },
  created() {    
    this.makeSocketEvent();
    this.initData();
  },
  mounted(){
    this.onTradeCheckLoginChange();
    this.onAccountChange();
  },
  destroyed() {
   clearInterval(this.GameDetailInterval);
  },
  methods:{
      ...mapActions([
          'setUserDividends',
          'setUserAvailableBalance',
          'setTimeEndRound',
          'setTotalEcoPower',
          'setTotalDividends',
          'setWeekDividends',
          'setTimeStartRound',
          'setDifficulty',
          'setTotalZtr',
          'setUsageToken',
          'setUserEcoPower',
          'setTotalToken'

      ]),
      /*--------------------------------- INIT ---------------------------------*/
      makeSocketEvent() {
        let self = this;
        let socket = io(process.env.URL_BACKEND);
        socket.on('lock-change', function(data) {
          let users = data && data.users ? data.users : [];
          if (users.includes(MYTronWeb.getAccount()) == true && data.contractAddr == process.env.EcoPowerContractAddress) {
            self.initData();
          }
        });
      },
  
      initData(){
        let self = this;
        let addrTrader  =  MYTronWeb.getAccount();
        if(!addrTrader){
          addrTrader = process.env.ADDRESS_DEFAULT;
        }
        if (!EcoPowerContract.CONTRACT_CALL_DATA || !Ztr.CONTRACT_CALL_DATA ||  !TradingPowerContract.CONTRACT_CALL_DATA || !VotingPowerContract.CONTRACT_CALL_DATA || !ZTRDividends.CONTRACT_CALL_DATA) {
          return setTimeout(() => {
              self.initData();
          }, 100);
        }
        this.getTotalZtrStake();
        // this.getDividends();
        this.getGameDetail();
        this.getUserDetail();
        this.getDifficulty();
        this.getTotalZTR();
        this.loadEcoPower();
        this.getTotalToken();
        self.GameDetailInterval = setInterval(function(){ 
          self.getDifficulty();
          self.loadEcoPower();
          // self.getDividends();
          self.getTotalEcoPower();
          self.getTotalZTR();
          self.getTotalZtrStake();
          self.getGameDetail();
          self.getUserDetail();
          self.getTotalToken();
        }, 1000);
      },

      /*--------------------------- ON CHANGE STORE ----------------------------*/
      onTradeCheckLoginChange() {
        this.$store.watch(
          (state)=>{
              return this.$store.getters.tradeCheckLogin;
          },
          (val)=>{
                // if(this.tradeCheckLogin == true && this.$router.history.current.name == 'dividends'){
                //   this.$router.push({name:'home'});
                // }
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
      getTotalToken(){
        let self = this;
        EcoPowerContract.getTotalEcoPower(function(err,totalEcoPower) {
                if(err){
                    return console.log(err);
                }
                VotingPowerContract.getTotalVotingPower(function(err,totalVotingPower) {
                  if(err){
                    return console.log(err);
                  }
                  let totalToken = {
                      totalEcoPower: totalEcoPower / 10**6,
                      totalVotingPower: totalVotingPower / 10**6
                  }
                    self.setTotalToken(totalToken);
                })
        })
      },
      loadEcoPower(){
        let self = this; 
          EcoPowerContract.getEcoPower(MYTronWeb.getAccount(),function(err,ecoPower){
          if(err){
            console.log(err);
          }else{
            self.setUserEcoPower(ecoPower /(10 ** 6));
          }
        })
      },
      getTotalZtrStake(){
        let self = this;
        EcoPowerContract.getTotalStake((err, totalStakeEcoPower) => {
          if (err) return false;
          TradingPowerContract.getTotalStake((err, totalStakeTradingPower) => {
            if (err) return false;
            VotingPowerContract.getTotalStake((err, totalStakeVotingPower) => {
              if (err) return false;
              let usageToken = {
                totalStakeEcoPower,
                totalStakeTradingPower,
                totalStakeVotingPower,
                totalTradingPower: totalStakeTradingPower
              };
              self.setUsageToken(usageToken);
            });
          });
        });
      },
      getDifficulty(){
        let self = this;
        Ztr.getDifficulty(function(err,difficulty){
          if(err) {
            return console.log(err);
          }else{
            self.setDifficulty(difficulty);
          }
        })
      },
      getTotalZTR(){
        let self = this;
        Ztr.getTotalZTR(process.env.ztrTokensContractAddress,function(err, totalZTR) {
          if(err) {
            return console.log(err);
          }else{
             self.setTotalZtr( totalZTR / 10** parseInt(process.env.ZTR_DECIMALS));
          }
        })
      },
      // getDividends(){
      //   let self = this; 
      //     ZTRDividends.getDividends(function(err,user){
      //       if(err){
      //           return console.log(err);
      //       }else{
      //         self.setUserDividends(user.dividends)
      //       }
      //     })
      // },
      getGameDetail(){
        let self = this; 
        ZTRDividends.getGameData(function (err, gameDetail) {
          if (err) return false;
          self.setWeekDividends(gameDetail.weekDividends);
          self.setTotalDividends(gameDetail.totalDividends);
          self.setTimeEndRound(gameDetail.endTime);
          self.setTimeStartRound(gameDetail.startTime);
        });
      },
      getUserDetail() {
        let self = this;
        ZTRDividends.getUserData(function (err, userDetail) {
          if (err) return false;
          self.setUserDividends(userDetail.dividends);
          self.setUserAvailableBalance(userDetail.availableBalance);
        });
      },
      getTotalEcoPower(){
        let self = this; 
        EcoPowerContract.getTotalEcoPower(function (err, ecoPower) {
            if(err){
                return console.log(err);
            }else{
                self.setTotalEcoPower(ecoPower / (10 **6 ));
            }
        })
      },
  }
}
</script>

<style lang="scss">
</style>