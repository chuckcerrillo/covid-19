<template>
    <div>
        <div class="h-full overflow-hidden relative">
            <div class="relative h-full w-full flex flex-col justify-start items-center overflow-y-scroll">
                <a name="top"></a>
                <div class="relative w-full bg-gray-200">
<!--                    <div v-if="ajax && ajax.countries_list_map" class="h-full w-full">-->
                    <div class="h-full w-full splash-bg relative">
                        <img class="min-h-screen"
                            src="/img/backgrounds/transparent.png" style="opacity:0">
                        <Map
                            class="w-full overflow-hidden absolute inset-x-0 inset-y-0"
                            style="position: absolute"
                            id="world_map"
                            :enable="true"
                            :data="map_countries"
                            :layers="{confirmed:true}"
                            :settings="{interactive:false,zoom:2,home:true}"
                        />
                    </div>
<!--                    <div v-else class="bg-white rounded h-screen">Loading map</div>-->

<!--                    <div class="absolute top-0 left-0 bottom-0 w-1/2 bg-black opacity-50 z-10"></div>-->

                    <div class="global_stats absolute z-20  inset-0 sm:left-0 sm:inset-y-0 sm:w-1/2 sm:ml-16 flex items-center content-center justify-center">
                        <div>
                            <div class="text-shadow rounded-xl p-2 px-8 pb-8 mb-64 sm:mb-0" style="background: rgba(0,0,0,0.5)">
                                <div class="p-4 xl:p-0 xl:flex items-center justify-center text-center">
                                    <div class="text-5xl xl:mr-4 xl:text-7xl xl:text-9xl font-bold text-white">{{summary.active | numeralFormat}}</div>
                                    <div>
                                        <div class="text-2xl xl:text-3xl font-bold tracking-tight ">active cases</div>
                                        <div class="text-xs">as of {{summary.last_update}}</div>
                                    </div>
                                </div>
                                <div class="flex items-start mt-4 xl:mt-0 flex-1 justify-center px-4 xl:px-0">
                                    <div class="w-1/3 xl:w-auto xl:mr-8 text-center">
                                        <div class="xl:text-3xl font-bold text-white">{{summary.confirmed| numeralFormat}}</div>
                                        <div class="font-bold">confirmed cases</div>
                                    </div>
                                    <div class="w-1/3 xl:w-auto xl:mr-8 text-center">
                                        <div class="xl:text-3xl font-bold text-red-400">{{summary.deaths| numeralFormat}}</div>
                                        <div class="font-bold">deaths</div>
                                    </div>
                                    <div class="w-1/3 xl:w-auto text-center">
                                        <div class="xl:text-3xl font-bold text-green-400">{{summary.recovered| numeralFormat}}</div>
                                        <div class="font-bold">recoveries</div>
                                    </div>
                                </div>


                            </div>
                            <div class="hidden xl:flex text-base items-center justify-start mt-2" style="">
                                <router-link to="/comparison" class="flex text-lightlabel hover:text-white cursor-pointer rounded-lg p-2 px-4" style="background: rgba(0,0,0,0.8)">
                                    <div class="text-3xl font-bold mr-4 mt-1">Go to the comparison panel</div>
                                    <div class="text-4xl font-bold">&raquo;</div>
                                </router-link>
                            </div>
                        </div>
                    </div>
                    <div class="text-shadow absolute inset-x-0 sm:inset-x-auto bottom-0 mb-28 sm:mb-0 sm:inset-y-0 sm:right-0 sm:flex items-center justify-center sm:w-128 text-center">
                        <div class="text-center">
                            <div class="text-center"><img src="/img/logo/logo-140.png" class="w-16 inline sm:w-auto" /></div>
                            <div class="text-xs sm:text-sm font-normal text-heading rounded">
                                <div class="inline-block p-1 px-2 pb-2 rounded mt-4" style="background: rgba(0,0,0,0); text-shadow: 0.1em 0.1em 0.5em rgba(0,0,0,1),0.1em 0.1em 0.5em rgba(0,0,0,1)">
                                    Presented by<br><a class="text-white font-bold hover:text-blue-400" href="https://www.makeitsimpler.com.au">Simpler Solutions</a>
                                </div>
                            </div>
                            <div class="mt-8 sm:hidden text-white text-shadow font-bold"><img class="rounded inline px-2 pb-2" src="/img/arrow-down-1b.png" /></div>
                        </div>
                    </div>
                    <div class="text-center absolute inset-x-0 bottom-0 mb-8 text-white text-shadow font-bold z-20 hidden sm:block">
                        <img class="rounded inline px-2 pb-2" src="/img/arrow-down-1b.png" />
                    </div>
                </div>

                <div class="w-full xl:w-256">
