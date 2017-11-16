<template>
  <div>
    <vp-sort :navbars="navbars" :filters="filterList" :types="goodsTypes" @change="sortChange" @types-change="typesChange" @filters-reset="filtersReset"
      @filters-submit="filtersSubmit"></vp-sort>
  </div>
</template>
<script type='text/javascript'>
  // import vpSort from '../plugins/components/sort/index';
  export default {
    /* components: {
      vpSort
    }, */
    data() {
      return {
        navbars: [{
          name: '综合',
          value: 1,
          type: 'normal'
        }, {
          name: '价格',
          value: 3,
          type: 'sort'
        }, {
          name: '筛选',
          value: 4,
          type: 'filter'
        }],
        filterList: [{
          id: 1,
          name: '品牌',
          sonList: [{
              parentId: 1,
              name: '格力'
            },
            {
              parentId: 1,
              name: '海尔'
            },
            {
              parentId: 1,
              name: '美的'
            },
            {
              parentId: 1,
              name: '三星'
            }
          ]
        }], //筛选属性列表（后台返回）
        goodsTypes: [{
          parentId: 2,
          name: '出产地',
          sonList: [{
            parentId: 2,
            name: '中国'
          }, {
            parentId: 2,
            name: '日本'
          }, {
            parentId: 2,
            name: '德国'
          }, {
            parentId: 2,
            name: '美国'
          }]
        }], //商品分类列表
      }
    },
    methods: {
      sortChange(params) {
        console.log(params)
      },
      typesChange(data) {
        console.log(data)
      },
      filtersSubmit(data) {
        console.log(data)
      },
      filtersReset() {
        console.log('重置了')
      }
    }
  }
</script>
