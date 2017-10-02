<template>
  <div>
    <star-tab v-for="(p, i) in activities" :key="i"
              :params="p.params"
              :showIntro="params.showIntro"
              class="-profile-activity-tab">
    </star-tab>
  </div>
</template>

<script>
  import StarTab from '../Common/StarTab.vue'

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
        type: 'Star'})
      console.log(this.activities)
    },
    components: {
      StarTab
    },
    methods: {
      loadMore () {
        this.$store.dispatch('loadMoreActivities')
      }
    }
  }
</script>
