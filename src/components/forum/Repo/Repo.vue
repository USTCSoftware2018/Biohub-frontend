<template>
  <div>
    <div class="row repo-wrapper">
      <div class="container">
        <div class="repo-type">{{Brick.part_type}}</div>
        <div class="repo-info-name">
          {{ Brick.part_name }} <star :initial="Brick.rate_score"></star>
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
          <a id="#rate" @click="changeRate" v-show="!rated">
            Rate
          </a>
          <star isEnable="true" v-if="showRate" :brickName="Brick.part_name"></star>
          <a @click="watch(Brick.part_name)" id="watch"><span v-if="!watched">Watch</span><span v-else>Unwatch</span></a><span class="number">{{watchNum}}</span>
          <a @click="star(Brick.part_name)" id="star"><span v-if="!starred">Star</span><span v-else>Unstar</span></a><span class="number">{{starsNum}}</span>
          <a @click="newExp">Write Your Experience</a>
          <div class="collapse" id="ruler">
            <div class="info-collapse">
              <feature :feaData="Brick.ruler.seq_features"></feature>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="container">
        <div class="col-md-9">
          <template v-if=insideExperience>
            <div class="documentClick" @click="$router.push({name:'Brick',params:{repo:$route.params.repo}})">
              View All Experience
            </div>
            <!--li class="list-group-item" :id="'experience'+item.id">
              <div class="experience-header">
                <img :src="item.author.avatar_url" style="width: 30px;"></span>
                <router-link :to="{name: 'Profile',params:{author: item.author_name}}" class="experience-author-name">{{item.author_name}}</router-link>
              </div>
              <div class="list-group-item-text" v-html="item.content.text"></div>
              <div class="action-bar">
                <button class="btn btn-forum" @click="upvote(item.id)" :id='"upvoteButton" + item.id' v-bind:class=
                  "{'hasVoted':$store.state.BrickStatus.experienceSet[index].voted, 'cannotVote': (item.author_name === $store.getters.userName)}">
                  <span v-if="!$store.state.BrickStatus.experienceSet[index].voted"><i class="fa fa-angle-up"></i></span>
                  <span v-else><i class="fa fa-angle-down"></i></span> {{item.up_vote_num}}</button>
                <a :id='"commentsButton" + item.id' @click="showComments(item.id, index)" style="margin-left: 15px;"><i class="fa fa-comment-o"></i>    {{$store.state.BrickStatus.experienceSet[index].posts_num}} Comment(s)</a>
                <post-list class='hide' :id='"comments"+item.id' :expId="item.id"></post-list>
              </div>
            </li-->
          </template>
          <template v-else>
            <div class="documentClick" v-if='!insideExperience' role='button' data-toggle="collapse" href="#collapseDocument" aria-expanded="false" aria-controls="collapseDocument">
              View Document
            </div>
            <div class="collapse" id="collapseDocument">
              <div class="well" v-html="brickDocument" style="text-align: left; text-indent: 2em;">
              </div>
            </div>
            <experience-list :brickID='brickID'></experience-list>
          </template>
          <!--router-view :content="rResult.document"></router-view-->
          <editor ref='Editor'></editor>
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
        brickID: this.$route.params.repo,
        watched: false,
        watchNum: 0,
        starred: false,
        starsNum: 0,
        rated: false,
        insideExperience: false,
        showRate: false,
        Brick: null
      }
    },
    computed: {
      userID () {
        return this.$root.user.id
      },
      brickDocument (id) {
        return marked(this.Brick.document.text)
      }
    },
    components: {
      PageFooter,
      Star,
      Feature,
      Editor,
      ExperienceList () {
        return import('./ExperienceList.vue')
      }
    },
    created () {
      if (this.$route.params.id) {
        this.insideExperience = true
      } else {
        this.insideExperience = false
      }
      axios.get(`/api/forum/bricks/${this.brickID}/`).then((response) => {
        this.Brick = response.data
      }).catch((e) => {
      })
    },
    mounted () {
      axios.get('/api/forum/bricks/' + this.brickID + '/users_watching/').then((response) => {
        this.watchNum = response.data.results.length
        _.forEach(response.data.results, (user) => {
          if (user.id === this.userID) {
            this.watched = true
          }
        })
      }).catch((e) => {
        console.log(e)
      })
      axios.get('/api/forum/bricks/' + this.brickID + '/users_starred/').then((response) => {
        this.starsNum = response.data.results.length
        _.forEach(response.data.results, (user) => {
          if (user.id === this.userID) {
            this.starred = true
          }
        })
      }).catch((e) => {
        console.log(e)
      })
      axios.get('/api/forum/bricks/' + this.brickID + '/users_rated/').then((response) => {
        this.starsNum = response.data.results.length
        _.forEach(response.data.results, (user) => {
          if (user.id === this.userID) {
            this.rated = true
          }
        })
      }).catch((e) => {
        console.log(e)
      })
    },
    methods: {
      changeRate () {
        this.showRate = !this.showRate
      },
      watch (name) {
        if (this.watched) {
          axios.post(`/api/forum/bricks/${name}/unwatch/`).then((response) => {
            this.watched = false
            this.watchNum -= 1
          })
        } else {
          axios.post(`/api/forum/bricks/${name}/watch/`).then((response) => {
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
            this.starred = false
            this.starsNum -= 1
          })
        } else {
          axios.post(`/api/forum/bricks/${name}/star/`).then((response) => {
            this.starred = true
            this.starsNum += 1
          })
        }
      },
      newExp () {
        this.$refs.Editor.Focus()
      }
    }
  }
</script>
