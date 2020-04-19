import Vue from 'vue';
import VueRouter from "vue-router";
import Main from './views/Global';
import About from "./views/About";
import Comparison from "./views/Comparison";
import Glossary from "./views/Glossary";

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',

    routes: [
        {
            // Global page
            path: '/', name: 'global', component: Main,
            meta: {title: 'Global statistics'}
        },
        {
            // Comparison page
            path: '/comparison', name: 'compare', component: Comparison,
            meta: {title: 'Compare statistics'}
        },
        {
            // Daily page
            path: '/comparison/daily', name: 'comparisonDaily', component: Comparison,
            meta: {title: 'Compare daily statistics'}
        },
        {
            // Daily page
            path: '/comparison/charts', name: 'comparisonCharts', component: Comparison,
            meta: {title: 'Compare charts'}
        },
        {
            // Govt response
            path: '/comparison/response', name: 'comparisonResponse', component: Comparison,
            meta: {title: 'Government Response'}
        },
        {
            path: '/glossary', name: 'glossary', component: Glossary,
            meta: {title: 'Glossary'}
        }
    ]
});
