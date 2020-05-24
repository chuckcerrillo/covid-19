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
                <div class="">
                    <div class="flex font-bold py-2 text-xs items-center bg-heading-quaternary text-white">
                        <div class="w-4 p-2 m-1 ml-0"></div>
                        <div class="w-28 cursor-pointer p-2 overflow-hidden" :class="sort_stats.key === 'country' ? 'bg-heading-tertiary' : '' " @click="toggleSort('country')">Country</div>
                        <div class="w-20 cursor-pointer p-2 overflow-hidden" :class="sort_stats.key === 'confirmed' ? 'bg-heading-tertiary' : '' " @click="toggleSort('confirmed')">Confirmed</div>
                        <div class="w-20 cursor-pointer p-2 overflow-hidden" :class="sort_stats.key === 'deaths' ? 'bg-heading-tertiary' : '' " @click="toggleSort('deaths')">Deaths</div>
                        <div class="w-24 cursor-pointer p-2 overflow-hidden" :class="sort_stats.key === 'recovered' ? 'bg-heading-tertiary' : '' " @click="toggleSort('recovered')">Recovered</div>
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
                            :compare="compare"
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
            }
        }
    }
</script>

<style scoped>

</style>
