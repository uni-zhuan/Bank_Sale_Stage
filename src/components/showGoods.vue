<!--components 一般用于存放非路由组件（还有全局组件）-->
<template>
  <div class="show">
    <!-- 头部搜索 -->
    <div class="search">
      <el-row>
        <el-col :span="21">
          <div class="grid-content bg-purple">
            <el-input
              v-model="input"
              placeholder="输入你想搜索的商品ID"
              clearable
            ></el-input>
            <el-button plain @click="getPro">搜索</el-button>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple-light">
            <el-button type="primary" @click="adddialogVisible = true"
              >添加商品</el-button
            >
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 表格 -->
    <el-table :data="product_show" style="width: 100%" border stripe>
      <el-table-column
        align="center"
        type="index"
        label="#"
        width="40"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="pname"
        label="商品名称"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="price"
        label="商品价格"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="storage"
        label="库存"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="type"
        label="类型"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="detail"
        label="商品详情"
      ></el-table-column>
      <el-table-column align="center" label="操作" width="200">
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
              @click="show(scope.row.idproducts)"
            ></el-button>
          </el-tooltip>
          <!-- 设置为秒杀商品 -->
          <el-tooltip
            class="item"
            effect="dark"
            content="设置秒杀"
            placement="top"
            :enterable="false"
          >
            <el-button
              type="default"
              icon="el-icon-setting"
              circle
              @click="set(scope.row.idproducts)"
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
              @click="remove(scope.row.idproducts)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加用户弹出层 -->
    <el-dialog title="添加商品" :visible.sync="adddialogVisible" width="50%">
      <el-form
        :model="addfrom"
        :rules="addrules"
        ref="addFormref"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="商品名称" prop="pname">
          <el-input v-model="addfrom.pname"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input v-model="addfrom.price"></el-input>
        </el-form-item>
        <el-form-item label="商品库存" prop="storage">
          <el-input v-model="addfrom.storage"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-radio-group v-model="addfrom.type">
            <el-radio label="投资型"></el-radio>
            <el-radio label="稳健型"></el-radio>
            <el-radio label="保本型"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商品详情" prop="detail">
          <el-input type="textarea" v-model="addfrom.detail"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm">清 空</el-button>
        <el-button type="primary" @click="upForm">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 设置秒杀弹出层 -->
    <el-dialog title="设置为秒杀商品" :visible.sync="setDialogVisible" width="50%">
      <el-form
        :model="setfrom"
        :rules="setrules"
        ref="setFormref"
        label-width="100px"
        class="demo-ruleForm"
      >

        <el-form-item label="秒杀价格" prop="price">
          <el-input v-model="setfrom.price"></el-input>
        </el-form-item>
        <el-form-item label="售卖份数" prop="storage">
          <el-input v-model="setfrom.storage"></el-input>
        </el-form-item>
        <el-form-item label="秒杀开始时间" prop="stime">
          <el-date-picker
            v-model="setfrom.stime" 
            type="datetime"
            placeholder="选择秒杀开始时间"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="秒杀结束时间" prop="etime">
          <el-date-picker
            v-model="setfrom.etime"
            type="datetime"
            placeholder="选择秒杀结束时间"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm">清 空</el-button>
        <el-button type="primary" @click="installForm">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改商品信息弹出层 -->
    <el-dialog title="修改商品" :visible.sync="updateDialogVisible" width="50%">
      <el-form
        :model="updatefrom"
        :rules="updaterules"
        ref="updateFormref"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="商品名称" prop="pname">
          <el-input v-model="updatefrom.pname"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input v-model="updatefrom.price"></el-input>
        </el-form-item>
        <el-form-item label="商品库存" prop="storage">
          <el-input v-model="updatefrom.storage"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-radio-group v-model="updatefrom.type">
            <el-radio label="投资型"></el-radio>
            <el-radio label="稳健型"></el-radio>
            <el-radio label="保本型"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商品详情" prop="detail">
          <el-input type="textarea" v-model="updatefrom.detail"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm2">清 空</el-button>
        <el-button type="primary" @click="giveForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "showGoods",
  data() {
    return {
      stime:"",
      etime:"",
      // 输入的搜索内容
      input: "",
      // 商品id
      product_show: [],
      //   添加对话框的显示隐藏
      adddialogVisible: false,
      //   添加表单的信息
      addfrom: {
        pname: "",
        price: "",
        storage: "",
        type: "",
        detail: "",
      },
      //   添加表单的验证规则
      addrules: {
        pname: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
        storage: [
          { required: true, message: "请输入商品库存", trigger: "blur" },
        ],
        detail: [
          { required: true, message: "请输入商品详情", trigger: "blur" },
        ],
        type: [
          { required: true, message: "请选择商品类型", trigger: "change" },
        ],
      },

      setDialogVisible: false,
      //   设置秒杀表单的信息
      setfrom: {
        price: "",
        storage: "",
        stime: "",
        etime: "",
      },
      //   秒杀设置表单表单的验证规则
      setrules: {
        price: [{ required: true, message: "请输入商品秒杀价格", trigger: "blur" }],
        storage: [
          { required: true, message: "请输入商品售卖份数", trigger: "blur" },
        ],
        stime: [
          { required: true, message: "请输入商品详情", trigger: "change" },
        ],
        etime: [
          { required: true, message: "请选择商品类型", trigger: "change" },
        ],
      },
      // 员工编辑对话框的显示与隐藏
      updateDialogVisible: false,
      // 获取的用户对象
      updatefrom: {
        pname: "",
        price: "",
        storage: "",
        type: "",
        detail: "",
      },
      // 修改提示框的用户规则
      updaterules: {
        pname: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
        storage: [
          { required: true, message: "请输入商品库存", trigger: "blur" },
        ],
        detail: [
          { required: true, message: "请输入商品详情", trigger: "blur" },
        ],
        type: [
          { required: true, message: "请选择商品类型", trigger: "change" },
        ],
      },
      selectid: undefined,
    };
  },
  props: ["get"],
  created() {},
  mounted() {
    this.getAllPro();
  },
  methods: {
    // 提交添加商品表单
    upForm() {
      this.$refs.addFormref.validate((valid) => {
        if (valid) {
          console.log(this.addfrom.pname);
          // this.addfrom.seid = this.$route.params.idproducts;
          this.axios
            .get("/api/addPro", {
              params: {
                pname: this.addfrom.pname,
                price: this.addfrom.price,
                storage: this.addfrom.storage,
                detail: this.addfrom.detail,
                type: this.addfrom.type,
              },
            })
            .then((res) => {
              console.log(res);
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
              // 刷新列表数据
              this.getAllPro();
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
    // 按照搜索内容搜索员工
    getPro() {
      console.log(this.input);
      this.axios
        .get("/api/getPro", {
          params: {
            idproducts: this.input,
          },
        })
        .then((response) => {
          console.log(response);
          this.product_show = response.data;
          for (let i = 0; i < this.product_show.length; i++) {
            for (let j = 0; j < this.get.length; j++) {
              if (this.product_show[i].poid === this.get[j].idproducts) {
                this.product_show[i].poid = this.get[j].idproducts;
              }
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 得到全部产品信息
    getAllPro() {
      this.axios.get("/api/getAllPro", { params: {} }).then((response) => {
        console.log(response);
        this.product_show = response.data;
        for (let i = 0; i < this.product_show.length; i++) {
          for (let j = 0; j < this.get.length; j++) {
            if (this.product_show[i].poid === this.get[j].idproducts) {
              this.product_show[i].poid = this.get[j].idproducts;
            }
          }
        }
      });
    },
    // 删除员工
    async remove(idproducts) {
      const confirmRes = await this.$confirm(
        "是否确定永久删除该商品?",
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
        .get("/api/delPro", {
          params: {
            idproducts: idproducts,
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
          // 刷新产品列表
          this.getAllPro();
        });
    },
    // 展示编辑商品对话框
    show(idproducts) {
      // 请求该商品的数据
      console.log("请求该商品的数据" + idproducts);
      this.axios
        .get("/api/getPro", {
          params: {
            idproducts: idproducts,
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
      this.selectid = idproducts;
    },
    // 弹出框关闭事件
    resetForm2() {
      this.$refs.updateFormref.resetFields();
    },
    // 提交修改信息
    giveForm() {
      this.$refs.updateFormref.validate((valid) => {
        if (valid) {
          this.axios
            .get("/api/modPro", {
              params: {
                idproducts: this.selectid,
                pname: this.updatefrom.pname,
                price: this.updatefrom.price,
                storage: this.updatefrom.storage,
                detail: this.updatefrom.detail,
                type: this.updatefrom.type,
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
              // 刷新数据
              this.getAllPro();
              this.$message.success({
                duration: 800,
                message: "修改成功",
              });
              //清空修改用户表单
              this.resetForm2();
            });
        }
      });
    },
    // 展示编辑商品对话框
    set(idproducts) {
      // 请求该商品的数据
      console.log("请求该商品的数据" + idproducts);
      this.axios
        .get("/api/getPro", {
          params: {
            idproducts: idproducts,
          },
        })
        .then((response) => {
          this.updatefrom = response.data[0];
        })
        .catch((error) => {
          console.log(error);
        });
      // 展示编辑对话框
      // console.log(response.data[0]);
      this.setDialogVisible = true;
      this.selectid = idproducts;
    },
    // 提交设置秒杀信息
    installForm() {
      this.$refs.setFormref.validate((valid) => {
        if (valid) {
          // console.log("success",this.selectid);
          this.axios
            .get("/api/addMPro", {
              params: {
                idproducts: this.selectid,
                storage: this.setfrom.storage,
                price: this.setfrom.price,
                stime: this.moment(this.setfrom.stime).format("YYYY-MM-DD HH:mm:ss"),
                etime: this.moment(this.setfrom.etime).format("YYYY-MM-DD HH:mm:ss"),
              },
              
            })
            .then((res) => {
              if (res.data.code !== 200) {
                return this.$message.error({
                  duration: 800,
                  message: "设置失败",
                });
              }
              // 关闭设置对话框
              this.setDialogVisible = false;
              // 刷新数据
              this.getAllPro();
              this.$message.success({
                duration: 800,
                message: "修改成功",
              });
              //清空设置秒杀商品表单
              this.resetForm3();
            });
            console.log("success!!!",this.selectid);
        }
      });
    },
    // 弹出框关闭事件
    resetForm3() {
      this.$refs.setFormref.resetFields();
    },
  },

  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: "getPro",
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
