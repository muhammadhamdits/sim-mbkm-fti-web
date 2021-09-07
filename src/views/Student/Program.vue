<template>
  This is Program
</template>

<script>
import { onMounted } from '@vue/runtime-core'
export default {
  name: 'Program',
  setup(){
    onMounted(() => {
      document.title = 'Home - SIM MBKM FTI'
    })
  }
}
</script>

<style>

</style>