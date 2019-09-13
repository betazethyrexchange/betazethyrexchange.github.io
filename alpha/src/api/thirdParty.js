import action from '../actions';

const getCoinList = params => { return action("get_coin_list", params); };

const getCryptoNewList = params => { return action("get_crypto_news", params); };

export default {
	getCoinList,
	getCryptoNewList
}