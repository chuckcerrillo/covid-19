<template>
    <div>
        <div
            class="flex cursor-pointer items-center"
            :class="
                (config.dashboard ? 'justify-center ' : '')
                +
                (
                    isSelected(data.name,false) ?
                        (favourite) ?
                        'bg-heading border border-heading mt-1 text-gray-800 rounded h-12'
                        : 'bg-hoverslab h-8'
                    :
                    (
                        (favourite) ?
                        'bg-lightlabel hover:bg-heading hover:border-heading border border-lightlabel mt-1 text-gray-800 rounded h-12'
                        :
                        (country_key % 2 == 1) ?
                        'bg-slab-primary hover:bg-lightslab h-8'
                        :
                        'bg-slab-secondary hover:bg-lightslab h-8'
                    )
                )
            "
        >
            <div v-if="data.states.length <= 1" class="w-4 p-2 m-1 ml-0"></div>
            <div v-else
                 class="w-5 m-0 border border-transparent hover:border-white rounded text-center font-bold"
                 :class="favourite? 'text-gray-800' : 'text-white'"
                 @click="toggleExpand()"
            >
                <div v-if="expanded">-</div>
                <div v-else>+</div>
            </div>
            <div @click="selectCountry(data['name'],false)" class="text-xs py-1 w-32 px-2 font-bold">{{data['name']}}</div>
            <div @click="selectCountry(data['name'],false)" class="text-xs pl-2 py-1 w-20">{{data['total']['confirmed']| numeralFormat}}</div>
            <div @click="selectCountry(data['name'],false)" class="text-xs pl-2 py-1 w-20">{{data['total']['deaths']| numeralFormat}}</div>
            <div @click="selectCountry(data['name'],false)" class="text-xs pl-2 py-1 w-20">{{data['total']['recovered']| numeralFormat}}</div>

<!--            <div v-if="config.dashboard" @click="selectCountry(data['name'],false)" class="text-xs pl-2 py-1 w-20">{{data.total.active|numeralFormat}}</div>-->
<!--            <div v-if="config.dashboard" @click="selectCountry(data['name'],false)" class="text-xs pl-2 py-1 w-20">{{data.population|numeralFormat}}</div>-->
<!--            <div v-if="config.dashboard" @click="selectCountry(data['name'],false)" class="text-xs pl-2 py-1 w-20">{{data.total.confirmedpc|numeralFormat('0,000.00')}}</div>-->
<!--            <div v-if="config.dashboard" @click="selectCountry(data['name'],false)" class="text-xs pl-2 py-1 w-20">{{data.total.deathspc|numeralFormat('0,000.00')}}</div>-->
<!--            <div v-if="config.dashboard" @click="selectCountry(data['name'],false)" class="text-xs pl-2 py-1 w-20">{{data.total.recoveredpc|numeralFormat('0,000.00')}}</div>-->
<!--            <div v-if="config.dashboard" @click="selectCountry(data['name'],false)" class="text-xs pl-2 py-1 w-20">{{data.total.stringencyindex}}</div>-->
        </div>
        <div v-for="(row,key,index) in data.states" class="pb-1 hover:bg-lightslab cursor-pointer flex items-center text-xs" v-show="expanded"
             :key="key"
            :class="
            (config.dashboard ? 'justify-center ' : '')
                +
            (isSelected(data.name,row.name) ? 'bg-hoverslab' : 'bg-darkslab')
            "
        >
            <div class="w-4 p-2 m-1 ml-0"></div>
            <div @click="selectCountry(data['name'],row['name'])" class="w-32 px-2">
                <div>{{row['name']}}</div>
            </div>
            <div @click="selectCountry(data['name'],row['name'])" class="w-20 pl-2">{{(row.total && row.total.confirmed ? row['total']['confirmed'] : 0) | numeralFormat}}</div>
            <div @click="selectCountry(data['name'],row['name'])" class="w-20 pl-2">{{(row.total && row.total.deaths ? row['total']['deaths']:0)| numeralFormat}}</div>
            <div @click="selectCountry(data['name'],row['name'])" class="w-20 pl-2">{{(row.total && row.total.recovered ?row['total']['recovered']:0)| numeralFormat}}</div>
            <div v-if="config.dashboard" class="w-120"></div>
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
            'settings'
        ],
        data(){
            return {
                'expanded' : false,
            }
        },
        methods: {
            isSelected(country,state)
            {
                for(var x in this.compare)
                {
                    var item = this.compare[x];
                    if(country == item.country)
                    {
                        if (state == false)
                        {
                            return true;
                        }
                        else if (state == item.state)
                        {
                            return true;
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
        computed: {
            config()
            {
                return {
                    dashboard: (this.settings && this.settings.dashboard == true) ? this.settings.dashboard : false,
                }
            },
            favourite()
            {
                if(this.settings && this.settings.favourite)
                {
                    return this.settings.favourite;
                }
                return false;
            }
        }
    }
</script>

<style scoped>

</style>
