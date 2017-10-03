<template>
  <div id='fContainer'>
  </div>
</template>

<style>
  path {
    fill: steelblue;
  }
</style>

<script>
  import * as d3 from 'd3'
  export default {
    props: ['feaData'],
    data () {
      return {
        currentAngle: 0,
        maxLength: 0
      }
    },
    mounted () {
      var width = document.querySelector('#fContainer').width
      var height = document.querySelector('#fContainer').height
      var svg = d3.select('#fContainer')
        .append('svg')
          .attr('width', width)
          .attr('height', height)
        .append('g')
          .attr('transform', 'translate(100,70)')
      var arc = null
      this.maxLength = _.result(_.find(this.feaData, {'type': 'stop'}), 'last')
      console.log(this.maxLength)
      _.forEach(this.feaData, (fea) => {
        arc = d3.arc().innerRadius(40).outerRadius(50).startAngle(fea.first * 2.0 * Math.PI / this.maxLength).endAngle(2.0 * Math.PI * fea.last / this.maxLength)
        svg.append('path').attr('d', arc())
      })
    }
  }
</script>