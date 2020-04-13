<template>
    <div>
        <div v-if="!loaded">Loading data</div>
        <div v-else class="flex flex-1 h-screen overflow-y-auto relative">
            <div class="w-116 relative">
                <div class="m-4 absolute left-0 top-0 w-full overflow-hidden bg-lightslab rounded h-48 z-10 p-4">
                    <div class="text-2xl tracking-tight font-bold">Global tally</div>
                    <div class="text-xs mb-4">as of {{global.last_update}}</div>

                    <div class="flex font-bold justify-between items-center">
                        <div class="m-2">
                            <div class="text-sm">Confirmed</div>
                            <div class="text-3xl text-white">{{global.confirmed}}</div>
                        </div>
                        <div class="m-2">
                            <div class="text-sm">Deaths</div>
                            <div class="text-3xl text-white">{{global.deaths}}</div>
                        </div>
                        <div class="m-2">
                            <div class="text-sm">Recovered</div>
                            <div class="text-3xl text-white">{{global.recovered}}</div>
                        </div>
                    </div>


                </div>
                <div class="w-full m-4 absolute left-0 overflow-hidden bg-slab rounded p-2" style="top: 13rem; bottom: 64px">
                    <div v-if="show_countries" class="mx-2 pt-2">
                        <div class="text-2xl tracking-tight font-bold">Countries and states ({{countries.length}} total)</div>
                        <div class="text-xs text-right">Sorting by {{sort_stats.key}} {{sort_stats.order}}</div>
                        <div class="flex font-bold py-2 text-xs items-center">
                            <div class="w-4 p-2 m-1 ml-0"></div>
                            <div class="w-32 cursor-pointer p-2 m-1 overflow-hidden" :class="sort_stats.key == 'country' ? 'bg-hoverslab' : '' " @click="toggleSort('country')">Country / Region</div>
                            <div class="w-18 cursor-pointer p-2 m-1 overflow-hidden" :class="sort_stats.key == 'confirmed' ? 'bg-hoverslab' : '' " @click="toggleSort('confirmed')">Confirmed</div>
                            <div class="w-18 cursor-pointer p-2 m-1 overflow-hidden" :class="sort_stats.key == 'deaths' ? 'bg-hoverslab' : '' " @click="toggleSort('deaths')">Deaths</div>
                            <div class="w-18 cursor-pointer p-2 m-1 overflow-hidden" :class="sort_stats.key == 'recovered' ? 'bg-hoverslab' : '' " @click="toggleSort('recovered')">Recovered</div>
                        </div>
                        <simplebar data-simplebar-auto-hide="false" class="absolute bottom-0 right-0 left-0 mx-4 mb-4 mr-2 ml-2" style="position:absolute; top: 120px">
                            <CountryStateItem
                                v-for="(data,key,index) in countries_sorted"
                                v-on:selectCountry="selectCountry"
                                :data="data"
                                :country_key="key"
                            />

                        </simplebar>
                    </div>
                    <div v-else class="mx-4 pt-2">
                        <div class="text-xs text-right">Sorting by {{sort_stats.key}} {{sort_stats.order}}</div>
                        <div class="flex font-bold py-2 text-sm items-center">
                            <div class="w-56 cursor-pointer p-2 m-1" :class="sort_stats.key == 'country' ? 'bg-hoverslab' : '' " @click="toggleSort('country')">Country / Region ({{stats.length}} total)</div>
                            <div class="w-20 cursor-pointer p-2 m-1" :class="sort_stats.key == 'confirmed' ? 'bg-hoverslab' : '' " @click="toggleSort('confirmed')">Confirmed</div>
                            <div class="w-20 cursor-pointer p-2 m-1" :class="sort_stats.key == 'deaths' ? 'bg-hoverslab' : '' " @click="toggleSort('deaths')">Deaths</div>
                            <div class="w-20 cursor-pointer p-2 m-1" :class="sort_stats.key == 'recovered' ? 'bg-hoverslab' : '' " @click="toggleSort('recovered')">Recovered</div>
                        </div>
                        <simplebar data-simplebar-auto-hide="false" class="absolute top-0 bottom-0 right-0 left-0 mt-20 mx-4 mb-4 mr-2" style="position:absolute" >
