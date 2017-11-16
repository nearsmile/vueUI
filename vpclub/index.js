import Address from './components/address'
import VpSort from './components/sort'
// const components = {}

const version = '0.0.1'

const install = function (Vue, opts = {}) {
  if (install.installed) return

  Vue.use(Address)
  Vue.use(VpSort)
  /* components.map(component => {
    Vue.component(component.name, component)
  }) */
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  version
}
