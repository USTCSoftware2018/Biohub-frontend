/**
 * Created by ChanYH on 2017/9/12.
 */
const state = {
  brickId: 0,
  experienceSet: [],
  hasStarred: false,
  hasRated: false,
  hasWatched: false
}

const getters = {
}

const mutations = {
  initBrick (state, payload) {
    state.brickId = payload.id
  },
  initBrickExperience (state, payload) {
    state.experienceSet = payload
  },
  upvote (state, id) {
    for (var index in state.experienceSet) {
      if (state.experienceSet[index].id === id) {
        state.experienceSet[index].voted = true
        state.experienceSet[index].up_vote_num += 1
      }
    }
  },
  changeUpvoteStatus (state, payload) {
    state.experienceSet[payload.index].voted = payload.status
    state.experienceSet[payload.index].up_vote_num += payload.flag
  }
}

const actions = {
  loadBrick (context, id) {
    axios.get(`/api/forum/bricks/${id}/`).then((response) => {
      context.commit('initBrick', response.data)
    })
    axios.get(`/api/forum/bricks/${id}/experiences/`).then((response) => {
      context.commit('initBrickExperience', response.data.results)
    })
  },
  upVote ({state, commit}, id) {
    for (var index in state.experienceSet) {
      if (state.experienceSet[index].id === id) {
        if (state.experienceSet[index].voted) {
          axios.post(`/api/forum/experiences/${id}/cancel_up_vote/`).then((response) => {
            commit('changeUpvoteStatus', {
              status: false,
              index: index,
              flag: -1
            })
          }).catch((e) => {
            console.log(e)
          })
        } else {
          axios.post(`/api/forum/experiences/${id}/up_vote/`).then((response) => {
            commit('changeUpvoteStatus', {
              status: true,
              index: index,
              flag: 1
            })
          }).catch((e) => {
            console.log(e)
          })
        }
      }
    }
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}
