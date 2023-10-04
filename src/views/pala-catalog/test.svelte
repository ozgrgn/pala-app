<script>
import * as echarts from 'echarts';
  import { onMount } from 'svelte';
// Create the echarts instance
let option;
let myChart 
let chartDom
onMount(() => {
chartDom = document.getElementById('main');
myChart = echarts.init(chartDom);


option = {
  title: {
    text: 'İttifak Raporu'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['2018', '2019', '2023 Vk', '2023 Cb']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['2018', '2019', '2023 Vk', '2023 Cb']
  },
  yAxis: {
    type: 'value'
  },
  label: {
      show: true
    },
  series: [
    {
      name: 'Email',
      type: 'line',
      stack: 'Total',
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: 'Union Ads',
      type: 'line',
      stack: 'Total',
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: 'Video Ads',
      type: 'line',
      stack: 'Total',
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: 'Direct',
      type: 'line',
      stack: 'Total',
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: 'Search Engine',
      type: 'line',
      stack: 'Total',
      data: [820, 932, 901, 934, 1290, 1330, 1320]
    }
  ]
};

option && myChart.setOption(option);
})
</script>
<div id="main" style="width: 900px;height:400px;"></div>
