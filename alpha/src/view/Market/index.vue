<template>
    <div class="market-page">
        <MartketWorld />
        <MartketHot />
        <MartketList />
    </div>
</template>

<script>
// components
import MartketWorld from './../../components/Market/Market-World.vue'
import MartketHot from './../../components/Market/Market-Hot.vue'
import MartketList from './../../components/Market/Market-List.vue'
export default { 
  components:{
    MartketWorld,
    MartketHot,
    MartketList
  }
}
</script>
