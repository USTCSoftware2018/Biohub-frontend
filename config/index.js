// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

try {
  var domainConfig = require(path.resolve(__dirname, '../domain.config.json'))
} catch (e) {
  console.log(e)
  throw Error('Please create domain.config.json under the root directory. You can refer to domain.config.example for guidance.')
}

var devDomainConfig = domainConfig.dev || {}
var prodDomainConfig = domainConfig.prod || {}



var extraProxy = (function () {
  var plugins = devDomainConfig.plugins || {}
  var result = {}
  Object.keys(plugins).forEach(function (key) {
    var port = plugins[key]
    result['/plugins/' + key] = {
      target: 'http://localhost:' + port,
      changeOrigin: true,
      pathRewrite: {
        ['^/plugins/' + key]: '/'
      }
    }
  })
  return result
})()


var domain = devDomainConfig.proxy_domain
var baseProxy = `http://${domain}`

console.log('Using extra proxies:', extraProxy)
console.log('Proxy domain to:', baseProxy)

var prodDomain = (domainConfig.prod || {}).domain || 'api-us.biohub.tech'
var prodStatic = (domainConfig.prod || {}).static || 'https://ustc-software2017-frontend.github.io/Biohub-frontend/dist/assets/'

console.log('Proxy production domain to:', prodDomain)
console.log(`Use ${prodStatic} as static base path.`)

module.exports = {
  build: {
    domain: prodDomain,
    static: prodStatic,
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'assets',
    assetsPublicPath: 'https://ustc-software2017-frontend.github.io/Biohub-frontend/dist/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    domain,
    baseProxy,
    env: require('./dev.env'),
    port: 8081,
    assetsRoot: path.resolve(__dirname, '../_tmp'),
    autoOpenBrowser: true,
    assetsSubDirectory: 'assets',
    assetsPublicPath: '/',
    proxyTable: Object.assign(extraProxy, {
      '/api': {
        target: baseProxy,
        changeOrigin: true,
        pathRewrite: {
          '^/api': 'https://api-us.biohub.tech/api'
        }
      },
      '/media': {
        target: baseProxy,
        changeOrigin: true,
        pathRewrite: {
          '^/media': 'https://api-us.biohub.tech/media'
        }
      },
      '/ws': {
        target: `ws://${domain}/ws/`,
        ws: true
      },
      '/files': {
        target: baseProxy,
        changeOrigin: true,
        pathRewrite: {
          '^/files': 'https://api-us.biohub.tech/files'
        }
      }
    }),
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
