<template>
<div>
    <div id="nav">
      <div class="navbar">
        <router-link to="/">금주의 청약발표</router-link>
      </div>
      <div class="navbar">
        <router-link to="/calendar">청약달력</router-link>
      </div>
      <template v-if="isAlarm">
        <div class="navbar">
          <router-link to="/mail">메일알람신청</router-link>
        </div>
      </template>
    </div>
    <router-view />
</div>
</template>

<script>
export default {
  name: 'App',
  components: {
    
  },
  computed: {
    isAlarm() { return this.$store.state.isAlarm }
  },
  data() {
    return {
      date: new Date(),
    };
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  display: flex;
  justify-content: space-between;
  background: #2c3e50;
  width:100%;
  height: 50px;
}
#nav .navbar {
  list-style-type: none;
  margin-left: auto;
  margin-right: auto;
  display: inline-block;
  padding: 15px 0;
}

#nav a{
  font-weight: bold;
  color: #fff;
  text-decoration: none;
}

#nav a:hover{
  color : #42b983
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
