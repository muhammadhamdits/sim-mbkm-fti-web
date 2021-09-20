<template>
  <div class="container">
    <form>
      <h3>Agency {{ agencyData.name }} Detail</h3>
      <label>Name:</label>
      <p>{{ agencyData.name }}</p>
      <label>Sector:</label>
      <p>{{ agencyData.sector }}</p>
      <label>Description:</label>
      <p>{{ agencyData.description }}</p>
      <label>Address:</label>
      <p>{{ agencyData.address }}</p>
      <label>Website:</label>
      <p>
        <a target="_blank" :href="'https://'+agencyData.website">{{ agencyData.website }}</a>
      </p>
      <button @click="backWard">
        <span class="material-icons">arrow_back</span> Back
      </button>
    </form>
  </div>
  <button class="float" @click="showAddAgencyForm">
    <p><span class="material-icons">edit</span></p>
  </button>
</template>

<script>
export default {
  name: 'AdminAgencyShow',
  props: ['agencyData'],
  emits: ['statusChange'],
  methods: {
    backWard(e){
      e.preventDefault()
      this.$emit('statusChange', 'List')
    },
    showAddAgencyForm(){
      this.$emit('statusChange', 'Add', this.agencyData)
    }
  }
}
</script>

<style scoped>
.container{
  margin: 0 auto;
  max-width: 1024px;
  padding: 16px;
}

h3{
  color: #42b983;
  text-align: center;
}

form{
  max-width: 420px;
  margin: 32px auto;
  background: white;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
  border: 1px solid #42b983;
}

label{
  color: #444;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.6em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}

input, button{
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ddd;
  border-radius: 8px;
  color: #555;
}

button{
  margin: 40px 0;
  background-color: #42b983;
  color: #fff;
  font-size: 0.8em;
  font-weight: bolder;
  text-transform: uppercase;
  cursor: pointer;
}

button:hover{
  background-color: white;
  border: 1px solid #42b983;
  color: #42b983;
}

.float{
	position:fixed;
	width:60px;
	height:60px;
	bottom:0;
	right:40px;
	background:#42b983;
	color:#FFF;
  border: none;
  padding: 0;
  cursor: pointer;
	border-radius:50px;
	text-align:center;
  text-decoration: none;
	box-shadow: 2px 2px 3px #999;
}

.float p{
	margin-top: 9px;
  font-size: 38px;
}

.float:hover{
  background-color: #3ba374;
  color: #fff;
}

.container .material-icons{
  font-size: 1.6em;
  vertical-align: middle;
  margin: -8px 0 -4px -8px;
}

@media screen and (max-width: 600px) {
  .float{
    bottom: 48px;
  }
}
</style>