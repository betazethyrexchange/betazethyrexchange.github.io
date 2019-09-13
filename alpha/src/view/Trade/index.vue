<template>
	<div>
	    <div v-if="isMobile == false">
	        <TradeTop />
	        <TradeContent />
	    </div>
	    <div v-else class="trade-mobile" style="background: #fff;padding-bottom: 12px;">
	    	 <ul class="tab-menu clearfix">
		          <li :class="{ active: tabActive == 'charts' }"><a @click="changeTabActive('charts')"> {{ charts }}</a></li>
		          <li :class="{ active: tabActive == 'trade' }" @click="changeTabActive('trade')"><a>{{ trade }}</a></li>
		          <li :class="{ active: tabActive == 'open-order' }" @click="changeTabActive('open-order')"><a>{{ openOrder }}</a></li>
		     </ul>
		     <div class="trade-content">
		     	<div class="charts-tabs" v-if="tabActive == 'charts'">
		     		<MobileTradeDetail />
			    	<TradeChart />
			    	<TradeOrderHistory />
			    	<div class="buy-sell-btn">
			    		<button class="buy" @click="buy">{{$t('message.trade.buy')}} {{ tradeToken.tokenName }}</button>
			    		<button class="sell" @click="sell">{{$t('message.trade.sell')}} {{ tradeToken.tokenName }}</button>
			    	</div>
		     	</div>
		     	<div class="trade-tabs d-flex" v-if="tabActive == 'trade'">
		     		<MobileTradeAction ref="trade-action"/>
			    	<MobileOrderBook />
		     	</div>
		     	<div class="open-order-tabs" v-if="tabActive == 'open-order'">
		     		<MobileMyOpenOrders />
			    	<div class="buy-sell-btn">
			    		<button class="buy" @click="buy">{{$t('message.trade.buy')}} {{ tradeToken.tokenName }}</button>
			    		<button class="sell" @click="sell">{{$t('message.trade.sell')}} {{ tradeToken.tokenName }}</button>
			    	</div>
		     	</div>	
		     </div>	
	    </div> 
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { isMobile } from 'mobile-device-detect';
// components
import TradeTop from './../../components/Trade/Trade-Top.vue'
import TradeContent from './../../components/Trade/Trade-Content.vue'
import TradeChart from './../../components/Trade/Trade-Chart.vue'
import TradeOrderHistory from './../../components/Trade/Trade-Order-History.vue'
// import TradeMarket from './../../components/Trade/Trade-Market.vue'
import MobileMyOpenOrders from './../../components/Trade/Mobile/MyOpenOrders.vue'
import MobileTradeDetail from './../../components/Trade/Mobile/TradeDetail.vue'
import MobileTradeMarket from './../../components/Trade/Mobile/TradeMarket.vue'
import MobileTradeAction from './../../components/Trade/Mobile/TradeAction.vue'
import MobileOrderBook from './../../components/Trade/Mobile/TradeOrderList.vue'
export default { 
  components: {
    TradeTop,
    TradeContent,
    TradeChart,
    TradeOrderHistory,
    MobileMyOpenOrders,
    MobileTradeDetail,
    MobileTradeAction,
    MobileOrderBook,
    MobileTradeMarket
  },
  computed: {
      ...mapGetters([
        'tradeToken'
      ])
   },
  data() {
  	return {
  		isMobile: isMobile,
  		tabIndex: 0,
  		tabActive: 'charts',
  		charts: 'Charts',
  		trade: 'Trade',
  		openOrder: 'Open Order'
  	}
  },
  methods: {
  	changeTabActive(tabActive) {
  		this.tabActive = tabActive;
  	},
  	buy() {
  		this.changeTabActive('trade');
  		setTimeout(() => {
  			this.$refs['trade-action'].changeTabBuySellIndex(0);
  		}, 300);
  	},
  	sell() {
  		this.changeTabActive('trade');
  		setTimeout(() => {
  			this.$refs['trade-action'].changeTabBuySellIndex(1);
  		}, 300);
  		
  	}
  }
}
</script>

<style lang="scss">
	
</style>