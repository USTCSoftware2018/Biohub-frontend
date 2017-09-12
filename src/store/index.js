import Vue from 'vue'
import Vuex from 'vuex'

import UserAuth from './module/UserAuth'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    UserAuth: UserAuth
  },
  state: {
  }
})
