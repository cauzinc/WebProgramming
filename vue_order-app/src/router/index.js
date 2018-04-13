import Vue from 'vue'
import Router from 'vue-router'
//一级导航
import home from '../components/Home.vue'
import menu from '../components/Menu.vue'
import admin from '../components/Admin.vue'
import about from '../components/about/About.vue'
import login from '../components/Login.vue'
import register from '../components/Register.vue'

//二级导航
import contactLink from '../components/about/ContactUs.vue'
import historyLink from '../components/about/History.vue'
import orderLink from '../components/about/OrderDocu.vue'
import deliveryLink from '../components/about/DeliveryMsg.vue'

//三级导航
import phoneLink from '../components/about/contact/Phone.vue'
import personNameLink from '../components/about/contact/PersonName.vue'

Vue.use(Router);

export default new Router({
  //history模式下可以用域名直接访问各个路由，但是要注意务必重定向
  mode:"history",
  routes:[
    {path:'/', name:'home', components:{
      //复用组件的时候要在调用组件的页面使用components引入复数个组件
      default:home,
      'orderLink':orderLink,
      'historyLink':historyLink,
      'deliveryLink':deliveryLink
    }},
    {path:'/menu', name:'menu', component:menu},
    {path:'/admin', name:'admin', component:admin,beforeEnter:(to,from,next)=>{
        // alert('非登录状态不得访问');
        // next('/login');
        next();
    }},
    {path:'/about', name:'about', component:about, children:[
        {path:'/about/history', name:'historyLink', component:historyLink},
        {path:'/about/contact', name:'contactLink', component:contactLink,children:[
          {path:'/about/contact/phone', name:'phone', component:phoneLink},
          {path:'/about/contact/personname', name:'personName', component:personNameLink}

        ]},
        {path:'/about/order', name:'orderLink', component:orderLink},
        {path:'/about/delivery', name:'deliveryLink', component:deliveryLink},
      ]
    },
    {path:'/login', name:'login', component:login},
    {path:'/register', name:'register', component:register},

    {path:'*', redirect:home}

  ],
  scrollBehavior(to,from,savedPosition){
    return{
      x:0,
      y:100
    }
  }

})
