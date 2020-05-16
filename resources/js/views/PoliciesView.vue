<template>
    <div class="h-full relative">
        <div class="absolute top-0 left-0 right-0 bottom-0 rounded bg-hoverslab" style="bottom:2rem;">

            <div class="h-full m-4" :class="selectedCompareTab != 'all' ? 'hidden' : ''">

                <div v-if="compareLength == 0">
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

                <ComparePolicies v-else
                                 :data="comparePolicies"
                />

            </div>
            <div v-for="(row,key,index) in uniqueCountries" class="absolute m-4 inset-0 bg-hoverslab rounded p-4" v-if="selectedCompareTab.substr(0,row.country.length) === row.country" :key="index">
                <simplebar data-simplebar-auto-hide="false" class="top-0 right-0 bottom-0 left-0" style="position:absolute;">
                    <div class="my-4">
                        <div class="w-128 text-4xl font-bold">{{row.country}}</div>
                        <div v-if="getGovtResponse(row.country)" class="text-6xl font-bold">{{getGovtResponse(row.country).latest.si}}</div>
                        <div v-else class="text-6xl font-bold">N/A</div>
                        <div class="text-lightlabel font-bold tracking-tight">stringency index</div>
                        <div class="py-2 text-sm">OxCGRT collects publicly available information on 17 indicators of government response. This information is collected by a team of over 100 volunteers from the Oxford community and is updated continuously.</div>
                        <div class="py-2 text-sm">Eight of the policy indicators (C1-C8) record information on containment and closure policies, such as school closures and restrictions in movement. Four of the indicators (E1-E4) record economic policies such as income support to citizens or provision of foreign aid. And five indicators (H1-H5) record health system policies such as the Covid-19 testing regime or emergency investments into healthcare.</div>
                        <div class="py-2 text-sm">For a full description of the data and how it is collected, check out the <a target="_blank" class="text-orangeslab hover:text-blue-400 hover:underline" href="https://www.bsg.ox.ac.uk/research/research-projects/coronavirus-government-response-tracker">University of Oxford's coronavirus government response tracker (OxCGRT)</a></div>
                        <div class="py-2 text-sm">A higher position in the Stringency Index does not necessarily mean that a country's response is ‘better’ than others lower on the index.</div>
                    </div>
                    <div class="flex flex-wrap">
                        <GovtResponse
                            v-if="getGovtResponse(row.country)"
                            v-for="(policy,key,index) in getLatestGovtResponse(row.country)" v-once
                            :key="index"
                            :policy="policy" />
                    </div>
                </simplebar>
            </div>
        </div>
    </div>
</template>

<script>
    import ComparePolicies from "../components/ComparePolicies";
    import moment from 'moment';
    import simplebar from 'simplebar-vue';
    import GovtResponse from "../components/GovtResponse";

    export default {
        name: "PoliciesView",
        props: [
            'selectedCompareTab',
            'uniqueCountries',
            'comparePolicies',
            'compareLength',
            'database'
        ],
        components:{
            ComparePolicies,
            simplebar,
            GovtResponse,
        },
        methods: {
            getGovtResponse(country)
            {
                if(country)
                {
                    if(this.database.raw.raw_oxford && this.database.raw.raw_oxford.latest && this.database.raw.raw_oxford.latest[country])
                    {
                        return {
                            key: this.database.raw.raw_oxford.key,
                            latest: this.database.raw.raw_oxford.latest[country],
                            daily: this.getDailyGovtResponse(this.database.raw.raw_oxford.daily[country],'2020-01-01',moment().format('YYYY-MM-DD')),
                            // daily: this.database.raw.raw_oxford.daily[country],
                        }
                    }
                }
                return false;
            },
            getDailyGovtResponse(daily,start_date,end_date)
            {
                Date.prototype.addDays = function(days) {
                    var date = new Date(this.valueOf());
                    date.setDate(date.getDate() + days);
                    return date;
                }

                var data = [],
                    temp = {};

                var date1 = new Date(start_date);
                var date2 = new Date(end_date);
                date2.setDate(date2.getDate() - 1);
                var daysTotal = (date2.getTime() - date1.getTime()) / (1000*3600*24);
                var row = {};


                for(var x = 0; x<=daysTotal; x++)
                {
                    var new_date = moment(date1.addDays(x)).format('YYYY-MM-DD');
                    if(daily && daily[new_date])
                    {
                        row = {
                            date: new_date,
                            stringencyindex: false,
                            latest: {}
                        };

                        if(daily[new_date].si)
                        {
                            row.stringencyindex = daily[new_date].si;
                        }
                        for(var y in daily[new_date].policies)
                        {

                            row.latest[y] = {
                                value: daily[new_date].policies[y].v,
                                target: daily[new_date].policies[y].t,
                            }
                        }
                        data.push(_.clone(row));
                        temp = _.clone(row);
                    }
                    else
                    {
                        row = _.clone(temp);
                        row.date = new_date;
                        data.push(row);
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
                            if(key.targets && key.targets.length > 0)
                            {
                                target = 'Scope: ' + key.targets[row.t];
                            }
                            else
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
                        }
                        if(row.v.length == 0)
                        {
                            value = '';
                            target = '';
                        }
                        else if(key.type == 'lookup')
                        {
                            value = key.values[parseInt(row.v)];
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
                            notes: row.n,
                        })

                        data = data.sort(function (a, b) {
                            return a.id > b.id ? 1 : -1;
                        });
                    }
                }
                return data;
            },
        },

    }
</script>

<style scoped>

</style>
