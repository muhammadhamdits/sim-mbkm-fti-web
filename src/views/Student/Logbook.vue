<template>
  This is Logbook
</template>

<script>
import { onMounted } from '@vue/runtime-core'
export default {
  name: 'Logbook',
  setup(){
    onMounted(() => {
      document.title = 'Home - SIM MBKM FTI'
    })
  }
}
</script>

<style>

</style>