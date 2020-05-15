<template>
    <div class="bg-slab text-left text-xs">
        <div class="py-2 px-2 flex text-lightlabel items-center justify-between">
<!--            <router-link to="/comparison" @click="setMode('trends')" class="p-2 px-4 cursor-pointer hover:text-white" :class="isActive('comparisonDashboard','bg-hoverslab')">Dashboard</router-link>-->
            <router-link to="/comparison/response" @click="setMode('trends')" class="rounded p-2 cursor-pointer hover:text-white flex flex-col items-center justify-center" :class="isActive('comparisonResponse','bg-hoverslab text-white')">
                <svg class="h-8 fill-current" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 28 28">
                    <g>
                        <path d="M25.68,23.42h-.89V22.19a.5.5,0,0,0-.5-.5h-.77V11h.37a.5.5,0,0,0,.5-.5V8.67h.09a.5.5,0,0,0,.5-.5v-1h.61a.49.49,0,0,0,.49-.41.51.51,0,0,0-.31-.56L14.22,1.88a.39.39,0,0,0-.21,0,.36.36,0,0,0-.2,0L2.26,6.24a.5.5,0,0,0,.18,1H3v1a.5.5,0,0,0,.5.5h.08V10.5a.5.5,0,0,0,.5.5h.37V21.69H3.71a.5.5,0,0,0-.5.5v1.23H2.32a.5.5,0,0,0-.5.5v1.73a.5.5,0,0,0,.5.5H25.68a.5.5,0,0,0,.5-.5V23.92A.5.5,0,0,0,25.68,23.42Zm-3.16-1.73h-.75V11h.75Zm-4.25,0V11h.38a.5.5,0,0,0,.5-.5V8.67h.75V10.5a.5.5,0,0,0,.5.5h.37V21.69ZM12.32,10H9.82V8.67h2.5ZM10.7,11h.75V21.66H10.7Zm1.75,0h.37a.5.5,0,0,0,.5-.5V8.67h1.33V10.5a.5.5,0,0,0,.5.5h.38V21.69H12.45Zm4.82,10.66h-.74V11h.74ZM18.15,10h-2.5V8.67h2.5Zm5.24,0H20.9V8.67h2.49ZM14,2.87l8.84,3.34H5.17ZM4.08,7.21H24v.46H4V7.21Zm3,1.46V10H4.58V8.67ZM6.2,11V21.66H5.45V11Zm1,0h.38a.5.5,0,0,0,.5-.5V8.67h.74V10.5a.5.5,0,0,0,.5.5H9.7V21.69H7.2Zm-3,11.69H23.79v.73H4.21Zm21,2.46H2.82v-.73H25.18Z"/>
                    </g>
                </svg>
                <div>Govt Response</div>
            </router-link>
            <router-link to="/comparison/daily" @click="setMode('trends')" class="rounded p-2 cursor-pointer hover:text-white flex flex-col items-center justify-center" :class="isActive('comparisonDaily','bg-hoverslab text-white')">
                <svg class="h-8 fill-current" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 28 28">
                    <g>
                        <path d="M25.48,4.12h-3V2.19h-1V4.12H17.1V2.19h-1V4.12H11.74V2.17h-1v2H6.38V2.19h-1V4.12H2.52a.5.5,0,0,0-.5.5V25.33a.5.5,0,0,0,.5.5h23a.5.5,0,0,0,.5-.5V4.62A.5.5,0,0,0,25.48,4.12Zm-20.1,1V6.3a.5.5,0,0,0,.5.5.5.5,0,0,0,.5-.5V5.12h4.36V6.28a.5.5,0,0,0,.5.5.5.5,0,0,0,.5-.5V5.12H16.1V6.3a.5.5,0,0,0,.5.5.5.5,0,0,0,.5-.5V5.12h4.36V6.3a.5.5,0,0,0,.5.5.5.5,0,0,0,.5-.5V5.12H25V7.25H3V5.12ZM3,24.83V8.25H25V24.83Z"/><path d="M7.25,9.65H4.64a.5.5,0,0,0-.5.5v2.33a.5.5,0,0,0,.5.5H7.25a.5.5,0,0,0,.5-.5V10.15A.5.5,0,0,0,7.25,9.65ZM6.75,12H5.14V10.65H6.75Z"/><path d="M12.61,9.65H10a.5.5,0,0,0-.5.5v2.33a.51.51,0,0,0,.5.5h2.61a.5.5,0,0,0,.5-.5V10.15A.5.5,0,0,0,12.61,9.65ZM12.11,12H10.5V10.65h1.61Z"/><path d="M18,9.65H15.37a.5.5,0,0,0-.5.5v2.33a.5.5,0,0,0,.5.5H18a.51.51,0,0,0,.5-.5V10.15A.5.5,0,0,0,18,9.65ZM17.48,12H15.87V10.65h1.61Z"/><path d="M23.36,9.65H20.75a.5.5,0,0,0-.5.5v2.33a.5.5,0,0,0,.5.5h2.61a.5.5,0,0,0,.5-.5V10.15A.5.5,0,0,0,23.36,9.65ZM22.86,12H21.25V10.65h1.61Z"/><path d="M7.25,14.31H4.64a.5.5,0,0,0-.5.5v2.33a.5.5,0,0,0,.5.5H7.25a.5.5,0,0,0,.5-.5V14.81A.5.5,0,0,0,7.25,14.31Zm-.5,2.33H5.14V15.31H6.75Z"/><path d="M12.61,14.31H10a.5.5,0,0,0-.5.5v2.33a.5.5,0,0,0,.5.5h2.61a.5.5,0,0,0,.5-.5V14.81A.5.5,0,0,0,12.61,14.31Zm-.5,2.33H10.5V15.31h1.61Z"/><path d="M18,14.31H15.37a.5.5,0,0,0-.5.5v2.33a.5.5,0,0,0,.5.5H18a.5.5,0,0,0,.5-.5V14.81A.5.5,0,0,0,18,14.31Zm-.5,2.33H15.87V15.31h1.61Z"/><path d="M23.36,14.31H20.75a.5.5,0,0,0-.5.5v2.33a.5.5,0,0,0,.5.5h2.61a.5.5,0,0,0,.5-.5V14.81A.5.5,0,0,0,23.36,14.31Zm-.5,2.33H21.25V15.31h1.61Z"/><path d="M7.25,19H4.64a.5.5,0,0,0-.5.5V21.8a.5.5,0,0,0,.5.5H7.25a.5.5,0,0,0,.5-.5V19.47A.5.5,0,0,0,7.25,19Zm-.5,2.33H5.14V20H6.75Z"/><path d="M12.61,19H10a.5.5,0,0,0-.5.5V21.8a.5.5,0,0,0,.5.5h2.61a.5.5,0,0,0,.5-.5V19.47A.5.5,0,0,0,12.61,19Zm-.5,2.33H10.5V20h1.61Z"/><path d="M18,19H15.37a.5.5,0,0,0-.5.5V21.8a.5.5,0,0,0,.5.5H18a.5.5,0,0,0,.5-.5V19.47A.5.5,0,0,0,18,19Zm-.5,2.33H15.87V20h1.61Z"/>
                    </g>
                </svg>
                <div>Daily Breakdown</div>
            </router-link>
            <router-link to="/comparison/charts" @click="setMode('trends')" class="rounded p-2 cursor-pointer hover:text-white flex flex-col items-center justify-center" :class="isActive('comparisonCharts','bg-hoverslab text-white')">
                <svg class="h-8 fill-current" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 28 28">
                    <g>
                        <path d="M25.67,25.17H2.83V2.33a.5.5,0,0,0-.5-.5.5.5,0,0,0-.5.5V25.67A.52.52,0,0,0,2,26a.54.54,0,0,0,.36.14H25.67a.5.5,0,0,0,.5-.5A.5.5,0,0,0,25.67,25.17Z"/><path d="M4.77,23.74H9.63a.5.5,0,0,0,.5-.5V4.73a.5.5,0,0,0-.5-.5H4.77a.51.51,0,0,0-.5.5V23.24A.5.5,0,0,0,4.77,23.74Zm.5-18.51H9.13V22.74H5.27Z"/><path d="M11.57,23.74h4.86a.5.5,0,0,0,.5-.5V9.1a.51.51,0,0,0-.5-.5H11.57a.51.51,0,0,0-.5.5V23.24A.5.5,0,0,0,11.57,23.74Zm.5-14.14h3.86V22.74H12.07Z"/><path d="M18.37,23.72h4.86a.5.5,0,0,0,.5-.5V11.05a.5.5,0,0,0-.5-.5H18.37a.5.5,0,0,0-.5.5V23.22A.5.5,0,0,0,18.37,23.72Zm.5-12.17h3.86V22.72H18.87Z"/>
                    </g>
                </svg>
                <div>Charts</div>
            </router-link>
            <router-link to="/comparison/map" @click="setMode('trends')" class="rounded p-2 cursor-pointer hover:text-white flex flex-col items-center justify-center" :class="isActive('comparisonMap','bg-hoverslab text-white')">
                <svg class="h-8 fill-current" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 28 28">
                    <g>
                        <path d="M24.57,8a.61.61,0,0,0-.15-.24A12.19,12.19,0,0,0,14.16,1.85h-.32a12.13,12.13,0,0,0-10.33,6A.75.75,0,0,0,3.44,8a12.05,12.05,0,0,0,0,12,.59.59,0,0,0,.1.17,12.21,12.21,0,0,0,1.79,2.34,12.07,12.07,0,0,0,8.51,3.64h.32A12.18,12.18,0,0,0,24.42,20.2a.61.61,0,0,0,.15-.24A12,12,0,0,0,24.57,8ZM6,6.19A11,11,0,0,1,12.27,3c-.07.06-.13.13-.2.2-.26.25-.51.52-.76.8l-.3.34c-.32.4-.62.8-.91,1.24A15.21,15.21,0,0,0,9,7.68H4.82A11.5,11.5,0,0,1,6,6.19ZM4.2,8.68H8.58a15.82,15.82,0,0,0-.89,4.82H2.86A10.88,10.88,0,0,1,4.2,8.68ZM2.87,14.5H7.69a15.89,15.89,0,0,0,.89,4.83H4.21A10.92,10.92,0,0,1,2.87,14.5ZM6,21.81a11.34,11.34,0,0,1-1.21-1.48H9a15.09,15.09,0,0,0,1.12,2.1A12.85,12.85,0,0,0,11,23.67c.09.12.19.23.29.34.24.28.5.55.76.8l.2.21A11.12,11.12,0,0,1,6,21.81Zm7.46.35v2.59l-.15-.12-.29-.25-.5-.48-.27-.29c-.17-.17-.33-.36-.49-.55l-.22-.27c-.22-.29-.44-.59-.64-.9a14.73,14.73,0,0,1-.86-1.56H13.5Zm0-2.83H9.65a14.77,14.77,0,0,1-1-4.83H13.5Zm0-5.83H8.69a14.66,14.66,0,0,1,1-4.82H13.5Zm0-7.66V7.68H10.08a14.88,14.88,0,0,1,.86-1.57c.2-.31.42-.61.64-.89.07-.1.15-.18.22-.27s.32-.38.49-.56l.27-.29.5-.47.29-.26.15-.11ZM25.14,13.5H20.31a15.94,15.94,0,0,0-.89-4.83h4.36A10.89,10.89,0,0,1,25.14,13.5Zm-2-5.83H19a15.09,15.09,0,0,0-1.12-2.1c-.29-.44-.59-.84-.91-1.24L16.69,4c-.24-.28-.5-.54-.76-.8-.07-.06-.13-.14-.19-.2A11.15,11.15,0,0,1,23.15,7.67ZM14.5,5.84V3.26l.15.11.28.25c.18.16.35.32.51.49l.27.28c.17.18.33.37.49.56l.22.26c.22.29.43.59.64.9a15.79,15.79,0,0,1,.86,1.56H14.5Zm0,2.84h3.85a14.77,14.77,0,0,1,1,4.83H14.5Zm0,5.82h4.81a14.77,14.77,0,0,1-1,4.83H14.5Zm.94,9.4c-.16.16-.33.33-.51.48l-.28.25-.15.12V20.33h3.42a14.73,14.73,0,0,1-.86,1.56c-.21.31-.42.61-.64.9l-.22.26c-.16.2-.32.39-.49.57Zm.3,1.11.19-.2c.26-.25.52-.52.76-.8l.3-.34a14.67,14.67,0,0,0,.91-1.24A15.09,15.09,0,0,0,19,20.33h4.14A11.17,11.17,0,0,1,15.74,25Zm8-5.68H19.42a15.89,15.89,0,0,0,.89-4.83h4.82A11.15,11.15,0,0,1,23.78,19.33Z"/>
                    </g>
                </svg>
                <div>Map</div>
            </router-link>
<!--            <router-link to="/about" @click="setMode('about')" class="p-2 px-4 cursor-pointer hover:text-white" :class="isActive('about','bg-hoverslab')">About</router-link>-->
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    export default {
        name: "Nav",
        props: [
            'active',
            'mode'
        ],
        mounted()
        {
            if(this.$route.name != 'global')
            {
                this.$store.dispatch('fetchCountries');
                this.$store.dispatch('fetchCountryCases');
                this.$store.dispatch('fetchStateCases');
            }
        },
        computed:
        {
            ...mapGetters({
                countries: 'countries',
                countriesIndex: 'countriesIndex',
                countriesStatus: 'countriesStatus',

                countryCases: 'dailyCountryCases',
                stateCases: 'dailyStateCases',
                countryCasesIndex: 'dailyCountryCasesIndex',
                stateCasesIndex: 'dailyStateCasesIndex',

                countryCasesStatus: 'dailyCountryCasesStatus',
                stateCasesStatus: 'dailyStateCasesStatus',
            }),
        },
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
            },

        }
    }
</script>

<style scoped>

</style>
