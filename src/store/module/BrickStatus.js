/**
 * Created by ChanYH on 2017/9/12.
 */
function deepCopy (obj) {
  if (typeof obj !== 'object') {
    return obj
  }
  var newobj = {}
  for (var attr in obj) {
    newobj[attr] = deepCopy(obj[attr])
  }
  return newobj
}
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
    for (var index in payload) {
      state.commentsShow['exp' + payload[index].id] = false
    }
  },
  changeUpvoteStatus (state, payload) {
    console.log(payload.index)
    var tmp = deepCopy(state.experienceSet[payload.index])
    tmp.voted = payload.status
    tmp.up_vote_num += payload.flag
    state.experienceSet.splice(payload.index, 1, tmp)
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
        let indexInto = index
        console.log(index)
        if (state.experienceSet[index].voted) {
          axios.post(`/api/forum/experiences/${id}/cancel_up_vote/`).then((response) => {
            commit('changeUpvoteStatus', {
              status: false,
              index: indexInto,
              flag: -1
            })
          }).catch((e) => {
            console.log(e)
          })
        } else {
          axios.post(`/api/forum/experiences/${id}/up_vote/`).then((response) => {
            commit('changeUpvoteStatus', {
              status: true,
              index: indexInto,
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
