import action from '../actions';

const getCandleList = params => { return action("get_candle_list", params); };

export default {
	getCandleList
}