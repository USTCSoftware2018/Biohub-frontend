<template>
  <div>
    <form class="biohub-form forum-new-form">
      <div class="form-group">
        <div style="vertical-align: middle;text-align: justify; padding-left: 2.31rem;margin-bottom: 0.05rem;font-size: 0.2rem;">Part Name</div>
        <input class="form-control" placeholder="name" v-model="newPartName" style="display: inline-block;vertical-align: middle;">
        <span class="fa fa-spinner fa-spin fa-fw" style="vertical-align: middle" v-show="stateLoad"></span>
        <span class="fa fa-check-circle" style="vertical-align: middle" v-show="stateFound"></span>
        <span class="fa fa-exclamation-circle" style="vertical-align: middle" v-show="stateNotFound"></span>
      </div>
    </form>
    <div class="OfficialResult" v-if="stateFound">
      <div class="OfficialResultHead">{{findResult.name}}</div>
      <div class="divider"></div>
      <div class="OfficialResultInfo">{{findResult.name}}<br>{{findResult.designer}}<br>
        {{findResult.part_type}}<br>{{findResult.sequence_a}}<br>
      </div>
      <div class="divider"></div>
      <div class="OfficialFooter">Is that you need?<button class="btn btn-forum">Yes</button></div>
    </div>
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
          this.stateFind = false
          this.stateNotFound = false
          axios.get('/api/forum/bricks/' + name + '/').then((response) => {
            this.stateLoad = false
            if (response.status === 200) {
              this.findResult = response.data
              this.stateFound = true
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