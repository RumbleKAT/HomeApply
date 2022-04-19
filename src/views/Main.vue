<template>
<div class="wrapper">
  <Filter />
  <LoadingBar :toggled="{ active: loadingbar}" />
  <Calendar/>
</div>
</template>

<script>
import LoadingBar from '@/components/Loadingbar.vue';
import Calendar from '../components/EventCalendar.vue';
import Filter from '@/components/Filter.vue';

export default {
    name : 'Main',
    components : {
        Calendar,
        LoadingBar,
        Filter
    },
    computed: {
      loadingbar() { return this.$store.state.loadingbar }
    }
}
</script>

<style>
</style>