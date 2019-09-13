<template>
      <div class="top-home clearfix">
        <b-container>
            <marquee-text class="text-exchange-top" :duration="300">        
              <span v-for="item in cryptoNews" class="text-top-home cursor" @click="redirectPage(item.url)">{{ item.title }}</span>     
            </marquee-text>
        </b-container>
      </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import MarqueeText from 'vue-marquee-text-component'

export default {
  computed: {
      ...mapGetters([
        'cryptoNews',
      ])
  },
  components: {
    MarqueeText
  },
  data () {
    return {
     
    }
  },
  methods: {
    redirectPage(url) {
      window.open(url,'_blank');
    }
  }
  
}
</script>
<style type="text/css">
  .top-home{
      background: #181B3C;
      /*padding: 14px 0;*/
  }
  .text-top-home{
    color: #FFFFFF;
    font-size: 13px;
    padding: 0 18px;
    span{
      /*color: #6892FF;*/
      margin-left: 8px;
    }
  }
  .text-home-left{
    float: left;
    width: 30%;
  }
  .text-home-centern{
    float: left;
    width: 30%;
  }
  .text-home-right{
    float: left;
    width: 40%;
  }
  .date-top-home{
    color:  #6892FF;
  }
</style>