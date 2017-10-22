<template>
  <div class="tab-pane active in fade">
    <experience-list :api="api" ref="list" :insideProfile='true'></experience-list>
  </div>
</template>

<script>
  import ExperienceList from '@/components/forum/Experience/ExperienceList'

  export default {
    props: ['user'],
    components: { ExperienceList },
    computed: {
      api () {
        return `/api/forum/experiences/?author=${this.user.username}`
      }
    },
    watch: {
      '$route' () {
        this.$refs.list.loadExperiences()
      }
    }
  }
</script>
