<template>
    <div class="absolute inset-x-0 top-0 bottom-4">
        <div class="absolute inset-x-0 top-0 bottom-5">
            <keep-alive>
                <Map
                    class="absolute inset-x-0 inset-y-0"
                    id="world_map"
                    :enable="true"
                    :data="countries_sorted"
                    :database="database"
                    :date="date"
                    :rankings="ajax.rankings"
                    :layers="layers"
                    :settings="{interactive:true,zoom:0,stops: options.stops}"
                    :location="location"
                />
            </keep-alive>
        </div>
        <div @click="ui.events = true" :class="ui.events || ui.markers ? 'hidden' : 'block'" class="absolute top-0 left-0 z-20 p-2 rounded" style="background: rgba(0,0,0,0.5); top: 1rem; left: 1rem;">Events</div>
        <div v-if="ui.events" class="absolute top-0 bottom-5 inset-x-0 p-2 z-30" style="background: rgba(0,0,0,0.75)">
            <div @click="ui.events = false" class="font-bold mb-2">Close</div>
            <simplebar data-simplebar-auto-hide="true" class="p-2 text-sm absolute top-3 bottom-1 inset-x-0" style="position: absolute">
                <!--                                        {{getAnnotations()}}-->
                <ul>
                    <li v-if="filteredAnnotations.length == 0" class="text-xs p-4">
                        Nothing to show here.
                    </li>
                    <li v-for="(note,key,index) in filteredAnnotations" class="flex text-xs items-start justify-start mr-4" :key="key">
                        <div class="mr-1 w-20 flex-shrink-0 text-date-slab">{{note.date}}</div>
                        <div class="w-full">
                            <span v-if="note.state.length > 0" class="font-bold mr-1">[{{note.state}}]</span>
                            <span>{{note.notes}}</span>
                            <span v-if="note.url"><a class="underline hover:text-white" :href="note.url">(source)</a></span>
                        </div>
                    </li>
                </ul>
            </simplebar>
        </div>

        <div @click="ui.markers = true" :class="ui.events || ui.markers ? 'hidden' : 'block'" class="absolute top-0 right-0 z-20 p-2 rounded" style="background: rgba(0,0,0,0.5); top: 1rem; right: 1rem;">Markers</div>
        <div v-if="ui.markers" class="absolute top-0 bottom-5 inset-x-0 p-2 z-30" style="background: rgba(0,0,0,0.75)">
            <div @click="ui.markers = false" class="font-bold mb-2 text-right">Close</div>
            <simplebar data-simplebar-auto-hide="true" class="p-2 text-sm absolute top-3 bottom-1 inset-x-0" style="position: absolute">
                <div class="text-xs p-2 font-bold">Time Series</div>
                <div class="my-1 rounded text-xs p-2 border cursor-pointer" :class="layers && layers.confirmed ? 'bg-heading border-heading text-baseslab':'text-heading border-heading'" @click="layers.confirmed = !layers.confirmed">Total Confirmed Cases</div>
                <div class="my-1 rounded text-xs p-2 border cursor-pointer" :class="layers && layers.deaths ? 'bg-heading border-heading text-baseslab':'text-heading border-heading'" @click="layers.deaths = !layers.deaths">Total Deaths</div>
                <div class="my-1 rounded text-xs p-2 border cursor-pointer" :class="layers && layers.recovered ? 'bg-heading border-heading text-baseslab':'text-heading border-heading'" @click="layers.recovered = !layers.recovered">Total Recoveries</div>

                <div class="text-xs p-2 font-bold">Report</div>
                <div v-if="ajax && ajax.rankings && ajax.rankings.confirmedSurge" class="my-1 rounded text-xs p-2 border cursor-pointer" :class="layers && layers.confirmedSurge ? 'bg-heading border-heading text-baseslab':'text-heading border-heading'" @click="layers.confirmedSurge = !layers.confirmedSurge">Surge of new cases (Top 10)</div>
            </simplebar>
        </div>

        <div class="bg-slab-primary absolute inset-x-0 bottom-0 h-20 z-40">
            <div class="py-2 pb-4 px-4 bg-slab-primary text-xs">
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
                <div class="flex w-full items-center">
                    <div v-if="!playing" class="text-xs cursor-pointer hover:text-white text-hoverslab" @click="play()">
                        <svg class="w-6 fill-current mr-6" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 28 28">
                            <g>
                                <path d="M22.52,13.47,6.06,2a.54.54,0,0,0-.52,0,.5.5,0,0,0-.27.44V25.62a.5.5,0,0,0,.27.44.46.46,0,0,0,.23.06.53.53,0,0,0,.29-.1L22.52,14.29a.52.52,0,0,0,.21-.41A.51.51,0,0,0,22.52,13.47ZM6.27,24.65V3.34L21.36,13.89Z"/>
                            </g>
                        </svg>
                    </div>
                    <div v-else class="text-xs cursor-pointer hover:text-white text-hoverslab" @click="pause()">
                        <svg class="w-6 fill-current mr-6" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 28 28">
                            <g>
                                <path d="M12.37,1.88H5.85a.51.51,0,0,0-.5.5V25.62a.51.51,0,0,0,.5.5h6.52a.5.5,0,0,0,.5-.5V2.38A.5.5,0,0,0,12.37,1.88Zm-.5,23.24H6.35V2.88h5.52Z"/><path d="M22.15,1.88H15.63a.5.5,0,0,0-.5.5V25.62a.5.5,0,0,0,.5.5h6.52a.51.51,0,0,0,.5-.5V2.38A.51.51,0,0,0,22.15,1.88Zm-.5,23.24H16.13V2.88h5.52Z"/>
                            </g>
                        </svg>
                    </div>
                    <div class="w-full">
                        <vue-slider v-model="date" :data="dateSliderRange" :adsorb="true" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import simplebar from 'simplebar-vue';
    import Map from '../components/Map'
    import VueSlider from 'vue-slider-component'
    import 'vue-slider-component/theme/default.css'
    import moment from 'moment'

    export default {
        name: "MapView",
        components: {
            Map,
            simplebar,
            VueSlider,
        },
        props: [
            'annotations',
            'countries_sorted',
            'getDaily',
            'database',
            'location',
        ],
        data()
        {
            return {
                layers : {
                    confirmed: true,
                    deaths: false,
                    recovered: false,
                    confirmedSurge: false,
                },
                ajax : {
                    rankings: {}
                },
                date: '',
                options: {
                    date: {
                        min: new Date('2020-01-01'),
                        max: false,
                    }
                },
                ui : {
                    events: false,
                    markers: false,
                },
                playing: false,
                interval: false,

            }
        },
        created()
        {
            this.date = this.dateSliderRange[this.dateSliderRange.length - 1];
            this.options.date.max = this.date;
        },
        mounted()
        {
            axios.get('/api/stats/rankings')
                .then(res => {
                    this.ajax.rankings = res.data;
                })
                .catch(error => {

                });

        },
        computed:
        {
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
            },
            filteredAnnotations()
            {
                var data = [];
                for(var x in this.annotations)
                {
                    if(this.annotations[x] && this.annotations[x].date)
                    {
                        if(moment(this.annotations[x].date) <= moment(this.date))
                        {
                            data.push(_.clone(this.annotations[x]));
                        }
                    }
                }
                return data;
            }
        },
        methods: {
            play()
            {
                var self = this;
                this.playing = true;
                this.interval = setInterval(function(){
                    var date = new Date(self.date);
                    var max = new Date(self.options.date.max);

                    if(date < max)
                    {
                        self.date = moment(date.addDays(1)).format('YYYY-MM-DD');
                    }
                    else
                    {
                        clearInterval(self.interval);

                        setTimeout(function(){
                            self.date = self.options.date.min;
                            setTimeout(function(){
                                self.play();
                            },500)
                        },500)
                    }
                },100);
            },
            pause()
            {
                this.playing = false;
                clearInterval(this.interval);
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

<style scoped>

</style>
