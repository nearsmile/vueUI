<template>
  <div id="app">
    <page-header :title="$route.name" :hide="$route.name === 'Home'" @change="$router.back()"/>
    <router-view/>
  </div>
</template>

<script>
import PageHeader from './components/home/header'

export default {
  name: 'app',
  components: {
    PageHeader
  }
}
</script>

<style>
</style>
