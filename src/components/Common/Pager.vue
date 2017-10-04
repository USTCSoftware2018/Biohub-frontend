<template>
  <ul class="pager" v-if="hasPrevious || hasNext">
    <li v-if="hasPrevious">
      <router-link :to="previousRoute">
        Previous
      </router-link>
    </li>
    <li v-if="hasNext">
      <router-link :to="nextRoute">Next</router-link>
    </li>
  </ul>
</template>

<script>
  export default {
    props: ['hasPrevious', 'hasNext', 'nextRoute', 'previousRoute']
  }
</script>
