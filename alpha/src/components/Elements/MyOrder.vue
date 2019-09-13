<template>
  <div>
    <div class="trade-detail-components">
      <ul class="tab-menu clearfix">
          <li :class="{ active: tabActive == 'open' }"><a @click="changeTabActive('open')"> {{$t('message.myOrder.open')}} <span class="total-open-order" v-if="openOrderList.length > 0">{{ openOrderList.length }}</span></a></li>
          <li :class="{ active: tabActive == 'history' }" @click="changeTabActive('history')"><a>{{$t('message.myOrder.orderHistory')}}</a></li>
      </ul>

      <div class="check-box-hide">
        <label class="hide-pair">{{$t('message.myOrder.hide')}}
          <!-- <input type="checkbox" checked="checked"> -->
          <input type="checkbox" id="checkbox" @change="changes($event)" v-model="hideOtherPair">
          <span class="checkmark"></span>
        </label>
      </div>
      <div class="table-trading">
              <table v-if="tabActive == 'open'">
                  <tr>
                    <th>{{$t('message.myOrder.date')}}</th>
                    <th>{{$t('message.myOrder.pair')}}</th> 
                    <th>{{$t('message.myOrder.side')}}</th>
                    <th>{{$t('message.myOrder.price')}}</th>
                    <th>{{$t('message.myOrder.filled')}}</th>
                    <th>{{$t('message.myOrder.amount')}}</th>
                    <th>{{$t('message.myOrder.feeUse')}}</th>
                    <th>{{$t('message.myOrder.tradingPowerUse')}}</th>
                    <th>{{$t('message.myOrder.myOrderTotal')}}</th>
                    <th>{{$t('message.myOrder.operation')}}</th>
                  </tr>
                  <tr v-for="item in openOrderList">
                    <td>{{ convertTime(item.time) }}</td>
                    <td>{{ item.tokenName}} / TRX</td> 
                    <td>{{ item.orderType == 0 ? 'Buy' : 'Sell'}}</td>
                    <td>{{ numberWithCommas(item.price, 6) }}</td>
                    <td>{{ displayFloatValue(getOrderFilled(item), 2) }} %</td>
                    <td>{{ numberWithCommas(item.originalTokens, 3) }}</td>
                    <td>{{ numberWithCommas(item.totalFee, 6) }} TRX</td>
                    <td>{{ numberWithCommas(item.totalTradingPower, 6) }}</td>
                    <td>{{ numberWithCommas(item.totalAmount,6) }} TRX</td>
                    <td @click="cancelOrder(item)" class="click-unlock"> {{$t('message.label.cancel')}}</td>
                  </tr>
              </table>
              <table v-if="tabActive == 'history'">
                  <tr>
                    <th>{{$t('message.myOrder.date')}}</th>
                    <th>{{$t('message.myOrder.pair')}}</th> 
                    <th>{{$t('message.myOrder.side')}}</th>
                    <th>{{$t('message.myOrder.price')}}</th>
                    <th>{{$t('message.myOrder.average')}}</th>
                    <th>{{$t('message.myOrder.filled')}}</th>
                    <th>{{$t('message.myOrder.amount')}}</th>
                    <th>{{$t('message.myOrder.feeUse')}}</th>
                    <th>{{$t('message.myOrder.tradingPowerUse')}}</th>
                    <th>{{$t('message.myOrder.myOrderTotal')}}</th>
                    <th>{{$t('message.myOrder.operation')}}</th>
                  </tr>
                  <tr v-for="item in filledOrderList">
                    <td>{{ convertTime(item.time) }}</td>
                    <td>{{ item.tokenName }} / TRX</td> 
                    <td>{{ (item.orderType == 0) ? 'Buy' : 'Sell' }}</td>
                    <td>{{ numberWithCommas(item.price, 6) }}</td>
                    <td>{{ numberWithCommas(item.averagePrice , 6) }}</td>
                    <td>{{ displayFloatValue(getOrderFilled(item), 2) }} %</td>
                    <td>{{ numberWithCommas(item.originalTokens, 3) }}</td>
                    <td>{{ numberWithCommas(item.totalFee, 6) }} TRX</td>
                    <td>{{ numberWithCommas(item.totalTradingPower, 6) }}</td>
                    <td>{{ numberWithCommas(item.totalAmount, 6) }} TRX</td>
                    <th>{{ (item.status == 2) ? $t('message.label.filled') : $t('message.label.canceled') }}</th>
                  </tr>

              </table> 
      </div>
    </div>  
                  <div class="panigate" v-if="numberPageOpenHistory > 1 && tabActive == 'history' ">
                                <paginate
                                  :page-count="numberPageOpenHistory"
                                  :page-range="3"
                                  :click-handler="changePageOpenHistory"
                                  :prev-text="''"
                                  :next-text="''"
                                  :prev-link-class="'fa fa-angle-double-left'"
                                  :next-link-class="'fa fa-angle-double-right'"
                                  :container-class="'pagination'"
                                  :page-class="'page-item'">
                                </paginate>
                  </div> 

                  <div class="panigate" v-if="numberPageOpenOder > 1 && tabActive == 'open'">
                                <paginate
                                  :page-count="numberPageOpenOder"
                                  :page-range="3"
                                  :click-handler="changePageOpenOder"
                                  :prev-text="''"
                                  :next-text="''"
                                  :prev-link-class="'fa fa-angle-double-left'"
                                  :next-link-class="'fa fa-angle-double-right'"
                                  :container-class="'pagination'"
                                  :page-class="'page-item'">
                                </paginate>
                  </div> 

                  <b-modal ref="modal-check-switch-node" class="modal-unlock-2"  hide-footer hide-header>
                      <div class="d-block">
                        <div class="header-modal clearfix">
                            <button type="button" aria-label="Close" class="close" @click="hideModalCheckSwitchNode()"><img src="../../assets/images/exit.png"></button>
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


                  <b-modal ref="modal-check-login" class="modal-unlock"  hide-footer hide-header>
                      <div class="d-block">
                          <button type="button" aria-label="Close" class="close" @click="hideModalCheckLogin()"><img src="../../assets/images/exit.png"></button>
                            <h2 class="text-center">{{$t('message.err.errorCccurred')}}</h2>
                            <h6 class="text-center">{{$t('message.err.errorTronlinkCannot')}}</h6>
                      </div>
                      
                </b-modal>
      

  </div>
</template>
<script>

import { ZtrNetwork } from '../../js/ZtrNetwork.js'; 
import { mapGetters, mapActions } from 'vuex';
import UtilsConvertTime from '../../utils/convertTime.js'; 
import MYTronWeb from "../../js/tron-web";

export default {
  components:{
  },
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
    showModalCheckSwitchNode(){
      this.$refs['modal-check-switch-node'].show();
    },
    hideModalCheckSwitchNode() {
      this.$refs['modal-check-switch-node'].hide();
    },
    showModalCheckLogin(){
        this.$refs['modal-check-login'].show();
    },
    hideModalCheckLogin() {
        this.$refs['modal-check-login'].hide();
    },
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
      var addrTrader  =  MYTronWeb.getAccount();
      let switchNode = tronWeb.fullNode.host;
        if(switchNode != process.env.FUll_NODE || addrTrader == false){
            this.showModalCheckLogin();
            return false;
      }
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
