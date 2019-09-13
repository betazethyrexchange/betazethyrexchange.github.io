  <template>
  <div>
                  <div class="account clearfix">
                      <div class="infor-account introduce">
                        <div class="introduce-header">
                          <b-row>
                               <b-col md="6">
                                  <div>{{$t('message.ecoPower.label')}}</div>
                                </b-col>
                                <b-col md="6">
                                  <!-- <div class="text-right">
                                    <span>{{ numberWithCommasWithMathfloor(userRewardPoint, 0) }}</span>
                                    <span> {{$t('message.label.point')}}</span>
                                  </div> -->
                                </b-col>
                          </b-row>  
                        </div>  
                        <div class="introduce-content">           
                          {{$t('message.ecoPower.introduceContent1')}}<br>
                          {{$t('message.ecoPower.introduceContent2')}}
                        </div> 
                      </div>
                  </div>
                  <div class="detail-assets">
                        <div class="trading">
                            <b-row>
                              <b-col class="item">
                                  <p >ZTR</p>
                                  <h4 class="text-center">{{ numberWithCommasWithMathfloor(userZethyr) }}</h4>
                                  <!-- <b-button variant="primary" class="text-center unlock" @click="showModal" >UnLock</b-button> -->
                              </b-col>
                              <b-col class="item">
                                  <p>{{$t('message.label.staked')}} (ZTR)</p>
                                  <h4 class="text-center">{{ numberWithCommas(ecoPowerBlock)  }}</h4>
                                  <!-- <b-button variant="primary" class="text-center unlock" @click="showModal" >UnLock</b-button> -->
                              </b-col>
                              <b-col class="item">
                                  <p>{{$t('message.ecoPower.label')}}</p>
                                  <h2 class="text-center">{{ numberWithCommas(ecoPower)   }}</h2>
                                  <center>
                                    <b-button variant="primary" class="btn-lock text-center mb-3" @click="showModal" >{{$t('message.label.stake')}}</b-button>  
                                  </center>

                                  <!-- Modal -->
                                  <b-modal ref="lock-trading-power" class="modal-unlock" hide-footer hide-header title="Locked">

                                    <div class="d-block">
                                        <b-row align-h="between" class="header">
                                          <b-col cols='9' >
                                            <h4 class="title">{{$t('message.label.stake')}}</h4>
                                          </b-col>
                                          <b-col cols='3'>
                                             <button type="button" aria-label="Close" class="close" @click="hideModal()"><img src="../../../assets/images/exit.png"></button>
                                          </b-col>
                                        </b-row>
                                        <p class="text-left" >{{$t('message.label.available')}}</p>
                                        <h4>{{ numberWithCommasWithMathfloor(userZethyr) }} ZTR</h4>
                                        <b-form-group class="text-left">
                                          <p>{{$t('message.label.enter')}}</p>
                                              <b-form-input v-model="zethyr" name="zethyr" v-on:keyup.native="checkVal" @focus.native="onFocusEnterAmout($event)" :placeholder="placeholderInputValue.myaccountPleaseStake" type="number"></b-form-input>

                                              <span class="error">{{errLockZtr}}</span>

                                        </b-form-group>
                                    </div>
                                    <b-button class="btn-lock mb-3" style="width: 100% !important" @click="stakeToken" >{{$t('message.label.stake')}}</b-button>
                                    <div class="note">
                                      <p>{{$t('message.note')}}:</p>
                                      <p>{{$t('message.noteStrake')}}</p>
                                      <!-- <p>{{$t('message.noteYou')}}</p> -->
                                      <p>{{$t('message.noteUnstrake')}}</p>
                                    </div>
                                  </b-modal>
                              </b-col>
                            </b-row>
                        </div>
                        <div class="table-trading">
                          <table>
                              <tr>
                                <th>{{$t('message.label.coin')}}</th>
                                <th>{{$t('message.label.staked')}}</th>
                                <th>{{$t('message.ecoPower.label')}}</th> 
                                <th>{{$t('message.label.unfreezeTime')}}</th>
                                <th>{{$t('message.label.action')}}</th>
                              </tr>
                              <tr v-for="item in listBlock">
                                <td>ZTR</td>
                                <td>{{ numberWithCommas(item.tokens) }}</td>
                                <td>{{ numberWithCommas(item.value) }}</td> 
                                <td>{{ convertTime(item.stakeTime + PERIOD_UNLOCK * 1000) }}</td>
                                <td @click="showModalComfirm(item)" :class="{ unlock: ((checkUnstake(item))  == true), notUnlock: ((checkUnstake(item))  == false), cursor: ((checkUnstake(item))  == true) }">  {{$t('message.label.unstake')}}</td>
                              </tr>
                          </table>
                            
                        </div>
                  </div>
                   <div class="panigate" v-if="numberPageEcoPower > 1">
                                <paginate
                                  :page-count="numberPageEcoPower"
                                  :page-range="3"
                                  :click-handler="clickPage"
                                  :prev-text="''"
                                  :next-text="''"
                                  :prev-link-class="'fa fa-angle-double-left'"
                                  :next-link-class="'fa fa-angle-double-right'"
                                  :container-class="'pagination'"
                                  :page-class="'page-item'">
                                </paginate>
                  </div> 
                  <!-- Modal -->
                  <b-modal ref="comfirm-lock-ZTR" hide-footer hide-header> 
                      <div class="confirm-message">
                         <p class="text-center">{{$t('message.label.comfirm')}}</p>
                      </div>  
                      <div class="confirm-btn text-center">     
                            <button class="btn-lock" @click="hideModalComfirm()">{{$t('message.label.cancel')}}</button>
                            <button class="btn-lock" @click="unstakeToken(infomationUser)"> {{$t('message.label.ok')}}</button>
                      </div>   
                  </b-modal>
                  <!-- End Modal  -->
                  <!-- Start Dividends Modal -->
                  <b-modal ref="my-modal" hide-footer title="ZTR Dividends">
                                          <b-row>
                                              <b-col cols="6">
                                                <div class="dividends-time mb-3">
                                                  
                                                  <label class="mb-3">{{ isHalfTime == false ? 'End Time' : 'End Now' }}</label>
                                                  <div class="btn-end-round" v-if="isHalfTime == true">
                                                    <b-button style="width: 100%;" class="btn-lock" @click="endRound" variant="primary">{{$t('message.ecoPower.endRound')}}</b-button>
                                                  </div>
                                                  <div class="time" v-if="isHalfTime == false">
                                                    <span>
                                                      <span class="time-coudown">{{cd_start.hour}}</span> :
                                                      <span class="time-coudown">{{cd_start.min}}</span> :
                                                      <span class="time-coudown">{{cd_start.sec}}</span>
                                                    </span>
                                                  </div>  
                                                </div>  
                                                <div class="dividends-total-dividends mb-3">
                                                  <label class="mb-3">{{$t('message.ecoPower.total')}}</label>
                                                  <p>{{totalDividends}} TRX</p>
                                                </div>
                                                <div class="dividends-your-dividends-by-day">
                                                  <label class="mb-3">{{$t('message.ecoPower.yourDividendsByDay')}}</label>
                                                  <p>{{ displayFloatValue(calPercentDividends() * 100, 2)}}%({{ displayFloatValue(calDividendsByDay(), 6) }} TRX)</p>
                                                </div>  
                                              </b-col>
                                              <b-col cols="6" class="dividends-your-dividends">
                                                <div class="title mb-5 text-center">
                                                  <label>{{$t('message.ecoPower.yourDividends')}}</label>
                                                </div>
                                                <div class="your-dividends mb-5">
                                                  <p class="text-center">{{userDividends}} TRX</p>
                                                </div>
                                                <div class="btn-withdraw">
                                                  <b-button style="float: right; width: 100%;" variant="primary" class="btn-lock mb-3" @click="withdrawDividends">{{$t('message.ecoPower.withdraw')}}</b-button>
                                                </div>  
                                              </b-col>
                                          </b-row>
                  </b-modal>
                  <!-- End Dividends Modal -->


                  <!-- Modal Check Node -->

     
                  <!-- End Dividends Modal -->

                  <b-modal ref="modal-check-switch-node" class="modal-unlock-2"  hide-footer hide-header>
                      <div class="d-block">
                        <div class="header-modal clearfix">
                            <button type="button" aria-label="Close" class="close" @click="hideModalCheckSwitchNode()"><img src="../../../assets/images/exit.png"></button>
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
                  <!-- End Modal  -->
  </div>
