<template>
  <div>
    <div class="row repo-wrapper">
      <transition>
        <div class="container basic-info-container" v-if="brick">
          <div class="col-md-6">
            <div class="repo-type">{{ brick.part_type }}</div>
            <div class="repo-info-name">
              {{ brick.part_name }}
              <star :initial="brick.rate_score"></star>
            </div>
            <div class="repo-info-addon">{{ brick.author }}@{{ brick.group_name }}</div>
            <div class="repo-info-addon">
              <a id="rate" @click.prevent="showRate = !showRate" v-if="!stats.rated">Rate</a>
              <star :isEnable="true" v-show="showRate" v-if="!stats.rated" :brickName="brick.part_name"></star>
              <a id="watch" @click="watch">{{ stats.watched ? 'Unwatch' : 'Watch' }}</a><span class="number">{{ brick.watches }}</span>
              <a id="star" @click="star">{{ stats.starred ? 'Unstar' : 'Star' }}</a><span class="number">{{ brick.stars }}</span>
              <a href="#post-box">Post a new Experience</a>
            </div>
          </div>
          <div class="col-md-6">
            <feature :feaData="brick.ruler.seq_features" :seqLength="brick.sequence.length"></feature>
          </div>
        </div>
        <div class="container basic-info-container" v-else>
          <div class="col-md-6">
            <div class="repo-info-name">
              Loading <i class="fa fa-spinner fa-pulse fa-fw"></i>
            </div>
          </div>
        </div>
      </transition>
      <div class="container" v-if='brick!==null'>
        <div class="col-md-12">
          <div data-toggle="tooltip" title="Click to view document">
            <p data-toggle="collapse" href="#document-div" class="document-toggler">Documentation</p>
          </div>
          <div v-html="documentHTML" id="document-div" class="collapse"></div>
        </div>
      </div>
    </div>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<style>
  .document-toggler {
    cursor: pointer;
    font-size: 20px;
  }
</style>

<script>
  import Star from '@/utils/Star'
  import Feature from './SeqFeature'
  import marked from 'marked'

  export default {
    components: { Star, Feature },
    data () {
      return {
        part_name: '',
        brick: null,
        stats: {},
        showRate: false
      }
    },
    watch: {
      $route (to, from) {
        if (to.params.repo !== this.part_name) {
          this.loadBrick(to.params.repo)
        }
      }
    },
    computed: {
      documentHTML () {
        return marked(this.brick.document.text)
      }
    },
    methods: {
      loadBrick (partName) {
        axios.get(`/api/forum/bricks/${partName}/`)
          .then(response => {
            this.part_name = partName
            this.$set(this, 'brick', response.data)
            this.part_name = partName

            return axios.get(`/api/forum/bricks/${partName}/stats/`)
          }, error => {
            if (error.response.status === 404) {
              this.$router.push({ name: 'NotFound' })
            }
          }).then(response => {
            if (!response) return
            this.$set(this, 'stats', response.data)
          })
      },
      watch () {
        const cancel = this.stats.watched
        const action = cancel ? 'unwatch' : 'watch'
        const delta = cancel ? -1 : 1

        axios.post(`/api/forum/bricks/${this.part_name}/${action}/`)
          .then(response => {
            this.stats.watched = !cancel
            this.brick.watches += delta
          })
      },
      star () {
        const cancel = this.stats.starred
        const action = cancel ? 'unstar' : 'star'
        const delta = cancel ? -1 : 1

        axios.post(`/api/forum/bricks/${this.part_name}/${action}/`)
          .then(response => {
            this.stats.starred = !cancel
            this.brick.stars += delta
          })
      }
    },
    mounted () {
      this.loadBrick(this.$route.params.repo)
    }
  }
</script>
