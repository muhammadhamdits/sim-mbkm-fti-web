<template>
  <div v-if="courseStatus === 'List'">
    <AdminCourseList @statusChange="updateStatus" :initCourses="initCourses"></AdminCourseList>
  </div>
  <div v-else>
    <AdminCourseForm @statusChange="updateStatus" :formData="formData"></AdminCourseForm>
  </div>

  <Modal @closeModal="closeModal" v-if="modalData.status">
    <div v-if="modalData.type === 'flashMessage'">
      <h2><span class="material-icons">check</span></h2>
      <h4>{{ modalData.message }}</h4>
    </div>
    <div v-else>
      <h4>Are you sure you want to delete this course data?</h4>
      <h2>{{ modalData.course.name }}</h2>
      <button class="btn btn-warning btn-md" @click="closeModal">
        <span class="material-icons">arrow_back</span> No, go back!
      </button>
      <button class="btn btn-danger btn-md" @click="deleteCourse">
        <span class="material-icons">delete</span> Yes, delete it!
      </button>
    </div>
  </Modal>
</template>

<script>
import AdminCourseList from '@/components/AdminCourseList.vue'
import AdminCourseForm from '@/components/AdminCourseForm.vue'
import Modal from '@/components/Modal.vue'
import { getCookie } from "@/utils/function"
import { ref } from '@vue/reactivity'

export default {
  name: 'Course',
  components: {
    AdminCourseList,
    AdminCourseForm,
    Modal
  },
  emits: ['statusChange'],
  setup(){
    const courseStatus = ref('List')
    const initCourses = ref({})
    const formData = ref({})
    const modalData = ref({ status: false })
    const url = `http://192.168.100.38:5000/course`
    const jwt = getCookie('jwt')

    const getCourses = async() => {
      let result = await fetch(url, {
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

    const deleteCourse = async() => {
        let result = await fetch(`${url}/${modalData.value.course.id}`, {
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
        getCourses()
        modalData.value = jsonModal
      }
    }

    const updateStatus = (status, data={}) => {
      if(status === 'Add'){
        formData.value = {
          status,
          formTitle: 'Add New Course Data',
          buttonTitle: 'Submit'
        }
      }else if(status === 'List'){
        modalData.value = data
        if(data.type === 'flashMessage') getCourses()
      }else if(status === 'Edit'){
        formData.value = {
          status,
          formTitle: `Update Course ${data.name} Data`,
          buttonTitle: 'Submit',
          course: data
        }
      }

      courseStatus.value = status
    }

    const closeModal = () => {
      modalData.value = { status: false }
    }

    getCourses()

    return { courseStatus, initCourses, formData, modalData, deleteCourse, updateStatus, closeModal }
  }
}
</script>

<style>
h2{
  color: #42b983;
}

h2 .material-icons{
  font-size: 2em;
  color: #42b983;
}

.btn{
  border: none;
  padding: 4px 8px;
  cursor: pointer;
  border-radius: 12px;
  margin: 0 2px;
}

.btn-md{
  padding: 12px 16px;
  font-size: 1em;
  font-weight: bold;
  margin: 8px 8px 0 8px;
}

.btn-md .material-icons{
  font-size: 1.6em;
  vertical-align: middle;
  margin: -8px 0 -4px -8px;
}

.btn-warning:hover{
  color: white;
  background-color: orange;
}

.btn-warning{
  border: 1px solid orange;
  background-color: white;
  color: orange;
}

.btn-danger:hover{
  background-color: firebrick;
  color: #fff;
}

.btn-danger{
  border: 1px solid firebrick;
  background-color: white;
  color: firebrick;
}
</style>