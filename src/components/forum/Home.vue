<template>
  <div>
    <div class="forum-start">
      <div class="forum-description">
        <p>
          Biohub 2.0 is a progressive community founded based on tens of thousands of standard biological bricks. From parts to ideas, you can get and share all about your experiments as easy as a pie.
        </p>
        <router-link tag="button" class="btn btn-biohub btn-biohub-forum-welcome-default" :to="{ name: 'search' }">
          Discover Excellent Bricks
        </router-link>
        <router-link tag="button" class="btn btn-biohub btn-biohub-forum-welcome-notice" :to="{ name: 'plugins' }">
          Enjoy Practical Plugins
        </router-link>
      </div>
    </div>
    <div class="row">
      <div class="container">
        <h3 style="margin-top: 0;">
          Popular Bricks
          <button class="btn btn-link pull-right biohub-a" @click="loadPopular">
            <i class="fa fa-refresh"></i>
            Try Another Group
          </button>
        </h3>
      </div>
      <brick-gallery :bricks="popularBricks" style="margin-left: 10%;margin-right: 10%"></brick-gallery>
      <div class="container">
        <div class="col-md-8 less-padding">
          <div class="list-group-item list-group-header">Timeline</div>
          <activity-list api="/api/forum/activities/timeline/"></activity-list>
        </div>
        <div class="col-md-4 less-padding">
          <ul class="list-group list-home-bricks">
            <li class="list-group-item list-group-header">Bricks you starred</li>
            <transition-group name="fade">
              <template v-if="starredBricks.length">
                <li v-for="item in starredBricks" :key="item.part_name">
                  <router-link :to="{ name: 'Brick', params: { brick: item.part_name } }">{{ item.part_name }}</router-link>
                </li>
              </template>
              <template v-else>
                <li key="loading" v-if="loadingStars">
                  Loading <i class="fa fa-spinner fa-pulse fa-fw"></i>
                </li>
                <li v-else class="empty" key="empty">
                  <i class="fa fa-3x fa-star" style="color: #aaa;"></i>
                  <h2 style="color: black; font-weight: 500;">
                    No stars.
                  </h2>
                  <p>Go search some bricks and star them.</p>
                </li>
              </template>
            </transition-group>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ActivityList from '@/components/forum/Activity/ActivityList'
  import authController from '@/utils/authController'
  import BrickGallery from '@/components/forum/Brick/BrickGallery'

  export default {
    data () {
      return {
        starredBricks: [],
        loadingStars: false,
        popularBricks: []
      }
    },
    components: {
      ActivityList, BrickGallery
    },
    mounted () {
      this.loadWatchingBricks()
      this.loadPopular()

      authController.on('login', () => {
        this.loadWatchingBricks()
      })
    },
    methods: {
      loadWatchingBricks () {
        if (this.loadingStars || !this.$root.user) return

        this.loadingStars = true
        axios.get(`/api/users/${this.$root.user.id}/bricks_starred/`)
          .always(response => {
            this.loadingStars = false
            return response
          })
          .then((response) => {
            this.starredBricks = response.data.results
          })
      },
      loadPopular () {
        axios.get('/api/forum/bricks/popular/')
          .then(response => {
            this.popularBricks = response.data
          })
      }
    }
  }
</script>
<style scoped>
  @import "Common/Common.scss";
</style>
