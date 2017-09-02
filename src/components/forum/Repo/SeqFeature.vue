<template>
  <div id='fContainer'>
    <button type="button" data-toggle="tooltip" data-placement="bottom" title="Tooltip on top"></button>
  </div>
</template>

<style scoped>
  #fContainer {
    position: relative;
    width: 100%;
    height: 20px;
    background-color: cornflowerblue;
    border-radius: 5px;
    margin-top: 5px;
  }
  button {
    top: 0px;
    position: absolute;
    height: 20px;
    outline: none;
    box-shadow: none;
    border: none;
  }
</style>

<script>
  export default {
    props: ['feaData'],
    data () {
      return {
        endPoint: 0
      }
    },
    created () {
      this.endPoint = _.result(_.find(this.feaData, (fea) => {
        return (fea.feature_type === 'stop' | fea.feature_type === 'new_feature')
      }), 'end_loc')
      $(function () {
        console.log($('[data-toggle="tooltip"]'))
        $('[data-toggle="tooltip"]').tooltip()
      })
    }
  }
</script>