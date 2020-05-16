<template>
    <div class="h-full relative flex flex-1">
        <keep-alive>
            <simplebar data-simplebar-auto-hide="true" class="h-full w-full">
                <div class="xl:flex items-start">
                    <div class="w-full h-64 md:h-120 xl:h-148 wqhd:h-200">
<!--                        {{database.processed.dataset['Australia']}}-->
<!--                        <div v-if="ajax.rankings && ajax.rankings.confirmedSurge">{{ajax.rankings.confirmedSurge}}</div>-->
                        <keep-alive>
                            <Map
                                class="w-full xl:rounded-lg overflow-hidden h-full"
                                id="world_map"
                                :enable="true"
                                :data="countries_sorted"
                                :rankings="ajax.rankings"
                                :layers="layers"
                                :settings="{interactive:true,zoom:1}"
                            />
                        </keep-alive>
                        <!--                                                <div class="mt-4 flex">-->
                        <!--                                                    <div @click="ui.dashboard.table = 'daily'" class="p-2 mr-4 text-sm rounded cursor-pointer hover:bg-lightslab" :class="ui.dashboard.table == 'daily' ? 'border border-heading bg-lightslab':''">Daily stats</div>-->
                        <!--                                                    <div @click="ui.dashboard.table = 'countries'" class="p-2 mr-4 text-sm rounded cursor-pointer hover:bg-lightslab" :class="ui.dashboard.table == 'countries' ? 'border border-heading  bg-lightslab':''">Countries</div>-->
                        <!--                                                </div>-->
                        <!--                                                <div class="mt-4 tableforglobaldata relative bg-hoverslab p-2 rounded" v-show="ui.dashboard.table == 'daily'">-->
                        <!--                                                    <Daily-->
                        <!--                                                        :data="getGlobalData()"-->
                        <!--                                                        :settings="{absolute:false, solo:true}"-->
                        <!--                                                    />-->
                        <!--                                                </div>-->
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
                    </div>

                    <div class="w-80 flex-shrink-0 rounded bg-hoverslab p-4 ml-4">
                        <div class="font-bold mb-2">Events</div>
                        <simplebar data-simplebar-auto-hide="true" class="text-sm h-48 md:h-120 xl:h-132 wqhd:h-184" >
                            <!--                                        {{getAnnotations()}}-->
                            <ul>
                                <li v-if="annotations.length == 0" class="text-xs p-4">
                                    Nothing to show here.
                                </li>
                                <li v-for="note in annotations" class="flex text-xs items-start justify-start mr-4" :key="key">
                                    <div class="mr-1 w-20 flex-shrink-0 text-date-slab">{{note.date}}</div>
                                    <div class="w-full">
                                        <span v-if="note.state.length > 0" class="font-bold mr-1">[{{note.state}}]</span>
                                        <span>{{note.notes}}</span>
                                        <span v-if="note.url"><a class="underline hover:text-white" :href="note.url">(source)</a></span>
                                    </div>
                                </li>
                            </ul>
                        </simplebar>
                    </div>
                </div>
                <div class="flex mt-4">
                    <div class="ml-1 rounded text-xs p-2 border cursor-pointer hover:bg-hoverslab hover:text-white" :class="layers && layers.confirmed ? 'border-heading text-white':'text-lightlabel border-lightslab'" @click="layers.confirmed = !layers.confirmed">Total Confirmed Cases</div>
                    <div class="ml-1 rounded text-xs p-2 border cursor-pointer hover:bg-hoverslab hover:text-white" :class="layers && layers.deaths ? 'border-heading text-white':'text-lightlabel border-lightslab'" @click="layers.deaths = !layers.deaths">Total Deaths</div>
                    <div class="ml-1 rounded text-xs p-2 border cursor-pointer hover:bg-hoverslab hover:text-white" :class="layers && layers.recovered ? 'border-heading text-white':'text-lightlabel border-lightslab'" @click="layers.recovered = !layers.recovered">Total Recoveries</div>
                    <div v-if="ajax && ajax.rankings && ajax.rankings.confirmedSurge" class="ml-1 rounded text-xs p-2 border cursor-pointer hover:bg-hoverslab hover:text-white" :class="layers && layers.confirmedSurge ? 'border-heading text-white':'text-lightlabel border-lightslab'" @click="layers.confirmedSurge = !layers.confirmedSurge">Surge of new cases (Top 10)</div>
                </div>
            </simplebar>
        </keep-alive>
    </div>
</template>

<script>
    import simplebar from 'simplebar-vue';
    import Map from '../components/Map'
    export default {
        name: "DashboardView",
        components: {
            Map,
            simplebar,
        },
        props: [
            'annotations',
            'countries_sorted',
            'getDaily',
            'database'
        ],
        data()
        {
            return {
                layers : {
                    confirmed: false,
                    deaths: false,
                    recovered: false,
                    confirmedSurge: false,
                },
                ajax : {
                    rankings: {}
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
        }
    }
</script>

<style scoped>

</style>
