import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store'

import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

import moment from 'moment'
// 定义全局的过滤器
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern)
})

import VuePreview from 'vue-preview'
Vue.use(VuePreview)

import axios from 'axios'
Vue.prototype.$axios=axios

axios.defaults.baseURL = 'http://www.liulongbin.top:3005'
 
import Vuex from 'vuex';
Vue.use(Vuex)

var car=JSON.parse(localStorage.getItem('car')||'[]')

var store = new Vuex.Store({
  state: { // this.$store.state.***
    car: car // 将 购物车中的商品的数据，用一个数组存储起来，在 car 数组中，存储一些商品的对象， 咱们可以暂时将这个商品对象，设计成这个样子   
    // { id:商品的id, count: 要购买的数量, price: 商品的单价，selected: false  }
  },
  mutations: {// this.$store.commit('方法的名称', '按需传递唯一的参数')
    addToCar(state, goodsinfo) {
      // 点击加入购物车，把商品信息，保存到 store 中的 car 上
      // 分析：
      // 1. 如果购物车中，之前就已经有这个对应的商品了，那么，只需要更新数量
      // 2. 如果没有，则直接把 商品数据，push 到 car 中即可

      // 假设 在购物车中，没有找到对应的商品
      var flag = false

      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count += parseInt(goodsinfo.count)
          flag = true
          return true
        }
      })

      // 如果最终，循环完毕，得到的 flag 还是 false，则把商品数据直接 push 到 购物车中
      if (!flag) {
        state.car.push(goodsinfo)
      }
      localStorage.setItem('car',JSON.stringify(state.car))
    },
    updateGoodsInfo(state,goodsinfo){
      state.car.some(item=>{
        if(item.id==goodsinfo.id){
          item.count=parseInt(goodsinfo.id);
          return true
        }  
      })
      localStorage.setItem('car',JSON.stringify(state.car))
    },
    removeFormCar(state,id){
      state.car.some((item,i)=>{
        if(item.id==id){
          state.car.splice(i,1);
          return true;
        }
      })
      localStorage.setItem('car',JSON.stringify(state.car))
    },
    updateGoodsSelected(state,info){
      state.car.some(item=>{
        if(item.id==info.id){
          item.selected=info.selected;
          return true;
        }
      })
      localStorage.setItem('car',JSON.stringify(state.car))
    }
  },
    
      
  getters: { // this.$store.getters.***
    // 相当于 计算属性，也相当于 filters
    getAllCount(state) {
      var c = 0;
      state.car.forEach(item => {
        c += item.count
      })
      return c
    },
    getGoodsCount(state){
      var o={}
      state.car.forEach(item=>{
        o[item.id]=item.count;
      })
      return o;
    },
    getGoodsSelected(state){
      var o={}
      state.car.forEach(item=>{
        o[item.id]=item.selected
      })
      return o;
    },
    getGoodsCountAndAmount(state){
      var o ={
        count:0,   //勾选的数量
        amount:0   //勾选的总件数
      }
      state.car.forEach(item=>{
        if(item.selected==true){
          o.count+=item.count;
          o.amount+=item.count*item.price;
        }
      })
      return o;
    },
  }
})





Vue.config.productionTip = false
// Vue.use(ElementUI);

new Vue({
  router,
  store,                             //挂载store状态管理对象
  render: h => h(App)
}).$mount('#app')
