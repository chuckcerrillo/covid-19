<template>
    <div>
        <div v-if="!loaded" class="flex items-center justify-center pt-20">
            <div></div>
            <div class="bg-slab rounded p-4 px-8 pb-8 w-80 xl:w-128 flex flex-col items-center justify-center">
                <div v-if="countriesStatus == 'success' && countryCasesStatus == 'success' && stateCasesStatus == 'success' && ajax_loading.oxford" class="font-bold xl:text-2xl text-white p-2 text-center">Launching...</div>
                <div v-else-if="countryCasesStatus == 'success' || stateCasesStatus == 'success' || ajax_loading.oxford" class="font-bold xl:text-2xl text-white p-2 text-center">Processing data</div>
                <div v-else class="font-bold xl:text-2xl text-white p-2 text-center">Downloading country data</div>
<!--                <div class="p-2 mb-4 text-center"><img src="/img/loader.svg"></div>-->
                <div class="p-2 mb-4 text-center"><img src="/img/loading.gif"></div>
                <div class="flex items-center text-xs w-44">
                    <div class="w-32">Country list</div>
                    <div class="text-right text-lightlabel" v-if="countriesStatus !== 'success'">loading</div>
                    <div class="text-right text-green-400" v-else>done</div>
                </div>
                <div class="flex items-center text-xs w-44">
                    <div class="w-32">Sidebar list</div>
                    <div class="text-right text-lightlabel" v-if="!ajax_loading.sidebar_list">loading</div>
                    <div class="text-right text-green-400" v-else>done</div>
                </div>
                <div class="flex items-center text-xs w-44">
                    <div class="w-32">Case counts</div>
                    <div class="text-right text-lightlabel" v-if="countryCasesStatus !== 'success' || stateCasesStatus !== 'success'">loading</div>
                    <div class="text-right text-green-400" v-else>done</div>
                </div>
                <div class="flex items-center text-xs w-44">
                    <div class="w-32">Government response</div>
                    <div class="text-right text-lightlabel" v-if="!ajax_loading.oxford">loading</div>
                    <div class="text-right text-green-400" v-else>done</div>
                </div>
                <div class="flex items-center text-xs w-44">
                    <div class="w-32">Annotations</div>
                    <div class="text-right text-lightlabel" v-if="!database.loading.annotations">loading</div>
                    <div class="text-right text-green-400" v-else>done</div>
                </div>
            </div>
            <div></div>

        </div>
        <div v-else class="h-full overflow-hidden relative">
            <div class="relative h-full xl:flex flex-1">
                <div class="absolute top-0 right-0 bg-white text-black p-4 z-20 hidden">
                    <div>Test</div>
                    <div @click="log_debug('policies')">Policies</div>
                    <div @click="log_debug('process_policies')">Process policies</div>
                </div>
                <Sidebar
                    class="hidden xl:flex w-160"
                    :class="view === 'dashboard' || view === 'about' || view === 'map'? 'xl:hidden' : ''"
                    :global="global()"
                    :sort_stats="sort_stats"
                    :countriesIndex="countriesIndex"
                    :countries_sorted="sorted_countries_list"
                    :selectCountry="selectCountry"
                    :compare="compare"
                    :countries_states="countries_states"
                    :rankings="rankings"
                />
                <SidebarMobile
                    class="xl:hidden"
                    :class="view === 'dashboard' || view === 'about' || view === 'map'? 'xl:hidden' : ''"
                    :global="global()"
                    :sort_stats="sort_stats"
                    :countriesIndex="countriesIndex"
                    :countries_sorted="sorted_countries_list"
                    :selectCountry="selectCountry"
                    :compare="compare"
                    :countries_states="countries_states"
                    :rankings="rankings"
                    v-on:removeAllCompare="removeAllCompare"
                />

                <div class="absolute inset-x-0 bottom-0 xl:m-4 xl:ml-0 xl:w-full xl:overflow-hidden xl:relative xl:top-auto" :class="view === 'dashboard' || view === 'about' || view === 'map' ? 'top-0 xl:ml-4': 'top-3.1'">
                    <div class="bg-slab xl:rounded absolute top-0 right-0 bottom-0 left-0 flex-1 flex-col xl:p-4">
                        <div class="absolute top-0 right-0 bottom-0 left-0 pt-2 xl:p-4 content-area">
                            <simplebar v-if="view != 'charts' && view != 'dashboard' && view != 'about' && view != 'map'" class="text-xs w-full">
                                <div class="w-full flex items-center justify-start relative">
                                    <div @click="updateSelected('all')" class="flex-shrink-0 cursor-pointer relative rounded rounded-b-none py-2 px-4 mx-1 whitespace-no-wrap overflow-hidden truncate ..." :class="selectedCompareTab == 'all' ? 'bg-hoverslab' : 'bg-slab-primary'">
                                        Compare
                                    </div>
                                    <div v-if="row" v-for="(row,key,index) in compare" :key="key">
                                        <div @click="updateSelected(key)" class="cursor-pointer relative rounded rounded-b-none py-2 px-4 xl:pr-8 mx-1 whitespace-no-wrap overflow-hidden truncate ..." :class="selectedCompareTab == key ? 'bg-hoverslab' : 'bg-slab-primary'" style="max-width: 12rem;">
                                            <div v-if="get_rank(row.country)>0" class="rounded bg-white font-bold px-1 text-xs text-center text-baseslab inline-block">{{get_rank(row.country)}}</div>
                                            {{getCompareLength() > 0 && row.state ? row.state + ' - ' : ''}}
                                            {{getCompareLength() > 0 ? row.country : '(none)'}}
                                            <div v-on:click.stop="removeCompare({country: row.country,state: row.state})" class="hidden xl:block text-lightlabel text-xs absolute top-0 right-0 m-2 px-2 pb-1 rounded hover:text-heading hover:bg-lightlabel">x</div>
                                        </div>
                                    </div>
                                    <div v-if="getCompareLength() > 0" class="hidden xl:block xl:absolute w-24 border z-10 bg-slab border-hoverslab hover:bg-hoverslab px-2 py-1 top-0 right-0 cursor-pointer" @click="removeAllCompare()">
                                        Remove all
                                    </div>
                                </div>
                            </simplebar>

