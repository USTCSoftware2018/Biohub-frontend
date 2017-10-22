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
  'sign up tests': function (browser) {
    browser.url('http://localhost:8080/signup')
      .waitForElementVisible('#app', 5000)
      .assert
      .elementPresent('.signup')
  },
  'login tests': function (browser) {
    browser.url('http://localhost:8080/login')
      .waitForElementVisible('#app', 5000)
      .assert
      .elementPresent('.login')
      .setValue("#usernameInput", 'chanyh')
      .setValue("#passwordInput", 'chanyh1')
    browser.click('#submit-button')
    browser.url('http://localhost:8080/forum').waitForElementVisible('#app', 5000)
    .assert.elementPresent('.navbar')
  },
  'forum homepage tests': function(browser) {
      browser.url('http://localhost:8080/forum').waitForElementVisible('#app', 5000)
    .assert.elementPresent('.navbar').end()
  },
  'profile tests': function(browser) {
    
  }
}
