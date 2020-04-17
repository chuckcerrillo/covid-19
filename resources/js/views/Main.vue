<template>
    <div>
        <div v-if="!loaded">Loading data</div>
        <div v-else class="h-full overflow-hidden relative">
            <div v-show="mode == 'global'" class="relative h-full w-full flex flex-col justify-start items-center overflow-y-scroll">
                <a name="top"></a>
                <div class="w-full xl:w-256">
                    <div class="xl:hidden text-3xl font-bold tracking-tight text-center mb-4">COVID-19 Tracker</div>
                    <div class="flex-col xl:block justify-center items-center">
                        <div class="p-4 xl:p-0 xl:flex items-center justify-center text-center">
                            <div class="text-5xl xl:mr-4 xl:text-7xl font-bold text-white">{{global.total.active | numeralFormat}}</div>
                            <div>
                                <div class="text-2xl xl:text-3xl font-bold tracking-tight">active cases</div>
                                <div class="text-xs text-heading">as of {{global.last_update}}</div>
                            </div>
                        </div>
                        <div class="flex items-start mt-4 xl:mt-0 flex-1 justify-center px-4 xl:px-0">
                            <div class="w-1/3 xl:w-auto xl:mr-8 text-center">
                                <div class="xl:text-3xl font-bold text-white">{{global.total.confirmed| numeralFormat}}</div>
                                <div class="font-bold">confirmed cases</div>
                            </div>
                            <div class="w-1/3 xl:w-auto xl:mr-8 text-center">
                                <div class="xl:text-3xl font-bold text-red-400">{{global.total.deaths| numeralFormat}}</div>
                                <div class="font-bold">deaths</div>
                            </div>
                            <div class="w-1/3 xl:w-auto text-center">
                                <div class="xl:text-3xl font-bold text-green-400">{{global.total.recovered| numeralFormat}}</div>
                                <div class="font-bold">recoveries</div>
                            </div>
                        </div>

                    </div>

                    <div class="xl:hidden">
                        <p class="text-sm text-yellow-400 m-4">For the full experience, including comparison views and charts, please view this website on a larger screen.</p>
                    </div>

                    <div class="hidden xl:block mt-12 h-148">
                        <Map
                            class="w-full rounded-lg overflow-hidden h-full"
                            id="world_map"
                            :enable="false"
                            :data="countries_sorted"
                        />
                    </div>
                </div>

                <div class="bg-slab flex flex-1 mt-8 pt-8 w-full items-center justify-center">
                    <div class="w-full xl:w-256">
                        <h2 class="m-2 xl:m-0 font-bold text-3xl tracking-tight mb-8">At a glance...</h2>

                        <div class="xl:flex xl:flex-1">
                            <div class="m-2 xl:m-0 xl:w-1/3">
                                <div class="font-bold tracking-tight mb-4">Countries with most cumulative cases</div>
                                <div class="bg-lightslab rounded-lg">
                                    <div v-for="(row,key,index) in getSortedCountries('confirmed','desc',5)"
                                        class="p-2 xl:p-4 flex items-end justify-center">
                                        <div class="mr-4 xl:mr-0 xl:w-8 xl:text-3xl font-bold text-lightlabel">{{(key+1)}}</div>
                                        <div class="flex xl:block flex-1 xl:flex-none justify-between items-center ">
                                            <div class="text-primary text-sm xl:px-2 xl:w-64">{{row.name}}</div>
                                            <div class="font-bold text-white xl:text-3xl xl:px-2">{{row.total.c | numeralFormat}}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="m-2 xl:m-0 xl:w-1/3 xl:ml-2">
                                <div class="font-bold tracking-tight mb-4">Countries with most deaths</div>
                                <div class="bg-lightslab rounded-lg">
                                    <div v-for="(row,key,index) in getSortedCountries('deaths','desc',5)"
                                         class="p-2 xl:p-4 flex items-end justify-center">
                                        <div class="mr-4 xl:mr-0 xl:w-8 xl:text-3xl font-bold text-lightlabel">{{(key+1)}}</div>
                                        <div class="flex xl:block flex-1 xl:flex-none justify-between items-center ">
                                            <div class="text-primary text-sm xl:px-2 xl:w-64">{{row.name}}</div>
                                            <div class="font-bold text-white xl:text-3xl xl:px-2">{{row.total.d | numeralFormat}}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="m-2 xl:m-0 xl:w-1/3 xl:ml-2">
                                <div class="font-bold tracking-tight mb-4">Countries with most recoveries</div>
                                <div class="bg-lightslab rounded-lg">
                                    <div v-for="(row,key,index) in getSortedCountries('recovered','desc',5)"
                                         class="p-2 xl:p-4 flex items-end justify-center">
                                        <div class="mr-4 xl:mr-0 xl:w-8 xl:text-3xl font-bold text-lightlabel">{{(key+1)}}</div>
                                        <div class="flex xl:block flex-1 xl:flex-none justify-between items-center ">
                                            <div class="text-primary text-sm xl:px-2 xl:w-64">{{row.name}}</div>
                                            <div class="font-bold text-white xl:text-3xl xl:px-2">{{row.total.r | numeralFormat}}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div class="hidden bg-slab xl:flex flex-1 pt-8 w-full items-center justify-center">
                    <div class="m-2 xl:m-0 xl:w-256 font-bold text-2xl tracking-tight">
                        Global cases graph
                    </div>
                </div>

                <div class="hidden bg-slab xl:flex flex-1 w-full items-center justify-center">
                    <div class="w-full xl:w-360">
                        <div class="w-full h-128 xl:h-220 relative rounded my-4">
                            <StatsChart class="absolute left-0 right-0 bottom-0 top-0"
                                        :data="globalDataset"
                                        full="true"
                                        :config="
                                            {
                                                controls:
                                                {
                                                    menu : false
                                                }
                                            }
                            " />
                        </div>
                    </div>
                </div>

                <div class="bg-slab flex flex-1 w-full items-center justify-center pt-8">
                    <div class="w-256">
                        <h2 class="mb-4 text-2xl font-bold tracking-tight">Global timeline</h2>
                        <div class="flex items-center justify-start mb-4">
                            <div @click="global_options.table = 'daily'" class="p-2 mr-4 text-sm rounded cursor-pointer hover:bg-lightslab" :class="global_options.table == 'daily' ? 'border border-heading bg-lightslab':''">Daily stats</div>
                            <div @click="global_options.table = 'countries'" class="p-2 mr-4 text-sm rounded cursor-pointer hover:bg-lightslab" :class="global_options.table == 'countries' ? 'border border-heading  bg-lightslab':''">Countries</div>
                        </div>

                        <div v-show="global_options.table == 'daily'" class="rounded overflow-hidden">
                            <div class="flex flex-1 items-center justify-start w-full text-xs bg-lightslab">
                                <div class="w-24 font-bold p-2 xl:w-76">Date</div>
                                <div class="xl:hidden font-bold p-2 w-full">Stats</div>
                                <div class="hidden font-bold p-2 w-36">Confirmed</div>
                                <div class="hidden font-bold p-2 w-36">Deaths</div>
                                <div class="hidden font-bold p-2 w-36">Recovered</div>
                                <div class="hidden font-bold p-2 w-36">Active</div>
                                <div class="hidden font-bold p-2 w-36">Growth Factor</div>
                            </div>
                            <div v-for="(row,key,index) in globalDaily.reverse()">
                                <div v-if="getGlobalDayNotes(moment(row.date).format('YYYY-MM-DD')).length > 0">
                                    <div v-for="annotation in getGlobalDayNotes(moment(row.date).format('YYYY-MM-DD'))"
                                         class="p-1 my-4 mx-8 text-xs rounded bg-lightslab flex"
                                    >
                                        <div v-if="annotation.state.length > 0" class="font-bold mr-2">{{annotation.state}}</div>
                                        <div>
                                            <div>{{annotation.notes}}</div>
                                            <div v-if="annotation.url" class="flex items-center text-lightslab">
                                                <div class="mr-1">Source:</div>
                                                <a class="underline hover:text-white truncate ... inline-block w-64" :href="annotation.url">{{annotation.url}}</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="xl:hidden flex flex-1 items-start text-xs" :class="key % 2 == 0 ? 'bg-slab-primary' : 'bg-slab-secondary'">
                                    <div class="p-2">{{moment(row.date).format('YYYY-MM-DD')}}</div>
                                    <div>
                                        <div :class="key % 2 == 0 ? 'bg-slab-primary' : 'bg-slab-secondary'" class="p-2">
                                            <span class="font-bold">Confirmed</span>
                                            <span class="">{{row.confirmed|numeralFormat}}</span>
                                            <span class="text-red-400" v-if="row.confirmedDelta >= 0">(+{{row.confirmedDelta | numeralFormat}})</span>
                                            <span class="text-green-400" v-else>({{row.confirmedDelta | numeralFormat}})</span>
                                        </div>
                                        <div :class="key % 2 == 0 ? 'bg-slab-primary' : 'bg-slab-secondary'" class="p-2">
                                            <span class="font-bold">Deaths</span>
                                            <span class="">{{row.deaths|numeralFormat}}</span>
                                            <span class="text-red-400" v-if="row.deathsDelta >= 0">(+{{row.deathsDelta | numeralFormat}})</span>
                                            <span class="text-green-400" v-else>({{row.deathsDelta| numeralFormat}})</span>
                                        </div>
                                        <div :class="key % 2 == 0 ? 'bg-slab-primary' : 'bg-slab-secondary'" class="p-2">
                                            <span class="font-bold">Recovered</span>
                                            <span class="">{{row.recovered|numeralFormat}}</span>
                                            <span class="text-green-400" v-if="row.recoveredDelta.recovered >= 0">(+{{row.recoveredDelta| numeralFormat}})</span>
                                            <span class="text-red-400" v-else>({{row.recoveredDelta| numeralFormat}})</span>
                                        </div>
                                        <div :class="key % 2 == 0 ? 'bg-slab-primary' : 'bg-slab-secondary'" class="p-2">
                                            <span class="font-bold">Active</span>
                                            <span class="">{{(row.confirmed - row.deaths - row.recovered) | numeralFormat}}</span>
                                            <span class="text-red-400" v-if="row.activeDelta  >= 0">(+{{row.activeDelta | numeralFormat}})</span>
                                            <span class="text-green-400" v-else>({{row.activeDelta | numeralFormat}})</span>
                                        </div>
                                        <div :class="key % 2 == 0 ? 'bg-slab-primary' : 'bg-slab-secondary'" class="p-2">
                                            <span class="font-bold">Growth factor</span>
                                            <span class="">{{row.growthFactor|numeralFormat}}</span>
                                            <span class="text-red-400" v-if="row.growthFactor > 1">{{row.growthFactor}}</span>
                                            <span class="text-green-400" v-else>{{row.growthFactor}}</span>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    class="xl:flex flex-1 items-center justify-start w-full text-xs hidden"
                                >
                                    <div :class="key % 2 == 0 ? 'bg-slab-primary' : 'bg-slab-secondary'" class="p-2 w-76">{{moment(row.date).format('YYYY-MM-DD')}}</div>
                                    <div :class="key % 2 == 0 ? 'bg-slab-primary' : 'bg-slab-secondary'" class="p-2 w-36">{{row.confirmed|numeralFormat}}
                                        <span class="text-red-400" v-if="row.confirmedDelta >= 0">(+{{row.confirmedDelta | numeralFormat}})</span>
                                        <span class="text-green-400" v-else>({{row.confirmedDelta | numeralFormat}})</span>
                                    </div>
                                    <div :class="key % 2 == 0 ? 'bg-slab-primary' : 'bg-slab-secondary'" class="p-2 w-36">{{row.deaths|numeralFormat}}
                                        <span class="text-red-400" v-if="row.deathsDelta >= 0">(+{{row.deathsDelta | numeralFormat}})</span>
                                        <span class="text-green-400" v-else>({{row.deathsDelta| numeralFormat}})</span>
                                    </div>
                                    <div :class="key % 2 == 0 ? 'bg-slab-primary' : 'bg-slab-secondary'" class="p-2 w-36">{{row.recovered|numeralFormat}}
                                        <span class="text-green-400" v-if="row.recoveredDelta.recovered >= 0">(+{{row.recoveredDelta| numeralFormat}})</span>
                                        <span class="text-red-400" v-else>({{row.recoveredDelta| numeralFormat}})</span>
                                    </div>
                                    <div :class="key % 2 == 0 ? 'bg-slab-primary' : 'bg-slab-secondary'" class="p-2 w-36">{{(row.confirmed - row.deaths - row.recovered) | numeralFormat}}
                                        <span class="text-red-400" v-if="row.activeDelta  >= 0">(+{{row.activeDelta | numeralFormat}})</span>
                                        <span class="text-green-400" v-else>({{row.activeDelta | numeralFormat}})</span>
                                    </div>
                                    <div :class="key % 2 == 0 ? 'bg-slab-primary' : 'bg-slab-secondary'" class="p-2 w-36">
                                        <span class="text-red-400" v-if="row.growthFactor > 1">{{row.growthFactor}}</span>
                                        <span class="text-green-400" v-else>{{row.growthFactor}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-show="global_options.table == 'countries'" class="bg-lightslab rounded overflow-hidden">
                            <div class="flex flex-1 items-center justify-start w-full text-xs">
                                <div class="w-32 font-bold p-2 xl:w-112">Name</div>
                                <div class="xl:hidden font-bold p-2 w-full">Stats</div>
                                <div class="hidden xl:block font-bold p-2 w-36">Confirmed</div>
                                <div class="hidden xl:block font-bold p-2 w-36">Deaths</div>
                                <div class="hidden xl:block font-bold p-2 w-36">Recovered</div>
                                <div class="hidden xl:block font-bold p-2 w-36">Active</div>
                            </div>
                            <div v-for="(row,key,index) in getSortedCountries('confirmed','desc')">
                                <div class="xl:hidden flex flex-1 items-start text-xs" :class="key % 2 == 0 ? 'bg-slab-primary' : 'bg-slab-secondary'">
                                    <div :class="key % 2 == 0 ? 'bg-slab-primary' : 'bg-slab-secondary'" class="p-2 w-32">{{row.name}}</div>
                                    <div>
                                        <div class="p-2">
                                            <span class="font-bold">Confirmed</span>
                                            {{row.total.c|numeralFormat}}
                                        </div>
                                        <div class="p-2">
                                            <span class="font-bold">Deaths</span>
                                            {{row.total.d|numeralFormat}}
                                        </div>
                                        <div class="p-2">
                                            <span class="font-bold">Recovered</span>
                                            {{row.total.r|numeralFormat}}
                                        </div>
                                        <div class="p-2">
                                            <span class="font-bold">Active</span>
                                            {{(row.total.c - row.total.d - row.total.r) | numeralFormat}}
                                        </div>
                                    </div>
                                </div>
                                <div
                                    class="hidden xl:flex flex-1 items-center justify-start w-full text-xs"
                                >
                                    <div :class="key % 2 == 0 ? 'bg-slab-primary' : 'bg-slab-secondary'" class="p-2 w-112">{{row.name}}</div>
                                    <div :class="key % 2 == 0 ? 'bg-slab-primary' : 'bg-slab-secondary'" class="p-2 w-36">{{row.total.c|numeralFormat}}</div>
                                    <div :class="key % 2 == 0 ? 'bg-slab-primary' : 'bg-slab-secondary'" class="p-2 w-36">{{row.total.d|numeralFormat}}</div>
                                    <div :class="key % 2 == 0 ? 'bg-slab-primary' : 'bg-slab-secondary'" class="p-2 w-36">{{row.total.r|numeralFormat}}</div>
                                    <div :class="key % 2 == 0 ? 'bg-slab-primary' : 'bg-slab-secondary'" class="p-2 w-36">{{(row.total.c - row.total.d - row.total.r) | numeralFormat}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- footer -->
                <div class="bg-slab flex flex-1 py-8 w-full items-center justify-center">
                    <div class="w-256">
                        <a href="#top">^ Back to top</a>
                    </div>
                </div>
            </div>



            <div v-show="mode == 'comparison'" class="relative h-screen flex flex-1">
                <div class="w-116 relative">
                    <div class="m-4 absolute left-0 top-0 w-full overflow-hidden bg-lightslab rounded h-48 z-10 p-4">
                        <div class="text-2xl tracking-tight font-bold">Global tally</div>
                        <div class="text-xs mb-4">as of {{global.last_update}}</div>

                        <div class="flex font-bold justify-between items-center">
                            <div class="m-2">
                                <div class="text-sm">Confirmed</div>
                                <div class="text-3xl text-white">{{global.total.confirmed| numeralFormat}}</div>
                            </div>
                            <div class="m-2">
                                <div class="text-sm">Deaths</div>
                                <div class="text-3xl text-white">{{global.total.deaths| numeralFormat}}</div>
                            </div>
                            <div class="m-2">
                                <div class="text-sm">Recovered</div>
                                <div class="text-3xl text-white">{{global.total.recovered| numeralFormat}}</div>
                            </div>
                        </div>


                    </div>
                    <div class="w-full m-4 absolute left-0 overflow-hidden bg-slab rounded p-2" style="top: 13rem; bottom: 56px">
                        <div v-if="show_countries" class="mx-2 pt-2">
                            <div class="text-2xl tracking-tight font-bold">Countries and states ({{countries.length}} total)</div>
                            <div class="text-xs text-right">Sorting by {{sort_stats.key}} {{sort_stats.order}}</div>
                            <div class="flex font-bold py-2 text-xs items-center">
                                <div class="w-4 p-2 m-1 ml-0"></div>
                                <div class="w-32 cursor-pointer p-2 m-1 overflow-hidden" :class="sort_stats.key == 'country' ? 'bg-hoverslab' : '' " @click="toggleSort('country')">Country / Region</div>
                                <div class="w-18 cursor-pointer p-2 m-1 overflow-hidden" :class="sort_stats.key == 'confirmed' ? 'bg-hoverslab' : '' " @click="toggleSort('confirmed')">Confirmed</div>
                                <div class="w-18 cursor-pointer p-2 m-1 overflow-hidden" :class="sort_stats.key == 'deaths' ? 'bg-hoverslab' : '' " @click="toggleSort('deaths')">Deaths</div>
                                <div class="w-18 cursor-pointer p-2 m-1 overflow-hidden" :class="sort_stats.key == 'recovered' ? 'bg-hoverslab' : '' " @click="toggleSort('recovered')">Recovered</div>
                            </div>
                            <simplebar data-simplebar-auto-hide="false" class="absolute bottom-0 right-0 left-0 mx-4 mb-4 mr-2 ml-2" style="position:absolute; top: 120px">
                                <CountryStateItem
                                    v-for="(data,key,index) in countries_sorted"
                                    v-on:selectCountry="selectCountry"
                                    :data="data"
                                    :country_key="key"
                                    :compare="compare"
                                />

                            </simplebar>
                        </div>
                        <div v-else class="mx-4 pt-2">
                            <div class="text-xs text-right">Sorting by {{sort_stats.key}} {{sort_stats.order}}</div>
                            <div class="flex font-bold py-2 text-sm items-center">
                                <div class="w-56 cursor-pointer p-2 m-1" :class="sort_stats.key == 'country' ? 'bg-hoverslab' : '' " @click="toggleSort('country')">Country / Region ({{stats.length}} total)</div>
                                <div class="w-20 cursor-pointer p-2 m-1" :class="sort_stats.key == 'confirmed' ? 'bg-hoverslab' : '' " @click="toggleSort('confirmed')">Confirmed</div>
                                <div class="w-20 cursor-pointer p-2 m-1" :class="sort_stats.key == 'deaths' ? 'bg-hoverslab' : '' " @click="toggleSort('deaths')">Deaths</div>
                                <div class="w-20 cursor-pointer p-2 m-1" :class="sort_stats.key == 'recovered' ? 'bg-hoverslab' : '' " @click="toggleSort('recovered')">Recovered</div>
                            </div>
                            <simplebar data-simplebar-auto-hide="false" class="absolute top-0 bottom-0 right-0 left-0 mt-20 mx-4 mb-4 mr-2" style="position:absolute" >
                                <!--                            <div-->
                                <!--                                class="flex hover:bg-lightslab cursor-pointer text-sm"-->
                                <!--                                v-for="(row,key,index) in stats"-->
                                <!--                                :class="isSelected(key) ? 'bg-hoverslab' : ''"-->
                                <!--                                @click="selectCountry(row['country'])"-->
                                <!--                            >-->
                                <!--                                <div class="w-56 px-2 m-1">{{row['country']}}</div>-->
                                <!--                                <div class="w-24 px-2 m-1">{{row['content']['total']['c']}}</div>-->
                                <!--                                <div class="w-20 px-2 m-1">{{row['content']['total']['d']}}</div>-->
                                <!--                                <div class="w-20 px-2 m-1">{{row['content']['total']['r']}}</div>-->
                                <!--                            </div>-->
                            </simplebar>
                        </div>
                    </div>
                </div>
                <div class="m-4 absolute top-0 right-0 overflow-hidden" style="left: 480px; bottom: 56px">
                    <div  class="bg-slab rounded absolute top-0 right-0 bottom-0 left-0">
                        <div>
                            <div class="m-4">
                                <h1 @click="getComparisonData()" class="font-bold">Compare country stats</h1>
                                <p class="text-xs">Select up to three countries from the left to compare.</p>
                            </div>
                        </div>
                        <div class="absolute top-0 right-0 bottom-0 left-0 m-4 mt-20">
                            <div class="w-full h-full relative">
                                <div class="w-64 bg-hoverslab rounded mr-2 "></div>

                                <div class="w-108 absolute top-0 left-0 bottom-0">
                                    <div class="flex w-full h-8 text-xs">
                                        <div @click="selectedCompareTab = 1" class="w-28 cursor-pointer rounded rounded-b-none py-2 px-4 mx-1 whitespace-no-wrap overflow-hidden truncate ..." :class="selectedCompareTab == 1 ? 'bg-hoverslab' : 'bg-slab-primary'">{{compare.length > 0 ? compare[0][1] : '(none)'}}</div>
                                        <div @click="selectedCompareTab = 2" class="w-28 cursor-pointer rounded rounded-b-none py-2 px-4 mr-1 whitespace-no-wrap overflow-hidden truncate ..." :class="selectedCompareTab == 2 ? 'bg-hoverslab' : 'bg-slab-primary'">{{compare.length > 1 ? compare[1][1] : '(none)'}}</div>
                                        <div @click="selectedCompareTab = 3" class="w-28 cursor-pointer rounded rounded-b-none py-2 px-4 mr-1 whitespace-no-wrap overflow-hidden truncate ..." :class="selectedCompareTab == 3 ? 'bg-hoverslab' : 'bg-slab-primary'">{{compare.length > 2 ? compare[2][1] : '(none)'}}</div>
                                    </div>
                                    <div class="w-full absolute top-0 right-0 bottom-0 left-0 mt-8">
                                        <div v-show="selectedCompareTab == 1" class="w-full bg-hoverslab rounded h-full">
                                            <div v-if="compare.length > 0">
                                                <Daily
                                                    v-on:remove="removeCompare"
                                                    :data="compare1"
                                                />
                                            </div>
                                            <div v-else class="flex items-center justify-center text-2xl text-gray-200 h-full">
                                                <div class="text-center p-4">Select a country/state to compare</div>
                                            </div>
                                        </div>
                                        <div v-show="selectedCompareTab == 2" class="w-full h-full bg-hoverslab rounded h-full">
                                            <div v-if="compare.length > 1">
                                                <Daily
                                                    v-on:remove="removeCompare"
                                                    :data="compare2"
                                                />
                                            </div>
                                            <div v-else class="flex items-center justify-center h-full text-2xl text-gray-200 h-full">
                                                <div class="text-center p-4">Select a country/state to compare</div>
                                            </div>
                                        </div>
                                        <div v-show="selectedCompareTab == 3" class="w-full h-full bg-hoverslab rounded h-full">
                                            <div v-if="compare.length > 2">
                                                <Daily
                                                    v-on:remove="removeCompare"
                                                    :data="compare3"
                                                />
                                            </div>
                                            <div v-else class="flex items-center justify-center h-full text-2xl text-gray-200 h-full">
                                                <div class="text-center p-4">Select a country/state to compare</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="absolute top-0 bottom-0 right-0 left-0 ml-112" style="top: -5rem">
                                    <StatsChart class="absolute left-0 right-0 bottom-0 top-0"
                                                :data="comparisonDataset" full="true" />
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            <div v-if="mode == 'trends'" class="flex items-center justify-center m-4 bg-slab rounded absolute top-0 right-0 bottom-0 left-0 text-center" style="bottom: 56px;">
                <div class="p-4">
                    <h1>Massive graphs / trends on this section</h1>
                    <p>TO-DO</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import simplebar from 'simplebar-vue';
    import LineChart from "../components/charts/LineChart";
    import 'simplebar/dist/simplebar.min.css';
    import Daily from "../components/Daily";
    import ComparisonChart from "../components/ComparisonChart";
    import StatsChart from "../components/StatsChart";
    import CountryStateItem from "../components/CountryStateItem";
    import moment from 'moment'
    import Single from "./Single";
    import Map from '../components/Map';

    export default {
        name: "Start",
        props: [
            'mode'
        ],
        components:{
            simplebar,
            LineChart,
            Daily,
            ComparisonChart,
            CountryStateItem,
            Single,
            StatsChart,
            Map,
        },
        data()
        {
            return {
                'loading': {
                    'countries' : false,
                    'states' : false,
                    'annotations' : false,
                    'global' : false,
                },
                'sort_stats' : {
                    'key' : 'confirmed',
                    'order' : 'desc',
                },
                'global_options' : {
                    'table' : 'daily',
                },
                'compare' : [],
                'comparison' : [],
                'raw_global': [],
                'raw_countries': [],
                'raw_state_data': [],
                'raw_stats': [],
                'selectedCountry': 2,
                'selectedCompareTab' : 1,
                'show_countries': true
            }
        },
        mounted()
        {
            axios.get('/api/stats/global')
                .then(res => {
                    this.raw_global = res.data;
                    this.loading.global = true;
                })
                .catch(error => {

                });

            axios.get('/api/stats/countries')
                .then(res => {
                    this.raw_countries = res.data;
                    this.loading.countries = true;
                })
                .catch(error => {

                });

            axios.get('/api/stats/states')
                .then(res => {
                    this.raw_state_data = res.data;
                    this.loading.states = true;
                })
                .catch(error => {

                });

            axios.get('/api/stats/annotations')
                .then(res => {
                    this.raw_annotations = res.data;
                    this.loading.annotations = true;
                })
                .catch(error => {

                });
        },
        methods:{

            getGlobalDayNotes(date)
            {
                var data = [];
                for(var x in this.globalDataset[0].annotations)
                {
                    if (this.globalDataset[0].annotations[x].date == date)
                    {
                        data.push(this.globalDataset[0].annotations[x]);
                    }
                }
                return data;
            },
            getSortedCountries(field,order,limit)
            {
                var sort = {key: field, order: order};
                var data = _.cloneDeep(this.countries);
                data = data.sort(function (a, b) {
                    if (sort.key == 'country')
                    {
                        if (sort.order == 'asc')
                            return a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1;
                        else
                            return a.name.toUpperCase() < b.name.toUpperCase() ? 1 : -1;
                    }

                    else if (sort.key == 'confirmed') {
                        if (sort.order == 'desc')
                            return a.total.c < b.total.c ? 1 : -1;
                        else
                            return a.total.c > b.total.c ? 1 : -1;
                    }

                    else if (sort.key == 'deaths') {
                        if (sort.order == 'desc')
                            return a.total.d < b.total.d ? 1 : -1;
                        else
                            return a.total.d > b.total.d ? 1 : -1;
                    }

                    else if (sort.key == 'recovered') {
                        if (sort.order == 'desc')
                            return a.total.r < b.total.r ? 1 : -1;
                        else
                            return a.total.r > b.total.r ? 1 : -1;
                    }
                });
                if(limit && limit > 0)
                {
                    data = data.slice(0,limit);
                }
                return data;
            },
            assembleDataset(source,daily,name)
            {
                const arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length;
                var row = {
                    name: name ? name : this.getCompareName(source),
                    daily: (daily ? daily : this.getDaily(source)),
                    delta: [],
                    growth: [],
                    average: [],
                    growthFactor: [],
                    annotations: [],
                }

                var count = 0;
                var previous = {};

                for(var y in row.daily)
                {
                    if (count == 0)
                    {
                        row.delta[y] = row.daily[y];
                        previous = row.daily[y];
                        count++;
                        continue;
                    }

                    row.delta[y] = {
                        date: row.daily[y].date,
                        confirmed: parseInt(row.daily[y].confirmed) - parseInt(previous.confirmed),
                        deaths: parseInt(row.daily[y].deaths) - parseInt(previous.deaths),
                        recovered: parseInt(row.daily[y].recovered) - parseInt(previous.recovered),
                        active: parseInt(row.daily[y].confirmed) - parseInt(previous.confirmed) - parseInt(row.daily[y].deaths) - parseInt(previous.deaths) - parseInt(row.daily[y].recovered) - parseInt(previous.recovered),
                    }
                    previous = row.daily[y];
                    count++;
                }
                row.total = previous;

                for(var y in row.delta)
                {
                    row.growth.push(
                        row.delta[y].confirmed
                    )
                }

                for(var y = 0; y < row.growth.length; y++)
                {
                    var avg = 0;
                    if(y < 5)
                    {
                        avg = arrAvg(row.growth.slice(0,y+1));
                    }
                    else
                    {
                        avg = arrAvg(row.growth.slice(y-5,y+1));
                    }
                    row.average.push(avg.toFixed(1));
                }

                for(var y = 0; y < row.average.length; y++)
                {
                    var gf = 0;
                    if(y == 1 || row.average[y-1] == 0)
                    {
                        gf = (row.average[y]/1).toFixed(2);
                    }
                    else
                    {
                        gf = (row.average[y]/row.average[y-1]).toFixed(2);
                    }
                    if(isNaN(gf))
                    {
                        gf = 0;
                    }
                    row.growthFactor.push(gf);
                }

                if (this.raw_annotations['All'].length > 0)
                {
                    row.annotations = row.annotations.concat(this.raw_annotations['All']);
                }

                if (this.raw_annotations[row.name.country])
                {
                    row.annotations = row.annotations.concat(this.raw_annotations[row.name.country]);
                }
                return row;
            },
            getComparisonData()
            {
                var data = [],
                    row = [];

                if(this.compare.length > 0)
                {

                    for(var x in this.compare)
                    {
                        row = this.assembleDataset(this.compare[x])

                        data.push(row);
                    }
                }
                return data;
            },
            toggleSort(key)
            {
                if(this.sort_stats.key == key)
                {
                    if(this.sort_stats.order == 'asc')
                    {
                        this.sort_stats.order = 'desc';
                    }
                    else
                    {
                        this.sort_stats.order = 'asc';
                    }
                }
                else
                {
                    this.sort_stats.key = key;
                }
            },
            findCompare(item)
            {
                var found = false;
                for(var x in this.compare)
                {
                    if(this.compare[x][1] == item[0])
                    {
                        if(this.compare[x][2] == item[1])
                        {
                            found = x;
                            break;
                        }
                    }
                }
                return found;
            },
            removeCompare(item)
            {
                var found = this.findCompare(item);
                if(found)
                {
                    this.compare.splice(found, 1);
                }
            },
            getDaily(compare)
            {
                if(compare && compare[0])
                {
                    if(!compare[2])
                    {
                        return this.getCountryDaily(compare);
                    }
                    else
                    {
                        return this.getStateDaily(compare);
                    }
                }
                return [];
            },
            getStateDaily(item)
            {
                var country = this.stats[item[0]].name,
                    state = item[2],
                    data = [];

                if(this.states[country])
                {
                    for(var x in this.states[country].states)
                    {

                        var row = this.states[country].states[x];
                        if(x == state)
                        {
                            for(var y in row.daily)
                            {
                                data.push({
                                    'date' : y,
                                    'confirmed' : parseInt(row.daily[y].c),
                                    'deaths' : parseInt(row.daily[y].d),
                                    'recovered' : parseInt(row.daily[y].r),
                                });
                            }
                        }
                    }
                }

                return data;
            },
            getCountryDaily(item){
                var country = item[0],
                    data = [],
                    empty = true;

                if(this.stats[country].daily)
                {
                    for(var x in this.stats[country].daily)
                    {

                        var row = this.stats[country].daily[x];
                        if(empty && row.total.c == 0)
                        {
                            continue;
                        }
                        data.push({
                            'date' : x,
                            'confirmed' : row.total.c,
                            'deaths' : row.total.d,
                            'recovered' : row.total.r
                        });
                    }
                }

                return data;
            },
            getCountryId(country)
            {
                for(var x in this.stats)
                {
                    if (this.stats[x] && this.stats[x].name && this.stats[x].name === country){
                        return x;
                    }
                }
                return null;
            },
            getCompareName(item)
            {
                if(item && item[0])
                {
                    var country = item[1];
                    if(item[2])
                    {
                        return {
                            full: item[2] + ' - ' + country,
                            country: country,
                            state: item[2],
                            country_id: item[0],
                        };
                    }
                    else
                    {
                        return {
                            full: country,
                            country: country,
                            state: '',
                            country_id: item[0],
                        }
                    }
                }
                return '';
            },

            selectCompare(item){
                if(this.comparison.length < 3)
                {

                }
            },
            selectCountry(country,state,key){

                if (!key)
                {
                    var key = this.getCountryId(country);
                }
                if (this.mode == 'single')
                {
                    this.compare = [];
                    this.compare.push([key,country,state]);
                }
                else if (this.mode == 'comparison')
                {
                    var key = this.getCountryId(country);

                    var find = this.findCompare([country,state]);
                    if(find !== false)
                    {
                        console.log('Found at  ' + find + ', removing');
                        this.compare.splice(find,1);
                    }
                    else
                    {
                        if(this.compare.length >= 3)
                        {
                            this.compare.shift();
                        }
                        if(this.compare.length < 3)
                        {
                            this.compare.push([key,country,state]);
                        }
                    }
                }
            },
            isSelected(key){
                return false;
            }
        },
        computed: {
            compare1(){
                if(this.compare.length > 0)
                {
                    return this.getComparisonData()[0];
                }
                return [];
            },
            compare2(){
                if(this.compare.length > 1)
                {
                    return this.getComparisonData()[1];
                }
                return [];
            },
            compare3(){
                if(this.compare.length > 2)
                {
                    return this.getComparisonData()[2];
                }
                return [];
            },
            countries(){
                var data = [];

                for(var x in this.raw_countries)
                {
                    var row = this.raw_countries[x];
                    data.push(row);
                }
                return data;
            },
            countries_sorted()
            {
                var sort = this.sort_stats;
                var data = _.cloneDeep(this.countries);
                return data.sort(function (a, b) {
                    if (sort.key == 'country')
                    {
                        if (sort.order == 'asc')
                            return a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1;
                        else
                            return a.name.toUpperCase() < b.name.toUpperCase() ? 1 : -1;
                    }

                    else if (sort.key == 'confirmed') {
                        if (sort.order == 'desc')
                            return a.total.c < b.total.c ? 1 : -1;
                        else
                            return a.total.c > b.total.c ? 1 : -1;
                    }

                    else if (sort.key == 'deaths') {
                        if (sort.order == 'desc')
                            return a.total.d < b.total.d ? 1 : -1;
                        else
                            return a.total.d > b.total.d ? 1 : -1;
                    }

                    else if (sort.key == 'recovered') {
                        if (sort.order == 'desc')
                            return a.total.r < b.total.r ? 1 : -1;
                        else
                            return a.total.r > b.total.r ? 1 : -1;
                    }
                });

            },
            loaded()
            {
                if (this.loading.countries && this.loading.states && this.loading.annotations && this.loading.global)
                {
                    return true;
                }
                return false;
            },
            stats()
            {
                return this.countries;
            },
            states()
            {
                return this.raw_state_data;
            },
            sorted_stats()
            {
                var sort = this.sort_stats;
                var data = _.cloneDeep(this.countries);
                return data.sort(function (a, b) {
                    if (sort.key == 'country')
                    {
                        if (sort.order == 'asc')
                            return a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1;
                        else
                            return a.name.toUpperCase() < b.name.toUpperCase() ? 1 : -1;
                    }

                    else if (sort.key == 'confirmed') {
                        if (sort.order == 'desc')
                            return a.total.c < b.total.c ? 1 : -1;
                        else
                            return a.total.c > b.total.c ? 1 : -1;
                    }

                    else if (sort.key == 'deaths') {
                        if (sort.order == 'desc')
                            return a.total.d < b.total.d ? 1 : -1;
                        else
                            return a.total.d > b.total.d ? 1 : -1;
                    }

                    else if (sort.key == 'recovered') {
                        if (sort.order == 'desc')
                            return a.total.r < b.total.r ? 1 : -1;
                        else
                            return a.total.r > b.total.r ? 1 : -1;
                    }
                });

            },
            selectedStats()
            {
                return this.stats[this.selectedCountry];
            },
            globalDaily()
            {
                var data = [];
                for(var x in this.globalDataset[0].daily)
                {
                    var row = this.globalDataset[0].daily[x];

                    data.push({
                        date: moment(row.date).format('YYYY-MM-DD'),
                        confirmed: row.confirmed,
                        confirmedDelta: this.globalDataset[0].delta[x].confirmed,
                        deaths: row.deaths,
                        deathsDelta: this.globalDataset[0].delta[x].deaths,
                        recovered: row.recovered,
                        recoveredDelta: this.globalDataset[0].delta[x].recovered,
                        active: parseInt(row.confirmed) - parseInt(row.deaths) - parseInt(row.recovered),
                        activeDelta: parseInt(this.globalDataset[0].delta[x].confirmed) - parseInt(this.globalDataset[0].delta[x].deaths) - parseInt(this.globalDataset[0].delta[x].recovered),
                        growthFactor: this.globalDataset[0].growthFactor[x],
                    });
                }
                return data;
            },
            daily()
            {
                if(this.compare.length > 1)
                    return this.comparisonDataset;
                else
                    return this.getDaily(this.selectedStats);
            },
            comparisonDataset()
            {
                return this.getComparisonData();
            },
            global(){
                var data = {},
                    last_update = '';

                data = this.raw_global;
                for(var x in this.countries)
                {
                    if(last_update.length === 0 || moment(this.countries[x].total.l).format('YYYY-MM-DD') > last_update)
                    {
                        data.last_update = moment(this.countries[x].total.l).format('YYYY-MM-DD HH:mm:ss');
                        last_update = moment(this.countries[x].total.l).format('YYYY-MM-DD');
                    }

                }
                data.name = {
                    full: 'Global',
                    country: 'Global',
                    state: false
                }
                data.total.active = data.total.confirmed - data.total.deaths - data.total.recovered;
                return data;
            },
            globalDataset()
            {
                var data = [],
                    daily = [];
                console.log('global data');
                console.log(this.global);

                for(var x in this.global.daily)
                {
                    var row = this.global.daily[x];
                    daily.push({
                        'date' : x,
                        'confirmed' : row.confirmed,
                        'deaths' : row.deaths,
                        'recovered' : row.recovered
                    });
                }


                data.push(this.assembleDataset(this.global,daily,this.global.name));

                console.log('global dataset');
                console.log(data);
                return data;
            }
        }
    }
</script>

<style scoped>

</style>
