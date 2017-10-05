<template>
  <ul class="pager" v-if="hasPrevious || hasNext">
    <li v-if="hasPrevious">
      <router-link :to="previousRoute">Previous</router-link>
    </li>
    <li v-if="hasNext">
      <router-link :to="nextRoute">Next</router-link>
    </li>
  </ul>
</template>

<script>
  export default {
    props: ['hasPrevious', 'hasNext', 'pageNum'],
    computed: {
      nextRoute () {
        let route = {
          name: this.$route.name,
          query: {...this.$route.query},
          params: {...this.$route.params}
        }
        route.query.page = this.pageNum + 1
        console.log(route)
        return route
      },
      previousRoute () {
        let route = {
          name: this.$route.name,
          query: {...this.$route.query},
          params: {...this.$route.params}
        }
        route.query.page = this.pageNum - 1
        return route
      }
    }
  }
</script>
