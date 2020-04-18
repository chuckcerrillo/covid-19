<template>
    <div class="h-full">
        <div class="absolute top-0 left-0 right-0">
            <div class="mx-4 pt-4 relative flex items-center justify-between">
                <h2 class="font-bold text-3xl">{{data.name.full}}</h2>
                <div class="flex">
                    <div
                        class="mr-4 mb-4 text-xs px-4 py-2 hover:text-white cursor-pointer rounded bg-slab-primary hover:bg-lightslab"
                        @click="toggleExpand()"
                    >View full stats</div>
                    <div
                        class="mr-4 mb-4 text-xs px-4 py-2 hover:text-white cursor-pointer rounded bg-slab-primary hover:bg-lightslab"
                        @click="remove([data.name.country,data.name.state])"
                    >Remove</div>
                </div>
            </div>
            <div class="mx-4 mt-4">
                <div class="flex text-sm w-full items-center">
                    <div class="pr-4">
                        <div class="text-xs font-bold">Confirmed</div>
                        <div class="text-3xl font-bold">{{data.total.confirmed| numeralFormat}}</div>
                    </div>
                    <div class="pr-4">
                        <div class="text-xs font-bold">Deaths</div>
                        <div class="text-3xl font-bold">{{data.total.deaths| numeralFormat}}</div>
                    </div>
                    <div class="">
                        <div class="text-xs font-bold">Recovered</div>
                        <div class="text-3xl font-bold">{{data.total.recovered| numeralFormat}}</div>
                    </div>
                </div>
                <div class="text-xs mb-4">As of {{moment(data.total.date).format('YYYY-MM-DD')}}</div>
            </div>
            <div class="px-2 mx-4 py-2 flex text-xs font-bold justify-between bg-slab-primary rounded-t h-8">
                <div class="justify-center flex w-full items-end">
                    <div class="w-24">Date</div>
                    <div class="w-32">Confirmed</div>
                    <div class="w-32">Deaths</div>
                    <div class="w-32">Recovered</div>
                    <div class="w-32">New Cases</div>
                    <div class="w-32">5D Ave</div>
                    <div class="w-32">Growth Factor</div>
                </div>
            </div>
        </div>
        <simplebar data-simplebar-auto-hide="false" class="top-0 right-0 bottom-0 left-0 bg-slab absolute m-4 mt-52 rounded" style="position:absolute">
            <div

                v-for="(row, key, index) in daily.reverse()"
            >
                <div v-if="getDayNotes(moment(row['date']).format('YYYY-MM-DD')).length > 0">
                    <div v-for="annotation in getDayNotes(moment(row['date']).format('YYYY-MM-DD'))"
                         class="p-1 m-1 text-xs rounded bg-slab-primary flex justify-center"
                    >
                        <div class="w-216 flex">
                            <div v-if="annotation.state.length > 0" class="font-bold mr-2">{{annotation.state}}</div>
                            <div>
                                <div>{{annotation.notes}}</div>
                                <div v-if="annotation.url" class="flex items-center text-lightslab">
                                    <div class="mr-1">Source:</div>
                                    <a class="underline hover:text-white truncate ... inline-block w-64" :href="annotation.url">{{annotation.url}}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="p-2 text-xs"
                                         :class="key % 2 == 1 ? 'bg-slab-secondary' : ''">

                    <div class="w-full flex justify-center">
                        <div class="w-24">{{moment(row['date']).format('YYYY-MM-DD')}}</div>
                        <div class="w-32">
                            {{ isNaN(row.confirmed) ? 0 : row.confirmed | numeralFormat}}
                            <span class="text-red-400" v-if="row.deltaConfirmed >= 0">(+{{row.deltaConfirmed| numeralFormat}})</span>
                            <span class="text-green-400" v-else>({{row.deltaConfirmed| numeralFormat}})</span>
                        </div>
                        <div class="w-32">
                            {{ isNaN(row.deaths) ? 0 : row.deaths | numeralFormat}}
                            <span class="text-red-400" v-if="row.deltaDeaths >= 0">(+{{row.deltaDeaths| numeralFormat}})</span>
                            <span class="text-green-400" v-else>({{row.deltaDeaths| numeralFormat}})</span>
                        </div>
                        <div class="w-32">
                            {{ isNaN(row.recovered) ? 0 : row.recovered | numeralFormat}}
                            <span class="text-green-400" v-if="row.deltaRecovered >= 0">(+{{row.deltaRecovered| numeralFormat}})</span>
                            <span class="text-red-400" v-else>({{row.deltaRecovered| numeralFormat}})</span>
                        </div>
                        <div class="w-32">
                            {{data.growth[key]}}
                        </div>
                        <div class="w-32">
                            {{data.average[key]}}
                        </div>
                        <div class="w-32">
                            <span class="text-red-400" v-if="row.growthFactor > 1">{{row.growthFactor}}</span>
                            <span class="text-green-400" v-else>{{row.growthFactor}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </simplebar>


        <FullCountry v-if="expanded"
                     :data="recomputed"
                    v-on:close="toggleExpand"
        />
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
                this.$emit('remove',item);
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
            annotations()
            {
                var data = [];
                for(var x in this.data.annotations)
                {
                    if(this.data.annotations[x].country == 'All')
                    {
                        data.push(this.data.annotations[x]);
                    }
                    else if(this.data.annotations[x].state && this.data.name.state == this.data.annotations[x].state)
                    {
                        console.log('Comparing ' + this.data.name.state + ' vs ' + this.data.annotations[x].state);
                        data.push(this.data.annotations[x]);
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
                var data = [];
                for(var x in this.recomputed.daily)
                {
                    var row = this.recomputed.daily[x];

                    data.push({
                        date: moment(row['date']).format('YYYY-MM-DD'),
                        confirmed: row.confirmed,
                        deltaConfirmed: this.recomputed.delta[x].confirmed,
                        deaths: row.deaths,
                        deltaDeaths: this.recomputed.delta[x].deaths,
                        recovered: row.recovered,
                        deltaRecovered: this.recomputed.delta[x].recovered,
                        growthFactor: this.recomputed.growthFactor[x],
                    });
                }
                return data;
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
