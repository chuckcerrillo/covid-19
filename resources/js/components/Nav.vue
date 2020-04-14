<template>
    <div class="bg-slab text-white text-left">
        <div class="py-2 px-2 flex text-heading items-center justify-center">
            <div class="w-128 py-2 px-2 font-bold mx-2">COVID-19 Tracker <sup class="font-normal">beta</sup></div>
<!--            <div @click="setMode('single')" class="p-2 px-4 cursor-pointer hover:text-white" :class="isActive(mode,'single','bg-hoverslab')">Statistics (to-do)</div>-->
            <div @click="setMode('comparison')" class="p-2 px-4 cursor-pointer hover:text-white" :class="isActive(mode,'comparison','bg-hoverslab')">Compare</div>
<!--            <div @click="setMode('trends')" class="p-2 px-4 cursor-pointer hover:text-white" :class="isActive(mode,'trends','bg-hoverslab')">Trends (coming soon...)</div>-->
            <div class="p-2 px-4 cursor-pointer text-lightslab" :class="isActive(mode,'trends','bg-hoverslab')">Trends (coming soon...)</div>
            <div @click="showAbout()" class="p-2 px-4 cursor-pointer hover:text-white" :class="isActive(mode,'about','bg-hoverslab')">About</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Nav",
        props: [
            'active',
            'mode'
        ],
        methods: {
            isActive(selected, current, classes){
                if(selected === current)
                    return classes;
                return '';
            },
            showAbout()
            {
                this.$emit('showAbout');
            },
            setMode(mode)
            {
                this.$emit('setMode',mode)
            }
        }
    }
</script>

<style scoped>

</style>
