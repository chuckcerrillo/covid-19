<template>
    <div class="flex items-center justify-center h-full fixed top-0 right-0 bottom-0 left-0 z-10">
        <div class="bg-black opacity-50 absolute top-0 right-0 bottom-0 left-0 z-0" @click="close()"></div>
        <div class="bg-slab w-200 rounded z-10 p-4 text-sm relative">
            <div class="absolute top-0 right-0 px-4 py-2 bg-slab border border-lightslab cursor-pointer hover:bg-lightslab" @click="close()">Close</div>
            <h1 class="text-2xl font-bold mb-2">About</h1>
            <p>This COVID-19 tracker uses data from the COVID-19 data repository by Johns Hopkins CSSE. (<a class="hover:text-lightslab" href="https://github.com/CSSEGISandData/COVID-19">https://github.com/CSSEGISandData/COVID-19</a>)</p>
            <p class="mt-4">&copy; Simpler Solutions</p>
        </div>

    </div>
</template>

<script>
    export default {
        name: "About",
        methods: {
            close()
            {
                this.$emit('showAbout');
            }
        }
    }
</script>

<style scoped>

</style>
