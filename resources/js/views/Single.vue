<template>
    <div>
        <div v-if="data">
            {{data}}
        </div>
    </div>
</template>

<script>
    import FullCountry from "../components/FullCountry";
    import simplebar from "simplebar-vue";
    export default {
        name: "Single",
        components: {
            FullCountry,
            simplebar,
        },
        props: [
            'data',
        ],
        data(){
            return {
                growth_factor: [],
                recomputed_data: [],
                expanded: false,
            }
        },
        methods: {
            toggleExpand()
            {
                this.expanded = !this.expanded;
            },
            remove(item){
                this.$emit('remove',item);
            },
            recomputeGrowth()
            {
                const arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length;

                this.recomputed_data = this.data;
                this.recomputed_data.growth = [];
                this.recomputed_data.average = [];
                this.recomputed_data.growthFactor = [];

                for(var x in this.recomputed_data.delta)
                {
                    this.recomputed_data.growth.push(
                        this.recomputed_data.delta[x].confirmed
                    )
                }

                for(var x = 0; x < this.recomputed_data.growth.length; x++)
                {
                    var avg = 0;
                    if(x < 5)
                    {
                        avg = arrAvg(this.recomputed_data.growth.slice(0,x+1));
                    }
                    else
                    {
                        avg = arrAvg(this.recomputed_data.growth.slice(x-5,x+1));
                    }
                    this.recomputed_data.average.push(avg.toFixed(1));
                }

                for(var x = 0; x < this.recomputed_data.average.length; x++)
                {
                    var gf = 0;
                    if(x == 1 || this.recomputed_data.average[x-1] == 0)
                    {
                        gf = (this.recomputed_data.average[x]/1).toFixed(2);
                    }
                    else
                    {
                        gf = (this.recomputed_data.average[x]/this.recomputed_data.average[x-1]).toFixed(2);
                    }
                    if(isNaN(gf))
                    {
                        gf = 0;
                    }
                    this.recomputed_data.growthFactor.push(gf);
                }
            }
        },
        computed: {
            recomputed()
            {
                this.recomputeGrowth();
                return this.recomputed_data;
            }
        },
        watch: {
            data: function() {
                this.recomputeGrowth();
            }
        }
    }
</script>

<style scoped>

</style>
