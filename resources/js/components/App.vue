<template>
    <div class="flex flex-col flex-1 h-screen overflow-y-hidden">
        <Nav
            class="fixed top-0 inset-x-0 z-0"
            v-on:showAbout="showAbout"
            v-on:setMode="setMode"
            v-if="inComparison()"
            :mode="mode"
        />
<!--        <About-->
<!--            v-show="about"-->
<!--            v-on:showAbout="showAbout"-->
<!--            class="fixed top-0 right-0 bottom-0 left-0 z-20"-->
<!--        />-->

<!--        :include="[-->
<!--        'comparisonDashboard',-->
<!--        'comparisonCharts'-->
<!--        ]"-->
<!--        include="comparisonDashboard,DashboardView,Map"-->
        <keep-alive>
            <router-view
                v-on:updateCompare="updateCompare"
                v-on:updateSelected="updateSelected"
                v-on:updateLoading="updateSelected"
                v-on:saveProcessedData="saveProcessedData"
                v-on:updateGovtResponse="updateGovtResponse"
                :mode="mode"

                class="fixed xl:pt-0 top-0 left-0 right-0 bottom-0" :class="inComparison()?'pt-14 xl:pt-0 xl:mt-14':''" :loading="database.loading" :database="database">
            </router-view>
<!--            :key="$route.fullPath"-->
        </keep-alive>
        <MobileNav
            class="xl:hidden fixed bottom-0 inset-x-0 z-0"
            v-on:showAbout="showAbout"
            v-on:setMode="setMode"
            v-if="inComparison()"
            :mode="mode"
        />
    </div>
</template>

<script>
    import Nav from './Nav';
    import MobileNav from "./MobileNav";
    import About from "../views/About";
    import {mapGetters} from 'vuex';
    export default {
        name: "App",
        data()
        {
            return {
                about: false,
                mode: '',
                database: {
                    raw: {
                        'raw_global': [],
                        'raw_countries': [],
                        'raw_state_data': [],
                        'raw_stats': [],
                        'raw_annotations' : [],
                        'raw_oxford' : [],
                    },
                    processed: {
                        'global' : {},
                        'countries': {},
                        'compare' : {},
                        'dataset' : {},
                        'oxford' : {},
                        'annotations' : {},
                        'country_ids': {},
                        'selectedCompareTab' : '',
                    },
                    loading: {
                        'countries' : false,
                        'states' : false,
                        'annotations' : false,
                        'global' : false,
                        'oxford' : false,
                    },
                },
            }
        },
        components: {
            Nav,
            MobileNav,
            About
        },
        created()
        {

        },
        mounted()
        {
            this.setPageTitle(this.$route.meta.title);
        },
        methods: {
            updateGovtResponse(country,data)
            {
                this.database.processed.oxford[country] = _.clone(data);
            },
            showAbout()
            {
                this.about = !this.about;
            },
            setMode(mode)
            {
                this.mode = mode;
            },
            updateSelected(key)
            {
                this.database.processed.selectedCompareTab = key;
            },
            updateLoading(key,value)
            {
                if(this.database.loading && this.database.loading[key])
                {
                    this.database.loading[key] = _.clone(value);
                }
            },
            updateCompare(compare)
            {
                var data = {};
                for(var x in compare)
                {
                    data[x] = compare[x];
                }
                this.database.processed.compare = data;
            },
            saveProcessedData(row,name)
            {
                this.database.processed.dataset[name] = row;
            },
            setPageTitle(title)
            {
                document.title = title + ' | COVID19 Tracker';
            },
            inComparison()
            {
                if(this.$route.name != 'global')
                {
                    return true;
                }
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
            // global()
            // {
            //     return this.database.processed.global;
            // },
            // countries()
            // {
            //     return this.database.processed.countries;
            // },
            // datasets()
            // {
            //     return this.database.processed.dataset;
            // }
        },
        watch: {
            $route(to,from) {
                this.setPageTitle(to.meta.title);
            },
        }
    }
</script>

<style scoped>

</style>
