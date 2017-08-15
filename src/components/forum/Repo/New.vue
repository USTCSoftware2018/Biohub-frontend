<template>
  <div>
    <form class="biohub-form forum-new-form">
      <div class="form-group">
        <label style="margin-right: 20px;vertical-align: middle;">Part Name:</label>
        <input class="form-control" placeholder="name" v-model="newPartName" style="display: inline-block;vertical-align: middle;">
        <span class="fa fa-spinner fa-spin fa-fw" style="vertical-align: middle" v-show="stateLoad"></span>
        <span class="fa fa-check-circle" style="vertical-align: middle" v-show="stateFound"></span>
        <span class="fa fa-exclamation-circle" style="vertical-align: middle" v-show="stateNotFound"></span>
      </div>
    </form>
    <div class="OfficialResult">sdfsdf</div>
  </div>
</template>

<script>
  import axios from 'axios'
  let timer = null
  export default {
    watch: {
      'newPartName' (f) {
        this.search(f)
      }
    },
    data () {
      return {
        newPartName: '',
        stateLoad: false,
        stateFound: false,
        stateNotFound: false,
        findResult: null
      }
    },
    methods: {
      search (name) {
        if (timer) { clearTimeout(timer) }
        timer = setTimeout(() => {
          this.stateLoad = true
          axios.get('/api/forum/bricks/' + name + '/').then((response) => {
            this.stateLoad = false
            if (response.status === 200) {
              this.findResult = response.data
            }
            console.log(response)
          }).catch((error) => {
            this.stateLoad = false
            this.stateNotFound = true
            console.log(error, this.stateLoad)
          })
        }, 1000)
      }
    }
  }
</script>