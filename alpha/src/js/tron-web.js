const TronWeb = require('tronweb');

const MYTronWeb = {
	getAccount: ()      => { 
		if (typeof(window.tronWeb) === 'undefined') return 'T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb';
		return tronWeb.defaultAddress['base58']; 
	},
	getTronWeb: (TronWeb, privateKey, fullNode, solidityNode, eventServer)      => { 
		return new TronWeb(
            fullNode,
            solidityNode,
            eventServer,
            privateKey,
        );
	},
	initContract() {
  		let self = this;
  		return new Promise((resolve, reject) => {
  			tronWeb
		        .contract()
		        .at(self.CONTRACT_ADDRESS)
		        .then(response)
		        .catch(error);
		    function response(tronContract) {
		        self.CONTRACT = tronContract;
		        return resolve(true);
		    } 
		    function error(e) { 
		        return reject(e); 
		    }
  		});
  	},
  	initContractWithZethyrAccount(tronWebWithZethyrAccount) {
  		let self = this;
  		return new Promise((resolve, reject) => {
  			tronWebWithZethyrAccount
		        .contract()
		        .at(self.CONTRACT_ADDRESS)
		        .then(response)
		        .catch(error);
		    function response(tronContract) {
		        self.CONTRACT_WITH_ZETHYR_ACCOUNT = tronContract;
		        return resolve(true);
		    } 
		    function error(e) { 
		        return reject(e); 
		    }
  		});
  	},
	toAddress : hex     => { return TronWeb.address.fromHex(hex); },
	isAddress : address => { return TronWeb.isAddress(address) },
	toTrx     : number  => { return TronWeb.fromSun(number); },
	toSun     : number  => { return TronWeb.toSun(number); },
	toHex     : number  => { return TronWeb.toHex(number); },
	getBalance     : address  => { 
		if (typeof(window.tronWeb) === 'undefined') return 0;
		return tronWeb.trx.getBalance(address); 
	},
	getAccountDetail     : address  => { return tronWeb.trx.getAccount(address); }
	// isAddress: address => { return web3.isAddress(address); },
	// toETH: number => { return web3.fromWei(number, 'ether'); },
	// toWei: number => { return web3.toWei(number, 'ether'); },
	// toHex: number => { return web3.toHex(number); }
}
export default MYTronWeb;