<template>
  <div>
    <rating-tab v-for="(p, i) in activities" :key="i"
                :params="p.params" class="-profile-activity-tab">
    </rating-tab>
  </div>
</template>

<script>
  import RatingTab from '../Common/RatingTab.vue'

  export default {
    props: ['params'],
    computed: {
      activities () {
        return this.$store.state.Activities.activities
      }
    },
    mounted () {
      this.$store.commit('cleanActivities')
      this.$store.dispatch('initActivities', {
        username: this.$route.params.author,
        type: 'Rating'})
      console.log(this.activities)
    },
    components: {
      RatingTab
    },
    methods: {
      loadMore () {
        this.$store.dispatch('loadMoreActivities')
      }
    }
  }
</script>
