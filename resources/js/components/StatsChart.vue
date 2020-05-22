<template>
    <div class="absolute top-0 left-0 right-0 bottom-0" v-on:click="resetDropdowns()">
<!--        <div class="absolute top-0 right-0 bottom-0 left-0 bg-red-400"></div>-->
        <div class="absolute left-0 top-0 mt-20 ml-4 border border-gray-600 bg-gray-100 text-gray-800 p-4 rounded flex items-start" :class="ui.settings ? 'z-10':'w-64 z-0 hidden'">
            <div>
                <div class="font-bold text-2xl mb-4">Chart Settings</div>
                <div class="flex flex-wrap border" style="max-width:940px; max-height:530px">
                    <div v-if="chartsettings.length == 0" class="p-4 text-xs">
                        Choose countries or states to begin comparing.
                    </div>
                    <div v-show="chartsettings.length > 0" v-for="(row,key,index) in chartsettings" :key="key" class="m-2 bg-gray-200 p-2">
                        <div class="font-bold text-sm">{{row.name}}</div>
                        <div class="flex text-xs">
                            <div class="w-24"></div>
                            <div class="w-24 border-l border-gray-400 p-2">Colour</div>
                            <div class="w-24 border-l border-gray-400 p-2">Chart Type</div>
                            <div class=" border-l border-gray-400 p-2">Scale Type</div>
                        </div>
                        <div class="flex text-xs">
                            <div class="w-24">Primary Metric</div>
                            <div class="w-24 border-l border-gray-400 p-2 relative">
                                <div class="p-1 border border-gray-500">
                                    <div v-on:click.stop="toggleColorDropdown(row.name+'primary', $event)" class="p-2" :style="'background: ' + row.primary.border"></div>
                                </div>
                                <div class="p-1 border border-gray-500 absolute top-0 left-0 z-10 bg-gray-100" :class="ui.colordropdown.id == (row.name + 'primary') && ui.colordropdown.show ? '' : 'hidden'">
                                    <div class="m-1 text-xs font-bold">Pick a colour</div>
                                    <div v-for="(color,key,index) in options.colors" v-on:click.stop="setColor(row.name,{primary: { color: color.bg, border: color.border}})" class="cursor-pointer w-20 m-1 border border-gray-400 p-2" :style="'background: ' + color.border"></div>
                                </div>
                            </div>
                            <div class="w-24 flex border-l border-gray-400">
                                <div v-on:click.stop="addSetting(row.name,{primary:{type: 'bar'}})" class="cursor-pointer border rounded p-2 m-1" :class="row.primary.type == 'bar'?'bg-blue-400 border-blue-400 text-white':'border-gray-500 '">Bar</div>
                                <div v-on:click.stop="addSetting(row.name,{primary:{type: 'line'}})" class="cursor-pointer border rounded p-2 m-1" :class="row.primary.type == 'line'?'bg-blue-400 border-blue-400  text-white':'border-gray-500 '">Line</div>
                            </div>
                            <div class="flex border-l border-gray-400">
                                <div v-on:click.stop="addSetting(row.name,{primary:{scale: 'linear'}})" class="cursor-pointer border rounded p-2 m-1" :class="row.primary.scale == 'linear'?'bg-blue-400 border-blue-400 text-white':'border-gray-500 '">Linear</div>
                                <div v-on:click.stop="addSetting(row.name,{primary:{scale: 'logarithmic'}})" class="cursor-pointer border rounded p-2 m-1" :class="row.primary.scale == 'logarithmic'?'bg-blue-400 border-blue-400  text-white':'border-gray-500 '">Logarithmic</div>
                            </div>
                        </div>
                        <div class="flex text-xs">
                            <div class="w-24">Secondary Metric</div>
                            <div class="w-24 border-l border-gray-400 p-2 relative">
                                <div class="p-1 border border-gray-500">
                                    <div v-on:click.stop="toggleColorDropdown(row.name+'secondary',$event)" class="p-2" :style="'background: ' + row.secondary.border"></div>
                                </div>
                                <div class="p-1 border border-gray-500 absolute top-0 left-0 z-10 bg-gray-100" :class="ui.colordropdown.id == (row.name + 'secondary') && ui.colordropdown.show ? '' : 'hidden'">
                                    <div class="m-1 text-xs font-bold">Pick a colour</div>
                                    <div v-for="(color,key,index) in options.colors" v-on:click.stop="setColor(row.name,{secondary: { color: color.bg, border: color.border}})" class="cursor-pointer w-20 m-1 border border-gray-400 p-2" :style="'background: ' + color.border"></div>
                                </div>
                            </div>
                            <div class="w-24 flex border-l border-gray-400">
                                <div v-on:click.stop="addSetting(row.name,{secondary:{type: 'bar'}})" class="cursor-pointer border rounded p-2 m-1" :class="row.secondary.type == 'bar'?'bg-blue-400 border-blue-400 text-white':'border-gray-500 '">Bar</div>
                                <div v-on:click.stop="addSetting(row.name,{secondary:{type: 'line'}})" class="cursor-pointer border rounded p-2 m-1" :class="row.secondary.type == 'line'?'bg-blue-400 border-blue-400  text-white':'border-gray-500 '">Line</div>
                            </div>
                            <div class="flex border-l border-gray-400">
                                <div v-on:click.stop="addSetting(row.name,{secondary:{scale: 'linear'}})" class="cursor-pointer border rounded p-2 m-1" :class="row.secondary.scale == 'linear'?'bg-blue-400 border-blue-400 text-white':'border-gray-500 '">Linear</div>
                                <div v-on:click.stop="addSetting(row.name,{secondary:{scale: 'logarithmic'}})" class="cursor-pointer border rounded p-2 m-1" :class="row.secondary.scale == 'logarithmic'?'bg-blue-400 border-blue-400  text-white':'border-gray-500 '">Logarithmic</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="full" class="absolute top-0 right-0 bottom-0 left-0 m-2">
            <div class="py-4" v-if="settings.controls.menu">
                <div class="text-xs flex items-start justify-between">
                    <div>
                        <div @click.stop="ui.settings = !ui.settings" class="hover:bg-lightlabel p-2 border border-lightlabel m-2 cursor-pointer" :class="ui.settings ? 'bg-lightlabel' : ''">Chart Settings</div>
                    </div>
