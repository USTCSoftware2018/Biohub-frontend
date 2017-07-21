<template>
  <div>
    <img src="../assets/img/brand.png" width="530px" style="padding-top: 10em;">
      <div class="container signup">
        <div class="row">
          <div class="col-xs-3"></div>
          <div class="col-xs-6" style="padding-left:20px;padding-right:20px;">
            <form style="margin-top:50px;" class="biohub-form">
              <div class="form-group">
                <div class="input-group">
                  <div class="input-group-addon"><i class="fa fa-address-card fa-fw"></i></div>
                  <input type="text" class="form-control" id="emailInput" placeholder="E-mail Address" v-model="usermail">
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                  <div class="input-group-addon"><i class="fa fa-user fa-fw"></i></div>
                  <input type="text" class="form-control" id="usernameInput" placeholder="Username" v-model="username">
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                  <div class="input-group-addon"><i class="fa fa-key fa-fw"></i></div>
                  <input type="password" class="form-control" id="passwordInput" placeholder="Password" v-model="password">
                </div>
              </div>
              <div class="alert alert-danger form-error" v-if="errorOccur">
                <button type="button" class="close"></button>
                <strong>Error: </strong> {{ errorMessage }}
              </div>
              <button type="submit" class="btn btn-biohub" v-on:click.self.prevent="SignUp">
                Sign up
              </button>
            </form>
          </div>
          <div class="col-xs-3"></div>
        </div>
      </div>
  </div>
</template>
<script>
  import axios from 'axios'

  let usernameReg = /^\w{4,15}$/
  let userPwdReg = /(?=.*\d)(?=.*[a-zA-Z]).{6,20}/

  // email regex for RFC5322
  let rfcEmailReg = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

  export default {
    name: 'Signup',
    data () {
      return {
        username: '',
        password: '',
        usermail: '',
        errorOccur: false,
        errorMessage: ''
      }
    },
    methods: {

      SignUp () {
        console.log(this.usermail)
        console.log(this.username)
        console.log(this.password)

        if (this.usermail === '') {
          this.errorOccur = true
          this.errorMessage = 'E-mail address can\'t be blank'
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
          this.errorMessage = 'Username can\'t be blank'
          return
        }
        matchResult = this.username.match(usernameReg)
        if (matchResult === null || !matchResult[0].length === this.username.length) {
          this.errorOccur = true
          this.errorMessage = 'Username should only contains alphanumeric characters, and single underscores, and its length should be between 4 and 15'
          console.log('username error')
          return
        }
        if (this.password === '') {
          this.errorOccur = true
          this.errorMessage = 'Password can\'t be empty'
          return
        }
        matchResult = this.password.match(userPwdReg)
        if (matchResult === null || !matchResult[0].length === this.password.length) {
          this.errorOccur = true
          this.errorMessage = 'password should at least contain a number and  a character, and its length should be between 6 and 20'
          console.log('password error')
          return
        }
        axios.post('/api/users/register/', {
          username: this.username,
          email: this.usermail,
          password: this.password
        }).then((response) => {
          console.log(response)
        })
      }
    }
  }
</script>
