<template>
  <div id="app" :class="{ 'app-trade-mobile': isTradePageOnMobile() == true , 'fee-page': isPageFee() == true }">
    <div class="header-main">
      <Header />
    </div>
    <div class="content">
      <router-view ref="app"/>
    </div>
    <div class="footer">
      <Footer />
    </div>
  </div>
</template>
<script>
/*-----------------Module---------------------------------*/
import { mapGetters, mapActions } from 'vuex'
import { isMobile } from 'mobile-device-detect'
/*-----------------Config---------------------------------*/
import ConfigSessionKey from '../../config/session.key.js'
/*-----------------Tron Web-------------------------------*/
import MYTronWeb from './js/tron-web.js'
/*----------------Layout ---------------------------------*/
import Header  from './components/Layout/Header.vue'
import Footer  from './components/Layout/Footer.vue'
/*--------------------- Js -------------------------------*/
import { ZtrNetwork } from './js/ZtrNetwork.js'
import { Trade } from './js/Trade.js'
import  Ztr  from './js/Ztr.js'
import  TradingPower  from './js/TradingPower.js'
import  EcoPower  from './js/EcoPower.js'
import  VotingPower from './js/VotingPower.js'
import  ZTRDividends from './js/ZTRDividends.js'

/*--------------------- Api -------------------------------*/
import UserApi from './api/user';

//
let TronWeb = require('tronweb');
let HttpProvider = TronWeb.providers.HttpProvider;
let fullNode = new HttpProvider(process.env.FUll_NODE);
let solidityNode = new HttpProvider(process.env.SOLIDITY_NODE);
let eventServer = process.env.EVENT_HOST;
let tronWebWithZethyrAccount = MYTronWeb.getTronWeb(TronWeb, process.env.PRIVATE_KEY_ACCOUNT_DEFAULT, fullNode, solidityNode, eventServer);

export default {
  components:{
    Header,
    Footer
  },
  data () {
    return {
      isSetupComplated: false,
      account: null,
      accountActive: false 
    };
  },
  computed: {
      ...mapGetters([
        'tradeCheckLogin',
        'accountAddress',
      ])
  },
  created() {    
    this.makeSocketEvent();
    this.init();
  },
  mounted () {
    this.account = null;
  },
  methods: {
      ...mapActions([
          'setTradeCheckLogin',
          'setUserAccountAddress',
          'setUserActiveRegister',
          'setTradeList'
      ]),
      makeSocketEvent() {
        let self = this;
        let socket = io(process.env.URL_BACKEND);
        socket.on('trade-change', data => {
          // console.log("trade-change");
          let tradeList = data;
          let pageName = self.$router.history.current.name;
          self.$session.set(ConfigSessionKey.tradeList, tradeList);
          if (pageName == 'home' || pageName == 'market') {
            tradeList.sort(function(a, b) {
              if (a.volume > b.volume) {
                return -1;
              }
            });

            self.setTradeList(tradeList);
            self.$refs['app'].updateTradeList(true);
          
          } else if (pageName == 'trade') {
            tradeList.sort(function(a, b) {
                var nameA = a.tokenName.toUpperCase();
                var nameB = b.tokenName.toUpperCase();
                if (nameA > nameB) {
                  return -1;
                }
            });
            self.setTradeList(tradeList);
            self.$refs['app'].updateTradeList(tradeList);
          }
        });
      },
      init() {
        this.setupContractCallData();
        this.setupContract();
        this.isPageFee();
      },
      setupContract() {
        if (typeof(window.tronWeb) === 'undefined') {
          this.reloadSetupContract();
        } else if (tronWeb.fullNode.host != process.env.FUll_NODE && tronWeb.fullNode.host != process.env.FUll_NODE_DEFAULT) {
          this.reloadSetupContract();
        } else if (MYTronWeb.getAccount() == false) {
          this.reloadSetupContract();
        } else if (this.isSetupComplated == false) {
          ZtrNetwork.initContract(status => {});
          Trade.initContract(status => {});
          Ztr.initContract(status => {});
          TradingPower.initContract(status => {});
          EcoPower.initContract(status => {});
          VotingPower.initContract(status => {});
          ZTRDividends.initContract(status => {});
          this.isSetupComplated = true;
        }
      },
      reloadSetupContract() {
        let self = this;
        setTimeout(function(){ 
          self.setupContract();
        }, 300);
      },
      setupContractCallData() {
        let self = this;
        Promise
          .all([
            initContractCallData(ZtrNetwork),
            initContractCallData(Trade),
            initContractCallData(Ztr),
            initContractCallData(TradingPower),
            initContractCallData(EcoPower),
            initContractCallData(VotingPower),
            initContractCallData(ZTRDividends)
          ])
          .then(response)
          .catch(error);
        function response(status) {
          self.getTradeList();
          self.checkAccount();
        } 
        function error(e) {
          console.log(e);
        } 

        function initContractCallData(contract) {
          return new Promise((resolve, reject) => {
            contract.initContractCallData(tronWebWithZethyrAccount, is_init => {
              return resolve(is_init);
            });
          });
        }
      },
      checkAccount() {
        let self = this;
        self.checkLoginTrader();
        setInterval(() => {
          self.checkLoginTrader();
        }, 1000);
      },
      checkLoginTrader(){
        var self = this;
        var addrTrader  = MYTronWeb.getAccount();
        var lastAccount = self.account;
        if (typeof(window.tronWeb) === 'undefined') {
          self.account = process.env.ADDRESS_DEFAULT;
          self.setTradeCheckLogin(true);
          self.setUserActiveRegister(false);
          // self.redirectToHome();
        } else if(tronWeb.fullNode.host != process.env.FUll_NODE && tronWeb.fullNode.host != process.env.FUll_NODE_DEFAULT) {
          self.account = process.env.ADDRESS_DEFAULT;
          self.setTradeCheckLogin(true);
          self.setUserActiveRegister(false);
          // self.redirectToHome();
        } else if (MYTronWeb.getAccount() == false) {
          self.account = process.env.ADDRESS_DEFAULT;
          self.setTradeCheckLogin(true);
          self.setUserActiveRegister(false);
          // self.redirectToHome();
        } else if (addrTrader != false) {
          let startAddress = MYTronWeb.getAccount().slice(0,5);
          let endAddress = MYTronWeb.getAccount().slice(-5);
          self.account = addrTrader;
          self.setTradeCheckLogin(false);
          if (addrTrader != process.env.ADDRESS_DEFAULT) self.setUserAccountAddress(startAddress+ '...' + endAddress);
          if (lastAccount && addrTrader == lastAccount) return false;
          if (addrTrader == process.env.ADDRESS_DEFAULT) return false;
          ZtrNetwork.getWalletDetail((err, user) => {
            if (err) return false;
            self.setUserActiveRegister(user.accountActive);
            if (user.accountActive == false) self.setTradeCheckLogin(true);
          });
        } else if (lastAccount && lastAccount != process.env.ADDRESS_DEFAULT) {
          self.setTradeCheckLogin(true);
        }
      },
      redirectToHome() {
          if(
            this.$router.history.current.name == 'trading-power' ||
            this.$router.history.current.name == 'eco-power' ||
            this.$router.history.current.name == 'voting-power' ||
            this.$router.history.current.name == 'trade-detail'
          ){
            this.$router.push({name:'home'});
          }
      },
      getTradeList() {
        let self = this;
        let tradeList = self.$session.get(ConfigSessionKey.tradeList);
        if (!tradeList) tradeList = [];
        let timeAnalysisMin = 0;
        let dayTimes = 1000 * 60 * 60 * 24;
        let now = (new Date()).getTime();
        tradeList.forEach(item => {
          if (timeAnalysisMin == 0 || timeAnalysisMin > item.timeAnalysis) {
              timeAnalysisMin = item.timeAnalysis;
          } 
        });
        if (timeAnalysisMin + dayTimes >= now) {
            return initStore();
        } 
        load();
        function load() {
          UserApi
            .getTradeList()
            .then(response)
            .catch(error);
        } 
        function response(res) {
          if (res.code != 'SUCCESS') return false;
          tradeList = res.data.tradeList;
          self.$session.set(ConfigSessionKey.tradeList, tradeList);
          initStore();
        } 
        function initStore() {
          let pageName = self.$router.history.current.name;
          if (pageName == 'home' || pageName == 'market') {
            tradeList.sort(function(a, b) {
              if (a.volume > b.volume) {
                return -1;
              }
            });

            self.setTradeList(tradeList);

          } else if (pageName == 'trade') {
            tradeList.sort(function(a, b) {
                var nameA = a.tokenName.toUpperCase();
                var nameB = b.tokenName.toUpperCase();
                if (nameA > nameB) {
                  return -1;
                }
            });
            self.setTradeList(tradeList);
            // self.$refs['app'].updateTradeList(tradeList);
          } else {
            tradeList.sort(function(a, b) {
                var nameA = a.tokenName.toUpperCase();
                var nameB = b.tokenName.toUpperCase();
                if (nameA > nameB) {
                  return -1;
                }
            });
            self.setTradeList(tradeList);
          }
        }
        function error(e) {
          console.log(e);
        } 
      },
      isTradePageOnMobile() {
        let pageName = this.$router.history.current.name;
         if (isMobile == true && pageName == 'trade') {
            return true;
         }
         return false;
      },
      isPageFee(){
        let pageName = this.$router.history.current.name;
        if(pageName.toLowerCase() == 'fee'){
          return true;
        }else{
          return false;
        }
      }
  }
}
</script>

<style lang="scss">
@import 'assets/css/style.scss';
</style>