<!--                    <div class="flex items-center">-->
<!--                        <div class="mr-2">Scale</div>-->
<!--                        <div class="flex">-->
<!--                            <div v-for="row in graphControls.scaleType"-->
<!--                                 class="p-2 border border-hoverslab m-1 cursor-pointer"-->
<!--                                 :class="selectedScaleType(row[0]) ? 'bg-hoverslab':''"-->
<!--                                 @click="selectScaleType(row[0])"-->
<!--                            >-->
<!--                                {{row[1]}}-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
                    <div class="flex items-center">
                        <div class="mr-2">Metrics</div>
                        <div class="flex border border-hoverslab bg-hoverslab m-1 cursor-pointer p-2 relative">
                            <div @click.stop="ui.primary = !ui.primary" class="w-32 truncate ..." v-if="options.controls.primary">{{getFieldName(options.controls.primary)}}</div>
                            <div @click.stop="ui.primary = !ui.primary" class="w-32" v-else>Select primary metric</div>
                            <div v-show="ui.primary" class="absolute z-10 bg-slab border-hoverslab shadow w-44 right-0 top-0 p-2 border border-hoverslab">
                                <div v-for="row in graphControls.y" class="p-2 m-1 hover:bg-hoverslab" @click.stop="selectField(row[0],'primary')">
                                    {{row[1]}}
                                </div>
                            </div>
                        </div>
                        <div class="flex border border-hoverslab bg-hoverslab m-1 mr-0 cursor-pointer p-2 relative">
                            <div @click.stop="ui.secondary = !ui.secondary" class="w-32 truncate ..." v-if="options.controls.secondary">{{getFieldName(options.controls.secondary)}}</div>
                            <div @click.stop="ui.secondary = !ui.secondary" class="w-32" v-else>Select secondary metric</div>
                            <div v-show="ui.secondary" class="absolute z-10 bg-slab border-hoverslab shadow w-44 right-0 top-0 p-2 border border-hoverslab">
                                <div class="p-2 m-1 hover:bg-hoverslab"  @click="selectField('','secondary')">None</div>
                                <div v-for="row in graphControls.y" class="p-2 m-1 hover:bg-hoverslab" @click="selectField(row[0],'secondary')">
                                    {{row[1]}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-hoverslab p-4 absolute rounded left-0 top-0 right-0 bottom-0" :class="settings.controls.menu ? 'mt-16' : ''">
                <LineChart :data="dataset.data"
                           :options="dataset.options"
                           class="bg-heading rounded"
                           :class="full ? (settings.controls.menu ? 'absolute top-0 bottom-0 right-0 left-0 m-2 mb-16': 'absolute top-0 bottom-0 right-0 left-0 m-2') : 'h-200 m-4 mb-0'"
                           v-if="active && data.length > 0"
                />
                <div class="text-xs absolute left-0 right-0 bottom-0 h-12 flex items-start justify-between" v-if="settings.controls.menu">
                    <div class="flex items-center justify-start">
                        <div class="mx-2">Time mode</div>
                        <div class="flex">
                            <div
                                v-for="row in graphControls.x"
                                class="p-2 border border-lightslab m-1 cursor-pointer"
                                :class="selectedMode(row[0]) ? 'bg-lightslab':''"
                                @click="selectMode(row[0])"
                            >
                                {{row[1]}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <simplebar v-else data-simplebar-auto-hide="false" class="top-0 right-0 bottom-0 left-0 rounded" style="position:absolute">
            <div class="py-4" v-if="settings.controls.menu">
                <div class="text-xs flex items-start justify-between">
                    <div class="flex items-center">
                        <div class="mr-2">Scale</div>
                        <div class="flex">
                            <div v-for="row in graphControls.scaleType"
                                 class="p-2 border border-hoverslab m-1 cursor-pointer"
                                 :class="selectedScaleType(row[0]) ? 'bg-hoverslab':''"
                                 v-on:click.stop="selectScaleType(row[0])"
                            >
                                {{row[1]}}
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <div class="mr-2">Metrics</div>
                        <div class="flex border border-hoverslab bg-hoverslab m-1 cursor-pointer p-2 relative">
                            <div v-on:click.stop="ui.primary = !ui.primary" class="w-32 truncate ..." v-if="options.controls.primary">{{getFieldName(options.controls.primary)}}</div>
                            <div v-on:click.stop="ui.primary = !ui.primary" class="w-32" v-else>Select primary metric</div>
                            <div v-show="ui.primary" class="absolute z-10 bg-slab border-hoverslab shadow w-44 right-0 top-0 p-2 border border-hoverslab">
                                <div v-for="row in graphControls.y" class="p-2 m-1 hover:bg-hoverslab" v-on:click.stop="selectField(row[0],'primary')">
                                    {{row[1]}}
                                </div>
                            </div>
                        </div>
                        <div class="flex border border-hoverslab bg-hoverslab m-1 mr-0 cursor-pointer p-2 relative">
                            <div v-on:click.stop="ui.secondary = !ui.secondary" class="w-32 truncate ..." v-if="options.controls.secondary">{{getFieldName(options.controls.secondary)}}</div>
                            <div v-on:click.stop="ui.secondary = !ui.secondary" class="w-32" v-else>Select secondary metric</div>
                            <div v-show="ui.secondary" class="absolute z-10 bg-slab border-hoverslab shadow w-44 right-0 top-0 p-2 border border-hoverslab">
                                <div class="p-2 m-1 hover:bg-hoverslab"  v-on:click.stop="selectField('','secondary')">None</div>
                                <div v-for="row in graphControls.y" class="p-2 m-1 hover:bg-hoverslab" v-on:click.stop="selectField(row[0],'secondary')">
                                    {{row[1]}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-hoverslab p-4 relative" :class="settings.controls.menu ? 'mt-16' : ''">
                <keep-alive>
                <LineChart :data="dataset.data"
                           :options="dataset.options"
                           class="bg-heading rounded"
                           :class="full ? (settings.controls.menu ? 'absolute top-0 bottom-0 right-0 left-0 m-2 mb-16': 'absolute top-0 bottom-0 right-0 left-0 m-2') : 'h-200 m-4 mb-0'"
                           v-if="data.length > 0"
                />
                </keep-alive>
                <div class="text-xs flex items-start justify-between" v-if="settings.controls.menu">
                    <div class="flex items-center justify-start">
                        <div class="mx-2">Time mode</div>
                        <div class="flex">
                            <div
                                v-for="row in graphControls.x"
                                class="p-2 border border-lightslab m-1 cursor-pointer"
                                :class="selectedMode(row[0]) ? 'bg-lightslab':''"
                                v-on:click.stop="selectMode(row[0])"
                            >
                                {{row[1]}}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="p-2 border border-lightslab m-1 cursor-pointer">Options</div>
                    </div>
                </div>
            </div>
        </simplebar>
<!--        <div class="mt-64">{{full_stats}}</div>-->
    </div>
</template>

<script>
    import LineChart from "./charts/LineChart";
    import simplebar from 'simplebar-vue';
    import 'simplebar/dist/simplebar.min.css';
    import moment from 'moment';
    export default {
        name: "Comparison",
        components:{
            simplebar,
            LineChart,
        },
        data(){
            return {
                'gradualDataset' : {
                    datasets: false,
                    labels: false,
                },
                'options' : {
                    'mode': 'chronological',

                    'controls' : {
                        'primary': 'deltaConfirmed',
                        'secondary' : '',
                        'scaleType' : 'linear',
                        'menu' : true,
                    },

                    'chartsettings': [],

                    colors: [
                        {
                            bg: 'rgba(102,14,255,0.5)',
                            border: 'rgba(102,14,255,1)',
                        },
                        {
                            bg: 'rgba(183,148,244,0.5)',
                            border: 'rgba(183,148,244,1)',
                        },
                        {
                            bg: 'rgba(246,135,179,0.5)',
                            border: 'rgba(246,135,179,1)',
                        },
                        {
                            bg: 'rgba(252,129,129,0.5)',
                            border: 'rgba(252,129,129,1)',
                        },
                        {
                            bg: 'rgba(255,36,36,0.5)',
                            border: 'rgba(255,36,36,1)',
                        },
                        {
                            bg: 'rgba(158,86,0,0.5)',
                            border: 'rgba(158,86,0,1)',
                        },
                        {
                            bg: 'rgba(247,139,10,0.5)',
                            border: 'rgba(247,139,10,1)',
                        },
                        {
                            bg: 'rgba(228,197,16,0.5)',
                            border: 'rgba(228,197,16,1)',
                        },
                        {
                            bg: 'rgba(104,211,145,0.5)',
                            border: 'rgba(104,211,145,1)',
                        },
                        {
                            bg: 'rgba(79,209,197,0.5)',
                            border: 'rgba(79,209,197,1)',
                        },
                        {
                            bg: 'rgba(99,179,237,0.5)',
                            border: 'rgba(99,179,237,1)',
                        },
                        {
                            bg: 'rgba(127,156,245,0.5)',
                            border: 'rgba(127,156,245,1)',
                        },
                        {
                            bg: 'rgba(3,65,255,0.5)',
                            border: 'rgba(3,65,255,1)',
                        },
                        {
                            bg: 'rgba(23,47,82,0.5)',
                            border: 'rgba(23,47,82,1)',
                        },
                        {
                            bg: 'rgba(113,128,150,0.5)',
                            border: 'rgba(113,128,150,1)',
                        },
                    ],

                    'background' : [
                        {
                            primary: 'rgba(38,73,146,1)',
                            secondary: 'rgba(207,79,41,0.5)',
                            borderPrimary: 'rgba(38,73,146,0.1)',
                            borderSecondary: 'rgba(207,79,41,1)',

                        },
                        {
                            primary: 'rgba(57,132,182,1)',
                            secondary: 'rgba(233,126,59,0.5)',
                            borderPrimary: 'rgba(57,132,182,1)',
                            borderSecondary: 'rgba(233,126,59,1)',
                        },
                        {
                            primary: 'rgba(90,186,209,1)',
                            secondary: 'rgba(243,179,85,0.5)',
                            borderPrimary: 'rgba(90,186,209,1)',
                            borderSecondary: 'rgba(243,179,85,1)',
                        },
                        {
                            primary: 'rgba(56,182,36,1)',
                            secondary: 'rgba(106,205,90,0.5)',
                            borderPrimary: 'rgba(56,182,36,1)',
                            borderSecondary: 'rgba(106,205,90,1)',
                        },
                        {
                            primary: 'rgba(192,36,36,1)',
                            secondary: 'rgba(205,90,90,0.5)',
                            borderPrimary: 'rgba(192,36,36,1)',
                            borderSecondary: 'rgba(205,90,90,1)',
                        },
                    ]

                },
                ui : {
                    'primary' : false,
                    'secondary' : false,
                    'settings': false,
                    'colordropdown': {
                        show: false,
                        id: false,
                    },

                },
                'graphControls' : {
                    'x' : [
                        ['chronological','Chronological'],
                        ['from1','From first case'],
                        ['from100','From 100 cases'],
                        ['from1death','From first death'],
                    ],
                    'y' : [
                        ['confirmed','Confirmed cases'],
                        ['deltaConfirmed','Daily confirmed cases'],
                        ['deaths','Confirmed deaths'],
                        ['deltaDeaths','Daily confirmed deaths'],
                        ['recovered','Confirmed recoveries'],
                        ['active','Active cases'],
                        ['deltaRecovered','Daily confirmed recoveries'],
                        ['average','Average new cases (5 day spread)'],
                        ['growthFactor','Growth factor'],
                    ],
                    'scaleType' : [
                        ['logarithmic','Logarithmic'],
                        ['linear','Linear'],
                    ]
                },
                stats: {}
            }
        },
        props: [
            'data',
            'full',
            'config',
            'active',
        ],
        mounted()
        {
            if(this.config)
            {
                if(this.config.mode)
                {
                    this.options.mode = this.config.mode;
                }

                if(this.config.settings)
                {
                    this.options.chartsettings = _.cloneDeep(this.config.settings);
                }

                if(this.config.fields)
                {
                    if(this.config.fields.primary)
                    {
                        this.ui.primary = this.config.fields.primary;
                    }
                    if(this.config.fields.secondary)
                    {
                        this.ui.primary = this.config.fields.secondary;
                    }
                }
            }
        },
        methods: {
            setColor(name,color)
            {
                this.addSetting(name,color)
                this.ui.colordropdown.show = false;
            },
            toggleColorDropdown(name, event)
            {
                if(this.ui.colordropdown.id == name)
                {
                    this.ui.colordropdown.show = !this.ui.colordropdown.show;
                }
                else
                {
                    this.ui.colordropdown.id = name;
                    this.ui.colordropdown.show = true;
                }
                event.stopPropagation();
            },
            addSetting(name,settings)
            {
                var data = [];
                var current = this.options.chartsettings;
                var found = false;

                const getRandomIntInclusive = function(min, max) {
                    min = Math.ceil(min);
                    max = Math.floor(max);
                    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
                }

                // Copy over locations that are still used
                for(var x in this.data)
                {
                    for(var y in current)
                    {
                        if(current[y].name == this.data[x].name.full)
                        {
                            data.push(current[y]);
                            break;
                        }
                    }
                }

                // Check if we are adding a new location
                if (data.length > 0)
                {
                    for(var y in data)
                    {
                        if (data[y].name == name)
                        {
                            found = y;
                            break;
                        }
                    }
                }


                if(!found)
                {
                    var random1 = getRandomIntInclusive(1,this.options.colors.length)-1;
                    var random2 = getRandomIntInclusive(1,this.options.colors.length)-1;
                    var scaleType = {primary:'linear',secondary: 'linear'};

                    if(data.length > 0)
                    {
                        scaleType.primary = data[0].primary.scale;
                        scaleType.secondary = data[0].secondary.scale;
                    }
                    data.push({
                        name: name,
                        primary: {
                            color: this.options.colors[random1].bg,
                            border: this.options.colors[random1].border,
                            type: 'bar',
                            scale: scaleType.primary,
                        },
                        secondary: {
                            color: this.options.colors[random2].bg,
                            border: this.options.colors[random2].border,
                            type: 'line',
                            scale: scaleType.secondary,
                        },
                    })
                }
                else
                {
                    if(settings && settings.primary && settings.primary.color)
                    {
                        data[found].primary.color = settings.primary.color;
                    }

                    if(settings && settings.primary && settings.primary.border)
                    {
                        data[found].primary.border = settings.primary.border;
                    }

                    if(settings && settings.primary && settings.primary.type)
                    {
                        data[found].primary.type = settings.primary.type;
                    }

                    if(settings && settings.primary && settings.primary.scale)
                    {
                        data[found].primary.scale = settings.primary.scale;

                        for(var x in data)
                        {
                            data[x].primary.scale = settings.primary.scale;
                        }
                    }

                    if(settings && settings.secondary && settings.secondary.color)
                    {
                        data[found].secondary.color = settings.secondary.color;
                    }

                    if(settings && settings.secondary && settings.secondary.border)
                    {
                        data[found].secondary.border = settings.secondary.border;
                    }

                    if(settings && settings.secondary && settings.secondary.type)
                    {
                        data[found].secondary.type = settings.secondary.type;
                    }

                    if(settings && settings.secondary && settings.secondary.scale)
                    {
                        data[found].secondary.scale = settings.secondary.scale;
                        for(var x in data)
                        {
                            data[x].secondary.scale = settings.secondary.scale;
                        }
                    }
                }

                this.options.chartsettings = data;
                this.$emit('updateChartSettings',_.cloneDeep(data));
            },
            getFieldName(key)
            {
                if(key)
                {
                    for(var x in this.graphControls['y'])
                    {
                        if (this.graphControls['y'][x][0] == key)
                        {
                            return this.graphControls['y'][x][1];
                        }
                    }
                }
                return '';
            },
            selectedMode(key)
            {
                if (key == this.options.mode)
                {
                    return true;
                }
                return false;
            },
            selectMode(key)
            {
                this.options.mode = key;
                this.$emit('updateChartMode',_.clone(this.options.mode));
            },
            selectedScaleType(key)
            {
                if (key == this.options.controls.scaleType)
                {
                    return true;
                }
                return false;
            },
            selectScaleType(key)
            {
                this.options.controls.scaleType = key;
            },
            selectField(key,level)
            {
                if(level)
                {
                    this.options.controls[level] = key;
                }
                this.ui[level] = false;

                this.$emit('updateChartFields',{primary:this.options.controls.primary,secondary:this.options.controls.secondary});
            },
            selectedField(key,level)
            {
                if(level)
                {
                    if(this.options.controls[level] == key)
                    {
                        return true;
                    }
                }
                return false;
            },
            getLabels()
            {
                var data = [];
                for(var x in this.data)
                {

                }
                return data;
            },
            getRows(options)
            {
                for(var x in this.data)
                {
                    var country = this.data[x];

                }
            },
            resetDropdowns()
            {
                this.ui.primary = false;
                this.ui.secondary = false;
                this.ui.settings = false;
            },
        },
        computed: {
            chartsettings()
            {
                var data = [];

                if(!this.config.settings || (this.config.settings && this.config.settings.length !== this.data.length))
                {
                    for(var x in this.data)
                    {
                        this.addSetting(this.data[x].name.full);
                    }
                }
                else
                {
                    this.options.chartsettings = this.config.settings;
                }
                return this.options.chartsettings;
            },
            settings()
            {
                return this.options;
            },
            xAxis()
            {
                if(this.config && this.config.mode)
                {
                    this.options.mode = this.config.mode;
                }
                return [
                    this.options.mode
                ];
            },
            yAxis()
            {
                var data = [];

                if(this.config && this.config.fields)
                {
                    if(this.config.fields.primary)
                        this.options.controls.primary = this.config.fields.primary;
                    if(this.config.fields.secondary)
                        this.options.controls.secondary = this.config.fields.secondary;
                }
                if(this.options.controls.primary)
                    data.push(this.options.controls.primary);
                if(this.options.controls.secondary)
                    data.push(this.options.controls.secondary);

                return data;
            },
            comparison()
            {
                return this.data;
            },

            full_stats()
            {
                var data = _.cloneDeep(this.data);
                for(var x in data)
                {

                }
                return data;
            },
            dataset()
            {
                var xAxis = this.xAxis,
                    yAxis = this.yAxis,
                    data = false;


                if (this.options.mode == 'chronological')
                {
                    data = _.clone(this.datasetChronological);
                }
                else if (this.options.mode == 'from1' || this.options.mode == 'from100' || this.options.mode == 'from1death')
                {
                    data = _.clone(this.datasetCaseCount);
                }

                return data;
            },
            datasetChronological()
            {

                var data = {
                        labels: [],
                        datasets: [],
                    },
                    options,
                    key,
                    content = [],
                    background = this.options.background;


                // OPTIONS

                options = {

                    responsive: true,
                    maintainAspectRatio: false,
                    hoverMode: 'index',
                    stacked: false,
                    legend: {
                        labels: {
                            fontColor: '#2c3531'
                        }
                    },
                    scales: {
                        xAxes: [{
                            ticks: {
                                fontColor: '#2c3531',
                                callback: function(dataLabel, index) {
                                    return index % 2 === 0 ? dataLabel : '';
                                }
                            }
                        }],
                        yAxes: [
                        ],
                    },
                    plugins: {
                        zoom: {
                            pan: {
                                enabled: true,
                                mode: 'xy'
                            },
                            zoom: {
                                enabled: true,
                                mode: 'xy',
                            }
                        }
                    },
                    watermark: {
                        image: '/img/logo/logo-text.png',
                        width: 194,
                        height: 250,
                        x: 100,
                        y: 70,
                        opacity: 0.1,
                        alignX: "right",
                        alignY: "bottom",
                        alignToChartArea: false,
                        position: "back",
                    }
                };


                var count = 0;
                for(var x in this.data){
                    count++;
                }
                if(count == 0)
                    return data;

                var start = '', end = '';
                // Get start and end dates
                for(var x in this.data)
                {
                    var stats = this.data[x].daily;
                    for(var y in stats)
                    {
                        var date = stats[y].date;
                        if(start.length === 0 || moment(date).format('YYYY-MM-DD') < start)
                        {
                            start = moment(date).format('YYYY-MM-DD');
                        }

                        if(end.length === 0 || moment(date).format('YYYY-MM-DD') > end)
                        {
                            end = moment(date).format('YYYY-MM-DD');
                        }
                    }
                }


                // Assemble content
                for(var x = 0; x <= moment(end).diff(moment(start),'days'); x++)
                {

                    var current_date = _.clone(moment(start).add(x,'days').format('YYYY-MM-DD'))
                    data.labels.push(current_date);
                    for(var y = 0; y < this.data.length; y++)
                    {
                        if(!content[y])
                        {
                            content.push(
                                {
                                    confirmed: [],
                                    deaths: [],
                                    recovered: [],
                                    active: [],
                                    deltaConfirmed: [],
                                    deltaDeaths: [],
                                    deltaRecovered: [],
                                    average: [],
                                    growthFactor: [],
                                }
                            );
                        }

                        if(this.data[y].daily)
                        {

                            var found = false;
                            var stats = this.data[y].daily;

                            for(var z in stats)
                            {
                                var row = stats[z];
                                if(moment(row.date).format('YYYY-MM-DD') === current_date)
                                {
                                    content[y].confirmed.push(row.c);
                                    content[y].deaths.push(row.d);
                                    content[y].recovered.push(row.r);
                                    content[y].active.push(row.a);
                                    content[y].deltaConfirmed.push(row.delta.c);
                                    content[y].deltaDeaths.push(row.delta.d);
                                    content[y].deltaRecovered.push(row.delta.r);
                                    content[y].average.push(Math.round(row.average.c*100)/100);
                                    content[y].growthFactor.push(Math.round(row.growth.c * 100)/100);
                                    found = true;
                                }
                            }

                            // If today's data is missing, use previous day's
                            if (!found)
                            {
                                if (content[y].confirmed.length > 0)
                                {
                                    content[y].confirmed.push(content[y].confirmed.slice(-1));
                                    content[y].deaths.push(content[y].deaths.slice(-1));
                                    content[y].recovered.push(content[y].recovered.slice(-1));
                                    content[y].active.push(content[y].active.slice(-1));
                                    content[y].deltaConfirmed.push(content[y].deltaConfirmed.slice(-1));
                                    content[y].deltaDeaths.push(content[y].deltaDeaths.slice(-1));
                                    content[y].deltaRecovered.push(content[y].deltaRecovered.slice(-1));
                                    content[y].average.push(content[y].average.slice(-1));
                                    content[y].growthFactor.push(content[y].growthFactor.slice(-1));
                                }
                                else
                                {
                                    content[y].confirmed.push(0);
                                    content[y].deaths.push(0);
                                    content[y].recovered.push(0);
                                    content[y].active.push(0);
                                    content[y].deltaConfirmed.push(0);
                                    content[y].deltaDeaths.push(0);
                                    content[y].deltaRecovered.push(0);
                                    content[y].average.push(0);
                                    content[y].growthFactor.push(0);
                                }
                            }
                        }
                    }
                }

                var position = '',
                    chartType = '',
                    metric = '',
                    border = '';


                // Assemble labels
                for(var x = 0; x < this.data.length; x++)
                {
                    for(var y in this.yAxis)
                    {
                        if (y == 0)
                        {
                            position = 'left';
                            chartType = 'bar';
                            metric = 'primary';
                            border = 'borderPrimary';
                        }
                        else
                        {
                            position = 'right';
                            chartType = 'bar';
                            metric = 'secondary';
                            border = 'borderSecondary';
                        }
                        if(this.yAxis[y] == 'confirmed')
                        {
                            data.datasets.push(
                                {
                                    label: 'Confirmed (' + this.data[x].name.full + ')',
                                    type: this.options.chartsettings[x][metric].type,
                                    backgroundColor: this.options.chartsettings[x][metric].color,
                                    borderColor: this.options.chartsettings[x][metric].border,
                                    borderDash: [10, 5],
                                    borderWidth: 2,
                                    pointRadius: 5,
                                    fill: false,
                                    data: _.clone(content[x].confirmed),
                                    yAxisID: 'y-confirmed'
                                }
                            );

                            options.scales.yAxes.push(
                                {
                                    responsive: true,
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Confirmed',
                                    },
                                    type: this.options.chartsettings[x][metric].scale,
                                    display: true,
                                    position: position,
                                    id: 'y-confirmed',

                                    // grid line settings
                                    gridLines: {
                                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                                    },
                                    ticks: {
                                        fontColor: '#2c3531',
                                        callback: function(tick, index, ticks) {
                                            if(
                                                tick.toString().substr(0,1) == 1
                                                || tick.toString().substr(0,1) == 5
                                                || tick.toString() == 0
                                            )
                                            {
                                                return tick.toLocaleString();
                                            }
                                        }
                                    }
                                },
                            );
                        }
                        else if(this.yAxis[y] == 'deaths')
                        {
                            data.datasets.push(
                                {
                                    label: 'Deaths (' + this.data[x].name.full + ')',
                                    type: this.options.chartsettings[x][metric].type,
                                    backgroundColor: this.options.chartsettings[x][metric].color,
                                    borderColor: this.options.chartsettings[x][metric].border,
                                    borderDash: [10, 5],
                                    borderWidth: 2,
                                    pointRadius: 5,
                                    fill: false,
                                    data: _.clone(content[x].deaths),
                                    yAxisID: 'y-deaths'
                                }
                            );
                            options.scales.yAxes.push(
                                {
                                    responsive: true,
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Deaths',
                                    },
                                    type: this.options.chartsettings[x][metric].scale,
                                    display: true,
                                    position: position,
                                    id: 'y-deaths',

                                    // grid line settings
                                    gridLines: {
                                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                                    },
                                    ticks: {
                                        fontColor: '#2c3531',
                                        callback: function(tick, index, ticks) {
                                            if(
                                                tick.toString().substr(0,1) == 1
                                                || tick.toString().substr(0,1) == 5
                                                || tick.toString() == 0
                                            )
                                            {
                                                return tick.toLocaleString();
                                            }
                                        }
                                    }
                                },
                            );
                        }
                        else if(this.yAxis[y] == 'recovered')
                        {
                            data.datasets.push(
                                {
                                    label: 'Recovered (' + this.data[x].name.full + ')',
                                    type: this.options.chartsettings[x][metric].type,
                                    backgroundColor: this.options.chartsettings[x][metric].color,
                                    borderColor: this.options.chartsettings[x][metric].border,
                                    borderDash: [10, 5],
                                    borderWidth: 2,
                                    pointRadius: 5,
                                    fill: false,
                                    data: _.clone(content[x].recovered),
                                    yAxisID: 'y-recovered'
                                }
                            );
                            options.scales.yAxes.push(
                                {
                                    responsive: true,
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Recovered',
                                    },
                                    type: this.options.chartsettings[x][metric].scale,
                                    display: true,
                                    position: position,
                                    id: 'y-recovered',

                                    // grid line settings
                                    gridLines: {
                                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                                    },
                                    ticks: {
                                        fontColor: '#2c3531',
                                        callback: function(tick, index, ticks) {
                                            if(
                                                tick.toString().substr(0,1) == 1
                                                || tick.toString().substr(0,1) == 5
                                                || tick.toString() == 0
                                            )
                                            {
                                                return tick.toLocaleString();
                                            }
                                        }
                                    }
                                },
                            );
                        }
                        else if(this.yAxis[y] == 'active')
                        {
                            data.datasets.push(
                                {
                                    label: 'Active (' + this.data[x].name.full + ')',
                                    type: this.options.chartsettings[x][metric].type,
                                    backgroundColor: this.options.chartsettings[x][metric].color,
                                    borderColor: this.options.chartsettings[x][metric].border,
                                    borderDash: [10, 5],
                                    borderWidth: 2,
                                    pointRadius: 5,
                                    fill: false,
                                    data: _.clone(content[x].active),
                                    yAxisID: 'y-active'
                                }
                            );
                            options.scales.yAxes.push(
                                {
                                    responsive: true,
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Active',
                                    },
                                    type: this.options.chartsettings[x][metric].scale,
                                    display: true,
                                    position: position,
                                    id: 'y-active',

                                    // grid line settings
                                    gridLines: {
                                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                                    },
                                    ticks: {
                                        fontColor: '#2c3531',
                                        callback: function(tick, index, ticks) {
                                            if(
                                                tick.toString().substr(0,1) == 1
                                                || tick.toString().substr(0,1) == 5
                                                || tick.toString() == 0
                                            )
                                            {
                                                return tick.toLocaleString();
                                            }
                                        }
                                    }
                                },
                            );
                        }
                        else if(this.yAxis[y] == 'deltaConfirmed')
                        {
                            data.datasets.push(
                                {
                                    label: 'New cases per day (' + this.data[x].name.full + ')',
                                    type: this.options.chartsettings[x][metric].type,
                                    backgroundColor: this.options.chartsettings[x][metric].color,
                                    borderColor: this.options.chartsettings[x][metric].border,
                                    borderDash: [10, 5],
                                    borderWidth: 2,
                                    pointRadius: 5,
                                    fill: false,
                                    data: _.clone(content[x].deltaConfirmed),
                                    yAxisID: 'y-deltaConfirmed'
                                }
                            );
                            options.scales.yAxes.push(
                                {
                                    responsive: true,
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'New cases per day',
                                    },
                                    type: this.options.chartsettings[x][metric].scale,
                                    display: true,
                                    position: position,
                                    id: 'y-deltaConfirmed',

                                    // grid line settings
                                    gridLines: {
                                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                                    },
                                    ticks: {
                                        fontColor: '#2c3531',
                                        callback: function(tick, index, ticks) {
                                            if(
                                                tick.toString().substr(0,1) == 1
                                                || tick.toString().substr(0,1) == 5
                                                || tick.toString() == 0
                                            )
                                            {
                                                return tick.toLocaleString();
                                            }
                                        }
                                    }
                                },
                            );
                        }
                        else if(this.yAxis[y] == 'deltaDeaths')
                        {
                            data.datasets.push(
                                {
                                    label: 'New deaths per day (' + this.data[x].name.full + ')',
                                    type: this.options.chartsettings[x][metric].type,
                                    backgroundColor: this.options.chartsettings[x][metric].color,
                                    borderColor: this.options.chartsettings[x][metric].border,
                                    borderDash: [10, 5],
                                    borderWidth: 2,
                                    pointRadius: 5,
                                    fill: false,
                                    data: _.clone(content[x].deltaDeaths),
                                    yAxisID: 'y-deltaDeaths'
                                }
                            );
                            options.scales.yAxes.push(
                                {
                                    responsive: true,
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'New deaths per day',
                                    },
                                    type: this.options.chartsettings[x][metric].scale,
                                    display: true,
                                    position: position,
                                    id: 'y-deltaDeaths',

                                    // grid line settings
                                    gridLines: {
                                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                                    },
                                    ticks: {
                                        fontColor: '#2c3531',
                                        callback: function(tick, index, ticks) {
                                            if(
                                                tick.toString().substr(0,1) == 1
                                                || tick.toString().substr(0,1) == 5
                                                || tick.toString() == 0
                                            )
                                            {
                                                return tick.toLocaleString();
                                            }
                                        }
                                    }
                                },
                            );
                        }
                        else if(this.yAxis[y] == 'deltaRecovered')
                        {
                            data.datasets.push(
                                {
                                    label: 'New recoveries per day (' + this.data[x].name.full + ')',
                                    type: this.options.chartsettings[x][metric].type,
                                    backgroundColor: this.options.chartsettings[x][metric].color,
                                    borderColor: this.options.chartsettings[x][metric].border,
                                    borderDash: [10, 5],
                                    borderWidth: 2,
                                    pointRadius: 5,
                                    fill: false,
                                    data: _.clone(content[x].deltaRecovered),
                                    yAxisID: 'y-deltaRecovered'
                                }
                            );
                            options.scales.yAxes.push(
                                {
                                    responsive: true,
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'New recoveries per day',
                                    },
                                    type: this.options.chartsettings[x][metric].scale,
                                    display: true,
                                    position: position,
                                    id: 'y-deltaRecovered',

                                    // grid line settings
                                    gridLines: {
                                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                                    },
                                    ticks: {
                                        fontColor: '#2c3531',
                                        callback: function(tick, index, ticks) {
                                            if(
                                                tick.toString().substr(0,1) == 1
                                                || tick.toString().substr(0,1) == 5
                                                || tick.toString() == 0
                                            )
                                            {
                                                return tick.toLocaleString();
                                            }
                                        }
                                    }
                                },
                            );
                        }
                        else if(this.yAxis[y] == 'average')
                        {
                            data.datasets.push(
                                {
                                    label: 'Average growth (' + this.data[x].name.full + ')',
                                    type: this.options.chartsettings[x][metric].type,
                                    backgroundColor: this.options.chartsettings[x][metric].color,
                                    borderColor: this.options.chartsettings[x][metric].border,
                                    borderDash: [10, 5],
                                    borderWidth: 2,
                                    pointRadius: 5,
                                    fill: false,
                                    data: _.clone(content[x].average),
                                    yAxisID: 'y-average'
                                }
                            );
                            options.scales.yAxes.push(
                                {
                                    responsive: true,
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Average growth',
                                    },
                                    type: this.options.chartsettings[x][metric].scale,
                                    display: true,
                                    position: position,
                                    id: 'y-average',

                                    // grid line settings
                                    gridLines: {
                                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                                    },
                                    ticks: {
                                        fontColor: '#2c3531',
                                        callback: function(tick, index, ticks) {
                                            if(
                                                tick.toString().substr(0,1) == 1
                                                || tick.toString().substr(0,1) == 5
                                                || tick.toString() == 0
                                            )
                                            {
                                                return tick.toLocaleString();
                                            }
                                        }
                                    }
                                },
                            );
                        }
                        else if(this.yAxis[y] == 'growthFactor')
                        {
                            data.datasets.push(
                                {
                                    label: 'Growth factor (' + this.data[x].name.full + ')',
                                    type: this.options.chartsettings[x][metric].type,
                                    backgroundColor: this.options.chartsettings[x][metric].color,
                                    borderColor: this.options.chartsettings[x][metric].border,
                                    borderDash: [10, 5],
                                    borderWidth: 2,
                                    pointRadius: 5,
                                    fill: false,
                                    data: _.clone(content[x].growthFactor),
                                    yAxisID: 'y-growthFactor'
                                }
                            );
                            options.scales.yAxes.push(
                                {
                                    responsive: true,
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Growth Factor',
                                    },
                                    type: this.options.chartsettings[x][metric].scale,
                                    display: true,
                                    position: position,
                                    id: 'y-growthFactor',

                                    // grid line settings
                                    gridLines: {
                                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                                    },
                                    ticks: {
                                        fontColor: '#2c3531',
                                        callback: function(tick, index, ticks) {
                                            return tick.toLocaleString()
                                        }
                                    }
                                },
                            );
                        }
                    }
                }

                return {
                    data: data,
                    options: options
                };
            },
            datasetCaseCount()
            {
                var data = {
                        labels: [],
                        datasets: [],
                    },
                    options,
                    key,
                    totalDays = 0,
                    content = [],
                    background = this.options.background;


                // OPTIONS

                options = {

                    responsive: true,
                    maintainAspectRatio: false,
                    hoverMode: 'index',
                    stacked: false,
                    legend: {
                        labels: {
                            fontColor: '#2c3531'
                        }
                    },
                    scales: {
                        xAxes: [{
                            ticks: {
                                fontColor: '#2c3531',
                                callback: function(dataLabel, index) {
                                    return index % 4 === 0 ? dataLabel : '';
                                }
                            }
                        }],
                        yAxes: [
                        ],
                    },
                    plugins: {
                        zoom: {
                            pan: {
                                enabled: true,
                                mode: 'xy',


                            },
                            zoom: {
                                enabled: true,
                                mode: 'xy',
                            }
                        }
                    },
                    watermark: {
                        image: '/img/logo/logo-text.png',
                        x: 100,
                        y: 70,
                        width: 194,
                        height: 250,
                        opacity: 0.1,
                        alignX: "right",
                        alignY: "bottom",
                        alignToChartArea: false,
                        position: "back",
                    }
                };


                var count = 0;
                for(var x in this.data){
                    count++;
                }

                // Exit if there are no countries to compare
                if(count == 0)
                    return data;

                // Assemble content
                for(var country_index = 0; country_index < this.data.length; country_index++)
                {
                    var start = false;
                    for(var x in this.data[country_index].daily)
                    {
                        var row = this.data[country_index].daily[x];
                        // We haven't started logging yet
                        if(!start)
                        {
                            if(this.options.mode == 'from1' && parseInt(row.c) >= 1)
                            {
                                start = true;
                            }
                            else if(this.options.mode == 'from100' && parseInt(row.c) >= 100)
                            {
                                start = true;
                            }
                            else if(this.options.mode == 'from1death' && parseInt(row.d) >= 1)
                            {
                                start = true;
                            }
                        }



                        // Now let's get ready to log
                        if(start)
                        {
                            // Initialise this new row
                            if(!content[x])
                            {
                                content.push(
                                    {
                                        confirmed: [],
                                        deaths: [],
                                        recovered: [],
                                        active: [],
                                        deltaConfirmed: [],
                                        deltaDeaths: [],
                                        deltaRecovered: [],
                                        average: [],
                                        growthFactor: [],
                                    }
                                );
                            }

                            content[country_index].confirmed.push(row.c);
                            content[country_index].deaths.push(row.d);
                            content[country_index].recovered.push(row.r);
                            content[country_index].active.push(row.a);
                            content[country_index].deltaConfirmed.push(row.delta.c);
                            content[country_index].deltaDeaths.push(row.delta.d);
                            content[country_index].deltaRecovered.push(row.delta.r);
                            content[country_index].average.push(Math.round(row.average.c * 100)/100);
                            content[country_index].growthFactor.push(Math.round(row.growth.c * 100)/100);
                        }
                    }
                    if(totalDays < content[country_index].confirmed.length)
                    {
                        totalDays = content[country_index].confirmed.length;
                    }
                }

                for(var x = 1; x <= totalDays; x++)
                {
                    data.labels.push('Day ' + x);
                }

                var position = '',
                    chartType = '',
                    metric = '',
                    border = '';


                // Assemble labels
                for(var x = 0; x < this.data.length; x++)
                {
                    for(var y in this.yAxis)
                    {
                        if (y == 0)
                        {
                            position = 'left';
                            chartType = 'bar';
                            metric = 'primary';
                            border = 'borderPrimary';
                        }
                        else
                        {
                            position = 'right';
                            chartType = 'bar';
                            metric = 'secondary';
                            border = 'borderSecondary';
                        }
                        if(this.yAxis[y] == 'confirmed')
                        {
                            data.datasets.push(
                                {
                                    label: 'Confirmed (' + this.data[x].name.full + ')',
                                    type: this.options.chartsettings[x][metric].type,
                                    backgroundColor: this.options.chartsettings[x][metric].color,
                                    borderColor: this.options.chartsettings[x][metric].border,
                                    borderDash: [10, 5],
                                    borderWidth: 2,
                                    pointRadius: 5,
                                    fill: false,
                                    data: _.cloneDeep(content[x].confirmed),
                                    yAxisID: 'y-confirmed'
                                }
                            );

                            options.scales.yAxes.push(
                                {
                                    responsive: true,
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Confirmed',
                                    },
                                    type: this.options.chartsettings[x][metric].scale,
                                    display: true,
                                    position: position,
                                    id: 'y-confirmed',

                                    // grid line settings
                                    gridLines: {
                                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                                    },
                                    ticks: {
                                        fontColor: '#2c3531',
                                        callback: function(tick, index, ticks) {
                                            if(
                                                tick.toString().substr(0,1) == 1
                                                || tick.toString().substr(0,1) == 5
                                                || tick.toString() == 0
                                            )
                                            {
                                                return tick.toLocaleString();
                                            }
                                        }
                                    }
                                },
                            );
                        }
                        else if(this.yAxis[y] == 'deaths')
                        {
                            data.datasets.push(
                                {
                                    label: 'Deaths (' + this.data[x].name.full + ')',
                                    type: this.options.chartsettings[x][metric].type,
                                    backgroundColor: this.options.chartsettings[x][metric].color,
                                    borderColor: this.options.chartsettings[x][metric].border,
                                    borderDash: [10, 5],
                                    borderWidth: 2,
                                    pointRadius: 5,
                                    fill: false,
                                    data: _.cloneDeep(content[x].deaths),
                                    yAxisID: 'y-deaths'
                                }
                            );
                            options.scales.yAxes.push(
                                {
                                    responsive: true,
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Deaths',
                                    },
                                    type: this.options.chartsettings[x][metric].scale,
                                    display: true,
                                    position: position,
                                    id: 'y-deaths',

                                    // grid line settings
                                    gridLines: {
                                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                                    },
                                    ticks: {
                                        fontColor: '#2c3531',
                                        callback: function(tick, index, ticks) {
                                            if(
                                                tick.toString().substr(0,1) == 1
                                                || tick.toString().substr(0,1) == 5
                                                || tick.toString() == 0
                                            )
                                            {
                                                return tick.toLocaleString();
                                            }
                                        }
                                    }
                                },
                            );
                        }
                        else if(this.yAxis[y] == 'recovered')
                        {
                            data.datasets.push(
                                {
                                    label: 'Recovered (' + this.data[x].name.full + ')',
                                    type: this.options.chartsettings[x][metric].type,
                                    backgroundColor: this.options.chartsettings[x][metric].color,
                                    borderColor: this.options.chartsettings[x][metric].border,
                                    borderDash: [10, 5],
                                    borderWidth: 2,
                                    pointRadius: 5,
                                    fill: false,
                                    data: _.cloneDeep(content[x].recovered),
                                    yAxisID: 'y-recovered'
                                }
                            );
                            options.scales.yAxes.push(
                                {
                                    responsive: true,
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Recovered',
                                    },
                                    type: this.options.chartsettings[x][metric].scale,
                                    display: true,
                                    position: position,
                                    id: 'y-recovered',

                                    // grid line settings
                                    gridLines: {
                                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                                    },
                                    ticks: {
                                        fontColor: '#2c3531',
                                        callback: function(tick, index, ticks) {
                                            if(
                                                tick.toString().substr(0,1) == 1
                                                || tick.toString().substr(0,1) == 5
                                                || tick.toString() == 0
                                            )
                                            {
                                                return tick.toLocaleString();
                                            }
                                        }
                                    }
                                },
                            );
                        }
                        else if(this.yAxis[y] == 'active')
                        {
                            data.datasets.push(
                                {
                                    label: 'Active (' + this.data[x].name.full + ')',
                                    type: this.options.chartsettings[x][metric].type,
                                    backgroundColor: this.options.chartsettings[x][metric].color,
                                    borderColor: this.options.chartsettings[x][metric].border,
                                    borderDash: [10, 5],
                                    borderWidth: 2,
                                    pointRadius: 5,
                                    fill: false,
                                    data: _.cloneDeep(content[x].active),
                                    yAxisID: 'y-active'
                                }
                            );
                            options.scales.yAxes.push(
                                {
                                    responsive: true,
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Active',
                                    },
                                    type: this.options.chartsettings[x][metric].scale,
                                    display: true,
                                    position: position,
                                    id: 'y-active',

                                    // grid line settings
                                    gridLines: {
                                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                                    },
                                    ticks: {
                                        fontColor: '#2c3531',
                                        callback: function(tick, index, ticks) {
                                            if(
                                                tick.toString().substr(0,1) == 1
                                                || tick.toString().substr(0,1) == 5
                                                || tick.toString() == 0
                                            )
                                            {
                                                return tick.toLocaleString();
                                            }
                                        }
                                    }
                                },
                            );
                        }
                        else if(this.yAxis[y] == 'deltaConfirmed')
                        {
                            data.datasets.push(
                                {
                                    label: 'New cases per day (' + this.data[x].name.full + ')',
                                    type: this.options.chartsettings[x][metric].type,
                                    backgroundColor: this.options.chartsettings[x][metric].color,
                                    borderColor: this.options.chartsettings[x][metric].border,
                                    borderDash: [10, 5],
                                    borderWidth: 2,
                                    pointRadius: 5,
                                    fill: false,
                                    data: _.cloneDeep(content[x].deltaConfirmed),
                                    yAxisID: 'y-deltaConfirmed'
                                }
                            );
                            options.scales.yAxes.push(
                                {
                                    responsive: true,
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'New cases per day',
                                    },
                                    type: this.options.chartsettings[x][metric].scale,
                                    display: true,
                                    position: position,
                                    id: 'y-deltaConfirmed',

                                    // grid line settings
                                    gridLines: {
                                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                                    },
                                    ticks: {
                                        fontColor: '#2c3531',
                                        callback: function(tick, index, ticks) {
                                            if(
                                                tick.toString().substr(0,1) == 1
                                                || tick.toString().substr(0,1) == 5
                                                || tick.toString() == 0
                                            )
                                            {
                                                return tick.toLocaleString();
                                            }
                                        }
                                    }
                                },
                            );
                        }
                        else if(this.yAxis[y] == 'deltaDeaths')
                        {
                            data.datasets.push(
                                {
                                    label: 'New deaths per day (' + this.data[x].name.full + ')',
                                    type: this.options.chartsettings[x][metric].type,
                                    backgroundColor: this.options.chartsettings[x][metric].color,
                                    borderColor: this.options.chartsettings[x][metric].border,
                                    borderDash: [10, 5],
                                    borderWidth: 2,
                                    pointRadius: 5,
                                    fill: false,
                                    data: _.cloneDeep(content[x].deltaDeaths),
                                    yAxisID: 'y-deltaDeaths'
                                }
                            );
                            options.scales.yAxes.push(
                                {
                                    responsive: true,
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'New deaths per day',
                                    },
                                    type: this.options.chartsettings[x][metric].scale,
                                    display: true,
                                    position: position,
                                    id: 'y-deltaDeaths',

                                    // grid line settings
                                    gridLines: {
                                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                                    },
                                    ticks: {
                                        fontColor: '#2c3531',
                                        callback: function(tick, index, ticks) {
                                            if(
                                                tick.toString().substr(0,1) == 1
                                                || tick.toString().substr(0,1) == 5
                                                || tick.toString() == 0
                                            )
                                            {
                                                return tick.toLocaleString();
                                            }
                                        }
                                    }
                                },
                            );
                        }
                        else if(this.yAxis[y] == 'deltaRecovered')
                        {
                            data.datasets.push(
                                {
                                    label: 'New recoveries per day (' + this.data[x].name.full + ')',
                                    type: this.options.chartsettings[x][metric].type,
                                    backgroundColor: this.options.chartsettings[x][metric].color,
                                    borderColor: this.options.chartsettings[x][metric].border,
                                    borderDash: [10, 5],
                                    borderWidth: 2,
                                    pointRadius: 5,
                                    fill: false,
                                    data: _.cloneDeep(content[x].deltaRecovered),
                                    yAxisID: 'y-deltaRecovered'
                                }
                            );
                            options.scales.yAxes.push(
                                {
                                    responsive: true,
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'New recoveries per day',
                                    },
                                    type: this.options.chartsettings[x][metric].scale,
                                    display: true,
                                    position: position,
                                    id: 'y-deltaRecovered',

                                    // grid line settings
                                    gridLines: {
                                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                                    },
                                    ticks: {
                                        fontColor: '#2c3531',
                                        callback: function(tick, index, ticks) {
                                            if(
                                                tick.toString().substr(0,1) == 1
                                                || tick.toString().substr(0,1) == 5
                                                || tick.toString() == 0
                                            )
                                            {
                                                return tick.toLocaleString();
                                            }
                                        }
                                    }
                                },
                            );
                        }
                        else if(this.yAxis[y] == 'average')
                        {
                            data.datasets.push(
                                {
                                    label: 'Average growth (' + this.data[x].name.full + ')',
                                    type: this.options.chartsettings[x][metric].type,
                                    backgroundColor: this.options.chartsettings[x][metric].color,
                                    borderColor: this.options.chartsettings[x][metric].border,
                                    borderDash: [10, 5],
                                    borderWidth: 2,
                                    pointRadius: 5,
                                    fill: false,
                                    data: _.cloneDeep(content[x].average),
                                    yAxisID: 'y-average'
                                }
                            );
                            options.scales.yAxes.push(
                                {
                                    responsive: true,
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Average growth',
                                    },
                                    type: this.options.chartsettings[x][metric].scale,
                                    display: true,
                                    position: position,
                                    id: 'y-average',

                                    // grid line settings
                                    gridLines: {
                                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                                    },
                                    ticks: {
                                        fontColor: '#2c3531',
                                        callback: function(tick, index, ticks) {
                                            if(
                                                tick.toString().substr(0,1) == 1
                                                || tick.toString().substr(0,1) == 5
                                                || tick.toString() == 0
                                            )
                                            {
                                                return tick.toLocaleString();
                                            }
                                        }
                                    }
                                },
                            );
                        }
                        else if(this.yAxis[y] == 'growthFactor')
                        {
                            data.datasets.push(
                                {
                                    label: 'Growth factor (' + this.data[x].name.full + ')',
                                    type: this.options.chartsettings[x][metric].type,
                                    backgroundColor: this.options.chartsettings[x][metric].color,
                                    borderColor: this.options.chartsettings[x][metric].border,
                                    borderDash: [10, 5],
                                    borderWidth: 2,
                                    pointRadius: 5,
                                    fill: false,
                                    data: _.cloneDeep(content[x].growthFactor),
                                    yAxisID: 'y-growthFactor'
                                }
                            );
                            options.scales.yAxes.push(
                                {
                                    responsive: true,
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Growth factor',
                                    },
                                    type: this.options.chartsettings[x][metric].scale,
                                    display: true,
                                    position: position,
                                    id: 'y-growthFactor',

                                    // grid line settings
                                    gridLines: {
                                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                                    },
                                    ticks: {
                                        fontColor: '#2c3531',
                                        callback: function(tick, index, ticks) {
                                            if(
                                                tick.toString().substr(0,1) == 1
                                                || tick.toString().substr(0,1) == 5
                                                || tick.toString() == 0
                                            )
                                            {
                                                return tick.toLocaleString();
                                            }
                                        }
                                    }
                                },
                            );
                        }
                    }
                }

                return {
                    data: data,
                    options: options
                };
            },
        },
    }
</script>

<style scoped>

</style>
