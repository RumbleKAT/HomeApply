<template>
    <WeeklyInfo/>
</template>
<script>
import WeeklyInfo from '../components/WeekyInfo.vue';

export default {
    name: 'Today',
    components : {
        WeeklyInfo
    },
    data() {
        return {
            
        }
    },
    mounted(){
        //get the nonApt remain Apt infos
        this.$store.dispatch('getData');
    }
}
</script>
<style lang="">
    
</style>