<template>
    <div>
        <div v-if="!loaded">Loading data</div>
        <div v-else class="flex flex-1 h-screen overflow-y-auto relative">
<!--            <div class="w-64 absolute m-4 top-0 left-0 overflow-hidden" style="bottom:64px">-->
<!--                <div class="rounded bg-slab text-sm absolute top-0 left-0 right-0 bottom-0">-->
<!--                    <h1 class="font-bold p-2 m-1">Countries</h1>-->
<!--                    <simplebar data-simplebar-auto-hide="false" class="absolute top-0 bottom-0 right-0 left-0 mt-12 mb-4 mr-2" style="position:absolute" >-->
<!--                        <ul>-->
<!--                            <li v-for="country in countries">-->
<!--                                <router-link-->
<!--                                    to="#"-->
<!--                                    class="px-2 py-1 m-1 hover:bg-base block"-->
<!--                                >{{country.name}}</router-link>-->
<!--                            </li>-->
<!--                        </ul>-->
<!--                    </simplebar>-->
<!--                </div>-->
<!--            </div>-->
<!--            <div class="m-4 absolute top-0 right-0 overflow-hidden bg-slab rounded" style="left: 270px; bottom: 64px">-->
            <div class="m-4 absolute left-0 top-0 overflow-hidden bg-slab rounded" style="bottom: 64px">
                <div class="mx-4 pt-2">
                    <div class="flex font-bold py-2 text-sm">
                        <div class="w-56">Country / Region</div>
                        <div class="w-24">Confirmed</div>
                        <div class="w-24">Deaths</div>
                        <div class="w-24">Recovered</div>
                    </div>
                    <simplebar data-simplebar-auto-hide="false" class="absolute top-0 bottom-0 right-0 left-0 mt-12 mx-4 mb-4 mr-2" style="position:absolute" >
                        <div
                            class="flex p-2 hover:bg-lightslab cursor-pointer text-sm"
                            v-for="(row,key,index) in stats"
                            :class="isSelected(key) ? 'bg-hoverslab' : ''"
                            @click="selectCountry(row['country'])"
                        >
                            <div class="w-56">{{row['country']}}</div>
                            <div class="w-24">{{row['content']['total']['confirmed']}}</div>
                            <div class="w-24">{{row['content']['total']['deaths']}}</div>
                            <div class="w-24">{{row['content']['total']['recovered']}}</div>
                        </div>
                    </simplebar>
                </div>
            </div>
            <div class="m-4 absolute top-0 right-0 overflow-hidden bg-slab rounded" style="left: 560px; bottom: 64px">
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
                                    :name="stats[compare[0]].country"
                                    :data="compare1"
                                    :country="compare[0]"
                                />
                            </div>
                            <div v-else class="flex items-center justify-center h-full text-2xl text-gray-200">
                                <div>Select a country to compare</div>
                            </div>
                        </div>
                        <div class="rounded bg-hoverslab m-2 w-1/3 relative">
                            <div v-if="compare.length > 1">
                                <Daily
                                    v-on:remove="removeCompare"
                                    :name="stats[compare[1]].country"
                                    :data="compare2"
                                    :country="compare[1]"
                                />
                            </div>
                            <div v-else class="flex items-center justify-center h-full text-2xl text-gray-200">
                                <div>Select a country to compare</div>
                            </div>
                        </div>
                        <div class="rounded bg-hoverslab m-2 w-1/3 relative">
                            <div v-if="compare.length > 2">
                                <Daily
                                    v-on:remove="removeCompare"
                                    :name="stats[compare[2]].country"
                                    :data="compare3"
                                    :country="compare[2]"
                                />
                            </div>
                            <div v-else class="flex items-center justify-center h-full text-2xl text-gray-200">
                                <div>Select a country to compare</div>
                            </div>
                        </div>
                    </div>
                    <LineChart :data="dailyChart" class="absolute left-0 right-0 bg-hoverslab m-4 p-2 rounded bottom-0" style="top: 60%;"
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
                                            type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                                            display: true,
                                            position: 'left',
                                            id: 'y-1',
                                            ticks: {
                                                fontColor: '#d1e8e2',
                                            }
                                        }, {
                                            type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                                            display: true,
                                            position: 'right',
                                            id: 'y-2',

                                            // grid line settings
                                            gridLines: {
                                                drawOnChartArea: false, // only want the grid lines for one axis to show up
                                            },
                                            ticks: {
                                                fontColor: '#d1e8e2',
                                            }
                                        }, {
                                            type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                                            display: true,
                                            position: 'right',
                                            id: 'y-3',

                                            // grid line settings
                                            gridLines: {
                                                drawOnChartArea: false, // only want the grid lines for one axis to show up
                                            },
                                            ticks: {
                                                fontColor: '#d1e8e2',
                                            }
                                        }
                                        ],
                                    }
                                }" />
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

    export default {
        name: "Start",
        components:{
            simplebar,
            LineChart,
            Daily,
            Comparison
        },
        data()
        {
            return {
                'loading': {
                    'countries' : false,
                    'raw_stats': false,
                },
                'compare' : [],
                'countries': [],
                'raw_stats': [],
                'selectedCountry': 2
            }
        },
        mounted()
        {
            axios.get('/api/stats')
                .then(res => {
                    this.countries = res.data;
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
            removeCompare(item)
            {
                var index = this.compare.indexOf(item);
                if (index !== -1) this.compare.splice(index, 1);
            },
            getDaily(stats){
                var data = [];
                if (stats && stats.content && stats.content.daily)
                {

                    for(var x in stats.content.daily)
                    {

                        var row = stats.content.daily[x];

                        data.push({
                            'date' : x,
                            'confirmed' : parseInt(row.confirmed),
                            'deaths' : parseInt(row.deaths),
                            'recovered' : parseInt(row.recovered)
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
            selectCountry(country){

                var key = this.getCountryId(country);

                if(this.compare.length < 3)
                {
                    this.compare.push(key);
                }
                this.selectedCountry = key
            },
            isSelected(key){
                return false;
            }
        },
        computed: {
            compare1(){
                if(this.compare.length > 0)
                {
                    return this.getDaily(this.stats[this.compare[0]]);
                }
                return [];
            },
            compare2(){
                if(this.compare.length > 1)
                {
                    return this.getDaily(this.stats[this.compare[1]]);
                }
                return [];
            },
            compare3(){
                if(this.compare.length > 2)
                {
                    return this.getDaily(this.stats[this.compare[2]]);
                }
                return [];
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
                return this.raw_stats.sort(function (a, b) {
                    return a.country > b.country ? 1 : -1;
                });

            },
            selectedStats() {
                return this.stats[this.selectedCountry];
            },
            daily(){
                return this.getDaily(this.selectedStats);
            },
            dailyChart(){
                var data = {
                    labels: [],
                    datasets: [

                        {
                            label: 'Confirmed',
                            backgroundColor: '#dfd27d',
                            data: [],
                            yAxisID: 'y-1'
                        },
                        {
                            label: 'Deaths',
                            backgroundColor: '#d54242',
                            data: [],
                            yAxisID: 'y-2'
                        },
                        {
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

            }
        }
    }
</script>

<style scoped>

</style>
