<template>
  <div id="main" style="width: 1200px; height: 800px">

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
          console.log(this.xData)


          this.myChart()
        })
    },
    myChart(){

      var myChart = echarts.init(document.getElementById('main'))
      $.get('https://geo.datav.aliyun.com/areas_v2/bound/geojson?code=460000', function (data) {

        var points = [].concat.apply([], data.map(function (track) {
          return track.map(function (seg) {
            return seg.coord.concat([1]);
          });
        }));
        myChart.setOption(option = {
          animation: false,
          bmap: {
            center: [120.13066322374, 30.240018034923],
            zoom: 14,
            roam: true
          },
          visualMap: {
            show: false,
            top: 'top',
            min: 0,
            max: 5,
            seriesIndex: 0,
            calculable: true,
            inRange: {
              color: ['blue', 'blue', 'green', 'yellow', 'red']
            }
          },
          series: [{
            type: 'heatmap',
            coordinateSystem: 'bmap',
            data: points,
            pointSize: 5,
            blurSize: 6
          }]
        };
        // 添加百度地图插件
        var bmap = myChart.getModel().getComponent('bmap').getBMap();
        bmap.addControl(new BMap.MapTypeControl());
      });


      // myChart.setOption(option, true);

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
    this.timer = setInterval(this.showChart, 2000)
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
