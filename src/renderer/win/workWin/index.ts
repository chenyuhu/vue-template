import Vue from 'vue'
import WorkWin from './workWin.vue'

const vueElectron = require('vue-electron')

Vue.config.productionTip = false

if (!process.env.IS_WEB) Vue.use(vueElectron)

new Vue({
  render: h => h(WorkWin)
}).$mount('#work')
