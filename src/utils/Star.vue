<template>
  <div class="star-container" @mousemove="calcMouse" v-if="initial !== null">
    <div class="star-container-empty"  @click="submit">
      <span class="empty-star" v-bind:class="{cursorPointer: canChange}"></span>
      <span class="empty-star" v-bind:class="{cursorPointer: canChange}"></span>
      <span class="empty-star" v-bind:class="{cursorPointer: canChange}"></span>
      <span class="empty-star" v-bind:class="{cursorPointer: canChange}"></span>
      <span class="empty-star" v-bind:class="{cursorPointer: canChange}"></span>
    </div>
    <div class="star-container-full" @mousemove="calcMouse"  @click="submit" v-bind:style="{width: wSize + '%'}">
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
    vertical-align: middle;
    font-size: 18px !important;
  }
  .star-container-empty {
    z-index: -1;
    width: auto;
    height: auto;
  }
  .star-container-full {
    z-index: 1;
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
    margin-left: 2px;
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
        wSize: 0,
        disabled: false
      }
    },
    computed: {
    },
    mounted () {
      if (this.initial === undefined) return

      if (this.initial === null) {
        this.disabled = true
      }
      let initialScore = parseFloat(this.initial)

      if (!isNaN(initialScore)) {
        this.changeValue(this.initial)
        this.canChange = false
      }
    },
    methods: {
      calcMouse (e) {
        if (this.canChange) {
          this.wSize = Math.round(e.layerX / 12) / 2.0 * 20
        }
      },
      submit () {
        if (this.canChange) {
          axios.post('/api/forum/bricks/' + this.brickName + '/rate/', {
            score: (this.wSize / 20).toFixed(1)
          }).then((response) => {
            console.log(response)
          })
        }
        this.canChange = false
      },
      changeValue (value) {
        this.wSize = value * 20
      }
    }
  }
</script>
