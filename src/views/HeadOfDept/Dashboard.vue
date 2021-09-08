<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-body">
            <h3>Proposed</h3>
            <h2>32</h2>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <div class="card-body">
            <h3>Accepted</h3>
            <h2>37</h2>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <div class="card-body">
            <h3>Rejected</h3>
            <h2>28</h2>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <div class="card-body">
            <h3>Active</h3>
            <h2>8</h2>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <div class="card-body">
            <h3>Completed</h3>
            <h2>68</h2>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-header">Student Program by Agency</div>
          <div class="card-body">Ini grafik</div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <div class="card-header">Student Program by Program Type</div>
          <div class="card-body">Ini grafik</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from '@vue/runtime-core'
export default {
  name: 'HeadOfDeptDashboard',
  setup(){
    onMounted(() => {
      document.title = 'Dashboard - SIM MBKM FTI'
    })
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