<template>
  <div class="search-result-tab">
    <div>
      <b class="result-header">
        <a href="#" class="repo-name-head">{{name[4]}}</a>
        <b class="grade">
          {{grade[4]}}
        </b>
      </b>
      <p class="result-content">
        {{ abstract[0] }}
      </p>
    </div>
    <div class="result-label">
      <span class="label-list" v-if="lab[0]">{{label[0]}}</span>
      <span class="label-list" v-if="lab[1]">{{label[1]}}</span>
      <span class="label-list" v-if="lab[2]">{{label[2]}}</span>
      <a href="#"><img src="../../../assets/img/mark.png" class="img-collect"></a>
    </div>
  </div>
</template>

<style scoped>
  @import 'Common.css';
  * {
    text-align: left;
  }
</style>

<script>
  export default {
    name: 'RepoView',
    data () {
      return {
        name: [
          'Head one',
          'Another Head',
          'name3',
          'name4',
          'name5',
          'name6',
          'name7'
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
        plab: [
          true,
          true,
          true,
          true,
          true,
          true
        ],
        plabel: [
          'label1',
          'label2',
          'label3',
          'label4',
          'label5',
          'label6'
        ],
        lab: [
          true,
          true,
          true
        ],
        abstract: [
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
    }
  }
</script>
