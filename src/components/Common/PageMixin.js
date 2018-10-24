import { normalizedPageNum } from '@/utils/page'
import Pager from './Pager'

export default {
  components: { Pager },
  methods: {
    _load (url) {
      if (this.loading || !url) return
      this.cancel && this.cancel()

      let page = parseInt(this.$route.query.page)

      if (isNaN(page) || page <= 0) page = 1
      this.pageNum = page

      this.loading = true
      return axios.get('https://api-us.biohub.tech' + url, {
        cancelToken: new axios.CancelToken(c => {
          this.cancel = c
        }),
        params: {
          ...this.getQueryParams(),
          page
        }
      }).always(response => {
        this.loading = false
        this.cancel = null

        return response
      }).then(response => {
        this.pageNum = normalizedPageNum(response)
        this.hasNext = response.data.next !== null
        this.hasPrevious = response.data.previous !== null
        this.processResponse(response)

        return response
      })
    }
  }
}
