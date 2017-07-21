<template>
  <div class="container" style="min-width:1200px;">
    <div class="row">
      <div class="col-xs-4"></div>
      <div class="col-xs-4" style="padding-left:20px;padding-right:20px;">
        <form style="margin-top:50px;" class="biohub-form">
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
          <ul class="form-error" v-if="errorOccur">
            <li> {{ errorMessage }} </li>
          </ul>
          <button type="submit" class="btn btn-default btn-biohub" @click.prevent="Login">Sign in</button>
        </form>
      </div>
      <div class="col-xs-4"></div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'

  let usernamePat = /^\w{4,15}$/
  let userPwdPat = /(?=.*\d)(?=.*[a-zA-Z]).{6,20}/

  export default {
    name: 'login',
    data () {
      return {
        username: '',
        password: '',
        errorOccur: false,
        errorMessage: ''
      }
    },
    methods: {
      Login () {
        console.log(this.username)
        console.log(this.password)
        var matchResult = this.username.match(usernamePat)
        if (matchResult === null || !matchResult[0].length === this.username.length) {
          this.errorOccur = true
          this.errorMessage = 'Username should only contains a-z,A-Z,0-9, and _, and it\'s length should be between 4 and 15'
          console.log('username error')
          return
        }
        matchResult = this.password.match(userPwdPat)
        if (matchResult === null || !matchResult[0].length === this.password.length) {
          this.errorOccur = true
          this.errorMessage = 'password should at least contain numbers and characters, and it\'s length should be between 6 and 20'
          console.log('password error')
          return
        }
        axios.post('http://localhost:10800/api/users/login/', {
          username: this.username,
          password: this.password
        }).then((response) => {
          console.log(response)
        })
      }
    }
  }
</script>
