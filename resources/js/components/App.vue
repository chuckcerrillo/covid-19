<template>
    <div class="flex flex-col flex-1 h-screen overflow-y-hidden">
        <Nav
            v-on:showAbout="showAbout"
            v-on:setMode="setMode"
            :mode="mode"
        />
        <div class="hidden">{{countries}}</div>
        <About
            v-show="about"
            v-on:showAbout="showAbout"
            class="fixed top-0 right-0 bottom-0 left-0 z-20"
        />
        <router-view
            v-on:updateCompare="updateCompare"
            v-on:saveProcessedData="saveProcessedData"
            :mode="mode" :key="$route.fullPath" class="fixed top-0 left-0 right-0 bottom-0 xl:mt-14" :loading="database.loading" :database="database"></router-view>
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
                    },
                    processed: {
                        'global' : {},
                        'countries': {},
                        'compare' : [],
                        'dataset' : {},
                    },
                    loading: {
                        'countries' : false,
                        'states' : false,
                        'annotations' : false,
                        'global' : false,
                    },
                },
                title: '',
            }
        },
        components: {
            Nav,
            About
        },
        mounted()
        {
            axios.get('/api/stats/global')
                .then(res => {
                    this.database.raw.raw_global = res.data;
                    this.database.loading.global = true;
                })
                .catch(error => {

                });

            axios.get('/api/stats/countries')
                .then(res => {
                    this.database.raw.raw_countries = res.data;
                    this.database.loading.countries = true;
                })
                .catch(error => {

                });

            axios.get('/api/stats/states')
                .then(res => {
                    this.database.raw.raw_state_data = res.data;
                    this.database.loading.states = true;
                })
                .catch(error => {

                });

            axios.get('/api/stats/annotations')
                .then(res => {
                    this.database.raw.raw_annotations = res.data;
                    this.database.loading.annotations = true;
                })
                .catch(error => {

                });
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
            updateCompare(compare)
            {
                this.database.processed.compare = compare;
            },
            saveProcessedData(row,name)
            {
                this.database.processed.dataset[name] = row;
            },
        },
        computed:
        {
            global()
            {
                return this.database.processed.global;
            },
            countries()
            {
                console.log('App.vue - countries');
                console.log(this.database.processed.countries);
                return this.database.processed.countries;
            },
        },
        watch: {
            $route(to,from) {
                this.title = to.meta.title;
            },
            title() {
                document.title = this.title + ' | COVID19 Tracker';
            }
        }
    }
</script>

<style scoped>

</style>
