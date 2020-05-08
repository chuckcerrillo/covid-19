<template>
    <div>
        <div class="xl:hidden">
            <p class="text-sm text-yellow-400 m-4">For the full experience, including comparison views and charts, please view this website on a larger screen (at least 1920x1080). We are currently working on making this tool available on smaller screens.</p>
        </div>
        <div class="hidden xl:block" v-if="!loaded">Loading data</div>
        <div v-else class="h-full overflow-hidden relative">
            <div class="hidden relative h-full xl:flex flex-1">
                <div class="flex flex-col" :class="view == 'dashboard' || view == 'about' ? 'hidden' : ''">
                    <div class="m-4 mb-0 overflow-hidden bg-lightslab rounded h-56 p-4">
                        <div class="text-2xl tracking-tight font-bold">Global tally</div>
                        <div class="text-xs mb-4">as of {{global().last_update}}</div>

                        <div class="flex font-bold justify-between items-center">
                            <div class="m-2 ml-0">
                                <div class="text-sm">Confirmed</div>
                                <div class="text-2xl text-white">{{global().total.confirmed| numeralFormat}}</div>
                            </div>
                            <div class="m-2">
                                <div class="text-sm">Deaths</div>
                                <div class="text-2xl text-white">{{global().total.deaths| numeralFormat}}</div>
                            </div>
                            <div class="m-2 mr-0">
                                <div class="text-sm">Recovered</div>
                                <div class="text-2xl text-white">{{global().total.recovered| numeralFormat}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="overflow-hidden bg-slab rounded m-4 flex flex-col items-start h-full p-4 relative">
                        <div class="">
                            <div class="tracking-tight font-bold">Countries and states <br>({{countriesIndex.length}} total)</div>
                            <div class="text-xs text-right">Sorting by {{sort_stats.key}} {{sort_stats.order}}</div>
                            <div class="flex font-bold py-2 text-xs items-center bg-slab-primary">
                                <div class="w-4 p-2 m-1 ml-0"></div>
                                <div class="w-32 cursor-pointer p-2 overflow-hidden" :class="sort_stats.key == 'country' ? 'bg-hoverslab' : '' " @click="toggleSort('country')">Country / Region</div>
                                <div class="w-20 cursor-pointer p-2 overflow-hidden" :class="sort_stats.key == 'confirmed' ? 'bg-hoverslab' : '' " @click="toggleSort('confirmed')">Confirmed</div>
                                <div class="w-20 cursor-pointer p-2 overflow-hidden" :class="sort_stats.key == 'deaths' ? 'bg-hoverslab' : '' " @click="toggleSort('deaths')">Deaths</div>
                                <div class="w-20 cursor-pointer p-2 overflow-hidden" :class="sort_stats.key == 'recovered' ? 'bg-hoverslab' : '' " @click="toggleSort('recovered')">Recovered</div>
                            </div>
                        </div>
                        <div class="w-full h-full relative">
                            <simplebar data-simplebar-auto-hide="false" class="top-0 right-0 bottom-0 left-0" style="position:absolute">
                                <CountryStateItem
                                    v-for="(data,key,index) in countries_sorted"
                                    v-on:selectCountry="selectCountry"
                                    :data="data"
                                    :key="key"
                                    :country_key="key"
                                    :compare="compare"
                                    :settings="{dashboard:false}"
                                />

                            </simplebar>
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
                <div class="m-4 ml-0 w-full overflow-hidden relative" :class="view == 'dashboard' || view == 'about' ? 'ml-4': ''">
                    <div class="bg-slab rounded absolute top-0 right-0 bottom-0 left-0 flex-1 flex-col p-4">
                        <div class="absolute top-0 right-0 bottom-0 left-0 p-4">
                            <simplebar v-if="view != 'charts' && view != 'dashboard' && view != 'about'" class="text-xs w-full">
                                <div class="w-full flex items-center justify-start relative">
                                    <div @click="updateSelected('all')" class="cursor-pointer relative rounded rounded-b-none py-2 px-4 pr-8 mx-1 whitespace-no-wrap overflow-hidden truncate ..." :class="selectedCompareTab == 'all' ? 'bg-hoverslab' : 'bg-slab-primary'" style="max-width: 12rem;">
                                        Comparison
                                    </div>
                                    <div v-for="(row,key,index) in compare">
                                        <div @click="updateSelected(key)" class="cursor-pointer relative rounded rounded-b-none py-2 px-4 pr-8 mx-1 whitespace-no-wrap overflow-hidden truncate ..." :class="selectedCompareTab == key ? 'bg-hoverslab' : 'bg-slab-primary'" style="max-width: 12rem;">
                                            {{getCompareLength() > 0 && row.state ? row.state + ' - ' : ''}}
                                            {{getCompareLength() > 0 ? row.country : '(none)'}}
                                            <div v-on:click.stop="removeCompare({country: row.country,state: row.state})" class="text-lightlabel text-xs absolute top-0 right-0 m-2 px-2 pb-1 rounded hover:text-heading hover:bg-lightlabel">x</div>
                                        </div>
                                    </div>
                                    <div v-if="getCompareLength() > 0" class="w-24 border absolute z-10 bg-slab border-hoverslab hover:bg-hoverslab px-2 py-1 top-0 right-0 cursor-pointer" @click="removeAllCompare()">
                                        Remove all
                                    </div>
                                </div>
                            </simplebar>
                            <div class="h-full relative" v-if="view == 'response'">
                                <div class="absolute top-0 left-0 right-0 bottom-0 rounded bg-hoverslab" style="bottom:2rem;">

                                        <div class="h-full m-4" :class="selectedCompareTab != 'all' ? 'hidden' : ''">
                                            <h1 class="text-3xl font-bold">Government Response Tracker</h1>
                                            <div v-if="getCompareLength() == 0">
                                                <div>
                                                    <p>These data are based on the <a class="text-orangeslab hover:text-blue-400 hover:underline" target="_blank" href="https://www.bsg.ox.ac.uk/research/research-projects/coronavirus-government-response-tracker">Coronavirus Government Response Tracker</a> by the University of Oxford.</p>
                                                    <blockquote class="italic m-2 ml-4 border-l-4 p-4 border-lightslab">
                                                        <p class="py-2">Systematic information on which governments have taken which measures, and when, can help decision-makers and citizens understand the robustness of governmental responses in a consistent way, aiding efforts to fight the pandemic. The Oxford COVID-19 Government Response Tracker (OxCGRT) systematically collects information on several different common policy responses governments have taken, scores the stringency of such measures, and aggregates these scores into a common Stringency Index.</p>
                                                        <p class="py-2">Data is collected from public sources by a team of over one hundred Oxford University students and staff from every part of the world.</p>
                                                    </blockquote>

                                                    <p class="mt-8">Select a country or state to begin comparing.</p>
                                                </div>
                                            </div>
                                            <ComparePolicies v-else
                                                    :data="comparePolicies()"
                                            />
                                        </div>
                                        <div v-for="(row,key,index) in getUniqueCountriesCompare()" class="absolute m-4 inset-0 bg-hoverslab rounded p-4 border" v-if="selectedCompareTab.substr(0,row.country.length) == row.country" :key="index">
                                            <simplebar data-simplebar-auto-hide="false" class="top-0 right-0 bottom-0 left-0" style="position:absolute;">
                                                <div class="my-4">
                                                    <div class="w-128 text-4xl font-bold">{{row.country}}</div>
                                                    <div v-if="getGovtResponse(row.country)" class="text-6xl font-bold">{{getGovtResponse(row.country).latest.si}}</div>
                                                    <div v-else class="text-6xl font-bold">N/A</div>
                                                    <div class="text-lightlabel font-bold tracking-tight">stringency index</div>
                                                    <div class="py-2 text-sm">OxCGRT collects publicly available information on 17 indicators of government response. This information is collected by a team of over 100 volunteers from the Oxford community and is updated continuously.</div>
                                                    <div class="py-2 text-sm">Eight of the policy indicators (C1-C8) record information on containment and closure policies, such as school closures and restrictions in movement. Four of the indicators (E1-E4) record economic policies such as income support to citizens or provision of foreign aid. And five indicators (H1-H5) record health system policies such as the Covid-19 testing regime or emergency investments into healthcare.</div>
                                                    <div class="py-2 text-sm">For a full description of the data and how it is collected, check out the <a target="_blank" class="text-orangeslab hover:text-blue-400 hover:underline" href="https://www.bsg.ox.ac.uk/research/research-projects/coronavirus-government-response-tracker">University of Oxford's coronavirus government response tracker (OxCGRT)</a></div>
                                                    <div class="py-2 text-sm">A higher position in the Stringency Index does not necessarily mean that a country's response is ‘better’ than others lower on the index.</div>
                                                </div>
                                                <div class="flex flex-wrap">
                                                    <GovtResponse
                                                        v-if="getGovtResponse(row.country)"
                                                        v-for="(policy,key,index) in getLatestGovtResponse(row.country)"
                                                        :key="index"
                                                        :policy="policy" />
                                                </div>
                                            </simplebar>
                                        </div>
                                </div>
                            </div>
                            <!--                                <div class="" v-show="ui.content.selectedTab == 'timeline'">Timeline</div>-->
                            <div class="h-full relative" v-if="view == 'daily'">
                                <div class="absolute top-0 right-0 bottom-0 left-0 bg-hoverslab rounded" style="bottom:32px;">
                                    <div class="h-full" :class="selectedCompareTab != 'all' ? 'hidden' : ''">
                                        <div v-if="getCompareLength() == 0" class="m-4">
                                            Select up to {{options.compare_limit}} countries or states to begin comparing.
                                        </div>
                                        <Latest v-else
                                                :data="getComparisonData()"
                                        />
                                    </div>
    <!--                                <div v-if="getCompareLength() == 0">-->
    <!--                                    Select up to {{options.compare_limit}} countries or states to begin comparing.-->
    <!--                                </div>-->

                                    <div v-if="getCompareLength() > 0" v-for="(row,key,index) in compare" class="">
                                        <div class="h-full" :class="selectedCompareTab != key ? 'hidden' : ''">
                                            <Daily
                                                v-on:removeCompare="removeCompare"
                                                :data="getComparisonData()[index]"
                                                :settings="{absolute:true, solo:false}"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="h-full relative flex flex-1 pt-8" v-if="view == 'charts'">
                                <StatsChart :data="getComparisonData()" :full="true" />
                            </div>

                            <div class="h-full relative flex flex-1" v-show="view == 'about'">
                                <About />
                            </div>

<!--                            <div class="h-full relative flex flex-1" v-show="view == 'dashboard'">-->
<!--                                <simplebar data-simplebar-auto-hide="true" class="h-full w-full">-->
<!--                                    <div class="flex items-start">-->
<!--                                        <div class="w-full h-64 md:h-120 xl:h-148 wqhd:h-200">-->
<!--                                            <Map-->
<!--                                                class="w-full xl:rounded-lg overflow-hidden h-full"-->
<!--                                                id="world_map"-->
<!--                                                :enable="true"-->
<!--                                                :data="countries_sorted"-->
<!--                                                :settings="{interactive:true,zoom:1}"-->
<!--                                            />-->
<!--                                            <div class="mt-4 flex">-->
<!--                                                <div @click="ui.dashboard.table = 'daily'" class="p-2 mr-4 text-sm rounded cursor-pointer hover:bg-lightslab" :class="ui.dashboard.table == 'daily' ? 'border border-heading bg-lightslab':''">Daily stats</div>-->
<!--                                                <div @click="ui.dashboard.table = 'countries'" class="p-2 mr-4 text-sm rounded cursor-pointer hover:bg-lightslab" :class="ui.dashboard.table == 'countries' ? 'border border-heading  bg-lightslab':''">Countries</div>-->
<!--                                            </div>-->
<!--                                            <div class="mt-4 tableforglobaldata relative bg-hoverslab p-2 rounded" v-show="ui.dashboard.table == 'daily'">-->
<!--                                                <Daily-->
<!--                                                    :data="getGlobalData()"-->
<!--                                                    :settings="{absolute:false, solo:true}"-->
<!--                                                />-->
<!--                                            </div>-->
<!--                                            <div class="mt-4 tableforglobaldata relative bg-hoverslab p-2 rounded" v-show="ui.dashboard.table == 'countries'">-->
<!--                                                <div class="mx-2 border-b border-hoverslab">-->
<!--                                                    <div class="tracking-tight font-bold">Countries and states <br>({{countries().length}} total)</div>-->
<!--                                                    <div class="text-xs text-right">Sorting by {{ui.dashboard.sort_stats.key}} {{ui.dashboard.sort_stats.order}}</div>-->
<!--                                                    <div class="flex font-bold py-2 text-xs items-center bg-slab-primary rounded-t flex justify-center items-end">-->
<!--                                                        <div class="w-4 p-2 m-1 ml-0"></div>-->
<!--                                                        <div class="w-32 rounded cursor-pointer p-2 overflow-hidden" :class="ui.dashboard.sort_stats.key == 'country' ? 'bg-hoverslab' : '' " @click="toggleDashboardSort('country')">Country / Region</div>-->
<!--                                                        <div class="w-20 rounded cursor-pointer p-2 overflow-hidden" :class="ui.dashboard.sort_stats.key == 'confirmed' ? 'bg-hoverslab' : '' " @click="toggleDashboardSort('confirmed')">Confirmed</div>-->
<!--                                                        <div class="w-20 rounded cursor-pointer p-2 overflow-hidden" :class="ui.dashboard.sort_stats.key == 'deaths' ? 'bg-hoverslab' : '' " @click="toggleDashboardSort('deaths')">Deaths</div>-->
<!--                                                        <div class="w-20 rounded cursor-pointer p-2 overflow-hidden" :class="ui.dashboard.sort_stats.key == 'recovered' ? 'bg-hoverslab' : '' " @click="toggleDashboardSort('recovered')">Recovered</div>-->
<!--                                                        <div class="w-20 rounded cursor-pointer p-2 overflow-hidden" :class="ui.dashboard.sort_stats.key == 'active' ? 'bg-hoverslab' : '' " @click="toggleDashboardSort('active')">Active</div>-->
<!--                                                        <div class="w-20 rounded cursor-pointer p-2 overflow-hidden" :class="ui.dashboard.sort_stats.key == 'population' ? 'bg-hoverslab' : '' " @click="toggleDashboardSort('population')">Population</div>-->
<!--                                                        <div class="w-20 rounded cursor-pointer p-2 overflow-hidden" :class="ui.dashboard.sort_stats.key == 'confirmedpc' ? 'bg-hoverslab' : '' " @click="toggleDashboardSort('confirmedpc')">Confirmed Per 1M population</div>-->
<!--                                                        <div class="w-20 rounded cursor-pointer p-2 overflow-hidden" :class="ui.dashboard.sort_stats.key == 'deathspc' ? 'bg-hoverslab' : '' " @click="toggleDashboardSort('deathspc')">Deaths Per 1M population</div>-->
<!--                                                        <div class="w-20 rounded cursor-pointer p-2 overflow-hidden" :class="ui.dashboard.sort_stats.key == 'recoveredpc' ? 'bg-hoverslab' : '' " @click="toggleDashboardSort('recoveredpc')">Recovered Per 1M population</div>-->
<!--                                                        <div class="w-20 rounded cursor-pointer p-2 overflow-hidden" :class="ui.dashboard.sort_stats.key == 'stringencyindex' ? 'bg-hoverslab' : '' " @click="toggleDashboardSort('stringencyindex')">Stringency Index</div>-->
<!--                                                    </div>-->
<!--                                                </div>-->
<!--                                                <div class="relative mx-2">-->
<!--                                                        <CountryStateItem-->
<!--                                                            v-for="(data,key,index) in dashboard_countries_sorted()"-->
<!--                                                            :key="key"-->
<!--                                                            :data="data"-->
<!--                                                            :country_key="key"-->
<!--                                                            :compare="compare"-->
<!--                                                            :settings="{dashboard:true}"-->
<!--                                                        />-->
<!--                                                </div>-->
<!--                                            </div>-->
<!--                                        </div>-->

<!--                                        <div class="w-128 rounded bg-hoverslab p-4 ml-4">-->
<!--                                            <div class="font-bold mb-2">Events</div>-->
<!--                                            <simplebar data-simplebar-auto-hide="true" class="text-sm h-48 md:h-120 xl:h-132 wqhd:h-184" >-->
<!--    &lt;!&ndash;                                        {{getAnnotations()}}&ndash;&gt;-->
<!--                                                <ul>-->
<!--                                                    <li v-if="getAnnotations().length == 0" class="text-xs p-4">-->
<!--                                                        Nothing to show here.-->
<!--                                                    </li>-->
<!--                                                    <li v-for="note in getAnnotations()" class="flex text-xs items-start justify-start mr-4">-->
<!--                                                        <div class="mr-1 w-20 text-date-slab">{{note.date}}</div>-->
<!--                                                        <div class="w-full">-->
<!--                                                            <span v-if="note.state.length > 0" class="font-bold mr-1">[{{note.state}}]</span>-->
<!--                                                            <span>{{note.notes}}</span>-->
<!--                                                            <span v-if="note.url"><a class="underline hover:text-white" :href="note.url">(source)</a></span>-->
<!--                                                        </div>-->
<!--                                                    </li>-->
<!--                                                </ul>-->
<!--                                            </simplebar>-->
<!--                                        </div>-->
<!--                                    </div>-->


<!--                                </simplebar>-->
<!--                            </div>-->
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import simplebar from 'simplebar-vue';
    import LineChart from "../components/charts/LineChart";
    import 'simplebar/dist/simplebar.min.css';
    import Daily from "../components/Daily";
    import ComparisonChart from "../components/ComparisonChart";
    import StatsChart from "../components/StatsChart";
    import CountryStateItem from "../components/CountryStateItem";
    import moment from 'moment'
    import Single from "./Single";
    import Map from '../components/Map';
    import {mapGetters} from 'vuex';
    import GovtResponse from "../components/GovtResponse";
    import About from "./About";
    import Latest from "../components/Latest";
    import ComparePolicies from "../components/ComparePolicies";

    export default {
        name: "Comparison",
        components:{
            About,
            simplebar,
            LineChart,
            Daily,
            ComparisonChart,
            CountryStateItem,
            Single,
            StatsChart,
            Map,
            GovtResponse,
            Latest,
            ComparePolicies,
        },
        props: [
            'database',
        ],
        created(){

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
                    this.database.loading.oxford = true;
                })
                .catch(error => {

                });

            // alert('created');

            this.database.processed.selectedCompareTab = 'all';
        },
        mounted()
        {
            // alert('mounted');
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
                    'compare_limit' : 5,
                },
                'comparison' : [],

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
                    'chart' : {}
                }
            }
        },
        methods:{
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
                    if(countries.indexOf(this.compare[x].country) === -1)
                    {
                        countries.push(this.compare[x].country);
                        data.push(this.compare[x]);
                    }
                }
                return data;
            },
            comparePolicies()
            {
                var data = [];
                for(var x in this.getUniqueCountriesCompare())
                {
                    var row = {};
                    row.name = this.getUniqueCountriesCompare()[x].country;
                    row.latest = this.getLatestGovtResponse(row.name);
                    if(this.getGovtResponse(row.name))
                    {
                        row.stringencyindex = this.getGovtResponse(row.name).latest.si;
                    }
                    else
                    {
                        row.stringencyindex = 'N/A';
                    }
                    data.push(_.clone(row));
                }
                return data;
            },
            getLatestGovtResponse(country)
            {
                var response = this.getGovtResponse(country);
                var data = [];
                if(response && response.latest && response.latest.policies)
                {
                    for(var x in response.latest.policies)
                    {

                        var row = response.latest.policies[x];
                        var key = response.key[x];
                        var target = '';
                        var value = row.value;
                        if(key && key.values)
                        {
                            var help = key.values;
                        }
                        else
                        {
                            var help = [];
                        }

                        if(key.hasTarget)
                        {
                            if(key.targets && key.targets.length > 0)
                            {
                                target = 'Scope: ' + key.targets[row.t];
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
                        if(row.v.length == 0)
                        {
                            value = '';
                            target = '';
                        }
                        else if(key.type == 'lookup')
                        {
                            value = key.values[parseInt(row.v)];
                        }
                        else
                        {
                            value = row.v;
                        }

                        data.push({
                            id: x,
                            name: key.name,
                            description: key.description,
                            value: value,
                            target: target,
                            since: row.s,
                            help: help,
                            notes: row.n,
                        })

                        data = data.sort(function (a, b) {
                            return a.id > b.id ? 1 : -1;
                        });
                    }
                }
                return data;
            },
            getGovtResponse(country)
            {
                if(country)
                {
                    if(this.database.raw.raw_oxford && this.database.raw.raw_oxford.latest && this.database.raw.raw_oxford.latest[country])
                    {
                        return {
                            key: this.database.raw.raw_oxford.key,
                            latest: this.database.raw.raw_oxford.latest[country],
                            daily: this.database.raw.raw_oxford.daily[country],
                        }
                    }
                }
                return false;
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
                    state = false;

                if(!daily && !name)
                {

                    if(source.state)
                    {
                        for(var x in country.states)
                        {
                            if(country.states[x].name == source.state)
                            {
                                state = _.clone(country.states[x]);
                                break;
                            }
                        }

                        if(state)
                        {
                            lat = state.lat;
                            long = state.lng;
                            population = state.population;
                        }
                    }
                    else
                    {
                        lat = country.lat;
                        long = country.long;
                        population = country.population;
                    }

                }


                row = {
                    name: name ? name : this.getCompareName(source),
                    lat: lat,
                    long: long,
                    population: population,
                    annotations: [],
                    daily: (daily ? daily : this.getDaily(source)),
                }
                row.total = row.daily[row.daily.length - 1];

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
                }
                return data;
            },
            toggleSort(key)
            {
                if(this.sort_stats.key == key)
                {
                    if(this.sort_stats.order == 'asc')
                    {
                        this.sort_stats.order = 'desc';
                    }
                    else
                    {
                        this.sort_stats.order = 'asc';
                    }
                }
                else
                {
                    this.sort_stats.key = key;
                }
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
                    if(this.compare[x].country == item.country)
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
                    delete this.compare[x];
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
                    delete this.compare[found];
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
                                var daily = _.clone(this.countryCases[compare.country].daily);
                                var stringencyindex = 0;
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


                                    if (daily[x].date && policies && policies[daily[x].date])
                                    {
                                        stringencyindex = policies[daily[x].date].si;
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
                                if(country.states[x] && country.states[x].id && country.states[x].name == compare.state)
                                {
                                    var daily = _.clone(this.stateCases[country.states[x].id].daily);
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
                        this.compare[country+state] = {country: country, state: state};
                    }

                    // this.updateSelected(this.getLastCompareItem());
                }
                this.$emit('updateCompare',this.compare);
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

                if(data.total)
                {
                    data.total.active = data.total.confirmed - data.total.deaths - data.total.recovered;
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
                        'confirmed' : row.confirmed,
                        'deaths' : row.deaths,
                        'recovered' : row.recovered
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
                if(this.$route.name == 'comparisonDaily')
                {
                    this.ui.content.selectedTab = 'daily';
                }
                else if(this.$route.name == 'comparisonCharts')
                {
                    this.ui.content.selectedTab = 'charts';
                }
                else if(this.$route.name == 'comparisonResponse')
                {
                    this.ui.content.selectedTab = 'response';
                }
                else if(this.$route.name == 'about')
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
                    return this.database.loading;
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
                var sort = this.sort_stats;
                var data = _.clone(this.countries_and_stats());
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
                            return parseInt(a.total.confirmed) < parseInt(b.total.confirmed) ? 1 : -1;
                        else
                            return parseInt(a.total.confirmed) > parseInt(b.total.confirmed) ? 1 : -1;
                    }

                    else if (sort.key == 'deaths') {
                        if (sort.order == 'desc')
                            return parseInt(a.total.deaths) < parseInt(b.total.deaths) ? 1 : -1;
                        else
                            return parseInt(a.total.deaths) > parseInt(b.total.deaths) ? 1 : -1;
                    }

                    else if (sort.key == 'recovered') {
                        if (sort.order == 'desc')
                            return parseInt(a.total.recovered) < parseInt(b.total.recovered) ? 1 : -1;
                        else
                            return parseInt(a.total.recovered) > parseInt(b.total.recovered) ? 1 : -1;
                    }
                });

            },
            loaded()
            {
                if(this.countriesStatus == 'success' && this.countryCasesStatus == 'success' && this.stateCasesStatus == 'success')
                // if (this.database && this.database.loading && this.database.loading.countries && this.database.loading.states && this.database.loading.annotations && this.database.loading.global && this.database.loading.oxford)
                {
                    return true;
                }
                return false;
            },
        }
    }
</script>

<style scoped>

</style>
