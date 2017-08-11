<template>
  <div>
    <img src="../assets/img/bioLogo.png" width="530px" style="padding-top: 15%;">
    <div class="container home">
      <div class="row">
        <div class="col-md-3"></div>
        <div class="col-md-6" style="padding-left:20px;padding-right:20px;">
          <form style="margin-top:50px;" class="biohub-form">
            <button type="submit" name="join-button" class="btn btn-biohub btn-biohub-blue full-width"
                    v-on:click.self.prevent="JumpToSignup">
              Join Biohub Now!
            </button>
            <button type="submit" name="login-button" class="btn btn-biohub btn-biohub-light full-width"
                    v-on:click.self.prevent="JumpToLogin">
              Log in
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
  export default {
    name: 'home',
    beforeCreate () {
      axios.get('/api/users/me/').then((_) => {
        window.location.href = '/forum'
      })
    },
    methods: {
      JumpToLogin () {
        window.location.href = 'login'
      },

      JumpToSignup () {
        window.location.href = 'signup'
      }
    }
  }
</script>
