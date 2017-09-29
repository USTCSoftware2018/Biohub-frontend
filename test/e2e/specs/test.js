// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
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
      .urlEquals('http://localhost:8080/signup')
  },

  'login tests': function (browser) {
    browser.url('http://localhost:8080/login')
      .waitForElementVisible('#app', 5000)
      .assert
      .elementPresent('.login')
      .end()
  },

  'sign up tests': function (browser) {
    browser.url('http://localhost:8080/signup')
      .waitForElementVisible('#app', 5000)
      .assert
      .elementPresent('.signup')
      .end()
  }

}
