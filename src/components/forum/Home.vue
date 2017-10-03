<template>
  <div>
    <div class="forum-start">
      <div class="forum-description">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur
          . Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <button class="btn btn-biohub btn-biohub-forum-welcome-default">Learn More</button>
        <button class="btn btn-biohub btn-biohub-forum-welcome-notice" data-toggle="modal" data-target="#findPart">Find a Part</button>
        <!-- Modal -->
        <div class="modal fade" id="findPart" tabindex="-1" role="dialog" aria-labelledby="findPartLabel">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="findPartLabel">Find a Part</h4>
              </div>
              <div class="modal-body biohub-form">
                <div class="input-group">
                  <div class="input-group-addon" style="background: #eee;">Part Name:</div>
                  <input class="form-control" placeholder="Please input part name" v-model="newPartName"
                         v-on:keydown.enter.prevent="search(newPartName)"
                         style="display: inline-block;vertical-align: middle;width: 95%;">
                  <span class="fa fa-spinner fa-spin input-indicator" style="margin-top: 6px;font-size: 20px;vertical-align: middle;" v-show="stateLoad"></span>
                  <span class="fa fa-check-circle input-indicator" style="margin-top: 6px;font-size: 20px;vertical-align: middle;" v-show="stateFound"></span>
                  <span class="fa fa-exclamation-circle input-indicator" style="margin-top: 6px;font-size: 20px;vertical-align: middle;" v-show="stateNotFound"></span>
                </div>
                <div class="collapse" id="collapseSuccess">
                  <div class="OfficialResult">
                    ...
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-forum">Start a Discussion</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <div class="row">
      <div class="container">
        <div class="col-md-8 less-padding">
          <div class="timeline">
            <div class="timelineHead">Timeline</div>
            <div class="timelineItem"  v-for="item in timeline">
              <div v-html="item"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
      <page-footer></page-footer>
  </div>
</template>

<script>
  import topNavbar from '../Common/topNavbar.vue'
  import PageFooter from '../Common/PageFooter.vue'

  export default {
    data () {
      return {
        notice: null,
        newPartName: '',
        stateLoad: false,
        stateFound: false,
        stateNotFound: false,
        findResult: null,
        timeline: []
      }
    },
    components: {
      topNavbar, PageFooter
    },
    created () {
      axios.get('/api/users/me/').then((response) => {
      }).catch((_) => {
        this.$store.commit('logout')
      })
      axios.get('/api/forum/activities/timeline/').then((response) => {
        _.forEach(response.data.results, (t) => {
          switch (t.type) {
            case 'Watch':
              this.timeline.push(`<a href='/user/${t.params.user}/'>${t.params.user}</a> began to watch <a href='/forum/${t.params.partName}/'>${t.params.partName}</a><span class='timeago pull-right'>${t.acttime}</span>`)
              break
            case 'Experience':
              this.timeline.push(`<a href='/user/${t.params.user}/'>${t.params.user}</a> post a new experience at <a href='/forum/${t.params.partName}/'>${t.params.partName}</a><span class='timeago pull-right' datetime='${t.acttime}'></span>`)
              break
          }
        })
        console.log(this.timeline)
        this.$nextTick(() => {
          timeago().render($('.timeago'))
        })
      }).catch((e) => {
        console.log(e)
      })
    },
    mounted () {
    },
    methods: {
      search (name) {
        this.stateLoad = true
        this.stateFound = false
        this.stateNotFound = false
        axios.get('/api/forum/bricks/' + name + '/').then((response) => {
          this.stateLoad = false
          if (response.status === 200) {
            this.findResult = response.data
            this.stateFound = true
            $('#collapseSuccess').collapse('show')
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
<style scoped>
  @import "Common/Common.scss";
</style>
