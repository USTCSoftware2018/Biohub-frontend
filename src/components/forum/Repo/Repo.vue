<template>
  <div>
    <div class="row repo-wrapper">
      <div class="container">
        <div class="repo-type">Coding</div>
        <div class="repo-info-name">
          BBa_{{ rResult.name }}
        </div>
        <div class="repo-info-addon">{{ rResult.designer }}@{{rResult.group_name}}
          <router-link :to="{name:'ExperienceList'}"
                       v-if='$route.name === "RepoInfo"'
                       class="view-experience">
                View Experience
          </router-link>
          <router-link :to="{name: 'RepoInfo'}"
                       v-if='($route.name === "ExperienceList")
                           || ($route.name === "ExperienceNew")
                            || ($route.name === "RepoExperience")'
                       class="view-experience">
            View Description
          </router-link>
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
          <a role="button" data-toggle="collapse" href="#document" aria-expanded="false" aria-controls="document">
            Document
          </a>
          <div class="collapse" id="ruler">
            <div class="info-collapse">
              <feature :feaData="rResult.seq_features"></feature>
            </div>
          </div>
          <div class="collapse" id="document">
            <div class="info-collapse">
              <div class="repo-info-content">{{rResult.document}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="container">
        <div class="col-md-9">
          <router-view :content="rResult.document"></router-view>
        </div>
        <div class="col-md-3">
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
        </div>
      </div>
    </div>
    <page-footer></page-footer>
  </div>
</template>

<script>
  import Description from './RepoInfo.vue'
  import Experience from './RepoReview.vue'
  import PageFooter from '../../Common/PageFooter.vue'
  import Star from '../../../utils/Star.vue'
  import Feature from './SeqFeature.vue'
  export default {
    data () {
      return {
        currentView: 'Description',
        anotherView: 'Experience',
        rResult: null,
        watched: false,
        watch_num: 0
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
      Description, Experience, PageFooter, Star, Feature
    },
    created () {
      axios.get('/api/forum/bricks/' + this.$route.params.repo + '/').then((response) => {
        this.rResult = response.data
        console.log(response.data)
      })
      axios.get('/api/forum/bricks/' + this.$route.params.repo + '/watched_users/').then((response) => {
        this.watch_num = response.data.results.length
        axios.get('/api/users/me').then((me) => {
          _.forEach(response.data.results, (user) => {
            if (user.id === me.data.id) {
              this.watched = true
              document.querySelector('#watchButton').innerHTML = '<i class="fa fa-check"> Watched'
              document.querySelector('#watchButton').classList.add('disabled-button')
            }
          })
        })
      }).catch((error) => {
        console.log(error, '2')
      })
    },
    methods: {
      changeView () {
        let tmp = this.anotherView
        this.anotherView = this.currentView
        this.currentView = tmp
      },
      brief (text) {
      },
      watch (id) {
        if (this.watched) {
          axios.post(`/api/forum/bricks/${id}/cancel_watch/`).then((response) => {
            document.querySelector('#watchButton').innerHTML = '<i class="fa fa-eye"></i> Watch'
            document.querySelector('#watchButton').classList.remove('disabled-button')
            this.watched = false
            this.watch_num -= 1
          })
        } else {
          axios.post(`/api/forum/bricks/${id}/watch/`).then((response) => {
            document.querySelector('#watchButton').innerHTML = '<i class="fa fa-check"></i> Watched'
            document.querySelector('#watchButton').classList.add('disabled-button')
            this.watched = true
            this.watch_num += 1
          }).catch((error) => {
            console.log(error)
          })
        }
      }
    }
  }
</script>
