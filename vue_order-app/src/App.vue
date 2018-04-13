<template>
  <div id="app">
    <div class="container">
      <my-header></my-header>
    </div>
    <div class="container">
      <router-view></router-view>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-sm-12 cos-md-4">
          <router-view name="orderLink"></router-view>
        </div>
        <div class="col-sm-12 cos-md-4">
          <router-view name="historyLink"></router-view>
        </div>
        <div class="col-sm-12 cos-md-4">
          <router-view name="deliveryLink"></router-view>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

import router from "./router/index.js"
import header from "./components/header.vue"

/*
也可以设置组件守卫，而不是全局守卫
注意这里函数有个自执行？
router.beforeEach((to,from,next)=>{
//  console.log(to);

  if(to.path == '/login'|| to.path == '/register'){
    next();
  }else{
    alert('请先登录');
    next('/login');
  }
});
*/

export default {
  router,
  name: 'App',
  components:{
    myHeader:header
  }
}
</script>

<style>

</style>
