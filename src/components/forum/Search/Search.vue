<template>
  <div>
    <top-navbar></top-navbar>
    <div class="search-head">
      <form class="biohub-form">
        <input placeholder="Anything you interest in ..." class="search-input">
        <button class="btn-search">Search</button>
      </form>
    </div>
    <div class="container search-result">
      <div class="row">

      </div>
      <div class="col-md-2"></div>
      <div class="col-md-8">
        <div class="search-table">

          <div id="available-label" style="margin-left: 28px">
            <span>Protable Lable:</span>
            <span class="label-list-select search-lable" v-if="plab[0]">{{plabel[0]}}</span>
            <span class="label-list-select search-lable" v-if="plab[1]">{{plabel[1]}}</span>
            <span class="label-list-select search-lable" v-if="plab[2]">{{plabel[2]}}</span>
            <span class="label-list-select search-lable" v-if="plab[0]">{{plabel[3]}}</span>
            <span class="label-list-select search-lable" v-if="plab[1]">{{plabel[4]}}</span>
            <span class="label-list-select search-lable" v-if="plab[2]">{{plabel[5]}}</span>
          </div>
          <div id="selected-label" style="margin-left: 28px">
            <span>Selected Lable:</span>
            <span class="label-list search-lable" style="background-color: #1695A3">{{label[0]}}</span>
            <span class="label-list search-lable" style="background-color: #1695A3">{{label[1]}}</span>
          </div>
        </div>
        <repo-view v-for="(n, i) in name"
                   :params="{partName: n, grade: grade[i], label: label, intro: abstract[i]}"
                   :key="i"></repo-view>
      </div>
      <div class="col-md-2"></div>
    </div>
    <page-footer></page-footer>
  </div>
</template>
<style scoped>
  .search-table {
    margin-top:40px;
  }
  .search-result {
    text-align: left;
    margin-top: 20px;
  }
  .search-lable {
    color: white;
    background-color: #f1a751;
    border-radius: 1px;
    border: none;
    font-size: 12px;
  }

  .search-line {
    height: 40px;
    font-size: 20px;
    margin:0px 0px 20px;
    padding-left:30px;
  }

  .search-result-tab {
    box-shadow: 2px 2px 10px #cacaca;
    width: 100% !important;
    position: relative;
    padding: 15px 15px 15px 15px;
    margin-top: 60px;
  }

</style>
<script>
  import topNavbar from '../../Common/topNavbar.vue'
  import RepoView from '../Common/RepoView.vue'
  import PageFooter from '../../Common/PageFooter.vue'

  export default {
    name: 'searchresult',
    components: {
      RepoView, PageFooter, topNavbar
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
