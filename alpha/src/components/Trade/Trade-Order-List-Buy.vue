<template>
   <div style="background: #fff;">
      <table class="clearfix exchange-left-side-up-down" style="margin-top: 0px;">
        <tr v-for="(item, idx) in tradeOrderBuyList[pair]"  v-if="isShowOrderBuyDetail(item, idx)" style="    cursor: pointer">
          <td @click="setTradePriceToken(item.price)">
            <div class="d-flex align-items-center" style="position: relative;margin-left: 2px;">
              <span style="min-width: 8px;position: absolute;left: -18px;top:1px;">
                <img v-if="isYourOrder(item)" src="../../assets/images/my-order-icon.png" class="your-order-icon">
              </span>
              <span class="up">{{ (item.isDefault == false) ? numberWithCommas(item.price , tradeSortByDecimal) : '-'}}</span>
            </div>
          </td>
          <td  @click="setTradeOrderBuyActive(item)">{{ (item.isDefault == false) ? numberWithCommas(item.tokens) : '-'}}</td> 
          <td  @click="setTradeOrderBuyActive(item)" class="text-right"><span>{{ (item.isDefault == false) ? numberWithCommas(item.total, 6) : '-'}}</span></td>
        </tr>
      </table>
    </div>
</template>

<script>

  import { mapGetters, mapActions } from 'vuex';
  import MYTronWeb from './../../js/tron-web.js';
  export default {
    computed: {
      ...mapGetters([
        'tradeOrderBuyList',
        'tradeSortByDecimal'
      ])
    },
    props: ['activeListOderTrader', 'activeListOderTraderBuy'],
    data () {
      return {
        pair: '',
        traderAddr: MYTronWeb.getAccount()
      }
    },
    mounted () {
      let self = this;
      this.pair = this.$route.params.id;
      this.onPairChange();
      this.interval =  setInterval(() => {
        if (MYTronWeb.getAccount() != self.traderAddr) {
          self.traderAddr = MYTronWeb.getAccount();
        }
      }, 1000);
    },
    destroyed() {
      clearInterval(this.interval);
    },
    methods: {
      /** ---------------------------------------------------------------------------------------------------------
      * Action Map By Store
      *  ----------------------------------------------------------------------------------------------------------
      */
      ...mapActions([
          'setTradeOrderBuyActive',
          'setTradePriceToken'
      ]),
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
            // console.log(val);
            // console.log(this.tradeOrderBuyList);   
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
      displayFloatValue(value, num) {
        return parseFloat(value).toFixed(num); 
      },
      isYourOrder(orderDetail) {
        let traderAddrList = orderDetail.traderAddrList;
        return traderAddrList.includes(this.traderAddr);
      },
      isShowOrderBuyDetail(orderDetail, index) {
        if (this.tradeOrderBuyList[this.pair] && orderDetail.isActive == true) {
          let totalOrder = this.tradeOrderBuyList[this.pair].length;
          if (this.activeListOderTrader == true && totalOrder > 15 && index > 14) {
              return false;
          } 
          if (this.activeListOderTrader == false && this.activeListOderTraderBuy == true && orderDetail.isDefault == true) {
            return false;
          }
          return true;
        }
        return false;
      },
    }
  }
</script>
