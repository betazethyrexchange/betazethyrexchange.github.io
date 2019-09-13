<template>
     <div style="background: #E5E5E5" class="pb-5 pt-5 descriptipn-info fee-info">
		<b-container>   
	       	<div class="fee-content">
					<div class="trading-fee">
						<h2>{{$t('message.fee.Title')}}</h2>
						<ul>
							<li>{{$t('message.fee.General')}}</li>
							<li>{{$t('message.fee.IfYou')}}</li>
							<li>
								{{$t('message.fee.At')}}</span>
							</li>
						</ul>
					</div>

					<div class="you-trading">
						<h2>{{$t('message.fee.TradingPower')}}</h2>
					</div>

					<div class="you-trading">
						<div>{{$t('message.fee.YourTradingPower')}}: <span class="text-center">{{tradingPowerLock}}</span></div>
					</div>
					
					<div class="you-trading">
						<b-row>
							<b-col md="12" xl="6">

								<div>{{$t('message.trade.freeTradingQuota')}}</div>
			<b-progress :max="feeTradingPowerMax"  v-if="feeTradingPowerMax != 0" >
				<b-progress-bar  :label="`${((currentFeeTradingQuota / feeTradingPowerMax) * 100).toFixed(2)}%`" :value="currentFeeTradingQuota"  show-progress >
				</b-progress-bar>

			</b-progress>

			<b-progress :max="1" v-if="feeTradingPowerMax == 0">
				<b-progress-bar :label="`${((1 / 1) * 100).toFixed(2)}%`" :value="1"  show-progress ></b-progress-bar>
			</b-progress>
								
								<span v-show="tradingPower < feeTradingPowerMax">{{numberWithCommasWithMathfloor(tradingPower , 0)}} TRX</span>
								<span class="pull-right">{{numberWithCommasWithMathfloor(feeTradingPowerMax ,0)}} TRX</span>
							</b-col>
							<b-col>
							</b-col>
						</b-row>
					</div>
					
	       	</div>

	     </b-container>
    </div>
</template>

<script>
	
	/*Vuex*/
	import { mapGetters, mapActions } from 'vuex'

	export default {
		computed: {
		    ...mapGetters([
		       	'tradingPower',
		       	'tradingPowerLock',
		       	'feeTradingPowerMax'
		    ]),
		    currentFeeTradingQuota() {
		    	if(!this.tradingPower){
  					return 0;
  				} 
  				if(this.tradingPower > this.feeTradingPowerMax){
  					return this.feeTradingPowerMax;
  				}
  				return this.tradingPower;
		    }
  		},
  		methods:{
  			numberWithCommasWithMathfloor(x, decimals = 3) {
		        if (isNaN(x) == true) x = 0;
		        x =  (Math.floor(x* 1000) / 1000).toFixed(decimals);
		        x  = x.split(".");
		        x[0] = x[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		        x = x.join('.');
		        return x;
		      },
  		}
	}
</script>
<style scoped>
		.fee-content{
			background: #FFF;
			padding: 16px 32px;
		}
		.progress-bar{
			background-color:rgba(107, 175, 244, 0.84);
		}
</style>