<template>
  <div>
    <el-row>
      <el-col :span="24"
        ><div class="grid-content">
            <e_chart id="chart"></e_chart>
        </div></el-col>
    </el-row>
    <el-row>
      <el-col :span="12"><div class="grid-content" >
          <e_pan id="pan"></e_pan>
          </div></el-col>
      <el-col :span="12"
        ><div class="grid-content ">
            <e_barplot id="barplot"></e_barplot>
            </div
      ></el-col>
    </el-row>
  </div>
</template>

<script>
import e_barplot from "./e_barplot.vue"
import e_chart from "./e_chart.vue"
import e_pan from "./e_pan.vue"

export default {
  components: {
    e_chart,
    e_pan,
    e_barplot,
  },
  data(){
      return{


      }
  },
  mount(){
    //   this.init();
  },
  methods:{

  }
}
</script>

<style>
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

</style>
