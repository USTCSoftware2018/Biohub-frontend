<template>
  <div class="container" style="min-width:1200px;">
    <div class="row">
      <div class="col-xs-4"></div>
      <div class="col-xs-4" style="padding-left:20px;padding-right:20px;">
        <form style="margin-top:50px;" class="biohub-form">
          <div class="form-group" v-if="needSignUp">
            <div class="input-group">
              <div class="input-group-addon"><i class="fa fa-address-card fa-fw"></i></div>
              <input type="text" class="form-control" id="emailInput" placeholder="E-mail Address" v-model="usermail">
            </div>
          </div>
          <div class="form-group" v-if="needSignUp">
            <div class="input-group">
              <div class="input-group-addon"><i class="fa fa-user fa-fw"></i></div>
              <input type="text" class="form-control" id="usernameInput" placeholder="Username" v-model="username">
            </div>
          </div>
          <div class="form-group" v-if="needSignUp">
            <div class="input-group">
              <div class="input-group-addon"><i class="fa fa-key fa-fw"></i></div>
              <input type="password" class="form-control" id="passwordInput" placeholder="Password" v-model="password">
            </div>
          </div>
          <ul class="form-error" v-if="errorOccur">
            <li> {{ errorMessage }} </li>
          </ul>
          <button type="submit" class="btn btn-default btn-biohub" v-on:click.self.prevent="SignUp" v-if="needSignUp">
            Sign up
          </button>
          <button type="submit" class="btn btn-default btn-biohub"
                  v-on:click.self.once.prevent="needSignUp = !needSignUp" v-if="!needSignUp">Join Biohub Now!
          </button>
          <button type="submit" class="btn btn-default btn-biohub btn-biohub-hello"
                  v-on:click.self.prevent="JumpToLogin"
                  v-if="!needSignUp">Log in
          </button>
        </form>
      </div>
      <div class="col-xs-4"></div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'

  let usernameReg = /^\w{4,15}$/
  let userPwdReg = /(?=.*\d)(?=.*[a-zA-Z]).{6,20}/

  // email regex defined by RFC5322
  let rfcEmailReg = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

  export default {
    name: 'home',
    data () {
      return {
        username: '',
        password: '',
        usermail: '',
        needSignUp: false,
        errorOccur: false,
        errorMessage: ''
      }
    },
    methods: {
      JumpToLogin () {
        window.location.href = 'login'
      },

      SignUp () {
        console.log(this.usermail)
        console.log(this.username)
        console.log(this.password)

        if (this.usermail === '') {
          this.errorOccur = true
          this.errorMessage = 'E-mail Address cannot be empty'
          return
        }

        var matchResult = this.usermail.match(rfcEmailReg)
        if (matchResult === null || !matchResult[0].length === this.usermail.length) {
          this.errorOccur = true
          this.errorMessage = 'Invalid mail address!'
          return
        }

        if (this.username === '') {
          this.errorOccur = true
          this.errorMessage = 'Username cannot be empty'
          return
        }
        matchResult = this.username.match(usernameReg)
        if (matchResult === null || !matchResult[0].length === this.username.length) {
          this.errorOccur = true
          this.errorMessage = 'Username should only contains a-z,A-Z,0-9, and _, and it\'s length should be between 4 and 15'
          console.log('username error')
          return
        }
        if (this.password === '') {
          this.errorOccur = true
          this.errorMessage = 'Password cannot be empty'
          return
        }
        matchResult = this.password.match(userPwdReg)
        if (matchResult === null || !matchResult[0].length === this.password.length) {
          this.errorOccur = true
          this.errorMessage = 'password should at least contain numbers and characters, and it\'s length should be between 6 and 20'
          console.log('password error')
          return
        }
        axios.post('/api/users/login/', {
          username: this.username,
          password: this.password
        }).then((response) => {
          console.log(response)
        })
      }
    }
  }
</script>
