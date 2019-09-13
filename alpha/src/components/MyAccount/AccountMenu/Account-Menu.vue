<template>
  <div>
                <ul class="menu-user">
                  <li :class="{active : (appName == 'ztr')}">
                    <a @click="redirectToZtrProcess" class="cursor">ZTR</a>
                  </li>
                  <li :class="{active : (appName == 'trading-power')}">
                    <a @click="redirectToTradingPower" class="cursor">{{$t('message.menuUser.tradingPower')}}</a>
                  </li>
                  <li :class="{active : (appName == 'eco-power')}">
                    <a @click="redirectToEcoPower" class="cursor">{{$t('message.menuUser.ecoPower')}}</a>
                  </li>
                  <li :class="{active : (appName == 'voting-power')}">
                    <a @click="redirectToVotingPower" class="cursor">{{$t('message.menuUser.votingPower')}}</a>
                  </li>
                  <li :class="{active : (appName == 'trade-detail')}">
                    <a @click="redirectToTradeDetail" class="cursor">{{$t('message.menuUser.tradeDetail')}}</a>
                  </li>
                  <!-- <li :class="{active : (appName == 'invite')}">
                    <a @click="redirectToInvite" class="cursor">{{$t('message.menuUser.invite')}}</a>
                  </li>
                  <li :class="{active : (appName == 'settings')}">
                    <a @click="redirectToSetting" class="cursor">{{$t('message.menuUser.settings')}}</a>
                  </li> -->
                  <!-- <li :class="{active : (appName == 'dividends')}">
                    <a @click="redirectToDividends" class="cursor">{{$t('message.menuUser.dividends')}}</a>
                  </li> -->
                </ul>

                
  </div>
</template>
<script>

export default {
  name : 'myacount-menu',
  mounted(){
    this.getAppNameCurrent()
  },
  data () {
    return {
        appName: ''
    }
  },
  methods: {

    /*----------------------- VALIDATE , CHECK , EVENT -----------------------*/
      redirectToTradingPower() {
        this.$router.push({name:'trading-power'});
      },
      redirectToEcoPower() {
        this.$router.push({name:'eco-power'});
      },
      redirectToVotingPower() {
        this.$router.push({name:'voting-power'});
      },
      redirectToTradeDetail() {
        this.$router.push({name:'trade-detail'});
      },
      redirectToInvite() {
        this.$router.push({name:'invite'});
      },
      redirectToSetting() {
        this.$router.push({name:'settings'});
      },
      redirectToDividends() {
        // this.$router.push({name:'dividends'});
      },
      redirectToZtrProcess() {
        this.$router.push({name:'ztr'});
      },
      getAppNameCurrent() {
        // console.log(this.$router.history)
        this.appName = this.$router.history.current.name; 
      }
  }
}
</script>
