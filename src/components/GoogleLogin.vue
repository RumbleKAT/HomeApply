<template>
    <div>
        <!-- Email : {{googleUser}}<p/> -->
        <template v-if="isLogin == false">
        <button id="my-signin2" align="left">signin</button>

        </template>
        <template v-else>
          <button @click="signout" align="left">signout</button>
        </template>
    </div>    
</template>

<script>
export default {
  name: "GoogleAuth",
   data() {
    return {
      googleUser: null,
      isLogin : false,
    };
  },
  mounted() {
    this.setUpGoogleLogin();
  },
  methods: {
    onSuccess(googleUser) {
      const { zv } = googleUser.Ju;
      this.googleUser = zv;
      this.$emit('updateEmail', this.googleUser);
      this.isLogin = true;
    },
    onFailure(error) {
      alert('login failure!');
      console.error(error);
    },
    signout() {
      const authInst = window.gapi.auth2.getAuthInstance();
      this.isLogin = false;
      this.$emit('updateEmail', '');
      authInst.signOut().then(() => {
        this.setUpGoogleLogin();
        console.log('User Signed Out!!!');
      });
    },
    setUpGoogleLogin(){
      window.gapi.signin2.render('my-signin2', {
        scope: 'profile email',
        width: 240,
        height: 50,
        longtitle: true,
        theme: 'dark',
        onsuccess: this.onSuccess,
        onfailure: this.onFailure,
      });
    }
  },
}
</script>

<style>
#my-signin2{
  background-color : #f1f1f1;
}
</style>