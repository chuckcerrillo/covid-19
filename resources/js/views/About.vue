<template>
    <div class="bg-slab absolute inset-x-0 inset-y-0 z-10">
        <div class="absolute inset-y-0 left-0 p-4" style="right: 22rem">
            <div class="text-6xl font-bold tracking-tighter text-white">
                COVID-19 Tracker
            </div>
            <div class="text-heading">
                <p class="my-2">This COVID-19 tracker uses data from the following sources:</p>
                <ul class="list-disc ml-8 mr-4">
                    <li><a class="underline hover:text-lightlabel" href="https://github.com/CSSEGISandData/COVID-19">COVID-19 data repository</a> by Johns Hopkins Centre for Systems Science and Engineering.</li>
                    <li><a class="underline hover:text-lightlabel" href="https://www.worldometers.info/coronavirus/">Worldometers</a></li>
                    <li><a class="underline hover:text-lightlabel" href="https://en.wikipedia.org/wiki/2019%E2%80%9320_coronavirus_pandemic">Wikipedia - 2019-20 coronavirus pandemic</a></li>
                    <li><a class="underline hover:text-lightlabel" href="https://www.bsg.ox.ac.uk/research/research-projects/coronavirus-government-response-tracker" target="_blank">Coronavirus Government Response Tracker</a> by University of Oxford</li>
                    <li>"Growth Factor" <a class="underline hover:text-lightlabel" href="https://www.abc.net.au/news/2020-04-10/coronavirus-data-australia-growth-factor-covid-19/12132478">according to ABC Australia</a> is a measure of <em>how fast the number of new cases is going up or down.</em></li>
                </ul>
                <h2 class="font-bold my-2 mt-8 text-heading">Disclaimer of liability</h2>
                <p class="text-green-400 font-bold mb-2">The material and information contained on this website is for general information purposes only. You should not rely upon the material or information on the website as a basis for making any business, legal, or any other decisions.</p>
                <p class="text-sm">Whilst we endeavour to keep the information up-to-date and correct, Simpler Solutions makes no representations or warranties of any kind, express or implied about the completeness, accuracy, reliability, suitability or availability with respect to the website or information, products, services or related graphics contained on the website for any purpose. Any reliance you place on such material is therefore strictly at your own risk.</p>

                <p class="text-sm mt-8">For feedback, suggestions, and bug reports, please contact <a class="underline hover:text-lightlabel" href="mailto:feedback@makeitsimpler.com.au">feedback@makeitsimpler.com.au</a>.</p>
                <div class="flex items-center justify-start mt-4">
                    <div>&copy;</div>
                    <div class="mx-2"><img src="/img/logo/logo-140.png" class="h-4" alt="Simpler Solutions" /></div>
                    <div>Simpler Solutions</div>
                </div>
            </div>
        </div>
        <div class="absolute inset-y-0 right-0 w-80 z-10 overflow-hidden mr-4">
            <div class="m-2 text-2xl font-bold">Changelog:</div>
            <simplebar class="p-2 rounded bg-slab-primary absolute inset-x-0 inset-y-0" style="position:absolute; top: 4rem; bottom: 2rem;">
                <div class="m2 text-sm">
                    <div class="font-bold">2020-05-24</div>
                    <ul class="list-disc ml-8 mr-4">
                        <li>Added a new loading screen.</li>
                        <li>All new mobile layout. The comparison tool is now viewable in mobile. It's currently sharing the same back-end as the desktop version so there's still room for performance improvements.</li>
                        <li>Applied some performance enhancements for a more responsive interface for both desktop and mobile view.</li>
                        <li>Fixed issues with the date slider. At times of day the slider is initialising with the wrong date range.</li>
                        <li>Charts are now date filtered, showing the last 30 days by default. This is to reduce unnecessary loading of data.</li>
                    </ul>

                    <div class="font-bold mt-2">2020-05-15</div>
                    <ul class="list-disc ml-8 mr-4">
                        <li>The background on the home page is now a map showing overlays representing the number of confirmed cases per country.</li>
                        <li>Added a new "Maps" view in the comparison tool, which visually shows certain statistics for each country. This is currently limited to "Confirmed", "Deaths", and "Recovered", but more will be added in future updates.</li>
                        <li>The map has a time series mode, which you can play/pause to see the progression of the country statistics.</li>
                        <li>All of the charts are now lazy loaded, which makes the "Daily Breakdown" and "Charts" pages a lot more responsive.</li>
                        <li>The date slider in the "Daily Breakdown comparison page" is now a date range slider, allowing you to specify start and end dates. This affects the mini charts.</li>
                    </ul>

                    <div class="font-bold mt-2">2020-05-10</div>
                    <ul class="list-disc ml-8 mr-4">
                        <li>Added comparison table view for Government Response</li>
                        <li>Added comparison table view for Daily Breakdown</li>
                        <li>Changes to government response now appear as annotations in the daily breakdown.</li>
                        <li>Added "Remove all" button to quickly clear the selected countries list.</li>
                        <li>Bugfix: Charts were loading in the background regardless of the page you're viewing, causing unnecessary delays to page load.</li>
                    </ul>

                    <div class="font-bold mt-2">2020-05-03</div>
                    <ul class="list-disc ml-8 mr-4">
                        <li>Overhauled data structure, which should result in better performance and overall responsiveness of the UI.</li>
                        <li>Layout is slightly more fluid. Now supporting 1280px wide screens. (We'll eventually get down to mobile support!)</li>
                        <li>Government response section has been updated to use the new data provided by the Oxford COVID-19 Government Response Tracker (OxCGRT).</li>
                        <li>Added "Active" as selectable metric in the charts.</li>
                        <li>Revised "About" page. (Hello!)</li>
                        <li>Bugfix: The up/down arrows in the rankings section on the home page were indicating changes in values instead of changes in rank.</li>
                    </ul>

                    <div class="font-bold mt-2">2020-04-26</div>
                    <ul class="list-disc ml-8 mr-4">
                        <li>Launched COVID-19 tracker!</li>
                    </ul>
                </div>
            </simplebar>
        </div>
    </div>
</template>

<script>
    import simplebar from 'simplebar-vue';
    import 'simplebar/dist/simplebar.min.css';
    export default {
        name: "About",
        components:{
            simplebar,
        },
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
