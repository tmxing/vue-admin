import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import login from './modules/login'
import customer from './modules/customer'
import product from './modules/product'
import order from './modules/order'
import waiter from './modules/waiter'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    login,
    customer,
    product,
    order,
    waiter
  },
  getters
})

export default store
