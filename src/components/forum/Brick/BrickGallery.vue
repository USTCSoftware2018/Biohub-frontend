<template>
  <div class="gallery" v-show="bricks.length" ref="container">
    <div class="indicator left" @click="move(500)" v-show="showLeft">
      <i class="fa fa-2x fa-chevron-left"></i>
    </div>
    <div class="indicator right" @click="move(-500)" v-show="showRight">
      <i class="fa fa-2x fa-chevron-right"></i>
    </div>
    <div class="gallery-outer" ref="outer">
      <div class="card" v-for="brick in bricks">
        <brick-item :brick="brick" :short="true"></brick-item>
      </div>
    </div>
  </div>
</template>

<script>
  import BrickItem from '@/components/forum/Brick/BrickItem'

  export default {
    props: ['bricks'],
    data () {
      return {
        showLeft: false,
        showRight: false
      }
    },
    components: { BrickItem },
    watch: {
      bricks (newVal) {
        this.adjustWidth(newVal.length)
      }
    },
    methods: {
      adjustWidth (num) {
        const $outer = $(this.$refs.outer)
        const width = num * 520
        $outer.width(width)
        $outer.css('left', '0px')
        this.toggleIndicators()
      },
      toggleIndicators () {
        const $outer = $(this.$refs.outer)
        const width = $outer.width() - $(this.$refs.container).width()
        const offsetStr = $outer.css('left')
        const offset = parseInt(offsetStr.substring(0, offsetStr.length - 2))
        this.showLeft = offset < -30
        this.showRight = offset > -width + 30
      },
      move (delta) {
        const $outer = $(this.$refs.outer)
        const width = $outer.width() - $(this.$refs.container).width()
        const offsetStr = $outer.css('left')
        const offset = parseInt(offsetStr.substring(0, offsetStr.length - 2))
        let newOffset = offset + delta
        if (newOffset > 0) newOffset = 0
        if (newOffset < -width) newOffset = -width
        $outer.animate({
          left: newOffset + 'px'
        }, 500, () => this.toggleIndicators())
      }
    }
  }
</script>
