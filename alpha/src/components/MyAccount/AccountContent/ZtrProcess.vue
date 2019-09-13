  <template>
  <div>
                  <div class="account clearfix">
                      <div class="infor-account introduce">
                        <div class="introduce-header">
                          <b-row>
                               <b-col md="6">
                                  <div>{{$t('message.ztrProcess.ztr')}}</div>
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
                          {{$t('message.ztrProcess.desscription')}}
                        </div> 
                      </div>
                  </div>
                  <div class="detail-assets clearfix">
                    <div>{{$t('message.ztrProcess.YourZTR')}} : {{userZethyr}}</div>
                      
                    <div>{{$t('message.ztrProcess.ZtrMiningProcess')}}</div>
                  
                <b-row>
                  <b-col md="12" xl="6">
                    <b-progress :max="parseFloat(difficulty)">
                  <b-progress-bar  :label="`${((parseFloat(userRewardPoint) / parseFloat(difficulty)) * 100).toFixed(2)}%`" :value="parseFloat(userRewardPoint)"  show-progress >
                  </b-progress-bar>

                </b-progress>


                      <span class="pull-left">{{numberWithCommasWithMathfloor(userRewardPoint , 0)}} TRX</span>
                      <span class="pull-right">{{numberWithCommasWithMathfloor(difficulty , 0)}} TRX</span>
                  </b-col>
                  <b-col></b-col>
                </b-row>
                
            
  
                      <span>{{$t('message.ztrProcess.trade')}} {{ numberWithCommasWithMathfloor(difficulty - userRewardPoint , 0) }} {{$t('message.ztrProcess.TRX')}}</span>

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
        'userRewardPoint',
        'difficulty',
        'userZethyr'
      ])
  },
  mounted(){
     
  },
  data () {
    return {  
    }
  },
  methods: {  
      numberWithCommasWithMathfloor(x, decimals = 3) {
        if (isNaN(x) == true) x = 0;
        x =  (Math.floor(x* 1000) / 1000).toFixed(decimals);
        x  = x.split(".");
        x[0] = x[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        x = x.join('.');
        return x;
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
  .progress-bar{
      background-color:rgba(107, 175, 244, 0.84);
    }
</style>