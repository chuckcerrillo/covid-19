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
            }
        },
        watch: {
            data: function() {
                var self = this;
                // setTimeout(function(){
                    self._data._chart.destroy();
                    self.renderLineChart();
                // },10)
            }
        }
    }
</script>

<style scoped>

</style>
