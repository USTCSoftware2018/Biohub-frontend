<template>
</template>

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
    }
  }
</script>