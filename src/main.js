import { createApp } from 'vue'
import vue3GoogleLogin from 'vue3-google-login'

import App from './App.vue'
import router from './router';
import store from './store';
import vToolTip from 'v-tooltip';

const myApp = createApp(App)
myApp.use(router);
myApp.use(store);
myApp.use(vToolTip);

myApp.use(vue3GoogleLogin, {
    clientId: '356064124368-qjtqfkv23f082ldh3vmde1b8d0i7t3o6.apps.googleusercontent.com'
})

myApp.mount('#app')

