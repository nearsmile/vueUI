<template>
  <div class="ProvCityBoxWarp">
    <transition name="fade" mode="out-in">
      <div class="ProvCityBoxBg" v-if="show" @click="show = false" @touchmove="_stopDef" @mousewheel="_stopDef"></div>
    </transition>
    <transition name="select">
      <div class="ProvCityBox" v-if="show" @mousewheel="_stopDef">
        <div class="ProvCityHeader">
          <div class="ProvCityHeaderCancle" @click="show = false">
            {{ cancel }}
          </div>
          {{ title }}
          <div class="ProvCityHeaderConfirm" @click="submit">
            {{ confirm }}
          </div>
        </div>
        <div class="ProvCityContent">
          <div class="ProvCityContentList">
            <ul ref:province-list :class="{'province_dragging': provinceState.dragging}" @touchstart="_onTouchStart('province', $event)"
              @mousedown="_onTouchStart('province', $event)" :style="{'transform' : 'translate3d(0,' + provinceState.translateY + 'px, 0)'}">
              <li></li>
              <li></li>
              <li v-for="(item, index) in provinceState.data" :key="index" :class="{
                'current': index === provinceState.index,
                'node1':  Math.abs(index - provinceState.index) == 1,
                'node2':  Math.abs(index - provinceState.index) == 2,
                'node3':  Math.abs(index - provinceState.index) >= 3}">
                {{ item.areaname }}
              </li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <div class="ProvCityContentList">
            <ul ref:city-list :class="{'city_dragging': cityState.dragging}" @touchstart="_onTouchStart('city', $event)" @mousedown="_onTouchStart('city', $event)"
              :style="{'transform' : 'translate3d(0,' + cityState.translateY + 'px, 0)'}">
              <li></li>
              <li></li>
              <li v-for="(item, index) in cityState.data" :key="index" :class="{
                'current': index === cityState.index,
                'node1':  Math.abs(index - cityState.index) == 1,
                'node2':  Math.abs(index - cityState.index) == 2,
                'node3':  Math.abs(index - cityState.index) >= 3}">
                {{ item.areaname }}
              </li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <div class="ProvCityContentList">
            <ul ref:area-list :class="{'area_dragging': areaState.dragging}" @touchstart="_onTouchStart('area', $event)" @mousedown="_onTouchStart('area', $event)"
              :style="{'transform' : 'translate3d(0,' + areaState.translateY + 'px, 0)'}">
              <li></li>
              <li></li>
              <li v-for="(item, index) in areaState.data" :key="index" :class="{
                'current': index === areaState.index,
                'node1':  Math.abs(index - areaState.index) == 1,
                'node2':  Math.abs(index - areaState.index) == 2,
                'node3':  Math.abs(index - areaState.index) >= 3 }">
                {{ item.areaname }}
              </li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>
        <hr class="ProvCitySelectedTop">
        <hr class="ProvCitySelectedBottom">
      </div>
    </transition>
  </div>
