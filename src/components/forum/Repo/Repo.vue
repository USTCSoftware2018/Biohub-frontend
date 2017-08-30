<template>
  <div>
    <div class="row">
      <div class="container">
        <div class="col-md-9">
          <div class="repo-wrapper">
            <div class="repo-info-header">

              <div class="repo-info-name">
                BBa_{{ rResult.name }}
                <button class="btn btn-forum" id='watchButton' @click="watch(rResult.id)">Watch</button>
              </div>
              <div class="repo-info-addon">
                Designed by: {{ rResult.designer }}
                | Group: {{rResult.group_name}}
                | Followers: <a href="#">{{rResult.watch_users.length}}</a>
                |
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
            </div>
            <router-view :content="rResult.document"></router-view>
          </div>
        </div>
        <div class="col-md-3">
          <div class="panel panel-default panel-biohub">
            <div class="panel-heading">Rate</div>
            <div class="panel-body">
              <star :isEnable="true"></star>
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
  export default {
    data () {
      return {
        currentView: 'Description',
        anotherView: 'Experience',
        rResult: null,
        watched: false
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
      Description, Experience, PageFooter, Star
    },
    created () {
      axios.get('/api/forum/bricks/' + this.$route.params.repo + '/').then((response) => {
        this.rResult = response.data
        console.log(response)
        axios.get('/api/users/me').then((me) => {
          console.log(me.data)
          _.forEach(this.rResult.watch_users, (user) => {
            console.log(user.id)
            console.log(me.data.id)
            if (user.id === me.data.id) {
              this.watched = true
              document.querySelector('#watchButton').innerText = 'Watched'
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
      watch (id) {
        if (this.watched) {
          return
        }
        axios.post(`/api/forum/bricks/${id}/watch/`).then((response) => {
          console.log(response)
          document.querySelector('#watchButton').innerText = 'Watched'
          document.querySelector('#watchButton').classList.add('disabled-button')
        }).catch((error) => {
          console.log(error)
        })
      }
    }
  }
</script>
