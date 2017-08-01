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
                | Followers: <a href="#">Number</a> | <a href="#experience" class="view-experience" @click="changeView">View {{ anotherView }}</a>
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
    <PageFooter></PageFooter>
  </div>
</template>

<script>
  import Description from './RepoInfo.vue'
  import Experience from './RepoReview.vue'
  import PageFooter from '../Common/PageFooter.vue'
  export default {
    data () {
      return {
        currentView: 'Description',
        anotherView: 'Experience'
      }
    },
    components: {
      Description, Experience, PageFooter
    },
    created () {
      console.log(this.$route.params)
      if (window.location.hash === '#experience') {
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
