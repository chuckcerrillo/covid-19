<template>
    <div class="h-full relative">
        <div class="absolute top-0 left-0 right-0 bottom-0 rounded bg-hoverslab" style="bottom:2rem;">
            <!-- comparison tab -->
            <div class="h-full relative" :class="selectedCompareTab != 'all' ? 'hidden' : ''">
                <simplebar class="h-full overflow-x-hidden">
                    <div v-if="compareLength == 0">
                        <div class="p-2 xl:p-4">
                            <h1 class="xl:text-3xl font-bold">Government Response Tracker</h1>
                            <div class="text-xs xl:text-base mt-2">
                                <p>These data are based on the <a class="text-orangeslab hover:text-blue-400 hover:underline" target="_blank" href="https://www.bsg.ox.ac.uk/research/research-projects/coronavirus-government-response-tracker">Coronavirus Government Response Tracker</a> by the University of Oxford.</p>
                                <blockquote class="italic m-2 ml-4 border-l-4 p-4 border-lightslab">
                                    <p class="py-2">Systematic information on which governments have taken which measures, and when, can help decision-makers and citizens understand the robustness of governmental responses in a consistent way, aiding efforts to fight the pandemic. The Oxford COVID-19 Government Response Tracker (OxCGRT) systematically collects information on several different common policy responses governments have taken, scores the stringency of such measures, and aggregates these scores into a common Stringency Index.</p>
                                    <p class="py-2">Data is collected from public sources by a team of over one hundred Oxford University students and staff from every part of the world.</p>
                                </blockquote>

                                <p class="mt-2 xl:mt-8">Select a country or state to begin comparing.</p>
                            </div>
                        </div>
                    </div>

                    <ComparePolicies v-else-if="!isMobile || (isMobile && selectedCompareTab === 'all')"
                                     :data="comparePolicies"
                    />
                </simplebar>
            </div>
            <div v-for="(row,key,index) in uniqueCountries" class="absolute inset-0 bg-hoverslab rounded p-2 xl:p-4 bottom-4.25 xl:bottom-0" v-if="selectedCompareTab.substr(0,row.country.length) === row.country" :key="index">
                <simplebar class="h-full z-0" v-if="!isMobile || (isMobile && selectedCompareTab.substr(0,row.country.length) === row.country)">
                    <div class="my-4">
                        <div class="xl:w-128 text-2xl xl:text-4xl font-bold">{{row.country}}</div>
                        <div v-if="getGovtResponse(row.country)" class="xl:text-6xl text-3xl font-bold">{{getGovtResponse(row.country).latest.si}}</div>
                        <div v-else class="xl:text-6xl text-3xl font-bold">N/A</div>
                        <div class="flex items-center">
                            <div class="text-lightlabel font-bold tracking-tight">stringency index</div>
                            <div class="xl:hidden ml-2 text-xs text-heading" @click="expanded = !expanded">
<!--                                <svg class="h-4 fill-current" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 28 28">-->
<!--                                    <g>-->
<!--                                        <path d="M14,1.86A12.14,12.14,0,1,0,26.14,14,12.15,12.15,0,0,0,14,1.86Zm0,23.28A11.14,11.14,0,1,1,25.14,14,11.16,11.16,0,0,1,14,25.14Z"/><path d="M14,11.51a.74.74,0,0,0-.46.14.43.43,0,0,0-.18.34V20.4a.48.48,0,0,0,.19.36.67.67,0,0,0,.45.16.72.72,0,0,0,.46-.16.46.46,0,0,0,.2-.36V12a.44.44,0,0,0-.19-.34A.79.79,0,0,0,14,11.51Z"/><path d="M14,7.08a.93.93,0,0,0-.64.24.77.77,0,0,0-.26.58.78.78,0,0,0,.26.58.89.89,0,0,0,.64.25.82.82,0,0,0,.61-.25.81.81,0,0,0,.25-.58.79.79,0,0,0-.25-.58A.85.85,0,0,0,14,7.08Z"/>-->
<!--                                    </g>-->
<!--                                </svg>-->
                                (info)
                            </div>
                        </div>
                        <div v-show="expanded" class="xl:hidden">
                            <div class="py-2 text-xs xl:text-sm">OxCGRT collects publicly available information on 17 indicators of government response. This information is collected by a team of over 100 volunteers from the Oxford community and is updated continuously.</div>
                            <div class="py-2 text-xs xl:text-sm">Eight of the policy indicators (C1-C8) record information on containment and closure policies, such as school closures and restrictions in movement. Four of the indicators (E1-E4) record economic policies such as income support to citizens or provision of foreign aid. And five indicators (H1-H5) record health system policies such as the Covid-19 testing regime or emergency investments into healthcare.</div>
                            <div class="py-2 text-xs xl:text-sm">For a full description of the data and how it is collected, check out the <a target="_blank" class="text-orangeslab hover:text-blue-400 hover:underline" href="https://www.bsg.ox.ac.uk/research/research-projects/coronavirus-government-response-tracker">University of Oxford's coronavirus government response tracker (OxCGRT)</a></div>
                            <div class="py-2 text-xs xl:text-sm">A higher position in the Stringency Index does not necessarily mean that a country's response is ‘better’ than others lower on the index.</div>
                        </div>
                        <div class="hidden xl:block">
                            <div class="py-2 text-xs xl:text-sm">OxCGRT collects publicly available information on 17 indicators of government response. This information is collected by a team of over 100 volunteers from the Oxford community and is updated continuously.</div>
                            <div class="py-2 text-xs xl:text-sm">Eight of the policy indicators (C1-C8) record information on containment and closure policies, such as school closures and restrictions in movement. Four of the indicators (E1-E4) record economic policies such as income support to citizens or provision of foreign aid. And five indicators (H1-H5) record health system policies such as the Covid-19 testing regime or emergency investments into healthcare.</div>
                            <div class="py-2 text-xs xl:text-sm">For a full description of the data and how it is collected, check out the <a target="_blank" class="text-orangeslab hover:text-blue-400 hover:underline" href="https://www.bsg.ox.ac.uk/research/research-projects/coronavirus-government-response-tracker">University of Oxford's coronavirus government response tracker (OxCGRT)</a></div>
                            <div class="py-2 text-xs xl:text-sm">A higher position in the Stringency Index does not necessarily mean that a country's response is ‘better’ than others lower on the index.</div>
                        </div>
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
            'database',
            'countries',
        ],
        data(){
            return {
                expanded: false,
            }
        },
        components:{
            ComparePolicies,
            simplebar,
            GovtResponse,
        },
        mounted()
        {
        },
        methods: {
            getGovtResponse(country)
            {
                if(country)
                {
                    if(this.database && this.database.processed && this.database.processed.oxford && this.database.processed.oxford[country])
                    {
                        return this.database.processed.oxford[country];
                    }
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
        computed:
        {
            isMobile() {
                if( screen.width <= 760 ) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    }
</script>

<style scoped>

</style>
