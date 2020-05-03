<template>
    <div class="flex flex-col flex-1 h-screen overflow-y-hidden">
        <Nav
            v-on:showAbout="showAbout"
            v-on:setMode="setMode"
            v-show="inComparison()"
            :mode="mode"
        />
<!--        <About-->
<!--            v-show="about"-->
<!--            v-on:showAbout="showAbout"-->
<!--            class="fixed top-0 right-0 bottom-0 left-0 z-20"-->
<!--        />-->
        <router-view
            v-on:updateCompare="updateCompare"
            v-on:updateSelected="updateSelected"
            v-on:saveProcessedData="saveProcessedData"
            :mode="mode" :key="$route.fullPath" class="fixed top-0 left-0 right-0 bottom-0" :class="inComparison()?'xl:mt-14':''" :loading="database.loading" :database="database"></router-view>
    </div>
</template>

<script>
    import Nav from './Nav';
    import About from "../views/About";
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
            About
        },
        mounted()
        {


            // axios.get('/api/stats/countries')
            //     .then(res => {
            //         this.database.raw.raw_countries = res.data;
            //         // for(var x in res.data)
            //         // {
            //         //     this.processed.country_ids[res.data[x].name] = x;
            //         // }
            //         //
            //         // console.log('country ids');
            //         // console.log('this.processed.country_ids');
            //
            //         this.database.loading.countries = true;
            //     })
            //     .catch(error => {
            //
            //     });

            // axios.get('/api/stats/states')
            //     .then(res => {
            //         this.database.raw.raw_state_data = res.data;
            //         this.database.loading.states = true;
            //     })
            //     .catch(error => {
            //
            //     });
            //
            // axios.get('/api/stats/annotations')
            //     .then(res => {
            //         this.database.raw.raw_annotations = res.data;
            //         this.database.loading.annotations = true;
            //     })
            //     .catch(error => {
            //
            //     });
            //
            // axios.get('/api/stats/oxford')
            //     .then(res => {
            //         this.database.raw.raw_oxford = res.data;
            //         this.database.loading.oxford = true;
            //     })
            //     .catch(error => {
            //
            //     });

            this.setPageTitle(this.$route.meta.title);
        },
        methods: {
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
