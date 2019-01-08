import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
// import Vuex from 'vuex'

// Vue.use(Vuex)
Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(iView)

import App from './App.vue'
import Welcome from './pages/welcome.vue'
import Home from './pages/home.vue'
import Appointment from './pages/appointment.vue'
import Doctor from './pages/doctor.vue'
import Register from './pages/register.vue'
import Asset from './pages/asset.vue'
import NewAsset from './pages/newAsset.vue'
import store from '../store/index'


const router = new VueRouter({
  routes:[
    {path:'/',component:Asset},
    {path:'/home',component:Home},
    {path:'/appointment',component:Appointment},
    {path:'/doctor',component:Doctor},
    {path:'/welcoome',component:Welcome},
    {path:'/register',component:Register},
    {path:'/asset',component:Asset},
    {path:'/newAsset',component:NewAsset},
  ]
})

let vm = new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
})
