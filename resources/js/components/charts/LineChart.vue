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
                var options = this.options;
                this.renderChart(this.chartData,options);
            }
        },
        watch: {
            data: function() {
                this._data._chart.destroy();
                this.renderLineChart();
            }
        }
    }
</script>

<style scoped>

</style>
