  <template>
          <div class="dividends-page">
              <div class="banner-top">
                <b-container>
                 
                 <b-row>
                     <b-col>
                       <h1>{{$t('message.dividends.Title')}}</h1>
                       <b-button variant="outline-primary" @click="goto('ztr-circulation')">{{$t('message.dividends.Circulation')}}</b-button>
                       <b-button variant="outline-primary" @click="goto('about-mining')">{{$t('message.dividends.About')}}</b-button><br>
                       <b-button variant="outline-primary" @click="goto('ztr-dividends')">{{$t('message.dividends.Dividends')}}</b-button>
              
                     </b-col>
                     <b-col style="margin-top: 24px;">
                      <span>{{$t('message.dividends.Things')}}</span>
                      <ul>
                        <li><a @click="redirectToWhitePaper()" class="cursor ztr-help">{{$t('message.dividends.WhitePaper')}}</a></li>
      <!--                   <li><a variant="outline-primary" @click="redirectToWhitePaper()" href="">{{$t('message.dividends.WhitePaper')}}</a></li>
                        <li><a variant="outline-primary" @click="redirectToWhitePaper()" href="">{{$t('message.dividends.WhitePaper')}}</a></li>
                        <li><a variant="outline-primary" @click="redirectToWhitePaper()" href="">{{$t('message.dividends.WhitePaper')}}</a></li> -->
                      </ul>
                     </b-col>
                 </b-row>
               </b-container>
             </div>
              <b-container>
                 <div class="clearfix content-dividends" ref="ztr-circulation">
                     <h2>{{$t('message.dividends.Circulation')}}</h2>
                     <div class="content clearfix">
                      <div  class="dividends-right">
                         <h3>{{$t('message.dividends.TotalZtr')}}</h3>
                         <p>{{numberWithCommas(totalZTR , 6)}} ZTR</p>
                       </div>  
                       
                       <div  class="dividends-left"> 
                         <h3>{{$t('message.dividends.TotalZtrLock')}}</h3>
                       <p>{{numberWithCommas( (usageToken.totalStakeEcoPower + usageToken.totalStakeTradingPower + usageToken.totalStakeVotingPower) , 6)}} ZTR</p>
                       </div> 
 
                     </div>      
                    <div>
                          <b-row>  
                           <b-col class="text-center" lg="4" md="12">
                            <!-- <h3>Total EcoPower</h3> -->
                            <h3>{{$t('message.dividends.TotalEcopower')}}</h3>
                            <p>{{numberWithCommas( totalToken.totalEcoPower ,6)}}</p>
                          </b-col>
                          <b-col class="text-center" lg="4" md="12">
                            <!-- <h3>Total TradingPower</h3> -->
                            <h3>{{$t('message.dividends.TotalTradingPower')}}</h3>

                           <p>{{numberWithCommas(usageToken.totalTradingPower, 6)}}</p>
                         </b-col>
                          <b-col class="text-center" lg="4" md="12">
                            <!-- <h3>Total VotingPower</h3> -->
                            <h3>{{$t('message.dividends.TotalVotingPower')}}</h3>
                           <p>{{numberWithCommas(totalToken.totalVotingPower , 6)}}</p>
                         </b-col>                      
                             
                         </b-row>
                    </div>
                 </div>
                 <br>

                  
                
                 <div class="content-dividends" ref="about-mining">

                     <h2>{{$t('message.dividends.About')}}</h2>
                     <h3 class="text-center">{{$t('message.dividends.Difficulty')}}</h3>

                   
                     <p class="text-center">{{numberWithCommas(difficulty , 0)}} TRX  = 1 ZTR</p>      
                 </div>
                 <br>

                 <div class="content-dividends" ref="ztr-dividends">
                     <b-row>
                      
                         <b-col lg="4" md="12">
                           <h2>{{$t('message.dividends.Dividends')}}</h2>     
                         </b-col>
                 
                         <b-col class="text-center" lg="4" md="6">
                             <div>
                                   <div class="time" v-if="isHalfTime == false">
                                    <span>{{$t('message.dividends.distributionCountdown')}}</span>
                                     <span>
                                       <span class="time-coudown">{{cd_start.hour}}</span> :
                                       <span class="time-coudown">{{cd_start.min}}</span> :
                                       <span class="time-coudown">{{cd_start.sec}}</span>
                                     </span>
                                   </div>  
                             </div> 
                         </b-col>
                 
                         <b-col lg="4" md="6">
                            <b-button style="width: 100%;" variant="primary" class="btn-lock mb-3" @click="withdrawDividends">{{$t('message.ecoPower.withdraw')}}</b-button>
                         </b-col>

                     </b-row>


                     <b-row>                        
                         <b-col class="text-center" lg="3" md="12">
                            <h3>{{$t('message.dividends.TotalDividendsByWeek')}}</h3>

                             <p>{{numberWithCommas(weekDividends, 6)}} TRX</p>
                         </b-col>
                         <b-col class="text-center" lg="3" md="12">
                            <h3>{{$t('message.dividends.TotalDividendsByDay')}}</h3>

                             <p>{{numberWithCommas(totalDividends, 6)}} TRX</p>
                         </b-col>
                         <b-col class="text-center" lg="3" md="12">
                            <h3>{{$t('message.dividends.TotalEcopower')}}</h3>

                             <p>{{numberWithCommas(totalEcoPower, 6)}}</p>
                         </b-col>
                         <b-col class="text-center" lg="3" md="12">
                            <h3>{{$t('message.dividends.ecoPowerMySelf')}}</h3>
                            <p class="text-center">{{ numberWithCommas(ecoPower , 6) }}</p>
                         </b-col>

                         <b-col class="text-center" lg="4" md="12">
                             <h3>{{$t('message.dividends.YourDividendsByDay')}}</h3>
                             <p>{{ displayFloatValue(calDividendsByDay(), 6) }} TRX</p>
                         </b-col>
                         <b-col class="text-center" lg="4" md="12">
                            <h3>{{$t('message.dividends.YourDividends')}}</h3>

                             <p class="text-center">{{ numberWithCommasTest(userDividends, 6) }} TRX</p>
                         </b-col>
                         <b-col class="text-center" lg="4" md="12">
                            <h3>{{$t('message.dividends.YourAvailableBalance')}}</h3>

                             <p class="text-center">{{ numberWithCommasTest(userAvailableBalance, 6) }} TRX</p>
                         </b-col>
                     </b-row>
                 </div>            
               </b-container>

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
          </div>
