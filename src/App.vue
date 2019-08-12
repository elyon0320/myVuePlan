<template>
  <div class="app-container">
    <!-- 顶部区域    -->
    
    <mt-header fixed title="练手小项目">
      <span slot="left" @click="goBack" v-show="flag">
        <mt-button icon="back">返回</mt-button>
      </span>
    </mt-header>
    <!-- 中间区域    -->

    <transition >
      <router-view/>
    </transition>
    
    <!-- 底部区域    -->

    <nav class="mui-bar mui-bar-tab myb">
        <router-link class="mui-tab-item-jxy" to="/home">
          <span class="mui-icon mui-icon-home"></span>
          <span class="mui-tab-label">首页</span>
        </router-link>
        <router-link class="mui-tab-item-jxy" to="/member">
          <span class="mui-icon mui-icon-contact"></span>
          <span class="mui-tab-label">会员</span>
        </router-link>
        <router-link class="mui-tab-item-jxy" to="/shopcar">
          <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
            <span class="mui-badge" id="badge">{{$store.getters.getAllCount}}</span>
            </span>
          <span class="mui-tab-label">购物车</span>
        </router-link>
        <router-link class="mui-tab-item-jxy" to="/search">
          <span class="mui-icon mui-icon-search"></span>
          <span class="mui-tab-label">搜索</span>
        </router-link>
      </nav>
  </div>
</template>

<script>
export default {
 data(){
   return{
     flag:false,
   }
 },
 created() {
   if(this.$route.path==='/home'){
      this.flag=false;
   }else{
     this.flag=true;
   }
 },
 methods: {
   goBack(){   //点击后退
    this.$router.go(-1);
   }
 },
 watch: {
   '$route.path':function(newValue){
     if(newValue=='/home'){
       this.flag=false;
     }else{
       this.flag=true
     }
   }
 }, 
}
</script>

<style lang="scss">
  body{
    background-color: white!important;
  }
  .app-container{
    padding-top: 40px;
    padding-bottom: 40px;
    overflow-x: hidden;
    .myb{
      background-color: #90E0FA;
    }
  }
  .v-enter{
    opacity: 0;
    transform: translate(100%);
  }
  .v-leave-to{
    opacity: 0;
    transform: translate(-100%);
    position: absolute;
  }
  .v-enter-active,.v-leave-active{
    transition: all 0.5s ease;
  }

  // 自己定义一个类名 来解决mui tabbar栏无法切换的问题
  .mui-bar-tab .mui-tab-item-jxy.mui-active {
    color: #007aff;
}
  .mui-bar-tab .mui-tab-item-jxy {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-item-jxy .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item-jxy .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
