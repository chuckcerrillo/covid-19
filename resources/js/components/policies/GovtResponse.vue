<template>
    <div class="py-1 w-100">
        <div class="rounded bg-slab-primary xl:mr-4 xl:h-44">
            <div class="w-full h-full pb-8 xl:pb-2 p-2 relative">

                <div class="font-bold mb-4 text-lightlabel"><span class="uppercase">{{policy.id}}</span> - {{policy.name}}</div>
                <div v-if="policy.id == 'E3' || policy.id == 'E4' || policy.id == 'H4' || policy.id == 'H5'" class="text-2xl font-bold">US${{policy.value | numeralFormat}}</div>
                <div v-else-if="policy.value.length > 85" class="font-bold text-sm">{{policy.value}}</div>
                <div v-else-if="policy.value.length > 30" class="font-bold">{{policy.value}}</div>
                <div v-else-if="policy.value.length > 15" class="font-bold xl:text-2xl">{{policy.value}}</div>
                <div v-else class="xl:text-3xl font-bold">{{policy.value}}</div>


                <div @click="expanded = true" class="text-xs hover:underline text-lightlabel hover:text-heading cursor-pointer absolute bottom-0 left-0 mb-2 ml-2">More info...</div>
            </div>

        </div>

        <div v-if="expanded" class="fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center z-40" style="background:rgba(0,0,0,0.5)">
            <div class="absolute top-0 left-0 right-0 bottom-0 z-0" @click="expanded = false"></div>
            <div class="bg-slab rounded p-4 relative z-10 w-full m-6 xl:m-0 xl:w-1/2" style="max-width: 800px;">
                <div class="font-bold text-2xl"><span class="uppercase">{{policy.id}}</span> - {{policy.name}}</div>
                <div class="text-lightlabel text-xs mb-4">{{policy.description}}</div>

                <div v-if="policy.id == 'E3' || policy.id == 'E4' || policy.id == 'H4' || policy.id == 'H5'" class="text-2xl xl:text-3xl text-white font-bold">US${{policy.value | numeralFormat}}</div>
                <div v-else class="text-2xl text-white font-bold">{{policy.value}}</div>

                <div class="text-sm mt-2">{{policy.target}}</div>

                <div class="text-sm">Implemented on {{policy.since}}</div>
                <div v-if="policy.help.length == 1" class="text-lightlabel text-xs">{{policy.help[0]}}</div>
                <div v-if="policy.notes" class="mt-4 text-xs text-lightlabel">{{policy.notes}}</div>
                <div @click="expanded = false" class="text-xs hover:underline text-lightlabel hover:text-heading cursor-pointer mt-4">Close</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GovtResponse",
        props: [
            'policy'
        ],
        data(){
            return {
                expanded: false,
            }
        }
    }
</script>

<style scoped>

</style>
