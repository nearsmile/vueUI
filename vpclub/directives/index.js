import Vue from 'vue'

// 自动聚焦
Vue.directive('focus', {
  inserted (el, { value }) {
    if (value) el.focus()
  }
})
