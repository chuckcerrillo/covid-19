<template>
    <div class="bg-slab text-white text-left">
        <div class="py-2 px-2 flex text-heading items-center justify-center">
            <div class="w-128 py-2 px-2 font-bold mx-2">COVID-19 Tracker <sup class="font-normal">beta</sup></div>
            <router-link to="/" class="p-2 px-4 cursor-pointer hover:text-white" :class="isActive(selected,'comparison','bg-hoverslab')">Comparison</router-link>
            <div class="p-2 px-4 cursor-pointer hover:text-white" :class="isActive(selected,'statistics','bg-hoverslab')">Trends (to-do)</div>
            <div @click="showAbout()" class="p-2 px-4 cursor-pointer hover:text-white" :class="isActive(selected,'about','bg-hoverslab')">About</div>
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
            },
            showAbout()
            {
                this.$emit('showAbout');
            }
        }
    }
</script>

<style scoped>

</style>
