<template>
  <div>
    <img src="../assets/img/brand.png" width="530px" style="padding-top: 10em;">

    <div class="container home">
      <div class="row">
        <div class="col-xs-3"></div>
        <div class="col-xs-6" style="padding-left:20px;padding-right:20px;">
          <form style="margin-top:50px;" class="biohub-form">
            <button type="submit" name="join-button" class="btn btn-biohub full-width"
                    v-on:click.self.prevent="JumpToSignup">
              Join Biohub Now!
            </button>
            <button type="submit" name="login-button" class="btn btn-biohub btn-biohub-hello full-width"
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
  export default {
    name: 'home',
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