</template>
<script>
/*Vuex*/
import { mapGetters, mapActions } from 'vuex'

import  EcoPowerContract  from './../../../js/EcoPower.js'
import  ZtrContract  from './../../../js/Ztr.js'
import  ZTRDividends  from './../../../js/ZTRDividends.js'

/*Utils*/
import UtilsConvertTime from './../../../utils/convertTime.js'
/*Components*/
export default {
  computed: {
      ...mapGetters([
        'ecoPowerBlock',
        'ecoPower',
        'listBlock',
        'userZethyr',
        'userRewardPoint',
        'userDividends',
        'numberPageEcoPower',
        'pageLockEcoPower',
        'timeEndRound',
        'totalEcoPower',
        'totalDividends',
        'timeStartRound',
        'numberLockByDayEco',
        'accountAddress',
        'changeLang',
        'placeholderInputValue'
      ])
  },
  data () {
    return {  
        zethyr: '',
        errLockZtr: '',
        isHalfTime: false,
        perPage: 5,
        currentPage: 1,
        timeEnd: 0,
        "cd_start": {
          "hour": '00',
          "min": '00',
          "sec": '00'
        },
        infomationUser:{},
        PERIOD_UNLOCK:0,
    }
  },
  mounted () {
    this.timeEnd = this.timeEndRound;

    this.onLanguageChange();
    this.setPlaceholderValue();
    this.onAccountChange();
    this.makeJqueryEvent();

    this.PERIOD_UNLOCK =  parseInt(process.env.PERIOD_UNLOCK);
  },
  methods: {
      ...mapActions([
          'setLoadPage',
          'setPageLockEcoPower',
          'setUserZethyr',
          'setUserEcoPower',
          'setUserEcoPowerLock',
          'setNumberLockByDayEco',
          'initUserListBlock',
          'setPlaceholderInputValue'
      ]),

      /*--------------------------------- GET DATA ---------------------------------*/

      setPlaceholderValue(){
        let placeholder  = {
          tradeSearch         : this.$t('message.trade.search'),
          myaccountPleaseStake: this.$t('message.label.placeholderStaked'),
        }
        this.setPlaceholderInputValue(placeholder);
      },

      /*--------------------------- ON CHANGE STORE ----------------------------*/
      onLanguageChange() {
        this.$store.watch(
          (state)=>{
            return this.$store.getters.changeLang;
          },
          (val)=>{
              if(this.$route.path == '/eco-power'){
                this.setPlaceholderValue();
              }
          },
          {
            deep:true
          }
        ); 
      },
      onEndRoundTimeChange() {
        this.$store.watch(
          (state)=>{
              return this.$store.getters.timeEndRound;
          },
          (val)=>{
            if (val != 0 && val != this.timeEnd) {
              this.timeEnd = val;
            }
            this.countDown();
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
                this.errLockZtr = '';
          },  
          {
            deep:true
          }
        ); 
      },

      /*----------------------- VALIDATE , CHECK , EVENT -----------------------*/
      convertTime(timeStamps){
      
        // let time = UtilsConvertTime.formatOrderDate(timeStamps);
        return timeStamps = UtilsConvertTime.formatOrderDate(timeStamps)
      },
      onFocusEnterAmout(event) {
          this.errLockZtr = '';
      },
      makeJqueryEvent() {
        const REGEX_ZTR = /\d{0,99}(\.\d{0,3})?/;
        let self = this;
        $(function() {
          makeEventChangeZtr();
        });
        function makeEventChangeZtr() {
          $('input[type=number][name="zethyr"]').on('input', function() {
            this.value = this.value.match(REGEX_ZTR)[0];
            self.zethyr = this.value;
          });
        }
      },
      checkVal(){
          // const regex = /\d{0,99}(\.\d{0,3})?/;
          // this.zethyr = this.zethyr.match(regex)[0];
         // const regex = /\d{0,99}(\.\d[0-9]{3})/;
         //    const matches = regex.exec(this.zethyr);
         //    if(matches == null){
         //        this.zethyr = this.zethyr;
         //    }else{
         //        this.zethyr = '';
         //    }
      },
      numberWithCommas(x, decimals = 3) {
        if (isNaN(x) == true) x = 0;
        x = parseFloat(x).toFixed(decimals);
        x  = x.split(".");
        x[0] = x[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        x = x.join('.');
        return x;
      },
      numberWithCommasWithMathfloor(x, decimals = 3) {
        if (isNaN(x) == true) x = 0;
        x =  (Math.floor(x* 1000) / 1000).toFixed(decimals);
        x  = x.split(".");
        x[0] = x[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        x = x.join('.');
        return x;
      },
      countDown () {
        let self = this;
        setInterval(() => {
            let startTime = parseFloat(self.timeEnd);
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
      getTimeCountDown(time) {
          return {
            "hour": this.dealNum((time % (24 * 60 * 60)) / (60 * 60)),
            "min": this.dealNum((time % (60 * 60)) / 60),
            "sec": this.dealNum(time % 60)
          };
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
      clickPage(number){
          this.initUserListBlock({page : number , limit: 10, type : 2});
      },
      showModalDividends() {

        this.$refs['my-modal'].show();
      },
      hideModalDividends() {
        this.$refs['my-modal'].hide();
      },
      showModal() {
        let switchNode = tronWeb.fullNode.host;
        if(switchNode != process.env.FUll_NODE){
            this.showModalCheckSwitchNode();
            return false;
        }
        this.$refs['lock-trading-power'].show()
      },
      hideModal() {
        this.$refs['lock-trading-power'].hide();
        this.errLockZtr = '';

      },
      showModalCheckSwitchNode(){
        this.$refs['modal-check-switch-node'].show();
      },
      hideModalCheckSwitchNode() {
        this.$refs['modal-check-switch-node'].hide();
      },
      showModalComfirm(item) {
        if (this.checkUnstake(item) == false) {
          return false;
        }
        let switchNode = tronWeb.fullNode.host;
        if(switchNode != process.env.FUll_NODE){
            this.showModalCheckSwitchNode();
            return false;
        }
        this.infomationUser = item;
        this.$refs['comfirm-lock-ZTR'].show();
      },
      hideModalComfirm() {
        this.$refs['comfirm-lock-ZTR'].hide()
      },
     
      checkUnstake(stakeDetail){
          let stakeId = stakeDetail.stakeId;
          let now = (new Date()).getTime();
          let periodUnlock = parseInt(process.env.PERIOD_UNLOCK);
          if (now <= (stakeDetail.stakeTime + periodUnlock * 1000)) {
            return false;
          }
            return true;
      },
      displayFloatValue(value, num = 6) {
        return parseFloat(value).toFixed(num); 
      },
      dealNum (val) {
          var str = Math.floor(val)
          return (str < 10 ? '0' : '') + str
      },

      /*------------------------------- FUNCTION -------------------------------*/

      unstakeToken(stakeDetail){
        /* Check Node*/

        let switchNode = tronWeb.fullNode.host;
        if(switchNode != process.env.FUll_NODE){
            this.showModalCheckSwitchNode();
        }

        /* validate */


        
        let self = this;
        let stakeId = stakeDetail.stakeId;
        let now = (new Date()).getTime();
        let periodUnlock = parseInt(process.env.PERIOD_UNLOCK);
        if (now <= (stakeDetail.stakeTime + periodUnlock * 1000)) {
          alert(this.$t('message.errLock'));
          this.hideModalComfirm();
          return;
        }
        EcoPowerContract.unstakeToken({ stakeId } ,function(callback){
           self.hideModalComfirm();
        });


      },
      stakeToken() {
        /* Check Node*/
        let switchNode = tronWeb.fullNode.host;
        if(switchNode != process.env.FUll_NODE){
            this.showModalCheckSwitchNode();
        }
        /* validate */
        this.errLockZtr = '';
        let self = this;
        let tokens = self.zethyr;
        if(tokens == '' || tokens == 0) {
          self.errLockZtr = self.$t('message.errEnterZtr');
          return false;
        }
        if(tokens < 1){
            self.errLockZtr = self.$t('message.errMinimum');
            return false;
        }
        if(tokens >  self.userZethyr){
            self.errLockZtr = self.$t('message.errTokenEnoght');
            return false;
        }
        ZtrContract.approve(process.env.EcoPowerContractAddress , self.zethyr, function(err, sucess) {
            if(err) return false;
            EcoPowerContract.stateToken({ tokens }, function(status) {
              if(!status) return false;
              self.hideModal();
              self.zethyr = '';
            });  
        });
      },
      withdrawDividends(){
        ZTRDividends.withdraw();        
      },
      endRound(){
        ZTRDividends.endRound(function(err,endRoundSucces) {});
      }
  }
}
</script>

<style lang="scss" scoped>
  .notUnlock{
      color:black !important;
  }
  .unlock{
      color : #6892FF !important;
  }
</style>
