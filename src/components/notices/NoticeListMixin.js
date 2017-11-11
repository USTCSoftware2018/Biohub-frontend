export default {
  methods: {
    load (url) {
      if (!url || this.loading) return

      this.loading = true
      return axios.get(url)
        .then(response => {
          this.loading = false
          this.next = response.data.next
          this._handleNewNotices(response.data.results)
          return response
        }, e => {
          this.loading = false
        })
    },
    _handleNewNotices (notices) {
      notices.forEach(this._handleSingleNotice.bind(this))
    },
    _handleSingleNotice (notice) {
      notice.created_date = new Date(notice.created)
      let index = _.sortedIndexBy(this.notices, notice, n => -n.created_date)
      this.notices.splice(index, 0, notice)
    }
  }
}
