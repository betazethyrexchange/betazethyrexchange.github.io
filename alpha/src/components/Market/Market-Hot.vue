<template>
  <div class="market-hot pt-3">
    <b-container>
      <div class="row-exchange exchange-top">
              <div v-for="item in coinList" class="row-col-exchange exchange-top-item mb-3">
                <div>
                  <div class="exchange-top-title d-flex align-items-center justify-content-between">{{ item.symbol }} <span :class="{ up: (parseFloat(item.percent_change_24h) >= 0), down: (parseFloat(item.percent_change_24h) < 0) }">{{ item.percent_change_24h }}%</span></div>
                  <div class="exchange-top-subtitle">${{ numberWithCommas(item.price_usd, 6) }}</div>

                  <div class="exchange-top-footertitle">Volume: {{ numberWithCommas(parseInt(item['24h_volume_usd'])) }} USD</div>
                </div>
              </div>
          </div>
    </b-container>
  </div>      
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
      ...mapGetters([
        'coinList',
      ])
  },
  data () {
    return {
    
    }
  },
  methods: {

    /*----------------------- VALIDATE , CHECK , EVENT -----------------------*/
    numberWithCommas(x, decimals = 0) {
        if (isNaN(x) == true) x = 0;
        x = parseFloat(x).toFixed(decimals);
        x  = x.split(".");
        x[0] = x[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        if (decimals > 0) {
          x = x.join('.');
        } else {
          x = x[0];
        }
        return x;
    },
    displayFloatValue(value, num = 6) {
      return parseFloat(value).toFixed(num); 
    }
  }
}
</script>
