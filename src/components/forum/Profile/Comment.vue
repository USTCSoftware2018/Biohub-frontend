<template>
  <div v-scroll="loadMore">
    <comment-tab v-for="(p, i) in activities" :key="i"
                 :params="p.params" :showIntro="params.showIntro" class="-profile-activity-tab">
    </comment-tab>
  </div>
</template>

<script>
  import CommentTab from '../Common/CommentTab.vue'

  export default {
    props: ['params'],
    computed: {
      activities () {
        return this.$store.state.Activities.activities
      }
    },
    mounted () {
      this.$store.commit('cleanActivities')
      this.$store.dispatch('initActivities', {
        username: this.$route.params.author,
        type: 'Comment'})
      console.log(this.activities)
    },
    components: {
      CommentTab
    },
    methods: {
      loadMore () {
        this.$store.dispatch('loadMoreActivities')
      }
    }
  }
</script>
