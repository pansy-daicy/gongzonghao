// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import axios from 'axios' //引入axios
import '@/assets/css/weui.min.css'
import '@/assets/js/jquery.min.js'
import Api from '@/api/index.js';
Vue.prototype.$ajax=Api //修改Vue的原型属性

// Vue.prototype.$ajax=axios //修改Vue的原型属性

// Vue.config.productionTip = false

// let t = this.router.query.processInstanceId;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
