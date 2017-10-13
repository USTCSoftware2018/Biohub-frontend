<template>
  <div class="experience-list" style="box-shadow: 0 0 3px #ccc;">
    <div class="experience-list-header">
      Experience(s) List
    </div>
    <transition-group name="fade">
      <template v-if="experiences.length > 0">
        <experience-item :experience="experience" v-for="experience in experiences" v-bind:key="experience.id"></experience-item>
        <pager :hasNext="hasNext" :hasPrevious="hasPrevious" :pageNum="pageNum" key="pager"></pager>
      </template>
      <template v-else>
        <p key="warning" class="loading">Loading <i class="fa fa-pulse fa-spinner fa-fw"></i></p>
      </template>
    </transition-group>

  </div>
</template>

<script>
  import PageMixin from '@/components/Common/PageMixin'
  import ExperienceItem from './ExperienceItem'

  export default {
    props: ['api'],
    components: { ExperienceItem },
    mixins: [PageMixin],
    data () {
      return {
        experiences: [],
        loading: false,
        hasNext: false,
        hasPrevious: false,
        pageNum: 0
      }
    },
    methods: {
      getQueryParams () {
        return {}
      },
      loadExperiences () {
        return this._load(this.api)
      },
      processResponse (response) {
        this.experiences = response.data.results
      }
    },
    mounted () {
      this.loadExperiences()
    },
    watch: {
      'api' () {
        this.loadExperiences()
      }
    }
  }
</script>
