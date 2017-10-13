<template>
  <transition name="fade">
    <div class="brick-list" v-if="bricks.length > 0">
      <brick-item :brick="brick" v-for="brick in bricks" :key="brick.part_name"></brick-item>
      <pager :hasNext="hasNext" :hasPrevious="hasPrevious" :pageNum="pageNum"></pager>
    </div>
  </transition>
</template>

<script>
  import PageMixin from '@/components/Common/PageMixin'
  import BrickItem from './BrickItem'

  export default {
    props: ['api'],
    components: { BrickItem },
    mixins: [PageMixin],
    data () {
      return {
        bricks: [],
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
      loadBricks () {
        this.bricks = []
        return this._load(this.api)
      },
      processResponse (response) {
        this.bricks = response.data.results
      }
    },
    mounted () {
      this.loadBricks()
    },
    watch: {
      'api' () {
        this.loadBricks()
      }
    }
  }
</script>
