<template>
  <div class="trade-now">
    <b-container>
      <carousel :per-page="1" :autoplay="true" :autoplayTimeout="3000" :paginationEnabled="false" :loop="true">
        <slide>
            <div class="trade-now-block">
              <h1>{{$t('message.tradeNow.Title')}}</h1>
              <h3 class="d-flex align-items-center">
                <img src="../../assets/images/logo.png" class="mr-2">
              </h3>
              <div class="content-text">
                {{$t('message.tradeNow.WhaleEX')}}<br>
                {{$t('message.tradeNow.Even')}}
              </div>
              <b-button variant="primary" class="button" @click="redirectToMarket">{{$t('message.tradeNow.Button')}}</b-button>
            </div>
        </slide>
        <slide>
            <div class="trade-now-block">
              <h3 class="d-flex align-items-center">
                <img src="../../assets/images/logo.png" class="mr-2">
              </h3>
              <h1>Shasta Testnet Beta Top Trader</h1>
              <h3>7 August - 21 August  2019</h3>
              <div class="content-text">
                  Total prize pool of 10,000 TRX
              </div>
             <!--  <b-button variant="primary" class="button" @click="redirectToMarket">{{$t('message.tradeNow.Button')}}</b-button> -->
            </div>
        </slide>
      </carousel>
    </b-container>
  </div>
  <!--  <div class="trade-now">
    <b-container>
      <div class="trade-now-block">
        <h1>{{$t('message.tradeNow.Title')}}</h1>
        <h3 class="d-flex align-items-center">
          <img src="../../assets/images/logo.png" class="mr-2">
        </h3>
        <div class="content-text">
          {{$t('message.tradeNow.WhaleEX')}}<br>
          {{$t('message.tradeNow.Even')}}
        </div>
        <b-button variant="primary" class="button" @click="redirectToMarket">{{$t('message.tradeNow.Button')}}</b-button>
      </div>
    </b-container>
  </div> -->
</template>
<script>
import { Carousel, Slide } from 'vue-carousel';

export default {
  components: {
    Carousel,
    Slide
  },
  methods: {
    redirectToMarket() {
      // window.location = '/#/market';
      this.$router.push({name:'market'});
    }
  }
}
</script>
