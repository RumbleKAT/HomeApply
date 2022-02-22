<template>
 <h1>mail form</h1>
 {{count}}
</template>

<script>
export default {
    computed : {
        count(){
            return this.$store.state.count;
        }
    },
    mounted(){
        this.$store.dispatch('increamentAsync');
    }
}
</script>

<style>

</style>