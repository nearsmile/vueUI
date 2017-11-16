<template>
  <div>
    <ul class="navbar">
      <li class="navbar-item" v-for="(item,index) of navs" :key="index" :class="{'active': activeNav === item.value}" @click="toggleNav(index)">
        <div v-if="item.type === 'normal'">{{item.name}}</div>
        <div v-if="item.type === 'sort'">
          <span class="text">{{item.name}}</span>
          <span :class="['icon-order-price',item.sort]">
            <i class="triangle-up"></i>
            <i class="triangle-down"></i>
          </span>
        </div>
        <div v-if="item.type === 'filter'">
          <span class="text">{{item.name}}</span>
          <i class="icon-filter"></i>
        </div>
      </li>
    </ul>
    <div class="mask-wrapper" style="z-index:100" v-show="showPopupFilter" @click.self="closePopup">
      <div class="filter-wrapper">
        <div class="filter-content">
          <div class="price-interval">
            <h4 class="title">价格区间</h4>
            <div class="content">
              <input class="inp needsclick " v-model="minPriceVal" @blur="priceBlur" type="number" placeholder="最低价">
              <span class="line"></span>
              <input class="inp needsclick" v-model="maxPriceVal" @blur="priceBlur" type="number" placeholder="最高价">
            </div>
          </div>
          <div class="type-link" @click="getGoodsTypes(null)">
            <span class="title">分类</span>
            <span class="desc">{{typeVal.name || '全部分类'}}</span>
            <i class="icon icon-arrow-right"></i>
          </div>
          <div v-for="(item,index) in filterList" :key="index">
            <div class="options">
              <h4 class="title">{{item.name}}</h4>
              <div class="check-box">
                <span v-for="(item2,index2) in item.sonList" :key="index2" @click="filterSelected(index,index2)" class="item row-ellipsis"
                  :class="{'item-selected': item2.checked}">{{item2.name}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="filter-btns">
          <div class="btn reset" @click="resetFilter">重置</div>
          <div class="btn commit" @click="submitFilter">确定</div>
        </div>
      </div>
      <div class="type-wrapper" v-show="showPopupType">
        <h4 class="title" :class="{'selected': !typeVal.id}" @click="typeValSelected()">全部分类</h4>
        <ul class="first">
          <li class="fist-item" v-for="(item1,index) in goodsTypes" :key="index">
            <p class="fist-item-title" @click="getGoodsTypes(item1, index)">
              <span class="text">{{item1.name}}</span>
              <i class="icon" :class="{'unfold':item1.checked}"></i>
            </p>
            <div class="second slide" :class="item1.checked ? 'animate':''">
              <p v-for="(item2,index) in item1.sonList" :key="index" class="second-item" :class="{'selected': item2 === typeVal}" @click="typeValSelected(item2)">{{item2.name}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script type='text/javascript'>
  /**

      navbars: [{
           name: '综合',
           value: 1,
           type: 'normal' // 排序：'sort'  筛选：'filter'
       }]
       filters: [
           {
               name: '品牌',
               sonList: [
                   {
                       name: '华为'
                   },
                   {
                       name: '三星'
                   }
               ]
           }
       ]
       types: [
           {
              name: '出产地',
              sonList: [{
                      name: '中国'
                  }, {
                      name: '日本'
                  }, {
                      name: '德国'
                  }, {
                      name: '美国'
              }]
          }
        ]

       @change(typeObj)
       @types-change(typeObj)
       @filters-reset(type)
       @filters-submit(obj)

   */
  import {
    deepCopy
  } from '../../utils/tools';
  export default {
    name: 'vpSort',
    props: {
      navbars: Array,
      filters: Array,
      types: Array
    },
    data() {
      return {
        navs: this.navbars,
        activeNav: 1,
        indexCache: null, //当前点击的index缓存
        goodsTypes: this.types, //商品分类列表
        filterList: this.filters, //筛选属性列表（后台返回）
        minPriceVal: '', //最低价
        maxPriceVal: '', //最高价
        typeVal: {}, //选择的分类
        showPopupFilter: false,
        showPopupType: false,
        allTypeSelected: false, //选中全部分类
      }
    },
    methods: {
      toggleNav(index) { //点击nav
        let cacheNavs = deepCopy(this.navs);
        let item = cacheNavs[index]
        this.activeNav = item.value;
        if (item.type === 'sort') {
          if (this.indexCache !== index) { //修复同时有多个price类型的nav切换bug
            cacheNavs.filter(nav => (nav !== item && nav.sort)).map(item => item.sort = '')
            this.indexCache = index;
          }
          item.sort = (item.sort === 'asc' ? 'desc' : 'asc')
        } else if (item.type === 'filter') {
          cacheNavs.map(item => item.sort = '')
          this.showPopupFilter = true;
        } else {
          cacheNavs.map(item => item.sort = '')
        }
        this.$emit('change', {
          value: item.value,
          sort: item.sort
        })
        this.navs = cacheNavs;
      },
      closePopup() {
        this.showPopupType = false;
        this.showPopupFilter = false
      },
      priceBlur() { //检验最高价与最低价差价
        if (!this.maxPriceVal) return true
        if (this.maxPriceVal <= this.minPriceVal) {
          this.$vux.toast.show({
            text: '最高价不能低于最低价',
            type: 'text'
          })
          return false;
        }
        return true;
      },
      filterSelected(filterListIndex, sonListIndex) {
        let curSonList = this.filterList[filterListIndex].sonList;
        curSonList.splice(sonListIndex, 1, {
          ...curSonList[sonListIndex],
          checked: !curSonList[sonListIndex].checked
        })

      },
      getGoodsTypes(item, curIndex) { //选择了分类
        if (item === null && this.goodsTypes && this.goodsTypes.length) return this.showPopupType = true //阻止重复请求一级标题
        if (this.goodsTypes[curIndex].sonList) { //阻止重复请求二级标题及收起与展开
          this.goodsTypes.splice(curIndex, 1, {
            ...this.goodsTypes[curIndex],
            checked: !this.goodsTypes[curIndex].checked
          })
        }

      },
      typeValSelected(data) { //选择分类
        this.typeVal = data || {};
        this.showPopupType = false
        this.$emit('types-change', data)
      },
      resetFilter() { //重置筛选
        this.minPriceVal = ''; //最低价
        this.maxPriceVal = ''; //最高价
        this.typeVal = {}; //选择的分类
        this.filterList.forEach(item => {
          item.sonList.map(item2 => item2.checked = false)
        });
        this.$emit('filters-reset');
      },
      submitFilter() { //提交筛选条件,筛选key从接口取
        if (!this.priceBlur()) return;
        let checkedObj = {};
        //品牌
        for (let model of this.filterList) {
          model.sonList.forEach(item => {
            if (item.checked) {
              if (!checkedObj[model.name]) {
                checkedObj[model.name] = []
              }
              checkedObj[model.name].push(item)
            }
          });
        }
        this.showPopupFilter = false;
        this.$emit('filters-submit', {
          minSellPrice: this.minPriceVal ? this.minPriceVal * 100 : undefined,
          maxSellPrice: this.maxPriceVal ? this.maxPriceVal * 100 : undefined,
          filter: checkedObj
        });
      }
    },
    watch: {
      filters(val) {
        this.filterList = val;
      },
      types(val) {
        this.goodsTypes = val;
      }
    }

  }

</script>
<style lang='less' scoped>
  @theme: #F01095;
  @theme-secondary: #8EC31F;
  @theme-bg: #ccc;

  .icon-order-price {
    display: inline-block;
    vertical-align: middle;
    .triangle-up {
      display: block;
      width: 0;
      height: 0;
      border-left: 0.1rem solid transparent;
      border-right: 0.1rem solid transparent;
      border-bottom: 0.1rem solid @theme-bg;
    }
    .triangle-down {
      display: block;
      width: 0;
      height: 0;
      margin-top: 0.04rem;
      border-left: 0.1rem solid transparent;
      border-right: 0.1rem solid transparent;
      border-top: 0.1rem solid @theme-bg;
    }
    &.asc {
      .triangle-up {
        border-bottom: 0.1rem solid @theme-secondary;
      }
      .triangle-down {
        border-top: 0.1rem solid @theme-bg;
      }
    }
    &.desc {
      .triangle-up {
        border-bottom: 0.1rem solid @theme-bg;
      }
      .triangle-down {
        border-top: 0.1rem solid @theme-secondary;
      }
    }
  }

  .navbar {
    flex: 0 0 0.8rem;
    display: flex;
    align-items: center;
    height: 0.8rem;
    background: #fff;
    .navbar-item {
      flex: 1 1 auto;
      height: 0.6rem;
      line-height: 0.6rem;
      text-align: center;
      font-size: 0.28rem;
      color: #353535;
      .icon-filter {
        display: inline-block;
        width: 0.24rem;
        height: 0.24rem;
        vertical-align: middle;
        background: url('./images/filter_normal.png') 0 0 no-repeat;
        background-size: 0.24rem;
      }
      &.filter {
        border-left: 1px solid #9B9B9B;
      }
      &.active {
        color: @theme-secondary;
        .icon-filter {
          background: url('./images/filter_active.png') 0 0 no-repeat;
          background-size: 0.24rem;
        }
      }
    }
  }

  .mask-wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.6);
  }

  .filter-wrapper {
    position: absolute;
    right: 0;
    width: 6rem;
    height: 100%;
    background: #fff;
    .filter-content {
      height: 100%;
      padding-bottom: 0.98rem;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      .title {
        line-height: 0.58rem;
        font-size: 0.28rem;
        color: #353535;
      }
      .price-interval {
        padding: 0.23rem 0.36rem 0.3rem;
        font-size: 0;
        .line {
          display: inline-block;
          width: 0.24rem;
          height: 0.04rem;
          margin: 0 0.1rem;
          vertical-align: middle;
          background: #999;
        }
        .inp {
          width: 2.4rem;
          height: 0.56rem;
          line-height: 0.56rem;
          vertical-align: middle;
          text-align: center;
          font-size: 0.28rem;
          color: #999;
          background: @theme-bg;
          border-radius: 0.08rem;
          border: none;
        }
      }
      .type-link {
        display: flex;
        align-items: center;
        height: 0.78rem;
        padding: 0 0.36rem;
        border-top: 1px solid #E0DFDF;
        border-bottom: 1px solid #E0DFDF;
        .title {
          flex: 1 1 auto;
        }
        .desc {
          font-size: 0.24rem;
          color: #999999;
        }
      }
      .options {
        margin: 0 0.36rem 0.3rem;
        &.selected-result {
          border-top: 1px solid #E0DFDF;
        }
        .check-box {
          font-size: 0;
        }
        .item {
          display: inline-block;
          width: 1.6rem;
          height: 0.56rem;
          line-height: 0.56rem;
          padding: 0 0.05rem;
          margin-top: 0.14rem;
          box-sizing: border-box;
          text-align: center;
          font-size: 0.24rem;
          color: #333333;
          background: #F4F4F4;
          border-radius: 0.08rem;
          &:nth-child(3n-1) {
            margin: 0.14rem 0.24rem 0;
          }
          &.item-selected,
          &.item-disabled {
            box-sizing: border-box;
            background: #FFFFFF;
            color: @theme;
            border: 0.02rem solid @theme;
          }
        }
      }
    }
    .filter-btns {
      position: absolute;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 6rem;
      height: 0.98rem;
      padding: 0 0.36rem;
      box-sizing: border-box;
      border-top: 1px solid #E0DFDF;
      background: #fff;
      .btn {
        width: 2rem;
        height: 0.72rem;
        line-height: 0.72rem;
        text-align: center;
        font-size: 0.32rem;
        border-radius: 0.36rem;
        &.reset {
          border: 1px solid #D9D9D9;
          color: #AFAFAF;
        }
        &.commit {
          background: @theme;
          color: #fff;
        }
      }
    }
  }

  .type-wrapper {
    position: absolute;
    right: 0;
    width: 6rem;
    height: 100%;
    background: #fff;
    .title {
      position: relative;
      height: 1.98rem;
      padding: 1.13rem 0.36rem 0.27rem;
      line-height: 0.58rem;
      font-size: 0.28rem;
      color: #353535;
      &.selected::after {
        position: absolute;
        top: 1.13rem;
        right: 0.36rem;
        display: block;
        width: 0.56rem;
        height: 0.58rem;
        content: '';
        /*.bg-img(market_screen_chioe);*/
        background-size: 0.56rem auto;
      }
    }
    .first {
      position: absolute;
      top: 1.98rem;
      bottom: 0.1rem;
      overflow-y: scroll;
      width: 100%;
      .fist-item {
        border-top: 1px solid #E0DFDF;
        .fist-item-title {
          height: 0.84rem;
          display: flex;
          align-items: center;
          padding: 0 0.36rem;
          &>.text {
            flex: 1 1 auto;
            font-size: 0.28rem;
            color: #353535;
          }
          .icon {
            width: 0.56rem;
            height: 100%;
            /*.bg-img(market_screen_arrow_next);*/
            &.unfold {
              /*.bg-img(market_screen_arrow_down);*/
            }
            background-size: 0.56rem auto;
          }
        }
        .second {
          padding: 0 0 0.02rem 0.24rem;
          background: @theme-bg;
          &.slide {
            overflow: hidden;
            max-height: 0;
            transition: max-height .2s cubic-bezier(0, 1, 0, 1) -.1s;
          }
          &.animate {
            max-height: 9999px;
            transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
            transition-delay: 0s;
          }
          .second-item {
            position: relative;
            width: 100%;
            height: 0.8rem;
            line-height: 0.8rem;
            font-size: 0.24rem;
            color: #999999;
            border-bottom: 0.02rem solid #E0DFDF;
            &.selected {
              color: @theme;
              border-bottom: 0.02rem solid @theme;
            }
            &.selected::after {
              position: absolute;
              top: 0;
              right: 0.36rem;
              display: block;
              width: 0.56rem;
              height: 0.8rem;
              content: '';
              /*.bg-img(market_screen_chioe);*/
              background-size: 0.56rem auto;
            }
          }
        }
      }
    }
  }

</style>
