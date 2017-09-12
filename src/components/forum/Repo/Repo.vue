<template>
  <div>
    <div class="row repo-wrapper">
      <div class="container">
        <div class="repo-type">Coding</div>
        <div class="repo-info-name">
          BBa_{{ rResult.name }}
        </div>
        <div class="repo-info-addon">{{ rResult.designer }}@{{rResult.group_name}}
      </div>
        <!--div class="repo-info-addon">
          Followers: <a href="#">{{watch_num}}</a>
          <button class="btn btn-forum btn-watch" id='watchButton' @click="watch(rResult.id)">Watch</button>
        </div>
        <div class="repo-info-addon">
          <feature :feaData="rResult.seq_features"></feature>
        </div-->
        <div class="repo-info-addon">
          <a role="button" data-toggle="collapse" href="#ruler" aria-expanded="false" aria-controls="ruler">
            Ruler
          </a>
          <a role="button" data-toggle="collapse" href="#rate" aria-expanded="false" aria-controls="rate">
            Rate
          </a>
          <a @click="watch(rResult.id)" id="watch">Watch</a><span>{{watchNum}}</span>
          <a @click="star(rResult.id)" id="star">Star</a><span>{{starsNum}}</span>
          <div class="collapse" id="ruler">
            <div class="info-collapse">
              <feature :feaData="rResult.seq_features"></feature>
            </div>
          </div>
          <div class="collapse" id="rate">
            <div class="info-collapse" style="width: 150px;">
              <star :isEnable="true"></star>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="container">
        <div class="col-md-9">
          <experience-list></experience-list>
          <!--router-view :content="rResult.document"></router-view-->
        </div>
        <!--div class="col-md-3">
          <div class="panel panel-default panel-biohub">
            <div class="panel-heading">Rate</div>
            <div class="panel-body">
              <star :isEnable="true"></star>
              <div class="divider"></div>
              <star :isEnable="false"></star>
            </div>
          </div>
          <ul class="list-group left-list" style="margin-top:0.2rem">
            <li class="list-group-header">Devices which use this part</li>
            <li class="list-group-item"><a href="#">Lorem ipsum dolor sit amet</a></li>
            <li class="list-group-item"><a href="#">consectetur adipisicing elit</a></li>
            <li class="list-group-item"><a href="#">sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</a></li>
          </ul>
        </div-->
      </div>
    </div>
    <page-footer></page-footer>
  </div>
</template>

<script>
  import Description from './RepoInfo.vue'
  import Experience from './RepoReview.vue'
  import ExperienceList from './ExperienceList.vue'
  import PageFooter from '../../Common/PageFooter.vue'
  import Star from '../../../utils/Star.vue'
  import Feature from './SeqFeature.vue'
  import marked from 'marked'
  export default {
    data () {
      return {
        currentView: 'Description',
        anotherView: 'Experience',
        rResult: null,
        watched: false,
        watchNum: 0,
        starred: false,
        starsNum: 0
      }
    },
    computed: {
      userID () {
        return this.$store.getters.userId
      }
    },
    watch: {
      '$route' (to, from) {
        if (to.name === 'RepoExperienceList' || to.name === 'Repo') {
          this.changeView()
        }
      }
    },
    components: {
      Description, Experience, PageFooter, Star, Feature, ExperienceList
    },
    created () {
      const _this = this
      axios.get('/api/forum/bricks/' + this.$route.params.repo + '/').then((response) => {
        this.rResult = response.data
        console.log(response.data)
      })
      axios.get('/api/forum/bricks/' + this.$route.params.repo + '/watched_users/').then((response) => {
        this.watchNum = response.data.results.length
        _.forEach(response.data.results, (user) => {
          if (user.id === this.userID) {
            _this.watched = true
            document.querySelector('#watch').innerHTML = 'Watching'
          }
        })
      })
      axios.get('/api/forum/bricks/' + this.$route.params.repo + '/starred_users/').then((response) => {
        this.starsNum = response.data.results.length
        _.forEach(response.data.results, (user) => {
          if (user.id === this.userID) {
            _this.starred = true
            document.querySelector('#star').innerHTML = 'Unstar'
          }
        })
      })
    },
    methods: {
      brief (text) {
      },
      watch (id) {
        if (this.watched) {
          axios.post(`/api/forum/bricks/${id}/cancel_watch/`).then((response) => {
            document.querySelector('#watch').innerHTML = 'Watch'
            this.watched = false
            this.watchNum -= 1
          })
        } else {
          axios.post(`/api/forum/bricks/${id}/watch/`).then((response) => {
            document.querySelector('#watch').innerHTML = 'Watching'
            this.watched = true
            this.watchNum += 1
          }).catch((error) => {
            console.log(error)
          })
        }
      },
      star (id) {
        if (this.starred) {
          axios.post(`/api/forum/bricks/${id}/unstar/`).then((response) => {
            document.querySelector('#star').innerHTML = 'Star'
            this.starred = false
            this.starsNum -= 1
          })
        } else {
          axios.post(`/api/forum/bricks/${id}/star/`).then((response) => {
            document.querySelector('#star').innerHTML = 'Unstar'
            this.starred = true
            this.starsNum += 1
          })
        }
      }
    }
  }
</script>
