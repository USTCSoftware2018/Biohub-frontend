<template>
  <div>
    <component v-for="(mod, i) in allActivities" :key="i" :is="mod.type + 'Tab'"
               :params="mod.params" :showIntro="showIntro" class="-profile-activity-tab">
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
    props: ['params', 'showIntro'],
    data () {
      return {
        allActivities: [
          {
            type: 'Experience',
            params: {
              user: 'Gloit',
              expLink: '#',
              partName: '#',
              intro: ''
            }
          },
          {
            type: 'Comment',
            params: {
              user: 'Gloit',
              expLink: '#',
              partName: '#',
              intro: ''
            }
          },
          {
            type: 'Star',
            params: {
              user: 'Gloit',
              expLink: '#',
              partName: '#',
              intro: ''
            }
          },
          {
            type: 'Rating',
            params: {
              user: 'Gloit',
              expLink: '#',
              score: 2.3,
              partName: '#'
            }
          },
          {
            type: 'Watch',
            params: {
              user: 'Gloit',
              partName: 'BBk'
            }
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
