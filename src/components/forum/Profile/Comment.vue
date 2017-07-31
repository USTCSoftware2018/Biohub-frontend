<template>
  <div class="-profile-activity-box">
    <comment-tab v-for="(p, i) in starredRepos" :key="i"
               :p="p" :user="params.user" :showIntro="params.showIntro" class="-profile-activity-tab">
    </comment-tab>
  </div>
</template>

<script>
  import CommentTab from '../Common/CommentTab.vue'

  export default {
    props: ['params'],
    mounted () {
      console.log('Star mounted')
    },
    data () {
      return {
        starredRepos: [
          'Repo A',
          'Repo B'
        ]
      }
    },
    components: {
      CommentTab
    }
  }
</script>
