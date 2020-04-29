<template>
    <div class="h-full">
        <div class="" :class="config.absolute ? 'absolute top-0 left-0 right-0': ''">
            <div v-if="config.solo == false" class="mx-4 pt-4 relative flex items-center justify-between">
                <h2 class="font-bold text-3xl">{{data.name.full}}</h2>

                <div class="flex">
                    <div
                        class="mr-4 mb-4 text-xs px-4 py-2 hover:text-white cursor-pointer rounded bg-slab-primary hover:bg-lightslab"
                        @click="toggleExpand()"
                    >View full stats</div>
                    <div
                        class="mr-4 mb-4 text-xs px-4 py-2 hover:text-white cursor-pointer rounded bg-slab-primary hover:bg-lightslab"
                        @click="remove({country:data.name.country,state:data.name.state})"
                    >Remove</div>
                </div>
            </div>
            <div class="mx-4 mt-4">
                <div class="flex text-sm w-full items-center">
                    <div class="pr-4 border-r border-lightslab mr-4">
                        <div class="text-xs font-bold">Population</div>
                        <div class="text-3xl font-bold">{{data.population| numeralFormat}}</div>
                    </div>
                    <div class="pr-4 border-r border-lightslab mr-4">
                        <div class="text-xs font-bold">Confirmed</div>
                        <div class="text-3xl font-bold">{{data.total.c| numeralFormat}}</div>
                    </div>
                    <div class="pr-4 border-r border-lightslab mr-4">
                        <div class="text-xs font-bold">Deaths</div>
                        <div class="text-3xl font-bold">{{data.total.d| numeralFormat}}</div>
                    </div>
                    <div class="pr-4 border-r border-lightslab mr-4">
                        <div class="text-xs font-bold">Recovered</div>
                        <div class="text-3xl font-bold">{{data.total.r| numeralFormat}}</div>
                    </div>
                    <div class="">
                        <div class="text-xs border-lightslab font-bold">Active</div>
                        <div class="text-3xl font-bold">{{data.total.a| numeralFormat}}</div>
                    </div>
                </div>
                <div class="text-xs mb-4">As of {{data.total.date}}</div>
            </div>
            <div class="mx-4 flex text-xs font-bold justify-between bg-slab-primary rounded-t z-10 relative">
                <div class="justify-center flex w-full items-end border-b border-lightslab">
                    <div class="w-24 p-2">Date</div>
                    <div class="w-24 h-full p-2 border-l border-slab flex items-end">Confirmed</div>
                    <div class="w-24 p-2">Deaths</div>
                    <div class="w-24 p-2">Recovered</div>
                    <div class="w-24 p-2">Active</div>
                    <div class="w-20 h-full p-2 border-l border-slab flex items-end">New Cases</div>
                    <div class="w-20 p-2">New Deaths</div>
                    <div class="w-20 p-2">New Recovered</div>
                    <div class="w-24 h-full p-2 border-l border-slab flex items-end">Confirmed Per 1M population</div>
                    <div class="w-24 h-full p-2 border-l border-slab flex items-end">Deaths Per 1M population</div>
                    <div class="w-24 h-full p-2 border-l border-slab flex items-end">Recovered Per 1M population</div>
                    <div class="w-24 p-2">5D Ave</div>
                    <div class="w-16 p-2">Growth Factor</div>
                </div>
            </div>
        </div>
        <simplebar data-simplebar-auto-hide="false" class="bg-slab rounded"  :class="config.absolute ? 'absolute top-0 left-0 right-0 bottom-0 m-4 ': 'mx-4'" :style="config.absolute ? 'top: 232px; position:absolute' : ''">
            <div

                v-for="(row, key, index) in daily"
            >
                <div class="text-xs"
                                         :class="key % 2 == 1 ? 'bg-slab-primary' : ''">

                    <div class="w-full flex justify-center" :class="key == 0 ? 'font-bold' : ''">
                        <div class="w-24 p-2">{{moment(row['date']).format('YYYY-MM-DD')}}</div>
                        <div class="w-24 p-2 border-l border-lightslab">
                            {{ isNaN(row.c) ? 0 : row.c | numeralFormat}}<br />
                            <span class="text-red-400" v-if="row.percent.c > 0">(+{{row.percent.c| numeralFormat('0.0%')}})</span>
                            <span class="text-green-400" v-else>({{row.percent.c | numeralFormat('0.0%')}})</span>
                        </div>
                        <div class="w-24 p-2">
                            {{ isNaN(row.d) ? 0 : row.d | numeralFormat}}<br />
                            <span class="text-red-400" v-if="row.percent.d > 0">(+{{row.percent.d| numeralFormat('0.0%')}})</span>
                            <span class="text-green-400" v-else>({{row.percent.d | numeralFormat('0.0%')}})</span>
                        </div>
                        <div class="w-24 p-2">
                            {{ isNaN(row.r) ? 0 : row.r | numeralFormat}}<br />
                            <span class="text-green-400" v-if="row.percent.r > 0">(+{{row.percent.r | numeralFormat('0.0%')}})</span>
                            <span class="text-green-400" v-else-if="row.percent.r == 0">({{row.percent.r | numeralFormat('0.0%')}})</span>
                            <span class="text-red-400" v-else>({{row.percent.r | numeralFormat('0.0%')}})</span>
                        </div>
                        <div class="w-24 p-2">
                            {{ (isNaN(row.a) ? 0 : row.a) | numeralFormat}}<br />
                            <span class="text-green-400" v-if="row.delta.a < 0">({{row.delta.a| numeralFormat}})</span>
                            <span class="text-green-400" v-else-if="row.delta.a == 0">({{row.delta.a| numeralFormat}})</span>
                            <span class="text-red-400" v-else>(+{{row.delta.a| numeralFormat}})</span><br />
                            <span class="text-blue-400">{{row.a / row.population | numeralFormat('0.000%')}} of total population</span>
                        </div>
                        <div class="w-20 p-2 border-l border-slab">
                            {{row.delta.c| numeralFormat}}
                        </div>
                        <div class="w-20 p-2">
                            {{row.delta.d| numeralFormat}}
                        </div>
                        <div class="w-20 p-2">
                            {{row.delta.r| numeralFormat}}
                        </div>
                        <div class="w-24 p-2 border-l border-slab">
                            {{row.capita.c | numeralFormat('0,000.00')}}
                        </div>
                        <div class="w-24 p-2 border-l border-slab">
                            {{row.capita.d | numeralFormat('0,000.00')}}
                        </div>
                        <div class="w-24 p-2 border-l border-slab">
                            {{row.capita.r | numeralFormat('0,000.00')}}
                        </div>
                        <div class="w-24 p-2">
                            {{row.average.c | numeralFormat('0,000.0')}}
                        </div>
                        <div class="w-16 p-2">
                            <span class="text-red-400" v-if="row.growthFactor > 1">{{row.growthFactor}}</span>
                            <span class="text-green-400" v-else>{{row.growthFactor}}</span>
                        </div>
                    </div>
                    <div v-if="key==0" class="w-full text-lightlabel flex justify-center">
                        <div class="w-24 p-2"></div>
                        <div class="w-268 p-2 border-l border-lightslab">
                            * today's numbers are still processing and can still change throughout the day
                        </div>
                    </div>
                </div>
                <div v-if="row.date.length > 0">
                    <div v-for="annotation in getDayNotes(row.date)"
                         class="text-xs rounded flex justify-center"
                         :class="key % 2 == 1 ? 'bg-slab-primary' : ''"
                    >
                        <div class="w-24 p-2 pt-0"></div>
                        <div class="w-268 p-2 pt-0 border-l border-lightslab">
                            <div class="flex rounded bg-hoverslab p-2">
                                <div v-if="annotation.state.length > 0" class="font-bold mr-2">{{annotation.state}}</div>
                                <div>
                                    <div>{{annotation.notes}}</div>
                                    <div v-if="annotation.url" class="flex items-center text-orangeslab">
                                        <div class="mr-1">Source:</div>
                                        <a class="underline hover:text-white truncate ... inline-block w-128" :href="annotation.url">{{annotation.url}}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </simplebar>


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
        name: "Daily",
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
            }
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
            recomputeGrowth()
            {
                const arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length;

                this.recomputed_data = this.data;
                this.recomputed_data.growth = [];
                this.recomputed_data.average = [];
                this.recomputed_data.growthFactor = [];

                for(var x in this.recomputed_data.delta)
                {
                    this.recomputed_data.growth.push(
                        this.recomputed_data.delta[x].confirmed
                    )
                }

                for(var x = 0; x < this.recomputed_data.growth.length; x++)
                {
                    var avg = 0;
                    if(x < 5)
                    {
                        avg = arrAvg(this.recomputed_data.growth.slice(0,x+1));
                    }
                    else
                    {
                        avg = arrAvg(this.recomputed_data.growth.slice(x-5,x+1));
                    }
                    this.recomputed_data.average.push(avg.toFixed(1));
                }

                for(var x = 0; x < this.recomputed_data.average.length; x++)
                {
                    var gf = 0;
                    if(x == 1 || this.recomputed_data.average[x-1] == 0)
                    {
                        gf = (this.recomputed_data.average[x]/1).toFixed(2);
                    }
                    else
                    {
                        gf = (this.recomputed_data.average[x]/this.recomputed_data.average[x-1]).toFixed(2);
                    }
                    if(isNaN(gf))
                    {
                        gf = 0;
                    }
                    this.recomputed_data.growthFactor.push(gf);
                }
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
            recomputed()
            {
                this.recomputeGrowth();
                return this.recomputed_data;
            },
            daily()
            {
                var result = _.clone(this.data.daily);
                return result.reverse();
            }
        },
        watch: {
            data: function() {
                this.recomputeGrowth();
            }
        }
    }
</script>

<style scoped>

</style>
