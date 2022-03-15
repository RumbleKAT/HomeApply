import { createWebHistory, createRouter } from "vue-router"; 
import Main from '../views/Main.vue';
import Sub from '../views/Sub.vue';

const routes = [{
    path : '/HomeApply',
    redirect :'/HomeApply/home'
},{
    path : '/HomeApply/home',
    component : Main
},{
    path : '/HomeApply/mail',
    component : Sub
}];

const router = createRouter({
    history : createWebHistory(),
    routes
})

export default router;