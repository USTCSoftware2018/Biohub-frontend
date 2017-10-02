<template>
  <div>
    <experience-tab v-for="(p, i) in activities" :key="i"
               :params="p.params" :showIntro="params.showIntro" class="-profile-activity-tab">
    </experience-tab>
  </div>
</template>

<script>
  import ExperienceTab from '../Common/ExperienceTab.vue'

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
        type: 'Experience'})
      console.log(this.activities)
    },
    components: {
      ExperienceTab
    },
    methods: {
      loadMore () {
        this.$store.dispatch('loadMoreActivities')
      }
    }
  }
</script>
