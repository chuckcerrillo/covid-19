<template>
    <div>
        <div
            class="absolute top-0 right-0 text-xs px-4 py-2 hover:text-white cursor-pointer hover:bg-lightslab rounded z-10"
            @click="remove([data.name.country,data.name.state])"
        >Remove</div>
        <div class="mx-6 pt-4 relative">
            <h2 class="font-bold text-2xl">{{data.name.country}}</h2>
            <h3 class="h-4 font-bold">{{data.name.state}}</h3>
            <div class="flex text-sm mt-4 w-full items-center">
                <div class="text-center pr-4">
                    <div class="text-xs font-bold">Confirmed</div>
                    <div class="text-3xl font-bold">{{data.total.confirmed| numeralFormat}}</div>
                </div>
                <div class="text-center pr-4">
                    <div class="text-xs font-bold">Deaths</div>
                    <div class="text-3xl font-bold">{{data.total.deaths| numeralFormat}}</div>
                </div>
                <div class="text-center">
                    <div class="text-xs font-bold">Recovered</div>
                    <div class="text-3xl font-bold">{{data.total.recovered| numeralFormat}}</div>
                </div>
            </div>
            <div class="text-xs mb-4">As of {{data.total.date}}</div>
        </div>
        <div class="px-2 mx-4 py-2 pb-4 flex text-xs font-bold justify-between bg-slab-primary rounded-t">
            <div class="justify-end flex w-full items-end">
                <div class="w-20">Date</div>
                <div class="w-20">Confirmed</div>
                <div class="w-20">Deaths</div>
                <div class="w-20">Recovered</div>
<!--                <div class="w-20">New Cases</div>-->
<!--                <div class="w-20">5D Ave</div>-->
                <div class="w-20">Growth Factor</div>
            </div>
        </div>
        <simplebar data-simplebar-auto-hide="false" class="top-0 right-0 left-0 bottom-0 mt-60 mx-4 mb-16 mr-4 bg-slab rounded-b" style="position:absolute;" >
            <div

                v-for="(row, key, index) in recomputed.daily"
            >
                <div class="p-2 text-xs">
<!--                     :class="key % 2 == 1 ? 'bg-slab-secondary' : ''"-->

                    <div class="w-full flex justify-end">
                        <div class="w-20">{{moment(row['date']).format('YYYY-MM-DD')}}</div>
                        <div class="w-20">
                            {{ isNaN(row.confirmed) ? 0 : row.confirmed | numeralFormat}}
                            <span class="text-green-400" v-if="data.delta[key].confirmed >= 0">(+{{data.delta[key].confirmed| numeralFormat}})</span>
                            <span class="text-red-400" v-else>({{data.delta[key].confirmed| numeralFormat}})</span>
                        </div>
                        <div class="w-20">
                            {{ isNaN(row.deaths) ? 0 : row.deaths | numeralFormat}}
                            <span class="text-green-400" v-if="data.delta[key].deaths >= 0">(+{{data.delta[key].deaths| numeralFormat}})</span>
                            <span class="text-red-400" v-else>({{data.delta[key].deaths| numeralFormat}})</span>
                        </div>
                        <div class="w-20">
                            {{ isNaN(row.recovered) ? 0 : row.recovered | numeralFormat}}
                            <span class="text-green-400" v-if="data.delta[key].recovered >= 0">(+{{data.delta[key].recovered| numeralFormat}})</span>
                            <span class="text-red-400" v-else>({{data.delta[key].recovered| numeralFormat}})</span>
                        </div>
    <!--                    <div class="w-20">-->
    <!--                        {{data.growth[key]}}-->
    <!--                    </div>-->
    <!--                    <div class="w-20">-->
    <!--                        {{data.average[key]}}-->
    <!--                    </div>-->
                        <div class="w-20">
                            {{data.growthFactor[key]}}
                        </div>
                    </div>
                </div>
                <div v-if="getDayNotes(moment(row['date']).format('YYYY-MM-DD')).length > 0">
                    <div v-for="annotation in getDayNotes(moment(row['date']).format('YYYY-MM-DD'))"
                         class="p-1 m-1 text-xs rounded bg-slab-primary flex"
                    >
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
        </simplebar>
        <div
            class="absolute right-0 bottom-0 mr-4 mb-4 text-xs px-4 py-2 hover:text-white cursor-pointer rounded bg-slab-primary hover:bg-lightslab"
            @click="toggleExpand()"
        >View full stats</div>
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
                    if (this.data.annotations[x].date == date)
                    {
                        data.push(this.data.annotations[x]);
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
            },
            recomputed()
            {
                this.recomputeGrowth();
                return this.recomputed_data;
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
