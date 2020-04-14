<template>
    <div>
        <div>
            <div class="absolute left-0 right-0 bottom-0 top-0 p-4">
                <div class="text-xs flex items-start justify-between">
                    <div class="flex items-center">
                        <div class="mr-2">Time mode</div>
                        <div class="flex">
                            <div v-for="row in graphControls.x" class="p-2 border border-hoverslab m-1 cursor-pointer" :class="selectedMode(row[0]) ? 'bg-hoverslab':''">
                                {{row[1]}}
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <div class="mr-2">Metrics</div>
                        <div class="flex border border-hoverslab m-1 cursor-pointer p-2 relative">
                            <div @click="ui.primary = !ui.primary" class="w-48" v-if="options.controls.primary">{{getFieldName(options.controls.primary)}}</div>
                            <div @click="ui.primary = !ui.primary" class="w-48" v-else>Select primary metric</div>
                            <div v-show="ui.primary" class="absolute z-10 bg-hoverslab shadow w-52 right-0 top-0 p-2">
                                <div v-for="row in graphControls.y" class="p-2 m-1" @click="selectField(row[0],'primary')">
                                    {{row[1]}}
                                </div>
                            </div>
                        </div>
                        <div class="flex border border-hoverslab m-1 cursor-pointer p-2 relative">
                            <div @click="ui.secondary = !ui.secondary"class="w-48" v-if="options.controls.secondary">{{getFieldName(options.controls.secondary)}}</div>
                            <div @click="ui.secondary = !ui.secondary" class="w-48" v-else>Select secondary metric</div>
                            <div v-show="ui.secondary" class="absolute z-10 bg-hoverslab shadow w-52 right-0 top-0 p-2">
                                <div class="p-2 m-1"  @click="selectField('','secondary')">None</div>
                                <div v-for="row in graphControls.y" class="p-2 m-1" @click="selectField(row[0],'secondary')">
                                    {{row[1]}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-hoverslab p-2 absolute rounded left-0 top-0 right-0 bottom-0 mt-16">
            <simplebar data-simplebar-auto-hide="false" class="h-full">
                <LineChart :data="dataset.data"
                           :options="dataset.options"
                           class="h-200 m-4 mb-0"
                />
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
                    }

                },
                ui : {
                    'primary' : false,
                    'secondary' : false,
                },
                'graphControls' : {
                    'x' : [
                        ['chronological','Chronological'],
                        ['ordinal','From first case (todo)'],
                        ['from100','From 100 cases (todo)'],
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
                    ]
                },
                stats: {}
            }
        },
        props: [
            'data',
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
                console.log(data);
                return data;
            },
            dataset()
            {
                var xAxis = this.xAxis,
                    yAxis = this.yAxis;


                if (this.xAxis == 'chronological')
                {
                    return this.datasetChronological;
                }
                else if (this.xAxis == '100')
                {
                    return this.dataset100;
                }
                else if (this.xAxis == 'delta')
                {
                    return this.datasetDelta;
                }
                else if (this.xAxis == 'growth')
                {
                    return this.datasetGrowth;
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
                    background = [
                        {
                            primary: '#19aade',
                            secondary: '#eabd3b',
                            confirmed: '#19aade',
                            deaths: '#c7f9ee',
                            recovered: '#1de4bd',
                            growthFactor: '#1de4bd',
                            deltaConfirmed: '#1de4bd',
                            deltaDeaths: '#1de4bd',
                            deltaRecovered: '#1de4bd',
                            average: '#1de4bd',

                        },
                        {
                            confirmed: '#af4bce',
                            deaths: '#f0a58f',
                            recovered: '#ea7369',
                            growthFactor: '#ea7369',
                            deltaConfirmed: '#1de4bd',
                            deltaDeaths: '#1de4bd',
                            deltaRecovered: '#1de4bd',
                            average: '#1de4bd',
                        },
                        {
                            confirmed: '#de542c',
                            deaths: '#e7e34e',
                            recovered: '#eabd3b',
                            growthFactor: '#eabd3b',
                            deltaConfirmed: '#1de4bd',
                            deltaDeaths: '#1de4bd',
                            deltaRecovered: '#1de4bd',
                            average: '#1de4bd',

                        },
                    ];


                // OPTIONS

                options = {

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
                                }
                                else
                                {
                                    content[y].confirmed.push(0);
                                    content[y].deaths.push(0);
                                    content[y].recovered.push(0);
                                }
                            }
                        }
                    }
                }

                var position = '',
                    chartType = '',
                    metric = '';


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
                        }
                        else
                        {
                            position = 'right';
                            chartType = 'bar';
                            metric = 'secondary';
                        }
                        if(this.yAxis[y] == 'confirmed')
                        {
                            data.datasets.push(
                                {
                                    type: chartType,
                                    label: 'Confirmed (' + this.data[x].name.full + ')',
                                    backgroundColor: background[x][metric],
                                    fill: false,
                                    data: _.cloneDeep(content[x].confirmed),
                                    yAxisID: 'y-confirmed'
                                }
                            );

                            options.scales.yAxes.push(
                                {
                                    type: 'logarithmic',
                                    display: true,
                                    position: position,
                                    id: 'y-confirmed',

                                    // grid line settings
                                    gridLines: {
                                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                                    },
                                    ticks: {
                                        fontColor: '#d1e8e2',
                                        callback: function(tick, index, ticks) {
                                            return tick.toLocaleString()
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
                                    data: _.cloneDeep(content[x].deaths),
                                    yAxisID: 'y-deaths'
                                }
                            );
                            options.scales.yAxes.push(
                                {
                                    type: 'logarithmic',
                                    display: true,
                                    position: position,
                                    id: 'y-deaths',

                                    // grid line settings
                                    gridLines: {
                                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                                    },
                                    ticks: {
                                        fontColor: '#d1e8e2',
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
                                    data: _.cloneDeep(content[x].recovered),
                                    yAxisID: 'y-recovered'
                                }
                            );
                            options.scales.yAxes.push(
                                {
                                    type: 'logarithmic',
                                    display: true,
                                    position: position,
                                    id: 'y-recovered',

                                    // grid line settings
                                    gridLines: {
                                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                                    },
                                    ticks: {
                                        fontColor: '#d1e8e2',
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
                                    data: _.cloneDeep(content[x].deltaConfirmed),
                                    yAxisID: 'y-deltaConfirmed'
                                }
                            );
                            options.scales.yAxes.push(
                                {
                                    type: 'logarithmic',
                                    display: true,
                                    position: position,
                                    id: 'y-deltaConfirmed',

                                    // grid line settings
                                    gridLines: {
                                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                                    },
                                    ticks: {
                                        fontColor: '#d1e8e2',
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
                                    label: 'New cases per day (' + this.data[x].name.full + ')',
                                    backgroundColor: background[x][metric],
                                    data: _.cloneDeep(content[x].deltaDeaths),
                                    yAxisID: 'y-deltaDeaths'
                                }
                            );
                            options.scales.yAxes.push(
                                {
                                    type: 'logarithmic',
                                    display: true,
                                    position: position,
                                    id: 'y-deltaDeaths',

                                    // grid line settings
                                    gridLines: {
                                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                                    },
                                    ticks: {
                                        fontColor: '#d1e8e2',
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
                                    label: 'New cases per day (' + this.data[x].name.full + ')',
                                    backgroundColor: background[x][metric],
                                    data: _.cloneDeep(content[x].deltaRecovered),
                                    yAxisID: 'y-deltaRecovered'
                                }
                            );
                            options.scales.yAxes.push(
                                {
                                    type: 'logarithmic',
                                    display: true,
                                    position: position,
                                    id: 'y-deltaRecovered',

                                    // grid line settings
                                    gridLines: {
                                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                                    },
                                    ticks: {
                                        fontColor: '#d1e8e2',
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
                                    label: 'Growth factor (' + this.data[x].name.full + ')',
                                    backgroundColor: background[x][metric],
                                    fill: false,
                                    data: _.cloneDeep(content[x].average),
                                    yAxisID: 'y-average'
                                }
                            );
                            options.scales.yAxes.push(
                                {
                                    type: 'logarithmic',
                                    display: true,
                                    position: position,
                                    id: 'y-average',

                                    // grid line settings
                                    gridLines: {
                                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                                    },
                                    ticks: {
                                        fontColor: '#d1e8e2',
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
                                    fill: false,
                                    data: _.cloneDeep(content[x].growthFactor),
                                    yAxisID: 'y-growthFactor'
                                }
                            );
                            options.scales.yAxes.push(
                                {
                                    type: 'logarithmic',
                                    display: true,
                                    position: position,
                                    id: 'y-growthFactor',

                                    // grid line settings
                                    gridLines: {
                                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                                    },
                                    ticks: {
                                        fontColor: '#d1e8e2',
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
            dataset100()
            {
                var data = {
                        labels: [],
                        datasets: [],
                    },
                    options,
                    key,
                    bgConfirmed = [
                        '#19aade',
                        '#af4bce',
                        '#de542c'
                    ],
                    bgRecovered = [
                        '#1de4bd',
                        '#ea7369',
                        '#eabd3b'
                    ],
                    bgDeaths = [
                        '#c7f9ee',
                        '#f0a58f',
                        '#e7e34e'
                    ]

                var count = 0;
                for(var x in this.data){
                    count++;
                }
                if(count == 0)
                    return data;


                var labels = [];
                var confirmed = {
                        '0' : [],
                        '1' : [],
                        '2' : [],
                    }
                    ,
                    deaths = {
                        '0' : [],
                        '1' : [],
                        '2' : [],
                    },
                    recovered = {
                        '0' : [],
                        '1' : [],
                        '2' : [],
                    };




                for(var x in this.data)
                {
                    var found = false;
                    var stats = this.data[x].daily;

                    for(var y in stats)
                    {
                        var row = stats[y];
                        if (found || row.confirmed >= 100)
                        {
                            found = true;
                            confirmed[x].push(row.confirmed);
                            deaths[x].push(row.deaths);
                            recovered[x].push(row.recovered);
                        }
                    }
                }

                // Assemble labels
                var max = 1;
                for(var x in this.data)
                {
                    if(confirmed[x].length > max)
                    {
                        max = confirmed[x].length;
                    }
                }

                for(var x = 1; x <= max; x++)
                {
                    data.labels.push('Day ' + x);
                }

                // Assemble labels
                for(var x in this.data)
                {
                    data.datasets.push(
                        {
                            type: 'line',
                            label: 'Confirmed (' + this.data[x].name.full + ')',
                            backgroundColor: bgConfirmed[x],
                            data: _.cloneDeep(confirmed[x]),
                            yAxisID: 'y-1'
                        },
                        {
                            type: 'bar',
                            label: 'Deaths (' + this.data[x].name.full + ')',
                            backgroundColor: bgDeaths[x],
                            data: _.cloneDeep(deaths[x]),
                            yAxisID: 'y-2'
                        },
                        {
                            type: 'bar',
                            label: 'Recovered (' + this.data[x].name.full + ')',
                            backgroundColor: bgRecovered[x],
                            data: _.cloneDeep(recovered[x]),
                            yAxisID: 'y-3'
                        }
                    );
                }

                // OPTIONS

                options = {

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
                        }, {
                            type: 'logarithmic',
                            display: true,
                            position: 'right',
                            id: 'y-2',

                            // grid line settings
                            gridLines: {
                                drawOnChartArea: false, // only want the grid lines for one axis to show up
                            },
                            ticks: {
                                fontColor: '#d1e8e2',
                                callback: function(tick, index, ticks) {
                                    return tick.toLocaleString()
                                }
                            }
                        }, {
                            type: 'logarithmic',
                            display: true,
                            position: 'right',
                            id: 'y-3',

                            // grid line settings
                            gridLines: {
                                drawOnChartArea: false, // only want the grid lines for one axis to show up
                            },
                            ticks: {
                                fontColor: '#d1e8e2',
                                callback: function(tick, index, ticks) {
                                    return tick.toLocaleString()
                                }
                            }
                        }
                        ],
                    }
                };

                return {
                    data: data,
                    options: options
                };
            },
            datasetDelta()
            {
                var data = {
                        labels: [],
                        datasets: [],
                    },
                    options,
                    key,
                    bgConfirmed = [
                        '#19aade',
                        '#af4bce',
                        '#de542c'
                    ],
                    bgRecovered = [
                        '#1de4bd',
                        '#ea7369',
                        '#eabd3b'
                    ],
                    bgDeaths = [
                        '#c7f9ee',
                        '#f0a58f',
                        '#e7e34e'
                    ]


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
                    var stats = this.data[x].delta;
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

                var labels = [];
                var confirmed = {
                        '0' : [],
                        '1' : [],
                        '2' : [],
                    }
                    ,
                    deaths = {
                        '0' : [],
                        '1' : [],
                        '2' : [],
                    },
                    recovered = {
                        '0' : [],
                        '1' : [],
                        '2' : [],
                    };

                for(var x = 0; x <= moment(end).diff(moment(start),'days'); x++)
                {

                    var current_date = _.clone(moment(start).add(x,'days').format('YYYY-MM-DD'))
                    data.labels.push(current_date);
                    for(var y in this.data)
                    {

                        if(this.data[y].delta)
                        {

                            var found = false;
                            var stats = this.data[y].delta;

                            for(var z in stats)
                            {
                                var row = stats[z];
                                if(moment(row.date).format('YYYY-MM-DD') === current_date)
                                {
                                    confirmed[y].push(row.confirmed);
                                    deaths[y].push(row.deaths);
                                    recovered[y].push(row.recovered);
                                    found = true;
                                }
                            }

                            // If today's data is missing, use previous day's
                            if (!found)
                            {
                                if (confirmed[y].length > 0)
                                {
                                    confirmed[y].push(confirmed[confirmed[y].length]);
                                    deaths[y].push(deaths[deaths[y].length]);
                                    recovered[y].push(recovered[recovered[y].length]);
                                }
                                else
                                {
                                    confirmed[y].push(0);
                                    deaths[y].push(0);
                                    recovered[y].push(0);
                                }
                            }
                        }
                    }
                }

                // Assemble labels
                for(var x in this.data)
                {
                    data.datasets.push(
                        {
                            type: 'line',
                            label: 'Confirmed (' + this.data[x].name.full + ')',
                            backgroundColor: bgConfirmed[x],
                            data: _.cloneDeep(confirmed[x]),
                            yAxisID: 'y-1'
                        },
                        {
                            type: 'bar',
                            label: 'Deaths (' + this.data[x].name.full + ')',
                            backgroundColor: bgDeaths[x],
                            data: _.cloneDeep(deaths[x]),
                            yAxisID: 'y-2'
                        },
                        {
                            type: 'bar',
                            label: 'Recovered (' + this.data[x].name.full + ')',
                            backgroundColor: bgRecovered[x],
                            data: _.cloneDeep(recovered[x]),
                            yAxisID: 'y-3'
                        }
                    );
                }


                // OPTIONS

                options = {

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
                        }, {
                            type: 'logarithmic',
                            display: true,
                            position: 'right',
                            id: 'y-2',

                            // grid line settings
                            gridLines: {
                                drawOnChartArea: false, // only want the grid lines for one axis to show up
                            },
                            ticks: {
                                fontColor: '#d1e8e2',
                                callback: function(tick, index, ticks) {
                                    return tick.toLocaleString()
                                }
                            }
                        }, {
                            type: 'logarithmic',
                            display: true,
                            position: 'right',
                            id: 'y-3',

                            // grid line settings
                            gridLines: {
                                drawOnChartArea: false, // only want the grid lines for one axis to show up
                            },
                            ticks: {
                                fontColor: '#d1e8e2',
                                callback: function(tick, index, ticks) {
                                    return tick.toLocaleString()
                                }
                            }
                        }
                        ],
                    }
                };


                return {
                    data: data,
                    options: options
                };
            },
            datasetGrowth()
            {
                const arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length;

                var data = {
                        labels: [],
                        datasets: [],
                    },
                    options,
                    key,
                    bgConfirmed = [
                        '#19aade',
                        '#af4bce',
                        '#de542c'
                    ],
                    bgRecovered = [
                        '#1de4bd',
                        '#ea7369',
                        '#eabd3b'
                    ],
                    bgDeaths = [
                        '#c7f9ee',
                        '#f0a58f',
                        '#e7e34e'
                    ]


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

                // Assemble labels
                for(var country_index in this.data)
                {
                    data.datasets.push(
                        {
                            type: 'line',
                            label: this.data[country_index].name.full,
                            backgroundColor: bgConfirmed[country_index],
                            data: [],
                            yAxisID: 'y-1'
                        }
                    );
                }

                for(var x = 0; x <= moment(end).diff(moment(start),'days'); x++) {
                    var current_date = _.clone(moment(start).add(x, 'days').format('YYYY-MM-DD'))
                    data.labels.push(current_date);
                }


                for(var x in this.data)
                {
                    var diff = moment(this.data[x].daily[0].date).diff(moment(start),'days');
                    if (moment(this.data[x].daily[0].date) > moment(start))
                    {

                        for(var y = 0; y < diff; y++)
                        {
                            data.datasets[x].data.push(0)
                        }
                    }

                    for(var y in this.data[x].growthFactor)
                    {

                        var gf = 0;
                        gf = parseFloat(this.data[x].growthFactor[y]).toFixed(2);
                        if(isNaN(gf))
                        {
                            gf = 0;
                        }
                        data.datasets[x].data.push(gf);
                    }
                }


                // OPTIONS

                options = {

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
                        }
                        ],
                    }
                };

                return {
                    data: data,
                    options: options
                };
            }
        }
    }
</script>

<style scoped>

</style>
