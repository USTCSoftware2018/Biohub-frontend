import Vue from 'vue'
import authController from '@/utils/authController'

const url = `ws://${location.host}/ws/`
const eventProxy = new Vue()
let socket

function connect () {
  if (socket && socket.readyState !== WebSocket.CLOSED) return

  return new Promise((resolve, reject) => {
    socket = new WebSocket(url)
    socket.addEventListener('open', e => {
      resolve()
      eventProxy.$emit('open', send)
    })
    socket.addEventListener('error', e => {
      eventProxy.$emit('error', e)
    })
    socket.addEventListener('close', e => {
      eventProxy.$emit('close', e)
      switch (e.code) {
        case 1006:
          setTimeout(connect, 30000)
        case 1000:
          return
        default:
          setTimeout(connect, 1000)
      }
    })
    socket.addEventListener('message', e => {
      let frame
      try {
        frame = JSON.parse(e.data)
      } catch (e) {
        return
      }
      if (!frame.handler || frame.data === undefined) return
      eventProxy.$emit(`message-${frame.handler}`, frame.data, frame.handler, send)
    })
  })
}

function send (handler, data) {
  if (socket && socket.readyState === WebSocket.OPEN)
    socket.send(JSON.stringify({handler, data}))
}

function Asker () {
  this.timers = {}
}

Asker.prototype = {

  register (identifier, handler, data, duration) {
    if (this.timers[identifier])
      clearInterval(this.timers[identifier])

    this.timers[identifier] = setInterval(() => {
      let payload = _.isFunction(data) ? data() : data
      send(handler, data)
    }, duration)
  }
}

let asker = new Asker()

export default {
  send,
  init () {
    authController.on('logout', () => {
      this.close()
    }).on('login', () => {
      connect()
    })
  },
  close () {
    socket && socket.close()
  },
  on (event, cb) {
    eventProxy.$on(event, cb)
    return this
  },
  ask: asker.register.bind(asker)
}
