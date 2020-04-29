import Vue from 'vue';
import Vuex from 'vuex';
import Country from "./modules/country";
// import State from "./modules/state";
import Daily from "./modules/daily";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        Country,
        // State,
        Daily,
        // GovtResponse,
        // Annotations,
    }
});
