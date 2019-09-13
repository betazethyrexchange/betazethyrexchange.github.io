  <template>
  <div>
                  <div class="account clearfix">
                      <div class="infor-account introduce">
                        <div class="introduce-header">
                          <b-row>
                               <b-col md="6">
                                  <div>{{$t('message.tradingPower.label')}}</div>
                                </b-col>
                                <b-col md="6">
                                 <!--  <div class="text-right">
                                    <span>{{ numberWithCommasWithMathfloor(userRewardPoint, 0) }}</span>
                                    <span> {{$t('message.label.point')}}</span>
                                  </div> -->
                                </b-col>
                          </b-row>  
                        </div>  
                        <div class="introduce-content">
                          {{$t('message.tradingPower.introduceContent1')}}<br>
                          {{$t('message.tradingPower.introduceContent2')}}
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
                                  <h4 class="text-center">{{ numberWithCommas(tradingPowerLock) }}</h4>
                                  <!-- <b-button variant="primary" class="text-center unlock" @click="showModal" >UnLock</b-button> -->
                              </b-col>

                              <b-col class="item">
                                  <p>{{$t('message.trade.freeTradingQuota')}}</p>
                                  <h4 class="text-center">{{ numberWithCommas(tradingPower) }}</h4>
                                  <!-- <b-button variant="primary" class="text-center unlock" @click="showModal" >UnLock</b-button> -->
                              </b-col>
                              <b-col class="item">
                                  <p>{{$t('message.tradingPower.label')}}</p>
                                  <h2 class="text-center">{{ numberWithCommas(tradingPowerLock)}}</h2>
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


                                              <b-form-input :value="zethyr" name="zethyr" v-on:keyup.native="checkVal" @focus.native="onFocusEnterAmout($event)" :placeholder="placeholderInputValue.myaccountPleaseStake" type="number"></b-form-input>


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
                                <th>{{$t('message.tradingPower.label')}}</th> 
                                <th>{{$t('message.trade.freeTradingQuota')}}</th> 
                                <th>{{$t('message.label.unfreezeTime')}}</th>
                                <th>{{$t('message.label.action')}}</th>
                              </tr>
                              <tr v-for="item in listBlock">
                                <td>ZTR</td>
                                <td>{{ numberWithCommas(item.tokens) }}</td>
                                <td>{{ numberWithCommas(item.tokens) }}</td> 
                                <td>{{ numberWithCommas(item.value) }}</td> 
                                <td>{{convertTime(item.stakeTime + PERIOD_UNLOCK * 1000 )}}</td>
                                <td  @click="showModalComfirm(item)" :class="{ unlock: ((checkUnstake(item))  == true), notUnlock: ((checkUnstake(item))  == false),  cursor: ((checkUnstake(item))  == true) }" >  {{$t('message.label.unstake')}}</td>
                              </tr>
                          </table>
                        </div>             
                  </div>
                  <!-- MOdal -->
                  <b-modal ref="comfirm-lock-ZTR" hide-footer hide-header>   
                      <div class="confirm-message">
                         <p class="text-center">{{$t('message.label.comfirm')}}</p>
                      </div>  
                      <div class="confirm-btn text-center">     
                            <button class="btn-lock" @click="hideModalComfirm()">{{$t('message.label.cancel')}}</button>
                            <button class="btn-lock" @click="unstakeToken(infomationUser)"> {{$t('message.label.ok')}}</button>
                      </div> 
                  </b-modal>
                  <!-- End Modal -->


                   <!-- Modal Check Node -->
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



                  <div class="panigate" v-if="numberPageTradingPower > 1">
                                <paginate
                                  :page-count="numberPageTradingPower"
                                  :page-range="2"
                                  :click-handler="clickPage"
                                  :prev-text="''"
                                  :next-text="''"
                                  :prev-link-class="'fa fa-angle-double-left'"
                                  :next-link-class="'fa fa-angle-double-right'"
                                  :container-class="'pagination'"
                                  :page-class="'page-item'">
                                </paginate>
                  </div>  
  </div>
</template>
<script>
/*Vuex*/
import { mapGetters, mapActions } from 'vuex'

import  TradingPowerContract  from './../../../js/TradingPower.js'
import  ZtrContract  from './../../../js/Ztr.js' 
/*Utils*/
import UtilsConvertTime from './../../../utils/convertTime.js'
/*Components*/
export default {
  computed: {
      ...mapGetters([
        'tradeListToken',
        'tradeIdActive',
        'userToken',
        'tradingPowerLock',
        'tradingPower',
        'userZethyr',
        'userRewardPoint',
        'listBlock',
        'userTrx',
        'numberPageTradingPower',
        'pageLockToken',
        'numberLockByDayTrading',
        'accountAddress',
        'changeLang',
        'placeholderInputValue'
      ])
  },
  mounted(){
      this.onLanguageChange();
      this.setPlaceholderValue();
      this.onAccountChange();
      this.makeJqueryEvent();

      this.PERIOD_UNLOCK =  parseInt(process.env.PERIOD_UNLOCK);
  },
  data () {
    return {  
        zethyr: '',
        errLockZtr: '',
        infomationUser:{},
        PERIOD_UNLOCK : 0,
    }
  },
  methods: {

      ...mapActions([
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

      
      // /*--------------------------- ON CHANGE STORE ----------------------------*/

      onLanguageChange() {
        this.$store.watch(
          (state)=>{
            return this.$store.getters.changeLang;
          },
          (val)=>{
 
           if(this.$route.path == '/trading-power'){
              this.setPlaceholderValue();
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
                this.errLockZtr = '';
          },  
          {
            deep:true
          }
        ); 
      },

      /*----------------------- VALIDATE , CHECK , EVENT -----------------------*/
      convertTime(timeStamps){
        return  timeStamps = UtilsConvertTime.formatOrderDate(timeStamps);
      },
      onFocusEnterAmout(event) {
          this.errLockZtr = '';
      },
      clickPage(num){
          this.initUserListBlock({page : num , limit:10, type : 1});
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
            // const matches = regex.exec(this.zethyr);
            // if(matches == null){
            //     this.zethyr = this.zethyr;
            // }else{
            //     this.zethyr = '';
            // }
      },
      showModal() {
        let switchNode = tronWeb.fullNode.host;
        if(switchNode != process.env.FUll_NODE){
            this.showModalCheckSwitchNode();
            return false;
        }
        this.$refs['lock-trading-power'].show();
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
      displayFloatValue(value, num = 6) {
        return parseFloat(value).toFixed(num); 
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
        TradingPowerContract.unstakeToken({ stakeId },function(callback){
          self.hideModalComfirm();
        });
      },
      stakeToken(){
        /* Check Node*/
        let switchNode = tronWeb.fullNode.host;
        if(switchNode != process.env.FUll_NODE){
            this.showModalCheckSwitchNode();
        }
        /* validate */
        let self = this;
        let tokens = self.zethyr;
        if(tokens == '' || tokens == 0){
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
        ZtrContract.approve(process.env.TradingPowerContractAddress , self.zethyr, function(err, sucess) {
            if(err) return false;
            TradingPowerContract.stateToken({ tokens }, function(status) {
              if(!status) return false;
              self.hideModal();
              self.zethyr = '';
            });  
        });
      },
     
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