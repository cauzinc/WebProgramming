<template>
  <div class="row mt-3">
    <div class="col-md-12 col-lg-12">
      <div class="card">
        <div class="card-body">
          <img src="../assets/pic/icon.png" class="mx-auto d-block">
          <form @submit.prevent="onSubmit">
            <div class="form-group">
              <label for="email">邮箱</label>
              <input id="email" type="email" class="form-control" v-model="email">
            </div>
            <div class="form-group">
              <label for="psd">密码</label>
              <input id="psd" type="password" class="form-control" v-model="psd">
            </div>

            <button type="submit" class="btn btn-block btn-success">登录</button>

          </form>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import ajaxRun from '../assets/js/ajaxRun.js'

  export default{
    data(){
      return{
        email:'',
        psd:'',
      }
    },
    //设置路由守卫，在每次进入前删清空用户信息
    beforeRouteEnter(to,from,next){
      //this.$store.dispatch("pushUser",null);
      next(vm => vm.$store.dispatch("pushUser",null));
    },
    methods:{
      onSubmit(){
        const user={
          email:this.email,
          psd:this.psd
        };
        let _this = this;
        ajaxRun({
          method:'post',
          url:"/api/login.php",
          data:user,
          async:true,
          success(data){
            console.log(data);
            //注意，此时如果数据库有数据，data返回的是false，因此要取反
            if(data){
              _this.$store.dispatch("pushUser",user.email);
              _this.$router.push({name:'home'})
            }else{
              //dispatch是异步方法
              alert('账号密码输入有误');
            }

          }
        })
      }
    }

  }

</script>
