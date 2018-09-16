import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import _ from 'lodash'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.use(Vuelidate);
Vue.use(BootstrapVue);
//Vue.use(lodash);

new Vue({
  el: '#app',
  render: h => h(App)
})
