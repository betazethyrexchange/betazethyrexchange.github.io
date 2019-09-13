<template>
  <div class="exchange-left-side exchange-right-side-list mb-3 sidebar">
    <div class="select-search">
      <div class="search-checkbox d-flex align-items-center justify-content-between">
        <div class="search mr-2">
          <button type="submit"><img src="../../assets/images/search.png"></button>
          <b-form-input v-model="pairKeyword" :placeholder="placeholderInputValue.tradeSearch" type="text" style="font-size: 11px"></b-form-input>
        </div>
        <div class="checkbox d-flex align-items-center ml-1">
          <!-- <div class="checkbox-item"></div> -->
          <label class="checkbox-item mr-3">{{$t('message.trade.changeMarket')}}
            <input type="radio" checked="checked" v-on:change="showChangeChange" id="one" value="changed" v-model="choose">
            <span class="checkmark"></span>
          </label>
          <label class="checkbox-item">{{$t('message.trade.volumeMarket')}}
            <input type="radio" name="radio" v-on:change="showVolumeChange" id="two" value="volume" v-model="choose">
            <span class="checkmark"></span>
          </label>
        </div>
      </div>
    </div>
    <div class="scroll-table market-label">
      <table>
        <tr>
          <th></th>
          <th @click="sort" class="cursor">{{$t('message.trade.Pair')}}
            <img v-if="isAsc == false" src="../../assets/images/arrowdown.png">
            <img v-if="isAsc == true" src="../../assets/images/arrowdown.png" style="transform: rotate(-180deg);-moz-transform: rotate(-180deg);-webkit-transform: rotate(-180deg);-o-transform: rotate(-180deg);"> 
          </th>
          <th class="text-right">{{$t('message.trade.price')}}</th> 
          <th class="text-right">{{ (showChange == true) ? $t('message.trade.changeMarket') : $t('message.trade.volumeMarket') }}</th>
        </tr>
      </table>
    </div>  
    <div class="scroll-table market-tabel">
      <table>
        <tr v-for="item in tradeList" v-if="showTrade(item)" @click="changePair(item)" class="cursor">
          <td><img src="../../assets/images/star.png" class="img-star"></td>
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
        </tr>
      </table>
    </div>
  </div>
</template>

<script>

  import { mapGetters, mapActions } from 'vuex';
  import UtilsHandleArray from '../../utils/handleArray'; 

  import ConfigCookieKey from '../../../../config/cookie.key.js'

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
        showVolume:false,
      }
    },
    computed: {
      ...mapGetters([
        'tradeListToken',
        'changeLang',
        'placeholderInputValue'
      ]),
      tradeList: function() {
        return UtilsHandleArray.sortArray(this.tradeListToken, 'tokenName', this.isAsc, true);
      }  
    },
    mounted () {  
        this.setPlaceholderValue();
        this.onLanguageChange();
    },
    
    methods: {
      /** ---------------------------------------------------------------------------------------------------------
      * Action Map By Store
      *  ----------------------------------------------------------------------------------------------------------
      */
      ...mapActions([
          'setTradeIdActive',
          'setTradeToken',
          'setPlaceholderInputValue'

      ]),

      /*----------------------- ON CHANGE STORE -----------------------*/

      onLanguageChange() {
        this.$store.watch(
          (state)=>{
            return this.$store.getters.changeLang;
          },
          (val)=>{
              this.setPlaceholderValue();
          },
          {
            deep:true
          }
        ); 
      },

      /*----------------------- SET DATA -----------------------*/
      setPlaceholderValue(){
        let placeholder  = {
          tradeSearch         : this.$t('message.trade.search'),
          myaccountPleaseStake: this.$t('message.label.placeholderStaked'),
        }
        this.setPlaceholderInputValue(placeholder);
      },


      /*----------------------- VALIDATE , CHECK , EVENT -----------------------*/
        numberWithCommas(x, decimals = 3) {
        if (isNaN(x) == true) x = 0;
        x = parseFloat(x).toFixed(decimals);
        x  = x.split(".");
        x[0] = x[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        x = x.join('.');
        return x;
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
