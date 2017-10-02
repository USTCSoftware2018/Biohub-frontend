<template>
  <div>
    <repo-view v-for="(n, i) in activities"
               :params="{partName: n, grade: grade[i], label: label, intro: abstract[i]}"
               :key="i"></repo-view>
  </div>
</template>

<style scoped>
  .search-result-tab {
    border-bottom: 1px solid #ddd;
  }
</style>

<script>
  import RepoView from '../Common/RepoView.vue'

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
        type: 'Watching'})
      console.log(this.activities)
    },
    components: {
      RepoView
    },
    methods: {
      loadMore () {
        this.$store.dispatch('loadMoreActivities')
      }
    }
  }
</script>
