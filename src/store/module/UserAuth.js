const state = {
  loggedUser: null,
  loginHasError: false,
  loginErrorMessage: ''
}
const getters = {
  userName (state) {
    if (state.loggedUser) return state.loggedUser.username
  },
  userId (state) {
    if (state.loggedUser) return state.loggedUser.id
  }
}

const mutations = {
  login (state, user) {
    state.loggedUser = user
  },
  logout (state) {
    state.loggedUser = null
  },
  loginFeedback (state, status) {
    state.loginHasError = status
  },
  loginError (state, message) {
    state.loginErrorMessage = message
  }
}

const actions = {
  loginAuth (context, userInput) {
    if (userInput.username === '') {
      context.commit('loginFeedback', true)
      context.commit('loginError', 'Username can\'t be blank.')
      return
    }
    if (userInput.password === '') {
      context.commit('loginFeedback', true)
      context.commit('loginError', 'Password can\'t be blank.')
      return
    }
    axios.post('/api/users/login/', {
      username: userInput.username,
      password: userInput.password
    }).then((response) => {
      console.log(response)
      context.commit('login', response.data)
      context.commit('loginFeedback', false)
      window.location.href = '/forum'
    }).catch(e => {
      if (e.response.status === 400) {
        context.commit('loginFeedback', true)
        context.commit('loginError', 'Username or password incorrect.')
      }
      console.log(e)
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
