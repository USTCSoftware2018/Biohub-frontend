<template>
  <div class="star-container">
    <div class="star-container-empty" @mousemove="calcMouse" @click="submit">
      <span class="empty-star" v-bind:class="{cursorPointer: canChange}"></span>
      <span class="empty-star" v-bind:class="{cursorPointer: canChange}"></span>
      <span class="empty-star" v-bind:class="{cursorPointer: canChange}"></span>
      <span class="empty-star" v-bind:class="{cursorPointer: canChange}"></span>
      <span class="empty-star" v-bind:class="{cursorPointer: canChange}"></span>
    </div>
    <div class="star-container-full" v-bind:style="{width: wSize + '%'}">
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
    position: relative;
    display: inline-block;
  }
  .star-container-empty {
    z-index: 1;
    width: auto;
    height: auto;
  }
  .star-container-full {
    z-index: -1;
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
  }
  .empty-star:first-child, .full-star:first-child {
    margin-left: 3px;
  }
  .empty-star:last-child, .full-star:last-child {
    margin-right: 3px;
  }
  .full-star {
    background: url('../assets/img/star-filled.svg') no-repeat;
    width: 20px;
    height: 20px;
    background-size: cover;
    display: inline-block;
  }
  .cursorPointer {
    cursor: pointer;
  }

</style>
<script>
  export default {
    props: ['isEnable','initial'],
    data () {
      return {
        canChange: this.isEnable,
        wSize: 0
      }
    },
    mounted () {
      if (this.initial) {
        this.changeValue(this.initial)
        this.canChange = false
      }
    },
    methods: {
      calcMouse (e) {
        if (this.canChange) {
          this.wSize = Math.round((e.layerX-1)/12.5)/2.0 * 20
        }
      },
      submit () {
        this.canChange = false
      },
      changeValue (value) {
        this.wSize = value * 20
      }
    }
  }
</script>