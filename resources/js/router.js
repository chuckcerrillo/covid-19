import Vue from 'vue';
import VueRouter from "vue-router";
import Main from './views/Main';

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',

    routes: [
        {
            path: '/', name: 'home', component: Main,
        }
    ]
});
