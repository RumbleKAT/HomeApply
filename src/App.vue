<template>
<div>
  <evenCalendar/>
</div>
</template>

<script>
import evenCalendar from './components/EventCalendar.vue';
export default {
  name: 'App',
  components: {
    evenCalendar
  },
  data() {
    return {
      date: new Date(),
    };
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