</template>
<script>
/*Vuex*/
import { mapGetters, mapActions } from 'vuex'

import MYTronWeb from './../../js/tron-web.js'
import  ZTRDividends  from './../../js/ZTRDividends.js'

export default {
  computed: {
      ...mapGetters([
        'ecoPower',
        'userDividends',
        'userAvailableBalance',
        'timeEndRound',
        'totalEcoPower',
        'totalDividends',
        'weekDividends',
        'timeStartRound',
        'difficulty',
        'totalZTR',
        'usageToken',
        'totalEcoPower',
        'totalToken',
        'checkRegister',
        'tradeCheckLogin'
      ])
  },
  data () {
    return {  
      isHalfTime:false,
      "cd_start": {
          "hour": '00',
          "min": '00',
          "sec": '00'
        },
    }
  },
  mounted () {
      this.onEndRoundTimeChange();
      this.countDown();
  },
  destroyed() {
   clearInterval(this.getGameDetailInterval);
  },
  methods: {
    goto(refName) {
        var element = this.$refs[refName];
        var top = element.offsetTop;
        window.scrollTo(0, top);
    },
    /*--------------------------- ON CHANGE STORE ----------------------------*/

    onEndRoundTimeChange() {
        this.$store.watch(
          (state)=>{
              return this.$store.getters.timeEndRound;
          },
          (val)=>{
            // if (val != 0 && val) {
            //   this.countDown();
            // }
          },
          {
            deep:true
          }
        ); 
      },


    /*----------------------- VALIDATE , CHECK , EVENT -----------------------*/
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
    numberWithCommas(x, decimals = 3) {
        if (isNaN(x) == true) x = 0;
        x = parseFloat(x).toFixed(decimals);
        x  = x.split(".");
        x[0] = x[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        x = x.join('.');
        return x;
    },
    numberWithCommasTest(x, decimals = 3) {
      // console.log(isNaN(x));
      // console.log(x);
        if (isNaN(x) == true) x = 0;
        x = parseFloat(x).toFixed(decimals);
        x  = x.split(".");
        x[0] = x[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        x = x.join('.');
        return x;
    },
    countDown () {
        let self = this;
        self.getGameDetailInterval =   setInterval(() => {
            let startTime = parseFloat(self.timeEndRound);
            let now = ( new Date() ).getTime() / 1000;
            let cd = startTime - now;
            if ( cd > 0 ) {
              self.isHalfTime = false;
              self.cd_start = self.getTimeCountDown(cd);
            } else {
              self.isHalfTime = true;
            }
        }, 1000);
    },
      calPercentDividends() {
        let ecoMySelf     = parseFloat(this.ecoPower);
        let totalEco      = parseFloat(this.totalEcoPower);
        if (totalEco <= 0) return 0;
        return ecoMySelf / totalEco;
      },
      calDividendsByDay() {
        return parseFloat(this.totalDividends) * this.calPercentDividends();
      },
      displayFloatValue(value, num = 6) {
        return parseFloat(value).toFixed(num); 
      },

    /*------------------------------- FUNCTION -------------------------------*/
      redirectToWhitePaper() {
      if (this.$i18n.locale == 'en') {
        window.open('/Zethyr-White-Paper-Draft-en.pdf', '_blank');
      } else {
        window.open('/Zethyr-White-Paper-Draft-ru.pdf', '_blank');
      }
      },
      withdrawDividends(){
        if (typeof(window.tronWeb) === 'undefined') {
          this.showModalCheckLogin();
        } else if(tronWeb.fullNode.host != process.env.FUll_NODE && tronWeb.fullNode.host != process.env.FUll_NODE_DEFAULT) {
          this.showModalCheckSwitchNode();
        } else if (MYTronWeb.getAccount() == false) {
          this.showModalCheckLogin();
        } else {
          ZTRDividends.withdraw();
        }        
      },
      endRound(){
        ZTRDividends.endRound(function(err,endRoundSucces) {});
      },
      dealNum (val) {
        var str = Math.floor(val)
        return (str < 10 ? '0' : '') + str
      },
      getTimeCountDown(time) {
          return {
            "hour": this.dealNum((time % (24 * 60 * 60)) / (60 * 60)),
            "min": this.dealNum((time % (60 * 60)) / 60),
            "sec": this.dealNum(time % 60)
          };
      },
  }
}
</script>

<style lang="scss" scoped>
  .ztr-help:hover {
    color: #6F94F7 !important;
  }
  .dividends-page .banner-top ul li:before {
    color: #6F94F7 !important;
  }
</style>
