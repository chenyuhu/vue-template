import Vue from 'vue'
import router from 'src/router'
import store from 'src/store'
import App from './App.vue'

const vueElectron = require('vue-electron')

Vue.config.productionTip = false

if (!process.env.IS_WEB) {
  Vue.use(vueElectron)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#main')
