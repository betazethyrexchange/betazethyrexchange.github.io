<template>
  <div class="header-app" style="position: relative;">
      <b-container>
        <b-navbar toggleable="md">
          <b-navbar-brand href="#" class="d-flex align-items-center">
            <div class="logo-content mr-2" @click="redirectToHome">
              <img src="../../assets/images/logo.png">
            </div>
          </b-navbar-brand>

          <b-navbar-toggle target="nav-collapse-header"><i class="fa fa-bars"></i></b-navbar-toggle>

          <b-collapse id="nav-collapse-header" is-nav>
            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto align-items-stretch">
              <b-nav-item @click="redirectToExchange">{{$t('message.menu.Exchange')}}</b-nav-item>
              <b-nav-item @click="redirectToMarket">{{$t('message.menu.Market')}}</b-nav-item>
              <b-nav-item @click="redirectToDividends">{{$t('message.menu.Dividends')}}</b-nav-item>
              <b-nav-item @click="redirectToBlog">{{$t('message.menu.New')}}</b-nav-item>
              <b-nav-item @click="redirectToWhitePaper">{{$t('message.menu.MenuWhitePaper')}}</b-nav-item>
              <!-- <b-nav-item href="#">{{$t('message.menu.Icon')}}</b-nav-item> -->
              <b-nav href="#" class="login-or-register">
                  <img src="../../assets/images/account.png" class="mr-2">
                <span v-if="!accountActive() || tradeCheckLogin == true" class="text-white" @click="showModal()">
                  <span >{{$t('message.menu.Login')}}</span> 
                  {{$t('message.menu.Or')}} 
                  <span >{{$t('message.menu.Register')}}</span>
                </span>
                <span v-if="accountActive()" @click="redirectToMyAccount">{{accountAddress}}</span>
              </b-nav>
                <!-- Modal -->
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

               <li class="nav-item">
                  <a href="#" class="nav-link">
                    <img src="../../assets/images/en-language.png" v-if="this.$i18n.locale =='en'" style="height: 16px;width: 32px;float: left;margin-right: 10px">
                     <img src="../../assets/images/cn-language.png" v-if="this.$i18n.locale =='zh'" style="height: 16px;width: 32px;float: left;margin-right: 10px">
                      <img src="../../assets/ru-language.png" v-if="this.$i18n.locale  =='ru'" style="height: 16px;width: 32px;float: left;margin-right: 10px">
                    <span class="text-white">{{$t('message.menu.Language')}}</span>
                    <img  src="../../assets/images/arrowdown.png" style="cursor: pointer;">
                  </a>
                    <div style="background: white;position: absolute;top: 100%;right: 0px;cursor: pointer;z-index: 99999;" class="language-list">
                      <a class="dropdown-item"  @click="change('en')" style="padding: 10px;padding-right: 50px;display: flex;align-items: center;" >
                          <img src="../../assets/images/en-language.png" style="height: 16px;width: 32px;float: left;margin-right: 10px">
                          <span >English</span>
                      </a> 
                       <a class="dropdown-item" @click="change('ru')" style="padding: 10px;padding-right: 50px;display: flex;align-items: center;" >
                            <img src="../../assets/ru-language.png" style="height: 16px;width: 32px;float: left;margin-right: 10px">
                            <span >Русский</span>
                      </a>
                    </div>
              </li>       
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
    </b-container>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

import MYTronWeb from './../../js/tron-web.js'
import { ZtrNetwork } from '../../js/ZtrNetwork.js'; 

import ConfigCookieKey from '../../../../config/cookie.key.js'
import ConfigSessionKey from '../../../../config/session.key.js'

