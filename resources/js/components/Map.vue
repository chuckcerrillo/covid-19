<template>
    <div :id="id" class="relative">
        <keep-alive>
            <div v-if="!enable" class="bg-white w-full h-full text-gray-800 flex items-center justify-center"><div>Map is disabled</div></div>
            <div v-else id="global_map" class="h-full w-full"></div>
        </keep-alive>
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
            'layers'
        ],
        data(){
            return {
                map: {},
                config: {
                    interactive: false,
                    zoom: 1,
                },
                countries: false,
                mapReady: false,
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
                maxZoom: 9,
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
            var self = this;
            map.on('load',function(){
                console.log('MAP LOAD!');
                self.mapReady = true;
                map.addSource('countries', {
                    type: 'geojson',
                    data: self.geoJson()
                });




                // map.removeLayer('confirmed')

                // map.addLayer({
                //     id: 'trees-heat',
                //     type: 'heatmap',
                //     source: 'countries',
                //     maxzoom: 15,
                //     paint: {
                //         // increase weight as diameter breast height increases
                //         'heatmap-weight': {
                //             property: 'confirmed',
                //             type: 'exponential',
                //             stops: [
                //                 [1, 0],
                //                 [100000, 10]
                //             ]
                //         },
                //         // increase intensity as zoom level increases
                //         'heatmap-intensity': {
                //             stops: [
                //                 [11, 1],
                //                 [15, 3]
                //             ]
                //         },
                //         // assign color values be applied to points depending on their density
                //         'heatmap-color': [
                //             'interpolate',
                //             ['linear'],
                //             ['heatmap-density'],
                //             0, 'rgba(236,222,239,0)',
                //             0.2, 'rgb(208,209,230)',
                //             0.4, 'rgb(166,189,219)',
                //             0.6, 'rgb(103,169,207)',
                //             0.8, 'rgb(28,144,153)'
                //         ],
                //         // increase radius as zoom increases
                //         // 'heatmap-radius': {
                //         //     stops: [
                //         //         [11, 15],
                //         //         [15, 20]
                //         //     ]
                //         // },
                //         'heatmap-radius' : [
                //             'interpolate',
                //             ['linear'],
                //             ['zoom'],
                //             10,20,40,100
                //         ],
                //         // decrease opacity to transition into the circle layer
                //         'heatmap-opacity': {
                //             default: 1,
                //             stops: [
                //                 [10, 1],
                //                 [15, 0]
                //             ]
                //         },
                //     }
                // }, 'waterway-label');
                //
                // map.addLayer({
                //     id: 'trees-point',
                //     type: 'circle',
                //     source: 'countries',
                //     minzoom: 14,
                //     paint: {
                //         // increase the radius of the circle as the zoom level and dbh value increases
                //         'circle-radius': {
                //             property: 'confirmed',
                //             type: 'exponential',
                //             stops: [
                //                 [{ zoom: 15, value: 1 }, 5],
                //                 [{ zoom: 15, value: 10000 }, 10],
                //                 [{ zoom: 22, value: 1 }, 20],
                //                 [{ zoom: 22, value: 10000 }, 50],
                //             ]
                //         },
                //         'circle-color': {
                //             property: 'confirmed',
                //             type: 'exponential',
                //             stops: [
                //                 [0, 'rgba(236,222,239,0)'],
                //                 [100, 'rgb(236,222,239)'],
                //                 [200, 'rgb(208,209,230)'],
                //                 [400, 'rgb(166,189,219)'],
                //                 [800, 'rgb(103,169,207)'],
                //                 [1600, 'rgb(28,144,153)'],
                //                 [3200, 'rgb(1,108,89)']
                //             ]
                //         },
                //         'circle-stroke-color': 'white',
                //         'circle-stroke-width': 1,
                //         'circle-opacity': {
                //             stops: [
                //                 [14, 0],
                //                 [15, 1]
                //             ]
                //         }
                //     }
                // }, 'waterway-label');
            })
        },
        methods:
        {
            geoJson()
            {
                var data = {
                    type: 'FeatureCollection',
                    features: [
                    ]
                };
                for(var x in this.data)
                {
                    if(this.data[x].name !== 'Global')
                    {

                        var row = _.clone(this.data[x]);
                        data.features.push({
                            type: 'Feature',
                            properties: {
                                name: this.data[x].name,
                                confirmed: this.data[x].total.confirmed,
                            },
                            geometry: {
                                type: 'Point',
                                coordinates: [
                                    this.data[x].lng,
                                    this.data[x].lat,
                                ]
                            }
                        });

                    }
                }
                return data;
            },
            addConfirmed()
            {
                if(this.mapReady)
                {
                    this.map.addLayer({
                        id: 'confirmed',
                        type: 'circle',
                        source: 'countries',
                        paint: {
                            'circle-radius': {
                                property: 'confirmed',
                                stops: [
                                    // zoom is 0 and "rating" is 0 -> circle radius will be 0px
                                    [{zoom: 0, value: 1}, 1],
                                    [{zoom: 0, value: 100}, 3],
                                    [{zoom: 0, value: 1000}, 6],
                                    [{zoom: 0, value: 10000}, 13],
                                    [{zoom: 0, value: 100000}, 25],
                                    [{zoom: 0, value: 1000000}, 40],

                                    [{zoom: 1, value: 1}, 2],
                                    [{zoom: 1, value: 100}, 5],
                                    [{zoom: 1, value: 1000}, 12],
                                    [{zoom: 1, value: 10000}, 25],
                                    [{zoom: 1, value: 100000}, 50],
                                    [{zoom: 1, value: 1000000}, 80],

                                    [{zoom: 2, value: 1}, 5],
                                    [{zoom: 2, value: 100}, 10],
                                    [{zoom: 2, value: 1000}, 25],
                                    [{zoom: 2, value: 10000}, 50],
                                    [{zoom: 2, value: 100000}, 100],
                                    [{zoom: 2, value: 1000000}, 160],

                                    [{zoom: 3, value: 1}, 10],
                                    [{zoom: 3, value: 100}, 20],
                                    [{zoom: 3, value: 1000}, 50],
                                    [{zoom: 3, value: 10000}, 100],
                                    [{zoom: 3, value: 100000}, 200],
                                    [{zoom: 3, value: 1000000}, 320],

                                    [{zoom: 4, value: 1}, 20],
                                    [{zoom: 4, value: 100}, 40],
                                    [{zoom: 4, value: 1000}, 100],
                                    [{zoom: 4, value: 10000}, 200],
                                    [{zoom: 4, value: 100000}, 400],
                                    [{zoom: 4, value: 1000000}, 640],

                                    [{zoom: 5, value: 1}, 40],
                                    [{zoom: 5, value: 100}, 80],
                                    [{zoom: 5, value: 1000}, 200],
                                    [{zoom: 5, value: 10000}, 400],
                                    [{zoom: 5, value: 100000}, 800],
                                    [{zoom: 5, value: 1000000}, 1280],

                                    [{zoom: 6, value: 1}, 80],
                                    [{zoom: 6, value: 100}, 160],
                                    [{zoom: 6, value: 1000}, 400],
                                    [{zoom: 6, value: 10000}, 800],
                                    [{zoom: 6, value: 100000}, 1600],
                                    [{zoom: 6, value: 1000000}, 2560],

                                    [{zoom: 7, value: 1}, 160],
                                    [{zoom: 7, value: 100}, 320],
                                    [{zoom: 7, value: 1000}, 800],
                                    [{zoom: 7, value: 10000}, 1600],
                                    [{zoom: 7, value: 100000}, 3200],
                                    [{zoom: 7, value: 1000000}, 5120],

                                    [{zoom: 8, value: 1}, 320],
                                    [{zoom: 8, value: 100}, 640],
                                    [{zoom: 8, value: 1000}, 1600],
                                    [{zoom: 8, value: 10000}, 3200],
                                    [{zoom: 8, value: 100000}, 6400],
                                    [{zoom: 8, value: 1000000}, 10240],

                                    [{zoom: 9, value: 1}, 640],
                                    [{zoom: 9, value: 100}, 1280],
                                    [{zoom: 9, value: 1000}, 3200],
                                    [{zoom: 9, value: 10000}, 6400],
                                    [{zoom: 9, value: 100000}, 12800],
                                    [{zoom: 9, value: 1000000}, 20480],

                                    [{zoom: 20, value: 1}, 640],
                                    [{zoom: 20, value: 100}, 1280],
                                    [{zoom: 20, value: 1000}, 3200],
                                    [{zoom: 20, value: 10000}, 6400],
                                    [{zoom: 20, value: 100000}, 12800],
                                    [{zoom: 20, value: 1000000}, 20480],
                                ]
                            },
                            'circle-color': [
                                'interpolate',
                                ['linear'],
                                ['get','confirmed'],
                                1, 'rgba(255,0,0,0.1)',
                                // 100, 'rgba(208,209,230,0.8)',
                                // 1000, 'rgba(166,189,219,0.7)',
                                // 10000, 'rgba(103,169,207,0.6)',
                                // 100000, 'rgba(28,144,153,0.5)'
                            ],
                        }
                    });
                }
            },
            removeConfirmed()
            {
                if(this.mapReady)
                {
                    this.map.removeLayer('confirmed');
                }
            },
            getCenter()
            {
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
                return options;
            }
        },
        watch: {
            zoom() {
                this.map.setZoom(this.zoom)
            },
            data() {
                this.countries = this.data;
            },
            layers: {
                immediate: true,
                deep: true,
                handler(newvalue, oldvalue) {

                    if (this.layers)
                    {
                        if(this.layers.confirmed === true) {
                            this.addConfirmed();
                        }
                        else if(this.layers.confirmed === false)
                        {
                            this.removeConfirmed();
                        }
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>
