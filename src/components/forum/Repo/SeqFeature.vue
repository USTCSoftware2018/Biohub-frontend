<template>
  <div class="row">
    <div class="col-md-6">
      <div id='fContainer'>
      </div>
    </div>
    <div class="col-md-6">
      <div class="feature-list">
        <p v-for="item in uniqData" class="feature-list-item" :name="item.type">{{item.type}}</p>
      </div>
    </div>
  </div>
</template>

<style>
  div.seq-tooltip {
    position: absolute;
    padding: 5px;
    font: 12px sans-serif;
    background: lightsteelblue;
    border: 0px;
    pointer-events: none;
  }

  div.seq-tooltip small {
    font-size: 10px;
  }
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
      getTooltip () {
        const $tooltip = $('div.seq-tooltip', 'body')

        if ($tooltip.length) return $tooltip[0]

        return $('<div>').addClass('seq-tooltip').css('opacity', 0).appendTo('body')[0]
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

        const tooltipDiv = d3.select(this.getTooltip())
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
            const cursor = d.type === 'brick' ? 'pointer' : 'default'
            return `fill:${this.colorSpace[d.type + 'Color']}; cursor: ${cursor};`
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
            .on('click', d => {
              if (d.type === 'brick') {
                this.$router.push({
                  name: 'Brick',
                  params: {
                    brick: `BBa_${d.label}`
                  }
                })
              }
            })
            .on('mouseover', function (d) {
              const selector = d3.select(this).attr('name')
              d3.select('p[name=' + selector + ']').attr('style', 'text-decoration:underline;')

              if (d) {
                d3.select(this).attr('class', 'path-empty path-hover')

                tooltipDiv.transition().duration(200)
                  .style('opacity', 0.9)
                tooltipDiv.html(`
                  <b>${d.type}: ${d.label}</b>
                  ${d.type === 'brick' ? '<small>(Click to view brick)</small>' : ''}<br>
                  ${d.first} bp - ${d.last} bp`
                )
                  .style('left', (d3.event.pageX) + 'px')
                  .style('top', (d3.event.pageY) + 'px')
              }
            }).on('mouseout', function () {
              const selector = d3.select(this).attr('name')
              svg.selectAll('path[name=' + selector + ']').attr('class', 'path-empty')
              d3.select('p[name=' + selector + ']').attr('style', 'text-decoration:none;')

              tooltipDiv.transition()
                .duration(500)
                .style('opacity', 0)
            })

          d3
            .selectAll('.feature-list-item')
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
