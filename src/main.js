// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './styles/reset.css'
import './tools/rem'
import FastClick from 'fastclick'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Lazyload from 'vue-lazyload'
import VpclubUI from '../vpclub'

Vue.use(VpclubUI)

// 修复点击300ms延迟
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', () => {
    FastClick.attach(document.body)
  }, false)
}
// 进度条
NProgress.configure({ showSpinner: false })

// 懒加载
/* Vue.use(Lazyload, {
  preLoad: 1.3,
  error: 'static/img/nearby_error.png',
  loading: 'static/img/nearby_loading.png',
  attempt: 1
}) */

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
