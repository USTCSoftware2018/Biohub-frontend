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
                Author: {{ $route.params.author }}
                | Followers: <a href="#">Number</a> | <router-link :to="{name:'RepoExperienceList'}"
                v-if='currentView === "Description"' class="view-experience">View Experience</router-link>
                <router-link :to="{name: 'Repo'}" v-if='currentView === "Experience"' class="view-experience">View Description</router-link>
              </div>
            </div>
            <component v-bind:is="currentView"></component>
          </div>
        </div>
        <div class="col-md-3">
          <div class="panel panel-default panel-biohub">
            <div class="panel-heading">About the author</div>
            <div class="panel-body">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
          </div>
          <ul class="list-group left-list" style="margin-top:2rem">
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
  export default {
    data () {
      return {
        currentView: 'Description',
        anotherView: 'Experience'
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
      var patt = new RegExp('experience')
      if (patt.test(this.$route.fullPath)) {
        console.log('yes')
        this.changeView()
      }
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
