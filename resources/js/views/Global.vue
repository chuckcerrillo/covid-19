<template>
    <div>
        <div class="h-full overflow-hidden relative">
            <div class="relative h-full w-full flex flex-col justify-start items-center overflow-y-scroll">
                <a name="top"></a>
                <div class="w-full xl:w-256">
                    <div class="xl:hidden text-3xl font-bold tracking-tight text-center mb-4">COVID-19 Tracker</div>
                    <div class="flex-col xl:block justify-center items-center">
                        <div class="p-4 xl:p-0 xl:flex items-center justify-center text-center">
                            <div v-if="loading && loading.global" class="text-5xl xl:mr-4 xl:text-7xl font-bold text-white">{{global.total.active | numeralFormat}}</div>
                            <div v-else class="text-5xl xl:mr-4 xl:text-7xl font-bold text-white"></div>
                            <div>
                                <div class="text-2xl xl:text-3xl font-bold tracking-tight">active cases</div>
                                <div class="text-xs text-lightslab">as of {{global.last_update}}</div>
                            </div>
                        </div>
                        <div class="flex items-start mt-4 xl:mt-0 flex-1 justify-center px-4 xl:px-0">
                            <div class="w-1/3 xl:w-auto xl:mr-8 text-center">
                                <div v-if="loading && loading.global" class="xl:text-3xl font-bold text-white">{{global.total.confirmed| numeralFormat}}</div>
                                <div v-else class="xl:text-3xl font-bold text-white"></div>
                                <div class="font-bold">confirmed cases</div>
                            </div>
                            <div class="w-1/3 xl:w-auto xl:mr-8 text-center">
                                <div v-if="loading && loading.global" class="xl:text-3xl font-bold text-red-400">{{global.total.deaths| numeralFormat}}</div>
                                <div v-else class="xl:text-3xl font-bold text-red-400"></div>
                                <div class="font-bold">deaths</div>
                            </div>
                            <div class="w-1/3 xl:w-auto text-center">
                                <div v-if="loading && loading.global" class="xl:text-3xl font-bold text-green-400">{{global.total.recovered| numeralFormat}}</div>
                                <div v-else class="xl:text-3xl font-bold text-green-400"></div>
                                <div class="font-bold">recoveries</div>
                            </div>
                        </div>

                    </div>

                    <div class="xl:hidden">
                        <p class="text-sm text-yellow-400 m-4">For the full experience, including comparison views and charts, please view this website on a larger screen.</p>
                    </div>

                    <div v-if="loaded" class="hidden xl:block mt-12 h-148">
                        <Map
                            class="w-full rounded-lg overflow-hidden h-full"
                            id="world_map"
                            :enable="true"
                            :data="countries_sorted"
                        />
                    </div>
                    <div v-else class="hidden xl:block mt-12 h-148">
                        <div class="bg-white rounded h-full">Loading map</div>
                    </div>
                </div>

                <div v-if="loaded" class="bg-slab flex flex-1 mt-8 py-8 w-full items-center justify-center">
                    <div class="w-full xl:w-256">
                        <h2 class="m-2 xl:m-0 font-bold text-3xl tracking-tight mb-8">At a glance...</h2>

                        <div class="xl:flex xl:flex-1">
                            <div class="m-2 xl:m-0 xl:w-1/3">
                                <div class="font-bold tracking-tight mb-4">Countries with most cumulative cases</div>
                                <div class="bg-hoverslab rounded-lg">
                                    <div v-for="(row,key,index) in getSortedCountries('confirmed','desc',5)"
                                         class="p-2 xl:p-4 flex items-center justify-center">
                                        <div class="mr-4 xl:mr-0 xl:w-8 xl:text-3xl font-bold text-lightlabel">{{(key+1)}}</div>
                                        <div class="flex xl:block flex-1 xl:flex-none justify-between items-center ">
                                            <div class="text-primary font-bold text-sm xl:px-2 xl:w-64">{{row.name}}</div>
                                            <div class="font-bold text-white xl:text-3xl xl:px-2">{{row.total.c | numeralFormat}}</div>
                                            <div v-if="getLastDelta(row.name)" class="px-2 text-xs text-lightlabel">
                                                +{{getLastDelta(row.name).confirmed|numeralFormat}} (+{{getLastDelta(row.name).confirmedpc|numeralFormat}}%)
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="m-2 xl:m-0 xl:w-1/3 xl:ml-2">
                                <div class="font-bold tracking-tight mb-4">Countries with most deaths</div>
                                <div class="bg-hoverslab rounded-lg">
                                    <div v-for="(row,key,index) in getSortedCountries('deaths','desc',5)"
                                         class="p-2 xl:p-4 flex items-center justify-center">
                                        <div class="mr-4 xl:mr-0 xl:w-8 xl:text-3xl font-bold text-lightlabel">{{(key+1)}}</div>
                                        <div class="flex xl:block flex-1 xl:flex-none justify-between items-center ">
                                            <div class="text-primary font-bold text-sm xl:px-2 xl:w-64">{{row.name}}</div>
                                            <div class="font-bold text-white xl:text-3xl xl:px-2">{{row.total.d | numeralFormat}}</div>
                                            <div v-if="getLastDelta(row.name)" class="px-2 text-xs text-lightlabel">
                                                +{{getLastDelta(row.name).deaths|numeralFormat}} (+{{getLastDelta(row.name).deathspc|numeralFormat}})
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="m-2 xl:m-0 xl:w-1/3 xl:ml-2">
                                <div class="font-bold tracking-tight mb-4">Countries with most recoveries</div>
                                <div class="bg-hoverslab rounded-lg">
                                    <div v-for="(row,key,index) in getSortedCountries('recovered','desc',5)"
                                         class="p-2 xl:p-4 flex items-center justify-center">
                                        <div class="mr-4 xl:mr-0 xl:w-8 xl:text-3xl font-bold text-lightlabel">{{(key+1)}}</div>
                                        <div class="flex xl:block flex-1 xl:flex-none justify-between items-center ">
                                            <div class="text-primary font-bold text-sm xl:px-2 xl:w-64">{{row.name}}</div>
                                            <div class="font-bold text-white xl:text-3xl xl:px-2">{{row.total.r | numeralFormat}}</div>
                                            <div v-if="getLastDelta(row.name)" class="px-2 text-xs text-lightlabel">
                                                +{{getLastDelta(row.name).recovered|numeralFormat}} (+{{getLastDelta(row.name).recoveredpc|numeralFormat}}%)
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div class="hidden bg-slab-primary xl:flex flex-1 pt-8 w-full items-center justify-center">
                    <div class="m-2 xl:m-0 xl:w-256 font-bold text-2xl tracking-tight">
                        Global cases graph
                    </div>
                </div>
                <div class="hidden bg-slab-primary xl:flex flex-1 w-full items-center justify-center pb-8">
                    <div class="w-full xl:w-360">
                        <div v-if="loaded" class="w-full h-128 xl:h-220 relative rounded my-4">
                            <StatsChart class="absolute left-0 right-0 bottom-0 top-0"
                                        :data="globalDataset"
                                        full="true"
                                        :config="
                                            {
                                                controls:
                                                {
                                                    menu : false
                                                }
                                            }
                            " />
                        </div>
                    </div>
                </div>

                <div v-if="loaded" class="bg-slab flex flex-1 w-full items-center justify-center pt-8">
                    <div class="w-256">
                        <h2 class="mb-4 text-2xl font-bold tracking-tight">Global timeline</h2>
                        <div class="flex items-center justify-start mb-4">
                            <div @click="global_options.table = 'daily'" class="p-2 mr-4 text-sm rounded cursor-pointer hover:bg-lightslab" :class="global_options.table == 'daily' ? 'border border-heading bg-lightslab':''">Daily stats</div>
                            <div @click="global_options.table = 'countries'" class="p-2 mr-4 text-sm rounded cursor-pointer hover:bg-lightslab" :class="global_options.table == 'countries' ? 'border border-heading  bg-lightslab':''">Countries</div>
                        </div>

                        <div v-show="global_options.table == 'daily'" class="rounded overflow-hidden">
                            <div class="flex flex-1 items-center justify-start w-full text-xs bg-lightslab">
                                <div class="w-24 font-bold p-2 xl:w-76">Date</div>
                                <div class="xl:hidden font-bold p-2 w-full">Stats</div>
                                <div class="hidden xl:block font-bold p-2 w-36">Confirmed</div>
                                <div class="hidden xl:block font-bold p-2 w-36">Deaths</div>
                                <div class="hidden xl:block font-bold p-2 w-36">Recovered</div>
                                <div class="hidden xl:block font-bold p-2 w-36">Active</div>
                                <div class="hidden xl:block font-bold p-2 w-36">Growth Factor</div>
                            </div>
                            <simplebar data-simplebar-auto-hide="false" class="h-160">
                                <div v-for="(row,key,index) in globalDaily.reverse()">
                                    <div v-if="getGlobalDayNotes(moment(row.date).format('YYYY-MM-DD')).length > 0">
                                        <div v-for="annotation in getGlobalDayNotes(moment(row.date).format('YYYY-MM-DD'))"
                                             class="p-1 my-4 mx-8 text-xs rounded bg-lightslab flex"
                                        >
                                            <div v-if="annotation.state.length > 0" class="font-bold mr-2">{{annotation.state}}</div>
                                            <div>
                                                <div>{{annotation.notes}}</div>
                                                <div v-if="annotation.url" class="flex items-center text-lightslab">
                                                    <div class="mr-1">Source:</div>
                                                    <a class="underline hover:text-white truncate ... inline-block w-64" :href="annotation.url">{{annotation.url}}</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="xl:hidden flex flex-1 items-start text-xs" :class="key % 2 == 0 ? 'bg-slab-primary' : 'bg-slab-secondary'">
                                        <div class="p-2">{{moment(row.date).format('YYYY-MM-DD')}}</div>
                                        <div>
                                            <div :class="key % 2 == 0 ? 'bg-slab-primary' : 'bg-slab-secondary'" class="p-2">
                                                <span class="font-bold">Confirmed</span>
                                                <span class="">{{row.confirmed|numeralFormat}}</span>
                                                <span class="text-red-400" v-if="row.confirmedDelta >= 0">(+{{row.confirmedDelta | numeralFormat}})</span>
                                                <span class="text-green-400" v-else>({{row.confirmedDelta | numeralFormat}})</span>
                                            </div>
                                            <div :class="key % 2 == 0 ? 'bg-slab-primary' : 'bg-slab-secondary'" class="p-2">
                                                <span class="font-bold">Deaths</span>
                                                <span class="">{{row.deaths|numeralFormat}}</span>
                                                <span class="text-red-400" v-if="row.deathsDelta >= 0">(+{{row.deathsDelta | numeralFormat}})</span>
                                                <span class="text-green-400" v-else>({{row.deathsDelta| numeralFormat}})</span>
                                            </div>
                                            <div :class="key % 2 == 0 ? 'bg-slab-primary' : 'bg-slab-secondary'" class="p-2">
                                                <span class="font-bold">Recovered</span>
                                                <span class="">{{row.recovered|numeralFormat}}</span>
                                                <span class="text-green-400" v-if="row.recoveredDelta.recovered >= 0">(+{{row.recoveredDelta| numeralFormat}})</span>
                                                <span class="text-red-400" v-else>({{row.recoveredDelta| numeralFormat}})</span>
                                            </div>
                                            <div :class="key % 2 == 0 ? 'bg-slab-primary' : 'bg-slab-secondary'" class="p-2">
                                                <span class="font-bold">Active</span>
                                                <span class="">{{(row.confirmed - row.deaths - row.recovered) | numeralFormat}}</span>
                                                <span class="text-red-400" v-if="row.activeDelta  >= 0">(+{{row.activeDelta | numeralFormat}})</span>
                                                <span class="text-green-400" v-else>({{row.activeDelta | numeralFormat}})</span>
                                            </div>
                                            <div :class="key % 2 == 0 ? 'bg-slab-primary' : 'bg-slab-secondary'" class="p-2">
                                                <span class="font-bold">Growth factor</span>
                                                <span class="text-red-400" v-if="row.growthFactor > 1">{{row.growthFactor}}</span>
                                                <span class="text-green-400" v-else>{{row.growthFactor}}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        class="xl:flex flex-1 items-center justify-start w-full text-xs hidden"
                                    >
                                        <div :class="key % 2 == 0 ? 'bg-slab-primary' : 'bg-slab-secondary'" class="p-2 w-76">{{moment(row.date).format('YYYY-MM-DD')}}</div>
                                        <div :class="key % 2 == 0 ? 'bg-slab-primary' : 'bg-slab-secondary'" class="p-2 w-36">{{row.confirmed|numeralFormat}}
                                            <span class="text-red-400" v-if="row.confirmedDelta >= 0">(+{{row.confirmedDelta | numeralFormat}})</span>
                                            <span class="text-green-400" v-else>({{row.confirmedDelta | numeralFormat}})</span>
                                        </div>
                                        <div :class="key % 2 == 0 ? 'bg-slab-primary' : 'bg-slab-secondary'" class="p-2 w-36">{{row.deaths|numeralFormat}}
                                            <span class="text-red-400" v-if="row.deathsDelta >= 0">(+{{row.deathsDelta | numeralFormat}})</span>
                                            <span class="text-green-400" v-else>({{row.deathsDelta| numeralFormat}})</span>
                                        </div>
                                        <div :class="key % 2 == 0 ? 'bg-slab-primary' : 'bg-slab-secondary'" class="p-2 w-36">{{row.recovered|numeralFormat}}
                                            <span class="text-green-400" v-if="row.recoveredDelta.recovered >= 0">(+{{row.recoveredDelta| numeralFormat}})</span>
                                            <span class="text-red-400" v-else>({{row.recoveredDelta| numeralFormat}})</span>
                                        </div>
                                        <div :class="key % 2 == 0 ? 'bg-slab-primary' : 'bg-slab-secondary'" class="p-2 w-36">{{(row.confirmed - row.deaths - row.recovered) | numeralFormat}}
                                            <span class="text-red-400" v-if="row.activeDelta  >= 0">(+{{row.activeDelta | numeralFormat}})</span>
                                            <span class="text-green-400" v-else>({{row.activeDelta | numeralFormat}})</span>
                                        </div>
                                        <div :class="key % 2 == 0 ? 'bg-slab-primary' : 'bg-slab-secondary'" class="p-2 w-36">
                                            <span class="text-red-400" v-if="row.growthFactor > 1">{{row.growthFactor}}</span>
                                            <span class="text-green-400" v-else>{{row.growthFactor}}</span>
                                        </div>
                                    </div>
                                </div>
                            </simplebar>
                        </div>

                        <div v-if="loaded" v-show="global_options.table == 'countries'" class="bg-lightslab rounded overflow-hidden">
                            <div class="flex flex-1 items-center justify-start w-full text-xs">
                                <div class="w-32 font-bold p-2 xl:w-112">Name</div>
                                <div class="xl:hidden font-bold p-2 w-full">Stats</div>
                                <div class="hidden xl:block font-bold p-2 w-36">Confirmed</div>
                                <div class="hidden xl:block font-bold p-2 w-36">Deaths</div>
                                <div class="hidden xl:block font-bold p-2 w-36">Recovered</div>
                                <div class="hidden xl:block font-bold p-2 w-36">Active</div>
                            </div>
                            <simplebar data-simplebar-auto-hide="false" class="h-160">
                                <div v-for="(row,key,index) in getSortedCountries('confirmed','desc')">
                                    <div class="xl:hidden flex flex-1 items-start text-xs" :class="key % 2 == 0 ? 'bg-slab-primary' : 'bg-slab-secondary'">
                                        <div :class="key % 2 == 0 ? 'bg-slab-primary' : 'bg-slab-secondary'" class="p-2 w-32">{{row.name}}</div>
                                        <div>
                                            <div class="p-2">
                                                <span class="font-bold">Confirmed</span>
                                                {{row.total.c|numeralFormat}}
                                            </div>
                                            <div class="p-2">
                                                <span class="font-bold">Deaths</span>
                                                {{row.total.d|numeralFormat}}
                                            </div>
                                            <div class="p-2">
                                                <span class="font-bold">Recovered</span>
                                                {{row.total.r|numeralFormat}}
                                            </div>
                                            <div class="p-2">
                                                <span class="font-bold">Active</span>
                                                {{(row.total.c - row.total.d - row.total.r) | numeralFormat}}
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        class="hidden xl:flex flex-1 items-center justify-start w-full text-xs"
                                    >
                                        <div :class="key % 2 == 0 ? 'bg-slab-primary' : 'bg-slab-secondary'" class="p-2 w-112">{{row.name}}</div>
                                        <div :class="key % 2 == 0 ? 'bg-slab-primary' : 'bg-slab-secondary'" class="p-2 w-36">{{row.total.c|numeralFormat}}</div>
                                        <div :class="key % 2 == 0 ? 'bg-slab-primary' : 'bg-slab-secondary'" class="p-2 w-36">{{row.total.d|numeralFormat}}</div>
                                        <div :class="key % 2 == 0 ? 'bg-slab-primary' : 'bg-slab-secondary'" class="p-2 w-36">{{row.total.r|numeralFormat}}</div>
                                        <div :class="key % 2 == 0 ? 'bg-slab-primary' : 'bg-slab-secondary'" class="p-2 w-36">{{(row.total.c - row.total.d - row.total.r) | numeralFormat}}</div>
                                    </div>
                                </div>
                            </simplebar>
                        </div>
                    </div>
                </div>

                <!-- footer -->
                <div class="bg-slab flex flex-1 py-8 w-full items-center justify-center">
                    <div class="w-256">
                        <a href="#top">^ Back to top</a>
                    </div>
                </div>
            </div>
        </div>


        <div v-if="mode == 'trends'" class="flex items-center justify-center m-4 bg-slab rounded absolute top-0 right-0 bottom-0 left-0 text-center" style="bottom: 56px;">
            <div class="p-4">
                <h1>Massive graphs / trends on this section</h1>
                <p>TO-DO</p>
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
            }
        },
        mounted()
        {
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
            getLastDelta(country)
            {
                var data = {
                    'confirmed': 0,
                    'deaths': 0,
                    'recovered': 0,
                }

                if(country)
                {
                    var row = this.database.raw.raw_countries[country];
                    var count = 0, current, previous;
                    for(var x in row.daily)
                    {
                        if(count > 0)
                        {
                            current = row.daily[x].total;
                            if (current.c != previous.c)
                            {
                                data = {
                                    'confirmed' : parseInt(current.c) - parseInt(previous.c),
                                    'confirmedpc' : (parseInt(current.c) - parseInt(previous.c)) / parseInt(previous.c),
                                    'deaths' : parseInt(current.d) - parseInt(previous.d),
                                    'deathspc' : (parseInt(current.d) - parseInt(previous.d)) / parseInt(previous.d),
                                    'recovered' : parseInt(current.r) - parseInt(previous.r),
                                    'recoveredpc' : (parseInt(current.r) - parseInt(previous.r)) / parseInt(previous.r),
                                }
                            }
                        }
                        previous = row.daily[x].total;
                        count++;
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
            assembleDataset(source,daily,name)
            {
                const arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length;
                var row = {
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

                return row;
            },
        },
        computed: {
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
            globalDaily()
            {
                var data = [];
                for(var x in this.globalDataset[0].daily)
                {
                    var row = this.globalDataset[0].daily[x];

                    data.push({
                        date: moment(row.date).format('YYYY-MM-DD'),
                        confirmed: row.confirmed,
                        confirmedDelta: this.globalDataset[0].delta[x].confirmed,
                        deaths: row.deaths,
                        deathsDelta: this.globalDataset[0].delta[x].deaths,
                        recovered: row.recovered,
                        recoveredDelta: this.globalDataset[0].delta[x].recovered,
                        active: parseInt(row.confirmed) - parseInt(row.deaths) - parseInt(row.recovered),
                        activeDelta: parseInt(this.globalDataset[0].delta[x].confirmed) - parseInt(this.globalDataset[0].delta[x].deaths) - parseInt(this.globalDataset[0].delta[x].recovered),
                        growthFactor: this.globalDataset[0].growthFactor[x],
                    });
                }
                return data;
            },
            global(){
                var data = {},
                    last_update = '';

                data = _.cloneDeep(this.raw_global);
                if(data.total && data.total.last_update)
                {
                    data.last_update = data.total.last_update;
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
