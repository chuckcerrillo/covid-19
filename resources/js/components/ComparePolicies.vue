<template>
    <div class="h-full">
        <div class="m-4" v-if="1==2">

            <div class="my-2 py-2 pb-4 px-4 bg-slab-primary rounded">
                <span class="font-bold">Select date</span>
                <v-date-picker
                    v-model="date"
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
                <vue-slider v-model="date" :data="dateSliderRange" :lazy="true" :adsorb="true" />
            </div>
        </div>
        <div class="absolute top-0 left-0 right-0 bottom-0 m-4" style="position:absolute; top: 5.5rem">
            <simplebar data-simplebar-auto-hide="false" class="w-full h-full">
                <div class="flex justify-start rounded-t z-10 relative bg-slab-primary" style="min-width: 75rem;">
                    <div class="bg-slab-primary justify-start items-end border-lightslab w-36 text-xs font-bold flex-shrink-0">
                        <div class="px-4 py-2 h-12"></div>
                    </div>
                    <div
                        class="border-l flex-shrink-0
                        border-lightslab w-64"
                        v-for="(row, key, index) in data"
                    >
                        <div class="w-full">
                            <div class="px-4 py-2 text-2xl h-12 bg-slab-primary">
                                <div class="truncate ... font-bold">{{row.name}}</div>
                            </div>
                        </div>
                     </div>
                    <div class="px-4 py-2 h-20 border-l border-lightslab"></div>
                </div>
                <simplebar data-simplebar-auto-hide="false" class="inner-scrollbar bg-slab rounded absolute inset-x-0 bottom-0" style="min-width: 75rem; position: absolute; top: 80px;" :style="'min-width: ' + (9 + (data.length * 16)) + 'em'">
                    <div class="flex justify-start rounded-t z-10 relative bg-slab">
                        <div class="bg-slab-primary justify-start items-end border-b border-lightslab w-36 text-xs font-bold flex-shrink-0">
                            <div class="px-4 py-2 h-24">Stringency Index</div>
                            <div class="px-4 py-2 h-16 bg-darkslab border-b border-slab">Containment and closure</div>
                            <div class="px-4 py-2 h-24 border-b border-slab">C1 - Schools</div>
                            <div class="px-4 py-2 h-24 border-b border-slab">C2 - Workplaces</div>
                            <div class="px-4 py-2 h-24 border-b border-slab">C3 - Public events</div>
                            <div class="px-4 py-2 h-24 border-b border-slab">C4 - Restrictions on gatherings</div>
                            <div class="px-4 py-2 h-24 border-b border-slab">C5 - Public transport</div>
                            <div class="px-4 py-2 h-24 border-b border-slab">C6 - Stay at home</div>
                            <div class="px-4 py-2 h-24 border-b border-slab">C7 - Internal movements</div>
                            <div class="px-4 py-2 h-16 border-b border-slab">C8 - International travel</div>
                            <div class="px-4 py-2 h-16 bg-darkslab border-b border-slab">Economic response</div>
                            <div class="px-4 py-2 h-24 border-b border-slab">E1 - Income support</div>
                            <div class="px-4 py-2 h-20 border-b border-slab">E2 - Debt/contract relief</div>
                            <div class="px-4 py-2 h-20 border-b border-slab">E3 - Fiscal measures</div>
                            <div class="px-4 py-2 h-20 border-b border-slab">E4 - International support</div>
                            <div class="px-4 py-2 h-16 bg-darkslab border-b border-slab">Health systems</div>
                            <div class="px-4 py-2 h-24 border-b border-slab">H1 - Public information campaign</div>
                            <div class="px-4 py-2 h-20 border-b border-slab">H2 - Testing policy</div>
                            <div class="px-4 py-2 h-20 border-b border-slab">H3 - Contact tracing</div>
                            <div class="px-4 py-2 h-20 border-b border-slab">H4 - Emergency healthcare investment</div>
                            <div class="px-4 py-2 h-20 border-b border-slab">H5 - COVID-19 vaccine investment</div>
                            <div class="px-4 py-2 h-16 bg-darkslab border-b border-slab">Miscellaneous</div>
                            <div class="px-4 py-2 h-24 border-b border-slab">M1 - Other responses</div>
                        </div>
                        <div class="flex-shrink-0 flex">
                            <div
                                 class="border-l border-b border-lightslab flex-shrink-0 w-64"
                                v-for="(row, key, index) in comparison"
                            >
                                <div class=""
                                     :class="index % 2 == 1 ? 'bg-slab-primary' : ''">

                                    <div class="w-full">
                                        <div class="px-4 py-2 h-24 text-5xl font-bold">
                                            <div v-if="!isNaN(row.stringencyindex)">{{row.stringencyindex | numeralFormat('0.00')}}</div>
                                            <div v-else>N/A</div>
                                        </div>

                                        <div class="px-4 py-2 h-16 bg-darkslab border-b border-lightslab">
                                        </div>

                                        <div class="px-4 py-2 h-24 border-b border-lightslab">
                                            <div v-if="row.latest.C1.value.length > 60" class="text-xs">{{row.latest.C1.value}}</div>
                                            <div v-else-if="row.latest.C1.value.length > 30" class="text-sm">{{row.latest.C1.value}}</div>
                                            <div v-else-if="row.latest.C1.value">{{row.latest.C1.value}}</div>
                                            <div v-else>N/A</div>
                                            <div v-if="row.latest.C1.target" class="text-xs text-lightlabel">({{row.latest.C1.target}})</div>
                                        </div>

                                        <div class="px-4 py-2 h-24 border-b border-lightslab">
                                            <div v-if="row.latest.C2.value.length > 60" class="text-xs">{{row.latest.C2.value}}</div>
                                            <div v-else-if="row.latest.C2.value.length > 30" class="text-sm">{{row.latest.C2.value}}</div>
                                            <div v-else-if="row.latest.C2.value">{{row.latest.C2.value}}</div>
                                            <div v-else>N/A</div>
                                            <div v-if="row.latest.C2.target" class="text-xs text-lightlabel">({{row.latest.C2.target}})</div>
                                        </div>

                                        <div class="px-4 py-2 h-24 border-b border-lightslab">
                                            <div v-if="row.latest.C3.value.length > 60" class="text-xs">{{row.latest.C3.value}}</div>
                                            <div v-else-if="row.latest.C3.value.length > 30" class="text-sm">{{row.latest.C3.value}}</div>
                                            <div v-else-if="row.latest.C3.value">{{row.latest.C3.value}}</div>
                                            <div v-else>N/A</div>
                                            <div v-if="row.latest.C3.target" class="text-xs text-lightlabel">({{row.latest.C3.target}})</div>
                                        </div>

                                        <div class="px-4 py-2 h-24 border-b border-lightslab">
                                            <div v-if="row.latest.C4.value.length > 60" class="text-xs">{{row.latest.C4.value}}</div>
                                            <div v-else-if="row.latest.C4.value.length > 30" class="text-sm">{{row.latest.C4.value}}</div>
                                            <div v-else-if="row.latest.C4.value">{{row.latest.C4.value}}</div>
                                            <div v-else>N/A</div>
                                            <div v-if="row.latest.C4.target" class="text-xs text-lightlabel">({{row.latest.C4.target}})</div>
                                        </div>

                                        <div class="px-4 py-2 h-24 border-b border-lightslab">
                                            <div v-if="row.latest.C5.value.length > 60" class="text-xs">{{row.latest.C5.value}}</div>
                                            <div v-else-if="row.latest.C5.value.length > 30" class="text-sm">{{row.latest.C5.value}}</div>
                                            <div v-else-if="row.latest.C5.value">{{row.latest.C5.value}}</div>
                                            <div v-else>N/A</div>
                                            <div v-if="row.latest.C5.target" class="text-xs text-lightlabel">({{row.latest.C5.target}})</div>
                                        </div>

                                        <div class="px-4 py-2 h-24 border-b border-lightslab">
                                            <div v-if="row.latest.C6.value.length > 60" class="text-xs">{{row.latest.C6.value}}</div>
                                            <div v-else-if="row.latest.C6.value.length > 30" class="text-sm">{{row.latest.C6.value}}</div>
                                            <div v-else-if="row.latest.C6.value">{{row.latest.C6.value}}</div>
                                            <div v-else>N/A</div>
                                            <div v-if="row.latest.C6.target" class="text-xs text-lightlabel">({{row.latest.C6.target}})</div>
                                        </div>

                                        <div class="px-4 py-2 h-24 border-b border-lightslab">
                                            <div v-if="row.latest.C7.value.length > 60" class="text-xs">{{row.latest.C7.value}}</div>
                                            <div v-else-if="row.latest.C7.value.length > 30" class="text-sm">{{row.latest.C7.value}}</div>
                                            <div v-else-if="row.latest.C7.value">{{row.latest.C7.value}}</div>
                                            <div v-else>N/A</div>
                                            <div v-if="row.latest.C7.target" class="text-xs text-lightlabel">({{row.latest.C7.target}})</div>
                                        </div>

                                        <div class="px-4 py-2 h-16 border-b border-lightslab">
                                            <div v-if="row.latest.C8.value.length > 60" class="text-xs">{{row.latest.C8.value}}</div>
                                            <div v-else-if="row.latest.C8.value.length > 30" class="text-sm">{{row.latest.C8.value}}</div>
                                            <div v-else-if="row.latest.C8.value">{{row.latest.C8.value}}</div>
                                            <div v-else>N/A</div>
                                        </div>

                                        <div class="px-4 py-2 h-16 bg-darkslab border-b border-lightslab">
                                        </div>

                                        <div class="px-4 py-2 h-24 border-b border-lightslab">
                                            <div v-if="row.latest.E1.value.length > 60" class="text-xs">{{row.latest.E1.value}}</div>
                                            <div v-else-if="row.latest.E1.value.length > 30" class="text-sm">{{row.latest.E1.value}}</div>
                                            <div v-else-if="row.latest.E1.value">{{row.latest.E1.value}}</div>
                                            <div v-else>N/A</div>
                                            <div v-if="row.latest.E1.target" class="text-xs text-lightlabel">({{row.latest.E1.target}})</div>
                                        </div>

                                        <div class="px-4 py-2 h-20 border-b border-lightslab">
                                            <div v-if="row.latest.E2.value.length > 60" class="text-xs">{{row.latest.E2.value}}</div>
                                            <div v-else-if="row.latest.E2.value.length > 30" class="text-sm">{{row.latest.E2.value}}</div>
                                            <div v-else-if="row.latest.E2.value">{{row.latest.E2.value}}</div>
                                            <div v-else>N/A</div>
                                        </div>

                                        <div class="px-4 py-2 h-20 border-b border-lightslab">
                                            <div v-if="row.latest.E3.value">US${{row.latest.E3.value | numeralFormat('0,000.00')}}</div>
                                            <div v-else>N/A</div>
                                        </div>

                                        <div class="px-4 py-2 h-20 border-b border-lightslab">
                                            <div v-if="row.latest.E4.value">US${{row.latest.E4.value | numeralFormat('0,000.00')}}</div>
                                            <div v-else>N/A</div>
                                        </div>

                                        <div class="px-4 py-2 h-16 bg-darkslab border-b border-lightslab">
                                        </div>

                                        <div class="px-4 py-2 h-24 border-b border-lightslab">
                                            <div v-if="row.latest.H1.value.length > 60" class="text-xs">{{row.latest.H1.value}}</div>
                                            <div v-else-if="row.latest.H1.value.length > 30" class="text-sm">{{row.latest.H1.value}}</div>
                                            <div v-else-if="row.latest.H1.value">{{row.latest.H1.value}}</div>
                                            <div v-else>N/A</div>
                                            <div v-if="row.latest.H1.target" class="text-xs text-lightlabel">({{row.latest.H1.target}})</div>
                                        </div>

                                        <div class="px-4 py-2 h-20 border-b border-lightslab">
                                            <div v-if="row.latest.H2.value.length > 60" class="text-xs">{{row.latest.H2.value}}</div>
                                            <div v-else-if="row.latest.H2.value.length > 30" class="text-sm">{{row.latest.H2.value}}</div>
                                            <div v-else-if="row.latest.H2.value">{{row.latest.H2.value}}</div>
                                            <div v-else>N/A</div>
                                        </div>

                                        <div class="px-4 py-2 h-20 border-b border-lightslab">
                                            <div v-if="row.latest.H3.value.length > 60" class="text-xs">{{row.latest.H3.value}}</div>
                                            <div v-else-if="row.latest.H3.value.length > 30" class="text-sm">{{row.latest.H3.value}}</div>
                                            <div v-else-if="row.latest.H3.value">{{row.latest.H3.value}}</div>
                                            <div v-else>N/A</div>
                                        </div>

                                        <div class="px-4 py-2 h-20 border-b border-lightslab">
                                            <div v-if="row.latest.H4.value">US${{row.latest.H4.value | numeralFormat('0,000.00')}}</div>
                                            <div v-else>N/A</div>
                                        </div>

                                        <div class="px-4 py-2 h-20 border-b border-lightslab">
                                            <div v-if="row.latest.H5.value">US${{row.latest.H5.value | numeralFormat('0,000.00')}}</div>
                                            <div v-else>N/A</div>
                                        </div>

                                        <div class="px-4 py-2 h-16 bg-darkslab border-b border-lightslab">
                                        </div>

                                        <div class="px-4 py-2 h-24 border-b border-lightslab">
                                            <div v-if="row.latest.M1.value.length > 60" class="text-xs">{{row.latest.M1.value}}</div>
                                            <div v-else-if="row.latest.M1.value.length > 30" class="text-sm">{{row.latest.M1.value}}</div>
                                            <div v-else-if="row.latest.M1.value">{{row.latest.M1.value}}</div>
                                            <div v-else>N/A</div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="border-l border-lightslab h-full"></div>
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
                        max: false,
                    }
                }
            }
        },
        created()
        {
            this.date = moment().subtract(1,'d').format('YYYY-MM-DD');
            this.options.date.max = this.date;
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

            config() {
                return {
                    'absolute': (this.settings && this.settings.absolute) ? this.settings.absolute : false,
                    'solo': (this.settings && this.settings.solo) ? this.settings.solo : false,
                }
            },
            comparison()
            {
                var data = [];
                for(var x in this.data)
                {
                    var policies = _.clone(this.data[x]);
                    var row = {
                        'name': policies.name,
                        'stringencyindex' : policies.stringencyindex,
                        'latest' : {},
                    };
                    for(var y in policies.latest)
                    {
                        row.latest[policies.latest[y].id] = policies.latest[y]
                    }

                    var list = ['C1','C2','C3','C4','C5','C6','C7','C8','E1','E2','E3','E4','H1','H2','H3','H4','H5','M1'];
                    for(var y in list)
                    {
                        var field = list[y];

                        if(!row.latest[field])
                        {
                            row.latest[field] = {
                                value: false,
                                target: false,
                            }
                        }
                    }

                    data.push(row);
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
            }
        }
    }
</script>

<style>
.inner-scrollbar .simplebar-track.simplebar-horizontal {
    visibility: hidden !important;
}
</style>
