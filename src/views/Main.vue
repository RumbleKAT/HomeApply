<template>
<div class="wrapper">
  <LoadingBar :toggled="{ active: loadingbar}" />
  <Calendar/>
</div>
</template>

<script>
import LoadingBar from '@/components/Loadingbar.vue';
import Calendar from '../components/EventCalendar.vue';

export default {
    name : 'Main',
    components : {
        Calendar,
        LoadingBar
    },
    computed: {
      loadingbar() { return this.$store.state.loadingbar }
    }
}
</script>

<style>
</style>