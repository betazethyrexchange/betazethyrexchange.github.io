<template>
   <b-modal ref="modal-trade-market" hide-footer hide-header>
      <div class="exchange-left-side exchange-right-side-list mb-3">
        <div class="market-label">
            <span @click="hideModal" class="cursor">Close</span>
        </div> 
        <div class="current-market">
          <label>Current: {{ tradeToken.tokenName }}</span>/TRX</label>
        </div> 
        <div class="scroll-table market-tabel">
          <table>
            <tr v-for="item in tradeListToken" v-if="showTrade(item)" @click="changePair(item)" class="cursor">
              <td>{{ item.tokenName }}/TRX</td>
              <td class="text-right">{{ item.lastPrice ? numberWithCommas(item.lastPrice, 6) : numberWithCommas(0, 6) }}</td> 
              <td class="text-right" v-if="showChange==true">
                <span :class="{ up: (item.changed >= 0 || !item.changed ), down: (item.changed < 0) }">{{ item.changed ? displayFloatValue(item.changed) : displayFloatValue(0)  }}%
                </span>
              </td>
              <td class="text-right" v-if="showVolume==true">
                <span >{{ numberWithCommas(displayFloatValue(item.volume), 2)  }}
                </span>
              </td>
              <td><img src="../../../assets/images/star.png" class="img-star"></td>
            </tr>
          </table>
        </div>
      </div>
  </b-modal>
</template>

<script>

  import { mapGetters, mapActions } from 'vuex';
  import UtilsHandleArray from '../../../utils/handleArray'; 

  import ConfigCookieKey from '../../../../../config/cookie.key.js'

  export default {
    data () {
      return {
        pairKeyword: '',
        choose:'changed',
        indexListToken:[],
        isAsc: false,
        listNew:[],
        sortByA_Z:true,
        sortByZ_A:false,
        showChange:true,
        showVolume:false
      }
    },
    computed: {
      ...mapGetters([
        'tradeListToken',
        'tradeToken'
      ])
    },
    mounted () {  

    },
    methods: {
      /** ---------------------------------------------------------------------------------------------------------
      * Action Map By Store
      *  ----------------------------------------------------------------------------------------------------------
      */
      ...mapActions([
          'setTradeIdActive',
          'setTradeToken'
      ]),

      /*----------------------- VALIDATE , CHECK , EVENT -----------------------*/
      numberWithCommas(x, decimals = 3) {
        if (isNaN(x) == true) x = 0;
        x = parseFloat(x).toFixed(decimals);
        x  = x.split(".");
        x[0] = x[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        x = x.join('.');
        return x;
    },
      showModal() {
        this.$refs['modal-trade-market'].show()
      },
      hideModal() {
        this.$refs['modal-trade-market'].hide()
      },
      showChangeChange() {
        // console.log('aaa');
        this.showChange = true;
        this.showVolume = false;
      },
      showVolumeChange() {
         this.showChange = false;
         this.showVolume = true;
      },
      changePair(trade) {
        let time = parseInt(process.env.TIME_COOKIE);
        this.$cookies.set(ConfigCookieKey.pair,trade.tokenPair,time);
        let tradeId = trade.tokenPair
        this.setTradeIdActive(tradeId);
        this.setTradeToken(trade);
        this.hideModal();
        this.$router.push({name:'trade', params: { id: tradeId }});
      },
      displayFloatValue(value,toFixed = 2) {
        return parseFloat(value).toFixed(toFixed); 
      },
      displayFloatValuePrice(value,toFixed = 6) {
        return parseFloat(value).toFixed(toFixed); 
      },
      showTrade(tradeDetail) {
        if (this.pairKeyword == '') {
          return true;
        }
        if (tradeDetail.tokenName.toLowerCase().includes(this.pairKeyword.toLowerCase()) == true) {
          return true;
        }
        return false;
      },
      sort() {
        this.isAsc = !this.isAsc;
      }
    }

  }
</script>

<style lang="scss" scoped>
  
</style>
