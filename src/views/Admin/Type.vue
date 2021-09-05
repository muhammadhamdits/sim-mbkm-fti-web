<template>
  <div v-if="typeStatus === 'List'">
    <AdminTypeList @statusChange="updateStatus" :initTypes="initTypes"></AdminTypeList>
  </div>
  <div v-else>
    <AdminTypeForm @statusChange="updateStatus" :formData="formData"></AdminTypeForm>
  </div>
  
  <Modal @closeModal="closeModal" v-if="modalData.status">
    <div v-if="modalData.type === 'flashMessage'">
      <h2><span class="material-icons">check</span></h2>
      <h4>{{ modalData.message }}</h4>
    </div>
    <div v-else>
      <h4>Are you sure you want to delete this program type data?</h4>
      <h2>{{ modalData.data.name }}</h2>
      <button class="btn btn-warning btn-md" @click="closeModal">
        <span class="material-icons">arrow_back</span> No, go back!
      </button>
      <button class="btn btn-danger btn-md" @click="deleteType">
        <span class="material-icons">delete</span> Yes, delete it!
      </button>
    </div>
  </Modal>
</template>

<script>
import AdminTypeList from '@/components/AdminTypeList.vue'
import AdminTypeForm from '@/components/AdminTypeForm.vue'
import Modal from '@/components/Modal.vue'
import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import { getCookie } from "@/utils/function"

export default {
  name: 'Type',
  components: {
    AdminTypeList,
    AdminTypeForm,
    Modal
  },
  emits: ['statusChange'],
  setup(){
    const typeStatus = ref('List')
    const initTypes = ref({})
    const modalData = ref({ status: false })
    const formData = ref('')
    const url = `${process.env.VUE_APP_API_URI}/type`
    const jwt = getCookie('jwt')

    const updateStatus = (status, jsonData=modalData.value) => {
      if(status === 'Add'){
        formData.value = {
          dom: {
            formTitle: "Add New Program Type",
            buttonTitle: "Submit",
            status
          },
          typeData: { name: '' }
        }
      }else if(status === 'Edit'){
        formData.value = {
          dom: {
            formTitle: `Update ${jsonData.name} Program Type`,
            buttonTitle: "Update",
            status
          },
          typeData: jsonData
        }
      }else if(status === 'List'){
        modalData.value = jsonData
      }
      
      typeStatus.value = status
    }

    const closeModal = () => {
      modalData.value = { status: false }
    }

    const getTypes = async() => {
      let result = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          jwt
        }
      })
      let jsonData = await result.json()

      initTypes.value = jsonData
    }

    onMounted(() => {
      document.title = 'Program Type - SIM MBKM FTI'
    })

    return { typeStatus, initTypes, modalData, formData, url, jwt, updateStatus, closeModal, getTypes }
  },
  methods: {
    async deleteType(){
      let res = await fetch(`${this.url}/${this.modalData.data.id}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          jwt: this.jwt
        }
      })
      let jsonData = await res.json()

      if(jsonData.success){
        let jsonModal = {
          status: true,
          type: 'flashMessage',
          message: jsonData.success
        }
        this.getTypes()
        this.modalData = jsonModal
      }
    }
  }
}
</script>

<style scoped>
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