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
                <div class="mx-4">
                    <div class="flex w-full font-bold py-2">
                        <div class="w-64">Country / Region</div>
                        <div class="w-32">Confirmed</div>
                        <div class="w-32">Deaths</div>
                        <div class="w-32">Recovered</div>
                    </div>
                    <simplebar data-simplebar-auto-hide="false" class="absolute top-0 bottom-0 right-0 left-0 mt-12 mx-4 mb-4 mr-2" style="position:absolute" >
                        <div
                            class="flex p-2 w-full hover:bg-hoverslab"
                            v-for="(row,key,index) in stats"
                            :class="selectedCountry == key ? 'bg-hoverslab' : ''"
                            @click="selectedCountry = key"
                        >
                            <div class="w-64">{{row['country']}}</div>
                            <div class="w-32">{{row['content']['total']['confirmed']}}</div>
                            <div class="w-32">{{row['content']['total']['deaths']}}</div>
                            <div class="w-32">{{row['content']['total']['recovered']}}</div>
                        </div>
                    </simplebar>
                </div>
            </div>

            <div class="m-4 absolute top-0 right-0 overflow-hidden bg-slab rounded" style="left: 690px; bottom: 64px">
                <div class="mx-4">
                    <div class="flex w-full font-bold py-2">
                        <div class="w-32">Date</div>
                        <div class="w-32">Confirmed</div>
                        <div class="w-32">Deaths</div>
                        <div class="w-32">Recovered</div>
                    </div>
                    <simplebar data-simplebar-auto-hide="false" class="absolute top-0 bottom-0 right-0 left-0 mt-12 mx-4 mb-4 mr-2" style="position:absolute" >
                        <div
                            class="flex p-2 w-full hover:bg-hoverslab"
                            v-for="row in daily"
                        >
                            <div class="w-32">{{row['date']}}</div>
                            <div class="w-32">{{row['confirmed']}}</div>
                            <div class="w-32">{{row['deaths']}}</div>
                            <div class="w-32">{{row['recovered']}}</div>
                        </div>
                    </simplebar>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import simplebar from 'simplebar-vue';

    import 'simplebar/dist/simplebar.min.css';
    export default {
        name: "Start",
        components:{
            simplebar
        },
        data()
        {
            return {
                'loading': {
                    'countries' : false,
                    'raw_stats': false,
                },
                'countries': [],
                'raw_stats': [],
                'selectedCountry': 17
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
            getDaily(country){
                var data = [];
                if (this.selectedStats && this.selectedStats.content && this.selectedStats.content.daily)
                {

                    for(var x in this.selectedStats.content.daily)
                    {

                        var row = this.selectedStats.content.daily[x];

                        data.push({
                            'date' : x,
                            'confirmed' : parseInt(row.confirmed),
                            'deaths' : parseInt(row.deaths),
                            'recovered' : parseInt(row.recovered)
                        });

                    }
                }

                return data;
            }
        },
        computed: {
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
            selectedStats() {
                return this.stats[this.selectedCountry];
            },
            daily(){
                var data = [];

                if (this.selectedStats && this.selectedStats.content && this.selectedStats.content.daily)
                {

                    for(var x in this.selectedStats.content.daily)
                    {
                        var row = this.selectedStats.content.daily[x];

                        data.push({
                            'date' : x,
                            'confirmed' : row.confirmed ? parseInt(row.confirmed) : 0,
                            'deaths' : row.deaths ? parseInt(row.deaths) : 0,
                            'recovered' : row.recovered ? parseInt(row.recovered) : 0
                        });

                    }
                }
                return data;
            }
        }
    }
</script>

<style scoped>

</style>
