<!--整个项目的根组件，所有组件的后缀名均为·vue-->
<template>
  <div id="app">
    <router-view />
    <!-- router-view是vueRouter的组件，主要是更新路由，可以不用跳转到一个新的页面，不会更新初始化函数mounted和created，只更新<router-view></router-view>标签下所渲染的组件。 -->
  </div>
</template>

<style>
</style>
