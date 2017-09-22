<template>
  <div id='fContainer'>
  </div>
</template>

<style>
  #fContainer {
    position: relative;
    width: 100%;
    height: 20px;
    background-color: cornflowerblue;
    margin-top: 5px;
  }
  .fea-button {
    top: 0px;
    position: absolute;
    height: 20px;
    outline: none;
    box-shadow: none;
    border: none;
    padding: 0 2px;
  }
  .color-stop {
    background-color: rosybrown;
  }
  .color-mutation {
    background-color: salmon;
  }
  .color-protein {
    background-color: aquamarine;
  }
  .color-s_mutation {
    background-color: olivedrab;
  }
  .color-rarrow_p {
    background-color: lavender;
  }
</style>

<script>
  export default {
    props: ['feaData'],
    data () {
      return {
        endPoint: 0,
        length: 460
      }
    },
    mounted () {
      this.endPoint = _.result(_.find(this.feaData, (fea) => {
        return (fea.type === 'stop' | fea.type === 'new_feature')
      }), 'last') + 10
      _.forEach(this.feaData, (fea) => {
        $('#fContainer').append('<button type="button" class="fea-button color-' + fea.type +
          '" style="left: ' + fea.first / this.endPoint * this.length +
          'px" data-toggle="tooltip" data-placement="bottom" title="' + fea.type + '"></button>')
      })
      $(function () {
        $('[data-toggle="tooltip"]').tooltip()
      })
    }
  }
</script>