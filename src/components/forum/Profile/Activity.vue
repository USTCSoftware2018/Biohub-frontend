<template>
  <div>
    <component v-for="(mod, i) in allActivities" :key="i" :is="mod.type + 'Tab'"
               :p="mod.p" :user="params.user" :showIntro="params.showIntro" class="-profile-activity-tab">
    </component>
  </div>
</template>

<script>
  import ExperienceTab from '../Common/ExperienceTab.vue'
  import CommentTab from '../Common/CommentTab.vue'
  import StarTab from '../Common/StarTab.vue'
  import RatingTab from '../Common/RatingTab.vue'
  import WatchTab from '../Common/WatchTab.vue'
  export default {
    props: ['params'],
    data () {
      return {
        allActivities: [
          {
            type: 'Experience',
            p: 'GoodRepo'
          },
          {
            type: 'Comment',
            p: 'GoodExperience'
          },
          {
            type: 'Star',
            p: 'GoodExperience'
          },
          {
            type: 'Rating',
            p: {
              repo: 'BadRepo',
              score: 1.1
            }
          },
          {
            type: 'Watch',
            p: 'ExcellentRepo'
          }
        ]
      }
    },
    components: {
      ExperienceTab,
      CommentTab,
      StarTab,
      RatingTab,
      WatchTab
    }
  }
</script>
