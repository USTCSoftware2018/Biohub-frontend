<template>
  <div>
    <comment-tab v-for="(p, i) in tempParams" :key="i"
                 :params="p" :showIntro="params.showIntro" class="-profile-activity-tab">
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
        tempParams: [
          {
            user: 'Gloit',
            expLink: '#',
            partName: 'BBk_?',
            intro: 'this is comment in brief'
          }
        ]
      }
    },
    components: {
      CommentTab
    }
  }
</script>
