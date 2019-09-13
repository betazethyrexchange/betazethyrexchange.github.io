const Home = {
  state: {
    changeLang:true,
    placeholderInputValue:{
        tradeSearch:'',
        myaccountPleaseStake:''
    },
    cryptoNews: [],
    coinList: [],
    tradeIdActive: 0,
    tradeListToken: [],
    tradeToken: {
      close: 0,
      contract_address: "",
      created_at: "2019-07-19T01:33:30.478Z",
      currentActiveTime: 1563348579000,
      deleted_at: null,
      isActive: 2,
      lastPrice: 0,
      high: 0,
      low: 0,
      open: 0,
      price: 0,
      timeAnalysis: 1563512196000,
      tokenAddr: "",
      tokenBridgeAddr: "",
      tokenDecimals: 18,
      tokenName: "",
      tokenPair: "",
      transaction_id: "",
      updated_at: "2019-07-19T01:33:30.478Z",
      volume: 0
    },
    tradeOrderBuyList: {},
    tradeOrderSellList: {},
    tradeOrderBuyActive: {},
    tradeOrderSellActive: {},
    tradeHistoryList: {},

    tradeCheckLogin :true,

    tradeSortByDecimal :6,

    tradeLastHistory :[],

    checkRegister: true,

    priceLastTrade: 0,

    priceToken: 0,

    priceUsdOnTrx: 0,

    checkMarketToken: 0,

    loadOderTokenWhenChange:true,

    tradePriceToken:0,


    tradingPowerPageTrade:0,

    freeTradingQuota:0,


  },
  mutations: {
    SET_CHANGE_LANG: ( state, changeLang ) => state.changeLang     = changeLang, 
    SET_PLACEHOLDER_VALUE: ( state, placeholderInputValue ) => state.placeholderInputValue     = placeholderInputValue, 
    SET_CRYPTO_NEWS: ( state, cryptoNews ) => state.cryptoNews     = cryptoNews, 
    SET_COIN_LIST: ( state, coinList ) => state.coinList     = coinList,
    SET_TRADE_LIST: ( state, tradeListToken )                     => state.tradeListToken          = tradeListToken,
    SET_TRADE_ID_ACTIVE: ( state, tradeIdActive )            => state.tradeIdActive      = tradeIdActive,
    SET_TRADE_ORDER_BUY_LIST: ( state, tradeOrderBuyList )   => state.tradeOrderBuyList  = tradeOrderBuyList,
    SET_TRADE_ORDER_SELL_LIST: ( state, tradeOrderSellList ) => state.tradeOrderSellList = tradeOrderSellList,
    SET_TRADE_ORDER_BUY_ACTIVE: ( state, tradeOrderBuyActive )  => state.tradeOrderBuyActive   = tradeOrderBuyActive,
    SET_TRADE_ORDER_SELL_ACTIVE: ( state, tradeOrderSellActive ) => state.tradeOrderSellActive = tradeOrderSellActive,
    SET_TRADE_HISTORY_TRADER_LIST: ( state, tradeHistoryList ) => state.tradeHistoryList = tradeHistoryList,

    SET_TRADE_LOGIN: ( state, tradeCheckLogin ) => state.tradeCheckLogin = tradeCheckLogin,

    SET_TRADE_SORT: ( state, tradeSortByDecimal ) => state.tradeSortByDecimal = tradeSortByDecimal,

    SET_TRADE_LAST_TRADE: ( state, tradeLastHistory ) => state.tradeLastHistory = tradeLastHistory,

    SET_ACTIVE_REGISTER: ( state, checkRegister ) => state.checkRegister = checkRegister,

    SET_PRICE_LAST_TRADE: ( state, priceLastTrade ) => state.priceLastTrade = priceLastTrade,

    SET_TRADE_TOKEN: ( state, tradeToken ) => state.tradeToken = tradeToken,

    SET_PRICE_TOKEN: ( state, priceToken ) => state.priceToken = priceToken,

    SET_PRICE_USD_ON_TRX: ( state, priceUsdOnTrx ) => state.priceUsdOnTrx = priceUsdOnTrx,

    SET_MARKET_TOKEN: ( state, checkMarketToken ) => state.checkMarketToken = checkMarketToken,

    SET_LOAD_ODER_WHEN_CHANGE: ( state, loadOderTokenWhenChange ) => state.loadOderTokenWhenChange = loadOderTokenWhenChange,

    SET_TRADE_PRICE_TOKEN: ( state, tradePriceToken ) => state.tradePriceToken = tradePriceToken,


    SET_TRADING_POWER_PAGE_TRADE: ( state, tradingPowerPageTrade ) => state.tradingPowerPageTrade = tradingPowerPageTrade,

    SET_FREE_TRADING_QUOTA: ( state, freeTradingQuota ) => state.freeTradingQuota = freeTradingQuota,

  },
  actions: {

    setChangeLang({ commit }, changeLang) {
      commit('SET_CHANGE_LANG', changeLang);
    },
    setPlaceholderInputValue({ commit }, placeholderInputValue) {
      commit('SET_PLACEHOLDER_VALUE', placeholderInputValue);
    },
    setCryptoNews({ commit }, cryptoNews) {
      commit('SET_CRYPTO_NEWS', cryptoNews);
    },
    setCoinList({ commit }, coinList) {
      commit('SET_COIN_LIST', coinList);
    },
    setTradeList({ commit }, tradeListToken) {
      commit('SET_TRADE_LIST', tradeListToken);
    },
    setTradeIdActive({ commit }, tradeIdActive) {
      commit('SET_TRADE_ID_ACTIVE', tradeIdActive);
    },
    setTradeOrderBuyList({ commit }, tradeOrderBuyList) {
      commit('SET_TRADE_ORDER_BUY_LIST', tradeOrderBuyList);
    },
    setTradeOrderSellList({ commit }, tradeOrderSellList) {
      commit('SET_TRADE_ORDER_SELL_LIST', tradeOrderSellList);
    },
    setTradeOrderBuyActive({ commit }, tradeOrderBuyActive) {
      let timeClick = (new Date()).getTime();
      let data = Object.assign({ timeClick }, tradeOrderBuyActive);
      commit('SET_TRADE_ORDER_BUY_ACTIVE', data);
    },
    setTradeOrderSellActive({ commit }, tradeOrderSellActive) {
      let timeClick = (new Date()).getTime();
      let data = Object.assign({ timeClick }, tradeOrderSellActive);
      commit('SET_TRADE_ORDER_SELL_ACTIVE', data);
    },
    setTradeListHistory({ commit }, tradeHistoryList) {
      commit('SET_TRADE_HISTORY_TRADER_LIST', tradeHistoryList);
    },
    setTradeCheckLogin({ commit }, checkLogin) {
      commit('SET_TRADE_LOGIN', checkLogin);
    },
    setTradeSortByDecimal({ commit }, tradeSortByDecimal) {
      commit('SET_TRADE_SORT', tradeSortByDecimal);
    },
    setTradeLastHistory({ commit }, tradeLastHistory) {
      commit('SET_TRADE_LAST_TRADE', tradeLastHistory);
    },
  
    setUserActiveRegister({ commit }, checkRegister) {
      commit('SET_ACTIVE_REGISTER', checkRegister);
    },
    setLastTradePrice({ commit }, priceLastTrade) {
      commit('SET_PRICE_LAST_TRADE', priceLastTrade);
    },
    setTradeToken({ commit }, tradeToken) {
      commit('SET_TRADE_TOKEN', tradeToken);
    },
    setPriceToken({ commit }, priceToken) {
      commit('SET_PRICE_TOKEN', priceToken);
    },
    setPriceUsdOnTrx({ commit }, priceUsdOnTrx) {
      commit('SET_PRICE_USD_ON_TRX', priceUsdOnTrx);
    },
    setMarketToken({ commit }, checkMarketToken) {
      commit('SET_MARKET_TOKEN', checkMarketToken);
    },
    setLoadOderWhenChange({ commit }, loadOderTokenWhenChange) {
      commit('SET_LOAD_ODER_WHEN_CHANGE', loadOderTokenWhenChange);
    },
    setTradePriceToken({ commit }, tradePriceToken) {
      commit('SET_TRADE_PRICE_TOKEN', tradePriceToken);
    },
    setFreeTradingQuota({ commit }, freeTradingQuota) {
      commit('SET_FREE_TRADING_QUOTA', freeTradingQuota);
    },
    setTradingPowerPageTrade({ commit }, tradingPowerPageTrade) {
      commit('SET_TRADING_POWER_PAGE_TRADE', tradingPowerPageTrade);
    },
  }
}

export default Home
