// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import axios from 'axios'
import _ from 'lodash'
import Lockr from 'lockr'
import Crypto from 'crypto-js'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'

// eslint-disable-next-line no-extend-native
Promise.prototype.always = function (callback) {
  return this.then(callback, function (reason) {
    callback(reason)
    throw reason
  })
}

Vue.config.productionTip = false
Lockr.prefix = 'biohub_'
let a = null
try {
  let bytes = Crypto.AES.decrypt(Lockr.get('user'), 'secretkey')
  a = JSON.parse(bytes.toString(Crypto.enc.Utf8))
  console.log(JSON.parse(bytes.toString(Crypto.enc.Utf8)))
} catch (e) {
  console.log(e)
}

Vue.directive('scroll', {
  bind: function (el, binding) {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop + window.innerHeight >= el.clientHeight) {
        binding.value()
      }
    })
  }
})
/* eslint-disable no-new */
let biohub = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  data: {
    user: a
  }
})

axios.interceptors.response.use((response) => {
  return response
}, (error) => {
  if (error.response.status === 403) {
    Lockr.set('user', '')
    biohub.user = null
  }
  return Promise.reject(error)
})
