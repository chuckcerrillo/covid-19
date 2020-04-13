<template>
    <div class="fixed top-0 left-0 bottom-0 right-0 z-10">
        <div class="absolute top-0 right-0 bottom-0 left-0 z-0 bg-black opacity-50"></div>
        <div class="m-4 bg-slab rounded p-4 absolute top-0 right-0 bottom-0 left-0 z-10 flex items-start">
            <div class="relative w-140 h-full mb-4">
                <div class="mx-6 pt-4 relative">
                    <h2 class="font-bold text-2xl">{{data.name.country}}</h2>
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
                <div class="mx-6 flex text-xs font-bold py-2 justify-between">
                    <div class="w-20">Date</div>
                    <div class="justify-end flex w-full">
                        <div class="w-20">Confirmed</div>
                        <div class="w-20">Deaths</div>
                        <div class="w-20">Recovered</div>
                        <div class="w-12">New Cases</div>
                        <div class="w-20">Avg New Cases <br /> (5 days)</div>
                        <div class="w-12">Growth Factor</div>
                    </div>
                </div>
                <simplebar data-simplebar-auto-hide="false" class="top-0 right-0 left-0 bottom-0 mt-64 mx-4 mr-4" style="bottom: 0; position:absolute;" >
                    <div

                        v-for="(row, key, index) in data.daily"
                    >
                        <div class="flex p-2 text-xs items-start justify-between">
                            <div class="w-20">{{moment(row['date']).format('YYYY-MM-DD')}}</div>
                            <div class="w-full flex-col">
                                <div class="w-full flex justify-end">
                                    <div class="w-20">
                                        {{ isNaN(row.confirmed) ? 0 : row.confirmed }}
                                        <span class="text-green-400" v-if="data.delta[key].confirmed >= 0">(+{{data.delta[key].confirmed}})</span>
                                        <span class="text-red-400" v-else>({{data.delta[key].confirmed}})</span>
                                    </div>
                                    <div class="w-20">
                                        {{ isNaN(row.deaths) ? 0 : row.deaths }}
                                        <span class="text-green-400" v-if="data.delta[key].deaths >= 0">(+{{data.delta[key].deaths}})</span>
                                        <span class="text-red-400" v-else>({{data.delta[key].deaths}})</span>
                                    </div>
                                    <div class="w-20">
                                        {{ isNaN(row.recovered) ? 0 : row.recovered }}
                                        <span class="text-green-400" v-if="data.delta[key].recovered >= 0">(+{{data.delta[key].recovered}})</span>
                                        <span class="text-red-400" v-else>({{data.delta[key].recovered}})</span>
                                    </div>
                                    <div class="w-12">
                                        {{data.growth[key]}}
                                    </div>
                                    <div class="w-20">
                                        {{data.average[key]}}
                                    </div>
                                    <div class="w-12">
                                        {{data.growthFactor[key]}}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="getDayNotes(moment(row['date']).format('YYYY-MM-DD')).length > 0">
                            <div v-for="annotation in getDayNotes(moment(row['date']).format('YYYY-MM-DD'))"
                                 class="p-1 my-1 text-xs rounded bg-lightslab flex"
                            >
                                <div v-if="annotation.state.length > 0" class="font-bold mr-2">{{annotation.state}}</div>
                                <div>{{annotation.notes}}</div>
                            </div>
                        </div>
                    </div>
                </simplebar>
            </div>
            <div class="h-full relative w-full">
                <div class="h-76">
                    <div class="font-bold">Events</div>
                    <simplebar data-simplebar-auto-hide="false" class="h-68 text-sm" >
                        <ul>
                            <li v-for="note in data.annotations" class="flex">
                                <div class="font-bold mr-1">{{note.date}}</div>
                                <div v-if="note.state.length > 0" class="mx-1">[{{note.state}}]</div>
                                <div>{{note.notes}}</div>
                            </li>
                        </ul>
                    </simplebar>
                </div>
                <div class="absolute left-0 right-0 bottom-0 mt-80 border top-0">
                    Graph here
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import simplebar from 'simplebar-vue';
    export default {
        name: "FullCountry",
        components: {
            simplebar
        },
        props: [
            'data',
        ],
        methods: {
            close()
            {
                this.$emit('close');
            },
            getDayNotes(date)
            {
                var data = [];
                for(var x in this.data.annotations)
                {
                    if (this.data.annotations[x].date == date)
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
