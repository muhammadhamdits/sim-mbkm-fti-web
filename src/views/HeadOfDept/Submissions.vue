<template>
  <div class="container">
    <div class="row">
      <div class="col-25">
        <div class="card">
          <div class="card-body">
            <h4>Judul Program</h4>
            <h5>By Student Name</h5>
            <h6>Type | Agency</h6>
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <h4>Judul Program</h4>
            <h5>By Student Name</h5>
            <h6>Type | Agency</h6>
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <h4>Judul Program</h4>
            <h5>By Student Name</h5>
            <h6>Type | Agency</h6>
          </div>
        </div>
      </div>
      <div class="col-75">
        <div class="row">
          <div class="col-3">
            <div class="card">
              <div class="card-header">
                Nama Program
              </div>
              <div class="card-body">
                Program Detail
              </div>
            </div>
          </div>
          <div class="col-2">
            <div class="row">
              <div class="col">
                <div class="card">
                  <div class="card-header">
                    Information
                  </div>
                  <div class="card-body">
                    <h6>Status:</h6>
                    <h5>Accepted</h5>
                    <h6>Supervisor:</h6>
                    <h5>Husnil Kamil</h5>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="card">
                  <div class="card-header">
                    Files
                  </div>
                  <div class="card-body">
                    <h6>Accepted File:</h6>
                    <h5>Ini File</h5>
                    <h6>Completed File:</h6>
                    <h5>Ini File</h5>
                    <h6>Transcript File:</h6>
                    <h5>Ini File</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from '@vue/runtime-core'
export default {
  name: 'HeadOfDeptSubmissions',
  setup(){
    onMounted(() => {
      document.title = 'Submissions - SIM MBKM FTI'
    })
  }
}
</script>

<style scoped>
h2, h3, h4, h5, h6{
  text-align: left;
  margin: 2px;
}

.text-left{
  text-align: left;
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
}

.col-2{
  flex: 2;
}

.col-3{
  flex: 3;
}

.col-25{
  flex: 25;
}

.col-75{
  flex: 75;
}

.card{
  margin: 4px;
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
  padding: 8px 12px;
}

@media screen and (max-width: 600px) {
  .row{
    display: block;
  }
}
</style>