<template>
    <div class="bg-slab text-white text-left">
        <div class="py-2 px-2 flex text-heading items-center justify-center">
<!--            <router-link to="/comparison" @click="setMode('trends')" class="p-2 px-4 cursor-pointer hover:text-white" :class="isActive('comparisonDashboard','bg-hoverslab')">Dashboard</router-link>-->
            <router-link to="/comparison/response" @click="setMode('trends')" class="p-2 px-4 cursor-pointer hover:text-white" :class="isActive('comparisonResponse','bg-hoverslab')">Response</router-link>
            <router-link to="/comparison/daily" @click="setMode('trends')" class="p-2 px-4 cursor-pointer hover:text-white" :class="isActive('comparisonDaily','bg-hoverslab')">Daily</router-link>
            <router-link to="/comparison/charts" @click="setMode('trends')" class="p-2 px-4 cursor-pointer hover:text-white" :class="isActive('comparisonCharts','bg-hoverslab')">Charts</router-link>
            <router-link to="/comparison/map" @click="setMode('trends')" class="p-2 px-4 cursor-pointer hover:text-white" :class="isActive('comparisonMap','bg-hoverslab')">Map</router-link>
            <router-link to="/about" @click="setMode('about')" class="p-2 px-4 cursor-pointer hover:text-white" :class="isActive('about','bg-hoverslab')">About</router-link>
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
