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
        <button class="btn btn-biohub btn-biohub-forum-welcome-notice" @click="$router.push({name:'search'})">Find a Part</button>
        <!-- Modal -->
      </div>
    </div>
    <div class="row">
      <div class="container">
        <div class="col-md-8 less-padding">
          <div class="list-group-item list-group-header">Timeline</div>
          <activity-list api="/api/forum/activities/timeline/"></activity-list>
        </div>
        <div class="col-md-4 less-padding">
          <ul class="list-group list-home-bricks">
            <li class="list-group-item list-group-header">Bricks Watching</li>
            <transition-group name="fade">
              <template v-if="watchedBricks.results">
                <li class="list-group-item" v-for="item in watchedBricks.results"
                    style="box-shadow: 0 0 3px #ccc;border:none;" :key="item.part_name">
                  <router-link :to="{ name: 'Brick', params: { brick: item.part_name } }">{{ item.part_name }}</router-link>
                </li>
              </template>
              <template v-else>
                <li class="list-group-item" style="box-shadow: 0 0 3px #ccc;border:none;" key="loading">
                  Loading <i class="fa fa-spinner fa-pulse fa-fw"></i>
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

  export default {
    data () {
      return {
        watchedBricks: [],
        loadingWatching: false
      }
    },
    components: {
      ActivityList
    },
    mounted () {
      this.loadWatchingBricks()

      authController.on('login', () => {
        this.loadWatchingBricks()
      })
    },
    methods: {
      loadWatchingBricks () {
        if (this.loadingWatching || !this.$root.user) return

        this.loadingWatching = true
        axios.get(`/api/users/${this.$root.user.id}/bricks_watching/`)
          .always(response => {
            this.loadingWatching = false
            return response
          })
          .then((response) => {
            this.watchedBricks = response.data
          })
      }
    }
  }
</script>
<style scoped>
  @import "Common/Common.scss";
</style>
