<template>
  <div>
    <div class='container' style='margin-top: 50px;'>
      <div class="col-md-3">
        <div class="list-group" style="text-align: center;">
          <router-link :to="{ name: 'plugins' }" class="list-group-item">Index</router-link>
          <router-link v-for="plugin in plugins"
            :to="{ query: { name: plugin.name }}"
            class="list-group-item">
          {{ plugin.title }}
          </router-link>
        </div>
      </div>
      <div class="col-md-9">
        <div v-if="!activeName">
          This is index.
        </div>
        <div id="plugin-slot"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'

  window._plugins = window._plugins || {}

  function Loader () {
    this._cache = {}
    this._active = null
    this.$pluginSlot = document.getElementById('plugin-slot')
  }

  Loader.prototype.load = function (name) {
    return new Promise((resolve, reject) => {
      if (!name) {
        this.activate(null)
        resolve(null)
        return
      }
      if (this._cache[name]) {
        this.activate(this._cache[name])
        resolve(this._cache[name])
        return
      }
      if (window._plugins[name]) {
        const component = window._plugins[name]
        const instance = new Vue(component)
        instance.$mount()
        this.activate(instance)
        resolve(this._cache[name] = instance)
      }

      const link = document.createElement('script')
      link.src = `/plugins/${name}/plugin.js`
      link.type = 'text/javascript'
      link.onload = () => {
        console.log(window._plugins)
        const component = window._plugins[name]
        const instance = new Vue(component)
        instance.$mount()
        this.activate(instance)

        resolve(this._cache[name] = instance)
      }
      link.onerror = e => {
        reject(e)
      }

      document.body.append(link)
    })
  }

  Loader.prototype.activate = function (instance) {
    const parent = document.getElementById('plugin-slot')

    if (this._active) {
      parent.removeChild(this._active.$el)
    }

    this._active = instance
    if (instance) {
      parent.appendChild(instance.$el)
    }
  }

  export default {
    data () {
      return {
        plugins: [],
        loader: null,
        readyEvent: {
          promise: null,
          resolve: null
        },
        activeName: ''
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => vm.loadPlugin(to.query.name))
    },
    beforeRouteUpdate (to, from, next) {
      this.loadPlugin(to.query.name)
      next()
    },
    mounted () {
      this.loadPluginList()
    },
    created () {
      this.loader = new Loader()
      this.readyEvent.promise = new Promise(resolve => {
        this.readyEvent.resolve = resolve
      })
    },
    destroyed () {
      console.log('FUICL')
    },
    methods: {
      loadPluginList () {
        axios.get('/api/plugins/')
          .then(response => {
            this.plugins = response.data
            this.readyEvent.resolve()
          })
      },
      loadPlugin (name) {
        this.readyEvent.promise
          .then(() => {
            if (name && !_.find(this.plugins, o => o.name === name)) return
            this.loader.load(name)
              .then(instance => {
                instance && instance.activated && instance.activated(this.$route)
                this.activeName = name
              })
          })
      }
    }
  }
</script>
