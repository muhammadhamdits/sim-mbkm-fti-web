<template>
  <div class="container">
    <form>
      <h1>Login</h1>
      <h5>Please login before you can continue...</h5>
      <label>Username:</label>
      <input type="text" v-model="username">
      <label>Password:</label>
      <input type="password" v-model="password">
      <p>{{ message }}</p>
      <button @click="login">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  props: [ 'username', 'password', 'initialMessage'],
  data(){
    return {
      message: this.initialMessage
    }
  },
  methods: {
    async login(e){
      e.preventDefault()
      const url = 'http://192.168.100.38:5000/login'
      let username = this.username
      let password = this.password
      const data = { username, password }

      const res = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const jsonData = await res.json()

      if(jsonData.status === "Success"){
        this.$cookies.set("jwt", jsonData.token, jsonData.maxAge)
        this.$root.role = jsonData.role
        if(jsonData.role === "Admin") this.$router.push({ name: 'AdminProgram' })
      }else{
        this.message = jsonData.message
      }
    }
  }
}
</script>

<style scoped>
.container{
  margin: 0 16px;
}
form{
  max-width: 420px;
  margin: 80px auto;
  background: white;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
  border: 1px solid #fff;
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
  margin-top: 40px;
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
h5{
  color: #777
}
p{
  font-size: 0.8em;
  font-weight: bolder;
  color: red
}
</style>