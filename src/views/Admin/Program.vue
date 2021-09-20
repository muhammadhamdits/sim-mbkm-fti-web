<template>
  <div v-if="programStatus === 'List'">
    <AdminProgramList @statusChange="updateStatus" :initPrograms="initPrograms"></AdminProgramList>
  </div>
  <div v-else>
    <AdminProgramForm @statusChange="updateStatus" :formData="formData"></AdminProgramForm>
  </div>

  <Modal @closeModal="closeModal" v-if="modalData.status">
    <div v-if="modalData.type === 'flashMessage'">
      <h2><span class="material-icons">check</span></h2>
      <h4>{{ modalData.message }}</h4>
    </div>
    <div v-else>
      <h4>Are you sure you want to delete this program data?</h4>
      <h2>{{ modalData.program.name }}</h2>
      <button class="btn btn-warning btn-md" @click="closeModal">
        <span class="material-icons">arrow_back</span> No, go back!
      </button>
      <button class="btn btn-danger btn-md" @click="deleteProgram">
        <span class="material-icons">delete</span> Yes, delete it!
      </button>
    </div>
  </Modal>
</template>

<script>
import AdminProgramList from '@/components/AdminProgramList.vue'
import AdminProgramForm from '@/components/AdminProgramForm.vue'
import Modal from '@/components/Modal.vue'
import { onMounted, ref } from '@vue/runtime-core'
import { getCookie } from '../../utils/function'

export default {
  name: 'Program',
  components: {
    AdminProgramList,
    AdminProgramForm,
    Modal
  },
  emits: ['statusChange'],
  setup(){
    const programStatus = ref('List')
    const initPrograms = ref({})
    const initCourses = ref({})
    const formData = ref({})
    const modalData = ref({ status: false })
    const url = `${process.env.VUE_APP_API_URI}/program`
    const jwt = getCookie('jwt')

    const getCourses = async() => {
      let result = await fetch(`${process.env.VUE_APP_API_URI}/course`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          jwt
        }
      })
      let jsonData = await result.json()
      initCourses.value = jsonData
    }

    const getPrograms = async () => {
        let result = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          jwt
        }
      })
      let jsonData = await result.json()
      // console.log(jsonData)
      initPrograms.value = jsonData
    }

    const deleteProgram = async() => {
        let result = await fetch(`${url}/${modalData.value.program.id}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          jwt
        }
      })
      let jsonData = await result.json()

      if(jsonData.success){
        let jsonModal = {
          status: true,
          type: 'flashMessage',
          message: jsonData.success
        }
        getPrograms()
        modalData.value = jsonModal
      }
    }

    const updateStatus = (status, data = {}) => {
      if(status === 'Add'){
        formData.value = {
          status,
          formTitle: 'Add New Program Data',
          courses: initCourses.value
        }
      }else if(status === 'List'){
        modalData.value = data
        if(data.type === 'flashMessage') getPrograms()
      }else if(status === 'Edit'){
        formData.value = {
          status,
          formTitle: `Update Program ${data.name}`,
          program: data,
          courses: initCourses.value
        }
      }else if(status === 'Show'){
        formData.value = {
          status,
          formTitle: `Detail Program ${data.name}`,
          program: data,
          courses: initCourses.value
        }
      }

      programStatus.value = status
    }

    const closeModal = () => {
      modalData.value = { status: false }
    }

    onMounted(() => {
      getPrograms()
      getCourses()
      document.title = 'Program - SIM MBKM FTI'
      document.body.style.backgroundColor = "#fff";
    })

    return { programStatus, initPrograms, formData, modalData, deleteProgram, updateStatus, closeModal }
  }
}
</script>

<style>

</style>