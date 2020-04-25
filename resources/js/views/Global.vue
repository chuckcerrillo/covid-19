<template>
    <div>
        <div class="h-full overflow-hidden relative">
            <div class="relative h-full w-full flex flex-col justify-start items-center overflow-y-scroll">
                <a name="top"></a>
                <div class="w-full xl:w-256">
                    <div class="fullhd:hidden text-3xl font-bold tracking-tight text-center mb-4">COVID-19 Tracker</div>
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

                    <div class="fullhd:hidden flex justify-center">
                        <div class="text-2xl max-w-xl text-center text-yellow-400 m-4 mt-8 font-bold">For the full experience, including comparison views and charts, please view this website on a larger screen.</div>
                    </div>

                    <div v-if="loaded" class="relative h-64 md:block mt-12 sm:my-12 md:h-120 xl:h-148">
                        <Map
                            class="w-full xl:rounded-lg overflow-hidden h-full"
                            id="world_map"
                            :enable="true"
                            :data="countries_sorted"
                        />
                    </div>
                    <div v-else class="relative hidden h-64 md:block mt-12 sm:my-12 md:h-120 xl:h-148">
                        <div class="bg-white rounded h-full">Loading map</div>
                    </div>
                </div>

                <div class="bg-slab sm:flex sm:flex-1 py-8 w-full med:w-auto items-center justify-center">
                    <div class="w-full md:w-256">
                        <h2 class="m-2 xl:m-0 font-bold text-3xl tracking-tight mb-8">At a glance...</h2>

                        <div class="lg:flex lg:flex-1 justify-center">
                            <div class="m-2 lg:m-0 lg:w-72">
                                <div class="font-bold tracking-tight my-4">Countries with most confirmed cases</div>
                                <div v-if="loading && loading.countries" class="bg-hoverslab rounded-lg">
                                    <div v-if="row.name != 'Global'" v-for="(row,key,index) in getSortedCountries('confirmed','desc',6)"
                                         class="p-2 lg:p-4 flex items-center justify-between">
                                        <div class="mr-4 lg:ml-8 lg:mr-2 lg:w-8 sm:text-3xl font-bold text-lightlabel">{{(key)}}</div>
                                        <div class="flex lg:block sm:flex-1 lg:flex-none justify-between items-center w-full">
                                            <div class="text-left w-40 text-primary font-bold text-2xl sm:text-3xl sm:w-96 lg:text-sm lg:px-2 lg:w-64">{{row.name}}</div>
                                            <div class="text-right sm:text-left">
                                                <div class="font-bold text-white sm:text-3xl lg:px-2">{{row.total.c | numeralFormat}}</div>
                                                <div v-if="getLastDelta(row.name)" class="px-2 text-xs sm:text-2xl lg:text-sm text-lightlabel">
                                                    +{{getLastDelta(row.name).confirmed|numeralFormat}} (+{{getLastDelta(row.name).confirmedpc |numeralFormat('0.0%')}})
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-else class="p-8 bg-hoverslab rounded-lg">Loading...</div>
                            </div>

                            <div class="m-2 lg:m-0 lg:w-72 lg:ml-2">
                                <div class="font-bold tracking-tight my-4">Countries with most deaths</div>
                                <div v-if="loading && loading.countries" class="bg-hoverslab rounded-lg">
                                    <div v-if="row.name != 'Global'" v-for="(row,key,index) in getSortedCountries('deaths','desc',6)"
                                         class="p-2 lg:p-4 flex items-center justify-between">
                                        <div class="mr-4 lg:ml-8 lg:mr-2 lg:w-8 sm:text-3xl font-bold text-lightlabel">{{(key)}}</div>
                                        <div class="flex lg:block sm:flex-1 lg:flex-none justify-between items-center w-full">
                                            <div class="text-left w-40 text-primary font-bold text-2xl sm:text-3xl sm:w-96 lg:text-sm lg:px-2 lg:w-64">{{row.name}}</div>
                                            <div class="text-right sm:text-left">
                                                <div class="font-bold text-white sm:text-3xl lg:px-2">{{row.total.d | numeralFormat}}</div>
                                                <div v-if="getLastDelta(row.name)" class="px-2 text-xs sm:text-2xl lg:text-sm text-lightlabel">
                                                    +{{getLastDelta(row.name).deaths|numeralFormat}} (+{{getLastDelta(row.name).deathspc |numeralFormat('0.0%')}})
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-else class="p-8 bg-hoverslab rounded-lg">Loading...</div>
                            </div>
                            <div class="m-2 lg:m-0 lg:w-72 lg:ml-2">
                                <div class="font-bold tracking-tight my-4">Countries with most recoveries</div>
                                <div v-if="loading && loading.countries" class="bg-hoverslab rounded-lg">
                                    <div v-if="row.name != 'Global'" v-for="(row,key,index) in getSortedCountries('recovered','desc',6)"
                                         class="p-2 lg:p-4 flex items-center justify-between">
                                        <div class="mr-4 lg:ml-8 lg:mr-2 lg:w-8 sm:text-3xl font-bold text-lightlabel">{{(key)}}</div>
                                        <div class="flex lg:block sm:flex-1 lg:flex-none justify-between items-center w-full">
                                            <div class="text-left w-40 text-primary font-bold text-2xl sm:text-3xl sm:w-96 lg:text-sm lg:px-2 lg:w-64">{{row.name}}</div>
                                            <div class="text-right sm:text-left">
                                                <div class="font-bold text-white sm:text-3xl lg:px-2">{{row.total.r | numeralFormat}}</div>
                                                <div v-if="getLastDelta(row.name)" class="px-2 text-xs sm:text-2xl lg:text-sm text-lightlabel">
                                                    +{{getLastDelta(row.name).recovered|numeralFormat}} (+{{getLastDelta(row.name).recoveredpc|numeralFormat('0.0%')}})
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
                        <div class="sm:block" :class="ui.rankings.view != 'confirmedDelta' ? 'hidden' : ''">
                            <div class="hidden sm:block text-center font-bold">New confirmed cases (total)</div>
                            <div class="m-2 my-4 p-2 bg-slab rounded-lg">
                                <simplebar data-simplebar-auto-hide="true" class="h-100 w-full sm:w-80 pr-2">
                                    <div v-if="rankingsConfirmed && rankingsConfirmed.length > 0">
                                        <div v-for="(row,key) in rankingsConfirmed" class="flex items-center justify-between">
                                            <div class="flex items-center">
                                                <div class="text-hoverslab font-bold py-2">{{key+1}}</div>

                                                <div v-if="row.movement.confirmed == 'up'" class="p-2 pr-4 arrow-up"></div>
                                                <div v-else-if="row.movement.confirmed == 'down'" class="p-2 pr-4 arrow-down"></div>
                                                <div v-else class="p-2 pr-4 equal"></div>

                                                <div class="py-2 font-bold text-sm">{{row.name}}</div>
                                            </div>
                                            <div class="py-2"><span class="font-bold">+{{row.confirmed| numeralFormat}}</span> <span class="text-xs text-lightlabel">({{row.confirmedTotal| numeralFormat}})</span></div>
                                        </div>
                                    </div>
                                </simplebar>
                            </div>
                        </div>
                        <div class="sm:block" :class="ui.rankings.view != 'deathsDelta' ? 'hidden' : ''">
                            <div class="hidden sm:block text-center font-bold">New deaths (total)</div>
                            <div class="m-2 my-4 p-2 bg-slab rounded-lg">
                                <simplebar data-simplebar-auto-hide="true" class="h-100 w-full sm:w-80 pr-2">
                                    <div v-if="rankingsDeaths && rankingsDeaths.length > 0">
                                        <div v-for="(row,key) in rankingsDeaths" class="flex items-center justify-between">
                                            <div class="flex items-center">
                                                <div class="text-hoverslab font-bold py-2">{{key+1}}</div>

                                                <div v-if="row.movement.deaths == 'up'" class="p-2 pr-4 arrow-up"></div>
                                                <div v-else-if="row.movement.deaths == 'down'" class="p-2 pr-4 arrow-down"></div>
                                                <div v-else class="p-2 pr-4 equal"></div>

                                                <div class="py-2 font-bold text-sm">{{row.name}}</div>
                                            </div>
                                            <div class="py-2"><span class="font-bold">+{{row.deaths| numeralFormat}}</span> <span class="text-xs text-lightlabel">({{row.deathsTotal| numeralFormat}})</span></div>
                                        </div>
                                    </div>
                                </simplebar>
                            </div>
                        </div>
                        <div class="sm:block" :class="ui.rankings.view != 'confirmedSurge' ? 'hidden' : ''">
                            <div class="hidden sm:block text-center font-bold">Surge of new cases (total)</div>
                            <div class="m-2 my-4 p-2 bg-slab rounded-lg">
                                <simplebar data-simplebar-auto-hide="true" class="h-100 w-full sm:w-80 pr-2">
                                    <div v-if="rankingsConfirmedSurge && rankingsConfirmedSurge.length > 0">
                                        <div v-for="(row,key) in rankingsConfirmedSurge" class="flex items-center justify-between">
                                            <div class="flex items-center">
                                                <div class="text-hoverslab font-bold py-2">{{key+1}}</div>

                                                <div v-if="row.movement.confirmedSurge == 'up'" class="p-2 pr-4 arrow-up"></div>
                                                <div v-else-if="row.movement.confirmedSurge == 'down'" class="p-2 pr-4 arrow-down"></div>
                                                <div v-else class="p-2 pr-4 equal"></div>

                                                <div class="py-2 font-bold text-sm">{{row.name}}</div>
                                            </div>
                                            <div class="py-2"><span class="font-bold">+{{row.confirmedSurge| numeralFormat('0.00%')}}</span> <span class="text-xs text-lightlabel">({{row.confirmedTotal| numeralFormat}})</span></div>
                                        </div>
                                    </div>
                                </simplebar>
                            </div>
                        </div>
                        <div class="sm:block" :class="ui.rankings.view != 'deathsSurge' ? 'hidden' : ''">
                            <div class="hidden sm:block text-center font-bold">Surge of new deaths (total)</div>
                            <div class="m-2 my-4 p-2 bg-slab rounded-lg">
                                <simplebar data-simplebar-auto-hide="true" class="h-100 w-full sm:w-80 pr-2">
                                    <div v-if="rankingsDeathsSurge && rankingsDeathsSurge.length > 0">
                                        <div v-for="(row,key) in rankingsDeathsSurge" class="flex items-center justify-between">
                                            <div class="flex items-center">
                                                <div class="text-hoverslab font-bold py-2">{{key+1}}</div>

                                                <div v-if="row.movement.deathsSurge == 'up'" class="p-2 pr-4 arrow-up"></div>
                                                <div v-else-if="row.movement.deathsSurge == 'down'" class="p-2 pr-4 arrow-down"></div>
                                                <div v-else class="p-2 pr-4 equal"></div>

                                                <div class="py-2 font-bold text-sm">{{row.name}}</div>
                                            </div>
                                            <div class="py-2"><span class="font-bold">+{{row.deathsSurge| numeralFormat('0.00%')}}</span> <span class="text-xs text-lightlabel">({{row.deathsTotal| numeralFormat}})</span></div>
                                        </div>
                                    </div>
                                </simplebar>
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
                <div class="bg-slab sm:flex py-8 w-full items-center justify-center">
                    <div class="mx-4 sm:w-256 lg:mx-0">
                        <div class="sm:flex items-start my-4 justify-between">
                            <div>The COVID-19 Tracker is a project by <a class="font-bold underline hover:text-lightlabel" href="https://www.makeitsimpler.com.au">Simpler</a>. For feedback, suggestions, and bug reports, please contact feedback@makeitsimpler.com.au or get in touch with us on our socials.</div>
                            <div class="flex w-32 items-end py-4">
                                <a href="https://www.facebook.com/simplerau" class="mr-2"><img src="/img/facebook.png" class="h-8"></a>
                                <a href="https://www.twitter.com/simplerau"><img src="/img/twitter.png" class="h-8"></a>
                            </div>
                        </div>
                        <div class="text-xs text-lightlabel font-italic">The material and information contained on this website is for general information purposes only. You should not rely upon the material or information on the website as a basis for making any business, legal, or any other decisions.</div>
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
                }
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
            rankings(field)
            {
                var data = [];

                for(var x in this.ajax.rankings)
                {
                   if(field == 'deaths' || field == 'confirmed')
                   {
                       data.push(_.clone(this.ajax.rankings[x]));
                   }
                   else if(field == 'confirmedSurge')
                   {
                       if(this.ajax.rankings[x].confirmedTotal >= 100)
                       {
                           data.push(_.clone(this.ajax.rankings[x]));
                       }
                   }
                   else if(field == 'deathsSurge')
                   {
                       if(this.ajax.rankings[x].deathsTotal >= 20)
                       {
                           data.push(_.clone(this.ajax.rankings[x]));
                       }
                   }
                }

                data = data.sort(function (a, b) {
                    if(field == 'confirmedSurge' || field == 'deathsSurge')
                        return parseFloat(a[field]) < parseFloat(b[field]) ? 1 : -1;
                    return parseInt(a[field]) < parseInt(b[field]) ? 1 : -1;
                });

                return data;
            }
        },
        computed: {
            rankingsDeaths()
            {
                return this.rankings('deaths');
            },
            rankingsConfirmed()
            {
                return this.rankings('confirmed');
            },
            rankingsDeathsSurge()
            {
                return this.rankings('deathsSurge');
            },
            rankingsConfirmedSurge()
            {
                return this.rankings('confirmedSurge');
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

                daily.pop();


                data.push(this.assembleDataset(this.global,daily,this.global.name));
                return data;
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
</style>
