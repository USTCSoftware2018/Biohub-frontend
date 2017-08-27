<template>
  <div class="container">
    <div class="col-md-12">
      <form class="biohub-form forum-new-form">
        <div class="form-group">
          <div
            style="vertical-align: middle;margin-bottom: 0.05rem;font-size: 0.2rem;">
            Part Name
          </div>
          <div class="input-group">
            <div class="input-group-addon">BBa_</div>
            <input class="form-control" placeholder="name" v-model="newPartName"
                   v-on:keydown.enter.prevent="search(newPartName)"
                   style="display: inline-block;vertical-align: middle;width: 95%;">
            <span class="fa fa-spinner fa-spin fa-fw input-indicator" style="vertical-align: middle;" v-show="stateLoad"></span>
            <span class="fa fa-check-circle input-indicator" style="vertical-align: middle;" v-show="stateFound">Result Found.</span>
            <span class="fa fa-exclamation-circle input-indicator" style="vertical-align: middle;" v-show="stateNotFound"></span>
          </div>
        </div>
      </form>
      <p></p>
      <div class="OfficialResult" v-if="stateFound">
        <div class="OfficialResultHead">{{findResult.name}}</div>
        <div class="divider"></div>
        <div class="OfficialResultInfo">{{findResult.name}}<br>{{findResult.designer}}<br>
          {{findResult.part_type}}<br>{{findResult.sequence_a}}<br>
        </div>
        <div class="divider"></div>
        <div class="OfficialFooter">Is that you need?
          <button class="btn btn-forum">Yes</button>
          <button class="btn btn-forum">No</button>
        </div>
      </div>
      <div class="UploadFile" v-if="stateNotFound">
        <div class="UploadFileNotice">You can upload . file by yourself to start a discussion.</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .input-indicator {
    font-size: 2em;
    margin-top: 0.1em;
  }
</style>

<script>
  let timer = null
  export default {
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
          console.log(error.response, this.stateLoad)
        })
      }
    }
  }
</script>
