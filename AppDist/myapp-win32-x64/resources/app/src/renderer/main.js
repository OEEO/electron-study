import Vue from 'vue'

import App from './App'
import './element-ui'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  template: '<App/>'
}).$mount('#app')