export default {
  data () {
    return {
       language:'en',
    };  
  },
  computed: {
      ...mapGetters([
        'accountAddress',
        'checkRegister',
        'changeLang',
        'tradeCheckLogin'
      ])
    },
  methods: {
    ...mapActions([
         'setTradeIdActive',
         'setUserActiveRegister',
         'setChangeLang',
         'setPlaceholderInputValue'
    ]),

    /*----------------------- VALIDATE , CHECK , EVENT -----------------------*/

    redirectToHome() {
      this.$router.push({name:'home'});
    },
    redirectToBlog() {
      window.open('https://twitter.com/zethyrexchange');
      // this.$router.push({name:'blog-list'});
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
    accountActive() {
        if (this.checkRegister == true && this.tradeCheckLogin == false) {
          return true;
        }
        return false;
    },
    redirectToMyAccount() {
      if (typeof(window.tronWeb) === 'undefined') {
        this.showModalCheckLogin();
      } else if(tronWeb.fullNode.host != process.env.FUll_NODE && tronWeb.fullNode.host != process.env.FUll_NODE_DEFAULT) {
        this.showModalCheckSwitchNode();
      } else if (MYTronWeb.getAccount() == false) {
        this.showModalCheckLogin();
      } else {
        this.$router.push({name:'ztr'});
      }
    },
    redirectToDividends() {
      this.$router.push({name:'dividends'});
    },
    change (to) {
      localStorage['lang'] = to
      this.$i18n.locale = to
      this.language = this.$i18n.locale;
      this.$emit('changeLang', to);
      if(this.changeLang == true){
        this.setChangeLang(false);    
      }else{
        this.setChangeLang(true); 
      }
    },

    /*------------------------------- FUNCTION -------------------------------*/

    registerAccount() {

        
        let self = this;
        ZtrNetwork.registerAccount((err, status) => {
          if (err) return false;
          if (status == false) return false;
          self.hideModal();
          self.setUserActiveRegister(true);
        });
    },
    redirectToMarket() {
      // window.location = '/#/market';
      this.$router.push({name:'market'});
    },
    redirectToDividends() {
      this.$router.push({name:'dividends'});
    },
    redirectToExchange() {
      let tradeList = this.$session.get(ConfigSessionKey.tradeList);
      let time = parseInt(process.env.TIME_COOKIE);
      var pair = this.$cookies.get(ConfigCookieKey.pair);
      if(pair == null){
        this.$cookies.set(ConfigCookieKey.pair,'BTT_TRX',time);
        pair = 'BTT_TRX';
      } else if (tradeList) {
        let isExisted = false;
        for (let idx = 0; idx < tradeList.length; idx++) {
          if (tradeList[idx].tokenPair == pair) {
            isExisted = true;
            break;
          }
        }
        if (isExisted == false) pair = 'BTT_TRX';
      } else {
          return this.$router.push({name:'home'});
      }
      // window.location.reload();
      this.setTradeIdActive(pair);
      this.$router.push({name:'trade', params: { id: pair }});
    },
    redirectToWhitePaper() {
      if (this.$i18n.locale == 'en') {
        window.open('/Zethyr-White-Paper-Draft-en.pdf', '_blank');
      } else {
        window.open('/Zethyr-White-Paper-Draft-ru.pdf', '_blank');
      }
    }
  }
}
</script>
<style>
  .header .btn-secondary{
    color: #FFF;
    border-color: transparent;
    background-color :transparent;
  }
   .header .btn-secondary:hover{
    color: #FFF;
    border-color: transparent;
    background-color :transparent;
  }
   .header .btn-secondary:not(:disabled):not(.disabled).active, .btn-secondary:not(:disabled):not(.disabled):active, .show>.btn-secondary.dropdown-toggle{
    color: #FFF;
    border-color: transparent;
    background-color :transparent;
  }
   .navbar-nav li{
    padding: 4px 0;
  }
  .navbar-nav li:hover .language-list{
    display: block;
  }

  .language-list{
    display: none;
  }
  .login-or-register{
    display: flex;align-items: center;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    cursor: pointer;
  }
  .login-or-register span{
    color: #6892FF;
    cursor: pointer;
  }
</style>
