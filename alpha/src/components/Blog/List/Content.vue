<template>
  <div class="blog-list-content">     
        <div class="blog-container mt-3">
          <b-row class="row-exchange">
            <b-col class="row-col-exchange" @click="redirectToBlogDetail(item.slug , item.title)"  md="3" v-for="item in blogList" :key="item.slug">
               <div class="item-blog">
                  <div class="blog-image">
                    <img :src="`${urlBackend}/uploads/${item.image}`">
                  </div>
                  <div class="blog-info">
                    <div class="blog-except mt-3">{{ convertText(item.except) }}</div>
                    <div class="blog-date">{{convertTime(item.created_at)}}</div>
                  </div>
                </div>
            </b-col>  
          </b-row>  
        </div>
        <div class="panigate" v-if="blogNumberPage > 1">
            <paginate
              :page-count="blogNumberPage"
              :page-range="3"
              :click-handler="clickPage"
              :prev-text="''"
              :next-text="''"
              :prev-link-class="'fa fa-angle-double-left'"
              :next-link-class="'fa fa-angle-double-right'"
              :container-class="'pagination'"
              :page-class="'page-item'">
            </paginate>
          </div> 
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';  
import UtilsConvertTime from './../../../utils/convertTime.js'; 
export default {
  computed: {
      ...mapGetters([
        'blogList',
        'blogPage',
        'blogNumberPage'
      ])
  },
  data () {
    return {
      urlBackend: process.env.URL_BACKEND,
      total: 1,
    }
  },
  methods: {
    ...mapActions([
          'initBlogList',
    ]),

    /*----------------------- VALIDATE , CHECK , EVENT -----------------------*/

    redirectToBlogDetail(slugs , titles){
      this.$router.push({name:'blog-detail', params: { slug: slugs }});
    },
    clickPage: function(page) {
      this.initBlogList({ page, limit: 12 });
    },
    readMore() {
      alert('readMore');
    },
    convertTime(val){
      return UtilsConvertTime.formatYear(val);
    },
    convertText(text){
      let stringLength = text.length;
      if(stringLength > 135){
          var textConvertNew = text.slice(0,135) + '...' ;
      }else{
          textConvertNew = text;
      }
      return textConvertNew;
    }
  }
}
</script>