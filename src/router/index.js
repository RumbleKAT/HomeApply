import { createWebHistory, createRouter } from "vue-router"; 
import Main from '../views/Main.vue';
import Today from '../views/Today.vue';

const routes = [{
    path : '/HomeApply/',
    component : Main
},{
    path : '/HomeApply/today',
    component : Today
}];

const router = createRouter({
    history : createWebHistory(),
    routes
})

export default router;