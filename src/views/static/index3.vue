<template>
  <div id="main">

  </div>
</template>

<script>
import * as echarts from 'echarts'
import staApi from '@/api/static'
import axios from 'axios'


export default {

  name: "Echarts",
  // props:["xDatas, yDatas"],
  // data(){
  //   return{
  //     btnDisabled: false,
  //     xData: [],
  //     yData: []
  //   }
  //
  // },
  // created() {
  //   let _this = this;
  //   let url = '/api'
  //
  // },
  // props:['xData', 'yData'],
  // computed:{
  //   normalizedData: function(){
  //     return this.xData.trim().toLowerCase()
  //   }
  // },
  watch:{
    immediate: true,
    deep: false,
    xData(newVal,oldVal){
      setTimeout(() =>{
        if (newVal){
          console.log(newVal.length)
          console.log(oldVal.length)
          this.showChart()
          console.log('数据更新了，图重新渲染')
        }else {
          console.log(newVal.length)
          console.log(oldVal.length)
          console.error('数据还未更新，请等待')
        }
      },3000);


      // if (newVal){
      //   this.showChart()
      //   console.log('CHENGGONG')
      // }else {
      //   console.log('DATA NOT CHANGE')
      //   console.log(`NOW VALUE IS ${oldVal}`)
      // }
    },

  },
  data(){
    return{
      btnDisabled:false,
      xData: [],
      yData: []
    }
  },


  // watch: {
  //   getData:{
  //     immediate: true,
  //     handler(val){
  //       console.log(val)
  //       console.log(val, 'testtest');
  //       staApi.getDataV()
  //         .then(response =>{
  //           console.log('***********' + response)
  //           this.yDatas = response.data.valueList;
  //           this.xDatas = response.data.timeList;
  //
  //         })
  //       this.$nextTick(() =>{
  //         this.myChart()
  //       })
  //       },
  //   }
  // },
  methods:{
    showChart(){
      staApi.getDataV()
        .then(response =>{
          console.log('***********' + response)
          this.yData = response.data.valueList;
          this.xData = response.data.timeList;
          // console.log(this.xData)


          this.myChart()
        })
    },
    myChart(){

      // var myChart = echarts.init(document.getElementById('main'))
      // 调用echarts.getInstanceByDom()方法判断是否已经存在echarts实例，如果不存在再去初始化，如果存在的话就获取已有echarts实例的DOM节点
      var myChart = echarts.getInstanceByDom(document.getElementById('main'))
      if (myChart == null){ // 如果不存在，就进行初始化以避免控制台输出异常
        myChart = echarts.init(document.getElementById('main'))
      }
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.xData,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '国重607室内温度',
            type: 'bar',
            barWidth: '60%',
            data: this.yData
          }
        ]
      };
      myChart.setOption(option, true);

    }
  },
  // watch:{
  //   yData:{
  //     handler(newValue, oldValue){
  //       this.yData = newValue
  //       this.myChart()
  //     },
  //     deep: true,
  //     immediate: true
  //   }
  // },
  mounted() {
    this.showChart()
    // this.timer = setInterval(this.showChart, 20000)
  },
  // watch: {
  //   option: {
  //     deep: true,
  //     handler: function(newVal, oldVal){
  //       if (newVal){
  //         this.myChart.setOption(newVal, true);
  //       }else {
  //         this.myChart.setOption(oldVal, true);
  //       }
  //       this.myChart.resize();
  //     }
  //   }
  // }

}
</script>

<style scoped>
#main{
  width: 1400px;
  height: 770px;
  background-color: #5e2f3c;
  position: center;

}

</style>
