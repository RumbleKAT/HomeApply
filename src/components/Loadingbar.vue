<template>
<div :style="{ display : active } ">
    Loading Bar
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

</style>