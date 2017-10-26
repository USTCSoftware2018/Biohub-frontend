<template>
  <transition name="fade">
    <div class="activities" v-bind:class="{'activities-profile':insideProfile}">
      <div class="activity-item" v-for="item in activities">
        <activity-item :activity="item"></activity-item>
      </div>
      <div class="load-more" v-if="(next !== null) && (!loading)" @click="loadNext">
        Load more
      </div>
      <div v-if="loading" style="text-align: center;padding: 20px 0;font-size: 20px;background-color: white;">
      Please Wait <i class="fa fa-spinner fa-pulse fa-fw"></i>
      </div>
      <div v-if="!loading && !activities.length" style="padding: 60px 30px; text-align: center;">
        <i class="fa fa-3x fa-calendar" style="color: #aaa;"></i>
        <h2 style="color: black; font-weight: 500;">
          No activities.
        </h2>
        <p>Go to follow some users or watch some bricks, and all the related events will be displayed here.</p>
      </div>
    </div>
  </transition>
</template>

<script>
  import ActivityItem from './ActivityItem'

  export default {
    props: ['api', 'insideProfile'],
    components: { ActivityItem },
    data () {
      return {
        activities: [],
        next: null,
        loading: false
      }
    },
    methods: {
      load (url) {
        if (this.loading) return

        this.loading = true
        return axios.get(url)
          .then(response => {
            this.activities = this.activities.concat(response.data.results)
            this.next = response.data.next

            return response
          }).always(() => {
            this.loading = false
          })
      },
      loadNext () {
        if (!this.next) return
        return this.load(this.next)
      },
      refresh () {
        this.loading = false
        this.next = null
        return this.load(this.api)
      }
    },
    mounted () {
      this.refresh()
    }
  }
</script>
