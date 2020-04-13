<template>
    <div>
        <div class="flex">
            <div class="text-sm border px-2 py-1 rounded m-1 cursor-pointer hover:bg-hoverslab hover:text-heading" :class="checkMode('chronological')" @click="setMode('chronological')">Chronological</div>
            <div class="text-sm border px-2 py-1 rounded m-1 cursor-pointer hover:bg-hoverslab hover:text-heading" :class="checkMode('100')" @click="setMode('100')">From 100 cases</div>
            <div class="text-sm border px-2 py-1 rounded m-1 cursor-pointer hover:bg-hoverslab hover:text-heading" :class="checkMode('delta')" @click="setMode('delta')">Delta</div>
            <div class="text-sm border px-2 py-1 rounded m-1 cursor-pointer hover:bg-hoverslab hover:text-heading" :class="checkMode('growth')" @click="setMode('growth')">Growth factor (confirmed cases)</div>
        </div>
        <LineChart :data="dataset.data" class="bg-hoverslab p-2 absolute rounded left-0 right-0 bottom-0" style="top: 48px;"
                   :options="dataset.options" />
    </div>
</template>

<script>
    import LineChart from "../components/charts/LineChart";
    import simplebar from 'simplebar-vue';
    import 'simplebar/dist/simplebar.min.css';
    import Daily from "../components/Daily";
    import moment from 'moment';
    export default {
        name: "Comparison",
        components:{
            simplebar,
            LineChart,
            Daily
        },
        data(){
            return {
                'options' : {
                    'mode' : 'chronological'
                }
            }
        },
        props: [
            'data',
        ],
        methods: {
            checkMode(mode)
            {
                if (mode == this.options.mode)
                {
                    return 'bg-hoverslab text-heading border-hoverslab'
                }
                else
                {
                    return 'text-lightslab border-hoverslab';
                }
            },
            setMode(mode)
            {
                if (mode != this.options.mode)
                {
                    this.options.mode = mode;
                }
            }
        },
        computed: {
            comparison()
            {
                console.log(this.data);
                return this.data;
            },
            dataset()
            {
                if (this.options.mode == 'chronological')
                {
                    return this.datasetChronological;
                }
                else if (this.options.mode == '100')
                {
                    return this.dataset100;
                }
                else if (this.options.mode == 'delta')
                {
                    return this.datasetDelta;
                }
                else if (this.options.mode == 'growth')
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

                        if(this.data[y].daily)
                        {

                            var found = false;
                            var stats = this.data[y].daily;

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
