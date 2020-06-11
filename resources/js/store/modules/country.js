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
        commit('setCountriesStatus','loading');
        axios.get('/api/stats/get_sidebar_list')
            .then(res => {
                commit('setCountries',res.data);
                commit('setCountriesStatus','success');
            })
            .catch(error => {
                commit('setCountriesStatus','error');
            });
    },
    setCountry({commit,state},country){
        commit('setCountry',country);
    },
};

const mutations = {
    setCountry(state, country) {
        if(state.countriesIndex.indexOf(country.name.country) === -1){
            state.countriesIndex.push(country.name.country);
        }
        state.countries[country.id] = country;
    },
    setCountries(state, countries) {
        countries.forEach((country,index) => {
            if(country.id > 0){
                if(!state.countriesIndex.includes(country.name.country)){
                    state.countriesIndex.push(country.name.country);
                }
                state.countries[country.id] = country;
            }
        });
        state.countries = countries;
    },
    setCountriesStatus(state, status) {
        state.countriesStatus = status;
    },
};

export default {
    state, getters, actions, mutations,
}
