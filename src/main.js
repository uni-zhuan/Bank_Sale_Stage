//整个项目的入口文件。也是整个程序最开始执行的文件
import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import router from './router'
import './assets/css/reset.css'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import axios from 'axios'
Vue.prototype.axios = axios;

Vue.config.productionTip = false

Vue.use(ElementUI);
// 自动安装插件，ElementUI组件库

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)

}

new Vue({
  router,
  render: h => h(App)
  // 缩写 render: function (createElement) {
    // return createElement(App);
// }
}).$mount('#app')
