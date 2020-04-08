<template>
    <div>
        <div class="mx-6 pt-4 relative">
            <h2 class="font-bold text-2xl">{{name}}</h2>
            <div class="flex text-sm mt-4 w-full items-center">
                <div class="text-center pr-4">
                    <div class="text-xs font-bold">Confirmed</div>
                    <div class="text-3xl font-bold">{{data[data.length-1].confirmed}}</div>
                </div>
                <div class="text-center pr-4">
                    <div class="text-xs font-bold">Deaths</div>
                    <div class="text-3xl font-bold">{{data[data.length-1].deaths}}</div>
                </div>
                <div class="text-center">
                    <div class="text-xs font-bold">Recovered</div>
                    <div class="text-3xl font-bold">{{data[data.length-1].recovered}}</div>
                </div>
            </div>
            <div class="text-xs mb-4">As of {{data[data.length-1].date}}</div>
            <div
                class="absolute top-0 right-0 text-xs pt-4 hover:text-white cursor-pointer"
                @click="remove(country)"
            >Remove</div>
        </div>
        <div class="mx-6 flex text-xs font-bold py-2">
            <div class="w-32">Date</div>
            <div class="w-32">Confirmed</div>
            <div class="w-32">Deaths</div>
            <div class="w-32">Recovered</div>
        </div>
        <simplebar data-simplebar-auto-hide="false" class="top-0 right-0 left-0 bottom-0 mt-48 mx-4 mb-4 mr-2" style="position:absolute;" >
            <div
                class="flex p-2 w-full text-xs"
                v-for="row in data"
            >
                <div class="w-32">{{row['date']}}</div>
                <div class="w-32">{{row['confirmed']}}</div>
                <div class="w-32">{{row['deaths']}}</div>
                <div class="w-32">{{row['recovered']}}</div>
            </div>
        </simplebar>
    </div>
</template>

<script>
    import simplebar from 'simplebar-vue';
    export default {
        name: "Daily",
        components: {
            simplebar
        },
        props: [
            'name',
            'data',
            'country'
        ],
        methods: {
            remove(item){
                this.$emit('remove',item);
            }
        }
    }
</script>

<style scoped>

</style>
