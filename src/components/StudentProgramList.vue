<template>
  <div class="container">
    <div class="card" v-for="program in programsData" :key="program.student_id+'0'+program.program_id" @click="showProgramDetail(program)">
      <div class="card-left">
        <h4>{{ program.program_id }}</h4>
        <p>Supervisor: {{ program.lecturer_id }}</p>
        <p>Status: {{ program.status }}</p>
      </div>
      <div class="card-right">
        <h4>-</h4>
        <p>Type: Magang</p>
        <p>Agency: Bukalapak</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StudentProgramList',
  props: ['programsData'],
  emits: ['statusChange'],
  setup(){

  },
  methods: {
    showProgramDetail(program){
      this.$emit('statusChange', 'Detail', program)
    }
  }
}
</script>

<style scoped>
h4, p{
  margin: 0 8px;
  text-align: left;
}

.container{
  padding: 0 8px;
  margin: 0 auto;
  max-width: 640px;
}

.card{
  color: #2c7956;
  padding: 16px;
  border-radius: 12px;
  background-color: #feffef;
  border: 1px solid #feffef;
  margin: 8px 0;
  display: flex;
  cursor: pointer;
}

.card:hover{
  border: 1px solid #2c7956;
}

.card-left, .card-right{
  flex: 50;
}

.card-right h4{
  color: #feffef;
}

@media screen and (max-width: 600px) {
  .card-right{
    display: none;
  }
}
</style>