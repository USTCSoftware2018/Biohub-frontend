<template>
  <div class="search-result">
    <div class="col-md-3"></div>
    <div class="col-md-6">
      <div class="search-table">
        <div class="search-line">
          <img src="../../../assets/img/brand.png"
               style="height: 30px;width: 100px;">
          <input placeholder="Search..." class="search">
          <button class="btn btn-forum search-button">Search</button>
        </div>
        <div id="available-label">
          <span>Protable Lable:</span>
          <span class="label-list-select" v-if="plab[0]">{{plabel[0]}}</span>
          <span class="label-list-select" v-if="plab[1]">{{plabel[1]}}</span>
          <span class="label-list-select" v-if="plab[2]">{{plabel[2]}}</span>
          <span class="label-list-select" v-if="plab[0]">{{plabel[3]}}</span>
          <span class="label-list-select" v-if="plab[1]">{{plabel[4]}}</span>
          <span class="label-list-select" v-if="plab[2]">{{plabel[5]}}</span>
        </div>
        <div id="selected-label">
          <span>Selected Lable:</span>
          <span class="label-list">{{label[0]}}</span>
          <span class="label-list">{{label[1]}}</span>
        </div>
      </div>
      <repo-view v-for="(n, i) in name"
                 :name="n"
                 :grade="grade[i]"
                 :label="label"
                 :abstract="abstract[i]" :key="i"></repo-view>
    </div>
  </div>
</template>
<style scoped>
  * {
    text-align: left;
  }

  .search-line {
    height: 40px;
    font-size: 20px;
    margin-bottom: 10px;
  }

  .search-result-tab {
    box-shadow: 2px 2px 10px #cacaca;
    width: 600px !important;
    position: relative;
    padding: 15px 15px 15px 15px;
    margin-top: 60px;
  }

</style>
<script>
  import RepoView from '../Common/RepoView.vue'

  export default {
    name: 'searchresult',
    components: {
      RepoView
    },
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
