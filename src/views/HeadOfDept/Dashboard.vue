<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-body">
            <h3>Select Year</h3>
            <select class="selectYear" v-model="year" @change="changeYear">
              <option :value="y" v-for="y in years" :key="y">{{ y }}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <div class="card-body">
            <h3>Proposed</h3>
            <h2>{{ submissions.filter((submission) => submission.status === 0 && new Date(submission.program.start_date).getFullYear() == year).length }}</h2>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <div class="card-body">
            <h3>Accepted</h3>
            <h2>{{ submissions.filter((submission) => submission.status === 1 && new Date(submission.program.start_date).getFullYear() == year).length }}</h2>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <div class="card-body">
            <h3>Rejected</h3>
            <h2>{{ submissions.filter((submission) => submission.status === 2 && new Date(submission.program.start_date).getFullYear() == year).length }}</h2>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <div class="card-body">
            <h3>Active</h3>
            <h2>{{ submissions.filter((submission) => submission.status === 3 && new Date(submission.program.start_date).getFullYear() == year).length }}</h2>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <div class="card-body">
            <h3>Completed</h3>
            <h2>{{ submissions.filter((submission) => submission.status === 4 && new Date(submission.program.start_date).getFullYear() == year).length }}</h2>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-header">Student Program by Agency</div>
          <div class="card-body">
            <div v-if="rendered">
              <PieChart :chartData="spbaData" :key="chart1Reload"/>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <div class="card-header">Student Program by Program Type</div>
          <div class="card-body">
            <div v-if="rendered">
              <PieChart :chartData="spbptData" :key="chart2Reload"/>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <div class="card-header">Lecturer by Students</div>
          <div class="card-body">
            <div v-if="rendered">
              <PieChart :chartData="lbsData" :key="chart3Reload"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from '@vue/runtime-core'
import { getCookie, getRandomRgb } from '../../utils/function'
import PieChart from '../../components/PieChart.vue'
import _ from 'lodash'

export default {
  name: 'HeadOfDeptDashboard',
  components: { PieChart },
  computed: {
    years: function() {
      return [...new Set(this.submissions.map(item => new Date(item.program.start_date).getFullYear()))]
    }
  },
  setup(){
    const submissions = ref([])
    const rendered = ref(false)
    const spbaData = ref({})
    const spbptData = ref({})
    const lbsData = ref({})
    const year = ref(new Date().getFullYear())
    const chart1Reload = ref(0)
    const chart2Reload = ref(0)
    const chart3Reload = ref(0)

    const getAllSubmissions = async () => {
      let fetchResult = await fetch(`${process.env.VUE_APP_API_URI}/student-program`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          jwt: getCookie('jwt')
        }
      })
      let jsonData = await fetchResult.json()
      submissions.value = jsonData
    }

    const initChartData = (field) => {
      const filteredSubmissions = submissions.value.filter(subs => {
        return new Date(subs.program.start_date).getFullYear() == year.value
      })
      const labels = [...new Set(filteredSubmissions.map(item => item.program[field].name))]
      const datasetData = []
      const datasetBgColor = []

      labels.forEach((label) => {
        datasetData.push(filteredSubmissions.filter((submission) => submission.program[field].name === label).length)
        datasetBgColor.push(getRandomRgb())
      })

      let chartOptions = {
        type: 'pie',
        data: {
          labels,
          datasets: [{
            data: datasetData,
            backgroundColor: datasetBgColor,
            hoverOffset: 4
          }]
        }
      }

      return chartOptions
    }

    const initLbsData = () => {
      const filteredSubmissions = submissions.value.filter(subs => {
        return new Date(subs.program.start_date).getFullYear() == year.value
      })
      // console.log(filteredSubmissions)
      const labels = [...new Set(filteredSubmissions.map(item => item.supervisor))]
      const datasetData = []
      const datasetBgColor = []

      labels.forEach((label) => {
        datasetData.push(filteredSubmissions.filter((submission) => submission.supervisor === label).length)
        datasetBgColor.push(getRandomRgb())
      })

      let chartOptions = {
        type: 'pie',
        data: {
          labels,
          datasets: [{
            data: datasetData,
            backgroundColor: datasetBgColor,
            hoverOffset: 4
          }]
        }
      }

      return chartOptions
    }

    const renderChart = () => {
      spbaData.value = initChartData('agency')
      spbptData.value = initChartData('program_type')
      lbsData.value = initLbsData()
      rendered.value = true
      chart1Reload.value++
      chart2Reload.value++
      chart3Reload.value++
    }

    onMounted(async () => {
      await getAllSubmissions()
      renderChart()
      
      document.title = 'Dashboard - SIM MBKM FTI'
    })

    return { submissions, spbaData, spbptData, lbsData, rendered, year, chart1Reload, chart2Reload, chart3Reload, renderChart }
  },
  methods: {
    changeYear(){
      this.renderChart()
    }
  }
}
</script>

<style scoped>
h2, h3{
  margin: 0;
}

.container{
  max-width: 1024px;
  padding: 8px 16px;
  margin: 0 auto;
}

.row{
  display: flex;
}

.col{
  flex: 1;
  margin: 4px 8px;
}

.card{
  border: 1px solid #42b983;
  border-radius: 8px;
}

.card-header{
  /* border-radius: 8px; */
  padding: 4px 8px;
  color: #fff;
  background-color: #42b983;
}

.card-body{
  padding: 8px;
}

.selectYear{
  color: #42b983;
  font-size: 1.5em;
  border: 0;
  font-weight: 600;
  padding: 0;
  cursor: pointer;
}

@media screen and (max-width: 600px) {
  .row{
    display: block;
  }
}
</style>