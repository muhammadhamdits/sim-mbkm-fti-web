<template>
  <div class="card" v-for="program in programs" :key="program.id" @click="showDetailProgram(program)" :ref="`cardDom${program.id}`">
    <h4>{{ program.name }}</h4>
    <p>{{ program.program_type_id }} | {{ program.agency_id }}</p>
    <h5><span class="material-icons">verified</span> {{ program.is_certified }}</h5>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'

export default {
  name: 'StudentHomeList',
  props: ['programs'],
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
  margin: 8px 0;
  padding: 8px;
  border-radius: 16px;
  border: 1px solid #feffef;
  background-color: #feffef;
  cursor: pointer;
}

.card:hover, .card.active{
  border: 1px solid #2c7956;
  /* color: #42b983; */
}

.card h5 .material-icons{
  font-size: 1em;
  vertical-align: middle;
}
</style>