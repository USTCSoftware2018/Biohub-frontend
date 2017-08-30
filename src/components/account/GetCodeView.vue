<template>
  <form style="margin-top:50px;" class="biohub-form">
    <div class="form-group">
      <div class="input-group">
        <div class="input-group-addon"><i class="fa fa-address-card fa-fw"></i></div>
        <input type="text" class="form-control" ref="email" placeholder="E-mail Address or Username"
               v-model="email">
      </div>
    </div>
    <button class="btn btn-success btn-reset" v-on:click.prevent="requestReset">Send Verification Code</button>
  </form>
</template>
<script>
  export default {
    data () {
      return {
        email: ''
      }
    },
    methods: {
      requestReset () {
        axios.get('/api/users/reset_password/' +
          '?' + 'callback=' + encodeURIComponent('http://localhost:8080/reset') +
          '&' + 'lookup=' + this.email
        ).then((response) => {
          console.log(response)
        }).catch((e) => {
          console.log(e.response)
        })
      }
    }
  }
</script>
