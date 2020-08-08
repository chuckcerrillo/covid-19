<template>
    <div class="h-full relative">
        <div class="absolute top-0 right-0 bottom-0 left-0 bg-hoverslab rounded" style="bottom:32px;">
            <div class="h-full" :class="selectedCompareTab !== 'all' ? 'hidden' : ''">
                <div v-if="getCompareLength() === 0" class="m-4">
                    Select up to {{options.compare_limit}} countries or states to begin comparing.
                </div>

                <keep-alive>
                    <Latest v-if="getCompareLength() > 0 && (!isMobile || (isMobile && selectedCompareTab === 'all'))"
                            :data="comparisonData"
                            :active="view === 'daily' && selectedCompareTab === 'all'"
                            :rankings="rankings"
                    />
                </keep-alive>
            </div>
            <div v-if="getCompareLength() > 0" v-for="(row,key,index) in compare" class="" :key="key">
<!--                <div v-if="selectedCompareTab === 'all'" class="absolute top-5 right-0 w-128 z-10 bg-slab-primary overflow-auto h-200">{{comparisonData}}</div>-->
                <div class="h-full" v-show="selectedCompareTab === key">
                    <Daily
                        v-if="row"
                        v-once
                        v-on:removeCompare="removeCompare"
                        v-on:updateFavourites="updateFavourites"
                        :data="comparisonData[key]"
                        :settings="{absolute:true, solo:false}"
                        v-once
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Daily from "../components/daily/Daily";
    import Latest from "../components/daily/CompareDaily";
    export default {
        name: "DailyView",
        props: [
            'selectedCompareTab',
            'options',
            'compareLength',
            'comparisonData',
            'compare',
            'view',
            'rankings',
        ],
        components: {
            Daily,
            Latest,
        },
        methods:
        {
            updateFavourites()
            {
                this.$emit('updateFavourites',true);
            },
            removeCompare(item)
            {
                var found = this.findCompare(item);
                if(found)
                {
                    var key = item.country + item.state;
                    this.compare[found] = false;
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
        computed:
        {
            isMobile() {
                if( screen.width <= 760 ) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }


    }
</script>

<style scoped>

</style>
