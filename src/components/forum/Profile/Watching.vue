<template>
  <div>
    <repo-view v-for="(n, i) in name"
               :name="n"
               :grade="grade[i]"
               :label="label"
               :abstract="abstract[i]" :key="i"></repo-view>
  </div>
</template>

<style scoped>
  .search-result-tab {
    border-bottom: 1px solid #ddd;
  }
</style>

<script>
  import RepoView from '../Common/RepoView.vue'

  export default {
    data () {
      return {
        name: [
          'Head one',
          'Another Head',
          'name3',
          'name4',
          'name5'
        ],
        grade: [
          4.8,
          3.2,
          2.9,
          4.0,
          4.6
        ],
        label: [
          'label1',
          'label2',
          'label3'
        ],
        abstract: [
          'It had been three years since King Zhuang of Chu ascended the throne, ' +
          'It had been three years since King Zhuang of Chu ascended the throne, ' +
          'It had been three years since King Zhuang of Chu ascended the throne, ' +
          'but he had neither issued a decree nor dealt with any duanwenw.com state affairs.' +
          ' Furthermore, there no deeds worth mentioning. ',
          'It had been three years since King Zhuang of Chu ascended the throne, ' +
          'but he had neither issued a decree nor dealt with any duanwenw.com state affairs.',
          'It had been three years since King Zhuang of Chu ascended the throne, ' +
          'but he had neither issued a decree nor dealt with any duanwenw.com state affairs.' +
          ' Furthermore, there no deeds worth mentioning. ',
          'It had been three years since King Zhuang of Chu ascended the throne, ' +
          'but he had neither issued a decree nor dealt with any duanwenw.com state affairs.' +
          ' Furthermore, there no deeds worth mentioning. ',
          ' '
        ]
      }
    },
    components: {
      RepoView
    }
  }
</script>
