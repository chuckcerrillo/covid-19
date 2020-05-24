<template>
    <div class="h-full">
        <div class="m-2 xl:m-4 py-2 pb-4 px-4 bg-slab-primary rounded">
            <span class="font-bold">Select date</span>
            <v-date-picker
                v-model="date"
                :min-date="options.date.min"
                :max-date="options.date.max"
                :masks="{ data: ['YYYY-MM-DD', 'YYYY/MM/DD'],input: ['YYYY-MM-DD', 'YYYY/MM/DD'] }"
                :popover="{ placement: 'bottom', visibility: 'click' }">
                <button class="p-2 hover:bg-lightlabel text-white rounded focus:outline-none">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        class="w-4 h-4 fill-current">
                        <path d="M1 4c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4zm2 2v12h14V6H3zm2-6h2v2H5V0zm8 0h2v2h-2V0zM5 9h2v2H5V9zm0 4h2v2H5v-2zm4-4h2v2H9V9zm0 4h2v2H9v-2zm4-4h2v2h-2V9zm0 4h2v2h-2v-2z" />
                    </svg>
                </button>
            </v-date-picker> {{moment(date).format('YYYY-MM-DD')}}
            <vue-slider v-model="date" :data="dateSliderRange" :lazy="true" :adsorb="true" />
        </div>
<!--        <div class="absolute top-9 right-0 w-128 text-xs bg-hoverslab z-20">{{comparison}}</div>-->
        <div class="absolute top-5.5 left-0 right-0 bottom-4.25 xl:bottom-0 m-2 xl:m-4" style="position:absolute; top: 5.5rem">
            <simplebar data-simplebar-auto-hide="false" class="w-full h-full">
                <div class="flex justify-start rounded-t z-10 relative bg-slab-primary" :class="'min-w-' + (comparison.length*32) + ' xl:min-w-' + (comparison.length*64+36)">
                    <div class="hidden xl:block bg-slab-primary border-lightslab w-36 text-xs font-bold flex-shrink-0">
                        <div class="px-4 py-2 h-20"></div>
                        <div class="px-4 py-2">Stringency Index</div>
                    </div>
                    <div
                        class="border-l flex-shrink-0
                        border-lightslab w-32 xl:w-64"
                        v-if="row"
                        v-for="(row, key, index) in comparison"
                        :key="key"
                    >
                        <div class="w-full">
                            <div class="px-4 py-2 text-sm xl:text-2xl xl:h-12 bg-slab-primary">
                                <div class="truncate ... font-bold">{{row.name}}</div>
                            </div>
                            <div class="px-4 py-2 xl:h-24 text-2xl xl:text-5xl font-bold">
                                <div v-if="!isNaN(row.stringencyindex)">{{row.stringencyindex | numeralFormat('0.00')}}</div>
                                <div v-else>N/A</div>
                            </div>
                        </div>
                     </div>
                    <div class="hidden xl:block px-4 py-2 xl:h-36 border-l border-lightslab"></div>
                </div>

                <simplebar data-simplebar-auto-hide="false" class="inner-scrollbar bg-slab rounded absolute inset-x-0 bottom-0 top-5.625 xl:top-9" style="position: absolute;" :class="'min-w-' + (comparison.length*32) + ' xl:min-w-' + (comparison.length*64+36)">
                    <div class="flex justify-start rounded-t z-10 relative bg-slab">
                        <div class="hidden xl:block bg-slab-primary justify-start items-end border-b border-lightslab w-36 text-xs font-bold flex-shrink-0">
                            <div class="px-4 py-2 h-16 bg-darkslab border-b border-slab">Containment and closure</div>
                            <div class="px-4 py-2 h-24 border-b border-slab">C1 - Schools</div>
                            <div class="px-4 py-2 h-24 border-b border-slab">C2 - Workplaces</div>
                            <div class="px-4 py-2 h-24 border-b border-slab">C3 - Public events</div>
                            <div class="px-4 py-2 h-24 border-b border-slab">C4 - Restrictions on gatherings</div>
                            <div class="px-4 py-2 h-28 border-b border-slab">C5 - Public transport</div>
                            <div class="px-4 py-2 h-28 border-b border-slab">C6 - Stay at home</div>
                            <div class="px-4 py-2 h-28 border-b border-slab">C7 - Internal movements</div>
                            <div class="px-4 py-2 h-16 border-b border-slab">C8 - International travel</div>
                            <div class="px-4 py-2 h-16 bg-darkslab border-b border-slab">Economic response</div>
                            <div class="px-4 py-2 h-28 border-b border-slab">E1 - Income support</div>
                            <div class="px-4 py-2 h-20 border-b border-slab">E2 - Debt/contract relief</div>
                            <div class="px-4 py-2 h-20 border-b border-slab">E3 - Fiscal measures</div>
                            <div class="px-4 py-2 h-20 border-b border-slab">E4 - International support</div>
                            <div class="px-4 py-2 h-16 bg-darkslab border-b border-slab">Health systems</div>
                            <div class="px-4 py-2 h-24 border-b border-slab">H1 - Public information campaign</div>
                            <div class="px-4 py-2 h-32 border-b border-slab">H2 - Testing policy</div>
                            <div class="px-4 py-2 h-20 border-b border-slab">H3 - Contact tracing</div>
                            <div class="px-4 py-2 h-20 border-b border-slab">H4 - Emergency healthcare investment</div>
                            <div class="px-4 py-2 h-20 border-b border-slab">H5 - COVID-19 vaccine investment</div>
                            <div class="px-4 py-2 h-16 bg-darkslab border-b border-slab">Miscellaneous</div>
                            <div class="px-4 py-2 h-24 border-b border-slab">M1 - Other responses</div>
                        </div>
                        <div class="flex-shrink-0 flex">
                            <div
                                v-if="row"
                                class="border-l border-b border-lightslab flex-shrink-0 w-32 xl:w-64"
                                v-for="(row, key, index) in comparison"
                                :key="index"
                            >
                                <div class=""
                                     :class="index % 2 == 1 ? 'bg-slab-primary' : ''">

                                    <div class="w-full">

                                        <div class="px-4 py-2 xl:h-16 bg-darkslab border-b border-lightslab">
                                            <div class="xl:hidden text-xs">Containment and closure</div>
                                        </div>

                                        <div class="px-4 py-2 h-24 border-b border-lightslab">
                                            <div class="xl:hidden text-xss text-lightlabel xl:text-xs font-bold">C1 - Schools</div>
