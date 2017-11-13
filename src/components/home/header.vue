<template>
  <div class="header">
    <div class="back" v-if="!hide" @click="backHandler">
      返回
    </div>
    <h1 class="title">
      {{ title }}
    </h1>
  </div>
</template>
<script>
  export default {
    name: 'Header',
    props: {
      title: {
        type: String,
        default: ''
      },
      hide: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      backHandler () {
        this.$emit('change')
      }
    }
  }
</script>
<style scoped>

.header {
  position: relative;
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  font-size: .24rem;
  color: #fff;
  /* box-shadow: 0 0 1px 1px #c7c7c7; */
  background-color: black;
}

.title {
  font-size: .32rem;
}

.back {
  position: absolute;
  left: 0;
  top: 0;
  width: 18%;
  height: 100%;

}

.back::before {
  content: '';
  position: absolute;
  left: 15%;
  top: calc(50% - 0.09rem);
  width: .16rem;
  height: .16rem;
  border: solid #c7c7c7;
  border-width: 1px 0 0 1px;
  transform: rotate(315deg);
}

</style>
