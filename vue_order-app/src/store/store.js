import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions.js'
import * as getters from './getters.js'
import * as mutations from './mutations.js'
Vue.use(Vuex)

export const store = new Vuex.Store({
    state:{
      menuItems:[
        {cate:'主食',items:[]},
        {cate:'小吃',items:[]},
        {cate:'饮料',items:[]}
      ],
      currentUser:null,
      isLogin:false


    },
    getters,
    mutations,
    actions
  }
);
