<template>
  This is Program
</template>

<script>
export default {
  name: 'Program',
  created(){
    document.body.style.backgroundColor = "#fff";
  },
  mounted(){
    document.title = 'Login - SIM MBKM FTI'
  },
  destroyed(){
    document.body.style.backgroundColor = null;
  }
}
</script>

<style>

</style>