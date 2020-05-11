<template>
    <div class="h-full relative">
        <div class="absolute top-0 right-0 bottom-0 left-0 bg-hoverslab rounded" style="bottom:32px;">
            <div class="h-full" :class="selectedCompareTab !== 'all' ? 'hidden' : ''">
                <div v-if="getCompareLength() === 0" class="m-4">
                    Select up to {{options.compare_limit}} countries or states to begin comparing.
                </div>

                <Latest v-else
                        :data="comparisonData"
                        :active="view === 'daily' && selectedCompareTab === 'all'"
                />
            </div>
            <div v-if="getCompareLength() > 0" v-for="(row,key,index) in compare" class="" :key="key">
                <div class="h-full" :class="selectedCompareTab != key ? 'hidden' : ''">
                    <Daily
                        v-on:removeCompare="removeCompare"
                        :data="comparisonData[index]"
                        :settings="{absolute:true, solo:false}"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Daily from "../components/Daily";
    import Latest from "../components/Latest";
    export default {
        name: "DailyView",
        props: [
            'selectedCompareTab',
            'options',
            'compareLength',
            'comparisonData',
            'compare',
            'view',
        ],
        components: {
            Daily,
            Latest,
        },
        methods:
        {
            removeCompare(item)
            {
                var found = this.findCompare(item);
                if(found)
                {
                    var key = item.country + item.state;
                    delete this.compare[found];
                    if(key === this.selectedCompareTab)
                    {
                        this.updateSelected(this.getLastCompareItem());
                    }
                }

                this.$emit('updateCompare',this.compare);
            },
            findCompare(item)
            {
                var found = false;
                for(var x in this.compare)
                {
                    if(this.compare[x].country === item.country)
                    {

                        if(this.compare[x].state === item.state)
                        {
                            found = x;
                            break;
                        }
                    }
                }
                return found;
            },
            updateSelected(key)
            {
                this.$emit('updateSelected',key);
            },
            getLastCompareItem()
            {
                var last = false;
                var compare = _.cloneDeep(this.compare);
                for (var x in compare)
                {
                    if(compare[x])
                        last = x;
                }
                return last;
            },
            getCompareLength()
            {
                var count = 0;
                for(var x in this.compare)
                {
                    if(this.compare[x])
                        count++;
                }

                return count;
            },
        },


    }
</script>

<style scoped>

</style>
