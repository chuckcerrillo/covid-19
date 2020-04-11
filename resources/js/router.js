import Vue from 'vue';
import VueRouter from "vue-router";
import Main from './views/Main';
import About from "./views/About";

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',

    routes: [
        {
            path: '/', name: 'home', component: Main,
        },
        {
            path: '/about', name: 'about', component: About,
        }
    ]
});
