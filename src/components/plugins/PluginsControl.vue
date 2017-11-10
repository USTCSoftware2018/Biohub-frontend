<template>
  <div>
    <div v-if="userPlugin !== undefined">
      <form @submit.prevent="init" class="form-horizontal" v-if="!userPlugin">
        <div class="form-group">
          <label class="col-md-3 control-label">Github Repo</label>
          <div class="col-md-9" style="padding: 0">
            <input type="text" class="form-control" placeholder="owner" style="width:40%; display: inline;" v-model="input.username">
            <span style="font-weight: 10; font-size: 2.4em; line-height: 1; vertical-align: bottom;">/</span>
            <input type="text" class="form-control" placeholder="Repository" style="width:40%; display: inline;" v-model="input.repo">
          </div>
        </div>
        <div class="alert alert-danger" v-if="error">
          {{ error }}
        </div>
        <div class="form-group">
          <div class="col-md-offset-3">
            <button type="submit" class="btn btn-forum">Request to Integrate</button>
          </div>
        </div>
      </form>
      <form @submit.prevent="" class="form-horizontal" v-else>
        <div class="form-group">
          <label class="col-md-3 control-label">Github Repo</label>
          <div class="col-md-9" style="padding-top: 7px;">
            <span>{{ userPlugin.username }}</span>
            <span> / </span>
            <span>{{ userPlugin.repo }}</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-md-3 control-label">Current Commit</label>
          <div class="col-md-9" style="padding-top: 7px;">
            <span>{{ userPlugin.commit }}</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-md-3 control-label">Runtime Status</label>
          <div class="col-md-9" style="padding-top: 7px;">
            <span>{{ userPlugin.status }}</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-md-3 control-label">Last Request</label>
          <div class="col-md-9" style="padding-top: 7px;">
            <span>{{ userPlugin.request_status }}</span><br>
            <p>{{ userPlugin.message }}</p>
          </div>
        </div>
        <div class="alert alert-danger" v-if="error">
          {{ error }}
        </div>
        <div class="form-group">
          <div class="col-md-offset-3">
            <button class="btn btn-forum" @click="upgrade">Request to Upgrade</button>
            <button class="btn btn-danger" @click="remove">Delete</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
  .form-group > label + div {
    padding-left: 0;
  }
</style>

<script>
  import websocket from '@/utils/websocket'

  export default {
    data () {
      return {
        userPlugin: undefined,
        input: {
          username: '',
          repo: ''
        },
        error: ''
      }
    },
    mounted () {
      axios.get('/api/plugins/info/')
        .then(response => {
          this.userPlugin = response.data
        })
    },
    created () {
      websocket.on('message-user-plugin', data => {
        this.userPlugin = data
        this.error = ''
      })
    },
    methods: {
      upgrade () {
        axios.post('/api/plugins/upgrade/')
          .then(response => {
            alert('Successfully sent an upgrade request to administrator.')
          }).catch(e => {
            const r = e.response

            if (r.status === 400) {
              this.error = r.data.detail
            }
          })
      },
      init () {
        axios.post('/api/plugins/init/', {
          repo: this.input.repo,
          username: this.input.username
        }).catch(e => {
          const r = e.response

          if (r.status === 400) {
            this.error = r.data.detail
          }
        })
      },
      remove () {
        if (confirm('Are you sure to delete?\nThis action is NOT REVOKABLE.')) {
          axios.post('/api/plugins/remove/')
            .then(response => {
              alert('Successfully deleted the plugin.')
            })
        }
      }
    }
  }
</script>
