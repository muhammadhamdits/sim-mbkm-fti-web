<template>
  <div class="modalContainer" @click="closeModal" ref="modal">
    <div class="modal">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  emits: ['closeModal'],
  methods: {
    closeModal(e){
      if(e.target === this.$refs.modal){
        this.$emit('closeModal')
      }
    }
  }
}
</script>

<style scoped>
.modalContainer{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 16px;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.modal{
  background-color: #fff;
  border: 2px solid #42b983;
  padding: 32px;
  margin: 128px auto;
  width: fit-content;
  border-radius: 24px;
  max-width: 640px;
}
</style>