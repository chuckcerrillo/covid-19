const state = {
    states: {},
    statesIndex: [],
    statesStatus: null,
};

const getters = {
    states: state => {
        return state.states;
    },
    statesIndex: state => {
        return state.statesIndex;
    },
    statesStatus: state => {
        return state.statesStatus;
    }
};

const actions = {
    fetchStates({commit,state}){
        commit('setStatesStatus','loading');
        axios.get('/api/stats/get_all_states')
            .then(res => {
                commit('setStates',res.data);
                commit('setStatesStatus','success');
            })
            .catch(error => {
                console.log('Unable to fetch all states');
                commit('setStatesStatus','error');
            });
    },
    setState({commit,state},state_record){
        commit('setState',state_record);
    },
};

const mutations = {
    setState(state, state_record) {
        if(state.statesIndex.indexOf(state_record.data.id) === -1){
            state.statesIndex.push(state_record.data.id);
        }
        state.states[state_record.data.id] = state_record;
    },
    setStates(state, state_record) {
        states.data.forEach((state_record,index) => {
            if(state.id > 0){
                if(!state.statesIndex.includes(state_record.id)){
                    state.statesIndex.push(state_record.id);
                }
                state.states[state_record.id] = state_record;
            }
        });
    },
    setStatesStatus(state, status) {
        state.statesStatus = status;
    },
};

export default {
    state, getters, actions, mutations,
}
