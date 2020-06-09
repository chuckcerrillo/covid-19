<template>
    <div class="flex flex-col">
        <div class="m-4 mb-0 overflow-hidden bg-lightslab rounded p-4 h-56">
            <div class="text-2xl tracking-tight font-bold">Global tally</div>
            <div class="text-xs mb-4">as of {{global.last_update}}</div>

            <div class="flex font-bold justify-between items-center">
                <div class="m-2 ml-0">
                    <div class="text-sm">Confirmed</div>
                    <div class="text-2xl text-white">{{global.total.confirmed| numeralFormat}}</div>
                </div>
                <div class="m-2">
                    <div class="text-sm">Deaths</div>
                    <div class="text-2xl text-white">{{global.total.deaths| numeralFormat}}</div>
                </div>
                <div class="m-2 mr-0">
                    <div class="text-sm">Recovered</div>
                    <div class="text-2xl text-white">{{global.total.recovered| numeralFormat}}</div>
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
                <div class="flex font-bold py-2 text-xs items-center bg-slab-primary">
                    <div class="w-10 p-2 m-1 ml-0">
                    </div>
                    <div class="w-4 p-2 m-1 ml-0"></div>
                    <div class="w-32 cursor-pointer p-2 overflow-hidden" :class="sort_stats.key === 'country' ? 'bg-hoverslab' : '' " @click="toggleSort('country')">Country / Region</div>
                    <div v-show="active.indexOf('confirmed') >= 0" class="w-20 cursor-pointer p-2 overflow-hidden" :class="sort_stats.key === 'confirmed' ? 'bg-hoverslab' : '' " @click="toggleSort('confirmed')">Confirmed</div>
                    <div v-show="active.indexOf('deaths') >= 0" class="w-20 cursor-pointer p-2 overflow-hidden" :class="sort_stats.key === 'deaths' ? 'bg-hoverslab' : '' " @click="toggleSort('deaths')">Deaths</div>
                    <div v-show="active.indexOf('recovered') >= 0" class="w-20 cursor-pointer p-2 overflow-hidden" :class="sort_stats.key === 'recovered' ? 'bg-hoverslab' : '' " @click="toggleSort('recovered')">Recovered</div>
                    <div v-show="active.indexOf('active') >= 0" class="w-20 cursor-pointer p-2 overflow-hidden" :class="sort_stats.key === 'active' ? 'bg-hoverslab' : '' " @click="toggleSort('active')">Active</div>
                    <div v-show="active.indexOf('confirmedDelta') >= 0" class="w-20 cursor-pointer p-2 overflow-hidden" :class="sort_stats.key === 'confirmedDelta' ? 'bg-hoverslab' : '' " @click="toggleSort('confirmedDelta')">New confirmed</div>
                    <div v-show="active.indexOf('deathsDelta') >= 0" class="w-20 cursor-pointer p-2 overflow-hidden" :class="sort_stats.key === 'deathsDelta' ? 'bg-hoverslab' : '' " @click="toggleSort('deathsDelta')">New deaths</div>
                    <div v-show="active.indexOf('recoveredDelta') >= 0" class="w-20 cursor-pointer p-2 overflow-hidden" :class="sort_stats.key === 'recoveredDelta' ? 'bg-hoverslab' : '' " @click="toggleSort('recoveredDelta')">New recovered</div>
                    <div v-show="active.indexOf('confirmedCapita') >= 0" class="w-20 cursor-pointer p-2 overflow-hidden" :class="sort_stats.key === 'confirmedCapita' ? 'bg-hoverslab' : '' " @click="toggleSort('confirmedCapita')">Confirmed per capita</div>
                    <div v-show="active.indexOf('deathsCapita') >= 0" class="w-20 cursor-pointer p-2 overflow-hidden" :class="sort_stats.key === 'deathsCapita' ? 'bg-hoverslab' : '' " @click="toggleSort('deathsCapita')">Deaths per capita</div>
                    <div v-show="active.indexOf('recoveredCapita') >= 0" class="w-20 cursor-pointer p-2 overflow-hidden" :class="sort_stats.key === 'recoveredCapita' ? 'bg-hoverslab' : '' " @click="toggleSort('recoveredCapita')">Recovered per capita</div>
                    <div v-show="active.indexOf('confirmedAverage') >= 0" class="w-20 cursor-pointer p-2 overflow-hidden" :class="sort_stats.key === 'confirmedAverage' ? 'bg-hoverslab' : '' " @click="toggleSort('confirmedAverage')">Average confirmed</div>
                    <div v-show="active.indexOf('deathsAverage') >= 0" class="w-20 cursor-pointer p-2 overflow-hidden" :class="sort_stats.key === 'deathsAverage' ? 'bg-hoverslab' : '' " @click="toggleSort('deathsAverage')">Average deaths</div>
                    <div v-show="active.indexOf('recoveredAverage') >= 0" class="w-20 cursor-pointer p-2 overflow-hidden" :class="sort_stats.key === 'recoveredAverage' ? 'bg-hoverslab' : '' " @click="toggleSort('recoveredAverage')">Average recovered</div>
                    <div v-show="active.indexOf('growthFactor') >= 0" class="w-20 cursor-pointer p-2 overflow-hidden" :class="sort_stats.key === 'growthFactor' ? 'bg-hoverslab' : '' " @click="toggleSort('growthFactor')">Growth factor</div>
                </div>
            </div>
            <div class="w-full h-full relative">
                <simplebar class="top-0 right-0 bottom-0 left-0" style="position:absolute">
                    <CountryStateItem
                        v-for="(data,key,index) in countries_sorted"
                        v-on:selectCountry="selectCountry"
                        :data="data"
                        :key="key"
                        :country_key="key"
                        :rank="get_rank(data.name.country)"
                        :compare="compare"
                        :fields="active"
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
                            {{metric}}
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
                    'confirmedDelta':'New confirmed cases',
                    'deathsDelta':'New deaths',
                    'recoveredDelta':'New recoveries',
                    'confirmedCapita':'Confirmed per 1M population',
                    'deathsCapita':'Deaths per 1M population',
                    'recoveredCapita':'Recovered per 1M population',
                    'confirmedAverage':'Average confirmed cases',
                    'deathsAverage':'Average deaths',
                    'recoveredAverage':'Average recoveries',
                    'growthFactor':'Growth Factor',
                },
                active: [
                    'confirmed',
                    'deaths',
                    'recovered',
                ]

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
        mounted()
        {
        }
    }
</script>

<style scoped>

</style>
