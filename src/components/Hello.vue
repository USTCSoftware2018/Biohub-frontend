<template>
  <div>
    <img src="../assets/img/brand.png" width="530px" style="padding-top: 10em;">
    <div class="hello">
      <h1>{{ msg }}</h1>
      <h2>USTCSoftware 2017</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Biohub Init'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