</template>
<script>
  export default {
    props: {
      propsResult: {
        type: Object,
        default: null
      },
      propsShow: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: '请选择地址'
      },
      confirm: {
        type: String,
        default: '确定'
      },
      cancel: {
        type: String,
        default: '取消'
      },
      addressData: {
        type: Array,
        default: []
      },
      chosen: {
        type: Object,
        default: {}
      }
    },
    data () {
      return {
        show: this.propsShow,
        result: this.propsResult,
        target: '',
        provinceState: {
          data: null,
          selectedId: null,
          index: 0,
          startPos: null,
          translateY: 0,
          startTranslateY: 0,
          dragging: false
        },
        cityState: {
          data: null,
          selectedId: null,
          index: 0,
          startPos: null,
          translateY: 0,
          startTranslateY: 0,
          dragging: false
        },
        areaState: {
          data: null,
          selectedId: null,
          index: 0,
          startPos: null,
          translateY: 0,
          startTranslateY: 0,
          dragging: false
        },
        delta: 0,
        slideEls: null
      }
    },
    mounted () {
      this.initData()
      this._onTouchMove = this._onTouchMove.bind(this)
      this._onTouchEnd = this._onTouchEnd.bind(this)
    },
    methods: {
      initData () {
        this.provinceState.data = this.addressData
        // this.provinceState.index = this.chosen.provinceIndex
        // this.cityState.data = this.provinceState.data.countryCode
        this.filterCity(0)
        this.filterArea(0)
        // this.areaState.data = this.cityState.data.countryCode
        // this.areaState.index = this.chosen.locationIndex
        // console.log('data-area', this.addressData, this.provinceState.data[0].County)
        // this.provinceState.selectedId = 110000 // 北京市  省
        // this.cityState.selectedId = 110100 // 市辖区  市
        // this.areaState.selectedId = 110101 // 东城区  区
      },
      submit () {
        this.result = {
          'province': this.provinceState.data[this.provinceState.index],
          'provinceIndex': this.provinceState.index,
          'city': this.cityState.data[this.cityState.index],
          'cityIndex': this.cityState.index,
          'area': this.areaState.data[this.areaState.index],
          'areaIndex': this.areaState.index
        }
        this.show = false
      },
      filterCity (index) {
        this.cityState.data = [...this.addressData[index].countryCode]
        // this.cityState.data = this.provinceState.data[0].County
        this.cityState.selectedId = 0
        this.cityState.translateY = 0
        this.cityState.index = 0
      },
      filterArea (index) {
        /* this.areaState.data = area.filter((item, index) => {
          return item.parentId === this.cityState.selectedId
        }) */
        this.areaState.data = [...this.cityState.data[index].countryCode]
        this.areaState.selectedId = this.areaState.data[0] && this.areaState.data[0].code
        this.areaState.translateY = 0
        this.areaState.index = 0
      },
      getSelectedData (index) {
        let target = this.target
        let thisData = this[target + 'State']
        thisData.selectedId = index
        if (target === 'province') {
          this.filterCity(index)
          this.filterArea(0)
        }
        if (target === 'city') {
          this.filterArea(index)
        }
      },
      setPage () {
        let target = this.target
        let thisData = this[target + 'State']
        let clientHeight = this.slideEls[0]['clientHeight']
        let total = thisData.data.length
        let goPage = Math.round((thisData.translateY / clientHeight).toFixed(1))
        if (goPage > 0) {
          goPage = 0
        }
        goPage = total - 1 >= Math.abs(goPage) ? goPage : -(total - 1)
        let index = Math.abs(goPage)
        thisData.index = index
        this.getSelectedData(index)
        thisData.translateY = goPage * clientHeight
      },
      _getTouchPos (e) {
        return e.changedTouches ? e.changedTouches[0]['pageY'] : e['pageY']
      },
      _getElem (e) {
        return Array.from(e.currentTarget.children).slice(2, -2)
      },
      _onTouchStart (target, e) {
        let thisData = this[target + 'State']
        this.target = target
        this.slideEls = this._getElem(e)
        this.delta = 0
        thisData.startPos = this._getTouchPos(e)
        thisData.startTranslateY = thisData.translateY
        thisData.dragging = true
        document.addEventListener('touchmove', this._onTouchMove, false)
        document.addEventListener('touchend', this._onTouchEnd, false)
        document.addEventListener('mousemove', this._onTouchMove, false)
        document.addEventListener('mouseup', this._onTouchEnd, false)
      },
      _onTouchMove (e) {
        let target = this.target
        let thisData = this[target + 'State']
        this.delta = this._getTouchPos(e) - thisData.startPos
        thisData.translateY = thisData.startTranslateY + this.delta
        if (Math.abs(this.delta) > 0) {
          e.preventDefault()
        }
      },
      _onTouchEnd (e) {
        let target = this.target
        let thisData = this[target + 'State']
        thisData.dragging = false
        this.setPage()
        document.removeEventListener('touchmove', this._onTouchMove)
        document.removeEventListener('touchend', this._onTouchEnd)
        document.removeEventListener('mousemove', this._onTouchMove)
        document.removeEventListener('mouseup', this._onTouchEnd)
      },
      _stopDef (e) {
        e.preventDefault()
      }
    },
    watch: {
      propsShow (newVal) {
        this.show = newVal
      },
      show (newVal) {
        this.$emit('result', newVal, this.result)
      }
    }
  }
</script>
<style scoped>
.ProvCityBoxBg {
  background: rgba(0, 0, 0, .35);
  z-index: 200;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.ProvCityBox {
  position: fixed;
  z-index: 300;
  background: #fff;
  bottom: 0;
  left: 0;
  right: 0;
}

.ProvCityHeader {
  background-color: #fff;
  height: 1.1rem;
  line-height: 1.1rem;
  overflow: hidden;
  text-align: center;
  font-size: .32rem!important;
  border-bottom: 1px solid #ebebeb;
}

.ProvCityHeaderCancle {
  float: left;
  padding: 0 20px;
  color: #f5516a;
  font-size: .32rem!important;
}

.ProvCityHeaderConfirm {
  float: right;
  padding: 0 20px;
  color: #f5516a;
  font-size: .32rem!important;
}

.ProvCityContent {
  width: 100%;
  margin: 0 auto;
  background: #fff;
  overflow: hidden;
  height: 4.2rem;
  overflow: hidden;
}

.ProvCityContentList {
  float: left;
  width: 33.333333%;
  text-align: center;
}

.ProvCityContentList.one {
  width: 100%;
}

.ProvCityContentList.two {
  width: 50%;
}

.ProvCityContentList ul {
  -webkit-transition: all .3s ease;
  transition: all .3s ease;
}

.ProvCityContentList ul.province_dragging,
.ProvCityContentList ul.city_dragging,
.ProvCityContentList ul.area_dragging {
  -webkit-transition: none;
  transition: none;
}

.ProvCityContentList li {
  line-height: .8rem;
  height: .8rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: .28rem!important;
}

.ProvCityContentList li.current {
  font-size: .36rem!important;
  font-weight: bold;
}

.ProvCityContentList li.node1 {
  font-size: .32rem!important;
  opacity: .7;
}

.ProvCityContentList li.node2 {
  font-size: .28rem!important;
  opacity: .5;
}

.ProvCityContentList li.node3 {
  font-size: .24rem!important;
  opacity: .3;
}

.ProvCitySelectedTop {
  width: 100%;
  border: none;
  border-top: 1px solid #eee;
  position: absolute;
  bottom: 1.8rem;
  margin: 0;
  height: 0;
}

.ProvCitySelectedBottom {
  width: 100%;
  border: none;
  border-top: 1px solid #eee;
  position: absolute;
  bottom: 2.6rem;
  margin: 0;
  height: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all .2s ease
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}

.select-enter-active,
.select-leave-active {
  transition: all .3s ease;
}

.select-enter,
.select-leave-active {
  transform: translate(0, 280px);
}
</style>
