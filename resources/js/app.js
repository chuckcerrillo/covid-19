import Vue from 'vue';
import router from './router';
import App from './components/App';
import VueNumerals from 'vue-numerals';

require('./bootstrap');

window.Vue = require('vue');

import moment from 'moment'
Vue.prototype.moment = moment

Vue.use(VueNumerals);

const app = new Vue({
    el: '#app',
    components: {
        App
    },
    router
});
