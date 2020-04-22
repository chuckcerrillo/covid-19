thi<template>
    <div>
        <div v-if="!loaded">Loading data</div>
        <div v-else class="h-full overflow-hidden relative">
            <div class="relative h-full flex flex-1">
                <div class="flex flex-col">
<!--                    <div class="hidden m-4 absolute left-0 top-0 w-full overflow-hidden bg-lightslab rounded h-48 z-10 p-4">-->
<!--                        <div class="text-2xl tracking-tight font-bold">Global tally</div>-->
<!--                        <div class="text-xs mb-4">as of {{global.last_update}}</div>-->

<!--                        <div class="flex font-bold justify-between items-center">-->
<!--                            <div class="m-2">-->
<!--                                <div class="text-sm">Confirmed</div>-->
<!--                                <div class="text-3xl text-white">{{global.total.confirmed| numeralFormat}}</div>-->
<!--                            </div>-->
<!--                            <div class="m-2">-->
<!--                                <div class="text-sm">Deaths</div>-->
<!--                                <div class="text-3xl text-white">{{global.total.deaths| numeralFormat}}</div>-->
<!--                            </div>-->
<!--                            <div class="m-2">-->
<!--                                <div class="text-sm">Recovered</div>-->
<!--                                <div class="text-3xl text-white">{{global.total.recovered| numeralFormat}}</div>-->
<!--                            </div>-->
<!--                        </div>-->


