<template>
  <div>
    <top-navbar></top-navbar>
    <div class="search-head">
      <form class="biohub-form">
        <input placeholder="Anything you interest in ..." class="search-input" v-model="searchKeyword" @click="$route.push
                ({name: 'Search',params:{ keyword: searchKeyword}})">
        <button class="btn-search">Search</button>
      </form>
    </div>
    <div class="container search-result">
      <div class="col-md-1"></div>
      <div class="col-md-10">
        <search-result></search-result>
        <search-result></search-result>
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
  import SearchResult from './SearchResult.vue'
  export default {
    components: {
      RepoView, PageFooter, topNavbar, SearchResult
    },
    mounted () {
      if (this.$route.params.keyword) {
        this.searchKeyword = this.$route.params.keyword
        console.log('keyword detected')
      }
    },
    data () {
      return {
        searchKeyword: '',
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
