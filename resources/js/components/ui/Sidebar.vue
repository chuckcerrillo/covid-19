<template>
    <div class="flex flex-col">
        <div class="m-4 mb-0 overflow-hidden bg-lightslab rounded p-4 h-56">
            <div class="text-2xl tracking-tight font-bold">Global tally</div>
            <div class="text-xs mb-4">as of {{global.last_update}}</div>

            <div class="flex font-bold justify-between items-center">
                <div class="m-2 ml-0">
                    <div class="text-sm">Confirmed</div>
                    <div class="text-2xl text-white">{{global.total.c| numeralFormat}}</div>
                </div>
                <div class="m-2">
                    <div class="text-sm">Deaths</div>
                    <div class="text-2xl text-white">{{global.total.d| numeralFormat}}</div>
                </div>
                <div class="m-2 mr-0">
                    <div class="text-sm">Recovered</div>
                    <div class="text-2xl text-white">{{global.total.r| numeralFormat}}</div>
                </div>
            </div>
        </div>
        <div class="overflow-hidden bg-slab rounded m-4 px-2 flex flex-col items-start h-full p-4 relative">
            <div class="w-full">
                <div class="flex flex-1 justify-between px-2">
                    <div class="tracking-tight font-bold">
                        <div>Countries and states</div>
                        <div>({{countriesIndex.length}} total)</div>
                    </div>
                    <div class="text-right">
                        <div
                            @click="toggleMetrics()"
                            class="text-xs p-2 border rounded border-lightslab hover:bg-hoverslab inline-block cursor-pointer"
                        >
                            Choose metrics
                        </div>
                        <div class="my-2 text-xs text-right">Sorting by {{sort_stats.key}} {{sort_stats.order}}</div>
                    </div>
                </div>
                <div class="w-full p-2 relative">
                    <div class="relative">
                        <input class="w-full border p-1 rounded border-lightslab focus:border-heading focus:bg-hoverslab bg-transparent text-xs focus:outline-none text-white placeholder-lightslab focus:placeholder-heading" type="text" name="search-country" placeholder="Search" v-model="searchFilter" />
                        <div @click="searchFilter = ''" v-show="searchFilter.length > 0" class="absolute right-0 inset-y-0 cursor-pointer hover:text-white mr-2 mt-1 text-xs">clear</div>
                    </div>

                </div>
                <div class="flex font-bold py-2 text-xs items-center bg-slab-primary">
                    <div class="w-10 p-2 m-1 ml-0">
                    </div>
                    <div class="w-4 p-2 m-1 ml-0"></div>
                    <div class="w-32 cursor-pointer p-2 overflow-hidden" :class="sort_stats.key === 'country' ? 'bg-hoverslab' : '' " @click="toggleSort('country')">Country / Region</div>
                    <div
                        v-for="metric in active"
                        v-if="active.indexOf(metric) >= 0"
                        class="w-20 cursor-pointer p-2 overflow-hidden"
                        :class="sort_stats.key === metric ? 'bg-hoverslab' : '' "
                        @click="toggleSort(metric)"
                    >
                        {{metrics[metric]}}
                    </div>
                </div>
            </div>
            <div class="w-full border border-heading" v-show="countries_favourite.length > 0">
                <CountryStateItem
                    v-for="(data,key,index) in countries_favourite"
                    v-on:selectCountry="selectCountry"
                    :data="data"
                    :key="key + '-faved'"
                    :country_key="key"
                    :rank="get_rank(data.name.country)"
                    :compare="compare"
                    :fields="active"
                    :metrics="metrics"
                    :favourite="true"
                    :settings="{dashboard:false}"
                />
            </div>
            <div class="w-full h-full relative">
                <simplebar class="top-0 right-0 bottom-0 left-0" style="position:absolute">


                    <CountryStateItem
                        v-for="(data,key,index) in countries_not_favourite"
                        v-on:selectCountry="selectCountry"
                        :data="data"
                        :key="key"
                        :country_key="key"
                        :rank="get_rank(data.name.country)"
                        :compare="compare"
                        :fields="active"
                        :metrics="metrics"
                        :favourite="false"
                        :settings="{dashboard:false}"
                    />
                </simplebar>
            </div>
            <div v-show="ui.metrics" class="bg-hoverslab absolute inset-0 p-4">
                <div class="flex flex-1 justify-between">
                    <div>
                        <div class="tracking-tight font-bold">
                            Displayed metrics
                        </div>
                        <div class="text-xs">Choose up to 3 metrics</div>
                    </div>
                    <div class="text-right">
                        <div
                            @click="toggleMetrics()"
                            class="text-xs p-2 border rounded border-lightslab hover:bg-lightslab inline-block cursor-pointer"
                        >
                            Back
                        </div>
                    </div>
                </div>
                <simplebar class="inset-x-0 bottom-0 top-4 m-2" style="position:absolute;">
                    <div class="">
                        <div
                            v-for="(metric,index) in metrics"
                            class="p-2 my-1 rounded border border-lightslab hover:border-white cursor-pointer text-sm"
                            :class="active.indexOf(index) >= 0 ? 'bg-heading text-slab':''"
                            @click="selectMetric(index)"
                        >
                            {{metric}} <div v-if="active.indexOf(index) >= 0" class="inline-block text-xs bg-white text-hoverslab px-1 ml-2" >{{(active.indexOf(index) + 1)}}</div>
                        </div>
                    </div>
                </simplebar>
            </div>
        </div>
    </div>
