<template>
  <div>
    <img src="../../assets/img/bioLogo.png" width="530px" style="padding-top: 10em;">
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
            <div class="alert alert-danger form-error" v-if="hasError">
              <button type="button" class="close"></button>
              <strong>Error: </strong> {{ errorMessage }}
            </div>
            <button type="submit" class="btn btn-biohub btn-biohub-blue full-width" v-on:click.self.prevent="Login">
              Sign in
            </button>
            <button class="btn btn-biohub btn-biohub-light full-width" v-on:click.self.prevent="Reset">Forget Password
            </button>
          </form>
        </div>
        <div class="col-md-3"></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'login',
    created () {
      axios.get('/api/users/me/').then((response) => {
        this.$store.commit('login', response.data)
        window.location.href = '/forum'
      })
    },
    watch: {
      '$store.state.UserAuth.loginErrorPart' (to) {
        if (to === 'username') this.$refs.usernameInput.focus()
        if (to === 'password') this.$refs.passwordInput.focus()
      }
    },
    mounted () {
      this.$refs.usernameInput.focus()
    },
    data () {
      return {
        username: '',
        password: ''
      }
    },
    computed: {
      hasError () {
        return this.$store.state.UserAuth.loginHasError
      },
      errorMessage () {
        return this.$store.state.UserAuth.loginErrorMessage
      }
    },
    methods: {
      Login () {
        this.$store.dispatch('loginAuth', {username: this.username, password: this.password})
        console.log(this.$store)
      },
      Reset () {
        window.location.href = '/reset'
      }
    }
  }
</script>
