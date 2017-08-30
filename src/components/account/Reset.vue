<template>
  <div>
    <img src="../../assets/img/bioLogo.png" width="530px" style="padding-top: 10em;">
    <div class="container">
      <div class="row">
        <div class="col-md-3"></div>
        <div class="col-md-6" style="padding-left:20px;padding-right:20px;">
          <component :is="currentView" :sign="sign"></component>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import $ from 'jquery'

  export default {
    data () {
      return {
        email: '',
        password: '',
        currentView: '',
        sign: ''
      }
    },
    beforeMount () {
      var urlParams;
      (window.onpopstate = function () {
        var match
        var pl = /\+/g
        var search = /([^&=]+)=?([^&]*)/g
        var decode = function (s) { return decodeURIComponent(s.replace(pl, ' ')) }
        var query = window.location.search.substring(1)
        urlParams = {}
        while ((match = search.exec(query)) !== null) { urlParams[decode(match[1])] = decode(match[2]) }
      })()
      if (urlParams.sign === undefined) {
        this.currentView = 'GetCodeView'
      } else {
        this.currentView = 'ResetView'
        this.sign = urlParams.sign
        console.log(urlParams)
      }
    },
    components: {
      GetCodeView: function () {
        return import('./GetCodeView')
      },
      ResetView: function () {
        return import('./ResetView')
      }
    }
  }
</script>
<style scoped>
  @import "../forum/Common/Common.scss";

  .btn-reset {
    margin-top: 10px;
    margin-bottom: 10px;
  }
</style>
