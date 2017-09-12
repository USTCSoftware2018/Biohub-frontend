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
