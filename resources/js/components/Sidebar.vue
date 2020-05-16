<template>
    <div class="flex flex-col">
        <div class="m-4 mb-0 overflow-hidden bg-lightslab rounded h-56 p-4">
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
        <div class="overflow-hidden bg-slab rounded m-4 flex flex-col items-start h-full p-4 relative">
            <div class="">
                <div class="tracking-tight font-bold">Countries and states <br>({{countriesIndex.length}} total)</div>
                <div class="text-xs text-right">Sorting by {{sort_stats.key}} {{sort_stats.order}}</div>
                <div class="flex font-bold py-2 text-xs items-center bg-slab-primary">
                    <div class="w-4 p-2 m-1 ml-0"></div>
                    <div class="w-32 cursor-pointer p-2 overflow-hidden" :class="sort_stats.key === 'country' ? 'bg-hoverslab' : '' " @click="toggleSort('country')">Country / Region</div>
                    <div class="w-20 cursor-pointer p-2 overflow-hidden" :class="sort_stats.key === 'confirmed' ? 'bg-hoverslab' : '' " @click="toggleSort('confirmed')">Confirmed</div>
                    <div class="w-20 cursor-pointer p-2 overflow-hidden" :class="sort_stats.key === 'deaths' ? 'bg-hoverslab' : '' " @click="toggleSort('deaths')">Deaths</div>
                    <div class="w-20 cursor-pointer p-2 overflow-hidden" :class="sort_stats.key === 'recovered' ? 'bg-hoverslab' : '' " @click="toggleSort('recovered')">Recovered</div>
                </div>
            </div>
            <div class="w-full h-full relative">
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
    </div>
</template>

<script>
    import simplebar from 'simplebar-vue';
    import CountryStateItem from "../components/CountryStateItem";
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
        }
    }
</script>

<style scoped>

</style>
