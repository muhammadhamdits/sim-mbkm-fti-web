<template>
  <div>
    <canvas ref="pieChart"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

export default {
  name: 'PieChart',
  props: ['chartData'],
  mounted(){
    const context = this.$refs.pieChart
    new Chart(context, this.chartData)
  }
}
</script>

<style>

</style>