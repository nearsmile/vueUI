<template>
  <div class="address">
    <ul class="address-list">
      <li class="address-item">
        <button type="text" class="address-item-select" :class="{ empty: !chosen.province && !chosen.city && !chosen.area }"  @click.stop="selectAddress">
          {{ `${ chosen.province }  ${ chosen.city }  ${ chosen.area }` | cityFilter }}
        </button>
      </li>
    </ul>
    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <vp-address v-if="isArea"
        :props-show="isArea"
        :addressData="addressData"
        :chosen="chosen"
        :props-result="areaSetting"
        @result="areaResult"/>
      </transition>
</div>
</template>
<script>
  import AreaData from '../components/address/addressData.json'
  // import VueArea from '../components/area.vue'
  export default {
    name: 'address-picker',
    /* components: {
      VueArea
    }, */
    data () {
      return {
        isArea: false, // 位置选择器
        areaSetting: null,
        chosen: { // 营业厅选择位置
          province: '', // 省
          city: '', // 市
          area: '', // 区
          cityCode: '' // 城市代码
        }
      }
    },
    filters: { // 默认提示语
      cityFilter (val) {
        if (val.length > 4) return val
        return '选择地址'
      }
    },
    computed: {
      addressData () { // 地理数据
        return JSON.parse(AreaData.Data)
      }
    },
    mounted () {
      console.table(this.addressData)
    },
    methods: {
      selectAddress () { // 显示地址弹框
        this.isArea = true
      },
      areaResult (show, result) {
        this.isArea = show
        if (!result) return
        this.chosen.province = result.province.areaname
        this.chosen.city = result.city.areaname
        this.chosen.area = result.area.areaname
        this.chosen.cityCode = result.city.areacode
      }
    }
  }
</script>
<style lang="scss" scoped>
.address-list {
  width: 100%;
  background-color: #fff;
}

.address-item {
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  font-size: .28rem;
  padding: 0 4%;
  border-bottom: 1px solid #eee;
}

.address-item-select {
  display: block;
  width: 100%;
  height: 100%;
  font-size: .28rem;
  text-align: left;
}

.address-item-select.empty {
  color: #c6c6c6;
}

</style>
