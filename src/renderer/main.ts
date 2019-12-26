import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const vueElectron = require('vue-electron')

Vue.config.productionTip = false

if (!process.env.IS_WEB) Vue.use(vueElectron)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#main')
