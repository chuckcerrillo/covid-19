<template>
    <div class="h-full">
<!--        <div class="absolute top-5 right-0 w-128 z-10 bg-slab-primary overflow-auto h-200">{{data}}</div>-->
        <div class="" :class="config.absolute ? 'xl:absolute top-0 left-0 right-0': ''">
            <div v-if="config.solo == false" class="mx-4 pt-4 relative flex items-center justify-between">
                <h2 class="font-bold text-3xl">{{data.name.full}}</h2>

                <div class="flex">
<!--                    <div-->
<!--                        class="mr-4 mb-4 text-xs px-4 py-2 hover:text-white cursor-pointer rounded bg-slab-primary hover:bg-lightslab"-->
<!--                        @click="toggleExpand()"-->
<!--                    >View full stats</div>-->
                </div>
            </div>
            <div class="mx-4 mt-4">
                <div class="hidden xl:flex text-sm w-full items-center">
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

                <div class="flex xl:hidden items-center text-xs font-bold">
                    <div>
                        <div>Population</div>
                        <div class="text-2xl">{{data.population | numeralFormat }}</div>
                    </div>
                </div>
                <div class="flex xl:hidden items-center text-xs font-bold mt-2 justify-between">
                    <div>
                        <div>Active</div>
                        <div class="text-base">{{data.total.a | numeralFormat }}</div>
                    </div>
                    <div>
                        <div>Confirmed</div>
                        <div class="text-base">{{data.total.c | numeralFormat }}</div>
                    </div>
                    <div>
                        <div>Deaths</div>
                        <div class="text-base">{{data.total.d | numeralFormat }}</div>
                    </div>
                    <div>
                        <div>Recovered</div>
                        <div class="text-base">{{data.total.r | numeralFormat }}</div>
                    </div>
                </div>
                <div class="text-xs mb-4 text-lightlabel">As of {{data.total.date}}</div>
            </div>
        </div>

        <div v-if="isMobile" class="h-full">
            <div class="rounded bg-darkslab p-2 inline-block m-2" @click="show_daily = !show_daily">Show daily breakdown</div>

            <div v-if="show_daily" class="fixed inset-x-0 top-3.5 bottom-4.25 z-20 bg-baseslab">
                <div @click="show_daily = false" class="inline-block p-2 px-4 bg-hoverslab rounded m-2 text-xs">Back</div>
                <div class="absolute top-3 bottom-0 inset-x-0">
                    <simplebar data-simplebar-auto-hide="false" class="w-full h-full">
                        <div class="flex text-xs font-bold justify-between bg-slab-primary z-10 relative" style="min-width: 75rem; ">
                            <div class="justify-start flex w-full items-end border-b border-lightslab">
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
                        <simplebar data-simplebar-auto-hide="false" class="bg-slab rounded absolute inset-x-0 bottom-0" style="min-width: 75rem; position: absolute; top: 70px;">
                            <div

                                v-for="(row, key, index) in daily"
                                :key="key"
                                v-once
                            >
                                <div class="text-xs"
                                     :class="key % 2 == 1 ? 'bg-slab-primary' : ''">

                                    <div class="w-full flex justify-start" :class="key == 0 ? 'font-bold' : ''">
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
                                            <span class="text-red-400" v-if="row.growth.c > 1">{{row.growth.c | numeralFormat('0.00')}}</span>
                                            <span class="text-green-400" v-else>{{row.growth.c | numeralFormat('0.00')}}</span>
                                        </div>
                                    </div>
                                    <div v-if="key==0" class="w-full text-lightlabel flex justify-start">
                                        <div class="w-24 p-2"></div>
                                        <div class="w-268 p-2 border-l border-lightslab">
                                            * today's numbers are still processing and can still change throughout the day
                                        </div>
                                    </div>
                                </div>
                                <div v-if="row.date.length > 0">
                                    <div v-for="annotation in getDayNotes(row.date)"
                                         class="text-xs rounded flex justify-start"
                                         :class="key % 2 == 1 ? 'bg-slab-primary' : ''"
                                    >
                                        <div class="w-24 p-2 pt-0"></div>
                                        <div class="w-268 p-2 pt-0 border-l border-lightslab">
                                            <div class="flex rounded p-2"
                                                 :class="annotation.type === 'policy' ? 'bg-heading text-gray-800' : 'bg-hoverslab'"
                                            >
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
                    </simplebar>
                </div>
            </div>
        </div>
        <div v-else class="" :class="config.absolute ? 'absolute top-0 left-0 right-0 bottom-0 m-4 ': 'mx-4'" :style="config.absolute ? 'top: 232px; position:absolute' : ''">
            <simplebar data-simplebar-auto-hide="false" class="w-full h-full">
                <div class="flex text-xs font-bold justify-between bg-slab-primary rounded-t z-10 relative" style="min-width: 75rem; ">
                    <div class="justify-start flex w-full items-end border-b border-lightslab">
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
                <simplebar data-simplebar-auto-hide="false" class="bg-slab rounded absolute inset-x-0 bottom-0" style="min-width: 75rem; position: absolute; top: 70px;">
                    <div

                        v-for="(row, key, index) in daily"
                        :key="key"
                        v-once
                    >
                        <div class="text-xs"
                             :class="key % 2 == 1 ? 'bg-slab-primary' : ''">

                            <div class="w-full flex justify-start" :class="key == 0 ? 'font-bold' : ''">
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
                                    <span class="text-red-400" v-if="row.growth.c > 1">{{row.growth.c | numeralFormat('0.00')}}</span>
                                    <span class="text-green-400" v-else>{{row.growth.c | numeralFormat('0.00')}}</span>
                                </div>
                            </div>
                            <div v-if="key==0" class="w-full text-lightlabel flex justify-start">
                                <div class="w-24 p-2"></div>
                                <div class="w-268 p-2 border-l border-lightslab">
                                    * today's numbers are still processing and can still change throughout the day
                                </div>
                            </div>
                        </div>
                        <div v-if="row.date.length > 0">
                            <div v-for="annotation in getDayNotes(row.date)"
                                 class="text-xs rounded flex justify-start"
                                 :class="key % 2 == 1 ? 'bg-slab-primary' : ''"
                            >
                                <div class="w-24 p-2 pt-0"></div>
                                <div class="w-268 p-2 pt-0 border-l border-lightslab">
                                    <div class="flex rounded p-2"
                                         :class="annotation.type === 'policy' ? 'bg-heading text-gray-800' : 'bg-hoverslab'"
                                    >
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
    import FullCountry from "../FullCountry";

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
                show_daily: false,
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
            daily()
            {
                var result = _.clone(this.data.daily);
                return result.reverse();
            },
            isMobile() {
                if( screen.width <= 760 ) {
                    return true;
                }
                else {
                    return false;
                }
            }
        },
    }
</script>

<style scoped>

</style>
