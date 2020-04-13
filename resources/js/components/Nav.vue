<template>
    <div class="bg-slab text-white text-left">
        <div class="py-2 px-2 flex text-heading items-center justify-center">
            <div class="w-128 py-2 px-2 font-bold mx-2">COVID-19 Tracker</div>
            <router-link to="/" class="p-2 px-4 cursor-pointer hover:text-white" :class="isActive(selected,'comparison','bg-hoverslab')">Comparison</router-link>
            <div class="p-2 px-4 cursor-pointer hover:text-white" :class="isActive(selected,'statistics','bg-hoverslab')">Trends (to-do)</div>
            <router-link to="/about" class="p-2 px-4 cursor-pointer hover:text-white" :class="isActive(selected,'about','bg-hoverslab')">About</router-link>
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
