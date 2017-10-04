<template>
  <div class="search-result">
    <div class="result-header">
      <router-link :to="{ name: 'Brick', params: { repo: brick.part_name } }">
        {{ brick.part_name }}
      </router-link>
      <span
        class="result-label result-label-type"
        data-toggle="tooltip"
        title="Type">{{ brick.part_type }}</span>
      <star :isEnable="false" :initial="brick.rate_score"></star>
      <span class="pull-right">
        <span
          :class="statusClasses"
          data-toggle="tooltip"
          title="Status of this brick">{{ brick.status }}</span><span
          :class="sampleStatusClasses"
          data-toggle="tooltip"
          title="Status of the sample">{{ brick.sample_status || 'Unknown' }}</span>
      </span>
      <br>
      <span
        class="result-label result-label-info"
        v-for="author in authors" v-if="author" v-html="author">
        </span>
    </div>
    <p class="result-content">
      {{ brick.short_desc }}
    </p>
    <div class="result-footer">
      <span class="data-group" data-toggle="tooltip" title="Stars">
        <i class="fa fa-star-o"></i>
        <span>{{ brick.stars || 0 }}</span>
      </span>
      <span class="data-group" data-toggle="tooltip" title="Watches">
        <i class="fa fa-eye"></i>
        <span>{{ brick.watches || 0 }}</span>
      </span>
      <span class="data-group" data-toggle="tooltip" title="Uses">
        <i class="fa fa-magnet"></i>
        <span>{{ brick.uses }}</span>
      </span>
      <div class="progress progress-matches" data-toggle="tooltip" title="Weight">
        <div :class="progressClasses" :style="progressStyle"></div>
        <span class="text">{{ (brick.weight * 100).toFixed(2) + '%' }}</span>
      </div>
    </div>
  </div>
</template>
<script>
  import Star from '../../../utils/Star.vue'

  export default {
    props: ['brick'],
    components: {
      Star
    },
    methods: {
    },
    computed: {
      authors () {
        return this.brick.author.split(/,\s+/g)
      },
      statusClasses () {
        let klass = {
          Available: 'success',
          Unavailable: 'fatal',
          Deleted: 'fatal',
          Informational: 'info',
          Planning: 'warning'
        }[this.brick.status]

        return ['result-label', 'status', `result-label-${klass}`]
      },
      sampleStatusClasses () {
        let klass = {
          Discontinued: 'fatal',
          "It's complicated": 'warning',
          'In stock': 'success',
          'Not in stock': 'warning',
          'For reference only': 'info',
          'No part sequence': 'info',
          '': ''
        }[this.brick.sample_status]

        return ['result-label', 'sample-status', `result-label-${klass}`]
      },
      progressStyle () {
        return {
          width: `${this.brick.weight * 100}%`
        }
      },
      progressClasses () {
        let weight = this.brick.weight
        let klass

        if (weight > 0.7) {
          klass = 'success'
        } else if (weight > 0.4) {
          klass = 'warning'
        } else {
          klass = 'fatal'
        }

        return ['progress-bar', klass]
      }
    },
    mounted () {
      $('[data-toggle=tooltip]', this.$el).tooltip()
    }
  }
</script>
