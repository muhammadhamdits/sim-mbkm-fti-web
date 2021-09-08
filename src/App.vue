<template>
  <div class="nav" v-if="userData">
    <div class="nav-left">
      <router-link to="/">SIM MBKM FTI</router-link>
    </div>
    
    <div class="nav-right">
      <a href="#"><span class="material-icons" v-if="role !== 'Admin'">notifications</span></a>
      <a href="#" @click="toggleSideMenu(true)"><span class="material-icons">person</span></a>
    </div>
  </div>

  <div class="nav-center" v-if="role === 'Admin'">
    <router-link to="/admin/program">Program</router-link>
    <router-link to="/admin/agency">Agency</router-link>
    <router-link to="/admin/type">Type</router-link>
    <router-link to="/admin/course">Course</router-link>
  </div>
  <div class="nav-center" v-else-if="role === 'Student'">
    <router-link to="/student">Home</router-link>
    <router-link to="/student/program">MyProgram</router-link>
    <router-link to="/student/logbook">Logbook</router-link>
  </div>
  <div class="nav-center" v-else-if="userData.role === 'HeadOfDept'">
    <router-link to="/headofdept">Dashboard</router-link>
    <router-link to="/headofdept/submissions">Submissions</router-link>
  </div>
  <div class="nav-center" v-else-if="userData.role === 'Supervisor'">
    <router-link to="/supervisor">Home</router-link>
    <router-link to="/supervisor/logbook">Logbook</router-link>
  </div>

  <div class="content">
    <router-view/>
  </div>

  <SideMenu @closeSideMenu="toggleSideMenu" :userData="userData" v-if="sideMenuStatus"></SideMenu>
</template>

<script>
import SideMenu from '@/components/SideMenu.vue'
import { ref } from '@vue/reactivity';
import { checkAuth, getCookie } from "./utils/function";
import { onMounted } from '@vue/runtime-core';
import { useRouter } from 'vue-router'

export default {
  components: {
    SideMenu
  },
  emits: ['closeSideMenu'],
  setup(){
    const router = useRouter()
    const role = ref('')
    const userData = ref('')
    const sideMenuStatus = ref(false)
    
    const initAuth = () => {
      checkAuth({ jwt: getCookie('jwt') }).then(authData => {
        // console.log(authData)
        role.value = authData.role
        if(authData.user){
          userData.value = authData.user
          if(role.value === true) userData.value.role = "HeadOfDept"
          else if(role.value === false) userData.value.role = "Supervisor"
          else userData.value.role = role.value
        }else{
          router.push({ name: 'Login' })
        }
      })
    }

    onMounted(() => {
      initAuth()
    })

    const toggleSideMenu = (status = false) => {
      sideMenuStatus.value = status
    }

    return { role, userData, sideMenuStatus, toggleSideMenu, initAuth }
  }
}
</script>

<style>
body{
  padding: 0;
  margin: 0;
}

.content{
  z-index: -1;
  position: fixed;
  top: 48px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: scroll;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.content::-webkit-scrollbar{
  display: none;
}

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

.nav-center a:hover, .nav-right a:hover{
  background-color: #3ba374;
}

.nav-center a.router-link-exact-active {
  background-color: white;
  color: #42b983;
}

.nav{
  background-color: #42b983;
  padding: 16px 12px 12px 12px;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
}

.nav a{
  font-weight: bold;
  text-decoration: none;
  color: #fff;
  padding: 12px;
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

.nav-right .material-icons{
  margin-top: -38px;
  vertical-align: -6px;
  margin-bottom: 2px;
}

@media screen and (max-width: 600px) {
  .nav-center{
    /* top: 49px; */
    display: block;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    top: 100vh;
    margin-top: -50px;
    padding: 8px;
    /* width: auto; */
  }

  .nav-center a{
    position: relative;
    display: inline-block;
  }

  /* .nav{ */
    /* height: 68px; */
  /* } */

  .content{
    /* margin-top: 32px; */
    bottom: 48px;
  }
}
</style>