</template>

<script>
    import simplebar from 'simplebar-vue';
    import CountryStateItem from "./CountryStateItem";
    import moment from 'moment'
    export default {
        name: "Sidebar",
        components:
        {
            simplebar,
            CountryStateItem,
        },
        props: [
            'global',
            'sort_stats',
            'countriesIndex',
            'countries_sorted',
            'countries_states',
            'selectCountry',
            'compare',
            'rankings',
            'events',
        ],
        data(){
            return {
                ui: {
                    metrics: false,
                },
                metrics: {
                    'confirmed':'Confirmed cases',
                    'deaths':'Deaths',
                    'recovered':'Recovered',
                    'active':'Active cases',
                    'confirmedDelta':'New confirmed',
                    'deathsDelta':'New deaths',
                    'recoveredDelta':'New recoveries',
                    'confirmedCapita':'Confirmed per capita',
                    'deathsCapita':'Deaths per capita',
                    'recoveredCapita':'Recovered per capita',
                    'activeCapita':'Active per 1M population',
                    'confirmedAverage':'Average confirmed',
                    'deathsAverage':'Average deaths',
                    'recoveredAverage':'Average recovered',
                    'deathsRate':'Death rate',
                    'recoveredRate':'Recovery rate',
                    'growthFactor':'Growth Factor',
                    'population':'Population',
                },
                active: [
                    'confirmed',
                    'deaths',
                    'recovered',
                ],
                searchFilter: '',
            }
        },
        methods:
        {
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
            toggleMetrics()
            {
                this.ui.metrics = !this.ui.metrics;
            },
            selectMetric(index)
            {
                if(this.active.indexOf(index) >= 0)
                {
                    this.active.splice(this.active.indexOf(index),1);
                }
                else
                {
                    if(this.active.length < 3)
                    {
                        this.active.push(index);
                    }
                }
            },
            get_rank(country)
            {
                if(country)
                {
                    if(this.rankings && this.rankings.positions[this.sort_stats.key])
                    {
                        return this.rankings.positions[this.sort_stats.key][country];
                    }
                }
                return false;
            }
        },
        computed:
        {
            countries_favourite()
            {
                let temp = this.events.updateFavourites;
                let data = localStorage.getItem('favourites');
                let favourites = [];
                let regexp = new RegExp(this.searchFilter,'i');

                if (data && data.length > 2)
                {
                    let saved_favourites = JSON.parse(data);
                    for(let x in saved_favourites)
                    {
                        for(let y in this.countries_sorted)
                        {
                            if(this.countries_sorted[y].name.country === saved_favourites[x].country)
                            {
                                // search pattern not matched
                                if(this.searchFilter && this.searchFilter.length > 0 && !regexp.test(this.countries_sorted[y].name.country))
                                {
                                    continue;
                                }
                                favourites.push(_.cloneDeep(this.countries_sorted[y]));
                            }
                        }
                    }
                }
                return favourites;
            },
            countries_not_favourite()
            {
                let favourites = this.countries_favourite;
                let found = false;
                let data = [];
                let regexp = new RegExp(this.searchFilter,'i');

                for(let x in this.countries_sorted)
                {
                    for(let y in favourites)
                    {
                        if(this.countries_sorted[x].id === favourites[y].id)
                        {
                            found = true;
                            break;
                        }
                    }

                    if(found === true)
                    {
                        found = false;
                        continue;
                    }

                    // search pattern not matched
                    if(this.searchFilter && this.searchFilter.length > 0 && !regexp.test(this.countries_sorted[x].name.country))
                    {
                        continue;
                    }
                    data.push(_.cloneDeep(this.countries_sorted[x]));
                }
                return data;
            }
        },
        mounted()
        {
        },
    }
</script>

<style scoped>

</style>
