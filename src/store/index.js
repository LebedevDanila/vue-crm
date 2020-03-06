import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import info from './modules/info'
import orders from './modules/orders'
import balance from './modules/balance'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth, info, orders, balance
  }
})
