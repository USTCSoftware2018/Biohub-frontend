<template>
  <div>
    <div class="row repo-wrapper">
      <transition>
        <div class="container basic-info-container" v-if="brick">
          <div class="col-md-6">
            <div class="repo-type">{{ brick.part_type }}</div>
            <div class="repo-info-name">
              <router-link :to="{name: 'Brick', params: {brick: brick.part_name}}" tag="span" class="part-name">
                {{ brick.part_name }}
              </router-link>
              <star :initial="brick.rate_score"></star>
            </div>
            <div class="repo-info-addon">
              <p
                class="brick-label brick-label-forum"
                v-for="author in authors" v-if="author" v-html="author">
                </p>
            </div>
            <div class="repo-info-addon">
              <a id="rate" v-if="!stats.rated" href="#starCollapse" data-toggle="collapse" aria-expanded="false">Rate</a>

              <a id="watch" @click="watch">{{ stats.watched ? 'Unwatch' : 'Watch' }}</a><span class="number">{{ brick.watches }}</span>
              <a id="star" @click="star">{{ stats.starred ? 'Unstar' : 'Star' }}</a><span class="number">{{ brick.stars }}</span>
              <router-link :to="{ name: 'Write-Exp', params: { brick: brick.part_name }}">
                Post a New Experience
              </router-link>
            </div>
            <div class="collapse" id="starCollapse">
              <star :isEnable="true" v-if="!stats.rated" :brickName="brick.part_name"></star>
            </div>
            <div class="divider" style="margin: 5px 0 5px 0"></div>
          </div>
          <div class="col-md-6">
            <feature :feaData="brick.ruler.seq_features" :seqLength="brick.sequence.length"></feature>
          </div>
        </div>
        <div class="container basic-info-container" v-else>
          <div class="col-md-6">
            <div class="repo-info-name">
              {{ loadingText }} <i class="fa fa-spinner fa-pulse fa-fw"></i>
            </div>
          </div>
        </div>
      </transition>
      <div class="container meta-container" v-if="brick!==null">
        <div class="col-md-10">
          <p
            class="document-toggler"
            @click="isMetaCollapsed = !isMetaCollapsed"
            data-toggle="tooltip"
            data-placement="right"
            title="Click to learn more">
            Meta
          </p>
          <div id="meta-div" :class="isMetaCollapsed ? 'collapse' : ''">
            <table class="table main">
              <tbody>
                <tr v-for="meta in metas" :class="meta[2]">
                  <th>{{ meta[0] }}</th>
                  <td v-html="meta[1]"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="col-md-12">
          <div data-toggle="tooltip" data-placement="right" title="Click to view document" class="document-toggler">
            <p data-toggle="collapse" href="#document-div" class="document-toggler">Documentation</p>
          </div>
          <div v-html="documentHTML" id="document-div" class="collapse"></div>
        </div>
      </div>
    </div>
    <div class="container">
      <router-view></router-view>
    </div>
    <div class="container-fluid" style="margin-left: 10%;" v-show="related_bricks.length">
      <h3>Related Bricks</h3>
      <brick-gallery :bricks="related_bricks"></brick-gallery>
    </div>
  </div>
</template>

<style scoped>
  .document-toggler {
    cursor: pointer;
    font-size: 20px;
    display: inline-block;
  }

  .repo-info-name .part-name {
    cursor: pointer;
  }
</style>

<script>
  import Star from '@/utils/Star'
  import Feature from './SeqFeature'
  import BrickGallery from '@/components/forum/Brick/BrickGallery'
  import marked from 'marked'

  export default {
    components: { Star, Feature, BrickGallery },
    data () {
      return {
        part_name: '',
        brick: null,
        stats: {},
        showRate: false,
        loadingText: 'Loading',
        isMetaCollapsed: true,
        related_bricks: []
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        if (to.params.brick !== vm.part_name) {
          vm.loadBrick(to.params.brick)
        }
      })
    },
    beforeRouteUpdate (to, from, next) {
      if (to.params.brick !== this.part_name) {
        this.loadBrick(to.params.brick)
      }
      next()
    },
    computed: {
      statusClass () {
        return {
          Available: 'success',
          Unavailable: 'fatal',
          Deleted: 'fatal',
          Informational: 'info',
          Planning: 'warning'
        }[this.brick.status]
      },
      brickLinks () {
        return [
          [
            'View on iGEM',
            `http://parts.igem.org/Part:${this.brick.part_name}`
          ],
          [
            'Download as GenBank Format',
            `http://www.cambridgeigem.org/gbdownload/${this.brick.part_name}.gb`
          ],
          [
            'Download as SBOL Format',
            `https://synbiohub.org/public/igem/${this.brick.part_name}/1/${this.brick.part_name}.xml`
          ]
        ].map(([title, link]) => `<a href="${link}" target="_blank">${title}</a>`)
      },
      sampleStatusClass () {
        return {
          Discontinued: 'fatal',
          "It's complicated": 'warning',
          'In stock': 'success',
          'Not in stock': 'warning',
          'For reference only': 'info',
          'No part sequence': 'info',
          '': ''
        }[this.brick.sample_status]
      },
      authors () {
        if (!this.brick.author) return []
        return this.brick.author.split(/,\s+/g)
      },
      documentHTML () {
        return marked(this.brick.document.text)
      },
      metas () {
        return [
          ['Part Status', this.brick.status, [`td-${this.statusClass}`]],
          ['Sample Status', this.brick.sample_status, [`td-${this.sampleStatusClass}`]],
          [
            'Uses',
            this.brick.uses,
            {}
          ],
          [
            'Twins',
            this.brick.twin_num
          ],
          ['Categories', this.brick.categories.split(' ').join('<br>'), ['collapsable']],
          [
            'Parameters',
            '<table>' +
            (this.brick.parameters || [])
              .map(([name, value]) => `<tr><th>${name}</th><td>${value}</td></tr>`)
              .join('') + '</table>',
            ['collapsable']
          ],
          [
            'Links',
            this.brickLinks.join('<br>'),
            ['collapsable']
          ]
        ]
      }
    },
    watch: {
      brick () {
        this.$nextTick(() => $('[data-toggle=tooltip]', this.$el).tooltip())
      }
    },
    methods: {
      loadBrick (partName) {
        const oldBrick = this.brick
        const timerId = setTimeout(() => {
          this.loadingText = 'Fetching from iGEM...'
        }, 700)
        this.brick = null
        this.related_bricks = []

        axios.get(`/api/forum/bricks/${partName}/`)
          .then(response => {
            clearTimeout(timerId)
            this.part_name = partName
            this.$set(this, 'brick', response.data)
            this.part_name = partName

            return axios.get(`/api/forum/bricks/${partName}/stats/`)
          }, error => {
            clearTimeout(timerId)
            if (error.response.status === 404) {
              this.to404()
            }
            this.$set(this, 'brick', oldBrick)
          }).then(response => {
            if (!response) return
            this.$set(this, 'stats', response.data)

            return axios.get(`/api/forum/bricks/${partName}/related/`)
          }).then(response => {
            this.$set(this, 'related_bricks', response.data)
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
    }
  }
</script>
