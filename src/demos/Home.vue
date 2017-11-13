<template>
  <div class="home">
    <ul class="home-list">
      <router-link tag="li" class="home-item ellipsis" :to="item.link" :key="index" v-for="(item, index) in routes">
        {{ item.name }}
      </router-link>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'Home',
    computed: {
      routes () {
        const files = require.context('../demos', false, /\.vue$/)
        const result = []
        files.keys().forEach(key => {
          let name = key.replace(/(\.\/|\.vue)/g, '')
          if (name !== 'Home') {
            result.push({
              name,
              link: `/${name}`
            })
          }
        })
        return result
      }
    }
  }
</script>
<style lang="scss" scoped>

.home {
  &-list {
    display: flex;
    text-align: center;
  }

  &-item {
    width: 33.333%;
    height: 1.5rem;
    line-height: 1.5rem;
    /* height: 100%; */
    font-size: .24rem;
    border: solid #c7c7c7;
    border-width: 0 1px 1px 0;
  }
}

</style>
