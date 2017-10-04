import axios from 'axios'
class ActivityFetcher {
  constructor (userName, activityType = null, page = 1) {
    this.userName = userName
    this.activityType = activityType
    this.page = page
    this.results = []
    this.hasNext = false
    this.loading = true

    if (activityType === null) {
      this.filt = ''
    } else {
      this.filt = 'type=' + activityType
    }

    axios.get('/api/forum/activities/?user=' + this.userName + this.filt).then((response) => {
      console.log(response)
      this.results = this.results.concat(response.data.results)
      this.loading = false
      this.hasNext = response.data.next !== null
      this.nextPage = response.data.next
    }).catch((e) => {
      console.log(e.response)
    })
  }
}

export default ActivityFetcher