<!--                    <div class="fullhd:hidden text-3xl font-bold tracking-tight text-center mb-4">COVID-19 Tracker</div>-->
<!--                    <div class="flex-col xl:block justify-center items-center">-->
<!--                        <div class="p-4 xl:p-0 xl:flex items-center justify-center text-center">-->
<!--                            <div v-if="loading && loading.global" class="text-5xl xl:mr-4 xl:text-7xl font-bold text-white">{{global.total.active | numeralFormat}}</div>-->
<!--                            <div v-else class="text-5xl xl:mr-4 xl:text-7xl font-bold text-white"></div>-->
<!--                            <div>-->
<!--                                <div class="text-2xl xl:text-3xl font-bold tracking-tight">active cases</div>-->
<!--                                <div class="text-xs text-lightslab">as of {{global.last_update}}</div>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                        <div class="flex items-start mt-4 xl:mt-0 flex-1 justify-center px-4 xl:px-0">-->
<!--                            <div class="w-1/3 xl:w-auto xl:mr-8 text-center">-->
<!--                                <div v-if="loading && loading.global" class="xl:text-3xl font-bold text-white">{{global.total.confirmed| numeralFormat}}</div>-->
<!--                                <div v-else class="xl:text-3xl font-bold text-white"></div>-->
<!--                                <div class="font-bold">confirmed cases</div>-->
<!--                            </div>-->
<!--                            <div class="w-1/3 xl:w-auto xl:mr-8 text-center">-->
<!--                                <div v-if="loading && loading.global" class="xl:text-3xl font-bold text-red-400">{{global.total.deaths| numeralFormat}}</div>-->
<!--                                <div v-else class="xl:text-3xl font-bold text-red-400"></div>-->
<!--                                <div class="font-bold">deaths</div>-->
<!--                            </div>-->
<!--                            <div class="w-1/3 xl:w-auto text-center">-->
<!--                                <div v-if="loading && loading.global" class="xl:text-3xl font-bold text-green-400">{{global.total.recovered| numeralFormat}}</div>-->
<!--                                <div v-else class="xl:text-3xl font-bold text-green-400"></div>-->
<!--                                <div class="font-bold">recoveries</div>-->
<!--                            </div>-->
<!--                        </div>-->

