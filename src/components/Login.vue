<template>
  <div class="container login">
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
          <button type="submit" class="btn btn-default btn-biohub" v-on:click.self.prevent="Login">Sign in</button>
        </form>
      </div>
      <div class="col-xs-4"></div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'

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
        if (this.username === '') {
          this.errorOccur = true
          this.errorMessage = 'Username cannot be empty'
          return
        }
        if (this.password === '') {
          this.errorOccur = true
          this.errorMessage = 'Password cannot be empty'
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
