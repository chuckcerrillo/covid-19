<template>
    <div>
        <div
            class="flex cursor-pointer items-center h-12 xl:h-8"
            :class="
                (config.dashboard ? 'justify-center ' : '')
                +
                (isSelected(data.name.country,false) ? 'bg-orangeslab' : ((country_key % 2 == 1) ? 'bg-heading ':'bg-heading-secondary '))
            "
        >
            <div class="w-10 p-2 m-1 ml-0">
                <div class="rounded bg-white font-bold px-1 text-xs text-center text-baseslab inline-block">{{rank}}</div>
            </div>
            <div v-if="data.states.length <= 1" class="w-4 p-2 m-1 ml-0"></div>
            <div v-else
                 class="w-5 m-0 text-lightslab border border-transparent hover:border-white rounded text-center font-bold"
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
                <div v-if="metric === 'confirmed'">{{humanReadable(data.total.c)}}</div>
                <div v-else-if="metric === 'deaths'">{{humanReadable(data.total.d)}}</div>
                <div v-else-if="metric === 'recovered'">{{humanReadable(data.total.r)}}</div>
                <div v-else-if="metric === 'active'">{{humanReadable(data.total.a)}}</div>

                <div v-else-if="metric === 'confirmedDelta'">{{humanReadable(data.total.delta.c)}}</div>
                <div v-else-if="metric === 'deathsDelta'">{{humanReadable(data.total.delta.d)}}</div>
                <div v-else-if="metric === 'recoveredDelta'">{{humanReadable(data.total.delta.r)}}</div>

                <div v-else-if="metric === 'confirmedCapita'">{{humanReadable(data.total.capita.c,'0,000.00')}}</div>
                <div v-else-if="metric === 'deathsCapita'">{{humanReadable(data.total.capita.d,'0,000.00')}}</div>
                <div v-else-if="metric === 'recoveredCapita'">{{humanReadable(data.total.capita.r,'0,000.00')}}</div>
                <div v-else-if="metric === 'activeCapita'">{{humanReadable(data.total.capita.a,'0,000.00')}}</div>

                <div v-else-if="metric === 'confirmedAverage'">{{humanReadable(data.total.average.c,'0,000.00')}}</div>
                <div v-else-if="metric === 'deathsAverage'">{{humanReadable(data.total.average.d,'0,000.00')}}</div>
                <div v-else-if="metric === 'recoveredAverage'">{{humanReadable(data.total.average.r,'0,000.00')}}</div>

                <div v-else-if="metric === 'deathsRate'">{{data.total.rate.d| numeralFormat('0,000.000%')}}</div>
                <div v-else-if="metric === 'recoveredRate'">{{data.total.rate.r| numeralFormat('0,000.000%')}}</div>

                <div v-else-if="metric === 'growthFactor'">{{data.total.growth.c| numeralFormat('0.000')}}</div>

                <div v-else-if="metric === 'population'">{{humanReadable(data.population)}}</div>
            </div>
