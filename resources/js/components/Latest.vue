<template>
    <div class="h-full">
        <div class="m-4">

            <div class="my-2 py-2 pb-4 px-4 bg-slab-primary rounded">
                <span class="font-bold">Select date</span>
                <v-date-picker
                    v-model="date"
                    :min-date="options.date.min"
                    :max-date="options.date.max"
                    :popover="{ placement: 'bottom', visibility: 'click' }">
                    <button class="p-2 hover:bg-lightlabel text-white rounded focus:outline-none">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            class="w-4 h-4 fill-current">
                            <path d="M1 4c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4zm2 2v12h14V6H3zm2-6h2v2H5V0zm8 0h2v2h-2V0zM5 9h2v2H5V9zm0 4h2v2H5v-2zm4-4h2v2H9V9zm0 4h2v2H9v-2zm4-4h2v2h-2V9zm0 4h2v2h-2v-2z" />
                        </svg>
                    </button>
                </v-date-picker> {{moment(date).format('YYYY-MM-DD')}}
                <vue-slider v-model="date" :data="dateSliderRange" :lazy="true" :adsorb="true" />
            </div>
        </div>
        <div class="absolute top-0 left-0 right-0 bottom-0 m-4" style="position:absolute; top: 5.5rem">
            <simplebar data-simplebar-auto-hide="false" class="w-full h-full">
                <div class="flex justify-start rounded-t z-10 relative bg-slab-primary" style="min-width: 75rem;">
                    <div class="bg-slab-primary justify-start items-end border-lightslab w-36 text-xs font-bold flex-shrink-0">
                        <div class="px-4 py-2 h-12"></div>
                        <div class="px-4 py-2 h-8 border-b border-slab"></div>
                    </div>
                    <div
                        class="border-l flex-shrink-0
                        border-lightslab w-64"
                        v-for="(row, key, index) in comparison"
                    >
                        <div class="w-full">
                            <div class="px-4 py-2 text-2xl h-12 bg-slab-primary">
                                <div class="truncate ... font-bold">{{row.name.country}}</div>
                            </div>
                            <div class="px-4 py-2 font-bold h-8 border-b border-lightslab bg-slab-primary text-xs">
                                <div v-if="row.name.state">{{row.name.state}}</div>
                                <div v-else></div>
                            </div>
                        </div>
                     </div>
                    <div class="px-4 py-2 h-20 border-l border-lightslab"></div>
                </div>
                <simplebar data-simplebar-auto-hide="false" class="bg-slab rounded absolute inset-x-0 bottom-0 h-full" style="min-width: 75rem; position: absolute; top: 80px;">
                    <div class="flex justify-start rounded-t z-10 relative bg-slab">
                        <div class="bg-slab-primary justify-start items-end border-b border-lightslab w-36 text-xs font-bold flex-shrink-0">
                            <div class="px-4 py-2 h-32 border-b border-slab">New cases per day</div>
                            <div class="px-4 py-2 h-16 border-b border-slab">Confirmed</div>
                            <div class="px-4 py-2 h-16 border-b border-slab">Deaths</div>
                            <div class="px-4 py-2 h-16 border-b border-slab">Recovered</div>
                            <div class="px-4 py-2 h-24 border-b border-slab">Active</div>
                            <div class="px-4 py-2 h-12 border-b border-slab">New Cases</div>
                            <div class="px-4 py-2 h-12 border-b border-slab">New Deaths</div>
                            <div class="px-4 py-2 h-12 border-b border-slab">New Recovered</div>
                            <div class="px-4 py-2 h-12 border-b border-slab">Population</div>
                            <div class="px-4 py-2 h-16 border-b border-slab">Confirmed Per 1M population</div>
                            <div class="px-4 py-2 h-16 border-b border-slab">Deaths Per 1M population</div>
                            <div class="px-4 py-2 h-16 border-b border-slab">Recovered Per 1M population</div>
                            <div class="px-4 py-2 h-12 border-b border-slab">5D Ave</div>
                            <div class="px-4 py-2 h-12 border-b border-slab">Growth Factor</div>
                            <div class="px-4 py-2 h-12">Stringency Index</div>
                        </div>
                        <div class="flex-shrink-0 flex">
                            <div
                                class="border-l border-b border-lightslab flex-shrink-0 w-64"
                                v-for="(row, key, index) in comparison"
                            >
                                <div class=""
                                     :class="index % 2 == 1 ? 'bg-slab-primary' : ''">

                                    <div class="w-full">

                                        <div class="p-2 h-32 border-b border-lightslab">
                                            <MiniChart :data="dataset(key)" />
                                        </div>
                                        <div class="px-4 py-2 h-16 border-b border-lightslab">
                                            {{ isNaN(row.latest.c) ? 0 : row.latest.c | numeralFormat}}<br />
                                            <span class="text-xs text-red-400" v-if="row.latest.percent.c > 0">(+{{row.latest.percent.c| numeralFormat('0.0%')}})</span>
                                            <span class="text-xs text-green-400" v-else>({{row.latest.percent.c | numeralFormat('0.0%')}})</span>
                                        </div>
                                        <div class="px-4 py-2 h-16 border-b border-lightslab">
                                            {{ isNaN(row.latest.d) ? 0 : row.latest.d | numeralFormat}}<br />
                                            <span class="text-xs text-red-400" v-if="row.latest.percent.d > 0">(+{{row.latest.percent.d| numeralFormat('0.0%')}})</span>
                                            <span class="text-xs text-green-400" v-else>({{row.latest.percent.d | numeralFormat('0.0%')}})</span>
                                        </div>
                                        <div class="px-4 py-2 h-16 border-b border-lightslab">
                                            {{ isNaN(row.latest.r) ? 0 : row.latest.r | numeralFormat}}<br />
                                            <span class="text-xs text-green-400" v-if="row.latest.percent.r > 0">(+{{row.latest.percent.r | numeralFormat('0.0%')}})</span>
                                            <span class="text-xs text-green-400" v-else-if="row.latest.percent.r == 0">({{row.latest.percent.r | numeralFormat('0.0%')}})</span>
                                            <span class="text-xs text-red-400" v-else>({{row.latest.percent.r | numeralFormat('0.0%')}})</span>
                                        </div>
                                        <div class="px-4 py-2 h-24 border-b border-lightslab">
                                            {{ (isNaN(row.latest.a) ? 0 : row.latest.a) | numeralFormat}}<br />
                                            <span class="text-xs text-green-400" v-if="row.latest.delta.a < 0">({{row.latest.delta.a| numeralFormat}})</span>
                                            <span class="text-xs text-green-400" v-else-if="row.latest.delta.a == 0">({{row.latest.delta.a| numeralFormat}})</span>
                                            <span class="text-xs text-red-400" v-else>(+{{row.latest.delta.a| numeralFormat}})</span><br />
                                            <span class="text-xs text-blue-400">{{row.latest.a / row.latest.population | numeralFormat('0.000%')}} of total population</span>
                                        </div>
                                        <div class="px-4 py-2 h-12 border-b border-lightslab">
                                            {{row.latest.delta.c| numeralFormat}}
                                        </div>
                                        <div class="px-4 py-2 h-12 border-b border-lightslab">
                                            {{row.latest.delta.d| numeralFormat}}
                                        </div>
                                        <div class="px-4 py-2 h-12 border-b border-lightslab">
                                            {{row.latest.delta.r| numeralFormat}}
                                        </div>
                                        <div class="px-4 py-2 h-12 border-b border-lightslab">
                                            {{row.population | numeralFormat('0,000')}}
                                        </div>
                                        <div class="px-4 py-2 h-16 border-b border-lightslab">
                                            {{row.latest.capita.c | numeralFormat('0,000.00')}}
                                        </div>
                                        <div class="px-4 py-2 h-16 border-b border-lightslab">
                                            {{row.latest.capita.d | numeralFormat('0,000.00')}}
                                        </div>
                                        <div class="px-4 py-2 h-16 border-b border-lightslab">
                                            {{row.latest.capita.r | numeralFormat('0,000.00')}}
                                        </div>
                                        <div class="px-4 py-2 h-12 border-b border-lightslab">
                                            {{row.latest.average.c | numeralFormat('0,000.0')}}
                                        </div>
                                        <div class="px-4 py-2 h-12 border-b border-lightslab">
                                            <span class="text-red-400" v-if="row.latest.growth.c > 1">{{row.latest.growth.c | numeralFormat('0.00')}}</span>
                                            <span class="text-green-400" v-else>{{row.latest.growth.c | numeralFormat('0.00')}}</span>
                                        </div>
                                        <div class="px-4 py-2 h-12">
                                            {{row.latest.stringencyindex | numeralFormat('0.00')}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="border-l border-lightslab h-228"></div>
                        </div>
                    </div>
                </simplebar>
            </simplebar>
        </div>




<!--        <FullCountry v-if="expanded"-->
<!--                     :data="recomputed"-->
<!--                    v-on:close="toggleExpand"-->
<!--        />-->
    </div>
</template>

<script>
    import moment from 'moment'
    import simplebar from 'simplebar-vue';
    import FullCountry from "./FullCountry";
    import VueSlider from 'vue-slider-component'
    import 'vue-slider-component/theme/default.css'
    import MiniChart from "./MiniChart";

    export default {
        name: "Latest",
        components: {
            MiniChart,
            simplebar,
            FullCountry,
            VueSlider,
        },
        props: [
            'data',
            'settings'
        ],
        data(){
            return {
                growth_factor: [],
                recomputed_data: [],
                expanded: false,
                date: '',
                options: {
                    date: {
                        min: new Date('2020-01-22'),
                        max: new Date(),
                    }
                }
            }
        },
        created()
        {
            this.date = moment().format('YYYY-MM-DD');
        },
        methods: {
            getDayNotes(date)
            {
                var data = [];
                for(var x in this.annotations)
                {
                    if (this.annotations[x].date == date)
                    {
                        data.push(this.annotations[x]);
                    }
                }
                return data;
            },
            toggleExpand()
            {
                this.expanded = !this.expanded;
            },
            remove(item){
                this.$emit('removeCompare',item);
            },
            getBiggestValue(field,value)
            {

            },
            dataset(x)
            {
                var data = [];
                if(x >= 0 && this.data && this.data[x])
                {
                    data.push(_.clone(this.data[x]));
                }
                return data;
            },
        },
        computed: {

            config() {
                return {
                    'absolute': (this.settings && this.settings.absolute) ? this.settings.absolute : false,
                    'solo': (this.settings && this.settings.solo) ? this.settings.solo : false,
                }
            },
            annotations()
            {
                var data = [];
                for(var x in this.data.annotations)
                {
                    if(this.data.annotations[x].country == 'All')
                    {
                        data.push(_.clone(this.data.annotations[x]));
                    }
                    else if(this.data.annotations[x].state && this.data.name.state.length > 0)
                    {
                        if(this.data.name.state == this.data.annotations[x].state)
                        {
                            data.push(_.clone(this.data.annotations[x]));
                        }
                    }
                    else
                    {
                        data.push(_.clone(this.data.annotations[x]));
                    }
                }
                return data;
            },
            comparison()
            {
                var data = [];
                var date = moment(this.date).format('YYYY-MM-DD');
                for(var x in this.data)
                {
                    var row = {};
                    row.latest = {
                        c: 0,
                        d: 0,
                        r: 0,
                        a: 0,
                        delta: {
                            c: 0,
                            d: 0,
                            r: 0,
                            a: 0,
                        },
                        capita: {
                            c: 0,
                            d: 0,
                            r: 0,
                            a: 0,
                        },
                        percent: {
                            c: 0,
                            d: 0,
                            r: 0,
                            a: 0,
                        },
                        average: {
                            c: 0,
                            d: 0,
                            r: 0,
                            a: 0,
                        },
                        growth: {
                            c: 0,
                            d: 0,
                            r: 0,
                            a: 0,
                        },
                        stringencyindex: 0
                    }
                    row.name = this.data[x].name;
                    row.population = this.data[x].population;
                    for(var y in this.data[x].daily)
                    {
                        if(date == this.data[x].daily[y].date)
                        {
                            row.latest = this.data[x].daily[y];
                            break;
                        }
                    }

                    data.push(_.clone(row));
                }

                return data;
            },
            dateSliderRange()
            {
                Date.prototype.addDays = function(days) {
                    var date = new Date(this.valueOf());
                    date.setDate(date.getDate() + days);
                    return date;
                }


                var date1 = new Date('2020-01-01');
                var date2 = new Date();
                var daysTotal = (date2.getTime() - date1.getTime()) / (1000*3600*24);
                var data = [];

                for(var x = 0; x<daysTotal; x++)
                {
                    data.push(moment(date1.addDays(x)).format('YYYY-MM-DD'));
                }
                return data;
            }
        },
    }
</script>

<style scoped>

</style>
