<template>
  <div>
    <rating-tab v-for="(p, i) in starredExps" :key="i"
                :params="p" class="-profile-activity-tab">
    </rating-tab>
  </div>
</template>

<script>
  import RatingTab from '../Common/RatingTab.vue'

  export default {
    props: ['params'],
    mounted () {
      console.log('Star mounted')
    },
    data () {
      return {
        starredExps: [
          {
            user: 'Gloit',
            partName: 'BBk_A',
            score: 4.4
          },
          {
            user: 'Gloit',
            partName: 'BBk_B',
            score: 2.3
          }
        ]
      }
    },
    components: {
      RatingTab
    }
  }
</script>
