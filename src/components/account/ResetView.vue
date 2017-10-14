<template>
  <form style="margin-top:50px;" class="biohub-form" @submit.prevent="Reset">
    <div class="form-group">
      <div class="input-group">
        <div class="input-group-addon"><i class="fa fa-key fa-fw"></i></div>
        <input type="password" class="form-control" ref="passwordInput" id="passwordInput"
               placeholder="NewPassword" v-model="password">
      </div>
      <div class="alert alert-danger" v-if="error">
        {{ error }}
      </div>
      <button type="submit" class="btn btn-biohub btn-biohub-blue full-width" style="margin-top:10px">Submit
      </button>
    </div>
  </form>
</template>
<script>
  import authController from '@/utils/authController'

  export default {
    props: ['sign'],
    data () {
      return {
        password: '',
        error: ''
      }
    },
    methods: {
      Reset () {
        axios.post('/api/users/reset_password/', {
          sign: this.sign,
          new_password: this.password
        }).then((response) => {
          authController.logout()
          this.$router.replace({ name: 'login' })
        }).catch((e) => {
          let errors = []
          _.forEach(e.response.data, value => {
            errors = errors.concat(value)
          })
          this.error = errors.join('\n')
        })
      }
    }
  }
</script>
