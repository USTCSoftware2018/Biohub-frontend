<template>
  <div>
    <img src="../assets/img/bioLogo.png" width="530px" style="padding-top: 10em;">
    <div class="container">
      <div class="row">
        <div class="col-md-3"></div>
        <div class="col-md-6" style="padding-left:20px;padding-right:20px;">
          <form style="margin-top:50px;" class="biohub-form">
            <div class="form-group">
              <div class="input-group">
                <div class="input-group-addon"><i class="fa fa-address-card fa-fw"></i></div>
                <input type="text" class="form-control" ref="email" placeholder="E-mail Address or Username"
                       v-model="email">
              </div>
            </div>
            <button class="btn btn-success btn-reset" v-on:click.prevent="requestReset">Send Verification Code</button>
            <div class="form-group">
              <div class="input-group">
                <div class="input-group-addon"><i class=" fa fa-fw fa-question-circle"></i></div>
                <input type="text" class="form-control" ref="verifyCode" placeholder="Verification Code"
                       v-model="verifyCode">
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <div class="input-group-addon"><i class="fa fa-key fa-fw"></i></div>
                <input type="password" class="form-control" ref="passwordInput" id="passwordInput"
                       placeholder="NewPassword" v-model="password">
              </div>
              <button type="submit" class="btn btn-biohub btn-biohub-blue full-width" style="margin-top:10px">Submit
              </button>
            </div>
          </form>
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
        verifyCode: '',
        password: ''
      }
    },
    methods: {
      requestReset () {
        axios.get('/api/users/reset_password/' +
          '?' + 'callback=http://www.baidu.com'.replace(/\./g, '%2E') +
          '&' + 'lookup=' + this.email
        ).then((response) => {
          console.log(response)
        }).catch((e) => {
          console.log(e.response)
        })
      }
    }
  }
</script>
<style scoped>
  @import "forum/Common/Common.scss";

  .btn-reset {
    margin-top: 10px;
    margin-bottom: 10px;
  }
</style>
