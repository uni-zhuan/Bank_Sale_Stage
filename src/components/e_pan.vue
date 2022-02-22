<style scoped>
  h2{
    text-align: center;
    padding: 30px;
    font-size: 18px;
  }
  #chart_example{
    height: 300px;
    margin: 0 auto;
  }
</style>
<template>
  <div>
    <div id="chart_example">
    </div>
  </div>
</template>
 
<script>
import * as echarts from 'echarts'
  export default {
    data() {
      return {}
    },
    mounted() {
      let this_ = this;

    //   console.log(xtime);
    //   console.log(ynum);

      let myChart = echarts.init(document.getElementById('chart_example'));
      let option = {

  title: {
    text: '该产品销售状况',
    left: 'center',
    top: 20,
    textStyle: {
      color: '#1d1626'
    }
  },
  tooltip: {
    trigger: 'item'
  },
  visualMap: {
    show: false,
    min: 80,
    max: 600,
    inRange: {
      colorLightness: [0, 0.75]
    }
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '55%',
      center: ['50%', '50%'],
      data: [
        { value: 800, name: '商品库存' },
        { value: 426, name: '已下单秒杀数量' },
        { value: 574, name: '剩余可秒杀数量' },
        { value: 426, name: '未支付秒杀单数' },
      ].sort(function (a, b) {
        return a.value - b.value;
      }),
      roseType: 'radius',

      label: {
        color: '#1d1626'
      },
      labelLine: {
        lineStyle: {
          color: '#1d1626'
        },
        smooth: 0.2,
        length: 10,
        length2: 20
      },
      itemStyle: {
        color: '#c23531',
        shadowBlur: 200,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      },
      animationType: 'scale',
      animationEasing: 'elasticOut',
      animationDelay: function (idx) {
        return Math.random() * 200;
      }
    }
  ]
};
      myChart.setOption(option);
 
      //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
      window.addEventListener('resize',function() {myChart.resize()});
    },
    methods: {
        
    },
    watch: {},
    created() {
    }
  }
</script>
