import Vue from 'vue'

// 价格过滤
Vue.filter('currency', (value) => {
  if (!value) return '￥0.00'
  return `￥${parseFloat(value).toFixed(2)}`
})
