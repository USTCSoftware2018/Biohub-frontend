<template>
  <div>
    <div style="text-align:center">
      <img src="../../assets/img/bioLogo.png" width="530px" style="padding-top: 10em;">
    </div>
    <div class="container signup">
      <div class="row">
        <div class="col-md-3"></div>
        <div class="col-md-6" style="padding-left:20px;padding-right:20px;">
          <form style="margin-top:50px;" class="biohub-form" @submit.prevent="signUp" autocomplete="nope">
            <div class="form-group">
              <div class="input-group">
                <div class="input-group-addon"><i class="fa fa-address-card fa-fw"></i></div>
                <input type="text" class="form-control" ref="emailInput" id="emailInput" placeholder="E-mail Address"
                       list="mail_list" v-model="usermail">
                <datalist id="mail_list" v-model="mails" style="overflow-y: auto !important;">
                  <dynamic-options v-for="(mail, index) in mails"
                                   :key="index"
                                   v-if="mail.text.match(usermail.split('@')[1]) !== null"
                                   v-bind:text="usermail.split('@')[0] + mail.text"
                                   v-bind:category="mail.type">
                  </dynamic-options>
                </datalist>
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <div class="input-group-addon"><i class="fa fa-user fa-fw"></i></div>
                <input type="text" class="form-control" ref="usernameInput" id="usernameInput"
                      placeholder="Username"
                      v-model="username"
                      autocomplete="off">
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <div class="input-group-addon"><i class="fa fa-key fa-fw"></i></div>
                <input type="password" class="form-control" ref="passwordInput" id="passwordInput"
                       placeholder="Password"
                       v-model="password"
                       autocomplete="off">
              </div>
            </div>
            <div class="form-group clearfix">
              <router-link :to="{ name: 'login' }" class="pull-left">
                Already have an account? Log in Now!
              </router-link>
            </div>
            <div class="form-group">
              <div class="alert alert-danger form-error" v-if="errorOccur">
                <span v-html="errorMessage"></span>
              </div>
              <button type="submit" class="btn btn-biohub btn-biohub-blue full-width">
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import DynamicOptions from '../utils/DynamicOptions.vue'
  import authController from '@/utils/authController'

  let usernameReg = /^\w{4,15}$/
  let userPwdReg = /(?=.*\d)(?=.*[a-zA-Z]).{6,20}/

  // email regex for RFC5322
  let rfcEmailReg = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

  export default {
    name: 'Signup',
    components: {
      DynamicOptions
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        if (vm.$root.user) vm.$router.push({ name: 'forum-home' })
      })
    },
    mounted () {
      this.$refs.emailInput.focus()
    },
    data () {
      return {
        mails: [
          {
            text: '@gmail.com',
            type: 'gmail'
          }, {
            text: '@outlook.com',
            type: 'outlook'
          }, {
            text: '@hotmail.com',
            type: 'hotmail'
          }, {
            text: '@yahoo.com',
            type: 'yahoo'
          }, {
            text: '@msn.com',
            type: 'msn'
          }, {
            text: '@163.com',
            type: 'netease'
          }, {
            text: '@qq.com',
            type: 'QQ'
          }, {
            text: '@mail.ustc.edu.cn',
            type: 'USTC'
          }],
        username: '',
        password: '',
        usermail: '',
        errorOccur: false,
        errorMessage: ''
      }
    },
    methods: {
      signUp () {
        if (this.usermail === '') {
          this.errorOccur = true
          this.errorMessage = 'E-mail address can\'t be blank'
          this.$refs.emailInput.focus()
          return
        }
        var matchResult = this.usermail.match(rfcEmailReg)
        if (matchResult === null || !matchResult[0].length === this.usermail.length) {
          this.errorOccur = true
          this.errorMessage = 'Invalid mail address!'
          this.$refs.emailInput.focus()
          return
        }

        if (this.username === '') {
          this.errorOccur = true
          this.errorMessage = 'Username can\'t be blank'
          this.$refs.usernameInput.focus()
          return
        }
        matchResult = this.username.match(usernameReg)
        if (matchResult === null || !matchResult[0].length === this.username.length) {
          this.errorOccur = true
          this.errorMessage = 'Username should only contains alphanumeric characters, and single underscores, and its length should be between 4 and 15'
          this.$refs.usernameInput.focus()
          console.log('username error')
          return
        }
        if (this.password === '') {
          this.errorOccur = true
          this.errorMessage = 'Password can\'t be empty'
          this.$refs.passwordInput.focus()
          return
        }
        matchResult = this.password.match(userPwdReg)
        if (matchResult === null || !matchResult[0].length === this.password.length) {
          this.errorOccur = true
          this.errorMessage = 'password should at least contain a number and  a character, and its length should be between 6 and 20'
          this.$refs.passwordInput.focus()
          console.log('password error')
          return
        }
        axios.post('/api/users/register/', {
          username: this.username,
          email: this.usermail,
          password: this.password
        }).then((response) => {
          authController.login(response.data)
          this.$router.push({ name: 'forum-home' })
        }).catch((e) => {
          if (e.response.status === 404) {
            authController.fetch()
            this.$router.push({ name: 'forum-home' })
          } else if (e.response.status === 429) {
            this.errorMessage = 'You can only register ONE account within 1 hour.'
          } else {
            this.errorMessage = this.makeError(e.response)
          }
        })
      }
    }
  }
</script>
