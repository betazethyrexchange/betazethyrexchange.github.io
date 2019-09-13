<template>
  <div  style="overflow: hidden;">         
      <BlogView />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import BlogApi from '../../api/blog';
// components
import BlogView from './../../view/Blog';

export default {
  components: {
    BlogView
  },
  computed: {
      ...mapGetters([
        'blogPage',
      ])
  },
  created() {
    this.initData();
  },
  methods:{
    ...mapActions([
          'initBlogList'
   	]),

    /*--------------------------------- INIT ---------------------------------*/
    initData() {
      this.initBlogList({ page: 1, limit: 12 });
    }
  }
}
</script>

<style lang="scss">
</style>