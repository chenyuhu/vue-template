import Vue from 'vue'
import router from 'src/router'
import store from 'src/store'
import App from './App.vue'

Vue.use(require('vue-electron'))

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#main')
