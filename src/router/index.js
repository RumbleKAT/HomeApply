import { createWebHistory, createRouter } from "vue-router"; 
import Main from '../views/Main.vue';
import Sub from '../views/Sub.vue';
import Today from '../views/Today.vue';

const routes = [{
    path : '/',
    component : Today
},{
    path : '/mail',
    component : Sub
},{
    path : '/calendar',
    component : Main
}];

const router = createRouter({
    history : createWebHistory(),
    routes
})

export default router;