<!--                            <keep-alive include="DashboardView,MapView,MapViewMobile,StatsChart,StatsChartMobile,LineChart,LineChartMobile">-->
                                <PoliciesView
                                    class="policies-view"
                                    v-if="view === 'response'"
                                    :selectedCompareTab="selectedCompareTab"
                                    :comparePolicies="comparePolicies()"
                                    :uniqueCountries="getUniqueCountriesCompare()"
                                    :compare="compare"
                                    :compareLength="getCompareLength()"
                                    :database="database"
                                    :countries="countries_sorted"
                                    v-on:updateGovtResponse="updateGovtResponse"
                                />

                                <DailyView
                                    v-if="view === 'daily'"
                                    :selectedCompareTab="selectedCompareTab"
                                    :options="options"
                                    :comparisonData="getComparisonData()"
                                    :view="view"
                                    :compare="compare"
                                    :rankings="rankings"
                                    v-on:updateCompare="emitCompare"
                                    v-on:updateSelected="updateSelected"
                                />

                            <keep-alive>
                                <StatsChartMobile
                                    v-if="isMobile"
                                    v-show="view === 'charts'"
                                    :data="getChartData()"
                                    :config="ui.chart"
                                    :full="true"
                                    :active="view === 'charts'"
                                    v-on:updateChartSettings="updateChartSettings"
                                    v-on:updateChartMode="updateChartMode"
                                    v-on:updateChartFields="updateChartFields"
                                />
                                <StatsChart
                                    v-else
                                    v-show="view === 'charts'"
                                    :data="getChartData()"
                                    :config="ui.chart"
                                    :full="true"
                                    :active="view === 'charts'"
                                    v-on:updateChartSettings="updateChartSettings"
                                    v-on:updateChartMode="updateChartMode"
                                    v-on:updateChartFields="updateChartFields"
                                />
                            </keep-alive>

                            <keep-alive>
                                <MapViewMobile
                                    v-if="view === 'map' && isMobile"
                                    :countries_sorted="countries_sorted"
                                    :annotations="getAnnotations()"
                                    :getDaily="getDaily()"
                                    :database="database"
                                    :loaded="map_loaded"
                                    v-on:loadMapData="prepare_map_data"
                                />
                                <MapView
                                    v-else-if="view === 'map'"
                                    :countries_sorted="countries_sorted"
                                    :annotations="getAnnotations()"
                                    :getDaily="getDaily()"
                                    :database="database"
                                    :loaded="map_loaded"
                                    v-on:loadMapData="prepare_map_data"

                                />
                            </keep-alive>

