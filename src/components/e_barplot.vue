<style scoped>
h2 {
  text-align: center;
  padding: 30px;
  font-size: 18px;
}
#barplot {
  height: 250px;
  width:250px;
  margin: 30px auto;
}
</style>
<template>
  <div>
    <div id="barplot"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {};
  },
  mounted() {
    // console.log("dayingle");
    let this_ = this;
    let myChart_barplot = echarts.init(document.getElementById("barplot"));
    let option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      // Use axis to trigger tooltip
      type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
    }
  },
  legend: {},
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'value'
  },
  yAxis: {
    type: 'category',
    data: ['5位', '4位', '3位', '2位', '1位']
  },
  series: [
    {
      name: '商品库存',
      type: 'bar',
      stack: 'total',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      itemStyle: {
            color: '#f89c9f'
          },
      data: [320, 302, 301, 334, 390]
    },
    {
      name: '已下单秒杀数量',
      type: 'bar',
      stack: 'total',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      itemStyle: {
            color: '#c76968'
          },
      data: [120, 132, 101, 134, 90]
    },
    {
      name: '剩余可秒杀数量',
      type: 'bar',
      stack: 'total',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      itemStyle: {
            color: '#8a2e3b'
          },
      data: [220, 182, 191, 234, 290]
    },
    {
      name: '未支付秒杀单数',
      type: 'bar',
      stack: 'total',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      itemStyle: {
            color: '#7a1723'
          },
      data: [150, 212, 201, 154, 190]
    },
  ]
};
    myChart_barplot.setOption(option);
    console.log("dayingle");
    //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
    window.addEventListener("resize", function() {
      myChart_barplot.resize();
    });
  },
  methods: {},
  watch: {},
  created() {},
};
</script>
