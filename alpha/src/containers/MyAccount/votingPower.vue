<template>
  <div  style="overflow: hidden;">         
      <VotingPowerView  />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex' 
import  Ztr  from '../../js/Ztr.js'; 
import  VotingPower  from '../../js/VotingPower.js'; 
import MYTronWeb from './../../js/tron-web.js';
// components
import VotingPowerView from './../../view/MyAccount/votingPower.vue';

// API
import UserApi from '../../api/user';
export default {
  name :'MyAccount',
  computed: {
      ...mapGetters([
        'loadPage',
        'pageLockVoitingPower',
        'accountAddress',
        'tradeCheckLogin'
      ])
  },
  components: {
    VotingPowerView,
  },
  data () {
    return {
    }
  },
  created() {  
    let self = this;  
    // this.makeSocketEvent();
    this.initData();
    this.voitingPowerInterval = setInterval(() => {
        self.initUserListBlock({page : 1 , limit:100000, type : 3});
        self.loadTokens();
        // self.loadUserRewardPoint();
        self.loadVotingPowerLock();
        self.loadVotingPower();
    }, 3000)
  },
  destroyed() {
    clearInterval(this.voitingPowerInterval);
  },
  mounted(){
    this.onTradeCheckLoginChange();
    this.onAccountChange();
  },
  methods:{
      ...mapActions([
          'setUserZethyr',
          'setUserRewardPoint',
          'setUserListBlock',
          'setUserVotingPower',
          'setUserVotingPowerLock',
          'setNumberPageVoitingPower',
          'setNumberLockByDayVoiting',
          'initUserListBlock'

      ]),

      /*--------------------------------- INIT ---------------------------------*/

      makeSocketEvent() {
        let self = this;
        let socket = io(process.env.URL_BACKEND);
        socket.on('lock-change', function(data) {
          let users = data && data.users ? data.users : [];
          if (users.includes(MYTronWeb.getAccount()) == true && data.contractAddr == process.env.VotingPowerContractAddress) {
            self.initData();
          }
        });
      },
      loadData() {
      
      },
       initData() {
        let self = this;
        let addrTrader  =  MYTronWeb.getAccount();
        if (!addrTrader || addrTrader == process.env.ADDRESS_DEFAULT || !VotingPower.CONTRACT_CALL_DATA || !Ztr.CONTRACT_CALL_DATA) {
          return setTimeout(() => {
              self.initData();
          }, 100);
        }
        this.initUserListBlock({page : 1 , limit:100000, type : 3});
        this.loadTokens();
        // this.loadUserRewardPoint();
        this.loadVotingPowerLock();
        this.loadVotingPower();
        // this.getNumberTimesLockedToday();
      },

      /*--------------------------- ON CHANGE STORE ----------------------------*/

      onTradeCheckLoginChange() {
        this.$store.watch(
          (state)=>{
              return this.$store.getters.tradeCheckLogin;
          },
          (val)=>{
                if(this.tradeCheckLogin == true && this.$router.history.current.name == 'voting-power'){
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
              this.loadData();
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
      loadVotingPowerLock(){
        let self = this; 
          VotingPower.getVotingPowerLockByTrader(MYTronWeb.getAccount(),function(err,voitingPowerLock){
          if(err){
            console.log(err);
          }else{
            self.setUserVotingPowerLock(voitingPowerLock.tokensLock / (10 ** parseInt(process.env.ZTR_DECIMALS)));
          }
        })
      },
      loadVotingPower(){
        let self = this; 
          VotingPower.getVotingPower(MYTronWeb.getAccount(),function(err,votingPower){
          if(err){
            console.log(err);
          }else{
            self.setUserVotingPower(votingPower /(10 ** 6));
          }
        })
      },
      getNumberTimesLockedToday(){
        let self = this;
        VotingPower.getNumberTimesLockedToday(function(err,getNumberTimesLockedToday){
            if(err){
              return console.log(err);
            }else{
              self.setNumberLockByDayVoiting(getNumberTimesLockedToday);
            }
        });
      }
  }
}
</script>

<style lang="scss">
</style>