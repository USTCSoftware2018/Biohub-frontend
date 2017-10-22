<template>
  <div class="experience-list" v-bind:class="{'experience-profile':insideProfile}">
    <div class="experience-list-header" v-if="!insideProfile">
      Experiences
    </div>
    <transition-group name="fade">
      <template v-if="!loading">
        <experience-item :experience="experience" v-for="experience in experiences" :key="experience.id"></experience-item>
      </template>
      <template v-else>
        <p key="warning" class="loading">Loading <i class="fa fa-pulse fa-spinner fa-fw"></i></p>
      </template>
    </transition-group>
    <pager :hasNext="hasNext" :hasPrevious="hasPrevious" :pageNum="pageNum"></pager>
  </div>
</template>

<script>
  import PageMixin from '@/components/Common/PageMixin'
  import ExperienceItem from './ExperienceItem'

  export default {
    props: ['api', 'insideProfile'],
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
