<template>
  <div class="information-eth exchange-list pb-3">
      <b-container>
          <div class="clearfix">
            <b-tabs>
                <div class="table-responsive">
                  <table class="table">
                    <tr>
                      <th class="stt"></th>
                      <th>{{$t('message.list.Pair')}}</th>
                      <th>{{$t('message.list.Coin')}}</th> 
                      <th>{{$t('message.list.LastPrice')}}</th>
                      <th class="text-right">{{$t('message.list.Change')}}</th>
                      <th class="text-right">{{$t('message.list.High')}}</th>
                      <th class="text-right">{{$t('message.list.Low')}}</th>
                      <th class="d-flex align-items-center justify-content-between">{{$t('message.list.Volume')}} 
                        <button v-if="isAsc == false" type="button" @click="sort" class="btn-arrow">
                          <img src="../../assets/images/arrowdown.png">
                        </button>
                        <button  v-if="isAsc == true" type="button" @click="sort" class="btn-arrow">
                          <img src="../../assets/images/arrowdown.png" style="transform: rotate(-180deg);-moz-transform: rotate(-180deg);-webkit-transform: rotate(-180deg);-o-transform: rotate(-180deg);">
                        </button>
                      </th>
                    </tr>
                    <tr v-for="item in tradeList" @click="redirectToTrade(item)" class="cursor">
                      <td class="text-center stt"><img src="../../assets/images/star.png"></td>
                      <td>{{ item.tokenName }}/TRX</td>
                      <td>{{ item.tokenName }}</td> 
                      <td ><span :class="{ up: (item.priceChange > 0) , down: (item.priceChange < 0) }">{{ numberWithCommas(item.lastPrice , 6) }}</span> / ${{ numberWithCommas(item.lastPrice * priceUsdOnTrx , 6) }}</td>
                      <td class="text-right"><span :class="{ up: (item.changed >= 0), down: (item.changed < 0) }">{{ displayFloatValue(item.changed) }}%</span></td>
                      <td class="text-right">{{ numberWithCommas(item.high , 6) }}</td>
                      <td class="text-right">{{ numberWithCommas(item.low , 6)}}</td>
                      <td>{{ numberWithCommas(item.volume) }} TRX</td>
                    </tr>
                  </table>
                </div>
              
            </b-tabs>
          </div>
      </b-container>
  </div>
</template>
<script>

import { mapGetters, mapActions } from 'vuex';

import ConfigCookieKey from '../../../../config/cookie.key.js'

import UtilsHandleArray from '../../utils/handleArray'; 

export default {
  
  computed: {
      ...mapGetters([
        'tradeListToken',
        'priceUsdOnTrx'
      ]),
      tradeList: function() {
        return UtilsHandleArray.sortArray(this.tradeListToken, 'volume', this.isAsc);
      } 
  },
  mounted () {

  },
  data () {
    return {
      isAsc: false,
      sortByMax:true,
      sortByMin:false
    }
  },
  methods: {
    ...mapActions([
      'setTradeList',
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
    displayLastPrice(value){
      if(!value){
        return 0;
      }else{
        return value;
      }
    },
    displayFloatValue(value, toFixed = 2) {
      if(!value){
        return parseFloat(0).toFixed(toFixed);
      }
      return parseFloat(value).toFixed(toFixed); 
    },
    displayFloatValuePrice(value, toFixed = 6) {
      if(!value){
        return parseFloat(0).toFixed(toFixed);
      }
      return parseFloat(value).toFixed(toFixed); 
    },
    // redirectToTrade(trade) {
    //   let time = parseInt(process.env.TIME_COOKIE);
    //   this.$cookies.set(ConfigCookieKey.pair,trade.tokenPair,time);
    //   window.location = `/#/trade/${trade.tokenPair}`;
    //   // window.location.reload();
    // },
    redirectToTrade(trade) {
        let time = parseInt(process.env.TIME_COOKIE);
        this.$cookies.set(ConfigCookieKey.pair,trade.tokenPair,time);
        let tradeId = trade.tokenPair
        this.setTradeIdActive(tradeId);
        this.setTradeToken(trade);
        this.$router.push({name:'trade', params: { id: tradeId }});
    },
    sort() {
      this.isAsc = !this.isAsc;
    }
  }
}
</script>