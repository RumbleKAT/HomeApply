<template>
<div class="wrapper">
  <Calendar/>
</div>
</template>

<script>
import Calendar from '../components/EventCalendar.vue';
export default {
    name : 'Main',
    components : {
        Calendar
    },
    computed: {
    }
}
</script>

<style>
</style>