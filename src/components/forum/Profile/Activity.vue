<template>
  <div v-scroll="loadMore">
    <component v-for="(mod, i) in fetcher.results"
               :key="i"
               :is="mod.type + 'Tab'"
               :params="mod.params"
               :showIntro="params.showIntro" class="-profile-activity-tab">
    </component>
    <div v-if='fetcher.loading'>Loading...</div>
    <div v-if="fetcher.hasNext">You have reached the bottom...</div>
  </div>
</template>

<script>
  import ExperienceTab from '../Common/ExperienceTab.vue'
  import CommentTab from '../Common/CommentTab.vue'
  import StarTab from '../Common/StarTab.vue'
  import RatingTab from '../Common/RatingTab.vue'
  import WatchTab from '../Common/WatchTab.vue'

  import ActivityFetcher from './Activity'

  export default {
    props: ['params', 'showIntro'],
    data () {
      return {
        next: '',
        sw: true,
        fetcher: {
          results: [],
          loading: true,
          hasNext: false
        }
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
      this.fetcher = new ActivityFetcher(this.$route.params.author)
      console.log(this.fetcher.results)
    },
    methods: {
      loadMore () {
      }
    }
  }
</script>