<!--                            </keep-alive>-->
                            <div class="h-full relative flex flex-1" v-if="view === 'about'">
                                <About />
                            </div>
                        </div>
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
    import {mapGetters} from 'vuex';
    import SidebarMobile from "../components/ui/SidebarMobile";
    import DailyView from "./DailyView";
    import MapView from "./MapView";
    import MapViewMobile from "./MapViewMobile";

    export default {
        name: "Comparison",
        components:{
            DailyView, // do not lazy load this so we dont' have the weird detached tab thing
            DashboardView: () => import('./DashboardView'),
            // MapView: () => import('./MapView'),
            // MapViewMobile: () => import('./MapViewMobile'),
            // DailyView: () => import('./DailyView'),
            MapView,
            MapViewMobile,
            PoliciesView: () => import('./PoliciesView'),
            Sidebar: () => import('../components/ui/Sidebar'),
            SidebarMobile,
            StatsChart: () => import('../components/charts/StatsChart'),
            StatsChartMobile: () => import('../components/charts/StatsChartMobile'),
            About: () => import('./About'),
            simplebar,
        },
        props: [
            'database',
        ],
        created(){
            // alert('created');

            this.database.processed.selectedCompareTab = 'all';
        },
        mounted()
        {

            if(this.isMobile)
            {
                this.options.compare_limit = 3;
            }

            axios.get('/api/stats/get_sidebar_list')
                .then(res => {
                    this.sidebar_list = res.data;
                    this.ajax_loading.sidebar_list = true;
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

            axios.get('/api/stats/oxford')
                .then(res => {
                    this.database.raw.raw_oxford = res.data;
                    this.ajax_loading.oxford = true;
                })
                .catch(error => {

                });
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
                'options' : {
                    'compare_limit' : 10,
                },
                'comparison' : [],
                map_loaded: false,
                rankings: {
                    sorted: {
                        country: [],
                        confirmed: [],
                        deaths: [],
                        recovered: [],
                        active: [],
                        confirmedDelta: [],
                        deathsDelta: [],
                        recoveredDelta: [],
                        confirmedCapita: [],
                        deathsCapita: [],
                        recoveredCapita: [],
                        activeCapita: [],
                        confirmedAverage: [],
                        deathsAverage: [],
                        recoveredAverage: [],
                        deathsRate: [],
                        recoveredRate: [],
                        growthFactor: [],
                        population: [],
                    },
                    positions: {
                        country: {},
                        confirmed: {},
                        deaths: {},
                        recovered: {},
                        active: {},
                        confirmedDelta: {},
                        deathsDelta: {},
                        recoveredDelta: {},
                        confirmedCapita: {},
                        deathsCapita: {},
                        recoveredCapita: {},
                        activeCapita: {},
                        confirmedAverage: {},
                        deathsAverage: {},
                        recoveredAverage: {},
                        deathsRate: {},
                        recoveredRate: {},
                        growthFactor: {},
                        population: {},
                    }
                },
                'show_countries': true,
                'ui' : {
                    'content' : {
                        'selectedTab' : 'daily'
                    },
                    'dashboard' : {
                        'table' : 'daily',
                        'sort_stats' : {
                            'key' : 'confirmed',
                            'order' : 'desc',
                        }
                    },
                    'chart' : {
                        settings: false,
                        mode: false,
                        fields: false,
                    }
                },
                layers : {
                    confirmed: false
                },
                ajax_loading: {
                    oxford: false,
                    final: false,
                    sidebar_list: false,
                },
                user: {
                    location: false,
                },
                sorted_countries_source: {},
                sorted_countries_list: false,
                timeout: false,
                excludedCountries: [
                    'Global',
                    'Diamond Princess',
                    'MS Zaandam',
                ],
                sidebar_list: [],
            }
        },
        methods:{
            prepare_map_data()
            {
                if(!this.map_loaded)
                {
                    for(var x in this.countries)
                    {

                        this.assembleDataset({
                            country: this.countries[x].name.country,
                            state: false,
                        });

                        if(this.countries[x].states && this.countries[x].states.length > 0)
                        {
                            for(var y in this.countries[x].states)
                            {
                                this.assembleDataset({
                                    country: this.countries[x].name.country,
                                    state: this.countries[x].states[y].name.state,
                                });
                            }
                        }
                    }
                    this.map_loaded = true;
                }
            },
            draw_sorted_countries()
            {
                clearTimeout(this.timeout);
                var sort = this.sort_stats;
                this.sorted_countries_list = [];
                var country_state_map = this.countries_states();
                var data = [], source = [], excluded = [];
                if(this.sorted_countries_source && this.sorted_countries_source[sort.key] && this.sorted_countries_source[sort.key][sort.order])
                {
                    data = _.cloneDeep(this.sorted_countries_source[sort.key][sort.order]);
                }
                else
                {
                    source = this.sidebar_list;
                    for(var x in source)
                    {
                        if(this.excludedCountries.indexOf(source[x].name.country) === -1)
                        {
                            data.push(_.cloneDeep(source[x]));
                        }
                        else
                        {
                            excluded.push(_.cloneDeep(source[x]));
                        }
                    }

                    if(!this.sorted_countries_source[sort.key])
                    {
                        this.sorted_countries_source[sort.key] = {};
                    }

                    data.sort(function (a, b) {
                        if(sort.key === 'country')
                        {
                            return a.name.country.toUpperCase() > b.name.country.toUpperCase() ? 1 : -1;
                        }
                        else if(sort.key === 'confirmed')
                        {
                            return a.total.c < b.total.c ? 1 : -1;
                        }
                        else if(sort.key === 'deaths')
                        {
                            return a.total.d < b.total.d ? 1 : -1;
                        }
                        else if(sort.key === 'recovered')
                        {
                            return a.total.r < b.total.r ? 1 : -1;
                        }
                        else if(sort.key === 'active')
                        {
                            return a.total.a < b.total.a ? 1 : -1;
                        }

                        else if(sort.key === 'confirmedDelta')
                        {
                            return a.total.delta.c < b.total.delta.c ? 1 : -1;
                        }
                        else if(sort.key === 'deathsDelta')
                        {
                            return a.total.delta.d < b.total.delta.d ? 1 : -1;
                        }
                        else if(sort.key === 'recoveredDelta')
                        {
                            return a.total.delta.r < b.total.delta.r ? 1 : -1;
                        }

                        else if(sort.key === 'confirmedCapita')
                        {
                            return a.total.capita.c < b.total.capita.c ? 1 : -1;
                        }
                        else if(sort.key === 'deathsCapita')
                        {
                            return a.total.capita.d < b.total.capita.d ? 1 : -1;
                        }
                        else if(sort.key === 'recoveredCapita')
                        {
                            return a.total.capita.r < b.total.capita.r ? 1 : -1;
                        }
                        else if(sort.key === 'activeCapita')
                        {
                            return a.total.capita.a < b.total.capita.a ? 1 : -1;
                        }

                        else if(sort.key === 'confirmedAverage')
                        {
                            return a.total.average.c < b.total.average.c ? 1 : -1;
                        }
                        else if(sort.key === 'deathsAverage')
                        {
                            return a.total.average.d < b.total.average.d ? 1 : -1;
                        }
                        else if(sort.key === 'recoveredAverage')
                        {
                            return a.total.average.r < b.total.average.r ? 1 : -1;
                        }

                        else if(sort.key === 'deathsRate')
                        {
                            return a.total.rate.d < b.total.rate.d ? 1 : -1;
                        }
                        else if(sort.key === 'recoveredRate')
                        {
                            return a.total.rate.r < b.total.rate.r ? 1 : -1;
                        }

                        else if(sort.key === 'growthFactor')
                        {
                            return a.total.growth.c < b.total.growth.c ? 1 : -1;
                        }

                        else if(sort.key === 'population')
                        {
                            return a.population < b.population ? 1 : -1;
                        }
                    });

                    this.sorted_countries_source[sort.key].desc = _.cloneDeep(data);
                    data.reverse();
                    this.sorted_countries_source[sort.key].asc = _.cloneDeep(data);

                    if(sort.order === 'desc')
                    {
                        data = _.cloneDeep(this.sorted_countries_source[sort.key].desc);
                    }
                }

                // Draw excluded countries
                for(var x in excluded)
                {
                    // var row = _.cloneDeep(this.assembleDataset({
                    //     country: this.excludedCountries[x],
                    //     state: false
                    // }));
                    var row = _.cloneDeep(excluded[x]);

                    // row.total.delta = _.cloneDeep(row.daily.slice(-2,-1)[0].delta);

                    row.states = [];
                    if(row)
                    {
                        if(row.name.country && country_state_map[row.name.country])
                        {
                            for(var y in country_state_map[row.name.country])
                            {
                                if(country_state_map[row.name.country][y] !== '(Unspecified)')
                                {
                                    var state_row = _.cloneDeep(this.assembleDataset({
                                        country: row.name.country,
                                        state: country_state_map[row.name.country][y]
                                    }));
                                    // if(state_row && state_row.daily)
                                    // {
                                    //     state_row.total.delta = _.cloneDeep(state_row.daily.slice(-2,-1)[0].delta);
                                    // }
                                    row.states.push(
                                        _.cloneDeep(state_row)
                                    );
                                }
                            }
                        }
                        data.push(_.cloneDeep(row));
                    }
                }


                this.draw_next(data,50,150);
                // var self = this;
                // setTimeout(function(){
                //     self.sorted_countries_list = data;
                // },1)

            },
            draw_next(data,first,limit,count)
            {
                var self = this;
                if(!count)
                    var count = 0;
                if(!limit)
                    var limit = first;

                self.timeout = setTimeout(function(){
                    if(count === 0)
                    {
                        var batch = data.splice(0,first);
                    }
                    else
                    {
                        var batch = data.splice(0,limit);
                    }

                    for(var y in batch)
                    {
                        self.sorted_countries_list.push(_.cloneDeep(batch[y]));
                    }
                    if(data.length > 0)
                    {
                        self.draw_next(data,first,limit,count++);
                    }
                },1)
            },
            log_debug(item)
            {
                if(item === 'policies')
                {
                    console.log(this.database.processed);
                }
                if(item === 'process_policies')
                {
                    this.processGovtResponse();
                }
                if(item === 'dataset')
                {
                    console.log(this.database.processed.dataset);
                }

            },
            updateChartSettings(settings)
            {
                this.ui.chart.settings = _.clone(settings);
            },
            updateChartMode(mode)
            {
                this.ui.chart.mode = _.clone(mode);
            },
            updateChartFields(fields)
            {
                this.ui.chart.fields = _.clone(fields);
            },
            processGovtResponse()
            {
                var self = this;
                for (var x in this.countries)
                {
                    var country = _.cloneDeep(this.countries[x].name);
                    var response = _.cloneDeep(this.getGovtResponse(country));

                    // setTimeout(function(){
                        self.database.processed.oxford[country] = response;
                    // },1)


                }
            },
            getGovtResponse(country)
            {
                if(country)
                {
                    if(this.database && this.database.processed && this.database.processed.oxford && this.database.processed.oxford[country])
                    {
                        return _.cloneDeep(this.database.processed.oxford[country]);
                    }
                    if(this.database.raw.raw_oxford && this.database.raw.raw_oxford.latest && this.database.raw.raw_oxford.latest[country])
                    {
                        return {
                            key: this.database.raw.raw_oxford.key,
                            latest: _.cloneDeep(this.database.raw.raw_oxford.latest[country]),
                            daily: this.getDailyGovtResponse(_.cloneDeep(this.database.raw.raw_oxford.daily[country]),'2020-01-01',moment().format('YYYY-MM-DD')),
                        }
                    }
                }
                return false;
            },
            getDailyGovtResponse(daily,start_date,end_date)
            {
                Date.prototype.addDays = function(days) {
                    var date = new Date(this.valueOf());
                    date.setDate(date.getDate() + days);
                    return date;
                }

                var data = {},
                    blank =
                        {
                            "date": false,
                            "stringencyindex": 0,
                            "latest": {
                                "C1": {
                                    "value": "0.00",
                                    "target": "0"
                                },
                                "C2": {
                                    "value": "0.00",
                                    "target": "0"
                                },
                                "C3": {
                                    "value": "0.00",
                                    "target": "0"
                                },
                                "C4": {
                                    "value": "0.00",
                                    "target": "0"
                                },
                                "C5": {
                                    "value": "0.00",
                                    "target": "0"
                                },
                                "C6": {
                                    "value": "0.00",
                                    "target": "0"
                                },
                                "C7": {
                                    "value": "0.00",
                                    "target": "0"
                                },
                                "C8": {
                                    "value": "0.00",
                                    "target": ""
                                },
                                "E1": {
                                    "value": "0.00",
                                    "target": "0"
                                },
                                "E2": {
                                    "value": "0.00",
                                    "target": ""
                                },
                                "E3": {
                                    "value": "0.00",
                                    "target": ""
                                },
                                "E4": {
                                    "value": 0,
                                    "target": ""
                                },
                                "H1": {
                                    "value": "0.00",
                                    "target": "1"
                                },
                                "H2": {
                                    "value": "0.00",
                                    "target": ""
                                },
                                "H3": {
                                    "value": "0.00",
                                    "target": ""
                                },
                                "H4": {
                                    "value": 0,
                                    "target": ""
                                },
                                "H5": {
                                    "value": 0,
                                    "target": ""
                                },
                                "M1": {
                                    "value": "",
                                }
                            }
                        },
                    temp = _.cloneDeep(blank);


                var date1 = new Date(start_date);
                var date2 = new Date(end_date);
                date2.setDate(date2.getDate() - 1);
                var daysTotal = (date2.getTime() - date1.getTime()) / (1000*3600*24);
                var row = {};


                for(var x = 0; x<=daysTotal; x++)
                {
                    var new_date = moment(date1.addDays(x)).format('YYYY-MM-DD');
                    if(daily && daily[new_date])
                    {
                        row = {
                            date: new_date,
                            stringencyindex: false,
                            latest: {}
                        };

                        if(daily[new_date].si)
                        {
                            row.stringencyindex = daily[new_date].si;
                        }
                        for(var y in daily[new_date].policies)
                        {

                            row.latest[y] = {
                                value: daily[new_date].policies[y].v,
                                target: daily[new_date].policies[y].t,
                            }
                        }
                        data[new_date] = _.cloneDeep(row);
                        temp = _.cloneDeep(row);
                    }
                    else
                    {
                        row = _.cloneDeep(temp);
                        row.date = new_date;
                        data[new_date] = _.cloneDeep(row);
                    }

                }
                return data;
            },
            updateGovtResponse(country,data)
            {
                this.$emit('updateGovtResponse',country,data);
            },
            addConfirmedLayer()
            {
                this.layers.confirmed = true;
            },
            getAnnotations()
            {
                var data = _.clone(this.database.raw.raw_annotations.All);
                data = data.reverse();
                return data;
            },
            getUniqueCountriesCompare()
            {
                var countries = [],
                    data = [];
                for(var x in this.compare)
                {
                    if(this.compare[x])
                    {
                        if(countries.indexOf(this.compare[x].country) === -1)
                        {
                            countries.push(this.compare[x].country);
                            data.push(this.compare[x]);
                        }
                    }
                }
                return data;
            },
            comparePolicies()
            {
                var data = [];
                for(var x in this.getUniqueCountriesCompare())
                {
                    if(this.getUniqueCountriesCompare()[x])
                    {
                        var row = {};
                        row.name = this.getUniqueCountriesCompare()[x].country;
                        row.daily = {};
                        // row.latest = this.getLatestGovtResponse(row.name);

                        var response = _.cloneDeep(this.getGovtResponse(row.name));

                        if(response)
                        {
                            row.stringencyindex = _.clone(response.latest.si);
                            for(var temp_date in response.daily)
                            {
                                row.daily[temp_date] = _.cloneDeep(this.translateGovtResponse(response.daily[temp_date]));
                            }
                        }
                        else
                        {
                            row.stringencyindex = 'N/A';
                            row.daily = {};
                        }
                        data.push(_.cloneDeep(row));
                    }
                }
                return data;
            },
            translateGovtResponse(policy)
            {

                var key = this.database.raw.raw_oxford.key;
                for(var x in policy.latest)
                {
                    var row = _.cloneDeep(policy.latest[x]);

                    var target = '';
                    var value = _.clone(row.value);
                    if(key && key[x] && key[x].values)
                    {
                        var help = key[x].values;
                    }
                    else
                    {
                        var help = [];
                    }

                    if(key[x] && key[x].hasTarget)
                    {
                        if(key[x].targets && key[x].targets.length > 0)
                        {
                            target = 'Scope: ' + _.clone(key[x].targets[row.target]);
                        }
                        else
                        {
                            if(row.t == 1)
                            {
                                target = 'Scope: Targeted';
                            }
                            else
                            {
                                target = 'Scope: General';
                            }
                        }
                    }
                    if(row.value && row.value.length === 0)
                    {
                        value = '';
                        target = '';
                    }
                    else if(key[x] && key[x].type == 'lookup')
                    {
                        value = _.clone(key[x].values[parseInt(row.value)]);
                    }
                    else
                    {
                        value = _.clone(row.value);
                    }

                    policy.latest[x] = {
                        id: x,
                        name: key[x].name,
                        description: key[x].description,
                        value: value,
                        target: target,
                        since: row.s,
                        help: help,
                        notes: row.n,
                        date: policy.date,
                    };
                }
                return _.cloneDeep(policy);
            },
            getGlobalDayNotes(date)
            {
                var data = [];
                for(var x in this.globalDataset()[0].annotations)
                {
                    if (this.globalDataset()[0].annotations[x].date == date)
                    {
                        data.push(this.globalDataset()[0].annotations[x]);
                    }
                }
                return data;
            },
            getSortedCountries(field,order,limit)
            {
                var sort = {key: field, order: order};
                var data = _.cloneDeep(this.countries_and_stats());
                data = data.sort(function (a, b) {
                    if (sort.key == 'country')
                    {
                        if (sort.order == 'asc')
                            return a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1;
                        else
                            return a.name.toUpperCase() < b.name.toUpperCase() ? 1 : -1;
                    }

                    else if (sort.key == 'confirmed') {
                        if (sort.order == 'desc')
                            return a.total.c < b.total.c ? 1 : -1;
                        else
                            return a.total.c > b.total.c ? 1 : -1;
                    }

                    else if (sort.key == 'deaths') {
                        if (sort.order == 'desc')
                            return a.total.d < b.total.d ? 1 : -1;
                        else
                            return a.total.d > b.total.d ? 1 : -1;
                    }

                    else if (sort.key == 'recovered') {
                        if (sort.order == 'desc')
                            return a.total.r < b.total.r ? 1 : -1;
                        else
                            return a.total.r > b.total.r ? 1 : -1;
                    }
                });
                if(limit && limit > 0)
                {
                    data = data.slice(0,limit);
                }
                return data;
            },
            getProcessedData(source)
            {
                var compareName = this.getCompareName(source).full;
                if(this.database.processed.dataset[compareName])
                {
                    return this.database.processed.dataset[compareName];
                }
                return false;
            },
            assembleDataset(source,daily,name)
            {
                // Check if this source has already been processed
                var row = this.getProcessedData(source);
                if (row)
                {
                    // If it is already processed, let's use it
                    return row;
                }
                var countryId = this.countriesIndex.indexOf(source.country);
                var country = _.clone(this.countries[countryId]);

                const arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length;

                var population = 0,
                    lat = 0, long = 0,
                    total = false,
                    state = false;

                // if(!daily || !name)
                // {

                    if(source.state)
                    {
                        if(country && country.states)
                        {
                            for(var x in country.states)
                            {
                                if(country.states[x].name.state === source.state)
                                {
                                    state = _.clone(country.states[x]);
                                    break;
                                }
                            }
                        }

                        if(state)
                        {
                            lat = _.clone(state.lat);
                            long = _.clone(state.lng);
                            population = state.population;
                            total = _.cloneDeep(state.total);
                        }
                    }
                    else
                    {
                        lat = country.lat;
                        long = country.lng;
                        population = country.population;
                        total = _.cloneDeep(country.total);
                    }

                // }


                row = {
                    name: name ? name : this.getCompareName(source),
                    lat: lat,
                    long: long,
                    population: population,
                    annotations: [],
                    daily: (daily ? daily : this.getDaily(source)),
                    total: total,
                }

                row.total = {
                    c: 0,
                    d: 0,
                    r: 0,
                }

                if(row.daily)
                {
                    row.total = row.daily[row.daily.length - 1];
                }


                if(this.database.raw.raw_annotations)
                {
                    if (this.database.raw.raw_annotations['All'] && this.database.raw.raw_annotations['All'].length > 0)
                    {
                        row.annotations = row.annotations.concat(this.database.raw.raw_annotations['All']);
                    }

                    if (this.database.raw.raw_annotations[row.name.country])
                    {
                        row.annotations = row.annotations.concat(this.database.raw.raw_annotations[row.name.country]);
                    }
                }
                var compareName = this.getCompareName(source).full;


                this.$emit('saveProcessedData',row,compareName);
                return row;
            },
            getGlobalData()
            {
                var row = _.clone(this.assembleDataset({country:'Global',state:false}));
                return row;
            },
            getComparisonData()
            {
                var data = [],
                    row = [];


                for(var x in this.database.processed.compare)
                {
                    if(this.database.processed.compare[x])
                    {
                        row = this.assembleDataset(this.database.processed.compare[x])
                        data.push(row);
                    }
                    else
                    {
                        data.push(false);
                    }
                }
                return data;
            },
            getChartData()
            {
                var data = [],
                    row = [];


                for(var x in this.database.processed.compare)
                {
                    if(this.database.processed.compare[x])
                    {
                        row = this.assembleDataset(this.database.processed.compare[x])
                        data.push(row);
                    }
                }
                return data;
            },
            toggleDashboardSort(key)
            {
                if(this.ui.dashboard.sort_stats.key == key)
                {
                    if(this.ui.dashboard.sort_stats.order == 'asc')
                    {
                        this.ui.dashboard.sort_stats.order = 'desc';
                    }
                    else
                    {
                        this.ui.dashboard.sort_stats.order = 'asc';
                    }
                }
                else
                {
                    this.ui.dashboard.sort_stats.key = key;
                }
            },
            findCompare(item)
            {
                var found = false;
                for(var x in this.compare)
                {
                    if(this.compare[x] && this.compare[x].country == item.country)
                    {

                        if(this.compare[x].state == item.state)
                        {
                            found = x;
                            break;
                        }
                    }
                }
                return found;
            },
            removeAllCompare()
            {
                for(var x in this.compare)
                {
                    // delete this.compare[x];
                    this.compare[x] = false;
                }
                this.updateSelected('all')
                this.$emit('updateCompare',this.compare);
            },
            removeCompare(item)
            {
                var found = this.findCompare(item);
                if(found)
                {
                    var key = item.country + item.state;
                    // delete this.compare[found];
                    this.compare[found] = false;
                    if(key == this.selectedCompareTab)
                    {
                        this.updateSelected(this.getLastCompareItem());
                    }
                }

                this.$emit('updateCompare',this.compare);
            },
            getDaily(compare)
            {
                if(compare && compare.country)
                {
                    var countryId = this.countriesIndex.indexOf(compare.country);
                    if(countryId >= 0)
                    {
                        var policies = this.getGovtResponse(compare.country);
                        if(policies && policies.daily)
                        {
                            policies = policies.daily;
                        }
                        else
                        {
                            policies = false;
                        }

                        if(!compare.state)
                        {
                            if(this.countryCases[compare.country] && this.countryCases[compare.country].daily)
                            {
                                var daily = _.cloneDeep(this.countryCases[compare.country].daily);
                                for(var x in daily)
                                {
                                    daily[x].delta.a = daily[x].delta.c - daily[x].delta.d - daily[x].delta.r;
                                    daily[x].percent = {};
                                    if(x > 0)
                                    {
                                        daily[x].percent.c = (daily[x].c - daily[x].delta.c) !== 0 ? daily[x].c / (daily[x].c - daily[x].delta.c) - 1 : 0;
                                        daily[x].percent.d = (daily[x].d - daily[x].delta.d) !== 0 ? daily[x].d / (daily[x].d - daily[x].delta.d) - 1 : 0;
                                        daily[x].percent.r = (daily[x].r - daily[x].delta.r) !== 0 ? daily[x].r / (daily[x].r - daily[x].delta.r) - 1 : 0;
                                    }
                                    else
                                    {
                                        daily[x].percent.c = 0;
                                        daily[x].percent.d = 0;
                                        daily[x].percent.r = 0;
                                    }

                                    var stringencyindex = 0;
                                    if(daily[x].date)
                                    {
                                        for(var y in policies)
                                        {
                                            if(policies[y].date === daily[x].date)
                                            {
                                                stringencyindex = policies[y].stringencyindex;
                                                break;
                                            }
                                        }
                                    }

                                    daily[x].stringencyindex = stringencyindex;
                                }
                                return daily;
                            }
                        }
                        else
                        {
                            var country = this.countries[countryId];

                            for(var x in country.states)
                            {
                                if(country.states[x] && country.states[x].id && country.states[x].name.state === compare.state)
                                {
                                    if(this.stateCases && this.stateCases[country.states[x].id])
                                    {
                                        var daily = _.cloneDeep(this.stateCases[country.states[x].id].daily);
                                    }
                                    else
                                    {
                                        var daily = [];
                                    }



                                    for(var x in daily)
                                    {
                                        daily[x].delta.a = daily[x].delta.c - daily[x].delta.d - daily[x].delta.r;
                                        daily[x].percent = {};
                                        if(x > 0)
                                        {
                                            daily[x].percent.c = (daily[x].c - daily[x].delta.c) !== 0 ? daily[x].c / (daily[x].c - daily[x].delta.c) - 1 : 0;
                                            daily[x].percent.d = (daily[x].d - daily[x].delta.d) !== 0 ? daily[x].d / (daily[x].d - daily[x].delta.d) - 1 : 0;
                                            daily[x].percent.r = (daily[x].r - daily[x].delta.r) !== 0 ? daily[x].r / (daily[x].r - daily[x].delta.r) - 1 : 0;
                                        }
                                        else
                                        {
                                            daily[x].percent.c = 0;
                                            daily[x].percent.d = 0;
                                            daily[x].percent.r = 0;
                                        }

                                    }
                                    return daily;
                                }
                            }
                        }
                    }
                }
                return [];
            },
            getCompareName(item)
            {
                if(item && item.country)
                {
                    var country = item.country;
                    if(item.state)
                    {
                        return {
                            full: item.state + ' - ' + country,
                            country: country,
                            state: item.state,
                            country_id: false,
                        };
                    }
                    else
                    {
                        return {
                            full: country,
                            country: country,
                            state: '',
                            country_id: false,
                        }
                    }
                }
                return '';
            },
            getFirstCompareItem()
            {
                for (var x in this.compare)
                {
                    if(this.compare[x])
                        return x;
                }
                return false;
            },
            getLastCompareItem()
            {
                var last = false;
                var compare = _.cloneDeep(this.compare);
                for (var x in compare)
                {
                    if(compare[x])
                        last = x;
                }
                return last;
            },
            getCompareLength()
            {
                var count = 0;
                for(var x in this.compare)
                {
                    if(this.compare[x])
                        count++;
                }

                return count;
            },
            selectCountry(country,state)
            {
                var find = this.findCompare({country: country,state: state});
                if(find !== false)
                {
                    // Remove from queue
                    this.removeCompare({country:country,state:state});
                }
                else
                {
                    // Trim current queue
                    if(this.getCompareLength() >= this.options.compare_limit)
                    {
                        this.removeCompare(this.compare[this.getFirstCompareItem()]);
                    }

                    // Add new item
                    if(this.getCompareLength() < this.options.compare_limit)
                    {
                        // this.compare[country+state] = {country: country, state: state};
                        this.compare.push({country: country, state: state})
                    }

                    // this.updateSelected(this.getLastCompareItem());
                }
                this.$emit('updateCompare',this.compare);
            },
            countries_states()
            {
                var data = {};
                for(var x in this.countries)
                {
                    var row = _.cloneDeep(this.countries[x]);
                    data[row.name] = [];
                    for(var y in row.states)
                    {
                        data[row.name].push(_.clone(row.states[y].name));
                    }
                }
                return data;
            },
            countries_and_stats()
            {
                return _.clone(this.countries);
            },
            updateSelected(key)
            {
                this.$emit('updateSelected',key);
            },
            global()
            {
                var data = {},
                    last_update = '';

                data = _.clone(this.countries[this.countriesIndex.indexOf('Global')]);

                if(data.total && data.total.date)
                {
                    data.last_update = data.total.date;
                }
                else
                {
                    data.last_update = '';
                }

                data.name = {
                    full: 'Global',
                    country: 'Global',
                    state: false
                }
                return data;
            },
            globalDataset()
            {
                var data = [],
                    daily = [];



                for(var x in this.global().daily)
                {
                    var row = this.global().daily[x];
                    daily.push({
                        'date' : x,
                        'confirmed' : row.c,
                        'deaths' : row.d,
                        'recovered' : row.r,
                        'active' : row.a,
                    });
                }

                data.push(this.assembleDataset(this.global(),daily,this.global().name));
                return data;
            },
            dashboard_countries_sorted()
            {
                var sort = this.ui.dashboard.sort_stats;
                var data = _.cloneDeep(this.countries_and_stats());
                return data.sort(function (a, b) {
                    if (sort.key == 'country')
                    {
                        if (sort.order == 'asc')
                            return a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1;
                        else
                            return a.name.toUpperCase() < b.name.toUpperCase() ? 1 : -1;
                    }

                    else if (sort.key == 'confirmed') {
                        if (sort.order == 'desc')
                            return parseInt(a.total.c) < parseInt(b.total.c) ? 1 : -1;
                        else
                            return parseInt(a.total.c) > parseInt(b.total.c) ? 1 : -1;
                    }

                    else if (sort.key == 'deaths') {
                        if (sort.order == 'desc')
                            return parseInt(a.total.d) < parseInt(b.total.d) ? 1 : -1;
                        else
                            return parseInt(a.total.d) > parseInt(b.total.d) ? 1 : -1;
                    }

                    else if (sort.key == 'recovered') {
                        if (sort.order == 'desc')
                            return parseInt(a.total.r) < parseInt(b.total.r) ? 1 : -1;
                        else
                            return parseInt(a.total.r) > parseInt(b.total.r) ? 1 : -1;
                    }

                    else if (sort.key == 'active') {
                        if (sort.order == 'desc')
                            return parseInt(a.total.active) < parseInt(b.total.active) ? 1 : -1;
                        else
                            return parseInt(a.total.active) > parseInt(b.total.active) ? 1 : -1;
                    }

                    else if (sort.key == 'population') {
                        if (sort.order == 'desc')
                            return parseInt(a.total.population) < parseInt(b.total.population) ? 1 : -1;
                        else
                            return parseInt(a.total.population) > parseInt(b.total.population) ? 1 : -1;
                    }

                    else if (sort.key == 'confirmedpc') {
                        if (sort.order == 'desc')
                            return parseFloat(a.total.confirmedpc) < parseFloat(b.total.confirmedpc) ? 1 : -1;
                        else
                            return parseFloat(a.total.confirmedpc) > parseFloat(b.total.confirmedpc) ? 1 : -1;
                    }

                    else if (sort.key == 'deathspc') {
                        if (sort.order == 'desc')
                            return parseFloat(a.total.deathspc) < parseFloat(b.total.deathspc) ? 1 : -1;
                        else
                            return parseFloat(a.total.deathspc) > parseFloat(b.total.deathspc) ? 1 : -1;
                    }

                    else if (sort.key == 'recoveredpc') {
                        if (sort.order == 'desc')
                            return parseFloat(a.total.recoveredpc) < parseFloat(b.total.recoveredpc) ? 1 : -1;
                        else
                            return parseFloat(a.total.recoveredpc) > parseFloat(b.total.recoveredpc) ? 1 : -1;
                    }

                    else if (sort.key == 'stringencyindex') {
                        if (sort.order == 'desc')
                            return parseFloat(a.total.stringencyindex) < parseFloat(b.total.stringencyindex) ? 1 : -1;
                        else
                            return parseFloat(a.total.stringencyindex) > parseFloat(b.total.stringencyindex) ? 1 : -1;
                    }
                });

            },
            emitCompare(item)
            {
                this.$emit('updateCompare',item);
            },
            preProcessData()
            {
                // var countries = _.clone(this.countries_and_stats());
                var countries = _.clone(this.sidebar_list);
                var countries_states = this.countries_states();
                var self = this;

                var excluded = this.excludedCountries;

                for(var x in countries)
                {
                    // var data = this.assembleDataset({country:countries[x].name})
                    var data = countries[x];
                    setTimeout(function(){
                        self.assembleDataset({country:data.name.country})
                    },1);


                    if(excluded.indexOf(countries[x].name.country) === -1)
                    {
                        this.rankings.sorted.country.push({country : _.clone(countries[x].name.country), value : _.clone(countries[x].name.country)});
                        this.rankings.sorted.confirmed.push({country : _.clone(countries[x].name.country), value : _.clone(parseInt(data.total.c))});
                        this.rankings.sorted.deaths.push({country : _.clone(countries[x].name.country), value : _.clone(parseInt(data.total.d))});
                        this.rankings.sorted.recovered.push({country : _.clone(countries[x].name.country), value : _.clone(parseInt(data.total.r))});
                        this.rankings.sorted.active.push({country : _.clone(countries[x].name.country), value : _.clone(parseInt(data.total.a))});

                        this.rankings.sorted.confirmedDelta.push({country : _.clone(countries[x].name.country), value : _.clone(parseInt(data.total.delta.c))});
                        this.rankings.sorted.deathsDelta.push({country : _.clone(countries[x].name.country), value : _.clone(parseInt(data.total.delta.d))});
                        this.rankings.sorted.recoveredDelta.push({country : _.clone(countries[x].name.country), value : _.clone(parseInt(data.total.delta.r))});

                        this.rankings.sorted.confirmedCapita.push({country : _.clone(countries[x].name.country), value : _.clone((data.total.capita.c))});
                        this.rankings.sorted.deathsCapita.push({country : _.clone(countries[x].name.country), value : _.clone((data.total.capita.d))});
                        this.rankings.sorted.recoveredCapita.push({country : _.clone(countries[x].name.country), value : _.clone((data.total.capita.r))});
                        this.rankings.sorted.activeCapita.push({country : _.clone(countries[x].name.country), value : _.clone((data.total.capita.a))});

                        this.rankings.sorted.confirmedAverage.push({country : _.clone(countries[x].name.country), value : _.clone((data.total.average.c))});
                        this.rankings.sorted.deathsAverage.push({country : _.clone(countries[x].name.country), value : _.clone((data.total.average.d))});
                        this.rankings.sorted.recoveredAverage.push({country : _.clone(countries[x].name.country), value : _.clone((data.total.average.r))});

                        this.rankings.sorted.deathsRate.push({country : _.clone(countries[x].name.country), value : _.clone(parseFloat(data.total.rate.d))});
                        this.rankings.sorted.recoveredRate.push({country : _.clone(countries[x].name.country), value : _.clone(parseFloat(data.total.rate.r))});

                        this.rankings.sorted.population.push({country : _.clone(countries[x].name.country), value : _.clone(parseInt(data.population))});

                        this.rankings.sorted.growthFactor.push({country : _.clone(countries[x].name.country), value : _.clone((data.total.growth.c))});
                    }

                    // Populate the states within the country
                    if(countries_states && countries_states[countries[x].name.country] && countries_states[countries[x].name.country].length > 1)
                    {
                        for(var y in countries_states[countries[x].name.country])
                        {
                            if(countries_states[countries[x].name.country][y] && countries_states[countries[x].name.country][y] !== '(Unspecified)')
                            {
                                // this.assembleDataset({
                                //     country: countries[x].name,
                                //     state: countries_states[countries[x].name][y]
                                // });
                                // setTimeout(function(){
                                //     self.assembleDataset({
                                //         country: countries[x].name,
                                //         state: countries_states[countries[x].name.country][y]
                                //     })
                                // },1);
                            }
                        }
                    }
                }

                // Sort the ranking data and reorganise the index

                for(var x in this.rankings.sorted)
                {
                    var key = x;
                    var sorted = this.rankings.sorted[x].sort(function (a, b) {
                        if(key === 'country')
                        {
                            return a.country.toUpperCase() > b.country.toUpperCase() ? 1 : -1;
                        }
                        else
                        {
                            return a.value < b.value ? 1 : -1;
                        }
                    });

                    this.rankings.sorted[x] = _.cloneDeep(sorted);

                    var count = 0;
                    for(var y in this.rankings.sorted[x])
                    {
                        if(excluded.indexOf(this.rankings.sorted[x][y].country) === -1)
                        {
                            count++;
                            this.rankings.positions[x][this.rankings.sorted[x][y].country] = count;
                        }
                    }
                }

                this.draw_sorted_countries();
                // this.draw_excluded_countries();
            },
            get_rank(country)
            {
                if(country)
                {
                    if(this.rankings.positions && this.sort_stats && this.sort_stats.key && this.rankings.positions[this.sort_stats.key] && this.rankings.positions[this.sort_stats.key][country])
                    {
                        return this.rankings.positions[this.sort_stats.key][country];
                    }
                }
                return 0;
            }
        },
        computed: {
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
            selectedCompareTab()
            {
                return this.database.processed.selectedCompareTab;
            },
            compare: {
                get: function(){
                    return this.database.processed.compare;
                },
                set: function(value)
                {
                    return value;
                }
            },
            view()
            {
                if(this.$route.name === 'comparisonDaily')
                {
                    this.ui.content.selectedTab = 'daily';
                }
                else if(this.$route.name === 'comparisonCharts')
                {
                    this.ui.content.selectedTab = 'charts';
                }
                else if(this.$route.name === 'comparisonResponse')
                {
                    this.ui.content.selectedTab = 'response';
                }
                else if(this.$route.name === 'comparisonMap')
                {
                    this.ui.content.selectedTab = 'map';
                }
                else if(this.$route.name === 'about')
                {
                    this.ui.content.selectedTab = 'about';
                }
                else
                {
                    this.ui.content.selectedTab = 'dashboard';
                }
                return this.ui.content.selectedTab;
            },
            loading()
            {
                if(this.database && this.database.loading)
                {
                    return this.database.loading;
                }
                else
                    return {
                        'countries' : false,
                        'states' : false,
                        'annotations' : false,
                        'global' : false,
                    };
            },
            raw_global()
            {
                return this.database.raw.raw_global;
            },
            countries_sorted()
            {
                return this.sorted_countries_list;

            },
            loaded()
            {
                if(this.countriesStatus == 'success' && this.countryCasesStatus == 'success' && this.stateCasesStatus == 'success' && this.ajax_loading.oxford && !this.ajax_loading.final)
                {
                    var self = this;
                    setTimeout(function(){
                        self.ajax_loading.final = true;
                    },100);
                }
                else if(this.countriesStatus == 'success' && this.countryCasesStatus == 'success' && this.stateCasesStatus == 'success' && this.ajax_loading.oxford && this.ajax_loading.final)
                {
                    return true;
                }
                return false;
            },
            isMobile() {
                if( screen.width <= 760 ) {
                    return true;
                }
                else {
                    return false;
                }
            }
        },
        watch: {
            loaded: function(newvalue)
            {
                if(newvalue === true)
                {
                    this.preProcessData();
                    this.processGovtResponse();
                }
            },
            sort_stats:
            {
                deep: true,
                handler()
                {
                    this.draw_sorted_countries();
                }
            }
        }
    }
    </script>

<style scoped>

</style>
