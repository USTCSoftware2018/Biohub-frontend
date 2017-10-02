<template>
  <div v-scroll="loadMore">
    <component v-for="(mod, i) in allActivities"
               :key="i"
               :is="mod.type + 'Tab'"
               :params="mod.params"
               :showIntro="params.showIntro" class="-profile-activity-tab">
    </component>
    <div v-if='$store.state.Activities.loading'>Loading...</div>
    <div v-if="!$store.state.Activities.hasNext">You have reached the bottom...</div>
  </div>
</template>

<script>
  import ExperienceTab from '../Common/ExperienceTab.vue'
  import CommentTab from '../Common/CommentTab.vue'
  import StarTab from '../Common/StarTab.vue'
  import RatingTab from '../Common/RatingTab.vue'
  import WatchTab from '../Common/WatchTab.vue'

  export default {
    watch: {
    },
    props: ['params', 'showIntro'],
    data () {
      return {
        next: '',
        sw: true
      }
    },
    computed: {
      allActivities () {
        return this.$store.state.Activities.activities
      }
    },
    components: {
      ExperienceTab,
      CommentTab,
      StarTab,
      RatingTab,
      WatchTab
    },
    mounted () {
      this.$store.dispatch('initActivities', {
        username: this.$route.params.author,
        type: null})
    },
    methods: {
      loadMore () {
        this.$store.dispatch('loadMoreActivities', null)
      }
    }
  }
</script>
