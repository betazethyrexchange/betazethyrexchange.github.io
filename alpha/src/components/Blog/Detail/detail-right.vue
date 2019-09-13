<template>
  <div class="blog-detail-right cursor">
  <div  v-for="item in blogList">
    <div class="item-blog" @click="redirectToBlogDetail(item.slug , item.title)">
        <div class="blog-image">
          <img :src="`${urlBackend}/uploads/${item.image}`">
        </div>
        <div class="blog-info">
          <div class="blog-except mt-3"><h3>{{ item.except }}</h3></div>
          <div class="blog-date">{{convertTime(item.created_at)}}</div>
        </div>
      </div>
  </div>
   
  </div>
</template>
<script>
import UtilsConvertTime from './../../../utils/convertTime.js';
import { mapGetters, mapActions } from 'vuex';  
export default {
  computed: {
      ...mapGetters([
        'blogList',
      ])
  },
  data () {
    return {
      urlBackend: process.env.URL_BACKEND,
    }
  },
  methods: {
     ...mapActions([
          'initBlogDetail',
    ]),
    /*----------------------- VALIDATE , CHECK , EVENT -----------------------*/

    redirectToBlogDetail(slugs , titles){
      this.initBlogDetail(slugs);
      this.$router.push({name:'blog-detail', params: { slug: slugs  }});
    },
    convertTime(val){
      return UtilsConvertTime.formatYear(val);
    }
  }
}
</script>