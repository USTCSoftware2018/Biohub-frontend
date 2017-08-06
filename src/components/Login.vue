<template>
  <div>
    <img src="../assets/img/brand.png" width="530px" style="padding-top: 10em;">
    <div class="container login">
      <div class="row">
        <div class="col-md-3"></div>
        <div class="col-md-6">
          <form style="margin-top:50px;" class="biohub-form">
            <div class="form-group">
              <div class="input-group">
                <div class="input-group-addon"><i class="fa fa-user fa-fw"></i></div>
                <input type="text" ref="usernameInput" class="form-control" id="usernameInput" placeholder="Username"
                       v-model="username">
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <div class="input-group-addon"><i class="fa fa-key fa-fw"></i></div>
                <input type="password" class="form-control" ref="passwordInput" id="passwordInput"
                       placeholder="Password" v-model="password">
              </div>
            </div>
            <div class="alert alert-danger form-error" v-if="errorOccur">
              <button type="button" class="close"></button>
              <strong>Error: </strong> {{ errorMessage }}
            </div>
            <button type="submit" class="btn btn-biohub btn-biohub-orange full-width" v-on:click.self.prevent="Login">Sign in</button>
            <a class="btn btn-biohub btn-biohub-light full-width"  href="/reset">Forget Password</a>
          </form>
        </div>
        <div class="col-md-3"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'

  export default {
    name: 'login',
    beforeCreate () {
      axios.get('/api/users/me/').then((response) => {
        window.location.href = '/forum'
      })
    },
    mounted () {
      this.$refs.usernameInput.focus()
    },
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
        if (this.username === '') {
          this.errorOccur = true
          this.errorMessage = 'Username can\'t be blank'
          this.$refs.usernameInput.focus()
          return
        }
        if (this.password === '') {
          this.errorOccur = true
          this.errorMessage = 'Password can\'t be blank'
          this.$refs.passwordInput.focus()
          return
        }
        this.errorOccur = false
        axios.post('/api/users/login/', {
          username: this.username,
          password: this.password
        }).then((response) => {
          console.log(response)
          window.location.href = '/forum'
        }).catch(e => {
          if (e.response.status === 400) {
            this.errorOccur = true
            this.errorMessage = 'Wrong username or password'
          }
          console.log(e)
        })
      }
    }
  }
</script>
