export default {
  methods: {
    load (url) {
      if (!url || this.loading) return

      this.loading = true
      return axios.get(url)
        .then(response => {
          this.next = response.data.next
          this._handleNewNotices(response.data.results)
          return response
        })
        .always(r => {
          this.loading = false
          return r
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
