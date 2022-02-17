// 路由文件，可以理解为各个页面的地址路径，用于我们访问，同时可以直接在里边编写路由守卫
// 通过 Vue.js，我们已经用组件组成了我们的应用。当加入 Vue Router 时，我们需要做的就是将我们的组件映射到路由上，让 Vue Router 知道在哪里渲染它们
import Vue from 'vue'
import Router from 'vue-router'


const Home = () => import('./views/Home.vue')
const Login = () => import('./views/Login.vue')
const sellMonitor = () => import('./components/sellMonitor.vue')
const customerMessage = () => import('./components/customerMessage.vue')
const orderMessage = () => import('./components/orderMessage.vue')
const goodsMessage = () => import('./components/goodsMessage.vue')
const showGoods = () => import('./components/showGoods.vue')
const showSell = () => import('./components/showSell.vue')

Vue.use(Router)

// 声明route对象数组用于渲染对应组件
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/showSell/:id',
          name: 'showSell',
          component: showSell,
        },]
    }, {
      path: '/sellMonitor',
      name: 'sellMonitor',
      component: sellMonitor,

    }, {
      path: '/customerMessage',
      name: 'customerMessage',
      component: customerMessage,
    }, {
      path: '/orderMessage',
      name: 'orderMessage',
      component: orderMessage,
    }, {
      path: '/goodsMessage',
      name: 'goodsMessage',
      component: goodsMessage,
      children: [
        {
          path: '/showGoods/:id',
          name: 'showGoods',
          component: showGoods,
        },]
    }]

})
