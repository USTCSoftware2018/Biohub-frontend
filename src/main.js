import marked from 'marked'
import Vue from 'vue'
import App from './App'
import router from './router'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import authController from '@/utils/authController'
import websocket from '@/utils/websocket'
import axios from 'axios'
import * as d3 from 'd3'

window.$ = $
window.axios = axios
window.websocket = websocket
window.d3 = d3

/* eslint-disable no-undef */
Vue.prototype.currentSrc = DEBUG ? '/app.js' : document.currentScript.src

/* eslint-disable no-undef */
axios.defaults.baseURL = axiosBaseURL
axios.defaults.withCredentials = true

marked.setOptions({
  tables: true,
  renderer: new marked.Renderer()
})

// eslint-disable-next-line no-extend-native
Promise.prototype.always = function (callback) {
  return this.then(callback, function (reason) {
    callback(reason)
    throw reason
  })
}

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    to404 () {
      this.$router.replace({ name: 'not-found' })
    },
    makeError (response) {
      switch (response.status) {
        case 400:
          let errors = []
          _.forEach(response.data, value => {
            errors = errors.concat(value)
          })
          return errors.join('<br>')
        case 429:
          return 'Request too frequent.'
        case 403:
          return 'You have no enough access.'
      }
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  data: {
    user: null
  },
  created () {
    websocket.init()
    authController.init(this)
  }
})

