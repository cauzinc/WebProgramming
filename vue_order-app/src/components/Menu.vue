<template>
  <div class="row">
    <!--菜单部分-->
    <div class="col-sm-12 col-md-8">
      <table class="table">
        <thead class="thead-default">
          <tr>
            <th>食品</th>
            <th>价格</th>
            <th>预定</th>
          </tr>
        </thead>

        <tbody v-for="good in goods" :key="good.cate">
          <tr>
            <td><strong>{{good.cate}}</strong></td>
          </tr>
          <tr v-for="item in good.items" :key="item.name">
            <td>{{item.name}}</td>
            <td>{{item.price}}</td>
            <td><button class="btn btn-sm btn-outline-success" @click="purchase(item)">+</button></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!--购物车-->
    <span v-show="carts.length == 0">购物车没有任何商品</span>
    <div class="col-sm-12 col-md-4" v-show="carts.length != 0">
      <table class="table">
        <thead class="thead-default">
          <tr>
            <th>数字</th>
            <th>品种</th>
            <th>价格</th>
          </tr>
        </thead>
        <tbody v-for="item in carts">
          <tr>
            <td>
              <button @click="reduce(item)">-</button>
              <span>{{item.quantity}}</span>
              <button @click="add(item)">+</button>
            </td>
            <td>{{item.name}}</td>
            <td>{{item.price * item.quantity}}</td>
          </tr>
        </tbody>
      </table>
      <p>总价：{{totalPrice}}</p>
      <button class="btn btn-success btn-block">提交</button>
    </div>
  </div>

</template>
<script>

  export default{
    data(){
      return{
        /*goods:[
          {cate:'主食',items:[]},
          {cate:'小吃',items:[]},
          {cate:'饮料',items:[]}
        ],*/
        carts:[]
      }
    },
    computed:{
      goods(){
        //在vuex中获取数据
        return this.$store.state.menuItems;
      },
      totalPrice(){
        let totalPrice = 0;
        for(let i=0;i<this.carts.length; i++){
          totalPrice += this.carts[i].price*this.carts[i].quantity;
        }
        return totalPrice;
      }
    },
    methods:{
      purchase(item){
        const goodMsg={
          name:item.name,
          price:item.price,
          quantity:1
        };
        let isIn = false;
        for(let i=0;i<this.carts.length; i++){
          if(item.name === this.carts[i].name){
            isIn = true;
            this.carts[i].quantity++;
            break;
          }
        }
        if(!isIn){
          this.carts.push(goodMsg);
        }

      },
      add(item){
        item.quantity++;
      },
      reduce(item){
        item.quantity--;
        if(item.quantity === 0){
          this.carts.splice(this.carts.indexOf(item,0),1);
        }
      }
    },
    created(){
      fetch("https://wd3989211129pjjjuq.wilddogio.com/item.json")
        .then(res => res.json())
        /*.then(data => {
          console.log(data);
          for(let key in data){
            for(let i=0; i<this.goods.length; i++){
              if(data[key].cate === this.goods[i].cate){
                let item = {};
                item.name = data[key].name;
                item.price = data[key].price;
                this.goods[i].items.push(item);
              }
            }
          }
        });*/
        .then(data => this.$store.commit("setMenuItems",data));
    }
  }

</script>

