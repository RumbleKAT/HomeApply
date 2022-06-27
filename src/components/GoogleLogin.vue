<script>
import { googleTokenLogin,googleLogout } from "vue3-google-login"
import axios from 'axios';

export default {
  data() {
    return {
      googleUser: null,
      isLogin : false,
    };
  },
  methods :{
    async login(){
      const response = await googleTokenLogin();
      const res = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${response.access_token}`)
      const { email } = res.data;
      this.$emit('updateEmail', email);
      this.isLogin = true;
      this.googleUser = email;
    },
    async logout(){
      this.isLogin = false;
      this.googleUser = null;
      await this.$emit('updateEmail', '');

      googleLogout();
    }
  }
}
</script>

<template>
  <template v-if="isLogin == false">
  <div class="sub_container">
    <button @click="login">Google 로그인</button>
  </div>
  </template>
  <template v-else>
  <div class="sub_container">
    <button @click="logout" style="background-color:#F9A40E">Google 로그아웃</button>
  </div>
  </template>
</template>
