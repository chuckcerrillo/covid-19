<template>
    <div>
        <div>
            <div class="absolute left-0 right-0 bottom-0 top-0 py-4" v-if="settings.controls.menu">
                <div class="text-xs flex items-start justify-between">
                    <div class="flex items-center">
                        <div class="mr-2">Scale</div>
                        <div class="flex">
                            <div v-for="row in graphControls.scaleType"
                                 class="p-2 border border-hoverslab m-1 cursor-pointer"
                                 :class="selectedScaleType(row[0]) ? 'bg-hoverslab':''"
                                 @click="selectScaleType(row[0])"
                            >
                                {{row[1]}}
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <div class="mr-2">Metrics</div>
                        <div class="flex border border-hoverslab bg-hoverslab m-1 cursor-pointer p-2 relative">
                            <div @click="ui.primary = !ui.primary" class="w-32 truncate ..." v-if="options.controls.primary">{{getFieldName(options.controls.primary)}}</div>
                            <div @click="ui.primary = !ui.primary" class="w-32" v-else>Select primary metric</div>
                            <div v-show="ui.primary" class="absolute z-10 bg-slab border-hoverslab shadow w-44 right-0 top-0 p-2 border border-hoverslab">
                                <div v-for="row in graphControls.y" class="p-2 m-1 hover:bg-hoverslab" @click="selectField(row[0],'primary')">
                                    {{row[1]}}
                                </div>
                            </div>
                        </div>
                        <div class="flex border border-hoverslab bg-hoverslab m-1 mr-0 cursor-pointer p-2 relative">
                            <div @click="ui.secondary = !ui.secondary" class="w-32 truncate ..." v-if="options.controls.secondary">{{getFieldName(options.controls.secondary)}}</div>
                            <div @click="ui.secondary = !ui.secondary" class="w-32" v-else>Select secondary metric</div>
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
        </div>
        <div class="bg-hoverslab p-2 absolute rounded left-0 top-0 right-0 bottom-0" :class="settings.controls.menu ? 'mt-16' : ''">
            <simplebar data-simplebar-auto-hide="false" class="h-full">
                <LineChart :data="dataset.data"
                           :options="dataset.options"
                           class="bg-heading rounded"
                           :class="full ? (settings.controls.menu ? 'absolute top-0 bottom-0 right-0 left-0 m-2 mb-16': 'absolute top-0 bottom-0 right-0 left-0 m-2') : 'h-200 m-4 mb-0'"
                           v-if="data.length > 0"
                />
                <div class="text-xs absolute left-0 right-0 bottom-0 h-12 flex items-start justify-between" v-if="settings.controls.menu">
                    <div class="flex items-center justify-start">
                        <div class="mr-2">Time mode</div>
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
            </simplebar>
        </div>
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
                'options' : {
                    'mode': 'chronological',

                    'controls' : {
                        'primary': 'confirmed',
                        'secondary' : '',
                        'scaleType' : 'logarithmic',
                        'menu' : true,
                    },

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
                    ]

                },
                ui : {
                    'primary' : false,
                    'secondary' : false,
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
                        ['deltaConfirmed','New confirmed cases per day'],
                        ['deaths','Deaths'],
                        ['deltaDeaths','New deaths per day'],
                        ['recovered','Recoveries'],
                        ['deltaRecovered','New recoveries per day'],
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
        ],
        methods: {
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
            }
        },
        computed: {
            settings()
            {
                return {...this.options, ...this.config};
            },
            xAxis()
            {
                return [
                    this.options.mode
                ];
            },
            yAxis()
            {
                var data = [];

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
                    yAxis = this.yAxis;


                if (this.options.mode == 'chronological')
                {
                    return this.datasetChronological;
                }
                else if (this.options.mode == 'from1' || this.options.mode == 'from100' || this.options.mode == 'from1death')
                {
                    return this.datasetCaseCount;
                }

                else
                {
                    return {
                        data: [],
                        options: {

                                responsive: true,
                                maintainAspectRatio: false,
                                hoverMode: 'index',
                                stacked: false,
                                legend: {
                                    labels: {
                                        fontColor: '#d1e8e2'
                                    }
                                },
                                scales: {
                                    xAxes: [{
                                        ticks: {
                                            fontColor: '#d1e8e2',
                                        }
                                    }],
                                    yAxes: [{
                                        type: 'logarithmic',
                                        display: true,
                                        position: 'left',
                                        id: 'y-1',
                                        ticks: {
                                            fontColor: '#d1e8e2',
                                            callback: function(tick, index, ticks) {
                                                return tick.toLocaleString()
                                            }
                                        }
                                    }],
                                }
                        }
                    }
                }

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
                                    content[y].confirmed.push(row.confirmed);
                                    content[y].deaths.push(row.deaths);
                                    content[y].recovered.push(row.recovered);
                                    content[y].deltaConfirmed.push(this.data[y].delta[z].confirmed);
                                    content[y].deltaDeaths.push(this.data[y].delta[z].deaths);
                                    content[y].deltaRecovered.push(this.data[y].delta[z].recovered);
                                    content[y].average.push(this.data[y].average[z]);
                                    content[y].growthFactor.push(this.data[y].growthFactor[z]);
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
                            chartType = 'line';
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
                                    type: chartType,
                                    label: 'Confirmed (' + this.data[x].name.full + ')',
                                    backgroundColor: background[x][metric],
                                    borderColor: background[x][metric],
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
                                    type: this.options.controls.scaleType,
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
                                    type: chartType,
                                    label: 'Deaths (' + this.data[x].name.full + ')',
                                    backgroundColor: background[x][metric],
                                    borderColor: background[x][metric],
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
                                    type: this.options.controls.scaleType,
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
                                            return tick.toLocaleString()
                                        }
                                    }
                                },
                            );
                        }
                        else if(this.yAxis[y] == 'recovered')
                        {
                            data.datasets.push(
                                {
                                    type: chartType,
                                    label: 'Recovered (' + this.data[x].name.full + ')',
                                    backgroundColor: background[x][metric],
                                    borderColor: background[x][metric],
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
                                    type: this.options.controls.scaleType,
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
                                            return tick.toLocaleString()
                                        }
                                    }
                                },
                            );
                        }
                        else if(this.yAxis[y] == 'deltaConfirmed')
                        {
                            data.datasets.push(
                                {
                                    type: chartType,
                                    label: 'New cases per day (' + this.data[x].name.full + ')',
                                    backgroundColor: background[x][metric],
                                    borderColor: background[x][metric],
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
                                    type: this.options.controls.scaleType,
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
                                            return tick.toLocaleString()
                                        }
                                    }
                                },
                            );
                        }
                        else if(this.yAxis[y] == 'deltaDeaths')
                        {
                            data.datasets.push(
                                {
                                    type: chartType,
                                    label: 'New deaths per day (' + this.data[x].name.full + ')',
                                    backgroundColor: background[x][metric],
                                    borderColor: background[x][metric],
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
                                    type: this.options.controls.scaleType,
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
                                            return tick.toLocaleString()
                                        }
                                    }
                                },
                            );
                        }
                        else if(this.yAxis[y] == 'deltaRecovered')
                        {
                            data.datasets.push(
                                {
                                    type: chartType,
                                    label: 'New recoveries per day (' + this.data[x].name.full + ')',
                                    backgroundColor: background[x][metric],
                                    borderColor: background[x][metric],
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
                                    type: this.options.controls.scaleType,
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
                                            return tick.toLocaleString()
                                        }
                                    }
                                },
                            );
                        }
                        else if(this.yAxis[y] == 'average')
                        {
                            data.datasets.push(
                                {
                                    type: chartType,
                                    label: 'Average growth (' + this.data[x].name.full + ')',
                                    backgroundColor: background[x][metric],
                                    borderColor: background[x][metric],
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
                                    type: this.options.controls.scaleType,
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
                                            return tick.toLocaleString()
                                        }
                                    }
                                },
                            );
                        }
                        else if(this.yAxis[y] == 'growthFactor')
                        {
                            data.datasets.push(
                                {
                                    type: chartType,
                                    label: 'Growth factor (' + this.data[x].name.full + ')',
                                    backgroundColor: background[x][metric],
                                    borderColor: background[x][metric],
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
                                        labelString: 'Growth Factor',
                                    },
                                    type: this.options.controls.scaleType,
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
                            if(this.options.mode == 'from1' && parseInt(row.confirmed) >= 1)
                            {
                                start = true;
                            }
                            else if(this.options.mode == 'from100' && parseInt(row.confirmed) >= 100)
                            {
                                start = true;
                            }
                            else if(this.options.mode == 'from1death' && parseInt(row.deaths) >= 1)
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
                                        deltaConfirmed: [],
                                        deltaDeaths: [],
                                        deltaRecovered: [],
                                        average: [],
                                        growthFactor: [],
                                    }
                                );
                            }

                            content[country_index].confirmed.push(row.confirmed);
                            content[country_index].deaths.push(row.deaths);
                            content[country_index].recovered.push(row.recovered);
                            content[country_index].deltaConfirmed.push(this.data[country_index].delta[x].confirmed);
                            content[country_index].deltaDeaths.push(this.data[country_index].delta[x].deaths);
                            content[country_index].deltaRecovered.push(this.data[country_index].delta[x].recovered);
                            content[country_index].average.push(this.data[country_index].average[x]);
                            content[country_index].growthFactor.push(this.data[country_index].growthFactor[x]);
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
                            chartType = 'line';
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
                                    type: chartType,
                                    label: 'Confirmed (' + this.data[x].name.full + ')',
                                    backgroundColor: background[x][metric],
                                    borderColor: background[x][metric],
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
                                    type: this.options.controls.scaleType,
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
                                    type: chartType,
                                    label: 'Deaths (' + this.data[x].name.full + ')',
                                    backgroundColor: background[x][metric],
                                    borderColor: background[x][metric],
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
                                    type: this.options.controls.scaleType,
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
                                    type: chartType,
                                    label: 'Recovered (' + this.data[x].name.full + ')',
                                    backgroundColor: background[x][metric],
                                    borderColor: background[x][metric],
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
                                    type: this.options.controls.scaleType,
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
                                    type: chartType,
                                    label: 'New cases per day (' + this.data[x].name.full + ')',
                                    backgroundColor: background[x][metric],
                                    borderColor: background[x][metric],
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
                                    type: this.options.controls.scaleType,
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
                                    type: chartType,
                                    label: 'New deaths per day (' + this.data[x].name.full + ')',
                                    backgroundColor: background[x][metric],
                                    borderColor: background[x][metric],
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
                                    type: this.options.controls.scaleType,
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
                                    type: chartType,
                                    label: 'New recoveries per day (' + this.data[x].name.full + ')',
                                    backgroundColor: background[x][metric],
                                    borderColor: background[x][metric],
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
                                    type: this.options.controls.scaleType,
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
                                    type: chartType,
                                    label: 'Average growth (' + this.data[x].name.full + ')',
                                    backgroundColor: background[x][metric],
                                    borderColor: background[x][metric],
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
                                    type: this.options.controls.scaleType,
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
                                    type: chartType,
                                    label: 'Growth factor (' + this.data[x].name.full + ')',
                                    backgroundColor: background[x][metric],
                                    borderColor: background[x][metric],
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
                                    type: this.options.controls.scaleType,
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
        }
    }
</script>

<style scoped>

</style>
