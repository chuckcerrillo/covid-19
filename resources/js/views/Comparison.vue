<template>
    <div></div>
</template>

<script>
    import LineChart from "../components/charts/LineChart";
    import simplebar from 'simplebar-vue';
    import 'simplebar/dist/simplebar.min.css';
    import Daily from "../components/Daily";
    export default {
        name: "Comparison",
        components:{
            simplebar,
            LineChart,
            Daily
        },
        props: [
            'stats',
            'compare'
        ]
    }
</script>

<style scoped>

</style>
