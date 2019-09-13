import MYTronWeb from "./tron-web";
 const TradingPower = {
	CONTRACT_ADDRESS :  process.env.EcoPowerContractAddress,
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
  getEcoPower:function(address,callback){
      if (!address) {
        return callback(null,0);
      }
  		this.CONTRACT_CALL_DATA
	  		.getEcoPower(address)
	  		.call()
	  		.then(response)
	  		.catch(error)
  		function response(ecoPowers) {
	        let data = {
	          "ecoPower": parseInt(ecoPowers.ecoPower), 
	        };
	    	return callback(null,data.ecoPower);
	    } 
	    function error(e) { return callback(e, null); } 
  	},
  	getEcoPowerLockByTrader:function(address,callback){
  		this.CONTRACT_CALL_DATA
  		.userList(address)
  		.call()
  		.then(ecoPowerLock=>{
  			let data = {
          		"ecoPower": parseInt(ecoPowerLock.tokens), 
          		"tokens": parseInt(ecoPowerLock.ecoPower), 
	    	};
  			return callback(null,data);
  		})
  		.catch(error=>{
  			return callback(error,null);
  		})
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
    getTotalEcoPower(callback){
      this.CONTRACT_CALL_DATA
        .getTotalEcoPower()
        .call()
        .then(response)
        .catch(error)
      function  response(ecoPower) {
        return callback(null , parseInt(ecoPower));
      }
      function  error(e) {
        return callback(e , null);
      }
    },
  	stateToken({ tokens } ,callback) {
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
    }
}

export default TradingPower;