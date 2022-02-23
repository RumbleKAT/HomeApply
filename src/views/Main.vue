<template>
<div class="wrapper">
  <Calendar/>
</div>
{{count}}
</template>

<script>
import Calendar from '../components/EventCalendar.vue';
export default {
    name : 'Main',
    components : {
        Calendar
    },
    computed: {
        count(){
            return this.$store.getters.increase;
        }
    }
}
</script>

<style>
</style>