<!--                            <div-->
<!--                                class="flex hover:bg-lightslab cursor-pointer text-sm"-->
<!--                                v-for="(row,key,index) in stats"-->
<!--                                :class="isSelected(key) ? 'bg-hoverslab' : ''"-->
<!--                                @click="selectCountry(row['country'])"-->
<!--                            >-->
<!--                                <div class="w-56 px-2 m-1">{{row['country']}}</div>-->
<!--                                <div class="w-24 px-2 m-1">{{row['content']['total']['c']}}</div>-->
<!--                                <div class="w-20 px-2 m-1">{{row['content']['total']['d']}}</div>-->
<!--                                <div class="w-20 px-2 m-1">{{row['content']['total']['r']}}</div>-->
<!--                            </div>-->
                        </simplebar>
                    </div>
                </div>
            </div>
            <div class="m-4 absolute top-0 right-0 overflow-hidden bg-slab rounded" style="left: 480px; bottom: 64px">
                <div class="p-4">
                <h1 @click="getComparisonData()" class="font-bold">Compare country stats</h1>
                <p class="text-xs">Select up to three countries from the left to compare.</p>
                </div>
                <div class="mx-4 h-full">
                    <div class="flex w-full absolute left-0 right-0 px-2" style="bottom: 40%; top: 70px;">
                        <div class="rounded bg-hoverslab m-2 w-1/3 relative">
                            <div v-if="compare.length > 0">
                                <Daily
                                    v-on:remove="removeCompare"
                                    :name="stats[compare[0][0]].name"
                                    :data="compare1"
                                    :country="compare[0][0]"
                                    :state="compare[0][1]"
                                />
                            </div>
                            <div v-else class="flex items-center justify-center h-full text-2xl text-gray-200">
                                <div>Select a country/state to compare</div>
                            </div>
                        </div>
                        <div class="rounded bg-hoverslab m-2 w-1/3 relative">
                            <div v-if="compare.length > 1">
                                <Daily
                                    v-on:remove="removeCompare"
                                    :name="stats[compare[1][0]].name"
                                    :data="compare2"
                                    :country="parseInt(compare[1][0])"
                                    :state="compare[1][1]"
                                />
                            </div>
                            <div v-else class="flex items-center justify-center h-full text-2xl text-gray-200">
                                <div>Select a country/state to compare</div>
                            </div>
                        </div>
                        <div class="rounded bg-hoverslab m-2 w-1/3 relative">
                            <div v-if="compare.length > 2">
                                <Daily
                                    v-on:remove="removeCompare"
                                    :name="stats[compare[2][0]].name"
                                    :data="compare3"
                                    :country="compare[2][0]"
                                    :state="compare[2][1]"
                                />
                            </div>
                            <div v-else class="flex items-center justify-center h-full text-2xl text-gray-200">
                                <div>Select a country/state to compare</div>
                            </div>
                        </div>
                    </div>
                    <Comparison class="absolute left-0 right-0 bottom-0 m-4 mt-0" style="top: 60%;"
                                :data="comparisonDataset"
                    />
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
    import Comparison from "./Comparison";
    import CountryStateItem from "../components/CountryStateItem";
    import moment from 'moment'

    export default {
        name: "Start",
        components:{
            simplebar,
            LineChart,
            Daily,
            Comparison,
            CountryStateItem,
        },
        data()
        {
            return {
                'loading': {
                    'countries' : false,
                    'states' : false,
                    'annotations' : false,
                },
                'sort_stats' : {
                    'key' : 'country',
                    'order' : 'asc',
                },
                'compare' : [],
                'comparison' : [],
                'raw_countries': [],
                'raw_state_data': [],
                'raw_stats': [],
                'selectedCountry': 2,
                'show_countries': true
            }
        },
        mounted()
        {
            axios.get('/api/stats/countries')
                .then(res => {
                    this.raw_countries = res.data;
                    this.loading.countries = true;
                })
                .catch(error => {

                });

            axios.get('/api/stats/states')
                .then(res => {
                    this.raw_state_data = res.data;
                    this.loading.states = true;
                })
                .catch(error => {

                });

            axios.get('/api/stats/annotations')
                .then(res => {
                    this.raw_annotations = res.data;
                    this.loading.annotations = true;
                })
                .catch(error => {

                });
        },
        methods:{
            getComparisonData()
            {
                const arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length;
                var data = [],
                    row = [];

                if(this.compare.length > 0)
                {

                    for(var x in this.compare)
                    {
                        row = {
                            name: this.getCompareName(this.compare[x]),
                            daily: this.getDaily(this.compare[x]),
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

                        row.annotations = this.raw_annotations[row.name.country];

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
                    if(this.compare[x][0] == item[0])
                    {
                        if(this.compare[x][1] == item[1])
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
            },
            getDaily(compare)
            {
                if(compare && compare[0])
                {
                    if(!compare[1])
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
                    state = item[1],
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
                    var country = this.stats[item[0]].name;
                    if(item[1])
                    {
                        return {
                            full: item[1] + ' - ' + country,
                            country: country,
                            state: item[1],
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

            selectCompare(item){
                if(this.comparison.length < 3)
                {

                }
            },
            selectCountry(country,state){

                var key = this.getCountryId(country);

                if(this.compare.length < 3)
                {
                    if(!this.findCompare([key,state]))
                    {
                        this.compare.push([key,state]);
                    }
                }
            },
            isSelected(key){
                return false;
            }
        },
        computed: {
            compare1(){
                if(this.compare.length > 0)
                {
                    return this.getComparisonData()[0];
                }
                return [];
            },
            compare2(){
                if(this.compare.length > 1)
                {
                    return this.getComparisonData()[1];
                }
                return [];
            },
            compare3(){
                if(this.compare.length > 2)
                {
                    return this.getComparisonData()[2];
                }
                return [];
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
                if (this.loading.countries && this.loading.states && this.loading.annotations)
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
            selectedStats()
            {
                return this.stats[this.selectedCountry];
            },
            daily()
            {
                if(this.compare.length > 1)
                    return this.comparisonDataset;
                else
                    return this.getDaily(this.selectedStats);
            },
            comparisonDataset()
            {
                return this.getComparisonData();
            },
            global(){
                var data = {
                        confirmed: 0,
                        deaths: 0,
                        recovered: 0,
                        last_update: '',
                    },
                    last_update = '';
                for(var x in this.countries)
                {
                    data.confirmed += parseInt(this.countries[x].total.c);
                    data.deaths += parseInt(this.countries[x].total.d);
                    data.recovered += parseInt(this.countries[x].total.r);

                    if(last_update.length === 0 || moment(this.countries[x].total.l).format('YYYY-MM-DD') > last_update)
                    {
                        data.last_update = moment(this.countries[x].total.l).format('YYYY-MM-DD HH:mm:ss');
                        last_update = moment(this.countries[x].total.l).format('YYYY-MM-DD');
                    }

                }
                return data;
            }
        }
    }
</script>

<style scoped>

</style>
