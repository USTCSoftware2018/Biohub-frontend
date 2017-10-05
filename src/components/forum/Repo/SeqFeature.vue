<template>
  <div>
    <div class="col-md-6">
      <div id='fContainer'>
      </div>
    </div>
    <div class="col-md-6">
      <div class="featureList">
        <p v-for='item in oriData' class="featureListItem" :name='item.type' >{{item.type}}</p>
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
      var t = d3.transition().duration(100).ease(d3.easeLinear)
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
        return d.first * 1.9 * Math.PI / this.seqLength
      }).endAngle((d) => {
        return this.convertLengthToDegree(d.length) + d.first * 1.9 * Math.PI / this.seqLength
      }).cornerRadius(3)
      svg.selectAll('path').data(this.oriData).enter().append('path').attr('d', arc).attr('style', (d) => {
        console.log('fill:' + this.colorSpace[d.type + 'Color'])
        return 'fill:' + this.colorSpace[d.type + 'Color']
      }).attr('name', (d) => d.type)
      d3.select('g').insert('path').attr('d', d3.arc().innerRadius(radius / 2 - 20).outerRadius(radius / 2 - 10).startAngle(0).endAngle(1.9 * Math.PI).cornerRadius(3)).attr('class', 'path-base')
      svg.selectAll('path').on('mouseover', function () {
        var selector = d3.select(this).attr('name')
        svg.selectAll('path[name=' + selector + ']').attr('class', 'path-empty path-hover')
        d3.select('p[name=' + selector + ']').attr('style', 'text-decoration:underline;')
      })
      svg.selectAll('path').on('mouseout', function () {
        var selector = d3.select(this).attr('name')
        svg.selectAll('path[name=' + selector + ']').attr('class', 'path-empty')
        d3.select('p[name=' + selector + ']').attr('style', 'text-decoration:none;')
      })
      d3.selectAll('.featureListItem').on('mouseover', function () {
        var selector = d3.select(this).attr('name')
        svg.selectAll('path[name=' + selector + ']').attr('class', 'path-empty path-hover')
        d3.select('p[name=' + selector + ']').attr('style', 'text-decoration:underline;')
      })
      d3.selectAll('.featureListItem').on('mouseout', function () {
        var selector = d3.select(this).attr('name')
        svg.selectAll('path[name=' + selector + ']').attr('class', 'path-empty')
        d3.select('p[name=' + selector + ']').attr('style', 'text-decoration:none;')
      })
    },
    methods: {
      convertLengthToDegree (d) {
        var r = d / this.seqLength * 1.9 * Math.PI
        if (r < 0.02) {
          return 0.02
        } else return r
      }
    }
  }
</script>