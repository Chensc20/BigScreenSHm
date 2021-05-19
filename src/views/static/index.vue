<template>
  <div id="main" style="width: 600px; height: 400px">

  </div>
</template>

<script>
import * as echarts from 'echarts'
import staApi from '@/api/static'
import axios from 'axios'


export default {

  name: "Echarts",
  // props:["xDatas, yDatas"],
  data(){
    return{
      btnDisabled: false,
      xData: [],
      yData: []
    }

  },
  // created() {
  //   let _this = this;
  //   let url = '/api'
  //
  // },
  watch: {
    timeList(val){
      this.timeList = val
      this.myChart();
    },
    valueList(val){
      console.error(val)
      this.valueList = val
      this.myChart();
    }
  },
  methods:{
    showChart(){
      staApi.getDataV()
      .then(response =>{
        console.log('***********' + response)
        this.yDatas = response.data.valueList;
        this.xDatas = response.data.timeList;
        console.log(this.xDatas)


        this.myChart()
      })
    },
    myChart(){

      var myChart = echarts.init(document.getElementById('main'))
      var option = {
        title: {
          text: 'RUMENANLITEST'
        },
        tooltip: {},
        // legend: {
        //   data: ['baga']
        // },
        xAxis:{
          data: this.xDatas
        },
        yAxis:{},
        series:[{
          name: 'sad',
          type: 'bar',
          data: this.yDatas
        }]
      };
      myChart.setOption(option, true);

    }
  },
  mounted() {
    // this.showChart()
    this.timer = setInterval(this.showChart, 1000)
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

</style>
