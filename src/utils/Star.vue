<template>
  <div class="star-container" @click="calcMouse">
    <div class="star-container-empty" ref="stars" :data-toggle="!isEnable || 'tooltip'" data-title="click to rate">
      <span class="empty-star" v-bind:class="{cursorPointer: canChange}"></span>
      <span class="empty-star" v-bind:class="{cursorPointer: canChange}"></span>
      <span class="empty-star" v-bind:class="{cursorPointer: canChange}"></span>
      <span class="empty-star" v-bind:class="{cursorPointer: canChange}"></span>
      <span class="empty-star" v-bind:class="{cursorPointer: canChange}"></span>
    </div>
    <div class="star-container-full" @click="freeze" v-bind:style="{width: wSize + '%'}">
      <span class="full-star" v-bind:class="{cursorPointer: canChange}"></span>
      <span class="full-star" v-bind:class="{cursorPointer: canChange}"></span>
      <span class="full-star" v-bind:class="{cursorPointer: canChange}"></span>
      <span class="full-star" v-bind:class="{cursorPointer: canChange}"></span>
      <span class="full-star" v-bind:class="{cursorPointer: canChange}"></span>
    </div>
  </div>
</template>

<style scoped>
  .star-container {
    z-index: 0;
    position: relative;
    display: inline-block;
    vertical-align: middle;
    font-size: 18px !important;
  }
  .star-container-empty {
    z-index: -100;
    width: auto;
    height: auto;
  }
  .star-container-full {
    z-index: -97;
    position: absolute;
    top: 0;
    margin: auto;
    overflow: hidden;
    white-space: nowrap;
    -webkit-transition: width 0.2s;
    -moz-transition: width 0.2s;
    -ms-transition: width 0.2s;
    -o-transition: width 0.2s;
    transition: width 0.2s;
  }
  .empty-star {
    background: url('../assets/img/star-empty.svg') no-repeat;
    width: 20px;
    height: 20px;
    background-size: cover;
    display: inline-block;
    margin: 0;
    padding: 0;
    border: none;
  }
  .empty-star:first-child, .full-star:first-child {
    margin-left: 3px;
  }
  .empty-star:last-child, .full-star:last-child {
    margin-right: 2px;
  }
  .full-star {
    background: url('../assets/img/star-filled.svg') no-repeat;
    width: 20px;
    height: 20px;
    background-size: cover;
    display: inline-block;
    margin: 0;
    padding: 0;
    border: none;
  }
  .cursorPointer {
    cursor: pointer;
  }

</style>
<script>
  export default {
    props: ['isEnable','initial','brickName'],
    data () {
      return {
        canChange: this.isEnable,
        wSize: 0
      }
    },
    computed: {
      score () {
        return (this.wSize / 20).toFixed(1)
      }
    },
    mounted () {
      if (this.initial === undefined) return

      let initialScore = parseFloat(this.initial)

      if (!isNaN(initialScore)) {
        this.changeValue(this.initial)
        this.canChange = false
      }
    },
    methods: {
      calcMouse (e) {
        const stars = $(this.$refs.stars)
        if (this.canChange) {
          this.wSize = Math.round(
            (e.pageX - stars.offset().left) * 1.0 / stars.width() * 100
          )
        }
      },
      release() {
        // this.canChange = true
      },
      freeze () {
        this.canChange = false
      },
      changeValue (value) {
        this.wSize = value * 20
      }
    }
  }
</script>
