<template>
    <LoadingBar :toggled="{ active: loadingbar}" />
    <WeeklyInfo/>
</template>
<script>
import LoadingBar from '@/components/Loadingbar.vue';
import WeeklyInfo from '../components/WeekyInfo.vue';

export default {
    name: 'Today',
    components : {
        WeeklyInfo,
        LoadingBar
    },
    data() {
        return {
            
        }
    },
    computed: {
      loadingbar() { return this.$store.state.loadingbar }
    },
    mounted(){
        //get the nonApt remain Apt infos
        this.$store.dispatch('getData');
    }
}
</script>
<style lang="">
    
</style>