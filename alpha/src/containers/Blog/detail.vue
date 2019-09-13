<template>
  <div  style="overflow: hidden;">         
      <BlogDetail />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

// components
import BlogDetail from './../../view/Blog/detail.vue';
import BlogApi from '../../api/blog';
export default {
  components: {
    BlogDetail
  },
  computed: {
      ...mapGetters([
        'blogList',
        'blogPage',
        'blogSlug'
      ])
  },
  created() {
    this.initData();
  },
  methods:{
    ...mapActions([
          'initBlogList',
          'initBlogDetail',
          'setBlogDetail'
    ]),

    /*--------------------------------- INIT ---------------------------------*/
    initData(){
      this.initBlogList({ page: 1, limit: 3 });
      this.initBlogDetail(this.$router.history.current.params.slug);
    },
  }
}
</script>

<style lang="scss">
</style>