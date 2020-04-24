<template>
    <div class="flex items-center justify-center h-full fixed top-0 right-0 bottom-0 left-0 z-10">
        <div class="bg-black opacity-50 absolute top-0 right-0 bottom-0 left-0 z-0" @click="close()"></div>
        <div class="bg-slab w-240 rounded z-10 p-4 text-sm relative">
            <div class="absolute top-0 right-0 px-4 py-2 bg-slab border border-lightslab cursor-pointer hover:bg-lightslab" @click="close()">Close</div>
            <div class="flex items-center justify-start">
                <div class=""><img src="/img/logo/logo-text.png" alt="Simpler Solutions" /></div>
                <div class="text-6xl ml-8 font-bold tracking-tighter text-heading">
                    COVID-19 Tracker
                </div>
            </div>
            <div class="text-heading">
                <h1 class="text-2xl font-bold mb-2 text-heading">About</h1>
                <p class="my-2">This COVID-19 tracker uses data from the following sources:</p>
                <ul class="list-disc ml-8 mr-4">
                    <li><a class="underline hover:text-lightlabel" href="https://github.com/CSSEGISandData/COVID-19">COVID-19 data repository</a> by Johns Hopkins Centre for Systems Science and Engineering.</li>
                    <li><a class="underline hover:text-lightlabel" href="https://www.worldometers.info/coronavirus/">Worldometers</a></li>
                    <li><a class="underline hover:text-lightlabel" href="https://en.wikipedia.org/wiki/2019%E2%80%9320_coronavirus_pandemic">Wikipedia - 2019-20 coronavirus pandemic</a></li>
                    <li><a class="underline hover:text-lightlabel" href="https://www.bsg.ox.ac.uk/research/research-projects/coronavirus-government-response-tracker" target="_blank">Coronavirus Government Response Tracker</a> by University of Oxford</li>
                    <li>"Growth Factor" <a class="underline hover:text-lightlabel" href="https://www.abc.net.au/news/2020-04-10/coronavirus-data-australia-growth-factor-covid-19/12132478">according to ABC Australia</a> is a measure of <em>how fast the number of new cases is going up or down.</em></li>
                </ul>
                <h2 class="text-2xl font-bold my-2 mt-8 text-heading">Disclaimer of liability</h2>
                <p class="text-2xl text-green-400 mb-2">The material and information contained on this website is for general information purposes only. You should not rely upon the material or information on the website as a basis for making any business, legal, or any other decisions.</p>
                <p>Whilst we endeavour to keep the information up-to-date and correct, Simpler Solutions makes no representations or warranties of any kind, express or implied about the completeness, accuracy, reliability, suitability or availability with respect to the website or information, products, services or related graphics contained on the website for any purpose. Any reliance you place on such material is therefore strictly at your own risk.</p>

                <p class="mt-8">For feedback, suggestions, and bug reports, please contact <a class="underline hover:text-lightlabel" href="mailto:feedback@makeitsimpler.com.au">feedback@makeitsimpler.com.au</a>.</p>
                <p class="mt-4">&copy; Simpler Solutions</p>
            </div>
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
