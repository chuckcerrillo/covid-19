<template>
    <div class="bg-darkslab xl:bg-slab text-white text-left">
        <div class="py-2 px-2 flex text-heading items-center justify-between xl:justify-center">
            <router-link to="/" class="flex items-center"><img src="/img/logo/logo-140.png" style="height:40px" />
                <div class="xl:w-128 py-2 px-2 font-bold mx-2">COVID-19 Tracker <sup class="font-normal">beta</sup></div>
            </router-link>
            <div class="hidden xl:hidden">
                <svg class="text-lightlabel h-8 fill-current" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 28 28">
                    <g>
                        <path d="M25.66,1.84H2.34a.51.51,0,0,0-.5.5V7.7a.5.5,0,0,0,.5.5H25.66a.5.5,0,0,0,.5-.5V2.34A.51.51,0,0,0,25.66,1.84Zm-.5,5.36H2.84V2.84H25.16Z"/><path d="M25.66,10.82H2.34a.5.5,0,0,0-.5.5v5.36a.5.5,0,0,0,.5.5H25.66a.5.5,0,0,0,.5-.5V11.32A.5.5,0,0,0,25.66,10.82Zm-.5,5.36H2.84V11.82H25.16Z"/><path d="M25.66,19.8H2.34a.5.5,0,0,0-.5.5v5.36a.51.51,0,0,0,.5.5H25.66a.51.51,0,0,0,.5-.5V20.3A.5.5,0,0,0,25.66,19.8Zm-.5,5.36H2.84V20.8H25.16Z"/>
                    </g>
                </svg>
            </div>
            <!--            <router-link to="/comparison" @click="setMode('trends')" class="p-2 px-4 cursor-pointer hover:text-white" :class="isActive('comparisonDashboard','bg-hoverslab')">Dashboard</router-link>-->
            <router-link to="/comparison/response" @click="setMode('trends')" class="hidden xl:block p-2 px-4 cursor-pointer hover:text-white" :class="isActive('comparisonResponse','bg-hoverslab')">Government Response</router-link>
            <router-link to="/comparison/daily" @click="setMode('trends')" class="hidden xl:block p-2 px-4 cursor-pointer hover:text-white" :class="isActive('comparisonDaily','bg-hoverslab')">Daily Breakdown</router-link>
            <router-link to="/comparison/charts" @click="setMode('trends')" class="hidden xl:block p-2 px-4 cursor-pointer hover:text-white" :class="isActive('comparisonCharts','bg-hoverslab')">Charts</router-link>
            <router-link to="/comparison/map" @click="setMode('trends')" class="hidden xl:block p-2 px-4 cursor-pointer hover:text-white" :class="isActive('comparisonMap','bg-hoverslab')">Map</router-link>
            <router-link to="/about" @click="setMode('about')" class="hidden xl:block p-2 px-4 cursor-pointer hover:text-white" :class="isActive('about','bg-hoverslab')">About</router-link>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    export default {
        name: "Nav",
        props: [
            'active',
            'mode'
        ],
        mounted()
        {
            if(this.$route.name != 'global')
            {
                this.$store.dispatch('fetchCountries');
                this.$store.dispatch('fetchCountryCases');
                this.$store.dispatch('fetchStateCases');
            }
        },
        computed:
            {
                ...mapGetters({
                    countries: 'countries',
                    countriesIndex: 'countriesIndex',
                    countriesStatus: 'countriesStatus',

                    countryCases: 'dailyCountryCases',
                    stateCases: 'dailyStateCases',
                    countryCasesIndex: 'dailyCountryCasesIndex',
                    stateCasesIndex: 'dailyStateCasesIndex',

                    countryCasesStatus: 'dailyCountryCasesStatus',
                    stateCasesStatus: 'dailyStateCasesStatus',
                }),
            },
        methods: {
            isActive(current, classes){
                if(this.$route.name == current)
                    return classes;
                return '';
            },
            showAbout()
            {
                this.$emit('showAbout');
            },
            setMode(mode)
            {
                this.$emit('setMode',mode)
            },

        }
    }
</script>

<style scoped>

</style>
