import Vue from 'vue'
import { VueHammer } from 'vue2-hammer'
import App from './App.vue'
import store from './store'

Vue.use(VueHammer)
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
