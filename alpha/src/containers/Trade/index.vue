<template>
  <div  >    
          <TradeView />
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  // components
  import TradeView from './../../view/Trade';
  import { isMobile } from 'mobile-device-detect';
  /* js */
  import { ZtrNetwork } from '../../js/ZtrNetwork.js'; 
  import { Trade } from '../../js/Trade.js'; 
  import  TradingPower  from '../../js/TradingPower.js';
  import MYTronWeb from "../../js/tron-web";
  /* utils */
  import UtilsHandleArray from '../../utils/handleArray'; 
  /*API*/
  import ThirdPartyApi from '../../api/thirdParty';
  import UserApi from '../../api/user';
  import HomeTradeAPi from '../../api/home';
  /*Config*/
  import ConfigSessionKey from '../../../../config/session.key.js'

  export default {
    name: 'exchange-detail',
    components: {
      TradeView
    },
    data () {
      return {
        totalActionByPair: {},
        changePairOrderBuyEnded: true,
        changePairOrderSellEnded: true,
        reloadDataIntervarId: null,
      }
    },
    computed: {
      ...mapGetters([
        'tradeOrderSellList',
        'tradeOrderBuyList',
        'tradeHistoryList',
        'tradeListToken',
        'tradeIdActive',
        'priceLastTrade',
        'openOrderList',
        'tradeToken',
        'accountAddress',
        'checkRegister',
        'loadPage',
        'pageOpenOder',
        'pageOpenHistory',
        'loadOderTokenWhenChange'
      ])
    },
    created() {    
      let tradeList = this.$session.get(ConfigSessionKey.tradeList);
      if (tradeList) {
        let tradeDetail = this.getTradeDetail(tradeList, this.$route.params.id);
        if (tradeDetail) this.setTradeToken(tradeDetail);
      }
      this.getCryptoNews();
      this.setTradeOrderBuyList({ [this.$route.params.id] : this.getOrderBuyListDefault() });
      this.setTradeOrderSellList({ [this.$route.params.id] : this.getOrderSellListDefault() });
      this.setTradeIdActive(this.$route.params.id);
      this.initData();
    },
    mounted () {
      this.loadOrderList(this.loadOderTokenWhenChange);
      this.onPairChange();
      this.onAccountChange();
      this.exChangeTRXtoUSD();
    },
    destroyed() {
      clearInterval(this.intervalTradeID);
      clearInterval(this.intervalTradeList);
    },
    methods: {
      /** ---------------------------------------------------------------------------------------------------------
      * Action Map By Store
      *  ----------------------------------------------------------------------------------------------------------
      */
      ...mapActions([
          'initOpenOrderList',
          'initFilledOrderList',
          'setCryptoNews',
          'setUserBalance',
          'setUserToken',
          'setTradingPowerPageTrade',
          'setTradeIdActive',
          'setTradeOrderBuyList',
          'setTradeOrderSellList',
          'setTradeListHistory',
          'setTradeLastHistory',
          'setUserActiveRegister',
          'setTradeList',
          'setLastTradePrice',
          'setTradeToken',
          'setOpenOrderList',
          'setFilledOrderList',
          'setNumberPageOpenOder',
          'setNumberPageOpenHistory',
          'setPriceUsdOnTrx',
          'setMarketToken',
          'setTradeCheckLogin',
          'setFreeTradingQuota'
      ]),

      /*--------------------------------- INIT ---------------------------------*/

      initData() {
        let self = this;
        if (!ZtrNetwork.CONTRACT_CALL_DATA || !Trade.CONTRACT_CALL_DATA || !TradingPower.CONTRACT_CALL_DATA) {
          return setTimeout(() => {
            console.log('reload')
            self.initData();
          }, 100);
        }
        if (this.tradeListToken && this.tradeListToken.length > 0) {
          this.updateTradeList(this.tradeListToken);  
        }
        
        this.loadMarketData(this.$route.params.id);
        this.getUserToken();
        this.getUserBalance();
        this.getTradingPower();
        this.loadFreeTradingQuota();
        this.reloadData(); 
      },
      reloadData() {
        let self = this; 
        self.intervalTradeID = setInterval(function() {
          self.getTradingPower();
          self.loadMarketData(self.$route.params.id);
          self.getUserToken();
          self.getUserBalance();   
          self.loadFreeTradingQuota();   
        }, 1000);
        self.intervalTradeList = setInterval(() => {
          self.updateTradeList(self.tradeListToken);
        }, 1000);
      },

      /*--------------------------- ON CHANGE STORE ----------------------------*/

      onPairChange() {
        this.$store.watch(
          (state)=>{
            return this.$store.getters.tradeIdActive;
          },
          (val)=>{
            //something changed do something
            this.totalActionByPair[val] = -1;
            this.setTradeOrderBuyList({ [val] : this.getOrderBuyListDefault() });
            this.setTradeOrderSellList({ [val] : this.getOrderSellListDefault() });
            this.getUserToken();
            this.loadMarketData(val);
            this.loadTradeToken(val);
            this.loadOrderList(this.loadOderTokenWhenChange);
          },
          {
            deep:true
          }
        ); 
      },
      onAccountChange() {
        this.$store.watch(
          (state)=>{
            return this.$store.getters.accountAddress;
          },
          (val)=>{
            
          },
          {
            deep:true
          }
        ); 
      },

      /*----------------------- VALIDATE , CHECK , EVENT -----------------------*/

      exChangeTRXtoUSD(){
        let self = this;
        let params = {
          fsym:'TRX',
          tsyms:'USD'
        };
          HomeTradeAPi
            .exchangeTrxtoUsd(params)
            .then(response)
            .catch(error);

          function response(priceUsdOnTrx) {
            if(!priceUsdOnTrx){
              self.setPriceUsdOnTrx(0);
            }
            self.setPriceUsdOnTrx(priceUsdOnTrx.USD);
          }
          function error(e){
            return console.log(e);
          }
      },
      changeTitle(tradeDetail, priceLastTrade) {
        if (isMobile == true) return false;
        let titleEl = document.querySelector('head title');
        let tokenName = tradeDetail ? tradeDetail.tokenName : ' ';
        titleEl.textContent = `${ priceLastTrade } ${tokenName}/TRX - Zethyr Exchange`;
      },
      checkPairActive(pair) {
        let isActive = false;
        var tradeToken = this.tradeListToken.filter(token=>{
          if(token.tokenPair == this.$route.params.id){
              return token;
          }
        });
        if (tradeToken[0] && tradeToken[0].tokenPair == pair) {
          status = true;
        }
        return status;
      },
      checkOrders(orderDetail, orderList) {
        let isExisted = false;
        let orderIdx;
        for (let idx = 0; idx < orderList.length; idx++) {
          if (orderList[idx].price == orderDetail.price) {
            isExisted = true;
            orderIdx = idx;
            break;
          }
        }
        return { isExisted, orderIdx };
      },
      
      /*---------------------------- LOAD , GET DATA ---------------------------*/

      updateTradeList(tradeList) {
        let self = this;
        let promises =  tradeList.map(item=> self.loadLastTransaction(item));
        Promise
          .all(promises)
          .then(response)
          .catch(error);
        function response(tradeListNew) {
          self.setTradeList(tradeListNew);    
          self.loadTradeToken(self.$route.params.id);
        } 
        function error(e) {
          console.log(e);
        } 
      },
      getCryptoNews() {
        let self = this;
        ThirdPartyApi
          .getCryptoNewList()
          .then(response)
          .catch(error);
        function response(res) {
          if (res.code != 'SUCCESS') return false;
          self.setCryptoNews(res.data.cryptoNews);
        } 
        function error(e) {
          console.log(e);
        } 
      },
      getOrderSellListDefault() {
        let orderList = [];
        for (let idx = 0; idx < 12; idx ++) {
          orderList.push({
            isDefault: true,
            isActive: true,
            orderType: 1,
            price: 0,
            time: 0,
            tokens: 0,
            total: 0,
            traderAddrList: []
          });
        }
        return orderList;
      },
      getOrderBuyListDefault() {
        let orderList = [];
        for (let idx = 0; idx < 15; idx ++) {
          orderList.push({
            isDefault: true,
            isActive: true,
            orderType: 0,
            price: 0,
            time: 0,
            tokens: 0,
            total: 0,
            traderAddrList: []
          });
        }
        return orderList;
      },
      loadFreeTradingQuota(){
        let self = this;
          TradingPower.getTradingPower(MYTronWeb.getAccount(),function(err,tradingPower){
          if(err){
            console.log(err);
          }else{
            self.setFreeTradingQuota(tradingPower /(10 ** 6));
          }
        })
      },
      getTradingPower() {
        let self = this;
        let addrTrader  =  MYTronWeb.getAccount();
        if (!addrTrader || addrTrader == process.env.ADDRESS_DEFAULT) {
          return false;
        }
        if (!TradingPower.CONTRACT_CALL_DATA) {
          return false;
        }
          TradingPower.getTokenLockByTrader(MYTronWeb.getAccount(),function(err, tradingPowerLock){
          if(err){
            console.log(err);
          }else{
            self.setTradingPowerPageTrade(tradingPowerLock.tokensLock / (10 ** parseInt(process.env.ZTR_DECIMALS)));
          }
        });
      },
      loadLastTransaction(tradeDetail ) {
        return new Promise((resolve,reject)=>{
          let tokenBridgeAddr = tradeDetail.tokenBridgeAddr;
          let tokenDecimals = tradeDetail.tokenDecimals;
          let self = this;
          let priceChange;
          Trade.getTransactionIdLastTime(tokenBridgeAddr,function (err, transactionIdLastTime) {
            if (err) return reject(err);
            if (transactionIdLastTime == 0) {
              if (self.$route.params.id == tradeDetail.tokenPair) {
                self.changeTitle(tradeDetail, 0); 
              }
              return resolve(tradeDetail);
            }
            let promises = [];
            for(let idTran = transactionIdLastTime - 1 ; idTran <= transactionIdLastTime ; idTran++) {
              promises.push(self.getTransactionDetail(tokenBridgeAddr, tokenDecimals, idTran));
            } 
            Promise 
              .all(promises)
              .then(trans => {
                priceChange = trans.reduce(function (transactionA, transactionB) {
                  return transactionB.price - transactionA.price
                });
                tradeDetail.priceChange = priceChange;
                let lastTrade = trans[1];
                if(tradeDetail.price == 0) {
                  tradeDetail.changed = 0;
                  if (lastTrade.price > 0) {
                      tradeDetail.changed = 100;
                  }
                } else {
                  tradeDetail.changed = ((lastTrade.price - tradeDetail.price ) / tradeDetail.price )  * 100 ;
                }
                tradeDetail.lastPrice = lastTrade.price;

                if (self.$route.params.id == tradeDetail.tokenPair) {
                   self.changeTitle(tradeDetail, tradeDetail.lastPrice); 
                }
                return resolve(tradeDetail); 

              })
              .catch(e=>{
                return reject(e)
              });
          });
        })
      },
      getTransactionDetail(tokenBridgeAddr , tokenDecimals , transactionId){
        return new Promise((resolve, reject) => {
          Trade.getTransactionDetail(tokenBridgeAddr ,tokenDecimals, transactionId ,function(err,transaction){
            if(err) return reject(err);
            return resolve(transaction);
          });
        });
      },
      loadOrderList(isShowOtherPair = true) {
        let tokenBridgeAddr = this.getTokenBridgeAddr(isShowOtherPair);
        this.initOpenOrderList({ page: 1, limit: 10000, statusList: [1], tokenBridgeAddr });
        this.initFilledOrderList({ page: 1, limit: 10, statusList: [2, 3], tokenBridgeAddr });
      },
      setTradeTokenDefault(tradeList) {
        var tradeToken = tradeList.filter(trade=>{
          if(trade.tokenPair == this.$route.params.id){
              return trade;
          }
        });
        if (tradeToken[0]) {
          this.setTradeToken(tradeToken[0]);
        }
      },
      loadTradeToken(pair){
        var tradeToken = this.tradeListToken.filter(token=>{
          if(token.tokenPair == pair){
              return token;
          }
        })
        this.setTradeToken(tradeToken[0]);
      },
      loadMarketData(pair) {
        if (!this.tradeListToken) {
          return setTimeout(() => {
            this.loadMarketData(pair);
          }, 100);
        }
        let self = this;
        let orderSellList = {};
        let orderBuyList = {};
        var tradeDetail; 
        this.tradeListToken.forEach(trade=>{
          if(trade.tokenPair == pair){
              tradeDetail = trade;
          }
          orderSellList[trade.tokenPair] = self.getOrderSellListDefault();
          orderBuyList[trade.tokenPair] = self.getOrderBuyListDefault();
        })
        if (!tradeDetail) return false;
        if (tradeDetail.tokenAddr == '') return false;
        let tokenBridgeAddr = tradeDetail.tokenBridgeAddr;
        let tokenAddr       = tradeDetail.tokenAddr;
        let tokenName       = tradeDetail.tokenName;
        let tokenDecimals   = tradeDetail.tokenDecimals;
        
        ZtrNetwork.getTradeData({ tokenBridgeAddr }, (err, tradeData) => {

          if (err) return false;

          let totalAction    = tradeData.totalAction;  
          let totalOrderBuy  = tradeData.totalOrderBuy;  
          let totalOrderSell = tradeData.totalOrderSell; 

          if (self.totalActionByPair[pair] && self.totalActionByPair[pair] == totalAction) {
            return false;
          } 
          self.loadHistoryTrader(pair, tokenBridgeAddr, tokenDecimals);
          Promise
            .all([
              self.loadOrderSellList(pair, tokenBridgeAddr, tokenName, orderSellList, totalOrderSell, tokenDecimals),
              self.loadOrderBuyList(pair, tokenBridgeAddr, tokenName, orderBuyList, totalOrderBuy, tokenDecimals)
            ])
            .then(data => {
              let orderList = [...data[0], ...data[1]];
              self.updateOpenOrder(orderList);
              self.totalActionByPair[pair] = totalAction;
            })
            .catch(e => console.log(e));
            
        });  
      },
      loadOrderSellList(pair, tokenBridgeAddr, tokenName , orderSellList, totalOrderSell, tokenDecimals) { 
          let lastOrderId = 0;
          let openOrderListCurrent = this.openOrderList ? this.openOrderList : [];
          let openOrderListNew = [];
          if (this.openOrderList && openOrderListCurrent[0]) {
            lastOrderId = this.openOrderList[0].orderIdByToken;
          }
          let self = this;
          return new Promise((resolve, reject) => {
            let promises = [];
            for(let orderSellIdx = 0; orderSellIdx < totalOrderSell; orderSellIdx++) {
              promises.push(self.getOrderSellDetail(tokenBridgeAddr, orderSellIdx, tokenDecimals));
            }    
            Promise
              .all(promises)
              .then(orderList => {
                let orderMergeList = [];
                orderList.forEach(item => {
                  if (item.isActive == true) {
                    let checkRes = self.checkOrders(item, orderMergeList);
                    let isExisted = checkRes.isExisted;
                    let orderIdx = checkRes.orderIdx;
                    if (isExisted == false) {
                      let orderDetail = {
                        isDefault: false,
                        isActive: item.isActive,
                        orderType: item.orderType,
                        price: item.price,
                        time: item.time,
                        tokens: item.tokens,
                        total: item.total,
                        traderAddrList: [ item.traderAddr ]
                      };
                      orderMergeList.push(orderDetail);
                    } else if (orderMergeList[orderIdx]) {
                      let traderAddrList = orderMergeList[orderIdx].traderAddrList;
                      traderAddrList.push(item.traderAddr);
                      orderMergeList[orderIdx].tokens += item.tokens;
                      orderMergeList[orderIdx].total += item.total;
                      orderMergeList[orderIdx].traderAddrList = traderAddrList;
                    }

                    if (item.traderAddr == MYTronWeb.getAccount() && 
                      item.orderId > lastOrderId && 
                        (
                          (self.loadOderTokenWhenChange == false && self.tradeToken.tokenBridgeAddr == tokenBridgeAddr) ||
                          (self.loadOderTokenWhenChange == true)
                        )
                      ) {

                        openOrderListNew.push({
                          "transaction_id" : '',
                          "orderIdByToken" : item.orderId,
                          "orderType"      : item.orderType,
                          "tokenDecimals"  : tokenDecimals,
                          "paymentAmounts" : item.paymentAmounts,
                          "originalTokens" : item.tokens,
                          "tokens"         : item.tokens,
                          "tokenAddr"      : tokenBridgeAddr,
                          "tokenBridgeAddr": tokenBridgeAddr,
                          "tradeId"        : -1,
                          "traderAddr"     : item.traderAddr,
                          "status"         : 1,
                          "tokenName"      : tokenName,
                          "price"          : item.price,
                          "time"           : item.time != 0 ? item.time * 1000 : (new Date()).getTime(),
                          "totalFee"       : 0,
                          "totalTradingPower": 0,
                          "totalTokensFilled": 0,
                          "fillList"       : []
                        });
                    }
                  }
                });
                orderSellList[pair] = UtilsHandleArray.sortArray(orderMergeList, 'price', false);
                let orderSellListDefault = [];
                if (orderSellList[pair].length < 12) {
                    for (let idx = orderSellList[pair].length; idx < 12; idx ++) {
                      orderSellListDefault.push({
                        isDefault: true,
                        isActive: true,
                        orderType: 1,
                        price: orderSellList[pair].length > 0 ? orderSellList[pair][0].price : 0,
                        time: orderSellList[pair].length > 0 ? orderSellList[pair][0].time : 0,
                        tokens: orderSellList[pair].length > 0 ? orderSellList[pair][0].tokens: 0,
                        total: orderSellList[pair].length > 0 ? orderSellList[pair][0].total : 0,
                        traderAddrList: []
                      });
                    }
                }
                orderSellList[pair] = [...orderSellListDefault, ... orderSellList[pair]];
                if (self.$route.params.id != pair) return resolve([]);
                self.setTradeOrderSellList(orderSellList);
                resolve(openOrderListNew);
              })
              .catch(e => reject(e));
          });
      },
      loadOrderBuyList(pair, tokenBridgeAddr, tokenName, orderBuyList, totalOrderBuy, tokenDecimals) {
          let lastOrderId = 0;
          let openOrderListCurrent = this.openOrderList ? this.openOrderList : [];
          let openOrderListNew = [];
          if (this.openOrderList && openOrderListCurrent[0]) {
            lastOrderId = this.openOrderList[0].orderIdByToken;
          }
          let self = this;
          return new Promise((resolve, reject) => {
              let promises = [];
              for(let orderBuyIdx = 0; orderBuyIdx < totalOrderBuy; orderBuyIdx++) {
                promises.push(self.getOrderBuyDetail(tokenBridgeAddr, orderBuyIdx, tokenDecimals));
              }          
              Promise
                .all(promises)
                .then(orderList => {
                  let orderMergeList = [];
                  orderList.forEach(item => {
                    if (item.isActive == true) {
                      let checkRes = self.checkOrders(item, orderMergeList);
                      let isExisted = checkRes.isExisted;
                      let orderIdx = checkRes.orderIdx;
                      if (isExisted == false) {
                        let orderDetail = {
                          isDefault: false,
                          isActive: item.isActive,
                          orderType: item.orderType,
                          price: item.price,
                          time: item.time,
                          tokens: item.tokens,
                          total: item.total,
                          traderAddrList: [ item.traderAddr ]
                        };
                        orderMergeList.push(orderDetail);
                      } else if (orderMergeList[orderIdx]) {
                        let traderAddrList = orderMergeList[orderIdx].traderAddrList;
                        traderAddrList.push(item.traderAddr);
                        orderMergeList[orderIdx].tokens += item.tokens;
                        orderMergeList[orderIdx].total += item.total;
                        orderMergeList[orderIdx].traderAddrList = traderAddrList;
                      }
                      if (

                        item.traderAddr == MYTronWeb.getAccount() &&
                         item.orderId > lastOrderId && 
                          (
                            (self.loadOderTokenWhenChange == false && self.tradeToken.tokenBridgeAddr == tokenBridgeAddr) ||
                            (self.loadOderTokenWhenChange == true)
                          )

                         ) {

                        openOrderListNew.push({
                          "transaction_id" : '',
                          "orderIdByToken" : item.orderId,
                          "orderType"      : item.orderType,
                          "tokenDecimals"  : tokenDecimals,
                          "paymentAmounts" : item.paymentAmounts,
                          "originalTokens" : item.tokens,
                          "tokens"         : item.tokens,
                          "tokenAddr"      : tokenBridgeAddr,
                          "tokenBridgeAddr": tokenBridgeAddr,
                          "tradeId"        : -1,
                          "traderAddr"     : item.traderAddr,
                          "status"         : 1,
                          "tokenName"      : tokenName,
                          "price"          : item.price,
                          "time"           : item.time != 0 ? item.time * 1000 : (new Date()).getTime(),
                          "totalFee"       : 0,
                          "totalTradingPower": 0,
                          "totalTokensFilled": 0,
                          "fillList"       : []
                        });
                      }
                    }
                  });
                  orderBuyList[pair] = UtilsHandleArray.sortArray(orderMergeList, 'price', false);
                  let orderBuyListDefault = [];
                  if (orderBuyList[pair].length < 15) {
                      for (let idx = orderBuyList[pair].length; idx < 15; idx ++) {
                        orderBuyListDefault.push({
                          isDefault: true,
                          isActive: true,
                          orderType: 0,
                          price: orderBuyList[pair].length > 0 ? orderBuyList[pair][orderBuyList[pair].length - 1].price : 0,
                          time: orderBuyList[pair].length > 0 ?orderBuyList[pair][orderBuyList[pair].length - 1].time : 0,
                          tokens: orderBuyList[pair].length > 0 ? orderBuyList[pair][orderBuyList[pair].length - 1].tokens : 0,
                          total: orderBuyList[pair].length > 0 ? orderBuyList[pair][orderBuyList[pair].length - 1].total : 0,
                          traderAddrList: []
                        });
                      }
                  }
                  orderBuyList[pair] = [...orderBuyList[pair], ...orderBuyListDefault];
                  if (self.$route.params.id != pair) return resolve([]);
                  self.setTradeOrderBuyList(orderBuyList);
                  resolve(openOrderListNew);
                })
                .catch(e => reject(e));
          });
      },
      updateOpenOrder(openOrderListNew) {
        let openOrderListCurrent = this.openOrderList ? this.openOrderList : [];
        if (openOrderListNew.length > 0) {
          let orderNews = [];
          for (let idxNew = 0; idxNew < openOrderListNew.length; idxNew++) {
            if (isOpenOrderExisted(openOrderListNew[idxNew]) == false) {
              orderNews.push(openOrderListNew[idxNew]);
            }
          }
          openOrderListNew = [...orderNews, ...openOrderListCurrent];
          this.setOpenOrderList(openOrderListNew);
        }
        // check open order
        function isOpenOrderExisted(openOrderDetail) {
          let isExisted = false;
          for (let idxCurrent = 0; idxCurrent < openOrderListCurrent.length; idxCurrent++) {
            if (openOrderDetail.orderIdByToken == openOrderListCurrent[idxCurrent].orderIdByToken) {
              isExisted = true;
              break;
            }
          }
          return isExisted;
        }
      },
      getOrderBuyDetail(tokenBridgeAddr, orderBuyIdx, tokenDecimals) {
        return new Promise((resolve, reject) => {
          Trade.getOrderBuyDetail({ tokenBridgeAddr, orderBuyIdx, tokenDecimals }, (err, orderDetail) => {
            if (err) return reject(err);
            return resolve(orderDetail); 
          });
        });
      },
      getOrderSellDetail(tokenBridgeAddr, orderSellIdx, tokenDecimals) {
        return new Promise((resolve, reject) => {
          Trade.getOrderSellDetail({ tokenBridgeAddr, orderSellIdx, tokenDecimals }, (err, orderDetail) => {
            if (err) return reject(err);
            return resolve(orderDetail); 
          });
        });
      },
      getUserBalance(){
          let addrTrader  =  MYTronWeb.getAccount();
          if (!addrTrader || addrTrader == process.env.ADDRESS_DEFAULT) {
            return false;
          }
          let promiseGetBalance = MYTronWeb.getBalance(MYTronWeb.getAccount());
          promiseGetBalance.then(balance=>{
            this.setUserBalance(MYTronWeb.toTrx(balance));
          })
          .catch(e=>{console.log(e)})
      },
      getUserToken() {
        let self = this;
        let addrTrader  =  MYTronWeb.getAccount();
        if (!addrTrader || addrTrader == process.env.ADDRESS_DEFAULT) {
          return false;
        }
        var tradeToken = this.tradeListToken.filter(token=>{
          if(token.tokenPair == this.$route.params.id){
              return token;
          }
        });
        if (!tradeToken[0]) return false;
        let tokenAddr = tradeToken[0] ? tradeToken[0].tokenAddr : '';
        let tokenDecimals = tradeToken[0] ? tradeToken[0].tokenDecimals : 18;
        let tokenBridgeAddr = tradeToken[0] ? tradeToken[0].tokenBridgeAddr : '';
        // // /*---------------* handle *----------------------*/
        initTokenContract();
        function initTokenContract() {
          tronWeb
            .contract()
            .at(tokenBridgeAddr)
            .then(approveTokens)
            .catch(error);
        }
        function approveTokens(tokenContract) {
          tokenContract.getTokensByAddress(MYTronWeb.getAccount()).call().then(tokenUser=>{
            let token =  parseInt(tokenUser);
            self.setUserToken(token / (10 ** tokenDecimals ));
          })
          .catch(err=>{
            self.setUserToken(0);
          })
        } 
        function error(e) { 
          return console.log(e); 
        }  
      },
      loadHistoryTrader(pair, tokenBridgeAddr, tokenDecimals) {
        let self = this;
        let transactionList = self.$session.get(ConfigSessionKey.transactions);
        if (!transactionList) {
          transactionList = {};
        }
        if (!transactionList[pair]) {
          transactionList[pair] = [];
        }
        Trade.getTransactionIdLastTime(tokenBridgeAddr, function (err,transactionIdLastTime) {
              let start;
              if(transactionIdLastTime < 80){
                  start = 1;
              }else{
                  start = transactionIdLastTime - 80;
              }
              let promises = [];
              if (transactionList[pair] && transactionList[pair].length > 0) {
                  start = transactionList[pair][0].id + 1;
              }             
              for(let tranId = start ; tranId <= transactionIdLastTime ; tranId++){
                  promises.push(self.getListHistoryTransaction(tokenBridgeAddr,tokenDecimals, tranId));
              }
              loadData();
              function loadData() {
                  Promise
                    .all(promises)
                    .then(listHistoryTransaction => {

                      listHistoryTransaction = [...transactionList[pair], ...listHistoryTransaction];

                      transactionList[pair] = UtilsHandleArray.sortArray(listHistoryTransaction, 'id', false); 
                      if (transactionList[pair].length >= 2) {
                        var twoElementFist = transactionList[pair].slice(0,2);
                        twoElementFist.reduce(function (elementA, elementB) {
                            self.setMarketToken(elementA.price - elementB.price);
                        })
                      } else {
                        self.setMarketToken(1);
                      }       
                      self.$session.set(ConfigSessionKey.transactions , transactionList);
                      self.setTradeListHistory(transactionList);
                    })
                    .catch(e => console.log(e));
              }
        });
      },
      getListHistoryTransaction(tokenBridgeAddr , tokenDecimals , transactionId){
        return new Promise((resolve,reject)=>{
          Trade.getTransactionDetail(tokenBridgeAddr ,tokenDecimals, transactionId ,function(err,transaction){
              if(err){
                  reject(err);  
              }else{
                  resolve(transaction);
              }
          })
        })
      },
      getLastTrade(tokenBridgeAddr , tokenDecimals , transactionId){
        return new Promise((resolve,reject)=>{
          Trade.getTransactionDetail(tokenBridgeAddr ,tokenDecimals, transactionId ,function(err,transaction){
              if(err){
                  reject(err);  
              }else{
                  resolve(transaction);
              }
          })
        })
      },
      getTradeDetail(tradeList, pair) {
        var tradeDetail = tradeList.filter(trade=>{
          if(trade.tokenPair == pair){
              return trade;
          }
        });
        return tradeDetail[0];
      },
      getTokenBridgeAddr(isShowOtherPair = false) {
        let tokenBridgeAddr;
        let self = this;
        if(isShowOtherPair == false){
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
      }
    } 
  }
</script>

<style lang="scss">
</style>