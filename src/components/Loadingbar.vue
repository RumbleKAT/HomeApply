<template>
<div :style="{ display : active } ">
  <div class="loading-overlay">
    <div class="loading-bar">
      <div class="bar"></div>
    </div>
  </div>
</div>
</template>

<script>
export default {
    name : 'LoadingBar',
    props : ["toggled"],
    computed : { 
        active(){
            if(this.toggled.active){
                return "block"
            }else{
                return "none";
            }
        }
    }
}
</script>

<style>
/*.lds-ring {*/
/*  display: inline-block;*/
/*  position: relative;*/
/*  width: 80px;*/
/*  height: 80px;*/
/*}*/
/*.lds-ring div {*/
/*  box-sizing: border-box;*/
/*  display: block;*/
/*  position: absolute;*/
/*  width: 64px;*/
/*  height: 64px;*/
/*  margin: 8px;*/
/*  border: 8px solid #2c3e50;*/
/*  border-radius: 50%;*/
/*  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;*/
/*  border-color: #2c3e50 transparent transparent transparent;*/
/*}*/
/*.lds-ring div:nth-child(1) {*/
/*  animation-delay: -0.45s;*/
/*}*/
/*.lds-ring div:nth-child(2) {*/
/*  animation-delay: -0.3s;*/
/*}*/
/*.lds-ring div:nth-child(3) {*/
/*  animation-delay: -0.15s;*/
/*}*/
/*@keyframes lds-ring {*/
/*  0% {*/
/*    transform: rotate(0deg);*/
/*  }*/
/*  100% {*/
/*    transform: rotate(360deg);*/
/*  }*/
/*}*/

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999;
}

.loading-bar {
  width: 80%;
  max-width: 300px;
  height: 30px;
  background-color: #ffffff;
  border-radius: 15px;
  position: relative;
  overflow: hidden;
}

.bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /*  border-color: #2c3e50 transparent transparent transparent;*/

  background-color: #2c3e50;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>