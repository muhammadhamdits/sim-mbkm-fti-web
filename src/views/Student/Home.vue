<template>
  This is Home
</template>

<script>
import { onMounted } from '@vue/runtime-core'
export default {
  name: 'Home',
  setup(){
    onMounted(() => {
      document.title = 'Home - SIM MBKM FTI'
    })
  }
}
</script>

<style>

</style>