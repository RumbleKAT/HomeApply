<template>
    <div class="modal">
    <div class="modal__background"></div>
    <div class="modal__content">
        <h1>Modal</h1>
        {{selected}}
        <div>
          <button @click.self="$emit('close-modal')">Close</button>
        </div>
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

.modal__background {
  width: 100%;
  height: 100%;
  position: absolute;
}

.modal__content {
  position: absolute;
  padding: 5em;
  background: #42b983;
  max-width: 400px;
  border-radius: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 1px 1px 2rem rgba(0, 0, 0, 0.3);
}

.button{

}
</style>