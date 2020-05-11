<script>
    import { Line } from 'vue-chartjs'
    import zoom from 'chartjs-plugin-zoom';
    import watermark from 'chartjs-plugin-watermark';

    export default {
        extends: Line,
        name: "LineChart",
        props: ['data', 'options'],
        mounted () {
            this.addPlugin(zoom);
            this.addPlugin(watermark);
            this.renderLineChart();
        },
        computed: {
            chartData: function() {
                if(this.data)
                return this.data;
                return [];
            }
        },
        methods: {
            renderLineChart(){
                var self = this;
                var options = self.options;
                self.renderChart(self.chartData,options);
                console.log('Render line chart');
            },
            compareValues(oldValue,newValue){
                if (oldValue && newValue)
                {
                    // Obvious ones first, the number of countries
                    if(oldValue.datasets && newValue.datasets && oldValue.datasets.length !== newValue.datasets.length)
                    {
                        return true;
                    }
                    // The amount of days / items

                    for(var x in oldValue.datasets)
                    {
                        if(oldValue.datasets[x] && newValue.datasets[x])
                        {
                            // Chart settings
                            if(oldValue.datasets[x].backgroundColor !== newValue.datasets[x].backgroundColor)
                            {
                                return true;
                            }
                            if(oldValue.datasets[x].borderColor !== newValue.datasets[x].borderColor)
                            {
                                return true;
                            }
                            if(oldValue.datasets[x].borderDash !== newValue.datasets[x].borderDash)
                            {
                                return true;
                            }
                            if(oldValue.datasets[x].borderWidth !== newValue.datasets[x].borderWidth)
                            {
                                return true;
                            }
                            if(oldValue.datasets[x].fill !== newValue.datasets[x].fill)
                            {
                                return true;
                            }
                            if(oldValue.datasets[x].pointRadius !== newValue.datasets[x].pointRadius)
                            {
                                return true;
                            }
                            if(oldValue.datasets[x].type !== newValue.datasets[x].type)
                            {
                                return true;
                            }

                            if (oldValue.datasets[x].label && newValue.datasets[x].label && oldValue.datasets[x].label !== newValue.datasets[x].label)
                            {
                                return true;
                            }

                            if(oldValue.labels && newValue.labels)
                            {
                                if(oldValue.labels.length !== newValue.labels.length)
                                {
                                    return true;
                                }

                                for(var y in oldValue.labels)
                                {
                                    if(newValue.labels[y] && oldValue.labels[y] !== newValue.labels[y])
                                    {
                                        return true;
                                    }
                                }
                            }

                            if (oldValue.datasets[x].data && newValue.datasets[x].data)
                            {
                                if(oldValue.datasets[x].data.length !== newValue.datasets[x].data.length)
                                {
                                    return true;
                                }

                                for(var y in oldValue.datasets[x].data)
                                {
                                    if(newValue.datasets[x].data[y])
                                    {
                                        if(oldValue.datasets[x].data[y] !== newValue.datasets[x].data[y])
                                        {
                                            return false;
                                        }
                                    }
                                }
                            }
                        }

                    }
                }
                return false;
            }
        },
        watch: {
            data: function(newValue,oldValue) {
                var self = this;
                if (self.compareValues(oldValue, newValue))
                {
                    console.log('chart data changed')
                    console.log('old');
                    console.log(oldValue);
                    console.log('new');
                    console.log(newValue);

                    // true means something changed
                    self._data._chart.destroy();
                    self.renderLineChart();
                }
            }
        }
    }
</script>

<style scoped>

</style>
