<template>
  <div class="experience-list">
    <experience-item :experience="experience" v-for="experience in experiences" :key="experience.part_name"></experience-item>
    <pager :hasNext="hasNext" :hasPrevious="hasPrevious" :pageNum="pageNum"></pager>
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
        this.experiences = []
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
