<template>
  <form style="margin-top:50px;" class="biohub-form">
    <div class="form-group">
      <div class="input-group">
        <div class="input-group-addon"><i class="fa fa-key fa-fw"></i></div>
        <input type="password" class="form-control" ref="passwordInput" id="passwordInput"
               placeholder="NewPassword" v-model="password">
      </div>
      <button type="submit" class="btn btn-biohub btn-biohub-blue full-width" style="margin-top:10px"
              v-on:click.self.prevent="Reset">Submit
      </button>
    </div>
  </form>
</template>
<script>
  import axios from 'axios'

  export default {
    props: ['sign'],
    data () {
      return {
        password: ''
      }
    },
    methods: {
      Reset () {
        axios.post('/api/users/reset_password/', {
          sign: this.sign,
          new_password: this.password
        }).then((response) => {
          console.log(response)
        }).catch((e) => {
          console.log(e.response)
        })
      }
    }
  }
</script>
