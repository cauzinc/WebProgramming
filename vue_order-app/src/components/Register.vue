<template>
  <div class="row mt-3">
    <div class="col-md-12 col-lg-12">
      <div class="card">
        <div class="card-body">
          <img src="../assets/pic/icon.png" class="mx-auto d-block">
          <form @submit.prevent="onSubmit">
            <div class="form-group">
              <label for="email">邮箱</label>
              <input id="email" type="email" class="form-control" name="email" v-model="email">
            </div>
            <div class="form-group">
              <label for="psd">密码</label>
              <input id="psd" type="password" class="form-control" name="psd" v-model="psd">
            </div>
            <div class="form-group">
              <label for="rePsd">重复密码</label>
              <input id="rePsd" type="password" class="form-control" v-model="repsd">
            </div>

            <button type="submit" class="btn btn-block btn-success">注册</button>

          </form>

        </div>

      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import '../assets/js/jquery'
  import ajaxRun from '../assets/js/ajaxRun.js'
  import axios from 'axios'
  import qs from 'qs'

  export default{
    data(){
      return{
        email:'',
        psd:'',
        repsd:''
      }
    },
    methods:{
      onSubmit(){
        let data = "email="+this.email+"&psd="+this.psd;

        const params={
          email:this.email,
          psd:this.psd
        };

        //应该先验证账号是否被注册才对
        if(this.psd !== this.repsd){
          alert("两次密码不一致，请重新输入！");
        }else if(params.email === ''|| params.psd === ''){
          alert('邮箱和密码不得为空');

        }else{
          let _this=this;
          ajaxRun({
            method:'post',
            url:"/api/register.php",
            data:params,
            async:true,
            success(data){
//            console.log(data);
              if(data){
                alert("注册成功");
                _this.$router.push({name:"login"});
              }else{
                alert("该用户名已被注册");
              }
            }
          });
        }



      }
    }

  }

</script>
