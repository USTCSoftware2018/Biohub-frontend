<template>
  <div style="text-align: center;">
    <img src="../../assets/img/bioLogo.png" width="530px" style="padding-top: 10em">
    <div class="container login">
      <div class="row">
        <div class="col-md-3"></div>
        <div class="col-md-6">
          <form style="margin-top:50px;" class="biohub-form" @submit.prevent="login">
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
            <router-link :to="{ name: 'signup' }" class="pull-left" style="margin-bottom: 15px;">
              No account? Join us now!
            </router-link>
            <router-link :to="{ name: 'Reset' }" class="pull-right" style="margin-bottom: 15px;">
              Forgot password?
            </router-link>
            <button type="submit" id="submit-button" class="btn btn-biohub btn-biohub-blue full-width" v-on:click.self.prevent="login">
              Sign in
            </button>
          </form>
        </div>
        <div class="col-md-3"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import authController from '@/utils/authController'

  export default {
    name: 'login',
    beforeRouteEnter (to, from, next) {
      next(vm => {
        if (vm.$root.user) vm.$router.push({ name: 'forum-home' })
      })
    },
    watch: {
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
      login () {
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
          authController.login(response.data)
          this.$router.push({name: 'forum-home'})
        }).catch(e => {
          switch (e.response.status) {
            case 400:
              this.errorOccur = true
              this.errorMessage = this.makeError(e.response)
              break
            case 404:
              authController.fetch()
              this.$router.push({name: 'forum-home'})
          }
        })
      }
    }
  }
</script>
