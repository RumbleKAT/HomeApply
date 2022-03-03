import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const myApp = createApp(App)
myApp.use(router);
myApp.use(store);
myApp.use(BootstrapVue)
myApp.use(IconsPlugin)

myApp.mount('#app')

