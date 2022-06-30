<script>
import { googleTokenLogin,googleLogout } from "vue3-google-login"
import axios from 'axios';

export default {
  props:["isLogin"],
  data() {
    return {
      googleUser: null,
      isLoginChk : false,
    };
  },
  mounted(){
    if(this.$store.state.subscribe != ''){
      this.isLoginChk = true;
    }  
  }, 
  methods :{
    async login(){
      const response = await googleTokenLogin();
      const res = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${response.access_token}`)
      const { email } = res.data;
      this.$emit('updateEmail', email);
      this.isLoginChk = true;
      this.googleUser = email;

    },
    async logout(){
      this.isLoginChk = false;
      this.googleUser = null;
      await this.$emit('updateEmail', '');

      googleLogout();
    }
  }
}
</script>

<template>
  <template v-if="isLoginChk == false">
  <div class="sub_container">
    <button @click="login">Google 로그인</button>
  </div>
  </template>
  <template v-else>
  <div class="sub_container">
    <button @click="logout" style="background-color:#F9A40E;" >Google 로그아웃</button>
  </div>
  </template>
</template>
