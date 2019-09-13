<template>
  <div>
    <div class="my-open-orders">
      <div class="open-order" v-for="item in openOrderList">
        <div class="open-order-header d-flex justify-content-between">
          <div class="open-order-header-left">
            <div class="current-pair">
              <span class="pair">{{ item.tokenName}} / TRX </span>
              <span class="side">{{ item.orderType == 0 ? 'Buy' : 'Sell'}}</span>
            </div>
            <div class="time-make">
              {{ convertTime(item.time) }}
            </div>  
          </div>
          <div class="open-order-header-right float-right">
            <button @click="cancelOrder(item)" class="btn-lock"> Cancel</button>
          </div>  
        </div>
        <div class="open-order-body d-flex justify-content-between">
          <div class="open-order-price">
            <div class="price">
              {{ numberWithCommas(item.price, 6) }}
            </div>
            <label>{{$t('message.myOrder.price')}}</label>
          </div>
          <div class="open-order-amount">
            <div class="amount">
               {{ numberWithCommas(item.originalTokens, 3) }}
            </div>
            <label>{{$t('message.myOrder.amount')}}</label> 
          </div>
          <div class="open-order-filled">
            <div class="filled">
              {{ displayFloatValue(getOrderFilled(item), 2) }} %
            </div>
            <label>{{$t('message.myOrder.filled')}}</label>  
          </div>  
        </div>  
      </div> 
    </div>  
  </div>
</template>
<script>

import { ZtrNetwork } from '../../../js/ZtrNetwork.js'; 
import { mapGetters, mapActions } from 'vuex';
import UtilsConvertTime from '../../../utils/convertTime.js'; 
import MYTronWeb from "../../../js/tron-web";

export default {
  computed: {
      ...mapGetters([
        'tradeIdActive',
        'openOrderLimit',
        'filledOrderLimit',
        'tradeListToken',
        'filledOrderList',
        'openOrderList',
        'tradeToken',
        'numberPageOpenOder',
        'pageOpenOder',
        'pageOpenHistory',
        'numberPageOpenHistory',
        'loadOderTokenWhenChange'
      ])
  },
  data () {
    return {
      tabActive: 'open', // open or history
      hideOtherPair: false,
    }
  },
  created() {
    this.makeSocketEvent();
    this.onAccountChange();
  },
  methods: {
    ...mapActions([
          'initOpenOrderList',
          'initFilledOrderList',
          'setPageOpenOder',
          'setPageOpenHistory',
          'setOpenOrderList',
          'setFilledOrderList',
          'setLoadOderWhenChange'
    ]),

    /*--------------------------------- INIT ---------------------------------*/

    makeSocketEvent() {
        let self = this;
        let socket = io(process.env.URL_BACKEND);
        socket.on('order-change', function(data) {
          let users = (data && data.users) ? data.users : [];
          let isCancel = (data && data.isCancel) ? data.isCancel : false;
          if (users.includes(MYTronWeb.getAccount()) == true && isCancel == false) {
            // self.loadOrderList(self.loadOderTokenWhenChange);
            self.loadOpenOrderList(1);
            if (self.tabActive == 'history') {
              self.loadFilledOrderList(1);
            }
          }
        });
    },
    onAccountChange() {
      this.$store.watch(
          (state)=>{
            return this.$store.getters.accountAddress;
          },
          (val)=>{
            this.loadOpenOrderList(1);
            if (this.tabActive == 'history') {
              this.loadFilledOrderList(1);
            }
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
    changes(e) {
      if(this.loadOderTokenWhenChange == true){
          this.setLoadOderWhenChange(false);   
      }else{
          this.setLoadOderWhenChange(true);   
      }
      this.loadOpenOrderList(1);
      if (this.tabActive == 'history') {
        this.loadFilledOrderList(1);
      }
    },
    loadOpenOrderList(page) {
      let tokenBridgeAddr = this.getTokenBridgeAddr();
      if (this.$router.history.current.name == 'trade-detail') {
        this.initOpenOrderList({ page: page, limit: this.openOrderLimit, statusList: [1] });
      } else {
        this.initOpenOrderList({ page: page, limit: this.openOrderLimit, statusList: [1], tokenBridgeAddr });
      }
    },
    loadFilledOrderList(page) {
      let tokenBridgeAddr = this.getTokenBridgeAddr();
      if (this.$router.history.current.name == 'trade-detail') {
        this.initFilledOrderList({ page: page, limit: 10, statusList: [2, 3] });
      } else {
        this.initFilledOrderList({ page: page, limit: 10, statusList: [2, 3], tokenBridgeAddr });
      }
    },
    getOrderFilled(orderDetail) {
      let totalTokensFilled = orderDetail.totalTokensFilled;
      let originalTokens    = orderDetail.originalTokens;
      return totalTokensFilled * 100 / originalTokens;
    },
    displayFloatValuePrice(value, num = 6) {
      if (isNaN(value) == true) value = 0;
      return parseFloat(value).toFixed(num); 
    },
    displayFloatValue(value, toFixed = 2) {
      if (isNaN(value) == true) value = 0;
      return parseFloat(value).toFixed(toFixed); 
    },
    changePageOpenOder(page){
        this.loadOpenOrderList(page);
    },
    changePageOpenHistory(page){
      this.loadFilledOrderList(page);
    },
    changeTabActive(tabActive) {
      this.tabActive = tabActive;
      if (this.tabActive == 'history') {
        this.loadFilledOrderList(1);
      }
    },
    convertTime(time){
      return UtilsConvertTime.formatOrderDate(time);
    },
    getTokenBridgeAddr() {
        let tokenBridgeAddr;
        let self = this;
        if(this.hideOtherPair == true){
          let pair = this.$route.params.id;
          let tradeDetail;
          this.tradeListToken.forEach(trade=>{
            if(trade.tokenPair == pair){
                tradeDetail = trade;
            }
          })
          if (!tradeDetail) return false;
          if (tradeDetail.tokenBridgeAddr == '') return false;
          tokenBridgeAddr = tradeDetail.tokenBridgeAddr;
        }
        return tokenBridgeAddr;
    },
    /*------------------------------- FUNCTION -------------------------------*/

    cancelOrder(orderDetail) {
      let self = this;
      let tokenBridgeAddr = orderDetail.tokenBridgeAddr;
      let orderId = orderDetail.orderIdByToken;
      if (!orderId) return false;
      if (orderDetail.status != 1) return false;
      ZtrNetwork.cancelOrder({ tokenBridgeAddr, orderId } , function(status){
        if(!status) return false;
        setTimeout(function(){ 
          ZtrNetwork.getOrderDetail({ tokenBridgeAddr, orderId, tokenDecimals: 18 }, (err, order) => {
            if (order.isActive == true) return false;

            let locationElement = self.openOrderList.indexOf(orderDetail);
        
            self.openOrderList.splice(locationElement,1);

            self.setOpenOrderList(self.openOrderList);
          });
        }, 1000);
      });
    },
  }
}
</script>
