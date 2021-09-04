<template>
  <LoginForm> </LoginForm>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue'

export default {
  name: 'Login',
  components: {
    LoginForm
  },
  beforeCreate(){
    
  },
  created(){
    document.body.style.padding = "16px";
  },
  mounted(){
    document.body.style.backgroundColor = "#42b983";
    document.title = 'Login - SIM MBKM FTI'
  },
  unmounted(){
    document.body.style.backgroundColor = null;
    document.body.style.padding = "0";
  }
}
</script>

<style>
</style>