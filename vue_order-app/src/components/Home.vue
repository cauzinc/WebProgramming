<template>
  <div class="row">
    <div id="home" class="col-sm-12 text-center">
      <div class="background">
        <h1>欢迎来到我们的点餐系统</h1>
        <h2>这里有您喜欢的各色美食</h2>
        <button @click="goToMenu" class="btn btn-success">Let's order</button>
      </div>
    </div>

  </div>
</template>

<script>

  export default {
    data(){
      return{
        name:'cauzinc'
      }
    },
    methods:{
      goToMenu(){
        // 跳转到上一次浏览的页面
        // this.$router.go(-1)

        // 指定跳转的地址
        // this.$router.replace('/menu')

        // 指定跳转路由的名字下
        // this.$router.replace({name:'menuLink'})

        // 通过push进行跳转
        // this.$router.push('/menu')

        this.$router.push({name:'menu'});
      }
    }
   /* beforeRouteEnter:(to,from,next)=>{
      //注意如何调用组件内的数据
      next(vm =>{
        alert('welcome '+vm.name);
      })
    }*/

  }

</script>
<style>
  #home{
    background-image:url("../assets/pic/pizza.jpg");
    height:85vh;
    padding:10%;
  }
  #home .background{
    background:#eee;
    opacity:0.75;
    mix-width:70vm;
    padding:20px;
    margin:0 auto;
  }
  h1,h2{
    margin:6%;
  }

</style>
