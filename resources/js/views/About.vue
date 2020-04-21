<template>
    <div class="flex items-center justify-center h-full fixed top-0 right-0 bottom-0 left-0 z-10">
        <div class="bg-black opacity-50 absolute top-0 right-0 bottom-0 left-0 z-0" @click="close()"></div>
        <div class="bg-slab w-200 rounded z-10 p-4 text-sm relative">
            <div class="absolute top-0 right-0 px-4 py-2 bg-slab border border-lightslab cursor-pointer hover:bg-lightslab" @click="close()">Close</div>
            <h1 class="text-2xl font-bold mb-2">About</h1>
            <p class="my-2">This COVID-19 tracker uses data from the following sources:</p>
            <p>&middot; COVID-19 data repository by Johns Hopkins Centre for Systems Science and Engineering. (<a class="underline hover:text-lightslab" href="https://github.com/CSSEGISandData/COVID-19">https://github.com/CSSEGISandData/COVID-19</a>)</p>
            <p>&middot; Worldometers (<a class="underline hover:text-lightslab" href="https://www.worldometers.info/coronavirus/">https://www.worldometers.info/coronavirus/</a>)</p>
            <p>&middot; <a href="https://www.bsg.ox.ac.uk/research/research-projects/coronavirus-government-response-tracker" target="_blank">Coronavirus Government Response Tracker</a> by University of Oxford</p>
            <p class="my-2">"Growth Factor" <a class="underline hover:text-lightslab" href="https://www.abc.net.au/news/2020-04-10/coronavirus-data-australia-growth-factor-covid-19/12132478">according to ABC Australia</a> is a measure of <em>how fast the number of new cases is going up or down.</em></p>
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
