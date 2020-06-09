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
                <div class="text-xs text-right mx-2 mb-2">Sorting by {{sort_stats.key}} {{sort_stats.order}}</div>
                <div class="w-full">
                    <div class="flex font-bold py-2 text-xs items-center bg-heading-quaternary text-white">
                        <div class="w-4 p-2 m-1 ml-0"></div>
                        <div class="w-28 cursor-pointer p-2 overflow-hidden" :class="sort_stats.key === 'country' ? 'bg-heading-tertiary' : '' " @click="toggleSort('country')">Country</div>
                        <div v-show="active.indexOf('confirmed') >= 0"class="w-20 cursor-pointer p-2 overflow-hidden" :class="sort_stats.key === 'confirmed' ? 'bg-heading-tertiary' : '' " @click="toggleSort('confirmed')">Confirmed</div>
                        <div v-show="active.indexOf('deaths') >= 0"class="w-20 cursor-pointer p-2 overflow-hidden" :class="sort_stats.key === 'deaths' ? 'bg-heading-tertiary' : '' " @click="toggleSort('deaths')">Deaths</div>
                        <div v-show="active.indexOf('recovered') >= 0"class="w-24 cursor-pointer p-2 overflow-hidden" :class="sort_stats.key === 'recovered' ? 'bg-heading-tertiary' : '' " @click="toggleSort('recovered')">Recovered</div>
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
                <div class="w-full absolute inset-x-0 bottom-0" style="top:4.75rem">
                    <simplebar data-simplebar-auto-hide="false" class="top-0 right-0 bottom-0 left-0" style="position:absolute">
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
            </div>

            <div class="overflow-hidden bg-heading-quaternary p-4 absolute inset-x-0 bottom-0 text-heading">
                <div class="flex justify-between items-center">
                    <div class="xl:text-2xl tracking-tight font-bold">Global tally</div>
                    <div class="text-xs xl:mb-4">as of {{global.last_update}}</div>
                </div>

                <div class="flex font-bold justify-between items-center">
                    <div class="m-2 ml-0 mb-0">
                        <div class="text-sm">Confirmed</div>
                        <div class="text-white">{{global.total.confirmed| numeralFormat}}</div>
                    </div>
                    <div class="m-2 mb-0">
                        <div class="text-sm">Deaths</div>
                        <div class="text-white">{{global.total.deaths| numeralFormat}}</div>
                    </div>
                    <div class="m-2 mr-0 mb-0">
                        <div class="text-sm">Recovered</div>
                        <div class="text-white">{{global.total.recovered| numeralFormat}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import simplebar from 'simplebar-vue';
    import CountryStateItem from "../components/CountryStateItemMobile";
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
        ],
        data(){
            return {
                showSelector: false,
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
            }
        }
    }
</script>

<style scoped>

</style>