<!--                                            <div class="text-xss">{{row.latest}}</div>-->
                                            <div v-if="row.latest.C1.value && isMobile" class="text-xs">{{row.latest.C1.value}}</div>
                                            <div v-else-if="row.latest.C1.value && row.latest.C1.value.length > 60" class="text-xs">{{row.latest.C1.value}}</div>
                                            <div v-else-if="row.latest.C1.value && row.latest.C1.value.length > 30" class="text-sm">{{row.latest.C1.value}}</div>
                                            <div v-else-if="row.latest.C1.value && row.latest.C1.value">{{row.latest.C1.value}}</div>
                                            <div v-else>N/A</div>
                                            <div v-if="row.latest.C1.target" class="text-xs text-lightlabel">({{row.latest.C1.target}})</div>
                                        </div>

                                        <div class="px-4 py-2 h-36 xl:h-24 border-b border-lightslab">
                                            <div class="xl:hidden text-xss text-lightlabel xl:text-xs font-bold">C2 - Workplaces</div>
                                            <div v-if="row.latest.C2.value && isMobile" class="text-xs">{{row.latest.C2.value}}</div>
                                            <div v-else-if="row.latest.C2.value && row.latest.C2.value.length > 60" class="text-xs">{{row.latest.C2.value}}</div>
                                            <div v-else-if="row.latest.C2.value && row.latest.C2.value.length > 30" class="text-sm">{{row.latest.C2.value}}</div>
                                            <div v-else-if="row.latest.C2.value && row.latest.C2.value">{{row.latest.C2.value}}</div>
                                            <div v-else>N/A</div>
                                            <div v-if="row.latest.C2.target" class="text-xs text-lightlabel">({{row.latest.C2.target}})</div>
                                        </div>

                                        <div class="px-4 py-2 h-24 border-b border-lightslab">
                                            <div class="xl:hidden text-xss text-lightlabel xl:text-xs font-bold">C3 - Public events</div>
                                            <div v-if="row.latest.C3.value && isMobile" class="text-xs">{{row.latest.C3.value}}</div>
                                            <div v-else-if="row.latest.C3.value && row.latest.C3.value.length > 60" class="text-xs">{{row.latest.C3.value}}</div>
                                            <div v-else-if="row.latest.C3.value && row.latest.C3.value.length > 30" class="text-sm">{{row.latest.C3.value}}</div>
                                            <div v-else-if="row.latest.C3.value && row.latest.C3.value">{{row.latest.C3.value}}</div>
                                            <div v-else>N/A</div>
                                            <div v-if="row.latest.C3.target" class="text-xs text-lightlabel">({{row.latest.C3.target}})</div>
                                        </div>

                                        <div class="px-4 py-2 h-32 xl:h-24 border-b border-lightslab">
                                            <div class="xl:hidden text-xss text-lightlabel xl:text-xs font-bold">C4 - Restrictions on gatherings</div>
                                            <div v-if="row.latest.C4.value && isMobile" class="text-xs">{{row.latest.C4.value}}</div>
                                            <div v-else-if="row.latest.C4.value && row.latest.C4.value.length > 60" class="text-xs">{{row.latest.C4.value}}</div>
                                            <div v-else-if="row.latest.C4.value && row.latest.C4.value.length > 30" class="text-sm">{{row.latest.C4.value}}</div>
                                            <div v-else-if="row.latest.C4.value && row.latest.C4.value">{{row.latest.C4.value}}</div>
                                            <div v-else>N/A</div>
                                            <div v-if="row.latest.C4.target" class="text-xs text-lightlabel">({{row.latest.C4.target}})</div>
                                        </div>

                                        <div class="px-4 py-2 h-48 xl:h-28 border-b border-lightslab">
                                            <div class="xl:hidden text-xss text-lightlabel xl:text-xs font-bold">C5 - Public transport</div>
                                            <div v-if="row.latest.C5.value && isMobile" class="text-xs">{{row.latest.C5.value}}</div>
                                            <div v-else-if="row.latest.C5.value && row.latest.C5.value.length > 60" class="text-xs">{{row.latest.C5.value}}</div>
                                            <div v-else-if="row.latest.C5.value && row.latest.C5.value.length > 30" class="text-sm">{{row.latest.C5.value}}</div>
                                            <div v-else-if="row.latest.C5.value && row.latest.C5.value">{{row.latest.C5.value}}</div>
                                            <div v-else>N/A</div>
                                            <div v-if="row.latest.C5.target" class="text-xs text-lightlabel">({{row.latest.C5.target}})</div>
                                        </div>

                                        <div class="px-4 py-2 h-60 xl:h-28 border-b border-lightslab">
                                            <div class="xl:hidden text-xss text-lightlabel xl:text-xs font-bold">C6 - Stay at home</div>
                                            <div v-if="row.latest.C6.value && isMobile" class="text-xs">{{row.latest.C6.value}}</div>
                                            <div v-else-if="row.latest.C6.value && row.latest.C6.value.length > 60" class="text-xs">{{row.latest.C6.value}}</div>
                                            <div v-else-if="row.latest.C6.value && row.latest.C6.value.length > 30" class="text-sm">{{row.latest.C6.value}}</div>
                                            <div v-else-if="row.latest.C6.value && row.latest.C6.value">{{row.latest.C6.value}}</div>
                                            <div v-else>N/A</div>
                                            <div v-if="row.latest.C6.target" class="text-xs text-lightlabel">({{row.latest.C6.target}})</div>
                                        </div>

                                        <div class="px-4 py-2 h-36 xl:h-28 border-b border-lightslab">
                                            <div class="xl:hidden text-xss text-lightlabel xl:text-xs font-bold">C7 - Internal movements</div>
                                            <div v-if="row.latest.C7.value && isMobile" class="text-xs">{{row.latest.C7.value}}</div>
                                            <div v-else-if="row.latest.C7.value && row.latest.C7.value.length > 60" class="text-xs">{{row.latest.C7.value}}</div>
                                            <div v-else-if="row.latest.C7.value && row.latest.C7.value.length > 30" class="text-sm">{{row.latest.C7.value}}</div>
                                            <div v-else-if="row.latest.C7.value && row.latest.C7.value">{{row.latest.C7.value}}</div>
                                            <div v-else>N/A</div>
                                            <div v-if="row.latest.C7.target" class="text-xs text-lightlabel">({{row.latest.C7.target}})</div>
                                        </div>

                                        <div class="px-4 py-2 h-24 xl:h-16 border-b border-lightslab">
                                            <div class="xl:hidden text-xss text-lightlabel xl:text-xs font-bold">C8 - International travel</div>
                                            <div v-if="row.latest.C8.value && isMobile" class="text-xs">{{row.latest.C8.value}}</div>
                                            <div v-else-if="row.latest.C8.value && row.latest.C8.value.length > 60" class="text-xs">{{row.latest.C8.value}}</div>
                                            <div v-else-if="row.latest.C8.value && row.latest.C8.value.length > 30" class="text-sm">{{row.latest.C8.value}}</div>
                                            <div v-else-if="row.latest.C8.value && row.latest.C8.value">{{row.latest.C8.value}}</div>
                                            <div v-else>N/A</div>
                                        </div>

                                        <div class="px-4 py-2 xl:h-16 bg-darkslab border-b border-lightslab">
                                            <div class="xl:hidden text-xs">Economic response</div>
                                        </div>

                                        <div class="px-4 py-2 h-56 xl:h-28 border-b border-lightslab">
                                            <div class="xl:hidden text-xss text-lightlabel xl:text-xs font-bold">E1 - Income support</div>
                                            <div v-if="row.latest.E1.value && isMobile" class="text-xs">{{row.latest.E1.value}}</div>
                                            <div v-else-if="row.latest.E1.value && row.latest.E1.value.length > 60" class="text-xs">{{row.latest.E1.value}}</div>
                                            <div v-else-if="row.latest.E1.value && row.latest.E1.value.length > 30" class="text-sm">{{row.latest.E1.value}}</div>
                                            <div v-else-if="row.latest.E1.value && row.latest.E1.value">{{row.latest.E1.value}}</div>
                                            <div v-else>N/A</div>
                                            <div v-if="row.latest.E1.target" class="text-xs text-lightlabel">({{row.latest.E1.target}})</div>
                                        </div>

                                        <div class="px-4 py-2 h-28 xl:h-20 border-b border-lightslab">
                                            <div class="xl:hidden text-xss text-lightlabel xl:text-xs font-bold">E2 - Debt / contract relief</div>
                                            <div v-if="row.latest.E2.value && isMobile" class="text-xs">{{row.latest.E2.value}}</div>
                                            <div v-else-if="row.latest.E2.value && row.latest.E2.value.length > 60" class="text-xs">{{row.latest.E2.value}}</div>
                                            <div v-else-if="row.latest.E2.value && row.latest.E2.value.length > 30" class="text-sm">{{row.latest.E2.value}}</div>
                                            <div v-else-if="row.latest.E2.value && row.latest.E2.value">{{row.latest.E2.value}}</div>
                                            <div v-else>N/A</div>
                                        </div>

                                        <div class="px-4 py-2 h-20 border-b border-lightslab">
                                            <div class="xl:hidden text-xss text-lightlabel xl:text-xs font-bold">E3 - Fiscal measures</div>
                                            <div v-if="isMobile && row.latest.E3.value >= 1000000000000">US${{row.latest.E3.value/1000000000000 | numeralFormat('0,000.00')}}T</div>
                                            <div v-else-if="isMobile && row.latest.E3.value >= 1000000000">US${{row.latest.E3.value/1000000000 | numeralFormat('0,000.00')}}B</div>
                                            <div v-else-if="isMobile && row.latest.E3.value >= 1000000">US${{row.latest.E3.value/1000000 | numeralFormat('0,000.00')}}M</div>
                                            <div v-else-if="isMobile && row.latest.E3.value >= 1000">US${{row.latest.E3.value/1000 | numeralFormat('0,000.00')}}K</div>
                                            <div v-else-if="row.latest.E3.value">US${{row.latest.E3.value | numeralFormat('0,000.00')}}</div>
                                            <div v-else>N/A</div>
                                        </div>

                                        <div class="px-4 py-2 h-20 border-b border-lightslab">
                                            <div class="xl:hidden text-xss text-lightlabel xl:text-xs font-bold">E4 - International support</div>
                                            <div v-if="isMobile && row.latest.E4.value >= 1000000000000">US${{row.latest.E4.value/1000000000000 | numeralFormat('0,000.00')}}T</div>
                                            <div v-else-if="isMobile && row.latest.E4.value >= 1000000000">US${{row.latest.E4.value/1000000000 | numeralFormat('0,000.00')}}B</div>
                                            <div v-else-if="isMobile && row.latest.E4.value >= 1000000">US${{row.latest.E4.value/1000000 | numeralFormat('0,000.00')}}M</div>
                                            <div v-else-if="isMobile && row.latest.E4.value >= 1000">US${{row.latest.E4.value/1000 | numeralFormat('0,000.00')}}K</div>
                                            <div v-else-if="row.latest.E4.value">US${{row.latest.E4.value | numeralFormat('0,000.00')}}</div>
                                            <div v-else>N/A</div>
                                        </div>

                                        <div class="px-4 py-2 xl:h-16 bg-darkslab border-b border-lightslab">
                                            <div class="xl:hidden text-xs">Health systems</div>
                                        </div>

                                        <div class="px-4 py-2 h-48 xl:h-24 border-b border-lightslab">
                                            <div class="xl:hidden text-xss text-lightlabel xl:text-xs font-bold">H1 - Public information campaign</div>
                                            <div v-if="row.latest.H1.value && isMobile" class="text-xs">{{row.latest.H1.value}}</div>
                                            <div v-else-if="row.latest.H1.value && row.latest.H1.value.length > 60" class="text-xs">{{row.latest.H1.value}}</div>
                                            <div v-else-if="row.latest.H1.value && row.latest.H1.value.length > 30" class="text-sm">{{row.latest.H1.value}}</div>
                                            <div v-else-if="row.latest.H1.value && row.latest.H1.value">{{row.latest.H1.value}}</div>
                                            <div v-else>N/A</div>
                                            <div v-if="row.latest.H1.target" class="text-xs text-lightlabel">({{row.latest.H1.target}})</div>
                                        </div>

                                        <div class="px-4 py-2 h-40 xl:h-32 border-b border-lightslab">
                                            <div class="xl:hidden text-xss text-lightlabel xl:text-xs font-bold">H2 - Testing policy</div>
                                            <div v-if="row.latest.H2.value && isMobile" class="text-xs">{{row.latest.H2.value}}</div>
                                            <div v-else-if="row.latest.H2.value && row.latest.H2.value.length > 60" class="text-xs">{{row.latest.H2.value}}</div>
                                            <div v-else-if="row.latest.H2.value && row.latest.H2.value.length > 30" class="text-sm">{{row.latest.H2.value}}</div>
                                            <div v-else-if="row.latest.H2.value && row.latest.H2.value">{{row.latest.H2.value}}</div>
                                            <div v-else>N/A</div>
                                        </div>

                                        <div class="px-4 py-2 h-28 xl:h-20 border-b border-lightslab">
                                            <div class="xl:hidden text-xss text-lightlabel xl:text-xs font-bold">H3 - Contact tracing</div>
                                            <div v-if="row.latest.H3.value && isMobile" class="text-xs">{{row.latest.H3.value}}</div>
                                            <div v-else-if="row.latest.H3.value && row.latest.H3.value.length > 60" class="text-xs">{{row.latest.H3.value}}</div>
                                            <div v-else-if="row.latest.H3.value && row.latest.H3.value.length > 30" class="text-sm">{{row.latest.H3.value}}</div>
                                            <div v-else-if="row.latest.H3.value && row.latest.H3.value">{{row.latest.H3.value}}</div>
                                            <div v-else>N/A</div>
                                        </div>

                                        <div class="px-4 py-2 h-24 xl:h-20 border-b border-lightslab">
                                            <div class="xl:hidden text-xss text-lightlabel xl:text-xs font-bold">H4 - Emergency healthcare investment</div>
                                            <div v-if="isMobile && row.latest.H4.value >= 1000000000000">US${{row.latest.H4.value/1000000000000 | numeralFormat('0,000.00')}}T</div>
                                            <div v-else-if="isMobile && row.latest.H4.value >= 1000000000">US${{row.latest.H4.value/1000000000 | numeralFormat('0,000.00')}}B</div>
                                            <div v-else-if="isMobile && row.latest.H4.value >= 1000000">US${{row.latest.H4.value/1000000 | numeralFormat('0,000.00')}}M</div>
                                            <div v-else-if="isMobile && row.latest.H4.value >= 1000">US${{row.latest.H4.value/1000 | numeralFormat('0,000.00')}}K</div>
                                            <div v-else-if="row.latest.H4.value">US${{row.latest.H4.value | numeralFormat('0,000.00')}}</div>
                                            <div v-else>N/A</div>
                                        </div>

                                        <div class="px-4 py-2 h-24 xl:h-20 border-b border-lightslab">
                                            <div class="xl:hidden text-xss text-lightlabel xl:text-xs font-bold">H5 - COVID-19 vaccine investment</div>
                                            <div v-if="isMobile && row.latest.H5.value >= 1000000000000">US${{row.latest.H5.value/1000000000000 | numeralFormat('0,000.00')}}T</div>
                                            <div v-else-if="isMobile && row.latest.H5.value >= 1000000000">US${{row.latest.H5.value/1000000000 | numeralFormat('0,000.00')}}B</div>
                                            <div v-else-if="isMobile && row.latest.H5.value >= 1000000">US${{row.latest.H5.value/1000000 | numeralFormat('0,000.00')}}M</div>
                                            <div v-else-if="isMobile && row.latest.H5.value >= 1000">US${{row.latest.H5.value/1000 | numeralFormat('0,000.00')}}K</div>
                                            <div v-else-if="row.latest.H5.value">US${{row.latest.H5.value | numeralFormat('0,000.00')}}</div>
                                            <div v-else>N/A</div>
                                        </div>

                                        <div class="px-4 py-2 xl:h-16 bg-darkslab border-b border-lightslab">
                                            <div class="xl:hidden text-xs">Miscellaneous</div>
                                        </div>

                                        <div class="px-4 py-2 h-24 border-b border-lightslab">
                                            <div class="xl:hidden text-xss text-lightlabel xl:text-xs font-bold">M1 - Other responses</div>
                                            <div v-if="row.latest.M1.value && isMobile" class="text-xs">{{row.latest.M1.value}}</div>
                                            <div v-else-if="row.latest.M1.value.length > 60" class="text-xs">{{row.latest.M1.value}}</div>
                                            <div v-else-if="row.latest.M1.value.length > 30" class="text-sm">{{row.latest.M1.value}}</div>
                                            <div v-else-if="row.latest.M1.value">{{row.latest.M1.value}}</div>
                                            <div v-else>N/A</div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="hidden xl:block border-l border-lightslab h-full"></div>
                        </div>
                    </div>
                </simplebar>
            </simplebar>
        </div>




