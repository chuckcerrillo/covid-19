<template>
    <div>
        <div class="mx-6 pt-4 relative">
            <h2 class="font-bold text-2xl">{{name}}</h2>
            <h3 class="h-4 font-bold">{{state_name}}</h3>
            <div class="flex text-sm mt-4 w-full items-center">
                <div class="text-center pr-4">
                    <div class="text-xs font-bold">Confirmed</div>
                    <div class="text-3xl font-bold">{{parseInt(data[data.length-1].confirmed)}}</div>
                </div>
                <div class="text-center pr-4">
                    <div class="text-xs font-bold">Deaths</div>
                    <div class="text-3xl font-bold">{{parseInt(data[data.length-1].deaths)}}</div>
                </div>
                <div class="text-center">
                    <div class="text-xs font-bold">Recovered</div>
                    <div class="text-3xl font-bold">{{parseInt(data[data.length-1].recovered)}}</div>
                </div>
            </div>
            <div class="text-xs mb-4">As of {{last_update}}</div>
            <div
                class="absolute top-0 right-0 text-xs pt-4 hover:text-white cursor-pointer"
                @click="remove([country,state])"
            >Remove</div>
        </div>
        <div class="mx-6 flex text-xs font-bold py-2 justify-between">
            <div class="w-20">Date</div>
            <div class="justify-end flex w-full">
                <div class="w-20">Confirmed</div>
                <div class="w-20">Deaths</div>
                <div class="w-20">Recovered</div>
            </div>
        </div>
        <simplebar data-simplebar-auto-hide="false" class="top-0 right-0 left-0 bottom-0 mt-52 mx-4 mb-4 mr-4" style="position:absolute;" >
            <div
                class="flex p-2 text-xs justify-between"
                v-for="(row, key, index) in data"
            >
                <div class="w-20">{{row['date']}}</div>
                <div class="w-full flex justify-end">
                    <div class="w-20">
                        {{ isNaN(row.confirmed) ? 0 : row.confirmed }}
                        <span class="text-green-400" v-if="delta('confirmed',key) >= 0">(+{{delta('confirmed',key)}})</span>
                        <span class="text-red-400" v-else>({{delta('confirmed',key)}})</span>
                    </div>
                    <div class="w-20">{{ isNaN(row.deaths) ? 0 : row.deaths }}
                        <span class="text-green-400" v-if="delta('deaths',key) >= 0">(+{{delta('deaths',key)}})</span>
                        <span class="text-red-400" v-else>({{delta('deaths',key)}})</span>
                    </div>
                    <div class="w-20">{{ isNaN(row.recovered) ? 0 : row.recovered }}
                        <span class="text-green-400" v-if="delta('recovered',key) >= 0">(+{{delta('recovered',key)}})</span>
                        <span class="text-red-400" v-else>({{delta('recovered',key)}})</span>
                    </div>
                </div>
            </div>
        </simplebar>
    </div>
</template>

<script>
    import moment from 'moment'
    import simplebar from 'simplebar-vue';
    export default {
        name: "Daily",
        components: {
            simplebar
        },
        props: [
            'name',
            'data',
            'country',
            'state'
        ],
        methods: {
            remove(item){
                this.$emit('remove',item);
            },
            delta(field,offset)
            {
                var result = 0;

                if(offset>0){
                    result = isNaN(this.data[offset][field]) ? 0 : this.data[offset][field] - isNaN(this.data[offset-1][field]) ? 0 : this.data[offset-1][field];
                }
                else
                {
                    result = this.data[offset][field];
                }

                return result;
            }
        },
        computed: {
            state_name(){
                if(this.state)
                    return this.state;
                return '';
            },
            last_update(){
                return moment(this.data[this.data.length-1].date).format('YYYY-MM-DD');
                return false;
            }
        }
    }
</script>

<style scoped>

</style>
