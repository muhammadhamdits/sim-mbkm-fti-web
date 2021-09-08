<template>
  <div class="container">
    <div class="left-content">
      <div class="card">
        <div class="card-header">
          Program: Blablabla
        </div>
        <div class="card-body">
          <div class="card-content">
            <p class="p-content">Ini Isi</p>
            <p class="p-sub-content">Ini Tanggal</p>
          </div>
          <div class="card-content">
            <p class="p-content">Ini Isi</p>
            <p class="p-sub-content">Ini Tanggal</p>
          </div>
          <div class="card-content">
            <p class="p-content">Ini Isi</p>
            <p class="p-sub-content">Ini Tanggal</p>
          </div>
          <div class="card-content">
            <p class="p-content">Ini Isi</p>
            <p class="p-sub-content">Ini Tanggal</p>
          </div>
          <div class="card-content">
            <p class="p-content">Ini Isi</p>
            <p class="p-sub-content">Ini Tanggal</p>
          </div>
          <div class="card-content">
            <p class="p-content">Ini Isi</p>
            <p class="p-sub-content">Ini Tanggal</p>
          </div>
          <div class="card-content">
            <p class="p-content">Ini Isi</p>
            <p class="p-sub-content">Ini Tanggal</p>
          </div>
          <div class="card-content">
            <p class="p-content">Ini Isi</p>
            <p class="p-sub-content">Ini Tanggal</p>
          </div>
          <div class="card-content">
            <p class="p-content">Ini Isi</p>
            <p class="p-sub-content">Ini Tanggal</p>
          </div>
          <div class="card-content">
            <p class="p-content">Ini Isi</p>
            <p class="p-sub-content">Ini Tanggal</p>
          </div>
          <div class="card-content">
            <p class="p-content">Ini Isi</p>
            <p class="p-sub-content">Ini Tanggal</p>
          </div>
          <div class="card-content">
            <p class="p-content">Ini Isi</p>
            <p class="p-sub-content">Ini Tanggal</p>
          </div>
        </div>
      </div>
    </div>
    <div class="right-content">
      <div class="card">
        <div class="card-header">
          Comments
        </div>
        <div class="card-body">
          <div class="comment-container supervisor">
            <!-- <p class="name">Supervisor</p> -->
            <p class="comment">Bagus lanjutkan</p>
          </div>
          <div class="comment-container student">
            <!-- <p class="name">Student</p> -->
            <p class="comment">Baik pak</p>
          </div>
          <div class="input-container">
            <input type="text">
            <button><span class="material-icons">send</span></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from '@vue/runtime-core'
export default {
  name: 'SupervisorLogbook',
  setup(){
    onMounted(() => {
      document.title = 'Logbook - SIM MBKM FTI'
    })
  }
}
</script>

<style scoped>
p{
  margin: 0;
}

.input-container{
  margin-top: 8px;
  display: flex;
}

.input-container input, .input-container input:focus{
  border-radius: 8px;
  border: 1px solid #42b983;
  border-bottom: 0;
  border-left: 0;
  flex: 85;
  outline: none;
}

.input-container button{
  background: none;
	color: inherit;
	border: none;
	padding: 0 8px;
	font: inherit;
	cursor: pointer;
	outline: none;
}

.input-container button:hover{
  color: #42b983;
}

p.name{
  font-size: 0.9em;
  font-weight: 600;
}

p.comment{
  border-radius: 12px;
  display: inline-block;
  font-size: 0.85em;
  padding: 4px 8px;
  border: 1px solid #42b983;
  /* background-color: #dcf5e9; */
}

.p-sub-content{
  font-size: 0.8em;
}

.container{
  max-height: 80vh;
  display: flex;
  text-align: left;
  margin: 8px 16px;
}

.left-content{
  flex: 2;
}

.right-content{
  flex: 3;
}

.card{
  /* max-height: 100%; */
  margin: 2px 4px;
  border: 1px solid #42b983;
  border-radius: 8px;
}

.card-header{
  color: #fff;
  font-weight: 600;
  background-color: #42b983;
  padding: 6px 8px;
}

.card-body{
  max-height: 80vh;
  overflow-y: scroll;
}

.card-content{
  cursor: pointer;
  border-bottom: 1px solid #42b983;
  padding: 8px 8px;
}

.card-content:hover{
  background-color: #c2f7df;
}

.comment-container{
  padding: 8px;
}

.comment-container.supervisor{
  text-align: right;
}

.comment-container.student{
  text-align: left;
}

::-webkit-scrollbar {
  width: 0;  /* Remove scrollbar space */
  background: transparent;  /* Optional: just make scrollbar invisible */
}
</style>