<!--                    </div>-->

                    <div class="xl:hidden flex justify-center">
                        <div class="text-2xl max-w-xl text-center text-yellow-400 m-4 my-8 font-bold">For the full features, including comparison views and charts, please view this website on a larger screen.</div>
                    </div>
                </div>

                <div class="bg-slab sm:flex sm:flex-1 py-8 w-full med:w-auto items-center justify-center">
                    <div class="w-full md:w-256">
                        <h2 class="m-2 xl:m-0 font-bold text-3xl tracking-tight mb-8">At a glance...</h2>
                        <div class="lg:flex lg:flex-1 justify-center">
                            <div class="m-2 lg:m-0 lg:w-72">
                                <div class="font-bold tracking-tight my-4">Countries with most confirmed cases</div>
                                <div v-if="ajax && ajax.glance && ajax.glance.confirmed" class="bg-hoverslab rounded-lg">
                                    <div v-if="row.name != 'Global'" v-for="(row,key,index) in ajax.glance.confirmed"
                                         class="p-2 lg:p-4 flex items-center justify-between">
                                        <div class="mr-4 lg:ml-8 lg:mr-2 lg:w-8 sm:text-3xl font-bold text-lightlabel">{{(key+1)}}</div>
                                        <div class="flex lg:block sm:flex-1 lg:flex-none justify-between items-center w-full">
                                            <div class="text-left w-40 text-primary font-bold text-2xl sm:text-3xl sm:w-96 lg:text-sm lg:px-2 lg:w-64">{{row.name}}</div>
                                            <div class="text-right sm:text-left">
                                                <div class="font-bold text-white sm:text-3xl lg:px-2">{{row.confirmed | numeralFormat}}</div>
                                                <div v-if="row.delta >= 0" class="px-2 text-xs sm:text-2xl lg:text-sm text-lightlabel">
                                                    +{{row.delta|numeralFormat}} (+{{row.percent|numeralFormat('0.0%')}})
                                                </div>
                                                <div v-else class="px-2 text-xs sm:text-2xl lg:text-sm text-lightlabel">
                                                    {{row.delta|numeralFormat}} ({{row.percent|numeralFormat('0.0%')}})
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-else class="p-8 bg-hoverslab rounded-lg">Loading...</div>
                            </div>

                            <div class="m-2 lg:m-0 lg:w-72 lg:ml-2">
                                <div class="font-bold tracking-tight my-4">Countries with most deaths</div>
                                <div v-if="ajax && ajax.glance && ajax.glance.deaths" class="bg-hoverslab rounded-lg">
                                    <div v-if="row.name != 'Global'" v-for="(row,key,index) in ajax.glance.deaths"
                                         class="p-2 lg:p-4 flex items-center justify-between">
                                        <div class="mr-4 lg:ml-8 lg:mr-2 lg:w-8 sm:text-3xl font-bold text-lightlabel">{{(key+1)}}</div>
                                        <div class="flex lg:block sm:flex-1 lg:flex-none justify-between items-center w-full">
                                            <div class="text-left w-40 text-primary font-bold text-2xl sm:text-3xl sm:w-96 lg:text-sm lg:px-2 lg:w-64">{{row.name}}</div>
                                            <div class="text-right sm:text-left">
                                                <div class="font-bold text-white sm:text-3xl lg:px-2">{{row.deaths | numeralFormat}}</div>
                                                <div v-if="row.delta >= 0" class="px-2 text-xs sm:text-2xl lg:text-sm text-lightlabel">
                                                    +{{row.delta|numeralFormat}} (+{{row.percent|numeralFormat('0.0%')}})
                                                </div>
                                                <div v-else class="px-2 text-xs sm:text-2xl lg:text-sm text-lightlabel">
                                                    {{row.delta|numeralFormat}} ({{row.percent|numeralFormat('0.0%')}})
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-else class="p-8 bg-hoverslab rounded-lg">Loading...</div>
                            </div>
                            <div class="m-2 lg:m-0 lg:w-72 lg:ml-2">
                                <div class="font-bold tracking-tight my-4">Countries with most recoveries</div>
                                <div v-if="ajax && ajax.glance && ajax.glance.recovered" class="bg-hoverslab rounded-lg">
                                    <div v-if="row.name != 'Global'" v-for="(row,key,index) in ajax.glance.recovered"
                                         class="p-2 lg:p-4 flex items-center justify-between">
                                        <div class="mr-4 lg:ml-8 lg:mr-2 lg:w-8 sm:text-3xl font-bold text-lightlabel">{{(key+1)}}</div>
                                        <div class="flex lg:block sm:flex-1 lg:flex-none justify-between items-center w-full">
                                            <div class="text-left w-40 text-primary font-bold text-2xl sm:text-3xl sm:w-96 lg:text-sm lg:px-2 lg:w-64">{{row.name}}</div>
                                            <div class="text-right sm:text-left">
                                                <div class="font-bold text-white sm:text-3xl lg:px-2">{{row.recovered | numeralFormat}}</div>
                                                <div v-if="row.delta >= 0" class="px-2 text-xs sm:text-2xl lg:text-sm text-lightlabel">
                                                    +{{row.delta|numeralFormat}} (+{{row.percent|numeralFormat('0.0%')}})
                                                </div>
                                                <div v-else class="px-2 text-xs sm:text-2xl lg:text-sm text-lightlabel">
                                                    {{row.delta|numeralFormat}} ({{row.percent|numeralFormat('0.0%')}})
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-else class="p-8 bg-hoverslab rounded-lg">Loading...</div>
                            </div>

                        </div>
                    </div>
                </div>

                <div class="bg-slab-primary w-full sm:flex justify-center">
                    <div class="sm:flex sm:flex-wrap items-start w-full sm:w-256 justify-center my-8">
                        <div class="sm:w-full m-2 mb-8">
                            <div class="font-bold text-3xl tracking-tight">Daily movement</div>
                            <div class="text-lightlabel">The daily movement shows the changes in relative position of each country based on the chosen metric during the last 24 hours.</div>
                        </div>
                        <div class="sm:hidden text-xs text-center rounded mx-2 border border-lightslab flex items-center justify-center bg-slab">
                            <div class="p-1 h-16" :class="ui.rankings.view == 'confirmedDelta' ? 'bg-hoverslab' : ''" @click="ui.rankings.view = 'confirmedDelta'">New confirmed cases (total)</div>
                            <div class="p-1 h-16" :class="ui.rankings.view == 'deathsDelta' ? 'bg-hoverslab' : ''" @click="ui.rankings.view = 'deathsDelta'">New confirmed deaths (total)</div>
                            <div class="p-1 h-16" :class="ui.rankings.view == 'confirmedSurge' ? 'bg-hoverslab' : ''" @click="ui.rankings.view = 'confirmedSurge'">Surge of new cases (total)</div>
                            <div class="p-1 h-16" :class="ui.rankings.view == 'deathsSurge' ? 'bg-hoverslab' : ''" @click="ui.rankings.view = 'deathsSurge'">Surge of new deaths (total)</div>
                        </div>
                        <div class="sm:flex flex-wrap justify-center">
                            <div class="sm:block" :class="ui.rankings.view != 'confirmedDelta' ? 'hidden' : ''">
                                <div class="hidden sm:block text-center font-bold">New confirmed cases (total)</div>
                                <div class="m-2 my-4 p-2 bg-slab rounded-lg">
                                    <simplebar data-simplebar-auto-hide="true" class="h-100 w-full sm:w-80 pr-2">
                                        <div v-if="ajax && ajax.rankings">
                                            <div v-for="(row,key) in ajax.rankings.confirmedDelta" class="flex items-center justify-between">
                                                <div class="flex items-center">
                                                    <div class="text-hoverslab font-bold py-2">{{key+1}}</div>

                                                    <div v-if="row.movement == 'up'" class="p-2 pr-4 arrow-up"></div>
                                                    <div v-else-if="row.movement == 'down'" class="p-2 pr-4 arrow-down"></div>
                                                    <div v-else class="p-2 pr-4 equal"></div>

                                                    <div class="py-2 font-bold text-sm">{{row.name}}</div>
                                                </div>
                                                <div class="py-2"><span class="font-bold">+{{row.confirmedDelta| numeralFormat}}</span> <span class="text-xs text-lightlabel">({{row.confirmed| numeralFormat}})</span></div>
                                            </div>
                                        </div>
                                    </simplebar>
                                </div>
                            </div>
                            <div class="sm:block" :class="ui.rankings.view != 'deathsDelta' ? 'hidden' : ''">
                                <div class="hidden sm:block text-center font-bold">New deaths (total)</div>
                                <div class="m-2 my-4 p-2 bg-slab rounded-lg">
                                    <simplebar data-simplebar-auto-hide="true" class="h-100 w-full sm:w-80 pr-2">
                                        <div v-if="ajax && ajax.rankings">
                                            <div v-for="(row,key) in ajax.rankings.deathsDelta" class="flex items-center justify-between">
                                                <div class="flex items-center">
                                                    <div class="text-hoverslab font-bold py-2">{{key+1}}</div>

                                                    <div v-if="row.movement == 'up'" class="p-2 pr-4 arrow-up"></div>
                                                    <div v-else-if="row.movement == 'down'" class="p-2 pr-4 arrow-down"></div>
                                                    <div v-else class="p-2 pr-4 equal"></div>

                                                    <div class="py-2 font-bold text-sm">{{row.name}}</div>
                                                </div>
                                                <div class="py-2"><span class="font-bold">+{{row.deathsDelta| numeralFormat}}</span> <span class="text-xs text-lightlabel">({{row.deaths| numeralFormat}})</span></div>
                                            </div>
                                        </div>
                                    </simplebar>
                                </div>
                            </div>
                            <div class="sm:block" :class="ui.rankings.view != 'confirmedSurge' ? 'hidden' : ''">
                                <div class="hidden sm:block text-center font-bold">Surge of new cases (total)</div>
                                <div class="m-2 my-4 p-2 bg-slab rounded-lg">
                                    <simplebar data-simplebar-auto-hide="true" class="h-100 w-full sm:w-80 pr-2">
                                        <div v-if="ajax && ajax.rankings">
                                            <div v-for="(row,key) in ajax.rankings.confirmedSurge" class="flex items-center justify-between">
                                                <div class="flex items-center">
                                                    <div class="text-hoverslab font-bold py-2">{{key+1}}</div>

                                                    <div v-if="row.movement == 'up'" class="p-2 pr-4 arrow-up"></div>
                                                    <div v-else-if="row.movement == 'down'" class="p-2 pr-4 arrow-down"></div>
                                                    <div v-else class="p-2 pr-4 equal"></div>

                                                    <div class="py-2 font-bold text-sm">{{row.name}}</div>
                                                </div>
                                                <div class="py-2"><span class="font-bold">+{{row.confirmedSurge| numeralFormat('0.00%')}}</span> <span class="text-xs text-lightlabel">({{row.confirmed| numeralFormat}})</span></div>
                                            </div>
                                        </div>
                                    </simplebar>
                                </div>
                            </div>
                            <div class="sm:block" :class="ui.rankings.view != 'deathsSurge' ? 'hidden' : ''">
                                <div class="hidden sm:block text-center font-bold">Surge of new deaths (total)</div>
                                <div class="m-2 my-4 p-2 bg-slab rounded-lg">
                                    <simplebar data-simplebar-auto-hide="true" class="h-100 w-full sm:w-80 pr-2">
                                        <div v-if="ajax && ajax.rankings">
                                            <div v-for="(row,key) in ajax.rankings.deathsSurge" class="flex items-center justify-between">
                                                <div class="flex items-center">
                                                    <div class="text-hoverslab font-bold py-2">{{key+1}}</div>

                                                    <div v-if="row.movement == 'up'" class="p-2 pr-4 arrow-up"></div>
                                                    <div v-else-if="row.movement == 'down'" class="p-2 pr-4 arrow-down"></div>
                                                    <div v-else class="p-2 pr-4 equal"></div>

                                                    <div class="py-2 font-bold text-sm">{{row.name}}</div>
                                                </div>
                                                <div class="py-2"><span class="font-bold">+{{row.deathsSurge| numeralFormat('0.00%')}}</span> <span class="text-xs text-lightlabel">({{row.deaths| numeralFormat}})</span></div>
                                            </div>
                                        </div>
                                    </simplebar>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-slab-primary sm:flex pt-4 pb-8 w-full items-center justify-center">
                    <div class="mx-4 sm:w-256 lg:mx-0">
                        <a href="#top">^ Back to top</a>
                    </div>
                </div>

                <!-- footer -->
                <div class="bg-base sm:flex py-8 w-full items-center justify-center">
                    <div class="mx-4 sm:w-256 lg:mx-0">
                        <div class="sm:flex items-start my-4 justify-between">
                            <div>The COVID-19 Tracker is a project by <a class="font-bold underline hover:text-lightlabel" href="https://www.makeitsimpler.com.au">Simpler</a>. For feedback, suggestions, and bug reports, please contact feedback@makeitsimpler.com.au or get in touch with us on our socials.</div>
                            <div class="flex w-32 items-end py-4">
                                <a href="https://www.facebook.com/simplerau" class="mr-2"><img src="/img/facebook.png" class="h-8"></a>
                                <a href="https://www.twitter.com/simplerau"><img src="/img/twitter.png" class="h-8"></a>
                            </div>
                        </div>
                        <div class="text-xs text-lightlabel pb-2 font-bold">The material and information contained on this website is for general information purposes only. You should not rely upon the material or information on the website as a basis for making any business, legal, or any other decisions.</div>
                        <div class="text-xs text-lightlabel">Whilst we endeavour to keep the information up-to-date and correct, Simpler Solutions makes no representations or warranties of any kind, express or implied about the completeness, accuracy, reliability, suitability or availability with respect to the website or information, products, services or related graphics contained on the website for any purpose. Any reliance you place on such material is therefore strictly at your own risk.</div>
                        <div class="mt-4">&copy; Simpler Solutions</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import simplebar from 'simplebar-vue';
    import 'simplebar/dist/simplebar.min.css';
    import moment from 'moment'
    import LineChart from "../components/charts/LineChart";
    import ComparisonChart from "../components/ComparisonChart";
    import StatsChart from "../components/StatsChart";
    import Map from '../components/Map';

    export default {
        name: "Global",
        props: [
            'mode',
            'database',
        ],
        components:{
            simplebar,
            LineChart,
            ComparisonChart,
            StatsChart,
            Map,
        },
        data()
        {
            return {
                'sort_stats' : {
                    'key' : 'confirmed',
                    'order' : 'desc',
                },

                'global_options' : {
                    'table' : 'daily',
                },

                'ui': {
                    'rankings': {
                        'view' : 'confirmedDelta',
                    }
                },
                ajax: {
                    rankings: [],
                    summary: {
                        last_update: '',
                        confirmed: 0,
                        deaths: 0,
                        recovered: 0,
                        active: 0
                    },
                    glance: {},
                    countries_list_map: [],
                },
                sorted_countries: {
                    'confirmed' : [],
                    'deaths' : [],
                    'confirmedSurge' : [],
                    'deathsSurge' : [],
                },
                glance: {
                    'confirmed' : [],
                    'deaths' : [],
                    'recovered' : []
                },
            }
        },
        mounted()
        {

            axios.get('/api/stats/rankings')
                .then(res => {
                    this.ajax.rankings = res.data;
                })
                .catch(error => {

                });
            axios.get('/api/stats/global_summary')
                .then(res => {
                    this.ajax.summary = res.data;
                })
                .catch(error => {

                });

            axios.get('/api/stats/at_a_glance')
                .then(res => {
                    this.ajax.glance = res.data;
                })
                .catch(error => {

                });

            axios.get('/api/stats/countries_list_map')
                .then(res => {
                    this.ajax.countries_list_map = res.data;
                })
                .catch(error => {

                });
        },
        methods:{
            global_summary()
            {
                var data = {
                    last_update : '',
                    confirmed: 0,
                    deaths: 0,
                    recovered: 0,
                    active: 0,
                }
                if(this.ajax && this.ajax.summary)
                {
                    data = this.ajax.summary;
                }
            },
        },
        computed: {
            summary()
            {
                return this.ajax.summary;
            },
            loading()
            {
                if(this.database && this.database.loading)
                    return this.database.loading;
                else
                    return {
                        'countries' : false,
                        'states' : false,
                        'annotations' : false,
                        'global' : false,
                    };
            },
            loaded()
            {
                if (this.database && this.database.loading && this.database.loading.countries && this.database.loading.states && this.database.loading.annotations && this.database.loading.global)
                {
                    return true;
                }
                return false;
            },
            map_countries()
            {
                var data = [];
                var list = _.clone(this.ajax.countries_list_map);
                for(var x in list)
                {
                    var row = list[x];

                }
                return _.clone(this.ajax.countries_list_map);
            }
        }
    }
