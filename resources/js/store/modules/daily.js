const state = {
    dailyStateCases: {},
    dailyStateCasesIndex: [],
    dailyStateCasesStatus: null,

    dailyCountryCases: {},
    dailyCountryCasesIndex: [],
    dailyCountryCasesStatus: null,

};

const getters = {
    dailyStateCases: state => {
        return state.dailyStateCases;
    },
    dailyCountryCases: state => {
        return state.dailyCountryCases;
    },
    dailyStateCasesIndex: state => {
        return state.dailyStateCasesIndex;
    },
    dailyCountryCasesIndex: state => {
        return state.dailyCountryCasesIndex;
    },
    dailyCountryCasesStatus: state => {
        return state.dailyCountryCasesStatus;
    },
    dailyStateCasesStatus: state => {
        return state.dailyStateCasesStatus;
    }
};

const actions = {
    fetchCountryCases({commit,state}){
        commit('setDailyCountryCasesStatus','loading');
        axios.get('/api/stats/get_countries_daily')
            .then(res => {
                commit('setDailyCountryCases',res.data);
                commit('setDailyCountryCasesStatus','success');
            })
            .catch(error => {
                commit('setDailyCountryCasesStatus','error');
            });
    },
    fetchStateCases({commit,state}){
        commit('setDailyStateCasesStatus','loading');
        axios.get('/api/stats/get_states_daily')
            .then(res => {
                commit('setDailyStateCases',res.data);
                commit('setDailyStateCasesStatus','success');
            })
            .catch(error => {
                commit('setDailyStateCasesStatus','error');
            });
    },
};

const mutations = {
    setDailyCountryCases(state, dailyCases){
        state.dailyCountryCases = dailyCases;
    },
    setDailyStateCases(state, dailyCases){
        state.dailyStateCases = dailyCases;
    },
    setDailyCountryCasesStatus(state, status) {
        state.dailyCountryCasesStatus = status;
    },
    setDailyStateCasesStatus(state, status) {
        state.dailyStateCasesStatus = status;
    },
};

export default {
    state, getters, actions, mutations,
}
