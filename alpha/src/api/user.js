import action from '../actions';

const getLockList = params => { return action("get_lock_list", params); };
const getTradeList = params => { return action("get_trade_list", params); };
const getOrderList = params => { return action("get_order_list", params); };

export default {
	getLockList,
	getTradeList,
	getOrderList
}