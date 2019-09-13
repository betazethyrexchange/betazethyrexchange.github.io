<template>
  <div class="exchange-order-history mb-3 sidebar">
    <div class="title">{{$t('message.trade.orderHistory')}}</div>
    <div class="scroll-table">
      <table>
        <tr v-for="item in tradeHistoryList[pair]" v-if="tradeHistoryList[pair]" >
          <td><span :class="{ active: (item.transactionType  == 0), text: (item.transactionType ==1 ) }">{{numberWithCommas(item.price, 6)}}</span></td> 
          <td><span :class="{ active: (item.transactionType  == 0), text: (item.transactionType ==1 ) }">{{numberWithCommas(item.tokens)}}</span></td>
          <td class="text-right"><span :class="{ active: (item.transactionType  == 0), text: (item.transactionType ==1 ) }">{{convertTime(item.time)}}</span></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import UtilsConvertTime from '../../utils/convertTime.js'; 
  export default {
    computed: {
      ...mapGetters([
        'tradeHistoryList',
        'tradeIdActive'
      ])
    },
    data () {
      return {
        pair: ''
      }
    },
    mounted () {
      this.pair = this.$route.params.id;
      this.onPairChange();
    },
    methods:{      

      /*--------------------------- ON CHANGE STORE ----------------------------*/
      
       onPairChange() {
        let self = this;
        this.$store.watch(
          (state)=>{
            return this.$store.getters.tradeIdActive;
          },
          (val)=>{
            //something changed do something
            this.pair = val;   
          },
          {
            deep:true
          }
        ); 
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

      displayFloatValue(value, toFixed = 2) {
        return parseFloat(value).toFixed(toFixed); 
      },
      convertTime(time){
          return UtilsConvertTime.formatDay(time);
      }
    }

  }
</script>
<style lang="scss" scoped>
    .text{
      color:green;
    }
    .active{
      color : red;
    }
</style>
