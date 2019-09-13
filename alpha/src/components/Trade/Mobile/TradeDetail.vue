<template>
      <div class="exchange-content trade-page" style="background: #fff;">
        <b-container>
            <div class="exchange-content-top clearfix d-flex">
                              <div class="trade-detail-left">
                                <div class="exchange-content-top-item" style="width: 100%">
                                    <div class="cursor">
                                      <span class="cursor" @click="showMarket">{{ tradeToken.tokenName }} / TRX</span> <img src="../../../assets/images/arrowdown.png" @click="showMarket">
                                    </div>
                                    <!-- <div>{{$t('message.tradeBitcoint')}}</div> -->
                                </div>
                                <div class="exchange-content-top-item">
                                    <div v-if="tradeToken && tradeToken.lastPrice">
                                      <span class="up mr-1"><span :class="{down:(checkMarketToken < 0) , up :(checkMarketToken > 0 )}">{{ numberWithCommas(tradeToken.lastPrice) }}</span></span> <span>${{numberWithCommas(tradeToken.lastPrice * priceUsdOnTrx,tradeSortByDecimal)}}</span>
                                    </div>
                                    <div v-else>_</div>

                                   <!--  <div>{{$t('message.tradeLastPrice')}}</div>
                                    <div>
                                      <span class="up mr-1">{{tradeToken.lastPrice}}</span> <span>${{displayFloatValue(tradeToken.lastPrice * 0.03222,tradeSortByDecimal)}}</span></div> -->
                                </div>
                                <div class="exchange-content-top-item">
                                    <div v-if="tradeToken && tradeToken.lastPrice">
                                      <span class="up mr-1"
                                       :class="{down:(!displayCssByPrice(tradeToken.lastPrice,tradeToken.price)) , up :(displayCssByPrice(tradeToken.lastPrice,tradeToken.price))}">
                                       {{numberWithCommas(tradeToken.lastPrice  -  tradeToken.price)}}
                                     </span>  
                                      <span class="up" v-if="tradeToken.price == 0 || tradeToken.price  == 'undefined'">+ {{displayFloatValuePercent(get24hChange(tradeToken))}}%</span>

                                      <span v-else >

                                            <span class="up" >
                                                      {{displayOperater(tradeToken.lastPrice  , tradeToken.price)}} 
                                            </span>

                                      <span :class="{down : (((tradeToken.lastPrice  -  tradeToken.price) / tradeToken.price) * 100 <0) ,
                                                    up : (((tradeToken.lastPrice  -  tradeToken.price) / tradeToken.price) * 100 >= 0) 
                                        }">
                                        {{displayFloatValuePercent(get24hChange(tradeToken))}}%
                                      </span>

                                    </span>
                                    </div>
                                    <div v-else>_</div>
                                </div>
            
                                <div class="exchange-content-top-item">
                                    <span>{{$t('message.trade.mobileVolume')}}</span>
                                    <span v-if="tradeToken && tradeToken.lastPrice">
                                      <span>{{numberWithCommas(tradeToken.volume)}} TRX</span>
                                    </span>
                                    <span v-else>_</span>
                                </div>
                              </div>  
                              <div class="trade-detail-right">
                                <div class="exchange-content-top-item">
                                    <span>{{$t('message.trade.mobileHigh')}}</span>
                                    <span v-if="tradeToken && tradeToken.lastPrice">
                                      <span>{{ numberWithCommas(tradeToken.high) }}</span>
                                    </span>
                                    <span v-else>_</span>
                                </div>
                                <div class="exchange-content-top-item">
                                    <span>{{$t('message.trade.mobileLow')}}</span>
                                    <span v-if="tradeToken && tradeToken.lastPrice">
                                      <span>{{ numberWithCommas(tradeToken.low) }}</span>
                                    </span>
                                    <span v-else>_</span>
                                </div>
                              </div>
                            </div>
           <TradeMarket ref='mobile-trade-market'/>
        </b-container>
      </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import TradeMarket from './TradeMarket.vue'


export default {
  components: {
    TradeMarket
  },
  data () {
      return {
        tradeDetail: {},
      }
    },
    computed: {
      ...mapGetters([
        'tradeToken',
        'tradeSortByDecimal',
        'priceUsdOnTrx',
        'checkMarketToken'
      ])
    },
    mounted () {
      
    },
    methods:{

      /*----------------------- VALIDATE , CHECK , EVENT -----------------------*/
     numberWithCommas(x, decimals = 3) {
        if (isNaN(x) == true) x = 0;
        x = parseFloat(x).toFixed(decimals);
        x  = x.split(".");
        x[0] = x[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        x = x.join('.');
        return x;
    },
      get24hChange(tradeDetail) {
        if (!tradeDetail) return 0;
        if (!tradeDetail.lastPrice) tradeDetail.lastPrice = 0;
        if (tradeDetail.price == 0 && tradeDetail.lastPrice > 0) return 100;
        if (tradeDetail.price == 0 && tradeDetail.lastPrice <= 0) return 0;
        return ((tradeDetail.lastPrice  -  tradeDetail.price) / tradeDetail.price) * 100;
      },
      displayCssByPrice(lastPrice, price){
          if((parseFloat(lastPrice)  - parseFloat(price) >= 0) ||  price == 0){
              return true;
              
          }else{
              return false;
          }
      },
      displayOperater(lastPrice , price){
          if(price == 0){
            return '+';
          }else if(((parseFloat(lastPrice)  - parseFloat(price)) / parseFloat(price)) >=0){
            return '+';
          }
      },
      displayPercentPrice(lastPrice , price){
          lastPrice = parseFloat(lastPrice);
          price     = parseFloat(price);
          if((lastPrice - price) / price * 100  >= 0 ){
            return true;
          }else{
            return false;
          }
      },
      displayFloatValue(value, num = 6) {
        if (isNaN(value) == true) value = 0;
        return parseFloat(value).toFixed(num); 
      },
      displayFloatValuePercent(value, num = 2) {
        return parseFloat(value).toFixed(num); 
      },
      showMarket() {
         this.$refs['mobile-trade-market'].showModal();
      },
    }
}
</script>
<style type="text/css">
  .up{
    color: green;
  }
  .down{
    color: red;
  }
</style>