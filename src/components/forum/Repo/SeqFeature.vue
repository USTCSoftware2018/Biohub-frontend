<template>
  <div>
    <div class="col-md-6">
      <div id='fContainer'>
      </div>
    </div>
    <div class="col-md-6">
      <div class="featureList">
        <div v-for='item in oriData' class="featureListItem">{{item.type}}</div>
      </div>
    </div>
  </div>
</template>

<style>
</style>

<script>
  import * as d3 from 'd3'
  export default {
    props: ['feaData', 'seqLength'],
    data () {
      return {
        oriData: this.feaData,
        currentAngle: 0,
        colorSpace: {}
      }
    },
    mounted () {
      console.log(this.seqLength)
      _.forEach(this.oriData, (fea) => {
        fea.length = fea.last - fea.first
      })
      this.oriData = _.sortBy(this.oriData, [(o) => {
        return -o.length
      }])
      var width = document.querySelector('#fContainer').offsetWidth
      var height = document.querySelector('.repo-wrapper').offsetHeight - 20
      var radius = Math.min(width, height)
      var colorBase = d3.color('#1695A3')
      var uniq = _.uniqBy(this.oriData, 'type')
      _.forEach(uniq, (x) => {
        this.colorSpace[x.type + 'Color'] = colorBase
        colorBase = colorBase.brighter(2 / uniq.length)
      })
      console.log(this.colorSpace)
      var svg = d3.select('#fContainer')
        .append('svg')
          .attr('width', width)
          .attr('height', height)
        .append('g')
          .attr('transform', 'translate(' + width / 2.0 + ',' + (height / 2.0 + 10) + ')')
      var arc = d3.arc().innerRadius(radius / 2 - 20).outerRadius(radius / 2 - 10).startAngle((d) => {
        return d.first * 2.0 * Math.PI / this.seqLength
      }).endAngle((d) => {
        return this.convertLengthToDegree(d.length) + d.first * 2.0 * Math.PI / this.seqLength
      }).cornerRadius(3)
      svg.selectAll('path').data(this.oriData).enter().append('path').attr('d', arc).attr('style', (d) => {
        console.log('fill:' + this.colorSpace[d.type + 'Color'])
        return 'fill:' + this.colorSpace[d.type + 'Color']
      })
      d3.select('g').insert('path').attr('d', d3.arc().innerRadius(radius / 2 - 20).outerRadius(radius / 2 - 10).startAngle(0).endAngle(2 * Math.PI).cornerRadius(3)).attr('class', 'path-base')
    },
    methods: {
      convertLengthToDegree (d) {
        var r = d / this.seqLength * 2.0 * Math.PI
        if (r < 0.05) {
          return 0.05
        } else return r
      }
    }
  }
</script>