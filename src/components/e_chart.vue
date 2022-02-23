
<style scoped>
  h2{
    text-align: center;
    padding: 20px;
    font-size: 18px;
  }
  #chart{
    height: 250px;
    margin: 0 auto;
  }
</style>
<template>
  <div>
    <div id="chart">
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

      let time= new Date();
      let vhour=time.getHours();
      let vmin=0;
      let vsec=0;
      let xtime=[];
      let ynum=[];
      //毫秒为单位，一分钟之内的订单数目
      for(let i=0;i<3600;i++)
      {
          if(vsec<10){
            var now=vmin+':0'+vsec;
          }
          else{
            var now=vmin+':'+vsec;
          }
          xtime.push(now);
            vsec+=1;
            if(vsec>60){
                vmin+=1;
                vsec=0;
            }
            ynum.push(parseInt(Math.round(3600-i)*Math.random()/7+500));
      }
    //   console.log(xtime);
    //   console.log(ynum);

      let myChart_chart = echarts.init(document.getElementById('chart'));
      let option = {
  tooltip: {
    trigger: 'axis',
    position: function (pt) {
      return [pt[0], '10%'];
    }
  },
  title: {
    left: 'center',
    text: '秒杀情况实时监控',
    padding: [20,20,100,100],
  },
  // toolbox: {
  //   feature: {
  //     dataZoom: {
  //       yAxisIndex: 'none'
  //     },
  //     restore: {},
  //     saveAsImage: {}
  //   },
  //   padding: [20,20,100,100],
  // },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: xtime
  },
  yAxis: {
    type: 'value',
    max:1200,
    boundaryGap: [0, '100%']
  },
  dataZoom: [
    {
      type: 'inside',
      start: 0,
      end: 10
    },
    {
      start: 0,
      end: 10
    }
  ],
  series: [
    {
      name: '订单数（SEC:MS)',
      type: 'line',
      symbol: 'none',
      sampling: 'lttb',
      itemStyle: {
        color: 'rgb(255, 70, 131)'
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(255, 158, 68)'
          },
          {
            offset: 1,
            color: 'rgb(255, 70, 131)'
          }
        ])
      },
      data: ynum
    }
  ]
      };
      myChart_chart.setOption(option);
 
      //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
      window.addEventListener('resize',function() {myChart_chart.resize()});
    },
    methods: {
        
    },
    watch: {},
    created() {
    }
  }
</script>
