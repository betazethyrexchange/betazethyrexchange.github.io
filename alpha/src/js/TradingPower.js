import MYTronWeb from "./tron-web";
 const TradingPower = {
	CONTRACT_ADDRESS :  process.env.TradingPowerContractAddress,
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
  	getTotalStake: function(callback){
      this.CONTRACT_CALL_DATA
        .totalStake()
        .call()
        .then(response)
        .catch(error)
      function response(totalStake) {
        let tokenDecimals = parseInt(process.env.ZTR_DECIMALS);
        totalStake = parseInt(totalStake) / ( 10 ** tokenDecimals);
        return callback(null, totalStake);
      } 
      function error(e) { return callback(e, null); } 
    },
  	getTradingPower:function(address,callback){
  		this.CONTRACT_CALL_DATA
	  		.getTradingPower(address)
	  		.call()
	  		.then(response)
	  		.catch(error)
  		function response(tradingPowers) {
	        let data = {
	          "tradingPower": parseInt(tradingPowers.tradingPower), 
	        };
	    	return callback(null,data.tradingPower);
	    } 
	    function error(e) { return callback(e, null); } 
  	},
  	calFeeTradingPower:function(tokens , totalStake,callback){
  		let tokenDecimals = parseInt(process.env.ZTR_DECIMALS);
  		tokens = MYTronWeb.toHex(tokens);
  		totalStake = MYTronWeb.toHex(totalStake);
  		this.CONTRACT_CALL_DATA
	  		.calTradingPower(tokens , totalStake)
	  		.call()
	  		.then(response)
	  		.catch(error)
  		function response(result) {
	    	return callback(null,parseInt(result));
	    } 
	    function error(e) { 
	    	return callback(e, null); } 
  	},
  	getTokenLockByTrader:function(address,callback){
  		this.CONTRACT_CALL_DATA
  		.userList(address)
  		.call()
  		.then(tokenLock=>{
  			let data = {
          "tokensLock": parseInt(tokenLock.tokens), 
	    	};
  			return callback(null,data);
  		})
  		.catch(error=>{
  			return callback(error,null);
  		})
  	},
  	stateToken({ tokens } , callback) {
      	let tokenDecimals = parseInt(process.env.ZTR_DECIMALS);
  		tokens = tokens * (10 ** tokenDecimals);
  		tokens = MYTronWeb.toHex(tokens);
  		this.CONTRACT
	        .stake(tokens)
	        .send()
	        .then(response)
	        .catch(error)
	    function response() {
	        return callback(true);
	    } 
	    function error(e) {
	        return callback(false)
	    } 
  	},
  	unstakeToken({ stakeId } ,callback) {
  		this.CONTRACT
	        .unstake(stakeId)
	        .send()
	        .then(response)
	        .catch(error)
	    function response() {
	        return callback(true);
	    } 
	    function error(e) {
	        return callback(false)
	    } 
  	},
  	getTotalTradingPower(callback){
  		this.CONTRACT
  			.getTotalTradingPower()
  			.call()
  			.then(response)
  			.catch(error)
	    function response(totalTradingPower) {
	        return callback(null,parseInt(totalTradingPower));
	    } 
	    function error(e) {
	        return callback(e ,null)
	    } 
  	},
  	getTotalStakeTradingPower: function(callback){
      this.CONTRACT_CALL_DATA
        .totalStake()
        .call()
        .then(response)
        .catch(error)
      function response(totalStake) {
        return callback(null, parseInt(totalStake));
      } 
      function error(e) { return callback(e, null); } 
    },
}

export default TradingPower;