<!--components 一般用于存放非路由组件（还有全局组件）-->
<template>
  <div class="show" >
    <!-- 头部搜索 -->
    <div class="search">
      <el-row>
        <el-col :span="21">
          <div class="grid-content bg-purple">
            <el-input
              v-model="input"
              placeholder="输入你想搜索的客户ID"
              clearable
            ></el-input>
            <el-button plain @click="getUser">搜索</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 表格 -->
    <el-table :data="user_show" style="width: 100%" border stripe>
      <el-table-column
        align="center"
        type="index"
        label="#"
        width="40"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="iduser"
        label="客户ID"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="uname"
        label="客户姓名"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="idcard"
        label="身份证号"
      ></el-table-column>
      <el-table-column align="center" label="操作" width="130">
        <template v-slot="scope">
          <!-- 修改 -->
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
              @click="show(scope.row.iduser)"
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
              @click="remove(scope.row.iduser)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 修改员工信息弹出层 -->
    <el-dialog
      title="修改客户信息"
      :visible.sync="updateDialogVisible"
      width="50%"
    >
      <el-form
        :model="updatefrom"
        :rules="updaterules"
        ref="updateFormref"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="客户ID" prop="iduser">
          <el-input v-model="updatefrom.iduser"></el-input>
        </el-form-item>
        <el-form-item label="客户姓名" prop="uname">
          <el-input v-model="updatefrom.uname"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idcard">
          <el-input v-model="updatefrom.idcard"></el-input>
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
  name: "show",
  data() {
    return {
      // 输入的搜索内容
      input: "",
      // 员工信息
      user_show: [],

      // 员工编辑对话框的显示与隐藏
      updateDialogVisible: false,
      // 获取的用户对象
      updatefrom: {
        iduser: "",
        uname: "",
        idcard: "",
      },
      // 修改提示框的用户规则
      updaterules: {
        iduser: [{ required: true, message: "请输入客户ID", trigger: "blur" }],
        uname: [{ required: true, message: "请输入客户姓名", trigger: "blur" }],
        idcard: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
        ],
      },
      selectid: undefined,
    };
  },
  // props: ["post"],
  created() {},
  methods: {
    // 按照搜索内容搜索员工
    getUser() {
      this.axios
        .get("/api/getUser", {
          params: {
            iduser: this.input,
          },
        })
        .then((response) => {
          this.user_show = response.data;
          for (let i = 0; i < this.user_show.length; i++) {
            for (let j = 0; j < this.post.length; j++) {
              if (this.user_show[i].poid === this.post[j].id) {
                this.user_show[i].poid = this.post[j].name;
              }
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 删除员工
    async remove(iduser) {
      const confirmRes = await this.$confirm(
        "是否确定永久删除该员工, ?",
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
        .get("/api/delUser", {
          params: {
            iduser: iduser,
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
          this.getUser();
        });
    },
    // 展示编辑员工对话框
    show(iduser) {
      // 请求该员工的数据
      console.log("请求该用户的数据" + iduser);
      this.axios
        .get("/api/getUser", {
          params: {
            iduser: iduser,
          },
        })
        .then((response) => {
          this.updatefrom = response.data[0];
        })
        .catch((error) => {
          console.log(error);
        });
      console.log(iduser);
      // 展示编辑对话框
      this.updateDialogVisible = true;
      this.selectid = iduser;
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
          .get("/api/modUser", {
            params: {
              iduser: this.selectid,
              uname: this.updatefrom.uname,
              idcard: this.updatefrom.idcard,
            },
          })
          .then((res) => {
            // console.log(res)
            if (res.data.code !== 200) {
              return this.$message.error({
                duration: 800,
                message: "修改失败",
              });
            }
            // 关闭修改对话框
            this.updateDialogVisible = false;
            // 刷新数据
            this.getUser();
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
    $route: "getUser",
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
