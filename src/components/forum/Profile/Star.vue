<template>
  <div class="-profile-activity-box">
    <star-tab v-for="(p, i) in starredExps" :key="i"
               :p="p" :user="params.user" :showIntro="params.showIntro" class="-profile-activity-tab">
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
          'Experience A',
          'Experience B'
        ]
      }
    },
    components: {
      StarTab
    }
  }
</script>
