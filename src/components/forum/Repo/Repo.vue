<template>
  <div>
    <div class="row repo-wrapper">
      <div class="container">
        <div class="repo-type">Coding</div>
        <div class="repo-info-name">
          {{ Brick.part_name }} <star isEnable="true"></star>
        </div>
        <div class="repo-info-addon">{{ Brick.author }}@{{Brick.group_name}}</div>
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
          <a role="button" data-toggle="collapse" href="#                                                            rate" aria-expanded="false" aria-controls="rate">
            Rate
          </a>
          <a @click="watch(Brick.part_name)" id="watch">Watch</a><span>{{watchNum}}</span>
          <a @click="star(Brick.part_name)" id="star">Star</a><span>{{starsNum}}</span>
          <a @click="newExp">Write Your Experience</a>
          <div class="collapse" id="ruler">
            <div class="info-collapse">
              <feature :feaData="Brick.ruler.seq_features"></feature>
            </div>
          </div>
          <div class="collapse" id="rate">
            <div class="info-collapse" style="width: 170px;">
              <star :isEnable="true"></star>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="container">
        <div class="col-md-9">
          <div class="documentClick" v-if='insideExperience' @click="$router.push({name:'Brick',params:{repo:$route.params.repo}})">
            View All Experience
          </div>
          <div class="documentClick" v-if='!insideExperience' role='button' data-toggle="collapse" href="#collapseDocument" aria-expanded="false" aria-controls="collapseDocument">
            View Document
          </div>
          <div class="collapse" id="collapseDocument">
            <div class="well" v-html="bDocument" style="text-align: left; text-indent: 2em;">
            </div>
          </div>
          <experience-list></experience-list>
          <!--router-view :content="rResult.document"></router-view-->
          <editor></editor>
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
  import Editor from './Editor'
  import '../../../assets/css/editormd.css'
  import '../../../utils/editormd.js'
  var editor = null
  export default {
    watch: {
      '$route' (to, from) {
        if (to.params.id) {
          this.insideExperience = true
        } else {
          this.insideExperience = false
        }
      }
    },
    data () {
      return {
        rResult: null,
        watched: false,
        watchNum: 0,
        starred: false,
        starsNum: 0,
        insideExperience: false
      }
    },
    computed: {
      userID () {
        return this.$store.getters.userId
      },
      bDocument (id) {
        return marked(this.Brick.document.text)
      },
      Brick () {
        return this.$store.state.BrickStatus.brick
      }
    },
    components: {
      Description, Experience, PageFooter, Star, Feature, ExperienceList, Editor
    },
    created () {
      if (this.$route.params.id) {
        this.insideExperience = true
      } else {
        this.insideExperience = false
      }
      this.$store.dispatch('loadBrick', this.$route.params.repo)
    },
    mounted () {
      const _this = this
      axios.get('/api/forum/bricks/' + this.$route.params.repo + '/users_watching/').then((response) => {
        this.watchNum = response.data.results.length
        _.forEach(response.data.results, (user) => {
          if (user.id === this.userID) {
            _this.watched = true
            document.querySelector('#watch').innerText = 'Watching'
          }
        })
      }).catch((e) => {
        console.log(e)
      })
      axios.get('/api/forum/bricks/' + this.$route.params.repo + '/users_starred/').then((response) => {
        this.starsNum = response.data.results.length
        _.forEach(response.data.results, (user) => {
          if (user.id === this.userID) {
            _this.starred = true
            document.querySelector('#star').innerText = 'Unstar'
          }
        })
      }).catch((e) => {
        console.log(e)
      })
    },
    methods: {
      brief (text) {
      },
      watch (name) {
        if (this.watched) {
          axios.post(`/api/forum/bricks/${name}/unwatch/`).then((response) => {
            document.querySelector('#watch').innerHTML = 'Watch'
            this.watched = false
            this.watchNum -= 1
          })
        } else {
          axios.post(`/api/forum/bricks/${name}/watch/`).then((response) => {
            document.querySelector('#watch').innerHTML = 'Watching'
            this.watched = true
            this.watchNum += 1
          }).catch((error) => {
            console.log(error)
          })
        }
      },
      star (name) {
        if (this.starred) {
          axios.post(`/api/forum/bricks/${name}/unstar/`).then((response) => {
            document.querySelector('#star').innerHTML = 'Star'
            this.starred = false
            this.starsNum -= 1
          })
        } else {
          axios.post(`/api/forum/bricks/${name}/star/`).then((response) => {
            document.querySelector('#star').innerHTML = 'Unstar'
            this.starred = true
            this.starsNum += 1
          })
        }
      },
      newExp () {

      }
    }
  }
</script>
