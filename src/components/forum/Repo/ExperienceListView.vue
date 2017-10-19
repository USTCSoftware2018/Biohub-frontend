<template>
  <div class="col-md-9">
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
      next(vm => vm.reload(to.params.brick))
    },
    beforeRouteUpdate (to, from, next) {
      this.reload(to.params.brick)
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
