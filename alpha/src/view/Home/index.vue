<template>
    <div>
        <Top />
        <TradeNow />
        <MarketHot />
        <WhyInvest />
        <WhyZTR />
        <div class="pt-3">
          <MarketList />
        </div>

        <Assets />
        <Touch />
    </div>
</template>

<script>
// components
import TradeNow from './../../components/Home/TradeNow.vue'
import WhyInvest from './../../components/Home/WhyInvest.vue'
import WhyZTR from './../../components/Home/WhyZTR.vue'
import Assets from './../../components/Home/Assets.vue'
import Touch from './../../components/Home/Touch.vue'
import MarketList from './../../components/Market/Market-List.vue'
import MarketHot from './../../components/Market/Market-Hot.vue'
import Top from './../../components/Home/Top.vue'
export default { 
  components:{
    Top,
    TradeNow,
    WhyInvest,
    WhyZTR,
    Assets,
    Touch,
    MarketList,
    MarketHot
  }
}
</script>