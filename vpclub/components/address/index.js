import AddressPicker from './address.vue'

const install = function (Vue, opts = {}) {
  if (install.installed) return

  Vue.component(AddressPicker.name, AddressPicker)
}

export {
  install
}
