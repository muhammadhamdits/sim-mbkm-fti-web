<template>
  <StudentProgramList @statusChange="updateStatus" :programsData="programsData" v-if="status === 'List'"></StudentProgramList>
  <StudentProgramDetail @statusChange="updateStatus" :programData="programData" v-else></StudentProgramDetail>
</template>

<script>
import { onMounted, ref } from '@vue/runtime-core'
import StudentProgramList from '@/components/StudentProgramList.vue'
import StudentProgramDetail from '@/components/StudentProgramDetail.vue'
import { checkAuth, getCookie } from '../../utils/function'

export default {
  name: 'Program',
  components: {
    StudentProgramList,
    StudentProgramDetail
  },
  emits: ['statusChange'],
  setup(){
    const status = ref('List')
    const programsData = ref([])
    const programData = ref({})
    const jwt = getCookie('jwt')

    const getProgramsData = async () => {
      let authData = await checkAuth({ jwt })
      let result = await fetch(`${process.env.VUE_APP_API_URI}/student/${authData.id}/program`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          jwt
        }
      })
      let jsonData = await result.json()
      // console.log(jsonData)
      programsData.value = jsonData
    }

    const updateStatus = (state, data = {}) => {
      if(state === 'Detail') programData.value = data
      status.value = state
    }

    onMounted(() => {
      getProgramsData()
      document.title = 'Home - SIM MBKM FTI'
    })

    return { status, programsData, programData, updateStatus }
  }
}
</script>

<style>

</style>