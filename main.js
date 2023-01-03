import App from './App'
import Vue from 'vue'

import mixins from "@/common/mixins/mixins.js"
Vue.mixin(mixins)

import store from './store'
Vue.prototype.$store = store

import _ from 'lodash'
Vue.prototype.loadsh = _

import * as util from "@/common/js/utils.js"
Vue.prototype.$util = util



// #ifndef VUE3

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif