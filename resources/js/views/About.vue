<template>
    <div class="flex items-center justify-center h-full fixed top-0 right-0 bottom-0 left-0 z-10">
        <div class="bg-black opacity-50 absolute top-0 right-0 bottom-0 left-0 z-0"></div>
        <div class="bg-slab w-256 h-128 rounded z-10 p-4">
            <h1 class="text-2xl font-bold mb-2">About</h1>
            <p>This COVID-19 tracker uses data from the COVID-10 data repository by Johns Hopkins CSSE. (<a href="https://github.com/CSSEGISandData/COVID-19">https://github.com/CSSEGISandData/COVID-19</a>)</p>
        </div>

    </div>
</template>

<script>
    export default {
        name: "About"
    }
</script>

<style scoped>

</style>
