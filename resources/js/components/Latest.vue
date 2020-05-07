<template>
    <div class="h-full">
        <div class="m-4">
            Select date
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
        </div>
        <div class="absolute top-0 left-0 right-0 bottom-0 m-4" style="position:absolute; top: 3rem">
            <simplebar data-simplebar-auto-hide="false" class="w-full h-full">
                <div class="flex justify-start rounded-t z-10 relative bg-slab-primary" style="min-width: 75rem;">
                    <div class="bg-slab-primary justify-start items-end border-lightslab w-36 text-xs font-bold">
                        <div class="px-4 py-2 h-12"></div>
                        <div class="px-4 py-2 h-8 border-b border-slab"></div>
                    </div>
                    <div
                        class="border-l
                        border-lightslab"
                        v-for="(row, key, index) in comparison"
                    >
                        <div class="w-64 "
                             :class="index % 2 == 1 ? 'bg-slab-primary' : ''">

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
                    </div>
                    <div class="px-4 py-2 h-20 border-l border-lightslab"></div>
                </div>
                <simplebar data-simplebar-auto-hide="false" class="bg-slab rounded absolute inset-x-0 bottom-0" style="min-width: 75rem; position: absolute; top: 80px;">
                    <div class="flex justify-start rounded-t z-10 relative">
                        <div class="bg-slab-primary justify-start items-end border-b border-lightslab w-36 text-xs font-bold">
<!--                            <div class="px-4 py-2 h-12">Country / Region</div>-->
<!--                            <div class="px-4 py-2 h-8 border-b border-slab">State / Province</div>-->
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
                        <div
                            class="border-l border-b border-lightslab"
                            v-for="(row, key, index) in comparison"
                        >
                            <div class="w-64"
                                 :class="index % 2 == 1 ? 'bg-slab-primary' : ''">

                                <div class="w-full">
<!--                                    <div class="px-4 py-2 text-2xl h-12 bg-slab-primary">-->
<!--                                        <div class="font-bold">{{row.name.country}}</div>-->
<!--                                    </div>-->
<!--                                    <div class="px-4 py-2 font-bold h-8 border-b border-lightslab bg-slab-primary text-xs">-->
<!--                                        <div v-if="row.name.state">- {{row.name.state}}</div>-->
<!--                                        <div v-else>(n/a)</div>-->
<!--                                    </div>-->


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

    export default {
        name: "Latest",
        components: {
            simplebar,
            FullCountry
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

            }
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
                    console.log(this.data[x]);
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
            }
        },
    }
</script>

<style scoped>

</style>
