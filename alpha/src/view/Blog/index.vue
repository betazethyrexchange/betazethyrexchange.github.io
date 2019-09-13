<template>
    <div class="blog-page pb-5">
		<b-container>   
	        <BlogBanner />
	        <BlogListContent />
	     </b-container>
    </div>

</template>

<script>
// components
import BlogBanner from './../../components/Blog/Banner.vue'
import BlogListContent from './../../components/Blog/List/Content.vue'
export default { 
  components:{
    BlogBanner,
    BlogListContent
  }
}
</script>