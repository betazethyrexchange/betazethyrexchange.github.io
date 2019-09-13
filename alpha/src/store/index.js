import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home'
import user from './modules/user'
import blog from './modules/blog'
import trade from './modules/trade'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    home,
    trade,
    user,
    blog
  },
  getters
})

export default store
