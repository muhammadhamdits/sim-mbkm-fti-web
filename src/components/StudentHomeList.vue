<template>
  <div v-for="program in orderedPrograms" :key="program.id">
    <div class="card" @click="showDetailProgram(program)" :ref="`cardDom${program.id}`" v-if="Date.now() < new Date(program.end_date)">
      <h4>{{ program.name }}</h4>
      <p>{{ program.program_type.name }} | {{ program.agency.name }}</p>
      <h5 v-if="program.registStatus">Registration Status : Open</h5>
      <h5 v-else>Registration Status : <span style="color: firebrick">Closed</span></h5>
      <!-- <h5><span class="material-icons">verified</span> {{ program.is_certified }}</h5> -->
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import _ from 'lodash'

export default {
  name: 'StudentHomeList',
  props: ['programs'],
  computed: {
    orderedPrograms: function() {
      return _.orderBy(this.programs, ['registStatus', 'program_type.name', 'name'], ['desc', 'asc', 'asc'])
    }
  },
  emits: ['statusChange'],
  setup(){

  },
  methods: {
    showDetailProgram(program){
      document.getElementsByClassName('card').forEach(element => {
        element.classList.remove('active')
      })
      this.$refs[`cardDom${program.id}`].classList.add('active')
      this.$emit('statusChange', 'Detail', program)
    }
  }
}
</script>

<style scoped>
h4, h5, h6, p{
  margin: 2px 16px;
  text-align: left;
  color: #2c7956;
}

.card{
  display: block;
  margin: 0 0 8px 0;
  padding: 8px;
  border-radius: 16px;
  border: 1px solid #42b983;
  background-color: #fff;
  cursor: pointer;
}

.card:hover, .card.active{
  background-color: #c2f7df;
  /* color: #42b983; */
}

.card h5 .material-icons{
  font-size: 1em;
  vertical-align: middle;
}
</style>