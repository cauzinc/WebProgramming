//进入页面的时候把野狗的数据拿到这里来
export const setMenuItems = (state,data)=>{
  //由于每次进入该页面都会重新往menuItems里面添加物品，因此每次调用方法都要重置
  state.menuItems=[
    {cate:'主食',items:[]},
    {cate:'小吃',items:[]},
    {cate:'饮料',items:[]}
  ];
  for (let key in data) {
    for (let i = 0; i < state.menuItems.length; i++) {
      if (data[key].cate === state.menuItems[i].cate) {
        let item = {};
        item.name = data[key].name;
        item.price = data[key].price;
        state.menuItems[i].items.push(item);
      }
    }
  }
};
//在管理页面的时候，拿到带有id属性的Items
export const setId = (state,data)=>{
  state.menuItems = data;
};
//删除商品的时候，可以同步状态
export const removeItem = (state,item)=>{
  for(let i in state.menuItems){
    state.menuItems[i].items.forEach(function(someItem,index){
      if(item.name === someItem.name){
        state.menuItems[i].items.splice(index,1);
      }
    })
  }
};
//增加商品的时候，同步状态
export const addItem = (state,item)=>{
  for(let i in state.menuItems){
    if(item.cate === state.menuItems[i].cate){
      state.menuItems[i].items.push(item);
    }
  }
};
export const changeUserStatus=(state,user)=>{
  if(user){
    state.currentUser = user;
    state.isLogin = true;
  }else{
    state.currentUser = null;
    state.isLogin = false;
  }
}
