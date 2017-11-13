import Vue from 'vue'
import Router from 'vue-router'

const files = require.context('../demos', false, /\.vue$/)
const routes = []

files.keys().forEach(key => {
  let name = key.replace(/(\.\/|\.vue)/g, '')
  routes.push({
    path: `/${name}`,
    name,
    component: require(`@/demos/${name}`).default
  })
})

routes.push({
  path: '*',
  redirect: '/Home'
})

Vue.use(Router)

export default new Router({
  routes
})
