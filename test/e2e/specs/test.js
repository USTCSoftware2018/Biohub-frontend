// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser.url(devServer)
      .waitForElementVisible('#app', 5000)
      .assert
      .elementPresent('.hello')
      .assert
      .containsText('h1', 'Biohub Init')
      .assert
      .elementCount('img', 1)
      .end()
  },

  'home tests': function (browser) {
    browser.url('http://localhost:8080')
    .waitForElementVisible('#app', 5000)
    .click('button[name=login-button]')
    .assert
    .urlEquals('http://localhost:8080/login')

    browser.url('http://localhost:8080')
      .waitForElementVisible('#app', 5000)
      .click('button[name=join-button]')
      .assert
      .elementNotPresent('button[name=join-button]')
      .end()
  },

  'login tests': function (browser) {
    browser.url('http://localhost:8080/login')
      .waitForElementVisible('#app', 5000)
      .assert
      .elementPresent('.login')
      .end()
  }

}
