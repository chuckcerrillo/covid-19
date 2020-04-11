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
                <h1 class="font-bold">Compare country stats</h1>
                <p class="text-xs">Select up to three countries from the left to compare.</p>
                </div>
                <div class="mx-4 h-full">
                    <div class="flex w-full absolute left-0 right-0 px-2" style="bottom: 40%; top: 70px;">
                        <div class="rounded bg-hoverslab m-2 w-1/3 relative">
                            <div v-if="compare.length > 0">
                                <Daily
                                    v-on:remove="removeCompare"
                                    :name="stats[compare[0][0]].country"
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
                                    :name="stats[compare[1][0]].country"
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
                                    :name="stats[compare[2][0]].country"
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
                    <div class="absolute left-0 right-0 bottom-0 m-4 mt-0" style="top: 60%;">
                        <div class="flex">
                            <div class="bg-hoverslab px-2 py-1 rounded m-1">Chronological</div>
                            <div class="text-lightslab border border-hoverslab px-2 py-1 rounded m-1">From 100 cases</div>
                            <div class="text-lightslab border border-hoverslab px-2 py-1 rounded m-1">Delta</div>
                        </div>
                        <LineChart :data="comparisonDataset" class="bg-hoverslab p-2 absolute rounded left-0 right-0 bottom-0" style="top: 48px;"
                                   :options="{

                                    responsive: true,
                                    maintainAspectRatio: false,
                                    hoverMode: 'index',
                                    stacked: false,
                                    legend: {
                                        labels: {
                                            fontColor: '#d1e8e2'
                                        }
                                    },
                                    scales: {
                                        xAxes: [{
                                            ticks: {
                                                fontColor: '#d1e8e2',
                                            }
                                        }],
                                        yAxes: [{
                                            type: 'logarithmic',
                                            display: true,
                                            position: 'left',
                                            id: 'y-1',
                                            ticks: {
                                                fontColor: '#d1e8e2',
                                                callback: function(tick, index, ticks) {
                                                    return tick.toLocaleString()
                                                }
                                            }
                                        }, {
                                            type: 'logarithmic',
                                            display: true,
                                            position: 'right',
                                            id: 'y-2',

                                            // grid line settings
                                            gridLines: {
                                                drawOnChartArea: false, // only want the grid lines for one axis to show up
                                            },
                                            ticks: {
                                                fontColor: '#d1e8e2',
                                                callback: function(tick, index, ticks) {
                                                    return tick.toLocaleString()
                                                }
                                            }
                                        }, {
                                            type: 'logarithmic',
                                            display: true,
                                            position: 'right',
                                            id: 'y-3',

                                            // grid line settings
                                            gridLines: {
                                                drawOnChartArea: false, // only want the grid lines for one axis to show up
                                            },
                                            ticks: {
                                                fontColor: '#d1e8e2',
                                                callback: function(tick, index, ticks) {
                                                    return tick.toLocaleString()
                                                }
                                            }
                                        }
                                        ],
                                    }
                                }" />
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
                    'raw_stats': false,
                },
                'sort_stats' : {
                    'key' : 'country',
                    'order' : 'asc',
                },
                'compare' : [],
                'comparison' : [],
                'raw_countries': [],
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

            axios.get('/api/stats/full')
                .then(res => {
                    this.raw_stats = res.data;
                    this.loading.raw_stats = true;
                })
                .catch(error => {

                });
        },
        methods:{
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
                        return this.getCountryDaily(this.stats[compare[0]]);
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
                var country = item[0],
                    state = item[1],
                    data = [];
                if(this.stats[country])
                {
                    for(var x in this.stats[country].content.daily)
                    {
                        for(var y in this.stats[country].content.daily[x].state)
                        {
                            if(this.stats[country].content.daily[x].state[y].state == state)
                            {
                                var row = this.stats[country].content.daily[x].state[y]
                                data.push({
                                    'date' : x,
                                    'confirmed' : parseInt(row.c),
                                    'deaths' : parseInt(row.d),
                                    'recovered' : parseInt(row.r)
                                });
                            }
                        }
                    }
                }

                return data;
            },
            getCountryDaily(stats){
                var data = [];
                if (stats && stats.content && stats.content.daily)
                {

                    for(var x in stats.content.daily)
                    {

                        var row = stats.content.daily[x];

                        data.push({
                            'date' : x,
                            'confirmed' : parseInt(row.c),
                            'deaths' : parseInt(row.d),
                            'recovered' : parseInt(row.r)
                        });

                    }
                }

                return data;
            },
            getCountryId(country)
            {
                for(var x in this.stats)
                {
                    if (this.stats[x].country === country){
                        return x;
                    }
                }
                return null;
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
                    return this.getDaily(this.compare[0]);
                }
                return [];
            },
            compare2(){
                if(this.compare.length > 1)
                {
                    return this.getDaily(this.compare[1]);
                }
                return [];
            },
            compare3(){
                if(this.compare.length > 2)
                {
                    return this.getDaily(this.compare[2]);
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
                if (this.loading.countries && this.loading.raw_stats)
                {
                    return true;
                }
                return false;
            },
            stats()
            {
                return this.raw_stats;
            },
            sorted_stats()
            {
                var sort = this.sort_stats;
                return this.raw_stats.sort(function (a, b) {
                    if (sort.key == 'country')
                    {
                        if (sort.order == 'asc')
                            return a.country.toUpperCase() > b.country.toUpperCase() ? 1 : -1;
                        else
                            return a.country.toUpperCase() < b.country.toUpperCase() ? 1 : -1;
                    }

                    else if (sort.key == 'confirmed') {
                        if (sort.order == 'desc')
                            return a.content.total.c < b.content.total.c ? 1 : -1;
                        else
                            return a.content.total.c > b.content.total.c ? 1 : -1;
                    }

                    else if (sort.key == 'deaths') {
                        if (sort.order == 'desc')
                            return a.content.total.d < b.content.total.d ? 1 : -1;
                        else
                            return a.content.total.d > b.content.total.d ? 1 : -1;
                    }

                    else if (sort.key == 'recovered') {
                        if (sort.order == 'desc')
                            return a.content.total.r < b.content.total.r ? 1 : -1;
                        else
                            return a.content.total.r > b.content.total.r ? 1 : -1;
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
            dailyChart()
            {
                var data = {
                    labels: [],
                    datasets: [

                        {
                            type: 'line',
                            label: 'Confirmed',
                            backgroundColor: '#dfd27d',
                            fill: false,
                            data: [],
                            yAxisID: 'y-1'
                        },
                        {
                            type: 'bar',
                            label: 'Deaths',
                            backgroundColor: '#d54242',
                            data: [],
                            yAxisID: 'y-2'
                        },
                        {
                            type: 'bar',
                            label: 'Recovered',
                            backgroundColor: '#14a76c',
                            data: [],
                            yAxisID: 'y-3'
                        },
                    ]
                };

                if (this.daily)
                {

                    for(var x in this.daily)
                    {
                        // Labels
                        data.labels.push(this.daily[x].date);

                        // Confirmed
                        data.datasets[0].data.push(this.daily[x].confirmed);

                        // Deaths
                        data.datasets[1].data.push(this.daily[x].deaths);

                        // Recovered
                        data.datasets[2].data.push(this.daily[x].recovered);
                    }


                }

                return data;

            },
            singleDataset()
            {
                var data = {
                    labels: [],
                    datasets: [

                        {
                            type: 'line',
                            label: 'Confirmed',
                            backgroundColor: '#dfd27d',
                            data: [],
                            yAxisID: 'y-1'
                        },
                        {
                            type: 'bar',
                            label: 'Deaths',
                            backgroundColor: '#d54242',
                            data: [],
                            yAxisID: 'y-2'
                        },
                        {
                            type: 'bar',
                            label: 'Recovered',
                            backgroundColor: '#14a76c',
                            data: [],
                            yAxisID: 'y-3'
                        },
                    ]
                };

                if (this.daily)
                {

                    for(var x in this.daily)
                    {
                        // Labels
                        data.labels.push(this.daily[x].date);

                        // Confirmed
                        data.datasets[0].data.push(this.daily[x].confirmed);

                        // Deaths
                        data.datasets[1].data.push(this.daily[x].deaths);

                        // Recovered
                        data.datasets[2].data.push(this.daily[x].recovered);
                    }


                }

                return data;
            },
            comparisonDataset()
            {
                var data = {
                        labels: [],
                        datasets: [],
                    },
                    key,
                    bgConfirmed = [
                        '#19aade',
                        '#af4bce',
                        '#de542c'
                    ],
                    bgRecovered = [
                        '#1de4bd',
                        '#ea7369',
                        '#eabd3b'
                    ],
                    bgDeaths = [
                        '#c7f9ee',
                        '#f0a58f',
                        '#e7e34e'
                    ]

                if(this.compare.length > 0)
                {
                    var start = '', end = '';

                    // Get start and end dates
                    for(var x in this.compare)
                    {
                        var stats = this.stats[this.compare[x][0]];
                        for(var y in stats.content.daily)
                        {
                            if(start.length === 0 || moment(y).format('YYYY-MM-DD') < start)
                            {
                                start = moment(y).format('YYYY-MM-DD');
                            }

                            if(end.length === 0 || moment(stats.content.daily[y].last_update).format('YYYY-MM-DD') > end)
                            {
                                end = moment(y).format('YYYY-MM-DD');
                            }
                        }
                    }
                    var labels = [];
                    var confirmed = {
                            '0' : [],
                            '1' : [],
                            '2' : [],
                        }
                        ,
                        deaths = {
                            '0' : [],
                            '1' : [],
                            '2' : [],
                        },
                        recovered = {
                            '0' : [],
                            '1' : [],
                            '2' : [],
                        };
                    for(var x = 0; x <= moment(end).diff(moment(start),'days'); x++)
                    {

                        var current_date = _.clone(moment(start).add(x,'days').format('YYYY-MM-DD'))
                        data.labels.push(current_date);
                        for(var y in this.compare)
                        {

                            if(this.getDaily(this.compare[y]))
                            {

                                var found = false;
                                var stats = this.getDaily(this.compare[y]);

                                for(var z in stats)
                                {
                                    var row = stats[z];
                                    if(moment(row.date).format('YYYY-MM-DD') === current_date)
                                    {
                                        confirmed[y].push(row.confirmed);
                                        deaths[y].push(row.deaths);
                                        recovered[y].push(row.recovered);
                                        found = true;
                                    }
                                }

                                // If today's data is missing, use previous day's
                                if (!found)
                                {
                                    if (confirmed[y].length > 0)
                                    {
                                        confirmed[y].push(confirmed[confirmed[y].length]);
                                        deaths[y].push(deaths[deaths[y].length]);
                                        recovered[y].push(recovered[recovered[y].length]);
                                    }
                                    else
                                    {
                                        confirmed[y].push(0);
                                        deaths[y].push(0);
                                        recovered[y].push(0);
                                    }
                                }
                            }
                        }
                    }

                    // Assemble labels
                    for(var x in this.compare)
                    {
                        data.datasets.push(
                            {
                                type: 'line',
                                label: 'Confirmed (' + this.stats[this.compare[x][0]].country + ')',
                                backgroundColor: bgConfirmed[x],
                                data: _.cloneDeep(confirmed[x]),
                                yAxisID: 'y-1'
                            },
                            {
                                type: 'bar',
                                label: 'Deaths (' + this.stats[this.compare[x][0]].country + ')',
                                backgroundColor: bgDeaths[x],
                                data: _.cloneDeep(deaths[x]),
                                yAxisID: 'y-2'
                            },
                            {
                                type: 'bar',
                                label: 'Recovered (' + this.stats[this.compare[x][0]].country + ')',
                                backgroundColor: bgRecovered[x],
                                data: _.cloneDeep(recovered[x]),
                                yAxisID: 'y-3'
                            }
                        );
                    }
                }
                return data;
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
