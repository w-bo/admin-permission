import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    breads: [],
    user: JSON.parse(sessionStorage.getItem('user') || '{}'),
    rightList: JSON.parse(sessionStorage.getItem('rightList') || '[]')
  },
  mutations: {
    addBread (state, bread) {
      const index = state.breads.findIndex(_bread => _bread.name === bread.name)
      if (index > -1) {
        state.breads.splice(index + 1, state.breads.length - index - 1)
      } else {
        state.breads.push(bread)
      }
    },
    removeBread (state, bread) {
      state.breads = state.breads.filter(_bread => _bread !== bread)
    },
    setUser (state, user) {
      state.user = user
      state.rightList = user.rights
      sessionStorage.setItem('user', JSON.stringify(user))
      sessionStorage.setItem('rightList', JSON.stringify(user.rights))
      sessionStorage.setItem('token', user.token)
    }
  },
  actions: {
  },
  modules: {
  }
})
