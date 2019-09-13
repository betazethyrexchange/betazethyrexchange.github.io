import MYTronWeb from "./tron-web";
 const Ztr = {
	CONTRACT_ADDRESS :  process.env.ztrTokensContractAddress,
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
  	getTokenZTR:function(callback){
  		Ztr.CONTRACT_CALL_DATA
	  		.balanceOf(MYTronWeb.getAccount())
	  		.call()
	  		.then(response)
	  		.catch(error)
  		function response(tokenZTR) {
	    	return callback(null, parseInt(tokenZTR.balance));
	    } 
	    function error(e) { return callback(e, null); } 
  	},
  	getRewardPoint: function(address, callback){
      if (!address) {
        return callback(null,0);
      }
      this.CONTRACT_CALL_DATA
        .rewardPoint(address)
        .call()
        .then(response)
        .catch(error)
      function response(result) {
        return callback(null, MYTronWeb.toTrx(result));
      } 
      function error(e) { return callback(e, null); } 
    },
  	approve:function(address,tokens,callback){
  		let tokenDecimals = parseInt(process.env.ZTR_DECIMALS);
  		tokens = tokens * (10 ** tokenDecimals);
  		tokens = MYTronWeb.toHex(tokens);
  		Ztr.CONTRACT
  			.approve(address, tokens)
  			.send()
  			.then(response)
	  		.catch(error)
	 	function response(sucess) {
	    	return callback(null, sucess);
	    } 
	    function error(e) { return callback(e, null); } 
  	},
  	getDifficulty(callback){
  		this.CONTRACT_CALL_DATA
  			.difficulty()
  			.call()
  			.then(response)
	  		.catch(error)
	 	function response(difficulty) {
	    	return callback(null, MYTronWeb.toTrx(difficulty));
	    } 
	    function error(e) { return callback(e, null); } 
  	},
  	getTotalZTR:function(address,callback){
  		Ztr.CONTRACT_CALL_DATA
	  		._totalSupply()
	  		.call()
	  		.then(response)
	  		.catch(error)
  		function response(tokenZTR) {
	    	return callback(null, parseInt(tokenZTR));
	    } 
	    function error(e) { return callback(e, null); } 
  	},

}

export default Ztr;