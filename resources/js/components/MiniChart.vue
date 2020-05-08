<template>
    <div class="h-full">
        <LineChart :data="dataset.data"
                   :options="dataset.options"
                   class="rounded h-full"
        />

    </div>
</template>

<script>
    import LineChart from "./charts/LineChart";
    import moment from 'moment';
    export default {
        name: "MiniChart",
        components:{
            LineChart,
        },
        props: [
            'data',
        ],
        data(){
            return {
                yAxis: [
                    'deltaConfirmed',
                ]
            }
        },
        computed:{
            dataset()
            {

                var data = {
                        labels: [],
                        datasets: [],
                    },
                    options,
                    content = [];


                // OPTIONS

                options = {

                    responsive: true,
                    maintainAspectRatio: false,
                    hoverMode: 'index',
                    stacked: false,
                    legend: {
                        display: false,
                    },
                    title: {
                        display: false
                    },
                    scales: {
                        xAxes: [{
                            display: false,
                            ticks: {
                                fontColor: '#2c3531',
                                callback: function(dataLabel, index) {
                                    return index % 2 === 0 ? dataLabel : '';
                                }
                            },
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

                console.log('Start: ' + start + ' End: ' + end);

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
                                    stringencyIndex: [],
                                }
                            );
                        }

                        if(this.data[y].daily)
                        {

                            // console.log('FOUND DAILY');
                            // console.log(this.data[y].daily);
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
                                    content[y].stringencyIndex.push(row.stringencyindex);
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
                                    content[y].stringencyIndex.push(content[y].stringencyIndex.slice(-1));
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
                                    content[y].stringencyIndex.push(0);
                                }
                            }
                        }
                    }
                }

                console.log('CONTENT');
                console.log(content);

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
                                    label: 'Confirmed',
                                    type: 'line',
                                    backgroundColor: 'white',
                                    borderColor: 'white',
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
                                    type: 'line',
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
                                    label: 'Deaths ',
                                    type: 'line',
                                    backgroundColor: 'white',
                                    borderColor: 'white',
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
                                    type: 'linear',
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
                                    label: 'Recovered ',
                                    type: 'line',
                                    backgroundColor: 'white',
                                    borderColor: 'white',
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
                                    type: 'linear',
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
                        else if(this.yAxis[y] == 'active')
                        {
                            data.datasets.push(
                                {
                                    label: 'Active ',
                                    type: 'line',
                                    backgroundColor: 'white',
                                    borderColor: 'white',
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
                                    type: 'linear',
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
                                    label: 'New cases per day ',
                                    type: 'line',
                                    backgroundColor: 'white',
                                    borderColor: 'white',
                                    // borderDash: [10, 5],
                                    display: false,
                                    borderWidth: 1,
                                    pointRadius: 0,
                                    fill: false,
                                    data: _.clone(content[x].deltaConfirmed),
                                    yAxisID: 'y-deltaConfirmed',
                                }
                            );
                            options.scales.yAxes.push(
                                {
                                    responsive: true,
                                    scaleLabel: {
                                        display: false,
                                        labelString: 'New cases per day',
                                    },
                                    type: 'linear',
                                    display: false,
                                    position: position,
                                    id: 'y-deltaConfirmed',

                                    // grid line settings
                                    gridLines: {
                                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                                    },
                                    ticks: {
                                        display: true,
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
                                    label: 'New deaths per day ',
                                    type: 'line',
                                    backgroundColor: 'white',
                                    borderColor: 'white',
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
                                    type: 'linear',
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
                                    label: 'New recoveries per day ',
                                    type: 'line',
                                    backgroundColor: 'white',
                                    borderColor: 'white',
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
                                    type: 'linear',
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
                                    label: 'Average growth ',
                                    type: 'line',
                                    backgroundColor: 'white',
                                    borderColor: 'white',
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
                                    type: 'linear',
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
                                    label: 'Growth factor ',
                                    type: 'line',
                                    backgroundColor: 'white',
                                    borderColor: 'white',
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
                                    type: 'linear',
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
                        else if(this.yAxis[y] == 'stringencyIndex')
                        {
                            data.datasets.push(
                                {
                                    label: 'Stringency Index ',
                                    type: 'line',
                                    backgroundColor: 'white',
                                    borderColor: 'white',
                                    borderDash: [10, 5],
                                    borderWidth: 2,
                                    pointRadius: 5,
                                    fill: false,
                                    data: _.clone(content[x].stringencyIndex),
                                    yAxisID: 'y-stringencyIndex'
                                }
                            );
                            options.scales.yAxes.push(
                                {
                                    responsive: true,
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Stringency Index',
                                    },
                                    type: 'linear',
                                    display: true,
                                    position: position,
                                    id: 'y-stringencyIndex',

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
        }
    }
</script>

<style scoped>

</style>
