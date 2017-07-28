<template>
  <div>
    <top-navbar></top-navbar>
    <div id="searchResult">
      <div style="text-align: left; border-bottom: solid;border-color: #adadad;padding-bottom: 30px">
        <img src="../../../assets/img/brand.png" style="margin-top: 80px;margin-left: 150px;height: 50px;width: auto">
        <!-- <b style="" class="brand_b">Biohub</b> -->
        <input placeholder="Search..." class="search search_input">
        <button class="search_button search">Search</button>
        <div class="result_lable">
          <span style="font-size: 14px;font-family: 'Microsoft YaHei',sans-serif;position: relative;left: 480px">Protable Lable:</span>
          <span class="lable_list_select" v-if="plab[0]">{{plable[0]}}</span>
          <span class="lable_list_select" v-if="plab[1]">{{plable[1]}}</span>
          <span class="lable_list_select" v-if="plab[2]">{{plable[2]}}</span>
          <span class="lable_list_select" v-if="plab[0]">{{plable[3]}}</span>
          <span class="lable_list_select" v-if="plab[1]">{{plable[4]}}</span>
          <span class="lable_list_select" v-if="plab[2]">{{plable[5]}}</span>
        </div>
      </div>
      <div>
        <div style="position: relative;left: 400px;top: 80px;">
          <span style="font-size: 14px;font-family: 'Microsoft YaHei',sans-serif;">Selected Lable:</span>
          <span class="lable_list" style="position: relative;left: 20px">{{lable[0]}}</span>
          <span class="lable_list" style="position: relative;left: 20px">{{lable[1]}}</span>
        </div>
        <div class="search_result">
          <div>
            <b class="result_header">
              <a href="#" class="name_a">{{name[0]}}</a>
              <b class="grade">
                {{grade[0]}}
              </b>
            </b>
            <p class="result_content">
              {{abstract[0]}}
            </p>
          </div>
          <div class="result_lable">
            <span class="lable_list" v-if="lab[0]">{{lable[0]}}</span>
            <span class="lable_list" v-if="lab[1]">{{lable[1]}}</span>
            <span class="lable_list" v-if="lab[2]">{{lable[2]}}</span>
            <a href="#"><img src="../../../assets/img/mark.jpg" class="img_collect"></a>
          </div>
        </div>
      </div>

      <div class="search_result">
        <div>
          <b class="result_header">
            <a href="#" class="name_a">{{name[1]}}</a>
            <b class="grade">
              {{grade[1]}}
            </b>
          </b>
          <p class="result_content">
            {{abstract[1]}}
          </p>
        </div>
        <div class="result_lable">
          <span class="lable_list" v-if="lab[0]">{{lable[0]}}</span>
          <span class="lable_list" v-if="lab[1]">{{lable[1]}}</span>
          <span class="lable_list" v-if="lab[2]">{{lable[2]}}</span>
          <a href="#"><img src="../../../assets/img/mark.jpg" class="img_collect"></a>
        </div>
      </div>
      <div class="search_result">
        <div>
          <b class="result_header">
            <a href="#" class="name_a">{{name[2]}}</a>
            <b class="grade">
              {{grade[2]}}
            </b>
          </b>
          <p class="result_content">
            {{abstract[2]}}
          </p>
        </div>
        <div class="result_lable">
          <span class="lable_list" v-if="lab[0]">{{lable[0]}}</span>
          <span class="lable_list" v-if="lab[1]">{{lable[1]}}</span>
          <span class="lable_list" v-if="lab[2]">{{lable[2]}}</span>
          <a href="#"><img src="../../../assets/img/mark.jpg" class="img_collect"></a>
        </div>
      </div>
      <div class="search_result">
        <div>
          <b class="result_header">
            <a href="#" class="name_a">{{name[3]}}</a>
            <b class="grade">
              {{grade[3]}}
            </b>
          </b>
          <p class="result_content">
            {{abstract[3]}}
          </p>
        </div>
        <div class="result_lable">
          <span class="lable_list" v-if="lab[0]">{{lable[0]}}</span>
          <span class="lable_list" v-if="lab[1]">{{lable[1]}}</span>
          <span class="lable_list" v-if="lab[2]">{{lable[2]}}</span>
          <a href="#"><img src="../../../assets/img/mark.jpg" class="img_collect"></a>
        </div>
      </div>
      <div class="search_result">
        <div>
          <b class="result_header">
            <a href="#" class="name_a">{{name[4]}}</a>
            <b class="grade">
              {{grade[4]}}
            </b>
          </b>
          <p class="result_content">
            {{abstract[4]}}
          </p>
        </div>
        <div class="result_lable">
          <span class="lable_list" v-if="lab[0]">{{lable[0]}}</span>
          <span class="lable_list" v-if="lab[1]">{{lable[1]}}</span>
          <span class="lable_list" v-if="lab[2]">{{lable[2]}}</span>
          <a href="#"><img src="../../../assets/img/mark.jpg" class="img_collect"></a>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
  @import "searchresult.scss";
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
        lable: [
          'lable1',
          'lable2',
          'lable3'
        ],
        plab: [
          true,
          true,
          true,
          true,
          true,
          true
        ],
        plable: [
          'lable1',
          'lable2',
          'lable3',
          'lable4',
          'lable5',
          'lable6'
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
