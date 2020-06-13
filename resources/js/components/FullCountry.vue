<template>
    <div class="fixed top-0 left-0 bottom-0 right-0 z-10">
        <div class="absolute top-0 right-0 bottom-0 left-0 z-0 bg-black opacity-50"></div>
        <div class="m-4 bg-slab rounded p-2 absolute top-0 right-0 bottom-0 left-0 z-10 flex items-start">
            <div class="relative w-140 h-full mb-4 ml-0">
                <div class="mx-6 pt-4 relative ml-2">
                    <h2 class="font-bold text-3xl">{{data.name.country}}</h2>
                    <h3 class="h-4 font-bold">{{data.name.state}}</h3>
                    <div class="flex text-sm mt-4 w-full items-center">
                        <div class="text-center pr-4">
                            <div class="text-xs font-bold">Confirmed</div>
                            <div class="text-3xl font-bold">{{parseInt(data.total.confirmed)}}</div>
                        </div>
                        <div class="text-center pr-4">
                            <div class="text-xs font-bold">Deaths</div>
                            <div class="text-3xl font-bold">{{parseInt(data.total.deaths)}}</div>
                        </div>
                        <div class="text-center">
                            <div class="text-xs font-bold">Recovered</div>
                            <div class="text-3xl font-bold">{{parseInt(data.total.recovered)}}</div>
                        </div>
                    </div>
                    <div class="text-xs mb-4">As of {{data.total.date}}</div>
                    <div
                        class="absolute top-0 right-0 text-xs pt-4 mt-8 hover:text-white cursor-pointer"
                        @click="close()"
                    >Close</div>
                </div>
                <div class="mx-4 flex justify-between text-xs font-bold py-2">
                        <div class="w-20">Date</div>
                        <div class="w-20">Confirmed</div>
                        <div class="w-16">Deaths</div>
                        <div class="w-16">Recovered</div>
<!--                        <div class="w-12">New Cases</div>-->
                        <div class="w-16">Avg New Cases <br /> (5 days)</div>
                        <div class="w-16">Growth Factor</div>
                </div>
                <simplebar data-simplebar-auto-hide="false" class="top-0 right-0 left-0 mt-64 mx-2 border-b border-lightslab" style="bottom: 320px; position:absolute;" >
                    <div

                        v-for="(row, key, index) in data.daily"
                        :key="key"
                    >
                        <div class="flex p-2 text-xs items-start bg-slab-primary">
                            <div class="w-20">{{moment(row['date']).format('YYYY-MM-DD')}}</div>
                            <div class="w-20">
                                {{ isNaN(row.confirmed) ? 0 : row.confirmed }}
                                <span class="text-green-400" v-if="data.delta[key].confirmed >= 0">(+{{data.delta[key].confirmed}})</span>
                                <span class="text-red-400" v-else>({{data.delta[key].confirmed}})</span>
                            </div>
                            <div class="w-16">
                                {{ isNaN(row.deaths) ? 0 : row.deaths }}
                                <span class="text-green-400" v-if="data.delta[key].deaths >= 0">(+{{data.delta[key].deaths}})</span>
                                <span class="text-red-400" v-else>({{data.delta[key].deaths}})</span>
                            </div>
                            <div class="w-16">
                                {{ isNaN(row.recovered) ? 0 : row.recovered }}
                                <span class="text-green-400" v-if="data.delta[key].recovered >= 0">(+{{data.delta[key].recovered}})</span>
                                <span class="text-red-400" v-else>({{data.delta[key].recovered}})</span>
                            </div>
<!--                                    <div class="w-12">-->
<!--                                        {{data.growth[key]}}-->
<!--                                    </div>-->
                            <div class="w-16">
                                {{data.average[key]}}
                            </div>
                            <div class="w-16">
                                {{data.growthFactor[key]}}
                            </div>
                        </div>
                        <div v-if="getDayNotes(moment(row['date']).format('YYYY-MM-DD')).length > 0">
                            <div v-for="(annotation,key,index) in getDayNotes(moment(row['date']).format('YYYY-MM-DD'))"
                                 class="p-1 my-1 text-xs rounded bg-lightslab flex"
                                 :key="key"
                            >
                                <div v-if="annotation.state.length > 0" class="font-bold mr-2">{{annotation.state}}</div>
                                <div>{{annotation.notes}}</div>
<!--                                <div v-if="annotation.url"><a class="underline hover:text-white" :href="annotation.url">(source)</a></div>-->
                            </div>
                        </div>
                    </div>
                </simplebar>

                <div class="h-76 absolute bottom-0 left-0 right-0 m-2 p-4 mb-0 ml-0 pt-0 rounded bg-hoverslab">
                    <div class="font-bold my-1">Events</div>
                    <simplebar data-simplebar-auto-hide="false" class="h-68 text-sm" >
                        <ul>
                            <li v-if="annotations.length == 0" class="text-xs p-4">
                                Nothing to show here.
                            </li>
                            <li v-for="(note,key,index) in annotations" :key="key" class="flex text-xs items-start justify-start">
                                <div class="mr-1 w-20 text-date-slab">{{note.date}}</div>
                                <div class="w-full">
                                    <span v-if="note.state.length > 0" class="font-bold mr-1">[{{note.state}}]</span>
                                    <span>{{note.notes}}</span>
                                    <span v-if="note.url"><a class="underline hover:text-white" :href="note.url">(source)</a></span>
                                </div>
                            </li>
                        </ul>
                    </simplebar>
                </div>
            </div>
            <div class="h-full relative w-full">
                <StatsChart
                    :data="[data]"
                    :annotations="annotations"
                    :full="true"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import simplebar from 'simplebar-vue';
    import StatsChart from "./charts/StatsChart";
    export default {
        name: "FullCountry",
        components: {
            simplebar,
            StatsChart
        },
        props: [
            'data',
        ],
        data(){
            return {
            }
        },
        methods: {
            close()
            {
                this.$emit('close');
            },
            getDayNotes(date)
            {
                var data = [];
                for(var x in this.annotations)
                {
                    if (this.data.annotations[x].date == date)
                    {
                        data.push(this.data.annotations[x]);
                    }
                }
                return data;
            }
        },
        computed: {
            annotations()
            {
                var data = [];
                for(var x in this.data.annotations)
                {
                    if(this.data.name.state)
                    {
                        if(this.data.name.state.length == 0 || ( this.data.name.state.length > 0 && this.data.name.state == this.data.annotations[x].state))
                        {
                            data.push(this.data.annotations[x]);
                        }
                    }
                    else
                    {
                        data.push(this.data.annotations[x]);
                    }
                }
                return data;
            }
        }
    }
</script>

<style scoped>

</style>
