<template>
  <div class="row">
    <div class="col-md-6">
      <div id='fContainer'>
      </div>
    </div>
    <div class="col-md-6">
      <div class="feature-list">
        <p v-for='item in uniqData' class="feature-list-item" :name="item.type">{{item.type}}</p>
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
        currentAngle: 0,
        colorSpace: {},
        uniqData: null
      }
    },
    watch: {
      feaData () {
        this.refresh()
      }
    },
    mounted () {
      this.refresh()
    },
    methods: {
      convertLengthToDegree (d) {
        var r = d / this.seqLength * 1.9 * Math.PI
        if (r < 0.02) {
          return 0.02
        } else return r
      },
      refresh () {
        document.querySelector('#fContainer').innerHTML = ''

        const width = document.querySelector('#fContainer').offsetWidth
        const height = document.querySelector('.basic-info-container').offsetHeight - 20
        const radius = Math.min(width, height)
        let colorBase = d3.color('#1695A3')
        let oriData = this.feaData.slice()
        _.forEach(oriData, (fea) => {
          fea.length = fea.last - fea.first
        })
        oriData = _.sortBy(oriData, [(o) => {
          return -o.length
        }])
        this.$set(this, 'uniqData', _.uniqBy(oriData, 'type'))
        _.forEach(this.uniqData, (x) => {
          this.colorSpace[x.type + 'Color'] = colorBase
          colorBase = colorBase.brighter(2 / this.uniqData.length)
        })

        d3
          .transition()
          .duration(100)
          .ease(d3.easeLinear)
        const svg = d3
          .select('#fContainer')
          .append('svg')
          .attr('width', width)
          .attr('height', height)
          .append('g')
          .attr('transform', 'translate(' + width / 2.0 + ',' + (height / 2.0 + 10) + ')')
        const arc = d3
          .arc()
          .innerRadius(radius / 2 - 25)
          .outerRadius(radius / 2 - 10)
          .startAngle((d) => {
            return d.first * 1.9 * Math.PI / this.seqLength
          }).endAngle((d) => {
            const result = this.convertLengthToDegree(d.length) + d.first * 1.9 * Math.PI / this.seqLength
            const times = d.type === 'stop' ? 0.99 : 1

            return result * times
          }).cornerRadius(3)

        svg
          .selectAll('path')
          .data(oriData)
          .enter()
          .append('path')
          .attr('d', arc)
          .attr('style', (d) => {
            return 'fill:' + this.colorSpace[d.type + 'Color']
          }).attr('name', (d) => d.type)

        d3
          .select('g')
          .insert('path')
          .attr(
            'd',
            d3
              .arc()
              .innerRadius(radius / 2 - 25)
              .outerRadius(radius / 2 - 10)
              .startAngle(0)
              .endAngle(1.9 * Math.PI)
              .cornerRadius(3)
          ).attr('class', 'path-base')

        this.$nextTick(() => {
          svg
            .selectAll('path')
            .on('mouseover', function () {
              const selector = d3.select(this).attr('name')
              svg.selectAll('path[name=' + selector + ']').attr('class', 'path-empty path-hover')
              d3.select('p[name=' + selector + ']').attr('style', 'text-decoration:underline;')
            }).on('mouseout', function () {
              const selector = d3.select(this).attr('name')
              svg.selectAll('path[name=' + selector + ']').attr('class', 'path-empty')
              d3.select('p[name=' + selector + ']').attr('style', 'text-decoration:none;')
            })

          d3
            .selectAll('.featureListItem')
            .on('mouseover', function () {
              const selector = d3.select(this).attr('name')
              svg.selectAll('path[name=' + selector + ']').attr('class', 'path-empty path-hover')
              d3.select('p[name=' + selector + ']').attr('style', 'text-decoration:underline;')
            }).on('mouseout', function () {
              const selector = d3.select(this).attr('name')
              svg.selectAll('path[name=' + selector + ']').attr('class', 'path-empty')
              d3.select('p[name=' + selector + ']').attr('style', 'text-decoration:none;')
            })
        })
      }
    }
  }
</script>