<!--            <div v-if="config.dashboard" @click="selectCountry(data['name'],false)" class="text-xs pl-2 py-1 w-20">{{data.total.active|numeralFormat}}</div>-->
<!--            <div v-if="config.dashboard" @click="selectCountry(data['name'],false)" class="text-xs pl-2 py-1 w-20">{{data.population|numeralFormat}}</div>-->
<!--            <div v-if="config.dashboard" @click="selectCountry(data['name'],false)" class="text-xs pl-2 py-1 w-20">{{data.total.confirmedpc|numeralFormat('0,000.00')}}</div>-->
<!--            <div v-if="config.dashboard" @click="selectCountry(data['name'],false)" class="text-xs pl-2 py-1 w-20">{{data.total.deathspc|numeralFormat('0,000.00')}}</div>-->
<!--            <div v-if="config.dashboard" @click="selectCountry(data['name'],false)" class="text-xs pl-2 py-1 w-20">{{data.total.recoveredpc|numeralFormat('0,000.00')}}</div>-->
<!--            <div v-if="config.dashboard" @click="selectCountry(data['name'],false)" class="text-xs pl-2 py-1 w-20">{{data.total.stringencyindex}}</div>-->
        </div>
        <div v-for="row in data.states" class="pb-1 cursor-pointer flex items-center text-xs" v-show="expanded"
            :class="
            (config.dashboard ? 'justify-center ' : '')
                +
            (isSelected(data.name.country,row.name.state) ? 'bg-orangeslab' : 'bg-heading-secondary')
            "
        >
            <div class="w-4 p-2 m-1 ml-0 h-12 xl:h-auto"></div>
            <div @click="selectCountry(data.name.country,row.name.state)" class="w-32 px-2">
                <div>{{row.name.state}}</div>
            </div>
            <div
                v-for="metric in fields"
                v-if="fields.indexOf(metric) >= 0"
                @click="selectCountry(row.name.country,row.name.state)"
                class="text-xs pl-2 py-1 w-20"
            >
                <div v-if="metric === 'confirmed'">{{humanReadable(row.total.c)}}</div>
                <div v-else-if="metric === 'deaths'">{{humanReadable(row.total.d)}}</div>
                <div v-else-if="metric === 'recovered'">{{humanReadable(row.total.r)}}</div>
                <div v-else-if="metric === 'active'">{{humanReadable(row.total.a)}}</div>

                <div v-else-if="metric === 'confirmedDelta'">{{humanReadable(row.total.delta.c)}}</div>
                <div v-else-if="metric === 'deathsDelta'">{{humanReadable(row.total.delta.d)}}</div>
                <div v-else-if="metric === 'recoveredDelta'">{{humanReadable(row.total.delta.r)}}</div>

                <div v-else-if="metric === 'confirmedCapita'">{{humanReadable(row.total.capita.c,'0,000.00')}}</div>
                <div v-else-if="metric === 'deathsCapita'">{{humanReadable(row.total.capita.d,'0,000.00')}}</div>
                <div v-else-if="metric === 'recoveredCapita'">{{humanReadable(row.total.capita.r,'0,000.00')}}</div>
                <div v-else-if="metric === 'activeCapita'">{{humanReadable(row.total.capita.a,'0,000.00')}}</div>

                <div v-else-if="metric === 'confirmedAverage'">{{humanReadable(row.total.average.c,'0,000.00')}}</div>
                <div v-else-if="metric === 'deathsAverage'">{{humanReadable(row.total.average.d,'0,000.00')}}</div>
                <div v-else-if="metric === 'recoveredAverage'">{{humanReadable(row.total.average.r,'0,000.00')}}</div>

                <div v-else-if="metric === 'deathsRate'">{{row.total.rate.d| numeralFormat('0,000.000%')}}</div>
                <div v-else-if="metric === 'recoveredRate'">{{row.total.rate.r| numeralFormat('0,000.000%')}}</div>

                <div v-else-if="metric === 'growthFactor'">{{row.total.growth.c| numeralFormat('0.000')}}</div>

                <div v-else-if="metric === 'population'">{{humanReadable(row.population)}}</div>
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
            },
            humanReadable(value,format)
            {
                var numeral = require('numeral');
                if(!format)
                {
                    var format = '0,000.0';
                }

                if(value < 1000)
                {
                    return numeral(value).format(format);
                }
                else if(value < 1000000)
                {
                    return numeral(value / 1000).format(format) + 'k';
                }
                else if(value < 1000000000)
                {
                    return numeral(value / 1000000).format(format) + 'M';
                }
                else if(value < 1000000000000)
                {
                    return numeral(value / 1000000000).format(format) + 'B';
                }
            }
        },
        computed: {
            config()
            {
                return {
                    dashboard: (this.settings && this.settings.dashboard == true) ? this.settings.dashboard : false,
                }
            }
        }
    }
</script>

<style scoped>

</style>
