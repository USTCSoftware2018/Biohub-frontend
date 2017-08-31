<template>
  <div>
    <top-navbar></top-navbar>
    <div class="search-head">
      <form class="biohub-form">
        <img src="../../../assets/img/icon.png"
             class="snailicon"/>
        <div class="form-group has-feedback" style="width: auto; display: inline-block;">
          <input type="search" placeholder="Anything you interest in ..." class="search-input" v-model="searchKeyword"
                 v-on:keydown.enter.prevent="intoSearch">
          <a class="form-control-feedback"
             href="javascript:;" style="pointer-events: auto;top: 3.7em; right: 0.4em;"
             v-if="searchKeyword !== ''"
             v-on:click="searchKeyword = ''">
            <i class="fa fa-times" style="font-size: 1.8em; color: #999!important;"></i>
          </a>
        </div>
        <button class="btn-search" @click.prevent="intoSearch">Search</button>
        <div class="label-container">
          <label class="checkbox-inline">
            <input type="checkbox" id="inlineCheckbox1" value="option1"> 1
          </label>
          <label class="checkbox-inline">
            <input type="checkbox" id="inlineCheckbox2" value="option2"> 2
          </label>
          <label class="checkbox-inline">
            <input type="checkbox" id="inlineCheckbox3" value="option3"> 3
          </label>
        </div>
      </form>
    </div>
    <div class="container search-result">
      <div class="col-md-1"></div>
      <div class="col-md-10">
        <search-result></search-result>
        <search-result></search-result>
      </div>
      <div class="col-md-2"></div>
    </div>
    <page-footer></page-footer>
  </div>
</template>
<style scoped>
</style>
<script>
  import topNavbar from '../../Common/topNavbar.vue'
  import PageFooter from '../../Common/PageFooter.vue'
  import SearchResult from './SearchResult.vue'

  export default {
    methods: {
      intoSearch () {
        let _this = this
        this.$router.push({
          name: 'Search',
          params: {
            keyword: _this.searchKeyword
          }
        })
      }
    },
    components: {
      PageFooter, topNavbar, SearchResult
    },
    mounted () {
      if (this.$route.params.keyword) {
        this.searchKeyword = this.$route.params.keyword
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
