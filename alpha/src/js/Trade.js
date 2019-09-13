import MYTronWeb from "./tron-web";
export const Trade = {
	CONTRACT_ADDRESS :  process.env.TradeContractAddress,
	CONTRACT         : null,
	CONTRACT_CALL_DATA : null,
	initContract(callback) {
  		let self = this;
	    if (typeof(window.tronWeb) === 'undefined') {
	        setTimeout(() => {
	        	self.initContract(callback);
	        }, 100);
	    } else {
	      tronWeb
	        .contract()
	        .at(self.CONTRACT_ADDRESS)
	        .then(response)
	        .catch(error);
	      function response(tronContract) {
	        self.CONTRACT = tronContract;
	        return callback(true);
	      } 
	      function error(e) { 
	        return callback(false); 
	      }
	    }
  	},
  	initContractCallData(tronWebWithZethyrAccount, callback) {
  		let self = this;
  		tronWebWithZethyrAccount
		    .contract()
		    .at(self.CONTRACT_ADDRESS)
		    .then(response)
		    .catch(error);
		function response(tronContract) {
		    self.CONTRACT_CALL_DATA = tronContract;
		    return callback(true);
		} 
		function error(e) { 
		    return callback(false); 
		}
  	},
  	getOrderBuyDetail({ tokenBridgeAddr, orderBuyIdx, tokenDecimals }, callback) {
  		this.CONTRACT_CALL_DATA
	      	.getOrderBuyDetail(tokenBridgeAddr, orderBuyIdx)
	      	.call()
	      	.then(response)
	      	.catch(error);
	    function response(result) {
	    	let data = {
	    		"traderAddr": MYTronWeb.toAddress(result.traderAddr), 
	    		"orderId": parseInt(result.orderId), 
	    		"time": parseInt(result.time), 
	    		"price":  MYTronWeb.toTrx(parseInt(result.price)), 
	    		"tokens": parseInt(result.tokens) / ( 10 ** tokenDecimals ), 
	    		"total": MYTronWeb.toTrx(parseInt(result.price)) * parseInt(result.tokens)  / (10 ** tokenDecimals),
	    		"orderType": parseInt(result.orderType), 
	    		"isActive": result.isActive
	    	};
	      	return callback(null, data);
	    } 
	    function error(e) { return callback(e, null); } 
  	},
  	getOrderSellDetail({ tokenBridgeAddr, orderSellIdx, tokenDecimals }, callback) {
  		this.CONTRACT_CALL_DATA
	      	.getOrderSellDetail(tokenBridgeAddr, orderSellIdx)
	      	.call()
	      	.then(response)
	      	.catch(error);
	    function response(result) {
	    	let data = {
	    		"traderAddr": MYTronWeb.toAddress(result.traderAddr), 
	    		"orderId": parseInt(result.orderId), 
	    		"time": parseInt(result.time), 
	    		"price":  MYTronWeb.toTrx(parseInt(result.price)), 
	    		"tokens": parseInt(result.tokens) / ( 10 ** tokenDecimals ), 
	    		"total": MYTronWeb.toTrx(parseInt(result.price)) * parseInt(result.tokens)  / (10 ** tokenDecimals),
	    		"orderType": parseInt(result.orderType), 
	    		"isActive": result.isActive
	    	};
	      	return callback(null, data);
	    } 
	    function error(e) { return callback(e, null); } 
  	},
  	getOrderBuyId({ tokenAddr, orderBuyIdx }, callback) {
  		this.CONTRACT_CALL_DATA
	      .listIdOfOrderBuyByToken(tokenAddr, orderBuyIdx)
	      .call()
	      .then(response)
	      .catch(error);
	    function response(orderBuyId) {
	      return callback(null, parseInt(orderBuyId));
	    } 
	    function error(e) { return callback(e, null); } 
  	},
  	getOrderSellId({ tokenAddr, orderSellIdx }, callback) {
  		this.CONTRACT_CALL_DATA
	      .listIdOfOrderSellByToken(tokenAddr, orderSellIdx)
	      .call()
	      .then(response)
	      .catch(error);
	    function response(orderSellId) {
	      return callback(null, parseInt(orderSellId));
	    } 
	    function error(e) { return callback(e, null); } 
  	},
  	getTransactionIdLastTime(tokenBridgeAddr, callback) {
  		this.CONTRACT_CALL_DATA
	      .getTransactionIdLastTime(tokenBridgeAddr)
	      .call()
	      .then(response)
	      .catch(error);
	    function response(transactionIdLastTime) {
	      return callback(null, parseInt(transactionIdLastTime));
	    } 
	    function error(e) {
	    	console.log(e);
	     return callback(e, null); } 
  	},
  	getTransactionDetail(tokenBridgeAddr,tokenDecimals ,id, callback) {
  		this.CONTRACT_CALL_DATA
	      .getTransactionDetail(tokenBridgeAddr,id)
	      .call()
	      .then(response)
	      .catch(error);
	    function response(transactionDetail) {
	    	let data = {
	    		"id": id,
	    		"time": parseInt(transactionDetail.time), 
	    		"price":  MYTronWeb.toTrx(parseInt(transactionDetail.price)), 
	    		"tokens": parseInt(transactionDetail.tokens) / ( 10 ** tokenDecimals ), 
	    		"transactionType" : parseInt(transactionDetail.transactionType)
	    	};
	      return callback(null,data);
	    } 
	    function error(e) { return callback(e, null); } 
  	},
}