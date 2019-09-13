import MYTronWeb from "./tron-web";
export const ZtrNetwork = {
	CONTRACT_ADDRESS :  process.env.ztrNetworkContractAddress,
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
  	buyTokens({ tokenBridgeAddr, tokens, price, tokenDecimals },callback) {
  		let amount = tokens * price * 1001 / 1000;
  		amount = Math.ceil(amount * 1000000) / 1000000; 
  		price = MYTronWeb.toSun(price);
  		tokens= tokens * (10 ** tokenDecimals);
  		tokens = MYTronWeb.toHex(tokens);

  		this.CONTRACT.buyTokens(tokenBridgeAddr, tokens, price)
  			.send({ callValue: parseInt(MYTronWeb.toSun(amount)) })
	  		.then(response)
		        .catch(error);
		function response(res) {
		    return callback(null,res);
		} 
		function error(e) { 
		    return callback(e,null); 
		}
  	},
  	sellTokensTRC20({ tokenBridgeAddr, tokens, price, tokenDecimals  },callback) {
  		price = MYTronWeb.toSun(price);
  		tokens= tokens * (10 ** tokenDecimals);
  		tokens = MYTronWeb.toHex(tokens);
  		this.CONTRACT.sellTokens(tokenBridgeAddr, tokens, price)
  			.send()
  			.then(response)
	        .catch(error);
		function response(res) {
			return callback(null,res);
		} 
		function error(e) { 
		    return callback(e,null); 
		}
  	},
  	sellTokensTRC10({ tokenBridgeAddr, tokens, price, tokenDecimals, tokenId  }, callback) {
  		price = MYTronWeb.toSun(price);
  		tokens= tokens * (10 ** tokenDecimals);
  		this.CONTRACT.sellTokens(tokenBridgeAddr, MYTronWeb.toHex(tokens), price)
  			.send({ tokenValue: MYTronWeb.toHex(tokens), tokenId: tokenId })
  			.then(response)
	        .catch(error);
		function response(res) {
			return callback(null,res);
		} 
		function error(e) { 
		    return callback(e,null); 
		}
  	},
  	getTradeData({ tokenBridgeAddr }, callback) {
  		this.CONTRACT_CALL_DATA
	      	.getTradeData(tokenBridgeAddr)
	      	.call()
	      	.then(response)
	      	.catch(error);
	    function response(result) {

	    	// console.log(result);
	    	let data = {
	    		"totalAction" : parseInt(result.totalAction),
	    		"totalOrderBuy" : parseInt(result.totalOrderBuy),
	    		"totalOrderSell": parseInt(result.totalOrderSell)
	    	};
	    	// console.log(data);
	      	return callback(null, data);
	    } 
	    function error(e) { return callback(e, null); } 
  	},
  	getOrderDetail({ tokenBridgeAddr, orderId, tokenDecimals}, callback) {
  		this.CONTRACT_CALL_DATA
	      	.getOrderDetail(tokenBridgeAddr, orderId)
	      	.call()
	      	.then(response)
	      	.catch(error);
	    function response(result) {
	    	let data = {
	    		"traderAddr": MYTronWeb.toAddress(result.traderAddr), 
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
  	getWalletDetail(callback) {
  		this.CONTRACT_CALL_DATA
	      	.getWalletDetail(MYTronWeb.getAccount())
	      	.call()
	      	.then(response)
	      	.catch(error);
	    function response(result) {
	    	let data = {
	    		"accountActive": result.accountActive,
	    		"balance"      :MYTronWeb.toTrx(parseInt(result.balance))
	    	};
	      	return callback(null, data);
	    } 
	    function error(e) { return callback(e, null); } 
  	},
  	registerAccount(callback) {
  		this.CONTRACT
  			.registerAccount()
  			.send()
  			.then(response)
  			.catch(error);
  		function response() {
	      	return callback(null, true);
	    } 
	    function error(e) { return callback(e, false); } 	
  	},
  	withdraw(callback) {
  		this.CONTRACT 
  			.withdraw()
  			.send()
  			.then(response)
  			.catch(error);
		    function response(result) {
		        return callback(null,result);
		      } 
		    function error(e) { 
		        return callback(e , null); 
		      }
  	},
  	cancelOrder({ tokenBridgeAddr, orderId } , callback) {
  		this.CONTRACT
  			.cancelOrder(tokenBridgeAddr, orderId)
  			.send()
  			.then(response)
  			.catch(error);
  		function response() {
	      	return callback(true);
	    } 
	    function error(e) {
	     	return callback(false); 
	    } 
  	}

}