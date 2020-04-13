<template>
    <div>
        <div
            class="flex hover:bg-lightslab cursor-pointer items-center"
            :class="isSelected([country_key,false]) ? 'bg-hoverslab' : (country_key % 2 == 0) ? 'bg-slab-primary':'bg-slab-secondary'"
        >
            <div v-if="data.states.length == 0" class="w-4 p-2 m-1 ml-0"></div>
            <div v-else
                 class="w-5 m-0 text-white border border-transparent hover:border-white rounded text-center font-bold"
                 @click="toggleExpand()"
            >
                <div v-if="expanded">-</div>
                <div v-else>+</div>
            </div>
            <div @click="selectCountry(data['name'],false)" class="text-xs w-36 px-2 m-1 font-bold">{{data['name']}}</div>
            <div @click="selectCountry(data['name'],false)" class="text-xs w-18 m-1">{{data['total']['c']}}</div>
            <div @click="selectCountry(data['name'],false)" class="text-xs w-18 m-1">{{data['total']['d']}}</div>
            <div @click="selectCountry(data['name'],false)" class="text-xs w-18 m-1">{{data['total']['r']}}</div>
        </div>
        <div v-for="row in data.states" class="pb-1 hover:bg-lightslab cursor-pointer flex items-center text-xs" v-show="expanded"
             :class="isSelected([country_key,row.name]) ? 'bg-hoverslab' : (row.name % 2 == 0) ? 'bg-slab-primary':'bg-slab-secondary'"
        >
            <div class="w-4 p-2 m-1 ml-0"></div>
            <div @click="selectCountry(data['name'],row['name'])" class="w-36 px-2 m-1">
                <div>{{row['name']}}</div>
            </div>
            <div @click="selectCountry(data['name'],row['name'])" v-if="row.total && row.total.c >= 0" class="w-18 m-1">{{row['total']['c']}}</div>
            <div @click="selectCountry(data['name'],row['name'])" v-if="row.total && row.total.d >= 0" class="w-18 m-1">{{row['total']['d']}}</div>
            <div @click="selectCountry(data['name'],row['name'])" v-if="row.total && row.total.r >= 0" class="w-18 m-1">{{row['total']['r']}}</div>
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
        ],
        data(){
            return {
                'expanded' : false
            }
        },
        methods: {
            isSelected(item)
            {
                // if(item && this.compare.length > 0)
                // {
                //
                //     for(var x in this.compare)
                //     {
                //         if (this.compare[x][0] == item[0])
                //         {
                //             return true;
                //         }
                //     }
                // }
                return false;
            },
            selectCountry(country,state)
            {
                this.$emit('selectCountry',country,state,this.country_key);
            },
            toggleExpand()
            {
                this.expanded = !this.expanded;
            },
            findCompare(item)
            {
                var found = false;
                for(var x in this.compare)
                {
                    if(this.compare[x][0] == item[0])
                    {
                        if(this.compare[x][1] == item[1])
                        {
                            found = x;
                            break;
                        }
                    }
                }
                return found;
            },
        }
    }
</script>

<style scoped>

</style>
