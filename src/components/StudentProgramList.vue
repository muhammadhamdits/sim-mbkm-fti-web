<template>
  <div class="container">
    <div class="emptyMessage" v-if="!programsData.length">
      You dont have any program registered....
    </div>
    <div v-else class="card" v-for="program in programsData" :key="program.student_id+'0'+program.program_id" @click="showProgramDetail(program)">
      <div class="card-left">
        <h4>{{ program.program.name }}</h4>
        <p>Supervisor: {{ program.supervisor }}</p>
        <p>Status: {{ program.status_name }}</p>
      </div>
      <div class="card-right">
        <h4>-</h4>
        <p>Type: {{ program.program.program_type.name }}</p>
        <p>Agency: {{ program.program.agency.name }}</p>
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
      // console.log(program.program)
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

.emptyMessage{
  padding: 24px;
}

.card{
  color: #2c7956;
  padding: 16px;
  border-radius: 12px;
  background-color: #fff;
  border: 1px solid #42b983;
  margin: 8px 0;
  display: flex;
  cursor: pointer;
}

.card:hover{
  background-color: #c2f7df;
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