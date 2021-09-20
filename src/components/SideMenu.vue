<template>
  <div class="sideMenuContainer" @click="closeSideMenu" ref="sideMenu" v-if="userData">
    <div class="sideMenu">
      <div class="userInfoContainer">
        <div class="userInfo">
          <span class="material-icons">account_circle</span>
          <h3>{{ userData.name }}</h3>
          <p>{{ userData.role }} | {{ userData.username || userData.nim || userData.nip }}</p>
        </div>
        <div class="userMenu">
          <p class="userMenuItem text-left" @click="redirectUser('supervisor')" v-if="$route.path.split('/')[1] !== 'supervisor'">
            <span class="material-icons float-left">supervisor_account</span> Supervisor Page
          </p>
          <p class="userMenuItem text-left" @click="redirectUser('headofdept')" v-else>
            <span class="material-icons float-left">assignment_ind</span> Head of Dept Page
          </p>
          <p class="userMenuItem text-left" @click="logOutUser">
            <span class="material-icons float-left">logout</span> Logout
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { delCookie } from '@/utils/function'
export default {
  name: 'SideMenu',
  props: ['userData'],
  emits: ['closeSideMenu'],
  methods: {
    closeSideMenu(e){
      if(e.target === this.$refs.sideMenu){
        this.$emit('closeSideMenu')
      }
    },
    logOutUser(){
      delCookie('jwt')
      this.$root.role = ''
      this.$root.userData = ''
      this.$router.push({ name: 'Login' })
      this.$emit('closeSideMenu')
    },
    redirectUser(target){
      if(target === 'supervisor') this.$router.push({ name: 'SupervisorHome' })
      else this.$router.push({ name: 'HeadOfDeptDashboard' })
      this.$emit('closeSideMenu')
    }
  }
}
</script>

<style scoped>
.sideMenuContainer{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 16px;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.sideMenu{
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  width: 360px;
  max-width: 75vw;
  background-color: #feffef;
}

.userInfoContainer{
  position: relative;
  background-color: #42b983;
  height: 136px;
}

.sideInfo{
  padding: 8px;
}

.userInfo .material-icons{
  font-size: 3.8em;
  color: #feffef;
  margin-top: 12px;
}

.userInfo h3, .userInfo p{
  margin: 6px 0 0 0;
  color: #feffef;
}

.userInfo p{
  font-size: 0.85em;
  letter-spacing: 0.75px;
}

.userMenu{
  margin-top: 6px;
  padding-top: 6px;
}

.userMenuItem{
  margin: 0;
  color: #030;
  padding: 16px 24px;
  font-weight: 500;
  cursor: pointer;
}

.userMenuItem:hover{
  /* border-radius: 32px; */
  background-color: #3ba374;
  filter: blur(0.25px);
  color: #feffef;
}

.userMenuItem .material-icons{
  margin-top: -3px;
  margin-right: 20px;
}

.float-left{
  float: left;
}

.text-left{
  text-align: left;
}
</style>