<template>
    <div :id="id" class="absolute inset-x-0 inset-y-0">
        <keep-alive>
            <div v-if="!enable" class="bg-white w-full h-full text-gray-800 flex items-center justify-center"><div>Map is disabled</div></div>
            <div v-else id="global_map" class="absolute inset-x-0 inset-y-0" style="position:absolute"></div>
        </keep-alive>
    </div>
</template>

<script>
    export default {
        name: "Map",
        props: [
            'id',
            'date',
            'data',
            'database',
            'rankings',
            'enable',
            'settings',
            'layers',
            'location',
        ],
        data(){
            return {
                map: {},
                config: {
                    interactive: false,
                    zoom: 1,
                    stops: [
                        [{zoom: 0, value: 1}, 1],
                        [{zoom: 0, value: 100}, 3],
                        [{zoom: 0, value: 1000}, 6],
                        [{zoom: 0, value: 10000}, 13],
                        [{zoom: 0, value: 100000}, 25],
                        [{zoom: 0, value: 1000000}, 40],
                        [{zoom: 0, value: 10000000}, 80],
                        [{zoom: 0, value: 100000000}, 160],

                        [{zoom: 1, value: 1}, 2],
                        [{zoom: 1, value: 100}, 5],
                        [{zoom: 1, value: 1000}, 12],
                        [{zoom: 1, value: 10000}, 25],
                        [{zoom: 1, value: 100000}, 50],
                        [{zoom: 1, value: 1000000}, 80],
                        [{zoom: 1, value: 10000000}, 160],
                        [{zoom: 1, value: 100000000}, 320],

                        [{zoom: 2, value: 1}, 5],
                        [{zoom: 2, value: 100}, 10],
                        [{zoom: 2, value: 1000}, 25],
                        [{zoom: 2, value: 10000}, 50],
                        [{zoom: 2, value: 100000}, 100],
                        [{zoom: 2, value: 1000000}, 160],
                        [{zoom: 2, value: 10000000}, 320],
                        [{zoom: 2, value: 100000000}, 640],

                        [{zoom: 3, value: 1}, 10],
                        [{zoom: 3, value: 100}, 20],
                        [{zoom: 3, value: 1000}, 50],
                        [{zoom: 3, value: 10000}, 100],
                        [{zoom: 3, value: 100000}, 200],
                        [{zoom: 3, value: 1000000}, 320],
                        [{zoom: 3, value: 10000000}, 640],
                        [{zoom: 3, value: 100000000}, 1280],

                        [{zoom: 4, value: 1}, 20],
                        [{zoom: 4, value: 100}, 40],
                        [{zoom: 4, value: 1000}, 100],
                        [{zoom: 4, value: 10000}, 200],
                        [{zoom: 4, value: 100000}, 400],
                        [{zoom: 4, value: 1000000}, 640],
                        [{zoom: 4, value: 10000000}, 1280],
                        [{zoom: 4, value: 100000000}, 2560],

                        [{zoom: 5, value: 1}, 40],
                        [{zoom: 5, value: 100}, 80],
                        [{zoom: 5, value: 1000}, 200],
                        [{zoom: 5, value: 10000}, 400],
                        [{zoom: 5, value: 100000}, 800],
                        [{zoom: 5, value: 1000000}, 1280],
                        [{zoom: 5, value: 10000000}, 2560],
                        [{zoom: 5, value: 100000000}, 5120],

                        [{zoom: 6, value: 1}, 80],
                        [{zoom: 6, value: 100}, 160],
                        [{zoom: 6, value: 1000}, 400],
                        [{zoom: 6, value: 10000}, 800],
                        [{zoom: 6, value: 100000}, 1600],
                        [{zoom: 6, value: 1000000}, 2560],
                        [{zoom: 6, value: 10000000}, 5120],
                        [{zoom: 6, value: 100000000}, 10240],

                        [{zoom: 7, value: 1}, 160],
                        [{zoom: 7, value: 100}, 320],
                        [{zoom: 7, value: 1000}, 800],
                        [{zoom: 7, value: 10000}, 1600],
                        [{zoom: 7, value: 100000}, 3200],
                        [{zoom: 7, value: 1000000}, 5120],
                        [{zoom: 7, value: 10000000}, 10240],
                        [{zoom: 7, value: 100000000}, 20480],

                        [{zoom: 8, value: 1}, 320],
                        [{zoom: 8, value: 100}, 640],
                        [{zoom: 8, value: 1000}, 1600],
                        [{zoom: 8, value: 10000}, 3200],
                        [{zoom: 8, value: 100000}, 6400],
                        [{zoom: 8, value: 1000000}, 10240],
                        [{zoom: 8, value: 10000000}, 20480],
                        [{zoom: 8, value: 100000000}, 40960],

                        [{zoom: 9, value: 1}, 640],
                        [{zoom: 9, value: 100}, 1280],
                        [{zoom: 9, value: 1000}, 3200],
                        [{zoom: 9, value: 10000}, 6400],
                        [{zoom: 9, value: 100000}, 12800],
                        [{zoom: 9, value: 1000000}, 20480],
                        [{zoom: 9, value: 10000000}, 40960],
                        [{zoom: 9, value: 100000000}, 81920],

                        [{zoom: 20, value: 1}, 640],
                        [{zoom: 20, value: 100}, 1280],
                        [{zoom: 20, value: 1000}, 3200],
                        [{zoom: 20, value: 10000}, 6400],
                        [{zoom: 20, value: 100000}, 12800],
                        [{zoom: 20, value: 1000000}, 20480],
                        [{zoom: 20, value: 10000000}, 40960],
                        [{zoom: 20, value: 100000000}, 81920],
                    ],
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


            if(this.settings)
            {
                if(this.settings && this.settings.home)
                {

                }
            }


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
                self.mapReady = true;
                self.setLayers(self.layers);
                if(self.location)
                {
                    map.setCenter([self.location.longitude, self.location.latitude]);
                }
            })
        },
        methods:
        {
            geoJson(field)
            {
                var data = {
                    type: 'FeatureCollection',
                    features: [
                    ]
                };
                var allowedCountryStates = [
                    'United States',
                    'Denmark',
                    'Australia',
                    'Canada',
                    'China',
                ]

                var omitCountries = [
                    'Denmark',
                    'China',
                    'Australia',
                    'United States',
                    'China',
                ]



                if(!field)
                {
                    field = 'confirmed';
                }

                if(['confirmed','deaths','recovered'].indexOf(field) !== -1)
                {
                    if (this.database && this.database.processed)
                    {
                        for(var x in this.database.processed.dataset)
                        {
                            var row = this.database.processed.dataset[x];
                            if(
                                // exclude global
                                row.name.country === 'Global'

                                ||
                                // exclude countries from this list
                                (
                                    omitCountries.indexOf(row.name.country) !== -1
                                    && row.name.state.length === 0
                                )

                                ||
                                // exclude states from countries not in this list
                                (
                                    row.name.state.length > 0
                                    && allowedCountryStates.indexOf(row.name.country) === -1
                                )



                            )
                            {
                                // If we encounter any of the items we want to exclude, skip to the next one
                                continue;
                            }
                            else
                            {
                                for(var y in row.daily)
                                {
                                    if(row.daily[y])
                                    {
                                        if(row.daily[y].date === this.date)
                                        {
                                            data.features.push({
                                                type: 'Feature',
                                                properties: {
                                                    name: x,
                                                    confirmed: parseInt(row.daily[y].c),
                                                    deaths: parseInt(row.daily[y].d),
                                                    recovered: parseInt(row.daily[y].r),
                                                },
                                                geometry: {
                                                    type: 'Point',
                                                    coordinates: [
                                                        row.long,
                                                        row.lat,
                                                    ]
                                                }
                                            });
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else
                    {
                        for(var x in this.data)
                        {
                            var row = this.data[x];
                            if(row.name.country !== 'Global' && (row.name.state === false || row.name.state.length === 0))
                            {
                                data.features.push({
                                    type: 'Feature',
                                    properties: {
                                        name: x,
                                        confirmed: parseInt(row.total.confirmed),
                                        deaths: parseInt(row.total.deaths),
                                        recovered: parseInt(row.total.recovered),
                                    },
                                    geometry: {
                                        type: 'Point',
                                        coordinates: [
                                            row.lng,
                                            row.lat,
                                        ]
                                    }
                                });
                            }
                        }
                    }
                }
                else if (field === 'confirmedSurge')
                {
                    var confirmedSurge = this.rankings.confirmedSurge.slice(0,10);

                    confirmedSurge = confirmedSurge.sort(function (a, b) {
                        return a.confirmedSurge > b.confirmedSurge ? 1 : -1;
                    });
                    for(var x in confirmedSurge)
                    {
                        var row = _.clone(this.rankings.confirmedSurge[x]);
                        var country = false;

                        for(var y in this.data)
                        {
                            if(this.data[y] && this.data[y].name && this.data[y].name === row.name)
                            {
                                country = _.clone(this.data[y]);
                            }
                        }
                        if(country)
                        {
                            data.features.push({
                                type: 'Feature',
                                properties: {
                                    name: row.name,
                                    confirmedSurge: row.confirmedSurge,
                                    confirmed: parseInt(row.confirmedDelta),
                                },
                                geometry: {
                                    type: 'Point',
                                    coordinates: [
                                        country.lng,
                                        country.lat,
                                    ]
                                }
                            });
                        }
                    }
                }
                return data;
            },
            addConfirmed()
            {
                if(this.mapReady)
                {
                    var
                        fillColour1 = 'rgba(31,128,130,0.5)',
                        fillColour10 = 'rgba(31,128,130,0.5)',
                        fillColour100 = 'rgba(31,128,130,0.5)',
                        fillColour1000 = 'rgba(31,128,130,0.5)',
                        fillColour10000 = 'rgba(31,128,130,0.5)',
                        fillColour100000 = 'rgba(31,128,130,0.5)',
                        fillColour1000000 = 'rgba(31,128,130,0.5)';


                    if(this.options.home)
                    {
                        var
                            fillColour1 = 'rgba(31,128,130,0.1)',
                            fillColour10 = 'rgba(31,128,130,0.1)',
                            fillColour100 = 'rgba(31,128,130,0.1)',
                            fillColour1000 = 'rgba(31,128,130,0.1)',
                            fillColour10000 = 'rgba(31,128,130,0.1)',
                            fillColour100000 = 'rgba(31,128,130,0.1)',
                            fillColour1000000 = 'rgba(31,128,130,0.1)';
                    }

                    if(!this.map.getSource('confirmed'))
                    {
                        this.map.addSource('confirmed', {
                            type: 'geojson',
                            data: this.geoJson('confirmed')
                        });
                    }

                    if(!this.map.getLayer('confirmed'))
                    {
                        this.map.addLayer({
                            id: 'confirmed',
                            type: 'circle',
                            source: 'confirmed',
                            paint: {
                                'circle-radius': {
                                    property: 'confirmed',
                                    stops: this.config.stops,
                                },
                                'circle-color': [
                                    'interpolate',
                                    ['linear'],
                                    ['get','confirmed'],
                                    0, 'rgba(0,0,0,0)',
                                    1, fillColour1,
                                    10, fillColour10,
                                    100, fillColour100,
                                    1000, fillColour1000,
                                    10000, fillColour10000,
                                    100000, fillColour100000,
                                    1000000, fillColour1000000,
                                    // 100, 'rgba(208,209,230,0.8)',
                                    // 1000, 'rgba(166,189,219,0.7)',
                                    // 10000, 'rgba(103,169,207,0.6)',
                                    // 100000, 'rgba(28,144,153,0.5)'
                                ],
                            }
                        });
                    }
                }
            },
            addDeaths()
            {
                if(this.mapReady)
                {
                    if(!this.map.getSource('deaths'))
                    {
                        this.map.addSource('deaths', {
                            type: 'geojson',
                            data: this.geoJson('deaths')
                        });
                    }

                    if(!this.map.getLayer('deaths'))
                    {
                        this.map.addLayer({
                            id: 'deaths',
                            type: 'circle',
                            source: 'deaths',
                            paint: {
                                'circle-radius': {
                                    property: 'deaths',
                                    stops: this.config.stops,
                                },
                                'circle-color': [
                                    'interpolate',
                                    ['linear'],
                                    ['get','deaths'],
                                    0, 'rgba(0,0,0,0)',
                                    1, 'rgba(255,0,0,0.5)',
                                    // 100, 'rgba(208,209,230,0.8)',
                                    // 1000, 'rgba(166,189,219,0.7)',
                                    // 10000, 'rgba(103,169,207,0.6)',
                                    // 100000, 'rgba(28,144,153,0.5)'
                                ],
                            }
                        });
                    }
                }
            },
            addRecovered()
            {
                if(this.mapReady)
                {
                    if(!this.map.getSource('recovered'))
                    {
                        this.map.addSource('recovered', {
                            type: 'geojson',
                            data: this.geoJson('recovered')
                        });
                    }

                    if(!this.map.getLayer('recovered'))
                    {
                        this.map.addLayer({
                            id: 'recovered',
                            type: 'circle',
                            source: 'recovered',
                            paint: {
                                'circle-radius': {
                                    property: 'recovered',
                                    stops: this.config.stops,
                                },
                                'circle-color': [
                                    'interpolate',
                                    ['linear'],
                                    ['get','recovered'],
                                    0, 'rgba(0,0,0,0)',
                                    1, 'rgba(104,211,145,0.5)',
                                    // 100, 'rgba(208,209,230,0.8)',
                                    // 1000, 'rgba(166,189,219,0.7)',
                                    // 10000, 'rgba(103,169,207,0.6)',
                                    // 100000, 'rgba(28,144,153,0.5)'
                                ],
                            }
                        });
                    }
                }
            },
            addConfirmedSurge()
            {
                if(this.mapReady)
                {
                    if(!this.map.getSource('confirmedSurge'))
                    {
                        this.map.addSource('confirmedSurge', {
                            type: 'geojson',
                            data: this.geoJson('confirmedSurge')
                        });
                    }


                    if(!this.map.getLayer('confirmedSurge'))
                    {
                        this.map.addLayer({
                            id: 'confirmedSurge',
                            type: 'circle',
                            source: 'confirmedSurge',
                            paint: {
                                'circle-radius': {
                                    property: 'confirmed',
                                    stops: [
                                        // zoom is 0 and "rating" is 0 -> circle radius will be 0px
                                        [{zoom: 0, value: 1}, 1],
                                        [{zoom: 0, value: 10}, 2],
                                        [{zoom: 0, value: 100}, 4],
                                        [{zoom: 0, value: 1000}, 8],
                                        [{zoom: 0, value: 10000}, 16],
                                        [{zoom: 0, value: 100000}, 32],

                                        [{zoom: 1, value: 1}, 2],
                                        [{zoom: 1, value: 10}, 4],
                                        [{zoom: 1, value: 100}, 8],
                                        [{zoom: 1, value: 1000}, 16],
                                        [{zoom: 1, value: 10000}, 32],
                                        [{zoom: 1, value: 100000}, 64],

                                        [{zoom: 2, value: 1}, 4],
                                        [{zoom: 2, value: 10}, 8],
                                        [{zoom: 2, value: 100}, 16],
                                        [{zoom: 2, value: 1000}, 32],
                                        [{zoom: 2, value: 10000}, 64],
                                        [{zoom: 2, value: 100000}, 128],

                                        [{zoom: 3, value: 1}, 8],
                                        [{zoom: 3, value: 10}, 16],
                                        [{zoom: 3, value: 100}, 32],
                                        [{zoom: 3, value: 1000}, 64],
                                        [{zoom: 3, value: 10000}, 128],
                                        [{zoom: 3, value: 100000}, 256],

                                        [{zoom: 4, value: 1}, 16],
                                        [{zoom: 4, value: 10}, 32],
                                        [{zoom: 4, value: 100}, 64],
                                        [{zoom: 4, value: 1000}, 128],
                                        [{zoom: 4, value: 10000}, 256],
                                        [{zoom: 4, value: 100000}, 512],

                                        [{zoom: 5, value: 1}, 32],
                                        [{zoom: 5, value: 10}, 64],
                                        [{zoom: 5, value: 100}, 128],
                                        [{zoom: 5, value: 1000}, 256],
                                        [{zoom: 5, value: 10000}, 512],
                                        [{zoom: 5, value: 100000}, 1024],

                                        [{zoom: 6, value: 1}, 64],
                                        [{zoom: 6, value: 10}, 128],
                                        [{zoom: 6, value: 100}, 256],
                                        [{zoom: 6, value: 1000}, 512],
                                        [{zoom: 6, value: 10000}, 1024],
                                        [{zoom: 6, value: 100000}, 2048],

                                        [{zoom: 7, value: 1}, 128],
                                        [{zoom: 7, value: 10}, 256],
                                        [{zoom: 7, value: 100}, 512],
                                        [{zoom: 7, value: 1000}, 1024],
                                        [{zoom: 7, value: 10000}, 2048],
                                        [{zoom: 7, value: 100000}, 4096],

                                        [{zoom: 8, value: 1}, 256],
                                        [{zoom: 8, value: 10}, 512],
                                        [{zoom: 8, value: 100}, 1024],
                                        [{zoom: 8, value: 1000}, 2048],
                                        [{zoom: 8, value: 10000}, 4096],
                                        [{zoom: 8, value: 100000}, 8192],

                                        [{zoom: 9, value: 1}, 512],
                                        [{zoom: 9, value: 10}, 1024],
                                        [{zoom: 9, value: 100}, 2048],
                                        [{zoom: 9, value: 1000}, 4096],
                                        [{zoom: 9, value: 10000}, 8192],
                                        [{zoom: 9, value: 100000}, 16384],

                                        [{zoom: 20, value: 1}, 512],
                                        [{zoom: 20, value: 10}, 1024],
                                        [{zoom: 20, value: 100}, 2048],
                                        [{zoom: 20, value: 1000}, 4096],
                                        [{zoom: 20, value: 10000}, 8192],
                                        [{zoom: 20, value: 100000}, 16384],
                                    ]
                                },
                                'circle-color': [
                                    'interpolate',
                                    ['linear'],
                                    ['get','confirmed'],
                                    0, 'rgba(0,0,0,0)',
                                    1, 'rgba(255,0,0,0.5)',
                                    // 100, 'rgba(208,209,230,0.8)',
                                    // 1000, 'rgba(166,189,219,0.7)',
                                    // 10000, 'rgba(103,169,207,0.6)',
                                    // 100000, 'rgba(28,144,153,0.5)'
                                ],
                            }
                        });
                    }
                }
            },
            removeConfirmed()
            {
                if(this.mapReady)
                {
                    if(this.map.getLayer('confirmed'))
                    {
                        this.map.removeLayer('confirmed');
                    }
                }
            },
            removeDeaths()
            {
                if(this.mapReady)
                {
                    if(this.map.getLayer('deaths'))
                    {
                        this.map.removeLayer('deaths');
                    }
                }
            },
            removeRecovered()
            {
                if(this.mapReady)
                {
                    if(this.map.getLayer('recovered'))
                    {
                        this.map.removeLayer('recovered');
                    }
                }
            },
            removeConfirmedSurge()
            {
                if(this.mapReady)
                {
                    if(this.map.getLayer('confirmedSurge'))
                    {
                        this.map.removeLayer('confirmedSurge');
                    }
                }
            },
            getCenter()
            {
            },
            addHeatmap()
            {
                this.map.addSource('confirmed',{

                });
            },
            setLayers(newvalue)
            {
                if(newvalue.confirmed === true) {
                    this.addConfirmed();
                }
                else if(newvalue.confirmed === false)
                {
                    this.removeConfirmed();
                }

                if(newvalue.deaths === true) {
                    this.addDeaths();
                }
                else if(newvalue.deaths === false)
                {
                    this.removeDeaths();
                }

                if(newvalue.recovered === true) {
                    this.addRecovered();
                }
                else if(newvalue.recovered === false)
                {
                    this.removeRecovered();
                }

                if(newvalue.confirmedSurge === true) {
                    this.addConfirmedSurge();
                }
                else if(newvalue.confirmedSurge === false)
                {
                    this.removeConfirmedSurge();
                }
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

                    if(this.settings.home)
                    {
                        options.home = true;
                    }
                    else
                    {
                        options.home = false;
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
                    this.setLayers(newvalue)
                }
            },
            date: {
                handler(newvalue)
                {
                    for(var x in this.layers)
                    {
                        if(this.layers[x] === true)
                            this.map.getSource(x).setData(this.geoJson(x));
                    }
                },
            },
            location: {
                immediate: true,
                deep: true,
                handler(newvalue, oldvalue) {
                    this.map.setCenter([newvalue.longitude, newvalue.latitude]);
                }
            },
        }
    }
</script>

<style scoped>

</style>
