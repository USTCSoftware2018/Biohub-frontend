<template>
  <div class="activities">
    <div class="activity-item" v-for="item in activities">
      <activity-item :activity="item"></activity-item>
    </div>
    <div class="load-more" v-if="next !== null" @click="loadNext">
      Load more
    </div>
  </div>
</template>

<script>
  import ActivityItem from './ActivityItem'

  export default {
    props: ['api'],
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
