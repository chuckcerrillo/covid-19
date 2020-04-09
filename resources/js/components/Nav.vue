<template>
    <div class="bg-slab text-white text-left">
        <div class="py-2 px-2 flex text-heading items-center justify-center">
            <div class="w-128 py-2 px-2 font-bold mx-2">COVID-19 Tracker</div>
            <div class="p-2 px-4 cursor-pointer hover:text-white" :class="isActive(selected,'comparison','bg-hoverslab')">Comparison</div>
            <div class="p-2 px-4 cursor-pointer hover:text-white" :class="isActive(selected,'statistics','bg-hoverslab')">Trends</div>
            <div class="p-2 px-4 cursor-pointer hover:text-white" :class="isActive(selected,'about','bg-hoverslab')">About</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Nav",
        props: [
            'active'
        ],
        data(){
            return {
                'selected': 'comparison',
            }
        },
        methods: {
            isActive(selected, current, classes){
                if(selected === current)
                    return classes;
                return '';
            }
        }
    }
</script>

<style scoped>

</style>
