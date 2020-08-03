<template>
    <div>
        <div
            class="flex hover:bg-lightslab cursor-pointer items-center h-8"
            :class="
                (config.dashboard ? 'justify-center ' : '')
                +
                (isSelected(data.name.country,false) ? 'bg-hoverslab ' : ((country_key % 2 === 1) ? 'bg-slab-primary ':'bg-slab-secondary '))
            "
        >
            <div class="w-10 p-2 m-1 ml-0">
                <div class="rounded bg-white font-bold px-1 text-xs text-center text-baseslab inline-block">{{rank}}</div>
            </div>
            <div v-if="data.states.length <= 1" class="w-4 p-2 m-1 ml-0"></div>
            <div v-else
                 class="w-5 m-0 text-white border border-transparent hover:border-white rounded text-center font-bold"
                 @click="toggleExpand()"
            >
                <div v-if="expanded">-</div>
                <div v-else>+</div>
            </div>
            <div @click="selectCountry(data.name.country,false)" class="text-xs py-1 w-32 px-2 font-bold">{{data.name.country}}</div>
            <div
                v-for="metric in fields"
                v-if="fields.indexOf(metric) >= 0"
                @click="selectCountry(data.name.country,data.name.state)"
                class="text-xs pl-2 py-1 w-20"
            >
                <div v-if="metric === 'confirmed'">{{data.total.c| numeralFormat}}</div>
                <div v-else-if="metric === 'deaths'">{{data.total.d| numeralFormat}}</div>
                <div v-else-if="metric === 'recovered'">{{data.total.r| numeralFormat}}</div>
                <div v-else-if="metric === 'active'">{{data.total.a| numeralFormat}}</div>

                <div v-else-if="metric === 'confirmedDelta'">{{data.total.delta.c| numeralFormat}}</div>
                <div v-else-if="metric === 'deathsDelta'">{{data.total.delta.d| numeralFormat}}</div>
                <div v-else-if="metric === 'recoveredDelta'">{{data.total.delta.r| numeralFormat}}</div>

                <div v-else-if="metric === 'confirmedCapita'">{{data.total.capita.c| numeralFormat}}</div>
                <div v-else-if="metric === 'deathsCapita'">{{data.total.capita.d| numeralFormat}}</div>
                <div v-else-if="metric === 'recoveredCapita'">{{data.total.capita.r| numeralFormat}}</div>
                <div v-else-if="metric === 'activeCapita'">{{data.total.capita.a| numeralFormat}}</div>

                <div v-else-if="metric === 'confirmedAverage'">{{data.total.average.c| numeralFormat}}</div>
                <div v-else-if="metric === 'deathsAverage'">{{data.total.average.d| numeralFormat}}</div>
                <div v-else-if="metric === 'recoveredAverage'">{{data.total.average.r| numeralFormat}}</div>

                <div v-else-if="metric === 'deathsRate'">{{data.total.rate.d| numeralFormat('0,000.000%')}}</div>
                <div v-else-if="metric === 'recoveredRate'">{{data.total.rate.r| numeralFormat('0,000.000%')}}</div>

                <div v-else-if="metric === 'growthFactor'">{{data.total.growth.c| numeralFormat('0.000')}}</div>

                <div v-else-if="metric === 'population'">{{data.population| numeralFormat('0,000')}}</div>

            </div>

        </div>
        <div v-if="row.total && row.total.delta" v-for="(row,key,index) in data.states" class="pb-1 hover:bg-lightslab cursor-pointer flex items-center text-xs" v-show="expanded"
             :key="key"
            :class="
            (config.dashboard ? 'justify-center ' : '')
                +
            (isSelected(data.name.country,row.name.state) ? 'bg-hoverslab' : 'bg-darkslab')
            "
        >
            <div class="w-10 p-2 m-1 ml-0">
                <div class="px-1 text-xs"></div>
            </div>
            <div class="w-4 p-2 m-1 ml-0"></div>
            <div @click="selectCountry(data.name.country,row.name.state)" class="w-32 px-2">
                <div>{{row.name.state}}</div>
            </div>


            <div
                v-for="metric in fields"
                v-if="fields.indexOf(metric) >= 0"
                @click="selectCountry(row.name.country,row.name.state)"
                class="text-xs pl-2 py-1 w-20"
            >
                <div v-if="metric === 'confirmed'">{{row.total.c| numeralFormat}}</div>
                <div v-else-if="metric === 'deaths'">{{row.total.d| numeralFormat}}</div>
                <div v-else-if="metric === 'recovered'">{{row.total.r| numeralFormat}}</div>
                <div v-else-if="metric === 'active'">{{row.total.a| numeralFormat}}</div>

                <div v-else-if="metric === 'confirmedDelta'">{{row.total.delta.c| numeralFormat}}</div>
                <div v-else-if="metric === 'deathsDelta'">{{row.total.delta.d| numeralFormat}}</div>
                <div v-else-if="metric === 'recoveredDelta'">{{row.total.delta.r| numeralFormat}}</div>

                <div v-else-if="metric === 'confirmedCapita'">{{row.total.capita.c| numeralFormat}}</div>
                <div v-else-if="metric === 'deathsCapita'">{{row.total.capita.d| numeralFormat}}</div>
                <div v-else-if="metric === 'recoveredCapita'">{{row.total.capita.r| numeralFormat}}</div>
                <div v-else-if="metric === 'activeCapita'">{{row.total.capita.a| numeralFormat}}</div>

                <div v-else-if="metric === 'confirmedAverage'">{{row.total.average.c| numeralFormat}}</div>
                <div v-else-if="metric === 'deathsAverage'">{{row.total.average.d| numeralFormat}}</div>
                <div v-else-if="metric === 'recoveredAverage'">{{row.total.average.r| numeralFormat}}</div>

                <div v-else-if="metric === 'deathsRate'">{{row.total.rate.d| numeralFormat('0,000.000%')}}</div>
                <div v-else-if="metric === 'recoveredRate'">{{row.total.rate.r| numeralFormat('0,000.000%')}}</div>

                <div v-else-if="metric === 'growthFactor'">{{row.total.growth.c| numeralFormat('0.000')}}</div>

                <div v-else-if="metric === 'population'">{{row.population| numeralFormat('0,000')}}</div>
            </div>

            <div v-if="config.dashboard" class="w-120"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CountryStateItem",
        props:[
            'data',
            'country_key',
            'compare',
            'sidebarExpanded',
            'settings',
            'fields',
            'rank',
            'favourite',
        ],
        data(){
            return {
                'expanded' : false
            }
        },
        methods: {
            isSelected(country,state)
            {
                for(var x in this.compare)
                {
                    var item = this.compare[x];
                    if(country === item.country)
                    {
                        if (state === false)
                        {
                            return true;
                        }
                        else if (state === item.state)
                        {
                            return true;
                        }
                    }
                }
                return false;
            },
            selectCountry(country,state)
            {
                this.$emit('selectCountry',country,state);
            },
            toggleExpand()
            {
                this.expanded = !this.expanded;
            }
        },
        computed: {
            config()
            {
                return {
                    dashboard: (this.settings && this.settings.dashboard === true) ? this.settings.dashboard : false,
                }
            }
        }
    }
</script>

<style scoped>

</style>
