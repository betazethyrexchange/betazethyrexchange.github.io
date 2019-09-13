import MYTronWeb from "./tron-web";
 const TradingPower = {
	CONTRACT_ADDRESS :  process.env.VotingPowerContractAddress,
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
    getVotingPower:function(address,callback){
  		this.CONTRACT_CALL_DATA
	  		.getVotingPower(address)
	  		.call()
	  		.then(response)
	  		.catch(error)
  		function response(votingPowers) {
	        let data = {
	          "votingPower": parseInt(votingPowers.votingPower), 
	        };
	    	return callback(null,data.votingPower);
	    } 
	    function error(e) { return callback(e, null); } 
  	},
  	getVotingPowerLockByTrader:function(address,callback){
  		this.CONTRACT_CALL_DATA
  		.userList(address)
  		.call()
  		.then(votingPowerLock=>{
  			let data = {
	          	"tokensLock": parseInt(votingPowerLock.tokens), 
	          	"votingPower": parseInt(votingPowerLock.votingPower)
	    	};
  			return callback(null,data);
  		})
  		.catch(error=>{
  			return callback(error,null);
  		})
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
  	},
    getTotalVotingPower(callback){
      this.CONTRACT_CALL_DATA
        .getTotalVotingPower()
        .call()
        .then(response)
        .catch(error)
      function response(totalVotingPower) {
          return callback(null,parseInt(totalVotingPower));
      } 
      function error(e) {
          return callback(e ,null)
      } 
    }
}

export default TradingPower;