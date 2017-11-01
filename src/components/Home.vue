<template>
  <div class='home-container' style="text-align: center;">
    <img src="../assets/img/bioLogo.png" width="530px" style="padding-top: 15%">
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
<style>
.home-container {
  background: url('../assets/img/ALL.svg') no-repeat;
  background-attachment: fixed;
  background-size: cover;
  height: 100%;
}
</style>
<script>
  export default {
    name: 'home',
    beforeRouteEnter (to, from, next) {
      next(vm => {
        if (vm.$root.user) vm.$router.push({ name: 'forum-home' })
      })
    },
    methods: {
      JumpToLogin () {
        this.$router.push({ name: 'login' })
      },

      JumpToSignup () {
        this.$router.push({ name: 'signup' })
      }
    }
  }
</script>
