<template>
  <el-container>
    <!-- 头部 -->
    <el-header style="height: 100px">
      <el-row>
        <el-col :span="3">
          <div style="text-align: center">
            <img
              src="../assets/bank1.png"
              alt=""
              width="100%"
              style="display: inline-block"
              margin-left="-10px"
            />
          </div>
        </el-col>
        <el-col :span="19"><span>银行秒杀后台管理系统</span></el-col>
        <el-col :span="2"
          ><span style="font-size:15px">欢迎你，管理员！</span></el-col
        >
      </el-row>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="230px">
        <el-menu
          :default-active="this.$route.path"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
          background-color="#5d6371"
          text-color="#eee"
          active-text-color="#1391E3"
          router="true"
        >
          <el-menu-item index="/sellMonitor" style="height: 60px">
            <i class="el-icon-view"></i>
            <span slot="title">秒杀实时监控</span>
          </el-menu-item>
          <el-menu-item index="/customerMessage" style="height: 60px">
            <i class="el-icon-menu"></i>
            <span slot="title">客户管理</span>
          </el-menu-item>
          <el-menu-item index="/orderMessage" style="height: 60px">
            <i class="el-icon-sold-out"></i>
            <span slot="title">订单管理</span>
          </el-menu-item>
          <el-menu-item index="/goodsMessage">
            <i class="el-icon-document"></i>
            <span slot="title">商品管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 主体区域 -->
      <el-main>
        <showGoods :post="post"></showGoods>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import showGoods from "../components/showGoods.vue";
export default {
  name: "home",
  data() {
    return {
      product: [],
      isCollapse: false,
      tabPosition: 'top',
    };
  },

  components: {
    showGoods
  },
  created() {
    this.getAllPro();

  },
  methods: {
    getAllpro(){
      this.axios
        .get("/api/getAllPro")
        .then(response =>{
          this.product=response.data;
        })
        .catch(error =>{
          console.log(error);
        });
    }
  },
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  .el-header {
    background-color: #5d6371;
    color: #eee;
    font-size: 30px;
    text-align: center;
    line-height: 100px;
  }
  .el-aside {
    background-color: #5d6371;
    padding: 10px 15px;
    .toggle_btn {
      background-color: pink;
      color: #fff;
      font-size: 10px;
      line-height: 24px;
      text-align: center;
      letter-spacing: 2px;
      cursor: pointer;
    }
    h5 {
      text-align: center;
      margin: 10px 0;
      color: #eee;
      font-family: 幼圆;
      font-size: 30px;
    }
    .el-menu {
      // 清楚border
      border: none;
    }
  }
  .el-main {
    background-color: #eee;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
