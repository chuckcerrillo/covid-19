<script>
    import { Line } from 'vue-chartjs'
    export default {
        extends: Line,
        name: "LineChart",
        props: ['data', 'options'],
        mounted () {
            this.renderLineChart();
        },
        computed: {
            chartData: function() {
                return this.data;
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
