<template>
    <div>
        GOOGLE User INFO : {{googleUser}}<p/>
        <div id="my-signin2"></div><p/>
        <button @click="signout" align="left">signout</button>
    </div>    
</template>

<script>
export default {
    name: "GoogleAuth",
   data() {
    return {
      googleUser: null,
    };
  },
  mounted() {
    window.gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
      onsuccess: this.onSuccess,
      onfailure: this.onFailure,
    });
  },
  methods: {
    onSuccess(googleUser) {
      // eslint-disable-next-line
      console.log(googleUser);
      this.googleUser = googleUser.getBasicProfile();
    },
    onFailure(error) {
      // eslint-disable-next-line
      console.log(error);
    },
    signout() {
      const authInst = window.gapi.auth2.getAuthInstance();
      authInst.signOut().then(() => {
        // eslint-disable-next-line
        console.log('User Signed Out!!!');
      });
    },
  },
}
</script>

<style>

</style>