<template>
    <div class="h-full">
        <div class="m-2 xl:m-4">

            <div class="my-2 py-2 pb-4 px-4 bg-slab-primary rounded">
                <span class="font-bold">Select date</span>
                <v-date-picker
                    mode="range"
                    v-model="range"
                    :min-date="options.date.min"
                    :max-date="options.date.max"
                    :masks="{ data: ['YYYY-MM-DD', 'YYYY/MM/DD'],input: ['YYYY-MM-DD', 'YYYY/MM/DD'] }"
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
                <vue-slider v-model="dateRange" :data="dateSliderRange" :lazy="true" :adsorb="true" />
            </div>
        </div>
        <div class="absolute left-0 right-0 bottom-4.25 xl:bottom-0 m-2 xl:m-4 top-5.5" style="position:absolute;">
            <simplebar class="w-full h-full">
                <div class="flex justify-start rounded-t z-10 relative bg-slab-primary" :class="'min-w-' + (comparison.length*32) + ' xl:min-w-' + (comparison.length*64+36)">
                    <div class="hidden xl:block bg-slab-primary border-lightslab w-36 text-xs font-bold flex-shrink-0">
                        <div class="px-4 py-2 h-12"></div>
                        <div class="px-4 py-2 h-8 border-b border-slab"></div>
                    </div>
                    <div
                        class="border-l flex-shrink-0
                        border-lightslab w-32 xl:w-64"
                        v-for="(row, key, index) in comparison"
                        :key="key"
                    >
                        <div class="w-full">
                            <div class="px-4 py-2 text-sm xl:text-2xl xl:h-12 bg-slab-primary">
                                <div class="truncate ... font-bold">{{row.name.country}}</div>
                            </div>
                            <div class="text-xs xl:text-base px-4 py-2 font-bold xl:h-8 border-b border-lightslab bg-slab-primary text-xs">
                                <div v-if="row.name.state">{{row.name.state}}</div>
                                <div v-else></div>
                            </div>
                        </div>
                     </div>
                    <div class="hidden xl:block px-4 py-2 xl:h-20 border-l border-lightslab"></div>
                </div>
                <simplebar class="inner-scrollbar bg-slab rounded absolute inset-x-0 bottom-0 top-3.25 xl:top-5 overflow-x-show w-full" style="position: absolute;" :class="'min-w-' + (comparison.length*32) + ' xl:min-w-' + (comparison.length*64+36)">
                    <div class="flex justify-start rounded-t z-10 relative bg-slab">
                        <div class="hidden xl:block bg-slab-primary border-b border-lightslab w-36 text-xs font-bold flex-shrink-0">
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
                                class="xl:border-l border-b border-lightslab flex-shrink-0 w-32 xl:w-64"
                                v-for="(row, key, index) in comparison"
                                :key="index"
                            >
                                <div class=""
                                     :class="index % 2 == 1 ? 'bg-slab-primary' : ''">

                                    <div class="w-full text-xs xl:text-base">
                                        <div class="p-2 xl:hidden font-bold text-lightlabel">New cases per day</div>
                                        <div class="p-2 h-24 xl:h-32 border-b border-lightslab">
                                            <MiniChart v-if="active && graphReady" :data="dataset(key)" :minDate="range.start" :maxDate="range.end" :active="active" />
                                        </div>

                                        <div class="p-2 xl:hidden font-bold text-lightlabel">Confirmed cases</div>
                                        <div class="px-4 py-2 h-16 border-b border-lightslab" :class="getBiggestValue('confirmed',row.latest.c) ? 'bg-darkslab':''">
                                            {{ isNaN(row.latest.c) ? 0 : row.latest.c | numeralFormat}}<br />
                                            <span class="text-xs text-red-400" v-if="row.latest.percent.c > 0">(+{{row.latest.percent.c| numeralFormat('0.0%')}})</span>
                                            <span class="text-xs text-green-400" v-else>({{row.latest.percent.c | numeralFormat('0.0%')}})</span>
                                        </div>

                                        <div class="p-2 xl:hidden font-bold text-lightlabel">Deaths</div>
                                        <div class="px-4 py-2 h-16 border-b border-lightslab" :class="getBiggestValue('deaths',row.latest.d) ? 'bg-darkslab':''">
                                            {{ isNaN(row.latest.d) ? 0 : row.latest.d | numeralFormat}}<br />
                                            <span class="text-xs text-red-400" v-if="row.latest.percent.d > 0">(+{{row.latest.percent.d| numeralFormat('0.0%')}})</span>
                                            <span class="text-xs text-green-400" v-else>({{row.latest.percent.d | numeralFormat('0.0%')}})</span>
                                        </div>

                                        <div class="p-2 xl:hidden font-bold text-lightlabel">Recovered</div>
                                        <div class="px-4 py-2 h-16 border-b border-lightslab" :class="getBiggestValue('recovered',row.latest.r) ? 'bg-darkslab':''">
                                            {{ isNaN(row.latest.r) ? 0 : row.latest.r | numeralFormat}}<br />
                                            <span class="text-xs text-green-400" v-if="row.latest.percent.r > 0">(+{{row.latest.percent.r | numeralFormat('0.0%')}})</span>
                                            <span class="text-xs text-green-400" v-else-if="row.latest.percent.r == 0">({{row.latest.percent.r | numeralFormat('0.0%')}})</span>
                                            <span class="text-xs text-red-400" v-else>({{row.latest.percent.r | numeralFormat('0.0%')}})</span>
                                        </div>

                                        <div class="p-2 xl:hidden font-bold text-lightlabel">Active</div>
                                        <div class="px-4 py-2 h-24 border-b border-lightslab" :class="getBiggestValue('active',row.latest.a) ? 'bg-darkslab':''">
                                            {{ (isNaN(row.latest.a) ? 0 : row.latest.a) | numeralFormat}}<br />
                                            <span class="text-xs text-green-400" v-if="row.latest.delta.a < 0">({{row.latest.delta.a| numeralFormat}})</span>
                                            <span class="text-xs text-green-400" v-else-if="row.latest.delta.a == 0">({{row.latest.delta.a| numeralFormat}})</span>
                                            <span class="text-xs text-red-400" v-else>(+{{row.latest.delta.a| numeralFormat}})</span><br />
                                            <span class="text-xs text-blue-400">{{row.latest.a / row.latest.population | numeralFormat('0.000%')}} of total population</span>
                                        </div>

                                        <div class="p-2 xl:hidden font-bold text-lightlabel">New cases</div>
                                        <div class="px-4 py-2 h-12 border-b border-lightslab" :class="getBiggestValue('confirmedDelta',row.latest.delta.c) ? 'bg-darkslab':''">
                                            {{row.latest.delta.c| numeralFormat}}
                                        </div>

                                        <div class="p-2 xl:hidden font-bold text-lightlabel">New deaths</div>
                                        <div class="px-4 py-2 h-12 border-b border-lightslab" :class="getBiggestValue('deathsDelta',row.latest.delta.d) ? 'bg-darkslab':''">
                                            {{row.latest.delta.d| numeralFormat}}
                                        </div>

                                        <div class="p-2 xl:hidden font-bold text-lightlabel">New recovered</div>
                                        <div class="px-4 py-2 h-12 border-b border-lightslab" :class="getBiggestValue('recoveredDelta',row.latest.delta.r) ? 'bg-darkslab':''">
                                            {{row.latest.delta.r| numeralFormat}}
                                        </div>

                                        <div class="p-2 xl:hidden font-bold text-lightlabel">Population</div>
                                        <div class="px-4 py-2 h-12 border-b border-lightslab" :class="getBiggestValue('population',row.population) ? 'bg-darkslab':''">
                                            {{row.population | numeralFormat('0,000')}}
                                        </div>

                                        <div class="p-2 xl:hidden font-bold text-lightlabel">Confirmed per 1M pop</div>
                                        <div class="px-4 py-2 h-16 border-b border-lightslab" :class="getBiggestValue('confirmedCapita',row.latest.capita.c) ? 'bg-darkslab':''">
                                            {{row.latest.capita.c | numeralFormat('0,000.00')}}
                                        </div>

                                        <div class="p-2 xl:hidden font-bold text-lightlabel">Deaths per 1M pop</div>
                                        <div class="px-4 py-2 h-16 border-b border-lightslab" :class="getBiggestValue('deathsCapita',row.latest.capita.d) ? 'bg-darkslab':''">
                                            {{row.latest.capita.d | numeralFormat('0,000.00')}}
                                        </div>

                                        <div class="p-2 xl:hidden font-bold text-lightlabel">Recovered per 1M pop</div>
                                        <div class="px-4 py-2 h-16 border-b border-lightslab" :class="getBiggestValue('recoveredCapita',row.latest.capita.r) ? 'bg-darkslab':''">
                                            {{row.latest.capita.r | numeralFormat('0,000.00')}}
                                        </div>

                                        <div class="p-2 xl:hidden font-bold text-lightlabel">5 days average</div>
                                        <div class="px-4 py-2 h-12 border-b border-lightslab" :class="getBiggestValue('confirmedAverage',row.latest.average.c) ? 'bg-darkslab':''">
                                            {{row.latest.average.c | numeralFormat('0,000.0')}}
                                        </div>

                                        <div class="p-2 xl:hidden font-bold text-lightlabel">Growth factor</div>
                                        <div class="px-4 py-2 h-12 border-b border-lightslab" :class="getBiggestValue('confirmedGrowth',row.latest.growth.c) ? 'bg-darkslab':''">
                                            <span class="text-red-400" v-if="row.latest.growth.c > 1">{{row.latest.growth.c | numeralFormat('0.00')}}</span>
                                            <span class="text-green-400" v-else>{{row.latest.growth.c | numeralFormat('0.00')}}</span>
                                        </div>

                                        <div class="p-2 xl:hidden font-bold text-lightlabel">Stringency index</div>
                                        <div class="px-4 py-2 h-12" :class="getBiggestValue('stringencyIndex',row.latest.stringencyindex) ? 'bg-darkslab':''">
                                            {{row.latest.stringencyindex | numeralFormat('0.00')}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="hidden xl:block border-l border-lightslab h-364 xl:h-240"></div>
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

    // const MiniChart = () => ({
    //     component: import("./MiniChart"),
    //
    // });
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
            'settings',
            'active'
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
                        max: false,
                    }
                },

                range: {
                    start: moment().subtract(30, 'days').format('YYYY-MM-DD'),
                    end: moment().subtract(1, 'days').format('YYYY-MM-DD')
                },


                graphReady: false
            }
        },
        created()
        {
            this.prepare();
            var self = this;
            setTimeout(function(){
                self.graphReady = true;
            },200)
        },
        mounted()
        {
            if(this.data && this.data.length > 0)
            {
                this.range.end = _.clone(this.data[0].daily[this.data[0].daily.length - 2].date);
                this.range.start = moment(this.range.end).subtract(30,'days').format('YYYY-MM-DD');
            }

        },
        methods: {
            prepare()
            {
                if(this.data[0] && this.data[0].daily)
                {
                    this.date = this.data[0].daily[this.data[0].daily.length - 2].date;
                    this.range.end = _.clone(this.date);
                }
                this.options.date.max = this.date;
            },
            toggleExpand()
            {
                this.expanded = !this.expanded;
            },
            remove(item)
            {
                this.$emit('removeCompare',item);
            },
            getBiggestValue(field,value)
            {
                var result = false;
                var data = [];

                for(var x in this.comparison)
                {
                    var row = this.comparison[x];

                    if(field == 'confirmed')
                    {
                        data.push(row.latest.c);
                    }
                    else if(field == 'deaths')
                    {
                        data.push(row.latest.d);
                    }
                    else if(field == 'recovered')
                    {
                        data.push(row.latest.r);
                    }
                    else if(field == 'active')
                    {
                        data.push(row.latest.a);
                    }
                    else if(field == 'confirmedDelta')
                    {
                        data.push(row.latest.delta.c);
                    }
                    else if(field == 'deathsDelta')
                    {
                        data.push(row.latest.delta.d);
                    }
                    else if(field == 'recoveredDelta')
                    {
                        data.push(row.latest.delta.r);
                    }
                    else if(field == 'population')
                    {
                        data.push(row.population);
                    }
                    else if(field == 'confirmedCapita')
                    {
                        data.push(row.latest.capita.c);
                    }
                    else if(field == 'deathsCapita')
                    {
                        data.push(row.latest.capita.d);
                    }
                    else if(field == 'recoveredCapita')
                    {
                        data.push(row.latest.capita.r);
                    }
                    else if(field == 'confirmedAverage')
                    {
                        data.push(row.latest.average.c);
                    }
                    else if(field == 'confirmedGrowth')
                    {
                        data.push(row.latest.growth.c);
                    }
                    else if(field == 'stringencyIndex')
                    {
                        data.push(row.latest.stringencyindex);
                    }
                }

                if(data.length > 1 && value && Math.max(...data) == value)
                {
                    result = true;
                }
                return result;
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
            dateRange:
            {
                get()
                {
                    var data = [
                        _.clone(this.range.start),
                        _.clone(this.range.end),
                    ]
                    return data;
                },
                set(newvalue)
                {
                    this.range.start = newvalue[0];
                    this.range.end = newvalue[1];
                }
            },
            config() {
                return {
                    'absolute': (this.settings && this.settings.absolute) ? this.settings.absolute : false,
                    'solo': (this.settings && this.settings.solo) ? this.settings.solo : false,
                }
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
                        if(date === this.data[x].daily[y].date)
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
                date2.setDate(date2.getDate() - 1);

                var daysTotal = (date2.getTime() - date1.getTime()) / (1000*3600*24);
                var data = [];

                for(var x = 0; x<daysTotal; x++)
                {
                    data.push(moment(date1.addDays(x)).format('YYYY-MM-DD'));
                }
                return data;
            }
        },
        watch: {
            date: function(newValue,oldValue)
            {
                if(typeof(newValue) != 'string')
                {
                    this.date = moment(newValue).format('YYYY-MM-DD');
                }
            },
            range: function(newvalue)
            {
                if(typeof(newvalue.start) != 'string')
                {
                    this.range.start = moment(newvalue.start).format('YYYY-MM-DD');
                    this.range.end = moment(newvalue.end).format('YYYY-MM-DD');
                }
            }
        }
    }
</script>

<style>
.inner-scrollbar .simplebar-track.simplebar-horizontal {
    visibility: hidden !important;
}
</style>
