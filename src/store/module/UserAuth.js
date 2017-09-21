import Lockr from 'lockr'
import Crypto from 'crypto-js'
Lockr.prefix = 'biohub_'
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
  },
  hasLogin (state) {
    return state.loggedUser
  }
}

const mutations = {
  login (state, user) {
    console.log(user)
    state.loggedUser = user
    Lockr.set('user', Crypto.AES.encrypt(JSON.stringify(user), 'secretkey').toString())
    console.log(Crypto.AES.encrypt(JSON.stringify(user), 'secretkey').toString())
  },
  logout (state) {
    state.loggedUser = null
    Lockr.set('user', '')
  },
  loadFromLS (state) {
    let bytes = Crypto.AES.decrypt(Lockr.get('user'), 'secretkey')
    state.loggedUser = JSON.parse(bytes.toString(Crypto.enc.Utf8))
  },
  loginFeedback (state, status) {
    state.loginHasError = status
  },
  loginError (state, payload) {
    state.loginErrorMessage = payload
  }
}

const actions = {
  loginAuth ({commit}, userInput) {
    if (userInput.username === '') {
      commit('loginFeedback', true)
      commit('loginError', {
        message: 'Username can\'t be blank.',
        part: 'username'
      })
      return
    }
    if (userInput.password === '') {
      commit('loginFeedback', true)
      commit('loginError', {
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
      commit('login', response.data)
      commit('loginFeedback', false)
      window.location.href = '/forum'
    }).catch(e => {
      if (e.response.status === 400) {
        commit('loginFeedback', true)
        commit('loginError', 'Username or password incorrect.')
      }
    })
  },
  logout (context) {
    axios.get('/api/users/logout/').then((response) => {
      context.commit('logout')
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
