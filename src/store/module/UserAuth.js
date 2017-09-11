const state = {
  loggedUser: null,
  loginHasError: false,
  loginErrorMessage: '',
  loginErrorPart: ''
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
  loginError (state, payload) {
    state.loginErrorMessage = payload.message
    state.loginErrorPart = payload.part
  }
}

const actions = {
  loginAuth (context, userInput) {
    if (userInput.username === '') {
      context.commit('loginFeedback', true)
      context.commit('loginError', {
        message: 'Username can\'t be blank.',
        part: 'username'
      })
      return
    }
    if (userInput.password === '') {
      context.commit('loginFeedback', true)
      context.commit('loginError', {
        message: 'Password can\'t be blank.',
        part: 'password'
      })
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
