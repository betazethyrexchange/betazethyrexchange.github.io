<template>
  <div class="blog-detail-page">
		<b-container>   
      <div class="blog-detail">
        <b-row class="row-exchange">
          <b-col lg="9" md="12" class="row-col-exchange">
  	        <BlogDetailLeft />
          </b-col>
          <b-col lg="3" md="12" class="row-col-exchange">
  	        <BlogDetailRight />
          </b-col>
        </b-row>
      </div>
   </b-container>
 </div>

</template>

<script>
// components
import BlogDetailLeft from './../../components/Blog/Detail/detail-left.vue'
import BlogDetailRight from './../../components/Blog/Detail/detail-right.vue'
export default { 
  components:{
    BlogDetailLeft,
    BlogDetailRight
  }
}
</script>