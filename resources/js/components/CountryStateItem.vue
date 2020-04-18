<template>
    <div>
        <div
            class="flex hover:bg-lightslab cursor-pointer items-center h-8"
            :class="isSelected(data.name,false) ? 'bg-hoverslab' : (country_key % 2 == 0) ? 'bg-slab-primary':'bg-slab-secondary'"
        >
            <div v-if="data.states.length == 0" class="w-4 p-2 m-1 ml-0"></div>
            <div v-else
                 class="w-5 m-0 text-white border border-transparent hover:border-white rounded text-center font-bold"
                 @click="toggleExpand()"
            >
                <div v-if="expanded">-</div>
                <div v-else>+</div>
            </div>
            <div @click="selectCountry(data['name'],false)" class="text-xs py-1 w-32 px-2 font-bold">{{data['name']}}</div>
            <div @click="selectCountry(data['name'],false)" class="text-xs pl-2 py-1 w-20">{{data['total']['c']| numeralFormat}}</div>
            <div @click="selectCountry(data['name'],false)" class="text-xs pl-2 py-1 w-20">{{data['total']['d']| numeralFormat}}</div>
            <div @click="selectCountry(data['name'],false)" class="text-xs pl-2 py-1 w-20">{{data['total']['r']| numeralFormat}}</div>
        </div>
        <div v-for="row in data.states" class="pb-1 hover:bg-lightslab cursor-pointer flex items-center text-xs" v-show="expanded"
             :class="isSelected(data.name,row.name) ? 'bg-hoverslab' : (row.name % 2 == 0) ? 'bg-slab-primary':'bg-slab-secondary'"
        >
            <div class="w-4 p-2 m-1 ml-0"></div>
            <div @click="selectCountry(data['name'],row['name'])" class="w-32 px-2">
                <div>{{row['name']}}</div>
            </div>
            <div @click="selectCountry(data['name'],row['name'])" v-if="row.total && row.total.c >= 0" class="w-20 pl-2">{{row['total']['c']| numeralFormat}}</div>
            <div @click="selectCountry(data['name'],row['name'])" v-if="row.total && row.total.d >= 0" class="w-20 pl-2">{{row['total']['d']| numeralFormat}}</div>
            <div @click="selectCountry(data['name'],row['name'])" v-if="row.total && row.total.r >= 0" class="w-20 pl-2">{{row['total']['r']| numeralFormat}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CountryStateItem",
        props:[
            'data',
            'country_key',
            'compare',
            'sidebarExpanded',
        ],
        data(){
            return {
                'expanded' : false
            }
        },
        methods: {
            isSelected(country,state)
            {
                if(this.compare && this.compare.length > 0)
                {
                    for(var x in this.compare)
                    {
                        var item = this.compare[x];
                        if(country == item[1])
                        {
                            if (state == false)
                            {
                                return true;
                            }
                            else if (state == item[2])
                            {
                                return true;
                            }
                        }
                    }
                }
                return false;
            },
            selectCountry(country,state)
            {
                this.$emit('selectCountry',country,state);
            },
            toggleExpand()
            {
                this.expanded = !this.expanded;
            }
        },
    }
</script>

<style scoped>

</style>
