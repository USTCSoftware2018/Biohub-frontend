<template>
  <div>
    <div class='container' style='margin-top: 50px;'>
      <div class="col-md-3">
        <div class="list-group" style="text-align: center;">
          <router-link :to="{ name: 'plugins' }" :class="['list-group-item', activeName ? '' : 'active']">Introduction &amp; FAQ</router-link>
          <router-link v-for="plugin in plugins"
            :to="{ query: { name: plugin.name }}"
            :class="['list-group-item', activeName === plugin.name ? 'active' : '']"
            :key="plugin.name">
          plugin&nbsp;/&nbsp;{{ plugin.title }}
          </router-link>
        </div>
      </div>
      <div class="col-md-9">
        <div v-if="showIndex" class="card" style="word-break: normal;">
          <h4>What is Biohub 2.0 Plugin System?</h4>
          <p>Biohub 2.0 owns the numerous biological parts, and organizes and displays them all with grace. But that's not enough, since we did not, and will never exploit all the protential of these great treasures. So we turn to you, experts in biological field, for assistance. Biohub 2.0 provides an open interface, where you can access the parts' information and embed your own code, which is known as the Plugin System. Once your plugin is verified by us, it will be shown here and be utilized by the users in this community.</p>
          <h4>Must my plugin relate to Biobricks?</h4>
          <p>Of course, there is no limitation on the subject of your plugin. You may also implement a new biological algorithm into a plugin, and deploy it onto here for promotion. After all, it is a faster way to make other peers acquainted with your latest achievement.</p>
          <h4>How can I develop/deploy a plugin?</h4>
          <p>Currently, there is no approach to upload and deploy the plugin by yourself, since it needs to be censored as a consideration of security, but we will improve it in the near future. We recommend you to host source code of the plugin on Github and mail us the address via ustcsoftware2017 [at] gmail [dot] com, in order to reduce the cost of frequent modification. All you want to know about developing a plugin can be found on <a href="http://2017.igem.org/Team:USTC-Software">our wiki</a>.</p>
        </div>
        <div class="card" v-if="activePlugin">
          <dl style="margin: 0;">
            <dt>Author</dt>
            <dd>{{ activePlugin.author }}</dd>
            <dt>Description</dt>
            <dd>{{ activePlugin.description }}</dd>
          </dl>
        </div>
        <div id="plugin-slot"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .list-group-item {
    text-align: left;
  }
</style>

<script>
  import Vue from 'vue'

  window._plugins = window._plugins || {}

  function Loader (vm) {
    this._cache = {}
    this._active = null
    this.$pluginSlot = document.getElementById('plugin-slot')
    this._vm = vm
  }

  Loader.prototype.load = function (name, url) {
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
      link.src = url
      link.type = 'text/javascript'
      link.onload = () => {
        const component = window._plugins[name]
        const instance = new Vue({
          ...component,
          router: this._vm.$router
        })
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
        activeName: '',
        showIndex: false
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
      this.loader = new Loader(this)
      this.readyEvent.promise = new Promise(resolve => {
        this.readyEvent.resolve = resolve
      })
    },
    destroyed () {
      console.log('FUICL')
    },
    computed: {
      activePlugin () {
        console.log('hi')
        return _.find(this.plugins, o => o.name === this.activeName)
      }
    },
    methods: {
      loadPluginList () {
        axios.get('/api/plugins/')
          .then(response => {
            this.plugins = response.data
            this.readyEvent.resolve()
          })
      },
      pluginUrl (name) {
        if (!name) return ''

        /* eslint-disable no-undef */
        if (DEBUG) {
          return `/plugins/${name}/plugin.js`
        } else {
          return _.find(this.plugins, o => o.name === name).js_url
        }
      },
      loadPlugin (name) {
        this.readyEvent.promise
          .then(() => {
            if (name && !_.find(this.plugins, o => o.name === name)) return
            this.showIndex = false
            this.loader.load(name, this.pluginUrl(name))
              .then(instance => {
                instance && instance.activated && instance.activated(this.$route)
                this.activeName = name
                this.showIndex = !this.activeName
              })
          })
      }
    }
  }
</script>
