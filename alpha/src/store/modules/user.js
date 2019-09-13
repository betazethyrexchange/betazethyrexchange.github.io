import MYTronWeb from "../../js/tron-web";
import UserApi from '../../api/user';

const User = {
  state: {

    lockTradingPowerList: [],

    openOrderList: [],
    
    filledOrderList: [],

    tradingPower: 0,

    userBalance : 0 ,

    tradingPowerLock : 0 ,

    userToken : 0,

    accountAddress: '',

    userZethyr: 0,

    userRewardPoint: 0,

    listBlock:[],

    ecoPower:0,

    ecoPowerBlock:0,

    votingPower:0,

    votingPowerLock:0,

    loadPage:false,

    userTrx:0,

    userDividends: 0,
    
    userAvailableBalance: 0,

    pageLockToken: 1,

    numberPageTradingPower:0,

    pageLockVoitingPower:1,

    numberPageVoitingPower:0,

    pageLockEcoPower:1,

    numberPageEcoPower:0,

    pageOpenOder:1,

    numberPageOpenOder:0,

    pageOpenHistory:1,

    numberPageOpenHistory:0,

    openOrderLimit: 10000,

    filledOrderLimit: 10,

    timeEndRound:0,

    timeStartRound:0,

    totalEcoPower:0,

    totalDividends:0,

    weekDividends:0,

    numberLockByDayTrading:0,

    numberLockByDayEco:0,

    numberLockByDayVoiting:0,
  },
  mutations: {

    SET_OPEN_ORDER_LIMIT: ( state, openOrderLimit) => state.openOrderLimit     = openOrderLimit,

    SET_FILLED_ORDER_LIMIT: ( state, filledOrderLimit) => state.filledOrderLimit = filledOrderLimit,

    SET_OPEN_ORDER_LIST: ( state, openOrderList ) => state.openOrderList     = openOrderList,

    SET_FILLED_ORDER_LIST: ( state, filledOrderList ) => state.filledOrderList     = filledOrderList,

    SET_LIST_LOCK_TRADING_POWER: ( state, lockTradingPowerList ) => state.lockTradingPowerList     = lockTradingPowerList,

    SET_USER_TRADING_POWER: ( state, tradingPower ) => state.tradingPower = tradingPower,

    SET_USER_BALANCE_TOKEN: ( state, userBalance ) => state.userBalance = userBalance,

    SET_USER_TRADING_POWER_TOKEN_LOCK: ( state, tradingPowerLock ) => state.tradingPowerLock = tradingPowerLock,

    SET_USER_TOKEN: ( state, userToken ) => state.userToken = userToken,

    SET_USER_ACCOUNT_ADDRESS: ( state, accountAddress ) => state.accountAddress = accountAddress,

    SET_USER_ZTR: ( state, userZethyr ) => state.userZethyr = userZethyr,

    SET_USER_REWARD_POINT: ( state, userRewardPoint ) => state.userRewardPoint = userRewardPoint,

    SET_USER_LIST_BLOCK: ( state, listBlock ) => state.listBlock = listBlock,

    SET_USER_ECO_POWER: ( state, ecoPower ) => state.ecoPower = ecoPower,

    SET_USER_ECO_POWER_TOKEN_LOCK: ( state, ecoPowerBlock ) => state.ecoPowerBlock = ecoPowerBlock,

    SET_USER_VOTING_POWER: ( state, votingPower ) => state.votingPower = votingPower,

    SET_USER_VOTING_POWER_TOKEN_LOCK: ( state, votingPowerLock ) => state.votingPowerLock = votingPowerLock,

    SET_LOAD_PAGE: ( state, loadPage ) => state.loadPage = loadPage,

    SET_USER_TRX: ( state, userTrx ) => state.userTrx = userTrx,

    SET_USER_DIVIDENDS: ( state, userDividends ) => state.userDividends = userDividends,

    SET_USER_AVAILABLE_DIVIDENDS: ( state, userAvailableBalance ) => state.userAvailableBalance = userAvailableBalance,

    SET_PAGE_LOCK_TOKEN: ( state, pageLockToken ) => state.pageLockToken = pageLockToken,

    SET_NUMBER_PAGE_TRADINGPOWER: ( state, numberPageTradingPower ) => state.numberPageTradingPower = numberPageTradingPower,

    SET_PAGE_LOCK_VOITINGPOWER: ( state, pageLockVoitingPower ) => state.pageLockVoitingPower = pageLockVoitingPower,

    SET_NUMBER_PAGE_VOITINGPOWER: ( state, numberPageVoitingPower ) => state.numberPageVoitingPower = numberPageVoitingPower, 

    SET_PAGE_LOCK_ECOPOWER: ( state, pageLockEcoPower ) => state.pageLockEcoPower = pageLockEcoPower,

    SET_NUMBER_PAGE_ECOPOWER: ( state, numberPageEcoPower ) => state.numberPageEcoPower = numberPageEcoPower,

    SET_PAGE_OPEN_ODER: ( state, pageOpenOder ) => state.pageOpenOder = pageOpenOder,

    SET_NUMBER_PAGE_OPEN_ODER: ( state, numberPageOpenOder ) => state.numberPageOpenOder = numberPageOpenOder,

    SET_PAGE_OPEN_HISTORY: ( state, pageOpenHistory ) => state.pageOpenHistory = pageOpenHistory,

    SET_NUMBER_PAGE_OPEN_HISTORY: ( state, numberPageOpenHistory ) => state.numberPageOpenHistory = numberPageOpenHistory,

    SET_TIME_END_ROUND: ( state, timeEndRound ) => state.timeEndRound = timeEndRound,

    SET_TIME_START_ROUND: ( state, timeStartRound ) => state.timeStartRound = timeStartRound,

    SET_TOTAL_ECOPOWER: ( state, totalEcoPower ) => state.totalEcoPower = totalEcoPower,

    SET_TOTAL_DIVIDENDS: ( state, totalDividends ) => state.totalDividends = totalDividends,

    SET_WEEK_DIVIDENDS: ( state, weekDividends ) => state.weekDividends = weekDividends,

    SET_NUMBER_LOCK_BY_DAY_TRADING: ( state, numberLockByDayTrading ) => state.numberLockByDayTrading = numberLockByDayTrading,

    SET_NUMBER_LOCK_BY_DAY_ECO: ( state, numberLockByDayEco ) => state.numberLockByDayEco = numberLockByDayEco,

    SET_NUMBER_LOCK_BY_DAY_VOITING: ( state, numberLockByDayVoiting ) => state.numberLockByDayVoiting = numberLockByDayVoiting,
  },
  actions: {
 
    initOpenOrderList({ commit }, { page, limit, statusList, tokenBridgeAddr }) {
      commit('SET_OPEN_ORDER_LIMIT', limit);
      let params = {
        traderAddr: MYTronWeb.getAccount(),
        limit: limit,
        status: statusList,
        page:page,
      };
      if (tokenBridgeAddr) {
        params.tokenBridgeAddr = tokenBridgeAddr;
      }
      UserApi
        .getOrderList(params)
        .then(response)
        .catch(error);
      function response(res) {
          if (res.code != 'SUCCESS') return false;
          User.actions.setNumberPageOpenOder({ commit }, res.data.number_page);
          User.actions.setOpenOrderList({ commit }, res.data.orderList);
      }  
      function error(e) {
          console.log(e);
      }
    },
    initFilledOrderList({ commit }, { page, limit, statusList, tokenBridgeAddr }) {
      commit('SET_FILLED_ORDER_LIMIT', limit);
      let params = {
        traderAddr: MYTronWeb.getAccount(),
        limit: limit,
        status: statusList,
        page:page,
      };
      if (tokenBridgeAddr) {
        params.tokenBridgeAddr = tokenBridgeAddr;
      }
      UserApi
        .getOrderList(params)
        .then(response)
        .catch(error);
      function response(res) {
          if (res.code != 'SUCCESS') return false;
          User.actions.setNumberPageOpenHistory({ commit }, res.data.number_page);
          User.actions.setFilledOrderList({ commit }, res.data.orderList);
      }  
      function error(e) {
          console.log(e);
      }
    },

    initUserListBlock({ commit }, {page , limit , type }) {
      let params = {
          userAddr: MYTronWeb.getAccount(),
          type: type,
          page:page,
          limit:limit
        };
        let self = this;
        UserApi
          .getLockList(params)
          .then(res => {
            if (res.code != 'SUCCESS') return false;
              commit('SET_USER_LIST_BLOCK', res.data.lockList);    
              /* 1 Trading Power    :   2 Eco Power   : 3 Voiting Power   */
              if(type == 1){
                commit('SET_NUMBER_PAGE_TRADINGPOWER', res.data.number_page);
              }
              if(type == 2){
               commit('SET_NUMBER_PAGE_ECOPOWER', res.data.number_page);
              }
              if(type == 3){
               commit('SET_NUMBER_PAGE_VOITINGPOWER', res.data.number_page);
              }
          }).catch(e => console.log(e));

    },

    setOpenOrderList({ commit }, openOrderList) {
      commit('SET_OPEN_ORDER_LIST', openOrderList);
    },

    setFilledOrderList({ commit }, filledOrderList) {
      commit('SET_FILLED_ORDER_LIST', filledOrderList);
    },

    setListLockTradingPower({ commit }, lockTradingPowerList) {
      commit('SET_LIST_LOCK_TRADING_POWER', lockTradingPowerList);
    },

    setUserTradingPower({ commit }, tradingPower) {
      commit('SET_USER_TRADING_POWER', tradingPower);
    },

    setUserBalance({ commit }, userBalance) {
      commit('SET_USER_BALANCE_TOKEN', userBalance);
    },

    setUserTradingPowerLock({ commit }, tradingPowerLock) {
      commit('SET_USER_TRADING_POWER_TOKEN_LOCK', tradingPowerLock);
    },

    setUserToken({ commit }, userToken) {
      commit('SET_USER_TOKEN', userToken);
    },

    setUserAccountAddress({ commit }, accountAddress) {
      commit('SET_USER_ACCOUNT_ADDRESS', accountAddress);
    },

    setUserZethyr({ commit }, userZethyr) {
      commit('SET_USER_ZTR', userZethyr);
    },

    setUserRewardPoint({ commit }, userRewardPoint) {
      commit('SET_USER_REWARD_POINT', userRewardPoint);
    },
    

    // setUserListBlock({ commit }, listBlock) {
    //   commit('SET_USER_LIST_BLOCK', listBlock);
    // },

    setUserEcoPower({ commit }, ecoPower) {
      commit('SET_USER_ECO_POWER', ecoPower);
    },
    setUserEcoPowerLock({ commit }, ecoPowerBlock) {
      commit('SET_USER_ECO_POWER_TOKEN_LOCK', ecoPowerBlock);
    }, 
    setUserVotingPower({ commit }, votingPower) {
      commit('SET_USER_VOTING_POWER', votingPower);
    },
    setUserVotingPowerLock({ commit }, votingPowerLock) {
      commit('SET_USER_VOTING_POWER_TOKEN_LOCK', votingPowerLock);
    },
    setLoadPage({ commit }, loadPage) {
      commit('SET_LOAD_PAGE', loadPage);
    },
    setUserTrx({ commit }, userTrx) {
      commit('SET_USER_TRX', userTrx);
    },
    setUserDividends({ commit }, userDividends) {
      commit('SET_USER_DIVIDENDS', userDividends);
    },
    setUserAvailableBalance({ commit }, userAvailableBalance) {
      commit('SET_USER_AVAILABLE_DIVIDENDS', userAvailableBalance);
    },
    setPageLockToken({ commit }, pageLockToken) {
      commit('SET_PAGE_LOCK_TOKEN', pageLockToken);
    },
    // setNumberPageTradingPower({ commit }, numberPageTradingPower) {
    //   commit('SET_NUMBER_PAGE_TRADINGPOWER', numberPageTradingPower);
    // },
    setPageLockVoitingPower({ commit }, pageLockVoitingPower) {
      commit('SET_PAGE_LOCK_VOITINGPOWER', pageLockVoitingPower);
    },
    // setNumberPageVoitingPower({ commit }, numberPageVoitingPower) {
    //   commit('SET_NUMBER_PAGE_VOITINGPOWER', numberPageVoitingPower);
    // },
    setPageLockEcoPower({ commit }, pageLockEcoPower) {
      commit('SET_PAGE_LOCK_ECOPOWER', pageLockEcoPower);
    },
    // setNumberPageEcoPower({ commit }, numberPageEcoPower) {
    //   commit('SET_NUMBER_PAGE_ECOPOWER', numberPageEcoPower);
    // },
    setPageOpenOder({ commit }, pageOpenOder) {
      commit('SET_PAGE_OPEN_ODER', pageOpenOder);
    },
    setNumberPageOpenOder({ commit }, numberPageOpenOder) {
      commit('SET_NUMBER_PAGE_OPEN_ODER', numberPageOpenOder);
    },
    setPageOpenHistory({ commit }, pageOpenHistory) {
      commit('SET_PAGE_OPEN_HISTORY', pageOpenHistory);
    },
    setNumberPageOpenHistory({ commit }, numberPageOpenHistory) {
      commit('SET_NUMBER_PAGE_OPEN_HISTORY', numberPageOpenHistory);
    },
    setTimeEndRound({ commit }, timeEndRound) {
      commit('SET_TIME_END_ROUND', timeEndRound);
    },
    setTimeStartRound({ commit }, timeStartRound) {
      commit('SET_TIME_START_ROUND', timeStartRound);
    },
    setTotalEcoPower({ commit }, totalEcoPower) {
      commit('SET_TOTAL_ECOPOWER', totalEcoPower);
    },
    setTotalDividends({ commit }, totalDividends) {
      commit('SET_TOTAL_DIVIDENDS', totalDividends);
    },
    setWeekDividends({ commit }, weekDividends) {
      commit('SET_WEEK_DIVIDENDS', weekDividends);
    },
    setNumberLockByDayTrading({ commit }, numberLockByDayTrading) {
      commit('SET_NUMBER_LOCK_BY_DAY_TRADING', numberLockByDayTrading);
    },
    setNumberLockByDayEco({ commit }, numberLockByDayEco) {
      commit('SET_NUMBER_LOCK_BY_DAY_ECO', numberLockByDayEco);
    },
    setNumberLockByDayVoiting({ commit }, numberLockByDayVoiting) {
      commit('SET_NUMBER_LOCK_BY_DAY_VOITING', numberLockByDayVoiting);
    },
  }
}

export default User
