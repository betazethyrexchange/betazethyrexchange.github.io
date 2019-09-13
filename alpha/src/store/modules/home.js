const Home = {
  state: {
    homeTest: '',
    coinList: '',
    difficulty:0,
    totalZTR:0,
    usageToken:{
        totalStakeEcoPower: 0,
        totalStakeTradingPower: 0,
        totalStakeVotingPower: 0,
        totalTradingPower: 0
    },
    totalToken:{
      totalTradingPower:0,
      totalEcoPower:0,
      totalVotingPower:0
    },

    feeTradingPowerMax:0
  },
  mutations: {
    SET_HOME_TEST: ( state, homeTest ) => state.homeTest     = homeTest,
    SET_COIN_LIST: ( state, coinList ) => state.coinList     = coinList,
    SET_DIFFICULTY: ( state, difficulty ) => state.difficulty     = difficulty,
    SET_TOTAL_ZTR: ( state, totalZTR ) => state.totalZTR     = totalZTR,
    SET_USAGE_TOKEN: ( state, usageToken ) => state.usageToken     = usageToken,
    SET_TOTAL_TOKEN: ( state, totalToken ) => state.totalToken     = totalToken,
    SET_FEE_TRADING_POWER_MAX: ( state, feeTradingPowerMax ) => state.feeTradingPowerMax     = feeTradingPowerMax,
  },
  actions: {
 
    setHomeTest({ commit }, homeTest) {
      commit('SET_HOME_TEST', homeTest);
    },

    setCoinList({ commit }, coinList) {
      commit('SET_COIN_LIST', coinList);
    },

    setDifficulty({ commit }, difficulty) {
      commit('SET_DIFFICULTY', difficulty);
    },

    setTotalZtr({ commit }, totalZTR) {
      commit('SET_TOTAL_ZTR', totalZTR);
    },

    setUsageToken({ commit }, usageToken) {
      commit('SET_USAGE_TOKEN', usageToken);
    },
    setTotalToken({ commit }, totalToken) {
      commit('SET_TOTAL_TOKEN', totalToken);
    },
    setFeeTradingPowerMax({ commit }, feeTradingPowerMax) {
      commit('SET_FEE_TRADING_POWER_MAX', feeTradingPowerMax);
    }
  }
}

export default Home
