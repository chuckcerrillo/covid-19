<template>
    <div class="flex flex-col z-30">
        <div class="overflow-hidden bg-heading text-darkslab flex items-center justify-between p-2">
            <div class="flex items-center text-xs">
                <div v-if="countCompare() === 1">{{countCompare()}} country/state selected</div>
                <div v-else-if="countCompare() === 0">No countries selected</div>
                <div v-else>{{countCompare()}} countries/states selected</div>
                <div v-if="countCompare() > 0" class="ml-2 underline" @click="$emit('removeAllCompare')">Remove all</div>
            </div>
            <div class="cursor-pointer bg-darkslab text-heading rounded p-2 text-xs" @click="showSelector = !showSelector">Change selection</div>
        </div>

        <div v-if="showSelector" class="fixed inset-x-0 xl:rounded bg-heading text-darkslab z-30 p-2" style="top:3.5rem; bottom: 4rem;">
            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <div class="tracking-tight font-bold">Countries and states</div>
                    <div class="text-sm ml-2">({{countriesIndex.length}} total)</div>
                </div>
<!--                <div @click="showSelector=false" class="text-xs border border-lightslab bg-hoverslab p-1 px-2 rounded inline-block">Close</div>-->
                <div class="cursor-pointer bg-darkslab text-heading rounded p-2 text-xs" @click="showSelector = false">Close panel</div>
            </div>
            <div class="overflow-hidden rounded flex flex-col items-start absolute inset-x-0 border-b border-hoverslab" style="top: 3rem; bottom: 6.75rem">
                <div class="flex items-center justify-start mb-2 mx-2 text-xs ">
                    <div class="mr-2">Sorting by {{sort_stats.key}} {{sort_stats.order}}</div>
                    <div @click="ui.metrics = true" class="underline">Choose metrics</div>
                </div>
                <div class="w-full">
                    <div class="flex font-bold py-2 text-xs items-center bg-heading-quaternary text-white h-16">
                        <div class="w-10 p-2 m-1 ml-0">
                        </div>
                        <div class="w-4 p-2 m-1 ml-0"></div>
                        <div class="w-28 cursor-pointer p-2 overflow-hidden" :class="sort_stats.key === 'country' ? 'bg-heading-tertiary' : '' " @click="toggleSort('country')">Country</div>
                        <div
                            v-for="metric in active"
                            v-if="active.indexOf(metric) >= 0"
                            class="w-20 cursor-pointer p-2 overflow-hidden"
                            :class="sort_stats.key === metric ? 'bg-heading-tertiary' : '' "
                            @click="toggleSort(metric)"
                        >
                            {{metrics[metric]}}
                        </div>
                    </div>
                </div>
                <div class="w-full absolute inset-x-0 bottom-0" style="top:5.5rem">
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
                <div v-show="ui.metrics" class="bg-heading-secondary absolute inset-0 p-4">
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
                                class="p-2 my-1 border border-lightslab hover:border-white cursor-pointer text-sm"
                                :class="active.indexOf(index) >= 0 ? 'bg-heading text-slab':''"
                                @click="selectMetric(index)"
                            >
                                {{metric}} <div v-if="active.indexOf(index) >= 0" class="inline-block text-xs bg-white text-hoverslab px-1 ml-2" >{{(active.indexOf(index) + 1)}}</div>
                            </div>
                        </div>
                    </simplebar>
                </div>
            </div>

            <div class="overflow-hidden bg-heading-quaternary p-4 absolute inset-x-0 bottom-0 text-heading">
                <div class="flex justify-between items-center">
                    <div class="xl:text-2xl tracking-tight font-bold">Global tally</div>
                    <div class="text-xs xl:mb-4">as of {{global.last_update}}</div>
                </div>

                <div class="flex font-bold justify-between items-center">
                    <div class="m-2 ml-0 mb-0">
                        <div class="text-sm">Confirmed</div>
                        <div class="text-white">{{global.total.c| numeralFormat}}</div>
                    </div>
                    <div class="m-2 mb-0">
                        <div class="text-sm">Deaths</div>
                        <div class="text-white">{{global.total.d| numeralFormat}}</div>
                    </div>
                    <div class="m-2 mr-0 mb-0">
                        <div class="text-sm">Recovered</div>
                        <div class="text-white">{{global.total.r| numeralFormat}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import simplebar from 'simplebar-vue';
    import CountryStateItem from "./CountryStateItemMobile";
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
            'selectCountry',
            'compare',
            'rankings',
        ],
        data(){
            return {
                showSelector: false,
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
                ui: {
                    metrics: false,
                },
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
            countCompare()
            {
                var count = 0;
                for(var x in this.compare)
                {
                    if(this.compare[x])
                    count++;
                }
                return count;
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
            toggleMetrics()
            {
                this.ui.metrics = !this.ui.metrics;
            },
        }
    }
</script>

<style scoped>

</style>
