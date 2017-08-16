<template>
  <div>
    <div class="row">
      <div class="container">
        <div class="col-md-9">
          <div class="repo-wrapper">
            <div class="repo-info-header">

              <div class="repo-info-name">
                {{ $route.params.repo }}
              </div>
              <div class="repo-info-addon">
                Author: {{ rResult.designer }}
                | Followers: <a href="#">{{rResult.watch_users.length}}</a> | <router-link :to="{name:'ExperienceList'}"
                v-if='$route.name === "RepoInfo"' class="view-experience">View Experience</router-link>
                <router-link :to="{name: 'RepoInfo'}" v-if='($route.name === "ExperienceList") || ($route.name === "ExperienceNew")
                || ($route.name === "RepoExperience")'
                             class="view-experience">View Description</router-link>
              </div>
            </div>
            <router-view></router-view>
          </div>
        </div>
        <div class="col-md-3">
          <div class="panel panel-default panel-biohub">
            <div class="panel-heading">About the author</div>
            <div class="panel-body">
              {{rResult.text}}
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
  import axios from 'axios'
  export default {
    data () {
      return {
        currentView: 'Description',
        anotherView: 'Experience',
        rResult: null
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
      Description, Experience, PageFooter
    },
    created () {
      console.log(this.$route.params)
      axios.get('/api/forum/bricks/' + this.$route.params.repo + '/').then((response) => {
        this.rResult = response.data
        console.log(response, '1')
      }).catch((error) => {
        console.log(error, '2')
      }).get(this.rResult.api_url).then((response) => {
        console.log(response)
      })
    },
    methods: {
      changeView () {
        let tmp = this.anotherView
        this.anotherView = this.currentView
        this.currentView = tmp
      }
    }
  }
</script>
