<template>
  <div :class="['brick-item', short ? 'short' : '']">
    <div class="brick-header">
      <router-link :to="{ name: 'Brick', params: { brick: brick.part_name } }">
        {{ brick.part_name }}
      </router-link>
      <span
        class="brick-label brick-label-type"
        data-toggle="tooltip"
        title="Type">{{ brick.part_type }}</span>
      <span class="pull-right">
        <span
          :class="statusClasses"
          data-toggle="tooltip"
          title="Status of this brick" style="border-right: 1px solid white;">{{ brick.status }}</span><span
          :class="sampleStatusClasses"
          data-toggle="tooltip"
          title="Status of the sample">{{ brick.sample_status || 'Unknown' }}</span>
      </span>
      <br>
      <span
        class="brick-label brick-label-info"
        v-for="author in authors" v-if="!short && author" v-html="author">
      </span>
      <br>
      <!-- <star :isEnable="false" :initial="brick.rate_score"></star> -->
    </div>
    <p class="brick-content" v-html="brick.desc"></p>
    <div class="brick-footer">
      <!-- <span class="data-group" data-toggle="tooltip" title="Stars">
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
      </span> -->
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
    props: {
      brick: {
        type: Object
      },
      short: {
        type: Boolean,
        default: false
      }
    },
    components: {
      Star
    },
    methods: {
    },
    computed: {
      authors () {
        if (!this.brick.author) return []
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

        return ['brick-label', 'status', `brick-label-${klass}`]
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

        return ['brick-label', 'sample-status', `brick-label-${klass}`]
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
