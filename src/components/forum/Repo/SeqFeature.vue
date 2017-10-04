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
  .path-base {
    fill: #D0D3C5;
  }
  .path-protein {
    fill: #56B1BF;
  }
  .path-mutation {
    fill: #0B708A;
  }
  .path-s_mutation {
    fill: #D73A31;
  }
  .path-rarrow_p {
    fill: #032B2F;
  }
  .path-new_feature {
    fill: #CFF09E;
  }
</style>

<script>
  import * as d3 from 'd3'
  export default {
    props: ['feaData'],
    data () {
      return {
        oriData: this.feaData,
        currentAngle: 0,
        maxLength: 0
      }
    },
    mounted () {
      _.forEach(this.oriData, (fea) => {
        fea.length = fea.last - fea.first
      })
      this.oriData = _.sortBy(this.oriData, [(o) => {
        return -o.length
      }])
      var width = document.querySelector('#fContainer').offsetWidth
      var height = document.querySelector('.repo-wrapper').offsetHeight - 20
      var radius = Math.min(width, height)
      console.log(radius)
      var svg = d3.select('#fContainer')
        .append('svg')
          .attr('width', width)
          .attr('height', height)
        .append('g')
          .attr('transform', 'translate(' + width / 2.0 + ',' + (height / 2.0 + 10) + ')')
      var arc = d3.arc().innerRadius(radius / 2 - 20).outerRadius(radius / 2 - 10).startAngle((d) => {
        return d.first * 2.0 * Math.PI / this.maxLength
      }).endAngle((d) => {
        return this.convertLengthToDegree(d.length) + d.first * 2.0 * Math.PI / this.maxLength
      })
      this.maxLength = _.result(_.find(this.feaData, {'type': 'stop'}), 'last')
      console.log(this.maxLength)
      svg.selectAll('path').data(this.oriData).enter().append('path').attr('d', arc).attr('class', (d) => {
        return 'path-' + d.type
      })
    },
    methods: {
      convertLengthToDegree (d) {
        var r = d / this.maxLength * 2.0 * Math.PI
        if (r < 0.05) {
          return 0.05
        } else return r
      }
    }
  }
</script>