<template>
  <div>
    <star-tab v-for="(p, i) in starredExps" :key="i"
              :params="p"
              :showIntro="params.showIntro"
              class="-profile-activity-tab">
    </star-tab>
  </div>
</template>

<script>
  import StarTab from '../Common/StarTab.vue'

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
            expLink: '#',
            partName: 'BBk_233',
            intro: 'this is brief introduction'
          }
        ]
      }
    },
    components: {
      StarTab
    }
  }
</script>
