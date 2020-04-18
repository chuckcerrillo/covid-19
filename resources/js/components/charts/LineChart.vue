<script>
    import { Line, mixins } from 'vue-chartjs'
    import zoom from 'chartjs-plugin-zoom';
    const { reactiveProp } = mixins;

    export default {
        extends: Line,
        mixins: [reactiveProp],
        name: "LineChart",
        props: ['data', 'options'],
        mounted () {
            this.addPlugin(zoom);
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
                this.renderChart(this.chartData,this.options);
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
