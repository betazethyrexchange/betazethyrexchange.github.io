/*
* create by Falcon
* date: 06/05/2019
*/
import makeRequest from './request'
const URL_BACKEND = process.env.URL_BACKEND;
const URL_EXCHANGETRXTOUSD = process.env.URL_EXCHANGETRXTOUSD;

/*---------------------------------- BASE -------------------------------------*/

const login = params => { return makeRequest( 'post', `${ URL_BACKEND }/login`,  params, { 'Content-Type': 'application/x-www-form-urlencoded' } ) };

const exchangeTrxtoUsd = params => { return makeRequest( 'get', `${ URL_EXCHANGETRXTOUSD }`,  params)};

/*---------------------------------- USER -------------------------------------*/
// const add_user = params => { return makeRequest( 'post', `${ URL_BACKEND }/admin/user/add`,  params, { 'Content-Type': 'application/x-www-form-urlencoded' } ) };

const add_user = params => { return makeRequest( 'get', `${ URL_BACKEND }/api/user/list`) };
const get_lock_list = params => { return makeRequest( 'get', `${ URL_BACKEND }/api/user/token/lock/list`, params) };

const get_trade_list = params => { return makeRequest( 'get', `${ URL_BACKEND }/api/trade/list`, params) };

const get_order_list = params => { return makeRequest( 'get', `${ URL_BACKEND }/api/order/list`, params) };

/*---------------------------------- BLOG -------------------------------------*/

const get_blog_list = params => { return makeRequest( 'get', `${ URL_BACKEND }/api/blog/list`, params) };

const get_blog_detail = params => { return makeRequest( 'get', `${ URL_BACKEND }/api/blog/detail`, params) };

/*---------------------------------- CANDLE -------------------------------------*/

const get_candle_list = params => { return makeRequest( 'get', `${ URL_BACKEND }/api/candle/list`, params) };

const get_coin_list = params => {  return makeRequest( 'get', `${ URL_BACKEND }/api/marketcap/list`,  params ) };

const get_crypto_news = params => {  return makeRequest( 'get', `${ URL_BACKEND }/api/cryptonews`,  params ) };


/*------------------------------- ZTR LOCK ----------------------------------*/

const get_total_ztr_lock = params => {   return makeRequest( 'get', `${ URL_BACKEND }/api/usage/token`,  params ) };


export default {
	/*---------------------------------- BASE -------------------------------------*/
	login,

	get_coin_list,

	get_crypto_news,

	exchangeTrxtoUsd,
	/*---------------------------------- USER -------------------------------------*/
	add_user,

	get_lock_list,
	
	get_order_list,

	get_trade_list,

	/*---------------------------------- BLOG -------------------------------------*/
	get_blog_list,

	get_blog_detail,
	/*---------------------------------- CANDLE -------------------------------------*/
	get_candle_list,
	/*------------------------------- ZTR LOCK ----------------------------------*/
	get_total_ztr_lock
}