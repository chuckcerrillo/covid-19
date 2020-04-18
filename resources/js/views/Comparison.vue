thi<template>
    <div>
        <div v-if="!loaded">Loading data</div>
        <div v-else class="h-full overflow-hidden relative">
            <div class="relative h-full flex flex-1">
                <div class="flex flex-col">
<!--                    <div class="hidden m-4 absolute left-0 top-0 w-full overflow-hidden bg-lightslab rounded h-48 z-10 p-4">-->
<!--                        <div class="text-2xl tracking-tight font-bold">Global tally</div>-->
<!--                        <div class="text-xs mb-4">as of {{global.last_update}}</div>-->

<!--                        <div class="flex font-bold justify-between items-center">-->
<!--                            <div class="m-2">-->
<!--                                <div class="text-sm">Confirmed</div>-->
<!--                                <div class="text-3xl text-white">{{global.total.confirmed| numeralFormat}}</div>-->
<!--                            </div>-->
<!--                            <div class="m-2">-->
<!--                                <div class="text-sm">Deaths</div>-->
<!--                                <div class="text-3xl text-white">{{global.total.deaths| numeralFormat}}</div>-->
<!--                            </div>-->
<!--                            <div class="m-2">-->
<!--                                <div class="text-sm">Recovered</div>-->
<!--                                <div class="text-3xl text-white">{{global.total.recovered| numeralFormat}}</div>-->
<!--                            </div>-->
<!--                        </div>-->


