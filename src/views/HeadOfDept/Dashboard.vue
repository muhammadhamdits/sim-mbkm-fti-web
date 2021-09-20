<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-body">
            <h3>Proposed</h3>
            <h2>{{ submissions.filter((submission) => submission.status === 0).length }}</h2>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <div class="card-body">
            <h3>Accepted</h3>
            <h2>{{ submissions.filter((submission) => submission.status === 1).length }}</h2>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <div class="card-body">
            <h3>Rejected</h3>
            <h2>{{ submissions.filter((submission) => submission.status === 2).length }}</h2>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <div class="card-body">
            <h3>Active</h3>
            <h2>{{ submissions.filter((submission) => submission.status === 3).length }}</h2>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <div class="card-body">
            <h3>Completed</h3>
            <h2>{{ submissions.filter((submission) => submission.status === 4).length }}</h2>
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
              <PieChart :chartData="spbaData"/>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <div class="card-header">Student Program by Program Type</div>
          <div class="card-body">
            <div v-if="rendered">
              <PieChart :chartData="spbptData"/>
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

export default {
  name: 'HeadOfDeptDashboard',
  components: { PieChart },
  setup(){
    const submissions = ref([])
    const rendered = ref(false)
    const spbaData = ref({})
    const spbptData = ref({})

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
      const labels = [...new Set(submissions.value.map(item => item.program[field].name))]
      const datasetData = []
      const datasetBgColor = []

      labels.forEach((label) => {
        datasetData.push(submissions.value.filter((submission) => submission.program[field].name === label).length)
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

    onMounted(async () => {
      await getAllSubmissions()
      
      spbaData.value = initChartData('agency')
      spbptData.value = initChartData('program_type')

      rendered.value = true
      document.title = 'Dashboard - SIM MBKM FTI'
    })

    return { submissions, spbaData, spbptData, rendered }
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

@media screen and (max-width: 600px) {
  .row{
    display: block;
  }
}
</style>