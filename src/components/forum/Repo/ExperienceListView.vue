<template>
  <div class="col-md-8 col-md-offset-2">
    <experience-list :api="api" ref="list" v-if="part_name"></experience-list>
  </div>
</template>

<script>
  import ExperienceList from '@/components/forum/Experience/ExperienceList.vue'

  export default {
    components: { ExperienceList },
    data () {
      return {
        part_name: ''
      }
    },
    computed: {
      api () {
        return `/api/forum/bricks/${this.part_name}/experiences/`
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => vm.reload(to.params.repo))
    },
    beforeRouteUpdate (to, from, next) {
      this.reload(to.params.repo)
      next()
    },
    methods: {
      reload (partName) {
        this.part_name = partName
        this.$nextTick(() => this.$refs.list.loadExperiences())
      }
    }
  }
</script>
