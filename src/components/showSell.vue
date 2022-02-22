<!--components 一般用于存放非路由组件（还有全局组件）-->
<template>
  <div>
    <el-row :gutter="30">
      <el-col :span="12" gutter="70">
        <el-row :gutter="155">
          <div class="grid-content bg-purple">
            <el-col span="16">
              <el-input
                v-model="input"
                placeholder="输入你想搜索的秒杀商品ID"
                clearable
                span="16"
              ></el-input>
            </el-col>

            <el-col span="4"
              ><el-button plain @click="getMPro" style="width: 100px" span="4"
                >搜索</el-button
              ></el-col
            >
          </div>
        </el-row>
        <el-row>
          <el-table :data="mpro_show" style="margin-top: 20px" border stripe>
            <el-table-column
              align="center"
              type="index"
              label="#"
              width="40"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="idms"
              label="秒杀商品ID"
              width="120"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="pname"
              label="秒杀商品名"
              width="120"
            ></el-table-column>

            <el-table-column
              align="center"
              prop="price"
              width="120"
              label="秒杀商品价格"
            ></el-table-column>

            <el-table-column
              align="center"
              prop="storage"
              label="当前库存"
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
                    @click="show(scope.row.idms)"
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
                    @click="remove(scope.row.idms)"
                  ></el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </el-col>
      <el-col :span="12">
        <!-- echart组件 -->
        <!-- <e_chart :post="post"></e_chart> -->
        <!-- <e_pan :post="post"></e_pan> -->
        <e-bar :post="post"></e-bar>

      </el-col>
    </el-row>
    <el-dialog
      title="修改秒杀商品"
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
        <el-form-item label="秒杀价格" prop="price">
          <el-input v-model="updatefrom.price"></el-input>
        </el-form-item>
        <el-form-item label="售卖份数" prop="storage">
          <el-input v-model="updatefrom.storage"></el-input>
        </el-form-item>
        <el-form-item label="秒杀开始时间" prop="stime">
          <el-date-picker
            v-model="updatefrom.stime"
            type="datetime"
            placeholder="选择秒杀开始时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="秒杀结束时间" prop="etime">
          <el-date-picker
            v-model="updatefrom.etime"
            type="datetime"
            placeholder="选择秒杀结束时间"
          >
          </el-date-picker>
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
import my_bar from "./e_bar.vue"

import e_chart from "./e_chart.vue"
import e_pan from "./e_pan.vue"

export default {
  components: {
    // e_chart,
    // e_pan,
    my_bar,
  },
  name: "show",
  data() {
    return {
      post: [],
      // 输入的搜索内容
      input: "",
      // 商品信息
      mpro_show: [],
      // 商品编辑对话框的显示与隐藏
      updateDialogVisible: false,
      // 获取的用户对象
      updatefrom: {
        price: "",
        storage: "",
        stime: "",
        etime: "",
      },
      // 修改提示框的用户规则
      updaterules: {
        price: [
          { required: true, message: "请输入商品秒杀价格", trigger: "blur" },
        ],
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
      selectid: undefined,
    };
  },
  props: ["post"],
  created() {},
  mounted() {
    this.getAllMPro();
  },
  methods: {
    // 按照搜索内容搜索员工
    getMPro() {
      this.axios
        .get("/api/getMPro", {
          params: {
            idms: this.input,
          },
        })
        .then((response) => {
          this.mpro_show = response.data;
          for (let i = 0; i < this.mpro_show.length; i++) {
            for (let j = 0; j < this.post.length; j++) {
              if (this.mpro_show[i].poid === this.post[j].id) {
                this.mpro_show[i].poid = this.post[j].name;
              }
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 得到全部产品信息
    getAllMPro() {
      this.axios.get("/api/getAllMPro", { params: {} }).then((response) => {
        console.log(response);
        this.mpro_show = response.data;
        for (let i = 0; i < this.mpro_show.length; i++) {
          for (let j = 0; j < this.get.length; j++) {
            if (this.mpro_show[i].poid === this.get[j].idproducts) {
              this.mpro_show[i].poid = this.get[j].idproducts;
            }
          }
        }
      });
    },

    // 删除员工
    async remove(idms) {
      const confirmRes = await this.$confirm(
        "是否确定永久删除该秒杀商品?",
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
        .get("/api/delMpro", {
          params: {
            idms: idms,
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
          this.getAllMPro();
        });
    },
    // 展示编辑商品对话框
    show(idms) {
      // 请求该商品的数据
      console.log("请求该商品的数据" + idms);
      this.axios
        .get("/api/getMPro", {
          params: {
            idms: idms,
          },
        })
        .then((response) => {
          this.updatefrom = response.data[0];
        })
        .catch((error) => {
          console.log(error);
        });
      console.log(idms);
      // 展示编辑对话框
      this.updateDialogVisible = true;
      this.selectid = idms;
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
            .get("/api/modMPro", {
              params: {
                idms: this.selectid,
                price: this.updatefrom.price,
                storage: this.updatefrom.storage,
                stime: this.moment(this.updatefrom.stime).format(
                  "YYYY-MM-DD HH:mm:ss"
                ),
                etime: this.moment(this.updatefrom.etime).format(
                  "YYYY-MM-DD HH:mm:ss"
                ),
              },
            })
            .then((res) => {
              if (res.data.code !== 200) {
                return this.$message.error({
                  duration: 800,
                  message: "修改失败",
                });
              }
              console.log("success", this.selectid);
              // 关闭修改对话框
              this.updateDialogVisible = false;
              // 刷新数据
              this.getMAllPro();
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
    $route: "getMPro",
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
