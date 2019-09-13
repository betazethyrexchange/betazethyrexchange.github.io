<template>
  <div class="blog-detail-left">
        
            <div class="blog-info">
                <h4>{{blogDetail.title}}</h4>
               <!-- <img :src="`${urlBackend}/uploads/${blogDetail.image}`"> -->
                <p class="date-time">{{convertTime(blogDetail.created_at)}}</p>
                <div class="blog-except mt-3"><p v-html="blogDetail.content"></p></div>        
            </div>
       
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'; 
import BlogApi from '../../../api/blog';
import UtilsConvertTime from './../../../utils/convertTime.js'; 
export default {
  computed: {
      ...mapGetters([
        'blogList',
        'blogSlug',
        'blogDetail'
      ]),
  },
  data () {
    return {
        urlBackend: process.env.URL_BACKEND,
    }
  },
  methods: {

    /*----------------------- VALIDATE , CHECK , EVENT -----------------------*/

    convertTime(val){
      return UtilsConvertTime.formatYear(val);
    }
  }
}
</script>