<template>
      <div class="text-exchange">
        <b-container>
            <marquee-text class="text-exchange-top" :duration="300">
                <span v-for="item in cryptoNews" class="text-exchange-item cursor" @click="redirectPage(item.url)">{{ item.title }}</span>
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

    /*------------------------------- FUNCTION -------------------------------*/
    
    redirectPage(url) {
      window.open(url,'_blank');
    }
  }
  
}
</script>
