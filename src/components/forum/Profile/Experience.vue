<template>
  <div class="-profile-activity-box">
    <experience-tab v-for="(p, i) in starredExps" :key="i"
               :p="p" :user="params.user" :showIntro="params.showIntro" class="-profile-activity-tab">
    </experience-tab>
  </div>
</template>

<script>
  import ExperienceTab from '../Common/ExperienceTab.vue'

  export default {
    props: ['params'],
    mounted () {
      console.log('Star mounted')
    },
    data () {
      return {
        starredExps: [
          'Repo A',
          'Repo B'
        ]
      }
    },
    components: {
      ExperienceTab
    }
  }
</script>
