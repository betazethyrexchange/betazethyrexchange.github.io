import MYTronWeb from "./tron-web";
 const ZTRDividends = {
	CONTRACT_ADDRESS :  process.env.ZTRDividendsContractAddress,
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
  	withdraw:function(){
  		this.CONTRACT.withdraw().send();  		
  	},
  	getUserData: function(callback) {
  		this.CONTRACT_CALL_DATA
  			.getUserData(MYTronWeb.getAccount())
  			.call()
  			.then(response)
	        .catch(error);
		      function response(result) {
		      	var data = {
		      		"dividends": MYTronWeb.toTrx(parseInt(result.dividends)),
		      		"availableBalance": MYTronWeb.toTrx(parseInt(result.availableBalance)),
		      		"ecoPower": parseInt(result.ecoPower),
		      	}
		        return callback(null, data);
		      } 
		      function error(e) { 
		        return callback(e, null); 
		      }	
  	},
 	getGameData: function(callback) {
 		this.CONTRACT_CALL_DATA
  			.getData()
  			.call()
  			.then(response)
	        .catch(error);
		      function response(result) {
		      	var data = {
		      		"startTime": parseInt(result._startTime),
		      		"endTime": parseInt(result._endTime),
		      		"totalDividends": MYTronWeb.toTrx(parseInt(result._totalDividends)),
		      		"weekDividends": MYTronWeb.toTrx(parseInt(result._weekDividends))
		      	}
		        return callback(null, data);
		      } 
		      function error(e) { 
		        return callback(e,null); 
		      }	
 	},
  	getDividends:function(callback){
  		this.CONTRACT_CALL_DATA
  			.getDividends(MYTronWeb.getAccount())
  			.call()
  			.then(response)
	        .catch(error);
		      function response(dividend) {
		      	var data = {
		      		"dividends": MYTronWeb.toTrx(parseInt(dividend.dividends)),
		      	}
		        return callback(null,data);
		      } 
		      function error(e) { 
		        return callback(e,null); 
		      }	
  	},
  	getCurrentRound(callback){
  		this.CONTRACT_CALL_DATA
  			.round()
  			.call()
  			.then(response)
	        .catch(error);
		function response(round){      	
		    return callback(null,parseInt(round));
		} 
        function error(e) { 
	        return callback(e,null); 
	    }	
  	},
  	getExcessCash(callback) {
  		this.CONTRACT_CALL_DATA
  			.excessCash()
  			.call()
  			.then(response)
	        .catch(error);
		function response(result){      	
		    return callback(null, MYTronWeb.toTrx(parseInt(result)));
		} 
        function error(e) { 
	        return callback(e, null); 
	    }	
  	},
  	getGameDetail(round , callback){
  		let self = this;
  		this.CONTRACT_CALL_DATA
  			.gameList(round)
  			.call()
  			.then(getMoreInfo)
	        .catch(error);
	    function getMoreInfo(roundDetail) {
	    	self.getExcessCash((err, excessCash) => {
	    		if (err) return error(err);
	    		let data = {
					'endTime':        parseInt(roundDetail.endTime),
					'startTime':        parseInt(roundDetail.startTime),
					'totalDividends': parseFloat(MYTronWeb.toTrx(parseInt(roundDetail.totalDividends))) + parseFloat(excessCash),
				};
				response(data); 
	    	});
	    }    
		function response(data){     
		    return callback(null, data);
		} 
        function error(e) { 
	        return callback(e, null); 
	    }	
  	},
  	endRound(callback){
  		this.CONTRACT
  			.endRound()
  			.send()
  			.then(response)
	        .catch(error);   
		function response(data){     
		    return callback(null, data);
		} 
        function error(e) { 
	        return callback(e, null); 
	    }	

  	}
}

export default ZTRDividends;