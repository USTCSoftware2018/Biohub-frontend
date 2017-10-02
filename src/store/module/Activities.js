const state = {
  activities: [],
  hasNext: false,
  nextUrl: '',
  loading: false
}

const mutations = {
  addActivities (state, payload) {
    state.activities = state.activities.concat(payload)
  },
  setNext (state, payload) {
    state.hasNext = payload.hasNext
    state.nextUrl = payload.nextUrl
  },
  setLoading (state, loading) {
    state.loading = loading
  },
  cleanActivities (state) {
    state.activities = []
  }
}

const actions = {
  initActivities ({commit}, {username, type}) {
    commit('cleanActivities')
    commit('setLoading', true)
    if (type === null) {
      axios.get('/api/forum/activities/?user=' + username).then((response) => {
        console.log(response)
        commit('setLoading', false)
        commit('addActivities', response.data.results)
        commit('setNext', {
          hasNext: (response.data.next !== null),
          nextUrl: response.data.next
        })
      }).catch((e) => {
        console.log(e)
        commit('setLoading', false)
      })
    } else {
      axios.get('/api/forum/activities/?user=' + username + '&type=' + type).then((response) => {
        console.log(response)
        commit('setLoading', false)
        commit('addActivities', response.data.results)
        commit('setNext', {
          hasNext: (response.data.next !== null),
          nextUrl: response.data.next
        })
      }).catch((e) => {
        console.log(e)
        commit('setLoading', false)
      })
    }
  },
  loadMoreActivities (context) {
    if ((!context.state.loading) && context.state.hasNext) {
      context.commit('setLoading', true)
      axios.get(context.state.nextUrl).then((response) => {
        console.log(response)
        context.commit('setLoading', false)
        context.commit('addActivities', response.data.results)
        context.commit('setNext', {
          hasNext: (response.data.next !== null),
          nextUrl: response.data.next
        })
      }).catch((e) => {
        console.log(e)
        context.commit('setLoading', false)
      })
    }
  }
}
export default {
  state, mutations, actions
}
