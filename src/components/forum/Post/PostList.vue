<template>
  <div>
    <post-item v-for="post in posts" :post="post" :key="post.id"></post-item>
    <pager :hasNext="hasNext" :hasPrevious="hasPrevious" :pageNum="pageNum"></pager>
  </div>
</template>

<script>
  import PostItem from './PostItem'
  import PageMixin from '@/components/Common/PageMixin'

  export default {
    props: ['expId'],
    components: { PostItem },
    mixins: [PageMixin],
    data () {
      return {
        posts: [],
        loading: false,
        hasNext: false,
        hasPrevious: false,
        pageNum: 0
      }
    },
    methods: {
      getQueryParams () {
        return {}
      },
      loadPosts () {
        return this._load(`/api/forum/experiences/${this.expId}/posts/`)
      },
      processResponse (response) {
        this.posts = response.data.results
      },
      prepend (item) {
        this.posts.splice(0, 0, item)
      }
    },
    mounted () {
      this.loadPosts()
    },
    watch: {
      expId () {
        this.loadPosts()
      },
      $route () {
        this.loadPosts()
      }
    }
  }
</script>
