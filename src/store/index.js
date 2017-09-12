import Vue from 'vue'
import Vuex from 'vuex'

import UserAuth from './module/UserAuth'
import BrickStatus from './module/BrickStatus'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    UserAuth: UserAuth,
    BrickStatus: BrickStatus
  },
  state: {
  }
})
