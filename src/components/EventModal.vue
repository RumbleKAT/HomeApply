<template>
    <div class="modal">
    <div class="modal__background"></div>
    <div class="modal__content">
        <h1>Modal</h1>
        {{selected}}
        <button @click.self="$emit('close-modal')">Close</button>
    </div>
    </div>
</template>

<script>
export default {
    name : 'eventModal',
    props:["selected"]
}
</script>

<style scoped>

.modal {
  display: block;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50;
  left: 0;
  width: 100%;
  height: 100%;
}

.modal__background {
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  position: absolute;
}

.modal__content {
  text-align: center;
  position: relative;
  background-color: white;
  border-radius: 10px;
  top: 0;
  padding: 10px 25px;
  width: 100%;
}
</style>