<!--                    </div>-->
                    <div class="overflow-hidden bg-slab rounded m-4 flex flex-col items-start h-full p-4 relative">
                        <div class="">
                            <div class="tracking-tight font-bold">Countries and states <br>({{countries.length}} total)</div>
                            <div class="text-xs text-right">Sorting by {{sort_stats.key}} {{sort_stats.order}}</div>
                            <div class="flex font-bold py-2 text-xs items-center">
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
                                    :country_key="key"
                                    :compare="compare"
                                />

                            </simplebar>
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
                <div class="m-4 ml-0 w-full overflow-hidden relative">
                    <div class="bg-slab rounded absolute top-0 right-0 bottom-0 left-0 flex-1 flex-col p-4">
                        <div class="absolute top-0 right-0 left-0 h-28 p-4">
                            <div class="text-2xl font-bold mb-2">Compare statistics</div>
                            <div class="text-sm font-bold flex items-center">
                                <!--                                <div @click="ui.content.selectedTab = 'summary'" class="cursor-pointer text-lightslab mr-2 py-2 px-4 pl-0 border-b-4 hover:text-heading" :class="ui.content.selectedTab == 'summary' ? 'border-hoverslab text-heading' : 'border-slab'">Summary</div>-->
                                <!--                                <div @click="ui.content.selectedTab = 'timeline'" class="cursor-pointer text-lightslab mr-2 py-2 px-4 pl-0 border-b-4 hover:text-heading" :class="ui.content.selectedTab == 'timeline' ? 'border-hoverslab text-heading' : 'border-slab'">Timeline</div>-->
                                <router-link to="/comparison/daily/" class="cursor-pointer text-lightslab mr-2 py-2 px-4 pl-0 border-b-4 hover:text-heading" :class="view == 'daily' ? 'border-hoverslab text-heading' : 'border-slab'">Daily breakdown</router-link>
                                <router-link to="/comparison/charts/" class="cursor-pointer text-lightslab mr-2 py-2 px-4 pl-0 border-b-4 hover:text-heading" :class="view == 'charts' ? 'border-hoverslab text-heading' : 'border-slab'">Charts</router-link>
                            </div>
                        </div>
                        <div class="absolute top-0 right-0 bottom-0 left-0 mt-28 p-4">

                            <!--                                <div class="" v-show="ui.content.selectedTab == 'summary'">Summary</div>-->
                            <!--                                <div class="" v-show="ui.content.selectedTab == 'timeline'">Timeline</div>-->
                            <div class="h-full relative" v-show="view == 'daily'">
                                <div class="text-xs flex items-center justify-start">
                                    <div v-for="(country,key,index) in compare">
                                        <div @click="selectedCompareTab = key" class="w-48 cursor-pointer rounded rounded-b-none py-2 px-4 mx-1 whitespace-no-wrap overflow-hidden truncate ..." :class="selectedCompareTab == key ? 'bg-hoverslab' : 'bg-slab-primary'">
                                            {{compare.length > 0 && country[2] ? country[2] + ' - ' : ''}}
                                            {{compare.length > 0 ? country[1] : '(none)'}}
                                        </div>
                                    </div>
                                </div>
                                <div v-if="compare.length == 0">
                                    Select a country or state to begin comparing.
                                </div>
                                <div v-else class="absolute top-0 right-0 bottom-0 left-0 mt-8 bg-hoverslab rounded">
                                    <div v-if="compare.length > 0" v-for="(row,key,index) in compare" class="">
                                        <div class="h-full" :class="selectedCompareTab != key ? 'hidden' : ''">
                                            <Daily
                                                v-on:remove="removeCompare"
                                                :data="getComparisonData()[key]"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="h-full relative" v-show="view == 'charts'">
                                <StatsChart :data="comparisonDataset" :full="true" />
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
    import LineChart from "../components/charts/LineChart";
    import 'simplebar/dist/simplebar.min.css';
    import Daily from "../components/Daily";
    import ComparisonChart from "../components/ComparisonChart";
    import StatsChart from "../components/StatsChart";
    import CountryStateItem from "../components/CountryStateItem";
    import moment from 'moment'
    import Single from "./Single";
    import Map from '../components/Map';

    export default {
        name: "Comparison",
        components:{
            simplebar,
            LineChart,
            Daily,
            ComparisonChart,
            CountryStateItem,
            Single,
            StatsChart,
            Map,
        },
        props: [
            'database',
        ],
        created(){
            this.compare = this.database.processed.compare;
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
                'compare' : [],
                'comparison' : [],

                'selectedCompareTab' : 1,
                'show_countries': true,
                'ui' : {
                    'content' : {
                        'selectedTab' : 'daily'
                    }
                }
            }
        },
        methods:{

            getGlobalDayNotes(date)
            {
                var data = [];
                for(var x in this.globalDataset[0].annotations)
                {
                    if (this.globalDataset[0].annotations[x].date == date)
                    {
                        data.push(this.globalDataset[0].annotations[x]);
                    }
                }
                return data;
            },
            getSortedCountries(field,order,limit)
            {
                var sort = {key: field, order: order};
                var data = _.cloneDeep(this.countries);
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
                    console.log('skipped the assembly, good job!');
                    return row;
                }

                const arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length;
                row = {
                    name: name ? name : this.getCompareName(source),
                    daily: (daily ? daily : this.getDaily(source)),
                    delta: [],
                    growth: [],
                    average: [],
                    growthFactor: [],
                    annotations: [],
                }

                var count = 0;
                var previous = {};

                for(var y in row.daily)
                {
                    if (count == 0)
                    {
                        row.delta[y] = row.daily[y];
                        previous = row.daily[y];
                        count++;
                        continue;
                    }

                    row.delta[y] = {
                        date: row.daily[y].date,
                        confirmed: parseInt(row.daily[y].confirmed) - parseInt(previous.confirmed),
                        deaths: parseInt(row.daily[y].deaths) - parseInt(previous.deaths),
                        recovered: parseInt(row.daily[y].recovered) - parseInt(previous.recovered),
                        active: parseInt(row.daily[y].confirmed) - parseInt(previous.confirmed) - parseInt(row.daily[y].deaths) - parseInt(previous.deaths) - parseInt(row.daily[y].recovered) - parseInt(previous.recovered),
                    }
                    previous = row.daily[y];
                    count++;
                }
                row.total = previous;

                for(var y in row.delta)
                {
                    row.growth.push(
                        row.delta[y].confirmed
                    )
                }

                for(var y = 0; y < row.growth.length; y++)
                {
                    var avg = 0;
                    if(y < 5)
                    {
                        avg = arrAvg(row.growth.slice(0,y+1));
                    }
                    else
                    {
                        avg = arrAvg(row.growth.slice(y-5,y+1));
                    }
                    row.average.push(avg.toFixed(1));
                }

                for(var y = 0; y < row.average.length; y++)
                {
                    var gf = 0;
                    if(y == 1 || row.average[y-1] == 0)
                    {
                        gf = (row.average[y]/1).toFixed(2);
                    }
                    else
                    {
                        gf = (row.average[y]/row.average[y-1]).toFixed(2);
                    }
                    if(isNaN(gf))
                    {
                        gf = 0;
                    }
                    row.growthFactor.push(gf);
                }

                if(this.raw_annotations)
                {
                    if (this.raw_annotations['All'] && this.raw_annotations['All'].length > 0)
                    {
                        row.annotations = row.annotations.concat(this.raw_annotations['All']);
                    }

                    if (this.raw_annotations[row.name.country])
                    {
                        row.annotations = row.annotations.concat(this.raw_annotations[row.name.country]);
                    }
                }
                var compareName = this.getCompareName(source).full;
                this.$emit('saveProcessedData',row,compareName);
                return row;
            },
            getComparisonData()
            {
                var data = [],
                    row = [];

                if(this.database.processed.compare.length > 0)
                {

                    for(var x in this.database.processed.compare)
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
            findCompare(item)
            {
                var found = false;
                for(var x in this.compare)
                {
                    if(this.compare[x][1] == item[0])
                    {
                        if(this.compare[x][2] == item[1])
                        {
                            found = x;
                            break;
                        }
                    }
                }
                return found;
            },
            removeCompare(item)
            {
                var found = this.findCompare(item);
                if(found)
                {
                    this.compare.splice(found, 1);
                }
                this.$emit('updateCompare',this.compare);
            },
            getDaily(compare)
            {
                if(compare && compare[0])
                {
                    if(!compare[2])
                    {
                        return this.getCountryDaily(compare);
                    }
                    else
                    {
                        return this.getStateDaily(compare);
                    }
                }
                return [];
            },
            getStateDaily(item)
            {
                var country = this.stats[item[0]].name,
                    state = item[2],
                    data = [];

                if(this.states[country])
                {
                    for(var x in this.states[country].states)
                    {

                        var row = this.states[country].states[x];
                        if(x == state)
                        {
                            for(var y in row.daily)
                            {
                                data.push({
                                    'date' : y,
                                    'confirmed' : parseInt(row.daily[y].c),
                                    'deaths' : parseInt(row.daily[y].d),
                                    'recovered' : parseInt(row.daily[y].r),
                                });
                            }
                        }
                    }
                }

                return data;
            },
            getCountryDaily(item){
                var country = item[0],
                    data = [],
                    empty = true;

                if(this.stats[country].daily)
                {
                    for(var x in this.stats[country].daily)
                    {

                        var row = this.stats[country].daily[x];
                        if(empty && row.total.c == 0)
                        {
                            continue;
                        }
                        data.push({
                            'date' : x,
                            'confirmed' : row.total.c,
                            'deaths' : row.total.d,
                            'recovered' : row.total.r
                        });
                    }
                }

                return data;
            },
            getCountryId(country)
            {
                for(var x in this.stats)
                {
                    if (this.stats[x] && this.stats[x].name && this.stats[x].name === country){
                        return x;
                    }
                }
                return null;
            },
            getCompareName(item)
            {
                if(item && item[0])
                {
                    var country = item[1];
                    if(item[2])
                    {
                        return {
                            full: item[2] + ' - ' + country,
                            country: country,
                            state: item[2],
                            country_id: item[0],
                        };
                    }
                    else
                    {
                        return {
                            full: country,
                            country: country,
                            state: '',
                            country_id: item[0],
                        }
                    }
                }
                return '';
            },
            selectCountry(country,state,key){
                if (!key)
                {
                    var key = this.getCountryId(country);
                }
                var key = this.getCountryId(country);

                var find = this.findCompare([country,state]);
                if(find !== false)
                {
                    this.compare.splice(find,1);
                }
                else
                {
                    if(this.compare.length >= this.options.compare_limit)
                    {
                        this.compare.shift();
                    }
                    if(this.compare.length < this.options.compare_limit)
                    {
                        this.compare.push([key,country,state]);
                    }
                }
                if (this.compare.length > 0)
                {
                    this.selectedCompareTab = this.compare.length - 1;
                }
                else
                {
                    this.selectedCompareTab = 0;
                }

                this.$emit('updateCompare',this.compare);
            },
            isSelected(key){
                return false;
            }
        },
        computed: {
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
                else
                {
                    this.ui.content.selectedTab = 'daily';
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
            raw_countries()
            {
                return this.database.raw.raw_countries;
            },
            raw_state_data()
            {
                return this.database.raw.raw_state_data;
            },
            raw_stats()
            {
                return this.database.raw.raw_stats;
            },
            countries(){
                var data = [];

                for(var x in this.raw_countries)
                {
                    var row = this.raw_countries[x];
                    data.push(row);
                }
                return data;
            },
            countries_sorted()
            {
                var sort = this.sort_stats;
                var data = _.cloneDeep(this.countries);
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

            },
            loaded()
            {
                if (this.database && this.database.loading && this.database.loading.countries && this.database.loading.states && this.database.loading.annotations && this.database.loading.global)
                {
                    return true;
                }
                return false;
            },
            stats()
            {
                return this.countries;
            },
            states()
            {
                return this.raw_state_data;
            },
            sorted_stats()
            {
                var sort = this.sort_stats;
                var data = _.cloneDeep(this.countries);
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

            },
            daily()
            {
                if(this.database.processed.compare.length > 1)
                    return this.comparisonDataset;
                else
                    return [];
            },
            comparisonDataset()
            {
                return this.getComparisonData();
            },
            global(){
                var data = {},
                    last_update = '';

                data = _.cloneDeep(this.raw_global);
                for(var x in this.countries)
                {
                    if(last_update.length === 0 || moment(this.countries[x].total.l).format('YYYY-MM-DD') > last_update)
                    {
                        data.last_update = moment(this.countries[x].total.l).format('YYYY-MM-DD HH:mm:ss');
                        last_update = moment(this.countries[x].total.l).format('YYYY-MM-DD');
                    }

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

                for(var x in this.global.daily)
                {
                    var row = this.global.daily[x];
                    daily.push({
                        'date' : x,
                        'confirmed' : row.confirmed,
                        'deaths' : row.deaths,
                        'recovered' : row.recovered
                    });
                }


                data.push(this.assembleDataset(this.global,daily,this.global.name));
                return data;
            }
        }
    }
</script>

<style scoped>

</style>