<!--                    </div>-->
                    <div class="overflow-hidden bg-slab rounded m-4 flex flex-col items-start h-full p-4 relative">
                        <div class="">
                            <div class="tracking-tight font-bold">Countries and states <br>({{countries().length}} total)</div>
                            <div class="text-xs text-right">Sorting by {{sort_stats.key}} {{sort_stats.order}}</div>
                            <div class="flex font-bold py-2 text-xs items-center">
                                <div class="w-4 p-2 m-1 ml-0"></div>
                                <div class="w-32 cursor-pointer p-2 overflow-hidden" :class="sort_stats.key == 'country' ? 'bg-hoverslab' : '' " @click="toggleSort('country')">Country / Region</div>
                                <div class="w-20 cursor-pointer p-2 overflow-hidden" :class="sort_stats.key == 'confirmed' ? 'bg-hoverslab' : '' " @click="toggleSort('confirmed')">Confirmed</div>
                                <div class="w-20 cursor-pointer p-2 overflow-hidden" :class="sort_stats.key == 'deaths' ? 'bg-hoverslab' : '' " @click="toggleSort('deaths')">Deaths</div>
                                <div class="w-20 cursor-pointer p-2 overflow-hidden" :class="sort_stats.key == 'recovered' ? 'bg-hoverslab' : '' " @click="toggleSort('recovered')">Recovered</div>
                            </div>
                        </div>
                        <div class="w-full h-full relative">
                            <simplebar data-simplebar-auto-hide="false" class="top-0 right-0 bottom-0 left-0" style="position:absolute">
                                <CountryStateItem
                                    v-for="(data,key,index) in countries_sorted"
                                    v-on:selectCountry="selectCountry"
                                    :data="data"
                                    :country_key="key"
                                    :compare="compare"
                                />

                            </simplebar>
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
                <div class="m-4 ml-0 w-full overflow-hidden relative">
                    <div class="bg-slab rounded absolute top-0 right-0 bottom-0 left-0 flex-1 flex-col p-4">
                        <div class="absolute top-0 right-0 left-0 h-28 p-4">
                            <div @click="preload()" class="text-2xl font-bold mb-2">Compare statistics</div>
                            <div class="text-sm font-bold flex items-center">
                                <!--                                <div @click="ui.content.selectedTab = 'summary'" class="cursor-pointer text-lightslab mr-2 py-2 px-4 pl-0 border-b-4 hover:text-heading" :class="ui.content.selectedTab == 'summary' ? 'border-hoverslab text-heading' : 'border-slab'">Summary</div>-->
                                <!--                                <div @click="ui.content.selectedTab = 'timeline'" class="cursor-pointer text-lightslab mr-2 py-2 px-4 pl-0 border-b-4 hover:text-heading" :class="ui.content.selectedTab == 'timeline' ? 'border-hoverslab text-heading' : 'border-slab'">Timeline</div>-->
                                <router-link to="/comparison/response/" class="cursor-pointer text-lightslab mr-2 py-2 px-4 pl-0 border-b-4 hover:text-heading" :class="view == 'response' ? 'border-hoverslab text-heading' : 'border-slab'">Government Response</router-link>
                                <router-link to="/comparison/daily/" class="cursor-pointer text-lightslab mr-2 py-2 px-4 pl-0 border-b-4 hover:text-heading" :class="view == 'daily' ? 'border-hoverslab text-heading' : 'border-slab'">Daily breakdown</router-link>
                                <router-link to="/comparison/charts/" class="cursor-pointer text-lightslab mr-2 py-2 px-4 pl-0 border-b-4 hover:text-heading" :class="view == 'charts' ? 'border-hoverslab text-heading' : 'border-slab'">Charts</router-link>
                            </div>
                        </div>
                        <div class="absolute top-0 right-0 bottom-0 left-0 mt-28 p-4">
                            <div v-if="view != 'charts'" class="text-xs flex items-center justify-start absolute top-0 mt-4">
                                <div v-for="(row,key,index) in compare">
                                    <div @click="updateSelected(key)" class="w-48 cursor-pointer relative rounded rounded-b-none py-2 px-4 mx-1 whitespace-no-wrap overflow-hidden truncate ..." :class="selectedCompareTab == key ? 'bg-hoverslab' : 'bg-slab-primary'">
                                        {{getCompareLength() > 0 && row.state ? row.state + ' - ' : ''}}
                                        {{getCompareLength() > 0 ? row.country : '(none)'}}
                                        <div v-on:click.stop="removeCompare({country: row.country,state: row.state})" class="text-lightlabel text-xs absolute top-0 right-0 m-2 px-2 pb-1 rounded hover:text-heading hover:bg-lightlabel">x</div>
                                    </div>
                                </div>
                            </div>
                            <div class="h-full relative mt-8" v-show="view == 'response'">
                                <div v-if="getCompareLength() == 0">
                                    <h1 class="text-3xl font-bold">Government Response Tracker</h1>
                                    <div>
                                        <p>These data are based on the <a class="text-orangeslab hover:text-blue-400 hover:underline" target="_blank" href="https://www.bsg.ox.ac.uk/research/research-projects/coronavirus-government-response-tracker">Coronavirus Government Response Tracker</a> by the University of Oxford.</p>
                                        <blockquote class="italic m-2 ml-4 border-l-4 p-4 border-lightslab">
                                            <p class="py-2">Systematic information on which governments have taken which measures, and when, can help decision-makers and citizens understand the robustness of governmental responses in a consistent way, aiding efforts to fight the pandemic. The Oxford COVID-19 Government Response Tracker (OxCGRT) systematically collects information on several different common policy responses governments have taken, scores the stringency of such measures, and aggregates these scores into a common Stringency Index.</p>
                                            <p class="py-2">Data is collected from public sources by a team of over one hundred Oxford University students and staff from every part of the world.</p>
                                        </blockquote>

                                        <p class="mt-8">Select a country or state to begin comparing.</p>
                                    </div>
                                </div>
                                <div v-else class="absolute top-0 left-0 right-0 bottom-0 rounded bg-hoverslab" style="bottom: 32px;">
                                    <simplebar data-simplebar-auto-hide="false" class="top-0 right-0 bottom-0 left-0 m-4" style="position:absolute">
                                        <div v-for="(row,key,index) in getUniqueCountriesCompare()" class="bg-hoverslab rounded p-4" v-show="selectedCompareTab.substr(0,row.country.length) == row.country">
                                            <div class="my-4">
                                                <div class="w-128 text-4xl font-bold">{{row.country}}</div>
                                                <div v-if="getGovtResponse(row.country)" class="text-6xl font-bold">{{getGovtResponse(row.country).latest.si}}</div>
                                                <div v-else class="text-6xl font-bold">N/A</div>
                                                <div class="text-lightlabel font-bold tracking-tight">stringency index</div>
                                                <div class="py-2 text-sm">The stringency index is based on publicly available information on 13 indicators of government response. Nine of the indicators (S1–S7, S12 and S13) take policies such as school closures, travel bans, etc, and are recorded on an ordinal scale; the others (S8–S11) are financial indicators such as fiscal or monetary measures.</div>
                                                <div class="py-2 text-sm">For a full description of the data and how it is collected, check out the <a target="_blank" class="text-orangeslab hover:text-blue-400 hover:underline" href="https://www.bsg.ox.ac.uk/research/research-projects/coronavirus-government-response-tracker">University of Oxford's coronavirus government response tracker (OxCGRT)</a></div>
                                                <div class="py-2 text-sm">A higher position in the Stringency Index does not necessarily mean that a country's response is ‘better’ than others lower on the index.</div>
                                            </div>
                                            <div class="flex flex-wrap">
                                                <div v-if="getGovtResponse(row.country)" v-for="(policy,key,index) in getLatestGovtResponse(row.country)"
                                                     class="py-1 w-1/3">
                                                    <div class="flex items-start justify-start rounded bg-slab-primary mr-4 h-32">
                                                        <div class="w-72 h-full p-2 pb-4">
                                                            <div class="font-bold"><span class="uppercase">{{policy.id}}</span> - {{policy.name}}</div>
                                                            <div class="text-lightlabel text-xs">{{policy.description}}</div>
                                                        </div>
                                                        <div class="p-2 w-full">
                                                            <div v-if="policy.value > 1000">US${{policy.value | numeralFormat}}</div>
                                                            <div v-else-if="policy.id == 's9'">{{policy.value}}%</div>
                                                            <div v-else class="">{{policy.value}}</div>
                                                            <div class="text-xs">{{policy.target}}</div>
                                                            <div class="text-xs">since {{policy.since}}</div>
                                                            <div v-if="policy.help.length == 1" class="text-lightlabel text-xs">{{policy.help[0]}}</div>
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </simplebar>
                                </div>
                            </div>
                            <!--                                <div class="" v-show="ui.content.selectedTab == 'timeline'">Timeline</div>-->
                            <div class="h-full relative mt-8" v-show="view == 'daily'">
                                <div v-if="getCompareLength() == 0">
                                    Select up to {{options.compare_limit}} countries or states to begin comparing.
                                </div>
                                <div v-else class="absolute top-0 right-0 bottom-0 left-0 bg-hoverslab rounded" style="bottom: 32px;">
                                    <div v-if="getCompareLength() > 0" v-for="(row,key,index) in compare" class="">
                                        <div class="h-full" :class="selectedCompareTab != key ? 'hidden' : ''">
                                            <Daily
                                                v-on:removeCompare="removeCompare"
                                                :data="getComparisonData()[index]"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="h-full relative flex flex-1 pt-8" v-show="view == 'charts'">
                                <StatsChart :data="getComparisonData()" :full="true" />
                            </div>
                        </div>
                    </div>

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
        name: "Comparison",
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
        props: [
            'database',
        ],
        created(){
            this.compare = this.database.processed.compare;
        },
        data()
        {
            return {
                'sort_stats' : {
                    'key' : 'confirmed',
                    'order' : 'desc',
                },
                'global_options' : {
                    'table' : 'daily',
                },
                'options' : {
                    'compare_limit' : 5,
                },
                'comparison' : [],

                'show_countries': true,
                'ui' : {
                    'content' : {
                        'selectedTab' : 'daily'
                    }
                }
            }
        },
        methods:{
            getUniqueCountriesCompare()
            {
                var countries = [],
                    data = [];
                for(var x in this.compare)
                {
                    if(countries.indexOf(this.compare[x].country) === -1)
                    {
                        countries.push(this.compare[x].country);
                        data.push(this.compare[x]);
                    }
                }
                return data;
            },
            getLatestGovtResponse(country)
            {
                var response = this.getGovtResponse(country);
                var data = [];
                if(response && response.latest && response.latest.policies)
                {
                    for(var x in response.latest.policies)
                    {

                        var row = response.latest.policies[x];
                        var key = response.key[x];
                        var target = '';
                        var value = row.value;
                        if(key && key.values)
                        {
                            var help = key.values;
                        }
                        else
                        {
                            var help = [];
                        }

                        if(key.hasTarget)
                        {
                            if(row.t == 1)
                            {
                                target = 'Scope: Targeted';
                            }
                            else
                            {
                                target = 'Scope: General';
                            }
                        }
                        if(row.v.length == 0)
                        {
                            value = '';
                            target = '';
                        }
                        else if(key.type == 'lookup')
                        {
                            value = key.values[row.v];
                        }
                        else
                        {
                            value = row.v;
                        }

                        data.push({
                            id: x,
                            name: key.name,
                            description: key.description,
                            value: value,
                            target: target,
                            since: row.s,
                            help: help,
                        })

                        data = data.sort(function (a, b) {

                            return parseInt(a.id.substr(1)) > parseInt(b.id.substr(1)) ? 1 : -1;
                        });
                    }
                }
                return data;
            },
            getGovtResponse(country)
            {
                if(country)
                {
                    if(this.database.raw.raw_oxford && this.database.raw.raw_oxford.latest && this.database.raw.raw_oxford.latest[country])
                    {
                        return {
                            key: this.database.raw.raw_oxford.key,
                            latest: this.database.raw.raw_oxford.latest[country],
                            daily: this.database.raw.raw_oxford.daily[country],
                        }
                    }
                }
                return false;
            },
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
            getProcessedData(source)
            {
                var compareName = this.getCompareName(source).full;
                if(this.database.processed.dataset[compareName])
                {
                    return this.database.processed.dataset[compareName];
                }
                return false;
            },
            preload()
            {
                for(var x in this.database.raw.raw_countries)
                {
                    var country = x;
                    var state = false;
                    this.assembleDataset([this.getCountryId(country), country, state]);
                }
            },
            assembleDataset(source,daily,name)
            {
                // Check if this source has already been processed
                var row = this.getProcessedData(source);
                if (row)
                {
                    // If it is already processed, let's use it
                    return row;
                }

                const arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length;

                var population = 0,
                    lat, long;

                if(this.database.raw.raw_countries && this.database.raw.raw_countries[source.country])
                {
                    if(source.state)
                    {
                        if(this.database.raw.raw_countries[source.country]['states'][source.state])
                        {
                            lat = this.database.raw.raw_countries[source.country]['states'][source.state].lat;
                            long = this.database.raw.raw_countries[source.country]['states'][source.state].long;
                            population = this.database.raw.raw_countries[source.country]['states'][source.state].population;
                        }
                    }
                    else
                    {
                        lat = this.database.raw.raw_countries[source.country].lat;
                        long = this.database.raw.raw_countries[source.country].long;
                        population = this.database.raw.raw_countries[source.country].population;
                    }
                }


                row = {
                    name: name ? name : this.getCompareName(source),
                    daily: (daily ? daily : this.getDaily(source)),
                    lat: lat,
                    long: long,
                    population: population,
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
                        confirmedpc: (parseInt(row.daily[y].confirmed) - parseInt(previous.confirmed)) / parseInt(previous.confirmed),
                        confirmedcap: parseInt(row.daily[y].confirmed) / population * 1000000,
                        deaths: parseInt(row.daily[y].deaths) - parseInt(previous.deaths),
                        deathspc: (parseInt(row.daily[y].deaths) - parseInt(previous.deaths)) / parseInt(previous.deaths),
                        deathscap: parseInt(row.daily[y].deaths) / population * 1000000,
                        recovered: parseInt(row.daily[y].recovered) - parseInt(previous.recovered),
                        recoveredpc: (parseInt(row.daily[y].recovered) - parseInt(previous.recovered)) / parseInt(previous.recovered),
                        recoveredcap: parseInt(row.daily[y].recovered) / population * 1000000,
                        active: parseInt(row.daily[y].confirmed) - parseInt(row.daily[y].deaths) - parseInt(row.daily[y].recovered),
                        activeDelta: (parseInt(row.daily[y].confirmed) - parseInt(row.daily[y].deaths) - parseInt(row.daily[y].recovered)) - (parseInt(previous.confirmed) - parseInt(previous.deaths) - parseInt(previous.recovered)),
                        activepoppc: (parseInt(row.daily[y].confirmed) - (isNaN(row.daily[y].deaths) ? 0 : parseInt(row.daily[y].deaths)) - (isNaN(row.daily[y].recovered) ? 0 : parseInt(row.daily[y].recovered))) / population,
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

                if(this.database.raw.raw_annotations)
                {
                    if (this.database.raw.raw_annotations['All'] && this.database.raw.raw_annotations['All'].length > 0)
                    {
                        row.annotations = row.annotations.concat(this.database.raw.raw_annotations['All']);
                    }

                    if (this.database.raw.raw_annotations[row.name.country])
                    {
                        row.annotations = row.annotations.concat(this.database.raw.raw_annotations[row.name.country]);
                    }
                }
                var compareName = this.getCompareName(source).full;
                this.$emit('saveProcessedData',row,compareName);
                return row;
            },
            getComparisonData()
            {
                var data = [],
                    row = [];


                for(var x in this.database.processed.compare)
                {
                    if(this.database.processed.compare[x])
                    {
                        row = this.assembleDataset(this.database.processed.compare[x])
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
                    if(this.compare[x].country == item.country)
                    {

                        if(this.compare[x].state == item.state)
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
                    var key = item.country + item.state;
                    delete this.compare[found];
                    if(key == this.selectedCompareTab)
                    {
                        this.updateSelected(this.getLastCompareItem());
                    }
                }

                this.$emit('updateCompare',this.compare);
            },
            getDaily(compare)
            {
                if(compare && compare.country)
                {
                    if(!compare.state)
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
                var country = item.country,
                    state = item.state,
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
                var country = item.country,
                    data = [],
                    empty = true;
                if(this.raw_countries[country].daily)
                {
                    for(var x in this.raw_countries[country].daily)
                    {

                        var row = this.raw_countries[country].daily[x];
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
                if(item && item.country)
                {
                    var country = item.country;
                    if(item.state)
                    {
                        return {
                            full: item.state + ' - ' + country,
                            country: country,
                            state: item.state,
                            country_id: false,
                        };
                    }
                    else
                    {
                        return {
                            full: country,
                            country: country,
                            state: '',
                            country_id: false,
                        }
                    }
                }
                return '';
            },
            getFirstCompareItem()
            {
                for (var x in this.compare)
                {
                    if(this.compare[x])
                        return x;
                }
                return false;
            },
            getLastCompareItem()
            {
                var last = false;
                var compare = _.cloneDeep(this.compare);
                for (var x in compare)
                {
                    if(compare[x])
                        last = x;
                }
                return last;
            },
            getCompareLength()
            {
                var count = 0;
                for(var x in this.compare)
                {
                    if(this.compare[x])
                        count++;
                }

                return count;
            },
            selectCountry(country,state){
                if (!key)
                {
                    var key = this.getCountryId(country);
                }
                var key = this.getCountryId(country);

                var find = this.findCompare({country: country,state: state});
                if(find !== false)
                {
                    // Remove from queue
                    this.removeCompare({country:country,state:state});
                }
                else
                {
                    // Trim current queue
                    if(this.getCompareLength() >= this.options.compare_limit)
                    {
                        this.removeCompare(this.compare[this.getFirstCompareItem()]);
                    }

                    // Add new item
                    if(this.getCompareLength() < this.options.compare_limit)
                    {
                        this.compare[country+state] = {country: country, state: state};
                    }

                    this.updateSelected(this.getLastCompareItem());
                }
                this.$emit('updateCompare',this.compare);
            },
            isSelected(key){
                return false;
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
            updateSelected(key)
            {
                this.$emit('updateSelected',key);
            }
        },
        computed: {
            selectedCompareTab()
            {
                return this.database.processed.selectedCompareTab;
            },
            compare: {
                get: function(){
                    return this.database.processed.compare;
                },
                set: function(value)
                {
                    return value;
                }
            },
            view()
            {
                if(this.$route.name == 'comparisonDaily')
                {
                    this.ui.content.selectedTab = 'daily';
                }
                else if(this.$route.name == 'comparisonCharts')
                {
                    this.ui.content.selectedTab = 'charts';
                }
                else if(this.$route.name == 'comparisonResponse')
                {
                    this.ui.content.selectedTab = 'response';
                }
                else
                {
                    this.ui.content.selectedTab = 'daily';
                }
                return this.ui.content.selectedTab;
            },
            loading()
            {
                if(this.database && this.database.loading)
                    return this.database.loading;
                else
                    return {
                        'countries' : false,
                        'states' : false,
                        'annotations' : false,
                        'global' : false,
                    };
            },
            raw_global()
            {
                return this.database.raw.raw_global;
            },
            raw_countries()
            {
                return this.database.raw.raw_countries;
            },
            raw_state_data()
            {
                return this.database.raw.raw_state_data;
            },
            raw_stats()
            {
                return this.database.raw.raw_stats;
            },
            compareLength()
            {
                return this.compareLength();
            },
            countries_sorted()
            {
                var sort = this.sort_stats;
                var data = _.cloneDeep(this.countries());
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
                if (this.database && this.database.loading && this.database.loading.countries && this.database.loading.states && this.database.loading.annotations && this.database.loading.global && this.database.loading.oxford)
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
        }
    }
</script>

<style scoped>

</style>