<!--        <FullCountry v-if="expanded"-->
<!--                     :data="recomputed"-->
<!--                    v-on:close="toggleExpand"-->
<!--        />-->
    </div>
</template>

<script>
    import moment from 'moment'
    import simplebar from 'simplebar-vue';
    import FullCountry from "./FullCountry";
    import VueSlider from 'vue-slider-component'
    import 'vue-slider-component/theme/default.css'

    export default {
        name: "Latest",
        components: {
            simplebar,
            FullCountry,
            VueSlider,
        },
        props: [
            'data',
            'settings'
        ],
        data(){
            return {
                growth_factor: [],
                recomputed_data: [],
                expanded: false,
                date: '',
                options: {
                    date: {
                        min: new Date('2020-01-22'),
                        max: false,
                    }
                }
            }
        },
        created()
        {
            this.date = this.dateSliderRange[this.dateSliderRange.length - 1];
            this.options.date.max = this.date;
        },
        methods: {
            getDayNotes(date)
            {
                var data = [];
                for(var x in this.annotations)
                {
                    if (this.annotations[x].date == date)
                    {
                        data.push(this.annotations[x]);
                    }
                }
                return data;
            },
            toggleExpand()
            {
                this.expanded = !this.expanded;
            },
            remove(item)
            {
                this.$emit('removeCompare',item);
            },
            dataset(x)
            {
                var data = [];
                if(x >= 0 && this.data && this.data[x])
                {
                    data.push(_.clone(this.data[x]));
                }
                return data;
            },
        },
        computed: {

            config() {
                return {
                    'absolute': (this.settings && this.settings.absolute) ? this.settings.absolute : false,
                    'solo': (this.settings && this.settings.solo) ? this.settings.solo : false,
                }
            },
            comparison()
            {
                // console.log('data');
                // console.log(this.data);
                var data = [];
                for(var x in this.data)
                {
                    if(this.data[x])
                    {
                        var policies = _.cloneDeep(this.data[x]);
                        var row = {
                            'name': policies.name,
                            'stringencyindex' : 'N/A',
                            'latest' : {},
                        };

                        if(policies && policies.name !== 'Global' && policies.daily)
                        {
                            row.latest = _.cloneDeep(policies.daily[this.date].latest);
                            row.stringencyindex = _.clone(policies.daily[this.date].stringencyindex);

                        }

                        var list = ['C1','C2','C3','C4','C5','C6','C7','C8','E1','E2','E3','E4','H1','H2','H3','H4','H5','M1'];
                        for(var y in list)
                        {
                            var field = _.clone(list[y]);

                            if(!row.latest[field])
                            {
                                row.latest[field] = {
                                    value: false,
                                    target: false,
                                }
                            }
                        }
                        data.push(_.cloneDeep(row));
                    }
                }

                return data;
            },
            dateSliderRange()
            {
                Date.prototype.addDays = function(days) {
                    var date = new Date(this.valueOf());
                    date.setDate(date.getDate() + days);
                    return date;
                }


                var date1 = new Date('2020-01-01');
                var date2 = new Date();
                date2.setDate(date2.getDate() - 1);

                var daysTotal = (date2.getTime() - date1.getTime()) / (1000*3600*24);
                var data = [];

                for(var x = 0; x<daysTotal; x++)
                {
                    data.push(moment(date1.addDays(x)).format('YYYY-MM-DD'));
                }
                return data;
            },
            isMobile() {
                if( screen.width <= 760 ) {
                    return true;
                }
                else {
                    return false;
                }
            }
        },

        watch: {
            date: function(newValue,oldValue)
            {
                if(typeof(newValue) != 'string')
                {
                    this.date = moment(newValue).format('YYYY-MM-DD');
                }
            }
        }
    }
</script>

<style>
.inner-scrollbar .simplebar-track.simplebar-horizontal {
    visibility: hidden !important;
}
</style>
