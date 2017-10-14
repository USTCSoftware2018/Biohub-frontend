<template>
  <div style="margin-top:50px;">
    <form class="biohub-form" @submit.prevent="requestReset" v-if="!success">
      <div class="form-group">
        <div class="input-group">
          <div class="input-group-addon"><i class="fa fa-address-card fa-fw"></i></div>
          <input
            type="text" class="form-control" ref="email"
            placeholder="E-mail Address or Username"
            v-model="email">
        </div>
      </div>
      <div class="alert alert-danger" v-if="error">
        {{ error }}
      </div>
      <button class="btn btn-success btn-reset full-width" type="submit">
        Send Verification Code
      </button>
    </form>
    <div class="alert alert-success" v-else>
      Successfully sent an email! <br>
      Please check your mailbox and click the link inside.
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        email: '',
        success: false,
        error: ''
      }
    },
    methods: {
      requestReset () {
        axios.get('/api/users/reset_password/', {
          params: {
            callback: `${location.protocol}//${location.host}/reset`,
            lookup: this.email
          }
        }).then((response) => {
          this.success = true
          console.log(response)
        }).catch((e) => {
          if (e.response.status === 400) {
            let errors = []
            _.forEach(e.response.data, value => {
              errors = errors.concat(value)
            })
            this.error = errors.join('\n')
          } else if (e.response.status === 429) {
            this.error = 'Two requests must not be sent within one minute.'
          }
        })
      }
    }
  }
</script>
