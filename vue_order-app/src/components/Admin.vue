<template>
  <div class="row">
    <div class="col-sm-12 col-md-8">
      <!--增加商品-->
      <new-item></new-item>
    </div>
    <div class="col-sm-12 col-md-4">
      <!--展示-->
      <h3 class="text-muted my-5">菜单</h3>
      <table class="table">
        <thead class="table table-default">
          <tr>
            <th>品种</th>
            <th>删除</th>
          </tr>
        </thead>
        <tbody v-for="item in getMenuItems" :key="item.key">
          <tr>
            <td>{{item.name}}</td>
            <td><button @click="deleteItem(item)" class="btn btn-outline-danger btn-sm">&times;</button></td>
          </tr>

        </tbody>


      </table>
    </div>
  </div>
</template>

<script>
  import newItem from './newItem.vue'
  export default{
    data(){
      return{
//        getMenuItems:[]
      }
    },
    components:{
      newItem
    },
    computed:{
      //取得这个数据会造成另一个麻烦，就是为了删除数据而给每个项目设置的id会无效化，因此暂时不使用这个方式
      getMenuItems:{
        //在vuex中获取数据
        get(){
          let data = this.$store.state.menuItems;
          let itemArr = [];
          for(let i in data){
            for(let j in data[i].items){
              itemArr.push(data[i].items[j]);
            }
          }
          return itemArr;
        },
        set(){

        }
      },
    },
    methods:{
      deleteItem(item){
        fetch("https://wd3989211129pjjjuq.wilddogio.com/item/"+item.id+'/.json',{
          method:'DELETE',
          header:{
            'Content-type':'application/json'
          }
        })
          .then(res => res.json())
          .then(data => {
            this.$store.commit("removeItem",item);
          })
          .catch(err=>{
            console.log(err)
          })
      }
    },
    created(){
      fetch("https://wd3989211129pjjjuq.wilddogio.com/item.json")
        .then(res => res.json())
        .then(data => {
          //这里是为了给每个item一个id，用于在删除的时候辨识删除的是哪个项目
          let menuArr = [
            {cate:'主食',items:[]},
            {cate:'小吃',items:[]},
            {cate:'饮料',items:[]}
          ];
          for(let key in data){
            data[key].id = key; //把key值保存下来，在删除的时候使用
            console.log(data[key]); //key值是data对象的键
            for(let i in menuArr){
              if(menuArr[i].cate === data[key].cate){
                let item = {};
                item.id = data[key].id;
                item.name = data[key].name;
                item.price = data[key].price;
                menuArr[i].items.push(item);
              }
            }
          }
          this.$store.commit("setId",menuArr);
        });
    }
  }

</script>
