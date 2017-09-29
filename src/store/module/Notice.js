/**
 * Created by ChanYH on 2017/9/14.
 */
const state = {
  previousPage: [],
  thisPage: [],
  navbarContent: [],
  nextPage: [],
  page: 1,
  prefix: '/api/notices'
}

const mutations = {
  initNotice (state, payload) {
    state.thisPage = payload
  },
  initNoticeNavbar (state, payload) {
    state.navbarContent = payload.data
  }
}
