let promise = null
let solved = false

export default {
  ready (cb) {
    if (promise === null) {
      const id = setInterval(() => {
        if (promise === null) return
        clearInterval(id)
        promise.then(cb)
      }, 500)
      return
    }
    if (solved) {
      cb()
    } else {
      promise.then(() => {
        solved = true
        cb()
      }, () => {
        solved = true
      })
    }
  },
  fetching (factory) {
    promise = new Promise(factory)
    return promise
  },
  clear () {
    promise = null
    solved = false
  }
}
