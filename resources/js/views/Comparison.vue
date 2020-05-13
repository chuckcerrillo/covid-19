<template>
    <div>
        <div class="xl:hidden">
            <p class="text-sm text-yellow-400 m-4">For the full experience, including comparison views and charts, please view this website on a larger screen (at least 1920x1080). We are currently working on making this tool available on smaller screens.</p>
        </div>
        <div class="hidden xl:block" v-if="!loaded">Loading data</div>
        <div v-else class="h-full overflow-hidden relative">
            <div class="hidden relative h-full xl:flex flex-1">
                <Sidebar
                    :class="view === 'dashboard' || view === 'about' || view === 'map'? 'hidden' : ''"
                    :global="global()"
                    :sort_stats="sort_stats"
                    :countriesIndex="countriesIndex"
                    :countries_sorted="countries_sorted"
                    :selectCountry="selectCountry"
                    :compare="compare"
                />
                <div class="m-4 ml-0 w-full overflow-hidden relative" :class="view === 'dashboard' || view === 'about' || view === 'map' ? 'ml-4': ''">
                    <div class="bg-slab rounded absolute top-0 right-0 bottom-0 left-0 flex-1 flex-col p-4">
                        <div class="absolute top-0 right-0 bottom-0 left-0 p-4">
                            <simplebar v-if="view != 'charts' && view != 'dashboard' && view != 'about' && view != 'map'" class="text-xs w-full">
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

                            <keep-alive include="DashboardView,PoliciesView,MapView,About,StatsChart">
                                <PoliciesView
                                    v-if="view === 'response'"
                                    :selectedCompareTab="selectedCompareTab"
                                    :comparePolicies="comparePolicies()"
                                    :uniqueCountries="getUniqueCountriesCompare()"
                                    :compareLength="getCompareLength()"
                                    :database="database"
                                />

                                <DailyView
                                    v-else-if="view === 'daily'"
                                    :selectedCompareTab="selectedCompareTab"
                                    :options="options"
                                    :comparisonData="getComparisonData()"
                                    :view="view"
                                    :compare="compare"
                                    v-on:updateCompare="emitCompare"
                                    v-on:updateSelected="updateSelected"
                                />


                                <div class="h-full relative flex flex-1 pt-8" v-else-if="view === 'charts'">
                                    <StatsChart :data="getComparisonData()" :full="true" :active="view === 'charts'" />
                                </div>

                                <MapView
                                    v-else-if="view === 'map'"
                                    :countries_sorted="countries_sorted"
                                    :annotations="getAnnotations()"
                                    :getDaily="getDaily()"
                                    :database="database"
                                />

                                <div class="h-full relative flex flex-1" v-show="view == 'about'">
                                    <About />
                                </div>
                            </keep-alive>
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
    import StatsChart from "../components/StatsChart";
    import moment from 'moment'
    import Map from '../components/Map';
    import {mapGetters} from 'vuex';
    import About from "./About";
    import Sidebar from "../components/Sidebar";
    import PoliciesView from "./PoliciesView";
    import DailyView from "./DailyView";
    import DashboardView from "./DashboardView";
    import MapView from "./MapView";

    export default {
        name: "Comparison",
        components:{
            DashboardView,
            MapView,
            DailyView,
            PoliciesView,
            About,
            simplebar,
            StatsChart,
            Map,
            Sidebar,
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
            // // Assemble data for everything and prepopulate the processed array
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
                },
                layers : {
                    confirmed: false
                }
            }
        },
        methods:{
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
                    // row.latest = this.getLatestGovtResponse(row.name);


                    if(this.getGovtResponse(row.name))
                    {
                        row.stringencyindex = this.getGovtResponse(row.name).latest.si;
                        var daily = [];
                        for(var y in this.getGovtResponse(row.name).daily)
                        {
                            daily.push(_.clone(this.translateGovtResponse(this.getGovtResponse(row.name).daily[y])))
                        }
                        row.daily = daily;
                    }
                    else
                    {
                        row.stringencyindex = 'N/A';
                        row.daily = {};
                    }
                    data.push(_.clone(row));
                }
                return data;
            },
            translateGovtResponse(policy)
            {

                var key = this.database.raw.raw_oxford.key;
                for(var x in policy.latest)
                {
                    var row = policy.latest[x];
                    var target = '';
                    var value = row.value;
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
                            target = 'Scope: ' + key[x].targets[row.target];
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
                    if(row.value.length == 0)
                    {
                        value = '';
                        target = '';
                    }
                    else if(key[x] && key[x].type == 'lookup')
                    {
                        value = key[x].values[parseInt(row.value)];
                    }
                    else
                    {
                        value = row.value;
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
                return _.clone(policy);
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
                            daily: this.getDailyGovtResponse(this.database.raw.raw_oxford.daily[country],'2020-01-01',moment().format('YYYY-MM-DD')),
                            // daily: this.database.raw.raw_oxford.daily[country],
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

                var data = [],
                    temp = {};

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
                        data.push(_.clone(row));
                        temp = _.clone(row);
                    }
                    else
                    {
                        row = _.clone(temp);
                        row.date = new_date;
                        data.push(row);
                    }

                }
                return data;
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
                        long = country.lng;
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
            emitCompare(item)
            {
                this.$emit('updateCompare',item);
            },
            preProcessData()
            {
                var countries = _.clone(this.countries_and_stats());
                for(var x in countries)
                {
                    this.assembleDataset({country:countries[x].name})
                }
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
                {
                    return true;
                }
                return false;
            },
        },
        watch: {
            loaded: function(newvalue)
            {
                if(newvalue === true)
                {
                    this.preProcessData();
                }
            }
        }
    }
    </script>

<style scoped>

</style>
