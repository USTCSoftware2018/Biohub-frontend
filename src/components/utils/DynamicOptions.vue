<template>
  <option :value="text">{{ category }}</option>
</template>
<script>
  export default {
    name: 'DynamicOptions',
    props: ['text', 'category']
  }
</script>
