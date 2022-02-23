<!--components 一般用于存放非路由组件（还有全局组件）-->
<template>
  <div class="show">
    <!-- 头部搜索 -->
    <div class="search">
      <el-row>
        <el-col :span="21">
          <div class="grid-content bg-purple">
            <el-input
              v-model="inputid"
              placeholder="输入你想搜索订单的订单ID"
              clearable
            ></el-input>
            <el-button plain @click="getOrderById">搜索</el-button>

            <el-input
              v-model="inputuid"
              placeholder="输入你想搜索订单的用户ID"
              clearable
            ></el-input>

            <el-button plain @click="getOrder">搜索</el-button>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple-light">
            <el-button type="primary" @click="adddialogVisible = true"
              >添加订单</el-button
            >
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 表格 -->
    <el-table :data="order_show" style="width: 100%" border stripe>
      <el-table-column
        align="center"
        type="index"
        label="#"
        width="40"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="idorder"
        label="订单ID"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="uid"
        label="客户ID"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="pid"
        label="商品ID"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="number"
        label="购买数量"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="time"
        label="下单时间"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="pay"
        label="是否支付"
      ></el-table-column>
      <el-table-column align="center" label="操作" width="130">
        <template v-slot="scope">
          <!-- 修改，订单信息中只能修改支付状态、用户ID、商品ID、数量 -->
          <el-tooltip
            class="item"
            effect="dark"
            content="修改"
            placement="top"
            :enterable="false"
          >
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="show(scope.row.idorder)"
            ></el-button>
          </el-tooltip>
          <!-- 删除 -->
          <el-tooltip
            class="item"
            effect="dark"
            content="删除"
            placement="top"
            :enterable="false"
          >
            <el-button
              type="danger"
              icon="el-icon-delete-solid"
              circle
              @click="remove(scope.row.idorder)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加用户弹出层 -->
    <el-dialog title="添加订单" :visible.sync="adddialogVisible" width="50%">
      <el-form
        :model="addfrom"
        :rules="addrules"
        ref="addFormref"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="客户ID" prop="uid">
          <el-input v-model="addfrom.uid"></el-input>
        </el-form-item>
        <el-form-item label="商品ID" prop="pid">
          <el-input v-model="addfrom.pid"></el-input>
        </el-form-item>
        <el-form-item label="购买数量" prop="number">
          <el-input v-model="addfrom.number"></el-input>
        </el-form-item>
        <!-- 下单时间为管理员创建这一订单时的实际时间 -->
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm">清 空</el-button>
        <el-button type="primary" @click="upForm">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改员工信息弹出层 -->
    <el-dialog title="修改订单" :visible.sync="updateDialogVisible" width="50%">
      <el-form
        :model="updatefrom"
        :rules="updaterules"
        ref="updateFormref"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="客户ID" prop="uid">
          <el-input v-model="updatefrom.uid"></el-input>
        </el-form-item>
        <el-form-item label="商品ID" prop="pid">
          <el-input v-model="updatefrom.pid"></el-input>
        </el-form-item>
        <el-form-item label="购买数量" prop="number">
          <el-input v-model="updatefrom.number"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm2">清 空</el-button>
        <el-button type="primary" @click="setForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "showOrder",
  data() {
    return {
      // 输入的搜索内容
      inputuid: "",
      inputid: "",
      inputpid: "",
      // 员工信息
      order_show: [],
      adddialogVisible: false,
      //   添加表单的信息
      addfrom: {
        uid: "",
        pid: "",
        number: "",
      },
      //   添加表单的验证规则
      addrules: {
        uid: [{ required: true, message: "请输入客户ID", trigger: "blur" }],
        pid: [{ required: true, message: "请输入商品ID", trigger: "blur" }],
        number: [
          { required: true, message: "请输入购买数量", trigger: "blur" },
        ],
      },

      // 员工编辑对话框的显示与隐藏
      updateDialogVisible: false,
      // 获取的用户对象
      updatefrom: {
        uid: "",
        pid: "",
        number: "",
      },
      // 修改提示框的用户规则
      updaterules: {
        uid: [{ required: true, message: "请输入客户ID", trigger: "blur" }],
        pid: [{ required: true, message: "请输入商品ID", trigger: "blur" }],
        number: [
          { required: true, message: "请输入购买数量", trigger: "blur" },
        ],
      },

      selectid: undefined,
    };
  },
  // props: ["post"],
  created() {},
  methods: {
    // 提交添加用户表单
    upForm() {
      this.$refs.addFormref.validate((valid) => {
        if (valid) {
          this.axios
            .get("/api/addOrder", {
              params: {
                uid: this.addfrom.uid,
                pid: this.addfrom.pid,
                number: this.addfrom.number,
              },
            })
            .then((res) => {
              if (res.data.code !== 200) {
                return this.$message.error({
                  duration: 800,
                  message: "添加失败",
                });
              }
              this.$message.success({
                duration: 800,
                message: "添加成功",
              });
              // 隐藏对话框
              this.adddialogVisible = false;
              // 刷新员工列表数据
              this.getOrder();
              // 清空输入表单
              this.resetForm();
            });
        } else {
          console.log("表单数据有错误");
          return false;
        }
      });
    },
    // 清空添加用户表单
    resetForm() {
      this.$refs.addFormref.resetFields();
    },
    // 按照用户id搜索该用户订单
    getOrder() {
      this.axios
        .get("/api/getOrder", {
          params: {
            uid: this.inputuid,
          },
        })
        .then((response) => {
          this.order_show = response.data;
          console.log(this.order_show);
          for (let i = 0; i < this.order_show.length; i++) {
            for (let j = 0; j < this.post.length; j++) {
              if (this.order_show[i].poid === this.post[j].uid) {
                this.order_show[i].poid = this.post[j].uid;
              }
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getOrderById() {
      console.log(this.inputid);
      this.axios
        .get("/api/getOrderById", {
          params: {
            idorder: this.inputid,
          },
        })
        .then((response) => {
          this.order_show = response.data;
          console.log(this.order_show, "order_show");
          for (let i = 0; i < this.order_show.length; i++) {
            for (let j = 0; j < this.post.length; j++) {
              if (this.order_show[i].poid === this.post[j].idorder) {
                this.order_show[i].poid = this.post[j].idorder;
              }
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getOrderByPid() {
      this.axios
        .get("/api/getOrderByPid", {
          params: {
            pid: this.inputpid,
          },
        })
        .then((response) => {
          this.order_show = response.data;
          console.log(this.order_show, "order_show");
          for (let i = 0; i < this.order_show.length; i++) {
            for (let j = 0; j < this.post.length; j++) {
              if (this.order_show[i].poid === this.post[j].pid) {
                this.order_show[i].poid = this.post[j].pid;
              }
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 删除员工
    async remove(idorder) {
      const confirmRes = await this.$confirm(
        "是否确定永久删除该订单 ?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      // 确认删除返回的是 confirm 字符串
      // 取消删除返回的是 cancel 字符串
      if (confirmRes !== "confirm") {
        return this.$message.error({
          duration: 800,
          message: "已取消删除",
        });
      }

      this.axios
        .get("/api/delOrder", {
          params: {
            idorder: idorder,
          },
        })
        .then((res) => {
          if (res.data.code !== 200) {
            return this.$message.error({
              duration: 800,
              message: "删除失败",
            });
          }
          this.$message.success({
            duration: 800,
            message: "删除成功",
          });
          // 刷新员工列表
          this.getOrder();
        });
    },
    // 展示编辑员工对话框
    show(idorder) {
      // 请求该订单的数据
      console.log("请求该订单的数据" + idorder);
      this.axios
        .get("/api/getOrderById", {
          params: {
            idorder: idorder,
          },
        })
        .then((response) => {
          this.updatefrom = response.data[0];
        })
        .catch((error) => {
          console.log(error);
        });
      // 展示编辑对话框
      
      this.updateDialogVisible = true;
      this.selectid = idorder;
      console.log(this.selectid);
    },
    // 弹出框关闭事件
    resetForm2() {
      this.$refs.updateFormref.resetFields();
    },
    // 提交修改信息
    setForm() {
      this.$refs.updateFormref.validate((valid) => {
        if (valid) {
          this.axios
            .get("/api/modOrder", {
              params: {
                idorder: this.selectid,
                uid: this.updatefrom.uid,
                pid: this.updatefrom.pid,
                number: this.updatefrom.number,
              },
            })
            .then((res) => {
              if (res.data.code !== 200) {
                return this.$message.error({
                  duration: 800,
                  message: "修改失败",
                });
              }
              // 关闭修改对话框
              this.updateDialogVisible = false;
              console.log("success")
              // 刷新数据
              this.getOrder();
              this.$message.success({
                duration: 800,
                message: "修改成功",
              });
              this.resetForm2();
            });

        }
      });
    },
  },

  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: "getOrder",
  },
  filters: {},
};
</script>

<style lang="less" scoped>
.show {
  .search {
    margin-top: 15px;
    .el-input {
      width: 300px;
      margin: 0 30px;
    }
    .el-button {
      width: 100px;
    }
  }
  .el-table {
    margin-top: 40px;
  }
}
</style>
