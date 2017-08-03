<template>
  <div>
    <experience-tab v-for="(p, i) in tempParams" :key="i"
               :params="p" :showIntro="showIntro" class="-profile-activity-tab">
    </experience-tab>
  </div>
</template>

<script>
  import ExperienceTab from '../Common/ExperienceTab.vue'

  export default {
    props: ['params', 'showIntro'],
    mounted () {
      console.log('Star mounted')
    },
    data () {
      return {
        tempParams: [
          {
            user: 'Gloit',
            expLink: '#',
            partName: 'Good Part',
            intro: 'this is a brief intro'
          }
        ]
      }
    },
    components: {
      ExperienceTab
    }
  }
</script>
