<template>
  <form>
    <h3 class="text-muted my-5">添加新的订单</h3>
    <div class="form-group row">
      <label class="col-sm-11">品种</label>
      <div class="col-sm-11">
        <select class="form-control" v-model="newItem.cate">
          <option>主食</option>
          <option>小吃</option>
          <option>饮料</option>
        </select>
      </div>
    </div>
    <div class="form-group row">
      <label class="col-sm-11">名称</label>
      <div class="col-sm-11">
        <input type="text" class="form-control" v-model="newItem.name">
      </div>
    </div>
    <div class="form-group row">
      <label class="col-sm-11">价格</label>
      <div class="col-sm-11">
        <input type="text" class="form-control" v-model="newItem.price">
      </div>
    </div>

    <div class="form-group row">
      <button type="button" class="btn btn-success btn-block" @click="addItem">添加</button>
    </div>
  </form>
</template>

<script>
  export default{
    data(){
      return{
        newItem:{}
      }
    },
    methods:{
      addItem(){
        let data = {
          cate:this.newItem.cate,
          name:this.newItem.name,
          price:this.newItem.price
        };
        fetch("https://wd3989211129pjjjuq.wilddogio.com/item.json",{
          method:"POST",
          headers:{
            "Content-type":"application/json"
          },
          body:JSON.stringify(data)
        })
          .then(res => res.json())
          .then(data => {
            //取不到这条数据，只能取到key，不知道为什么
            console.log(data);
//            this.$store.commit("addItem",data);
            this.$router.push({name:'menu'});
          })
          .catch(err => console.log(err));
      },


    }
  }


</script>
