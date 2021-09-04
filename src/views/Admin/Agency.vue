<template>
  <div v-if="agencyStatus === 'List'">
    <AdminAgencyList @statusChange="updateStatus"></AdminAgencyList>
  </div>
  <div v-else-if="agencyStatus === 'Add' || agencyStatus === 'Edit'">
    <AdminAgencyAdd @statusChange="updateStatus" :agencyData="agencyData"></AdminAgencyAdd>
  </div>
</template>

<script>
import AdminAgencyList from '@/components/AdminAgencyList.vue'
import AdminAgencyAdd from '@/components/AdminAgencyAdd.vue'
import { ref } from '@vue/reactivity'

export default {
  name: 'Agency',
  components: {
    AdminAgencyList,
    AdminAgencyAdd
  },
  emits: ['statusChange'],
  data(){
    return {
      agencyStatus: 'List',
      agencyData: ''
    }
  },
  setup(){
    // const agencyStatus = ref('')
    // agencyStatus.value = "List"

    // return { agencyStatus }
  },
  methods: {
    updateStatus(status, data){
      this.agencyStatus = status
      this.agencyData = data
    }
  }
}
</script>

<style>

</style>