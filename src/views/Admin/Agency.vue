<template>
  <div v-if="agencyStatus === 'List'">
    <AdminAgencyList @statusChange="updateStatus" :alerts="alerts"></AdminAgencyList>
  </div>
  <div v-else-if="agencyStatus === 'Add' || agencyStatus === 'Edit'">
    <AdminAgencyAdd @statusChange="updateStatus" :agencyData="agencyData"></AdminAgencyAdd>
  </div>
  <div v-else-if="agencyStatus === 'Show'">
    <AdminAgencyShow @statusChange="updateStatus" :agencyData="agencyData"></AdminAgencyShow>
  </div>
</template>

<script>
import AdminAgencyList from '@/components/AdminAgencyList.vue'
import AdminAgencyAdd from '@/components/AdminAgencyAdd.vue'
import AdminAgencyShow from '@/components/AdminAgencyShow.vue'

export default {
  name: 'Agency',
  components: {
    AdminAgencyList,
    AdminAgencyAdd,
    AdminAgencyShow
  },
  emits: ['statusChange'],
  data(){
    return {
      agencyStatus: 'List',
      agencyData: '',
      alerts: { status: false, message: 'Berhasil menambahkan data' }
    }
  },
  methods: {
    updateStatus(status, data, alerts={ status: false, message: 'Berhasil menambahkan data' }){
      this.agencyStatus = status
      this.agencyData = data
      this.alerts = alerts
    }
  },
  mounted(){
    document.title = 'Agency - SIM MBKM FTI'
  }
}
</script>

<style>

</style>