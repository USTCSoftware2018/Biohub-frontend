<template>
  <div v-scroll="loadMore">
    <component v-for="(mod, i) in allActivities"
               :key="i"
               :is="mod.type + 'Tab'"
               :params="mod.params"
               :showIntro="params.showIntro" class="-profile-activity-tab">
    </component>
    <div v-if="hasNext">sdfsdf</div>
  </div>
</template>

<script>
  import ExperienceTab from '../Common/ExperienceTab.vue'
  import CommentTab from '../Common/CommentTab.vue'
  import StarTab from '../Common/StarTab.vue'
  import RatingTab from '../Common/RatingTab.vue'
  import WatchTab from '../Common/WatchTab.vue'

  export default {
    props: ['params', 'showIntro'],
    data () {
      return {
        allActivities: [],
        hasNext: false,
        next: '',
        sw: true
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
      axios.get('/api/forum/activities/').then((response) => {
        this.allActivities = response.data.results
        if (response.data.next) {
          this.hasNext = true
          this.next = response.data.next
          this.sw = true
        }
      })
    },
    methods: {
      loadMore () {
        if (!this.sw) {
          return
        }
        this.sw = false
        axios.get(this.next).then((response) => {
          if (response.data.next) {
            this.sw = true
            this.next = response.data.next
          }
          this.allActivities.splice(0, 0, response.data.results)
        })
      }
    }
  }
</script>
