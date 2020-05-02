<template>
    <div :id="id" class="relative">
        <div v-if="!enable" class="bg-white w-full h-full text-gray-800 flex items-center justify-center"><div>Map is disabled</div></div>
        <div v-else id="global_map" class="h-full w-full"></div>
    </div>
</template>

<script>
    export default {
        name: "Map",
        props: [
            'id',
            'data',
            'enable',
            'settings',
        ],
        data(){
            return {
                map: {},
                config: {
                    interactive: false,
                    zoom: 1,
                },
                countries: false,
            }
        },
        mounted(){
            var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

            mapboxgl.accessToken = 'pk.eyJ1IjoiY2h1Y2tjZXJyaWxsbyIsImEiOiJjazkxN2U2bWEwOW04M2Z1Z2R2eTkwazJhIn0.rNQOyiivZyGkeAkCKMJD6Q';
            var map = new mapboxgl.Map({
                container: 'global_map',
                style: 'mapbox://styles/mapbox/light-v10',
                center: [6.679687499992383, 34.597041516152586],
                interactive: this.options.interactive,
            });
            this.map = map;
            map.setZoom(this.options.zoom);
            map.setCenter([6.679687499992383, 34.597041516152586]);

            // if(this.options.interactive === false)
            // {
            //     map.dragRotate.disable();
            //     map.zoom.disable();
            //     map.pan.disable();
            // }

            // for(var x in this.data)
            // {
            //     var country = this.data[x];
            //     new mapboxgl.Marker()
            //         .setLngLat([country.long, country.lat])
            //         .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
            //             .setHTML('<h3 class="text-slab font-bold">' + country.name + '</h3><p class="text-xs text-base">Confirmed: ' + country.confirmed + '</p>'))
            //         .addTo(map);
            // }
        },
        methods:
        {
            geoJson()
            {
                var data = [];
                for(var x in this.data)
                {
                    var row = _.clone(this.data[x]);
                }
            },
            getCenter()
            {
                console.log(this.map.getCenter());
            },
            addHeatmap()
            {
                this.map.addSource('confirmed',{

                });
            }
        },
        computed: {
            options()
            {
                var options = {};
                if(this.settings)
                {
                    if(this.settings.interactive)
                    {
                        options.interactive = this.settings.interactive;
                    }
                    else
                    {
                        options.interactive = this.config.interactive;
                    }

                    if(this.settings.zoom)
                    {
                        options.zoom = this.settings.zoom;
                    }
                    else
                    {
                        options.zoom = this.config.zoom;
                    }
                }
                console.log(options);
                return options;
            }
        },
        watch: {
            zoom(){
                this.map.setZoom(this.zoom)
            },
            data(){
                this.countries = this.data;
                console.log(this.countries);
            }
        }
    }
</script>

<style scoped>

</style>
