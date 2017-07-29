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
      <div class="search-result-tab">
        <div>
          <b class="result-header">
            <a href="#" class="repo-name-head">{{name[0]}}</a>
            <b class="grade">
              {{grade[0]}}
            </b>
          </b>
          <p class="result-content">
            {{abstract[0]}}
          </p>
        </div>
        <div class="result-label">
          <span class="label-list" v-if="lab[0]">{{label[0]}}</span>
          <span class="label-list" v-if="lab[1]">{{label[1]}}</span>
          <span class="label-list" v-if="lab[2]">{{label[2]}}</span>
          <a href="#"><img src="../../../assets/img/mark.png" class="img-collect"></a>
        </div>
      </div>
      <div class="search-result-tab">
        <div>
          <b class="result-header">
            <a href="#" class="repo-name-head">{{name[1]}}</a>
            <b class="grade">
              {{grade[1]}}
            </b>
          </b>
          <p class="result-content">
            {{abstract[1]}}
          </p>
        </div>
        <div class="result-label">
          <span class="label-list" v-if="lab[0]">{{label[0]}}</span>
          <span class="label-list" v-if="lab[1]">{{label[1]}}</span>
          <span class="label-list" v-if="lab[2]">{{label[2]}}</span>
          <a href="#"><img src="../../../assets/img/mark.png" class="img-collect"></a>
        </div>
      </div>
      <div class="search-result-tab">
        <div>
          <b class="result-header">
            <a href="#" class="repo-name-head">{{name[2]}}</a>
            <b class="grade">
              {{grade[2]}}
            </b>
          </b>
          <p class="result-content">
            {{abstract[2]}}
          </p>
        </div>
        <div class="result-label">
          <span class="label-list" v-if="lab[0]">{{label[0]}}</span>
          <span class="label-list" v-if="lab[1]">{{label[1]}}</span>
          <span class="label-list" v-if="lab[2]">{{label[2]}}</span>
          <a href="#"><img src="../../../assets/img/mark.png" class="img-collect"></a>
        </div>
      </div>
      <div class="search-result-tab">
        <div>
          <b class="result-header">
            <a href="#" class="repo-name-head">{{name[3]}}</a>
            <b class="grade">
              {{grade[3]}}
            </b>
          </b>
          <p class="result-content">
            {{abstract[3]}}
          </p>
        </div>
        <div class="result-label">
          <span class="label-list" v-if="lab[0]">{{label[0]}}</span>
          <span class="label-list" v-if="lab[1]">{{label[1]}}</span>
          <span class="label-list" v-if="lab[2]">{{label[2]}}</span>
          <a href="#"><img src="../../../assets/img/mark.png" class="img-collect"></a>
        </div>
      </div>
      <div class="search-result-tab">
        <div>
          <b class="result-header">
            <a href="#" class="repo-name-head">{{name[4]}}</a>
            <b class="grade">
              {{grade[4]}}
            </b>
          </b>
          <p class="result-content">
            {{abstract[4]}}
          </p>
        </div>
        <div class="result-label">
          <span class="label-list" v-if="lab[0]">{{label[0]}}</span>
          <span class="label-list" v-if="lab[1]">{{label[1]}}</span>
          <span class="label-list" v-if="lab[2]">{{label[2]}}</span>
          <a href="#"><img src="../../../assets/img/mark.png" class="img-collect"></a>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
  @import "searchresult.css";
</style>
<script>
  export default {
    name: 'searchresult',
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
