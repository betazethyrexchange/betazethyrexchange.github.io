import BlogApi from '../../api/blog';

const Blog = {
  state: {
    blogList: [],
    blogPage: 1,
    blogNumberPage: 1,
    blogSlug:'',
    blogDetail:{},
  },
  mutations: {
    SET_BLOG_LIST: ( state, blogList ) => state.blogList     = blogList,
    SET_BLOG_PAGE: ( state, blogPage ) => state.blogPage     = blogPage,
    SET_BLOG_NUMBER_PAGE: ( state, blogNumberPage ) => state.blogNumberPage     = blogNumberPage,
    SET_BLOG_SLUG: ( state, blogSlug ) => state.blogSlug     = blogSlug,
    SET_BLOG_DETAIL: ( state, blogDetail ) => state.blogDetail     = blogDetail,
  },
  actions: {

    initBlogList({ commit }, { page, limit }) {
      let params = {
        page: page,
        limit: limit
      };
      BlogApi
        .getBlogList(params)
        .then(response)
        .catch(error);

      function  response(res) {
        if (res.code != 'SUCCESS') return false;
          Blog.actions.setBlogList({ commit }, res.data.blogList);
          Blog.actions.setBlogPage({ commit }, page);
          Blog.actions.setBlogNumberPage({ commit }, res.data.number_page);
        }
      function error(e) { 
        console.log(e);
      }  
    },
    initBlogDetail({ commit }, slug) {
      let params = {
          slug : slug,
      };
      BlogApi
        .getBlogDetail(params)
        .then(blogDetail=>{
          Blog.actions.changeTitle(blogDetail.data.title);
          Blog.actions.setBlogDetail({ commit }, blogDetail.data);
      })
    },
    setBlogList({ commit }, blogList) {
      commit('SET_BLOG_LIST', blogList);
    },
    setBlogPage({ commit }, blogPage) {
      commit('SET_BLOG_PAGE', blogPage);
    },
    setBlogNumberPage({ commit }, blogNumberPage) {
      commit('SET_BLOG_NUMBER_PAGE', blogNumberPage);
    },
    setBlogSlug({ commit }, blogSlug) {
      commit('SET_BLOG_SLUG', blogSlug);
    },
    setBlogDetail({ commit }, blogDetail) {
      commit('SET_BLOG_DETAIL', blogDetail);
    },
    changeTitle(slug) {
        let self = this;
        let titleEl = document.querySelector('head title');
        titleEl.textContent = `${slug} | Blog Detail`;
    }
  }
}

export default Blog
