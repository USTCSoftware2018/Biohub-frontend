// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import $ from 'jquery'
import axios from 'axios'
import _ from 'lodash'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'

Vue.config.productionTip = false
axios.get('/api/users/me/').then((response) => {
  Vue.prototype.USER = response.data
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