</script>

<style scoped>
    .arrow-up,
    .arrow-down {
        position: relative;
    }
    .arrow-down:before,
    .arrow-up:before {
        position: absolute;
        content: "";
        border: 5px solid transparent;
        border-top-width: 10px;
        border-bottom-width: 10px;
    }
    .arrow-up:before {
        border-bottom-color: #c53030;
        top: -6px;
    }
    .arrow-down:before {
        border-top-color: #68d391;
        top: 6px;
    }
    .equal{
        position: relative;
    }
    .equal:before {
        content: "=";
        position: absolute;
        font-weight: bold;
        top: -2px;
        color: #ecc94b;
    }
    .text-shadow {
        text-shadow: 0.1em 0.1em 0.1em rgba(0,0,0,0.5);
    }

    /*.splash-bg {*/
    /*    background-image: url("/img/backgrounds/twelve-apostles-1x.jpg");*/
    /*    background-size: cover;*/
    /*    background-position: center center;*/
    /*    box-shadow: 0px -50px 50px inset rgba(0,0,0,0.5);*/
    /*}*/

    /*@media*/
    /*(-webkit-min-device-pixel-ratio: 2),*/
    /*(min-width: 640px) {*/
    /*    .splash-bg {*/
    /*        background-image: url("/img/backgrounds/twelve-apostles-2x.jpg");*/
    /*    }*/
    /*}*/

    /*@media*/
    /*(-webkit-min-device-pixel-ratio: 2),*/
    /*(min-width: 1280px) {*/
    /*    .splash-bg {*/
    /*        background-image: url("/img/backgrounds/twelve-apostles-4x.jpg");*/
    /*    }*/
    /*}*/
</style>
