const state = {
    countries: {},
    countriesIndex: [],
    countriesStatus: null,
};

const getters = {
    countries: state => {
        return state.countries;
    },
    countriesIndex: state => {
        return state.countriesIndex;
    },
    countriesStatus: state => {
        return state.countriesStatus;
    }
};

const actions = {
    fetchCountries({commit,state}){
        commit('setWardsStatus','loading');
        axios.get('/api/stats/get_all_countries')
            .then(res => {
                commit('setCountries',res.data);
                commit('setCountriesStatus','success');
            })
            .catch(error => {
                console.log('Unable to fetch all countries');
                commit('countriesStatus','error');
            });
    },
    setCountry({commit,state},ward){
        commit('setCountry',ward);
    },
};

const mutations = {
    setCountry(state, country) {
        if(state.countriesIndex.indexOf(country.data.id) === -1){
            state.countriesIndex.push(country.data.id);
        }
        state.countries[country.data.id] = country;
    },
    setCountries(state, countries) {
        countries.data.forEach((country,index) => {
            if(country.data.id > 0){
                if(!state.countriesIndex.includes(country.data.id)){
                    state.countriesIndex.push(country.data.id);
                }
                state.countries[country.data.id] = country;
            }
        });
    },
    setCountriesStatus(state, status) {
        state.countriesStatus = status;
    },
};

export default {
    state, getters, actions, mutations,
}
