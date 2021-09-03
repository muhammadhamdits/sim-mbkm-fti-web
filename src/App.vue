<template>
  <div class="nav">
    <div class="nav-left">
      <router-link to="/">SIM MBKM FTI</router-link>
    </div>
    
    <div class="nav-right">
      <a href="#">Notif</a>
      <a href="#">Akun</a>
    </div>
  </div>

  <div class="nav-center" v-if="role === 'Admin'">
    <router-link to="/admin/program">Program</router-link>
    <router-link to="/admin/agency">Agency</router-link>
    <router-link to="/admin/type">Type</router-link>
    <router-link to="/admin/course">Course</router-link>
  </div>

  <div class="content">
    <router-view/>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { checkAuth, getCookie } from "./utils/function";

export default {
  setup(){
    const role = ref('')
    
    checkAuth({ jwt: getCookie('jwt') }).then(authData => {
      role.value = authData.role
    })

    return { role }
  }
}
</script>

<style>
body{
  padding: 0;
  margin: 0;
}

/* content{
  overflow: scroll;
} */

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.nav-center {
  background-color: #42b983;
  padding: 16px;
  position: sticky;
  top: 0px;
  margin: 0px auto;
  /* overflow: visible; */
}

.nav-center a {
  font-weight: bold;
  text-decoration: none;
  color: #fff;
  padding: 8px;
  border-radius: 16px;
}

.nav-center a.router-link-exact-active {
  background-color: white;
  color: #42b983;
}

.nav{
  background-color: #42b983;
  padding: 16px;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
}

.nav a{
  font-weight: bold;
  text-decoration: none;
  color: #fff;
  padding: 8px;
  border-radius: 16px;
}

.nav-left{
  position: relative;
  top: 0px;
  float: left;
}

.nav-right{
  position: relative;
  top: 0px;
  float: right;
}

.nav-left, .nav-right, .nav-center{
  display: inline-block;
}

@media screen and (max-width: 600px) {
  .nav-center{
    top: 49px;
  }

  .nav{
    height: 68px;
  }

  .content{
    margin-top: 32px;
  }
}
</style>
