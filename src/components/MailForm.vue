<template>
 <h1>mail form</h1>
 {{count}}
 {{response}}
</template>

<script>
export default {
    computed : {
        count(){
            return this.$store.state.count;
        },
        response(){
            return this.$store.state.response;
        }
    },
    mounted(){
        // this.$store.dispatch('increamentAsync');
        this.$store.dispatch('getData');
    }
}
</script>

<style>

</style>