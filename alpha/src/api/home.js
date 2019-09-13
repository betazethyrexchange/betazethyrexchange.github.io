import action from '../actions';

const addUser     = params => { return action("add_user", params); };
const login       = params => { return action("login", params); };
const exchangeTrxtoUsd       = params => { return action("exchangeTrxtoUsd", params); };
const getTotalZtrLock       = params => {  return action("get_total_ztr_lock", params); };


export default {
	addUser,
	login,
	exchangeTrxtoUsd,
	getTotalZtrLock
}