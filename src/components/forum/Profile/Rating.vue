<template>
  <div class="-profile-activity-box">
    <rating-tab v-for="(p, i) in starredExps" :key="i"
                :p="p" :user="params.user" :showIntro="params.showIntro" class="-profile-activity-tab">
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
            repo: 'Repo A',
            score: 4.4
          },
          {
            repo: 'Repo B',
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
