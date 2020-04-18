<template>
    <div class="hidden xl:block bg-slab text-white text-left">
        <div class="py-2 px-2 flex text-heading items-center justify-center">
            <div class="w-128 py-2 px-2 font-bold mx-2">COVID-19 Tracker <sup class="font-normal">beta</sup></div>
            <router-link to="/" @click="setMode('global')" class="p-2 px-4 cursor-pointer hover:text-white" :class="isActive('global','bg-hoverslab')">Global</router-link>
<!--            <div @click="setMode('comparison')" class="p-2 px-4 cursor-pointer hover:text-white" :class="isActive(mode,'comparison','bg-hoverslab')">Compare</div>-->
            <router-link to="/comparison" @click="setMode('trends')" class="p-2 px-4 cursor-pointer hover:text-white" :class="isActive('compare','bg-hoverslab')">Compare</router-link>
<!--            <div @click="setMode('trends')" class="p-2 px-4 cursor-pointer hover:text-white" :class="isActive(mode,'trends','bg-hoverslab')">Trends (coming soon...)</div>-->
            <div class="p-2 px-4 cursor-pointer text-lightslab" :class="isActive('Trends','bg-hoverslab')">Trends (coming soon...)</div>
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
            isActive(current, classes){
                if(this.$route.name == current)
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
