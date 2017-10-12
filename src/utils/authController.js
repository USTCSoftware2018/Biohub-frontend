import Vue from 'vue'

const secretkey = 'Secret key'

let root
const events = new Vue()

function store (data) {
  Lockr.set('user', Crypto.AES.encrypt(JSON.stringify(data), secretkey).toString())
}

export default {

  on (name, cb) {
    events.$on(name, cb)
    return this
  },

  login (data) {
    store(data)
    root.$set(root, 'user', data)
    events.$emit('login', data)

  },
  fetch () {
    axios.get('/api/users/me/')
      .then(({ data }) => this.login(data))
  },
  logout () {
    store(null)
    root.$set(root, 'user', null)
    events.$emit('logout')
    root.$router.push({name:"login"})
  },
  init (vm) {
    root = vm
    Lockr.prefix = 'biohub_'
    let user = null
    try {
      let bytes = Crypto.AES.decrypt(Lockr.get('user'), secretkey)
      user = JSON.parse(bytes.toString(Crypto.enc.Utf8))
      if (user !== null) this.login(user)
    } catch (e) {
      console.log(e)
    }

    axios.interceptors.response.use((response) => {
      return response
    }, (error) => {
      if (error.response && error.response.status === 403) {
        this.logout()
        console.log('get error')
      }
      return Promise.reject(error)
    })
  }
}
