<template>
    <div class="h-full">
        <keep-alive>
        <LineChart v-if="active && dataReady" :data="dataset().data"
                   :options="dataset().options"
                   class="rounded h-full"
        />
        </keep-alive>
    </div>
</template>

<script>
    import moment from 'moment';


    const LineChart = () => ({
        component: import("./charts/LineChart"),

    });

    export default {
        name: "MiniChart",
        components:{
            LineChart,
        },
        props: [
            'data',
            'maxDate',
            'active'
        ],
        data(){
            return {
                yAxis: [
                    'deltaConfirmed',
                ],
                dataReady: false,
            }
        },
        methods:{
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

                if (this.maxDate)
                {
                    end = moment(this.maxDate).format('YYYY-MM-DD');
                }

                data.labels.push('2019-12-31');

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
                                    deltaConfirmed: [],
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
                                    if(row.delta.c >= 0)
                                        content[y].deltaConfirmed.push(row.delta.c);
                                    else
                                        content[y].deltaConfirmed.push(0);
                                    found = true;
                                }
                            }

                            // If today's data is missing, use previous day's
                            if (!found)
                            {
                                if (content[y].confirmed.length > 0)
                                {
                                    content[y].deltaConfirmed.push(content[y].deltaConfirmed.slice(-1));
                                }
                                else
                                {
                                    content[y].deltaConfirmed.push(0);
                                }
                            }
                        }
                    }
                }

                if(data.labels.length <= 1)
                {
                    data.labels.push('2020-01-01');
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
                        if(this.yAxis[y] == 'deltaConfirmed')
                        {
                            var datavalues = [0,0];
                            if(content && content[x] && content[x].deltaConfirmed){
                                if(content[x].deltaConfirmed.length > 0)
                                {
                                    datavalues = [0];
                                    for(var z in content[x].deltaConfirmed)
                                    {
                                        datavalues.push(content[x].deltaConfirmed[z]);
                                    }
                                }
                                else
                                {
                                    datavalues = content[x].deltaConfirmed;
                                }

                            }
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
                                    data: datavalues,
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
                    }
                }

                return {
                    data: data,
                    options: options
                };
            },
        },
        created()
        {
            var self = this;
            // setTimeout(function(){
                self.dataset();
                self.dataReady = true;
            // },10)

        }
    }
</script>

<style scoped>

</style>
