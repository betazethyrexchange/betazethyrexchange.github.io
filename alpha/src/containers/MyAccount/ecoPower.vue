<template>
  <div  style="overflow: hidden;">         
      <MyAccountView/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import  ZTRDividends  from '../../js/ZTRDividends.js'; 
import  Ztr  from '../../js/Ztr.js'; 
import  EcoPower  from '../../js/EcoPower.js'; 
import MYTronWeb from './../../js/tron-web.js';
// components
import MyAccountView from './../../view/MyAccount/ecoPower.vue';
import UtilsConvertTime from './../../utils/convertTime.js'
// API
import UserApi from '../../api/user';
export default {
  name :'eco-power',
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
    MyAccountView
  },
  data () {
      return {
        getGameDetailInterval: null,
      }
  },
  created() {    
    let self = this;
    // this.makeSocketEvent();
    this.initData();
    this.ecoPowerInterval = setInterval(() => {
        self.initUserListBlock({page : 1 , limit:100000, type : 2});
        self.loadTokens();
        // self.loadUserRewardPoint();
        self.loadEcoPowerLock();
        self.loadEcoPower();
    }, 3000)
  },
  mounted(){
    this.onTradeCheckLoginChange();
    this.onAccountChange();
  },
  destroyed() {
   clearInterval(this.ecoPowerInterval);
  },
  methods:{
      ...mapActions([
          'setUserToken',
          'setUserEcoPower',
          'setUserTokenLock',
          'setUserZethyr',
          'setUserRewardPoint',
          'setUserListBlock',
          'setUserEcoPowerLock',
          'setUserDividends',
          'setNumberPageEcoPower',
          'setTimeEndRound',
          'setTotalEcoPower',
          'setTotalDividends',
          'setTimeStartRound',
          'setNumberLockByDayEco',
          'initUserListBlock'

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
        if (!addrTrader || addrTrader == process.env.ADDRESS_DEFAULT || !EcoPower.CONTRACT_CALL_DATA || !Ztr.CONTRACT_CALL_DATA) {
          return setTimeout(() => {
              self.initData();
          }, 100);
        }
        this.initUserListBlock({page : 1 , limit:100000, type : 2});
        this.loadTokens();
        // this.loadUserRewardPoint();
        this.loadEcoPowerLock();
        this.loadEcoPower();

        this.getTotalEcoPower();
        if (self.getGameDetailInterval) {
          clearInterval(self.getGameDetailInterval);
        }
      },

      /*--------------------------- ON CHANGE STORE ----------------------------*/
      onTradeCheckLoginChange() {
        this.$store.watch(
          (state)=>{
              return this.$store.getters.tradeCheckLogin;
          },
          (val)=>{
                if(this.tradeCheckLogin == true && this.$router.history.current.name == 'eco-power'){
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
      loadEcoPowerLock(){
        let self = this; 
          EcoPower.getEcoPowerLockByTrader(MYTronWeb.getAccount(),function(err,ecoPowerLock){
          if(err){
            console.log(err);
          }else{
            self.setUserEcoPowerLock(ecoPowerLock.ecoPower / (10 ** parseInt(process.env.ZTR_DECIMALS)));
          }
        })
      },
      loadEcoPower(){
        let self = this; 
          EcoPower.getEcoPower(MYTronWeb.getAccount(),function(err,ecoPower){
          if(err){
            console.log(err);
          }else{
            self.setUserEcoPower(ecoPower /(10 ** 6));
          }
        })
      },
      getTotalEcoPower(){
        let self = this; 
        EcoPower.getTotalEcoPower(function (err, ecoPower) {
            if(err){
                return console.log(err);
            }else{
                self.setTotalEcoPower(ecoPower / (10 **6 ));
            }
        })
      },
      getNumberTimesLockedToday(){
        let self = this;
        EcoPower.getNumberTimesLockedToday(function(err,getNumberTimesLockedToday){
            if(err){
              return console.log(err);
            }else{
              self.setNumberLockByDayEco(getNumberTimesLockedToday);
            }
        });
      }
  }
}
</script>

<style lang="scss">
</style>