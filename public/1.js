(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ui/CountryStateItem.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/ui/CountryStateItem.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "CountryStateItem",
  props: ['data', 'country_key', 'compare', 'sidebarExpanded', 'settings', 'fields', 'rank', 'favourite'],
  data: function data() {
    return {
      'expanded': false
    };
  },
  methods: {
    isSelected: function isSelected(country, state) {
      for (var x in this.compare) {
        var item = this.compare[x];

        if (country === item.country) {
          if (state === false) {
            return true;
          } else if (state === item.state) {
            return true;
          }
        }
      }

      return false;
    },
    selectCountry: function selectCountry(country, state) {
      this.$emit('selectCountry', country, state);
    },
    toggleExpand: function toggleExpand() {
      this.expanded = !this.expanded;
    }
  },
  computed: {
    config: function config() {
      return {
        dashboard: this.settings && this.settings.dashboard === true ? this.settings.dashboard : false
      };
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ui/Sidebar.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/ui/Sidebar.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var simplebar_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! simplebar-vue */ "./node_modules/simplebar-vue/dist/simplebar-vue.esm.js");
/* harmony import */ var _CountryStateItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CountryStateItem */ "./resources/js/components/ui/CountryStateItem.vue");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  name: "Sidebar",
  components: {
    simplebar: simplebar_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    CountryStateItem: _CountryStateItem__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  props: ['global', 'sort_stats', 'countriesIndex', 'countries_sorted', 'countries_states', 'selectCountry', 'compare', 'rankings', 'events'],
  data: function data() {
    return {
      ui: {
        metrics: false
      },
      metrics: {
        'confirmed': 'Confirmed cases',
        'deaths': 'Deaths',
        'recovered': 'Recovered',
        'active': 'Active cases',
        'confirmedDelta': 'New confirmed',
        'deathsDelta': 'New deaths',
        'recoveredDelta': 'New recoveries',
        'confirmedCapita': 'Confirmed per capita',
        'deathsCapita': 'Deaths per capita',
        'recoveredCapita': 'Recovered per capita',
        'activeCapita': 'Active per 1M population',
        'confirmedAverage': 'Average confirmed',
        'deathsAverage': 'Average deaths',
        'recoveredAverage': 'Average recovered',
        'deathsRate': 'Death rate',
        'recoveredRate': 'Recovery rate',
        'growthFactor': 'Growth Factor',
        'population': 'Population'
      },
      active: ['confirmed', 'deaths', 'recovered'],
      searchFilter: ''
    };
  },
  methods: {
    toggleSort: function toggleSort(key) {
      if (this.sort_stats.key == key) {
        if (this.sort_stats.order == 'asc') {
          this.sort_stats.order = 'desc';
        } else {
          this.sort_stats.order = 'asc';
        }
      } else {
        this.sort_stats.key = key;
      }
    },
    toggleMetrics: function toggleMetrics() {
      this.ui.metrics = !this.ui.metrics;
    },
    selectMetric: function selectMetric(index) {
      if (this.active.indexOf(index) >= 0) {
        this.active.splice(this.active.indexOf(index), 1);
      } else {
        if (this.active.length < 3) {
          this.active.push(index);
        }
      }
    },
    get_rank: function get_rank(country) {
      if (country) {
        if (this.rankings && this.rankings.positions[this.sort_stats.key]) {
          return this.rankings.positions[this.sort_stats.key][country];
        }
      }

      return false;
    }
  },
  computed: {
    countries_favourite: function countries_favourite() {
      var temp = this.events.updateFavourites;
      var data = localStorage.getItem('favourites');
      var favourites = [];
      var regexp = new RegExp(this.searchFilter, 'i');

      if (data && data.length > 2) {
        var saved_favourites = JSON.parse(data);

        for (var x in saved_favourites) {
          for (var y in this.countries_sorted) {
            if (this.countries_sorted[y].name.country === saved_favourites[x].country) {
              // search pattern not matched
              if (this.searchFilter && this.searchFilter.length > 0 && !regexp.test(this.countries_sorted[y].name.country)) {
                continue;
              }

              favourites.push(_.cloneDeep(this.countries_sorted[y]));
            }
          }
        }
      }

      return favourites;
    },
    countries_not_favourite: function countries_not_favourite() {
      var favourites = this.countries_favourite;
      var found = false;
      var data = [];
      var regexp = new RegExp(this.searchFilter, 'i');

      for (var x in this.countries_sorted) {
        for (var y in favourites) {
          if (this.countries_sorted[x].id === favourites[y].id) {
            found = true;
            break;
          }
        }

        if (found === true) {
          found = false;
          continue;
        } // search pattern not matched


        if (this.searchFilter && this.searchFilter.length > 0 && !regexp.test(this.countries_sorted[x].name.country)) {
          continue;
        }

        data.push(_.cloneDeep(this.countries_sorted[x]));
      }

      return data;
    }
  },
  mounted: function mounted() {}
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ui/CountryStateItem.vue?vue&type=template&id=00a0ffe4&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/ui/CountryStateItem.vue?vue&type=template&id=00a0ffe4&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "div",
        {
          staticClass:
            "flex hover:bg-lightslab cursor-pointer items-center h-8",
          class:
            (_vm.config.dashboard ? "justify-center " : "") +
            (_vm.isSelected(_vm.data.name.country, false)
              ? "bg-hoverslab "
              : _vm.country_key % 2 === 1
              ? "bg-slab-primary "
              : "bg-slab-secondary ")
        },
        [
          _c("div", { staticClass: "w-10 p-2 m-1 ml-0" }, [
            _c(
              "div",
              {
                staticClass:
                  "rounded bg-white font-bold px-1 text-xs text-center text-baseslab inline-block"
              },
              [_vm._v(_vm._s(_vm.rank))]
            )
          ]),
          _vm._v(" "),
          _vm.data.states.length <= 1
            ? _c("div", { staticClass: "w-4 p-2 m-1 ml-0" })
            : _c(
                "div",
                {
                  staticClass:
                    "w-5 m-0 text-white border border-transparent hover:border-white rounded text-center font-bold",
                  on: {
                    click: function($event) {
                      return _vm.toggleExpand()
                    }
                  }
                },
                [
                  _vm.expanded
                    ? _c("div", [_vm._v("-")])
                    : _c("div", [_vm._v("+")])
                ]
              ),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "text-xs py-1 w-32 px-2 font-bold",
              on: {
                click: function($event) {
                  return _vm.selectCountry(_vm.data.name.country, false)
                }
              }
            },
            [_vm._v(_vm._s(_vm.data.name.country))]
          ),
          _vm._v(" "),
          _vm._l(_vm.fields, function(metric) {
            return _vm.fields.indexOf(metric) >= 0
              ? _c(
                  "div",
                  {
                    staticClass: "text-xs pl-2 py-1 w-20",
                    on: {
                      click: function($event) {
                        return _vm.selectCountry(
                          _vm.data.name.country,
                          _vm.data.name.state
                        )
                      }
                    }
                  },
                  [
                    metric === "confirmed"
                      ? _c("div", [
                          _vm._v(
                            _vm._s(_vm._f("numeralFormat")(_vm.data.total.c))
                          )
                        ])
                      : metric === "deaths"
                      ? _c("div", [
                          _vm._v(
                            _vm._s(_vm._f("numeralFormat")(_vm.data.total.d))
                          )
                        ])
                      : metric === "recovered"
                      ? _c("div", [
                          _vm._v(
                            _vm._s(_vm._f("numeralFormat")(_vm.data.total.r))
                          )
                        ])
                      : metric === "active"
                      ? _c("div", [
                          _vm._v(
                            _vm._s(_vm._f("numeralFormat")(_vm.data.total.a))
                          )
                        ])
                      : metric === "confirmedDelta"
                      ? _c("div", [
                          _vm._v(
                            _vm._s(
                              _vm._f("numeralFormat")(_vm.data.total.delta.c)
                            )
                          )
                        ])
                      : metric === "deathsDelta"
                      ? _c("div", [
                          _vm._v(
                            _vm._s(
                              _vm._f("numeralFormat")(_vm.data.total.delta.d)
                            )
                          )
                        ])
                      : metric === "recoveredDelta"
                      ? _c("div", [
                          _vm._v(
                            _vm._s(
                              _vm._f("numeralFormat")(_vm.data.total.delta.r)
                            )
                          )
                        ])
                      : metric === "confirmedCapita"
                      ? _c("div", [
                          _vm._v(
                            _vm._s(
                              _vm._f("numeralFormat")(_vm.data.total.capita.c)
                            )
                          )
                        ])
                      : metric === "deathsCapita"
                      ? _c("div", [
                          _vm._v(
                            _vm._s(
                              _vm._f("numeralFormat")(_vm.data.total.capita.d)
                            )
                          )
                        ])
                      : metric === "recoveredCapita"
                      ? _c("div", [
                          _vm._v(
                            _vm._s(
                              _vm._f("numeralFormat")(_vm.data.total.capita.r)
                            )
                          )
                        ])
                      : metric === "activeCapita"
                      ? _c("div", [
                          _vm._v(
                            _vm._s(
                              _vm._f("numeralFormat")(_vm.data.total.capita.a)
                            )
                          )
                        ])
                      : metric === "confirmedAverage"
                      ? _c("div", [
                          _vm._v(
                            _vm._s(
                              _vm._f("numeralFormat")(_vm.data.total.average.c)
                            )
                          )
                        ])
                      : metric === "deathsAverage"
                      ? _c("div", [
                          _vm._v(
                            _vm._s(
                              _vm._f("numeralFormat")(_vm.data.total.average.d)
                            )
                          )
                        ])
                      : metric === "recoveredAverage"
                      ? _c("div", [
                          _vm._v(
                            _vm._s(
                              _vm._f("numeralFormat")(_vm.data.total.average.r)
                            )
                          )
                        ])
                      : metric === "deathsRate"
                      ? _c("div", [
                          _vm._v(
                            _vm._s(
                              _vm._f("numeralFormat")(
                                _vm.data.total.rate.d,
                                "0,000.000%"
                              )
                            )
                          )
                        ])
                      : metric === "recoveredRate"
                      ? _c("div", [
                          _vm._v(
                            _vm._s(
                              _vm._f("numeralFormat")(
                                _vm.data.total.rate.r,
                                "0,000.000%"
                              )
                            )
                          )
                        ])
                      : metric === "growthFactor"
                      ? _c("div", [
                          _vm._v(
                            _vm._s(
                              _vm._f("numeralFormat")(
                                _vm.data.total.growth.c,
                                "0.000"
                              )
                            )
                          )
                        ])
                      : metric === "population"
                      ? _c("div", [
                          _vm._v(
                            _vm._s(
                              _vm._f("numeralFormat")(
                                _vm.data.population,
                                "0,000"
                              )
                            )
                          )
                        ])
                      : _vm._e()
                  ]
                )
              : _vm._e()
          })
        ],
        2
      ),
      _vm._v(" "),
      _vm._l(_vm.data.states, function(row, key, index) {
        return row.total && row.total.delta
          ? _c(
              "div",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: _vm.expanded,
                    expression: "expanded"
                  }
                ],
                key: key,
                staticClass:
                  "pb-1 hover:bg-lightslab cursor-pointer flex items-center text-xs",
                class:
                  (_vm.config.dashboard ? "justify-center " : "") +
                  (_vm.isSelected(_vm.data.name.country, row.name.state)
                    ? "bg-hoverslab"
                    : "bg-darkslab")
              },
              [
                _vm._m(0, true),
                _vm._v(" "),
                _c("div", { staticClass: "w-4 p-2 m-1 ml-0" }),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    staticClass: "w-32 px-2",
                    on: {
                      click: function($event) {
                        return _vm.selectCountry(
                          _vm.data.name.country,
                          row.name.state
                        )
                      }
                    }
                  },
                  [_c("div", [_vm._v(_vm._s(row.name.state))])]
                ),
                _vm._v(" "),
                _vm._l(_vm.fields, function(metric) {
                  return _vm.fields.indexOf(metric) >= 0
                    ? _c(
                        "div",
                        {
                          staticClass: "text-xs pl-2 py-1 w-20",
                          on: {
                            click: function($event) {
                              return _vm.selectCountry(
                                row.name.country,
                                row.name.state
                              )
                            }
                          }
                        },
                        [
                          metric === "confirmed"
                            ? _c("div", [
                                _vm._v(
                                  _vm._s(_vm._f("numeralFormat")(row.total.c))
                                )
                              ])
                            : metric === "deaths"
                            ? _c("div", [
                                _vm._v(
                                  _vm._s(_vm._f("numeralFormat")(row.total.d))
                                )
                              ])
                            : metric === "recovered"
                            ? _c("div", [
                                _vm._v(
                                  _vm._s(_vm._f("numeralFormat")(row.total.r))
                                )
                              ])
                            : metric === "active"
                            ? _c("div", [
                                _vm._v(
                                  _vm._s(_vm._f("numeralFormat")(row.total.a))
                                )
                              ])
                            : metric === "confirmedDelta"
                            ? _c("div", [
                                _vm._v(
                                  _vm._s(
                                    _vm._f("numeralFormat")(row.total.delta.c)
                                  )
                                )
                              ])
                            : metric === "deathsDelta"
                            ? _c("div", [
                                _vm._v(
                                  _vm._s(
                                    _vm._f("numeralFormat")(row.total.delta.d)
                                  )
                                )
                              ])
                            : metric === "recoveredDelta"
                            ? _c("div", [
                                _vm._v(
                                  _vm._s(
                                    _vm._f("numeralFormat")(row.total.delta.r)
                                  )
                                )
                              ])
                            : metric === "confirmedCapita"
                            ? _c("div", [
                                _vm._v(
                                  _vm._s(
                                    _vm._f("numeralFormat")(row.total.capita.c)
                                  )
                                )
                              ])
                            : metric === "deathsCapita"
                            ? _c("div", [
                                _vm._v(
                                  _vm._s(
                                    _vm._f("numeralFormat")(row.total.capita.d)
                                  )
                                )
                              ])
                            : metric === "recoveredCapita"
                            ? _c("div", [
                                _vm._v(
                                  _vm._s(
                                    _vm._f("numeralFormat")(row.total.capita.r)
                                  )
                                )
                              ])
                            : metric === "activeCapita"
                            ? _c("div", [
                                _vm._v(
                                  _vm._s(
                                    _vm._f("numeralFormat")(row.total.capita.a)
                                  )
                                )
                              ])
                            : metric === "confirmedAverage"
                            ? _c("div", [
                                _vm._v(
                                  _vm._s(
                                    _vm._f("numeralFormat")(row.total.average.c)
                                  )
                                )
                              ])
                            : metric === "deathsAverage"
                            ? _c("div", [
                                _vm._v(
                                  _vm._s(
                                    _vm._f("numeralFormat")(row.total.average.d)
                                  )
                                )
                              ])
                            : metric === "recoveredAverage"
                            ? _c("div", [
                                _vm._v(
                                  _vm._s(
                                    _vm._f("numeralFormat")(row.total.average.r)
                                  )
                                )
                              ])
                            : metric === "deathsRate"
                            ? _c("div", [
                                _vm._v(
                                  _vm._s(
                                    _vm._f("numeralFormat")(
                                      row.total.rate.d,
                                      "0,000.000%"
                                    )
                                  )
                                )
                              ])
                            : metric === "recoveredRate"
                            ? _c("div", [
                                _vm._v(
                                  _vm._s(
                                    _vm._f("numeralFormat")(
                                      row.total.rate.r,
                                      "0,000.000%"
                                    )
                                  )
                                )
                              ])
                            : metric === "growthFactor"
                            ? _c("div", [
                                _vm._v(
                                  _vm._s(
                                    _vm._f("numeralFormat")(
                                      row.total.growth.c,
                                      "0.000"
                                    )
                                  )
                                )
                              ])
                            : metric === "population"
                            ? _c("div", [
                                _vm._v(
                                  _vm._s(
                                    _vm._f("numeralFormat")(
                                      row.population,
                                      "0,000"
                                    )
                                  )
                                )
                              ])
                            : _vm._e()
                        ]
                      )
                    : _vm._e()
                }),
                _vm._v(" "),
                _vm.config.dashboard
                  ? _c("div", { staticClass: "w-120" })
                  : _vm._e()
              ],
              2
            )
          : _vm._e()
      })
    ],
    2
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "w-10 p-2 m-1 ml-0" }, [
      _c("div", { staticClass: "px-1 text-xs" })
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ui/Sidebar.vue?vue&type=template&id=ebfc9a68&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/ui/Sidebar.vue?vue&type=template&id=ebfc9a68&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "flex flex-col" }, [
    _c(
      "div",
      { staticClass: "m-4 mb-0 overflow-hidden bg-lightslab rounded p-4 h-56" },
      [
        _c("div", { staticClass: "text-2xl tracking-tight font-bold" }, [
          _vm._v("Global tally")
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "text-xs mb-4" }, [
          _vm._v("as of " + _vm._s(_vm.global.last_update))
        ]),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "flex font-bold justify-between items-center" },
          [
            _c("div", { staticClass: "m-2 ml-0" }, [
              _c("div", { staticClass: "text-sm" }, [_vm._v("Confirmed")]),
              _vm._v(" "),
              _c("div", { staticClass: "text-2xl text-white" }, [
                _vm._v(_vm._s(_vm._f("numeralFormat")(_vm.global.total.c)))
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "m-2" }, [
              _c("div", { staticClass: "text-sm" }, [_vm._v("Deaths")]),
              _vm._v(" "),
              _c("div", { staticClass: "text-2xl text-white" }, [
                _vm._v(_vm._s(_vm._f("numeralFormat")(_vm.global.total.d)))
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "m-2 mr-0" }, [
              _c("div", { staticClass: "text-sm" }, [_vm._v("Recovered")]),
              _vm._v(" "),
              _c("div", { staticClass: "text-2xl text-white" }, [
                _vm._v(_vm._s(_vm._f("numeralFormat")(_vm.global.total.r)))
              ])
            ])
          ]
        )
      ]
    ),
    _vm._v(" "),
    _c(
      "div",
      {
        staticClass:
          "overflow-hidden bg-slab rounded m-4 px-2 flex flex-col items-start h-full p-4 relative"
      },
      [
        _c("div", { staticClass: "w-full" }, [
          _c("div", { staticClass: "flex flex-1 justify-between px-2" }, [
            _c("div", { staticClass: "tracking-tight font-bold" }, [
              _c("div", [_vm._v("Countries and states")]),
              _vm._v(" "),
              _c("div", [
                _vm._v("(" + _vm._s(_vm.countriesIndex.length) + " total)")
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "text-right" }, [
              _c(
                "div",
                {
                  staticClass:
                    "text-xs p-2 border rounded border-lightslab hover:bg-hoverslab inline-block cursor-pointer",
                  on: {
                    click: function($event) {
                      return _vm.toggleMetrics()
                    }
                  }
                },
                [
                  _vm._v(
                    "\n                        Choose metrics\n                    "
                  )
                ]
              ),
              _vm._v(" "),
              _c("div", { staticClass: "my-2 text-xs text-right" }, [
                _vm._v(
                  "Sorting by " +
                    _vm._s(_vm.sort_stats.key) +
                    " " +
                    _vm._s(_vm.sort_stats.order)
                )
              ])
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "w-full p-2 relative" }, [
            _c("div", { staticClass: "relative" }, [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.searchFilter,
                    expression: "searchFilter"
                  }
                ],
                staticClass:
                  "w-full border p-1 rounded border-lightslab focus:border-heading focus:bg-hoverslab bg-transparent text-xs focus:outline-none text-white placeholder-lightslab focus:placeholder-heading",
                attrs: {
                  type: "text",
                  name: "search-country",
                  placeholder: "Search"
                },
                domProps: { value: _vm.searchFilter },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.searchFilter = $event.target.value
                  }
                }
              }),
              _vm._v(" "),
              _c(
                "div",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.searchFilter.length > 0,
                      expression: "searchFilter.length > 0"
                    }
                  ],
                  staticClass:
                    "absolute right-0 inset-y-0 cursor-pointer hover:text-white mr-2 mt-1 text-xs",
                  on: {
                    click: function($event) {
                      _vm.searchFilter = ""
                    }
                  }
                },
                [_vm._v("clear")]
              )
            ])
          ]),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass:
                "flex font-bold py-2 text-xs items-center bg-slab-primary"
            },
            [
              _c("div", { staticClass: "w-10 p-2 m-1 ml-0" }),
              _vm._v(" "),
              _c("div", { staticClass: "w-4 p-2 m-1 ml-0" }),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass: "w-32 cursor-pointer p-2 overflow-hidden",
                  class: _vm.sort_stats.key === "country" ? "bg-hoverslab" : "",
                  on: {
                    click: function($event) {
                      return _vm.toggleSort("country")
                    }
                  }
                },
                [_vm._v("Country / Region")]
              ),
              _vm._v(" "),
              _vm._l(_vm.active, function(metric) {
                return _vm.active.indexOf(metric) >= 0
                  ? _c(
                      "div",
                      {
                        staticClass: "w-20 cursor-pointer p-2 overflow-hidden",
                        class:
                          _vm.sort_stats.key === metric ? "bg-hoverslab" : "",
                        on: {
                          click: function($event) {
                            return _vm.toggleSort(metric)
                          }
                        }
                      },
                      [
                        _vm._v(
                          "\n                    " +
                            _vm._s(_vm.metrics[metric]) +
                            "\n                "
                        )
                      ]
                    )
                  : _vm._e()
              })
            ],
            2
          )
        ]),
        _vm._v(" "),
        _c(
          "div",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.countries_favourite.length > 0,
                expression: "countries_favourite.length > 0"
              }
            ],
            staticClass: "w-full border border-heading"
          },
          _vm._l(_vm.countries_favourite, function(data, key, index) {
            return _c("CountryStateItem", {
              key: key + "-faved",
              attrs: {
                data: data,
                country_key: key,
                rank: _vm.get_rank(data.name.country),
                compare: _vm.compare,
                fields: _vm.active,
                metrics: _vm.metrics,
                favourite: true,
                settings: { dashboard: false }
              },
              on: { selectCountry: _vm.selectCountry }
            })
          }),
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "w-full h-full relative" },
          [
            _c(
              "simplebar",
              {
                staticClass: "top-0 right-0 bottom-0 left-0",
                staticStyle: { position: "absolute" }
              },
              _vm._l(_vm.countries_not_favourite, function(data, key, index) {
                return _c("CountryStateItem", {
                  key: key,
                  attrs: {
                    data: data,
                    country_key: key,
                    rank: _vm.get_rank(data.name.country),
                    compare: _vm.compare,
                    fields: _vm.active,
                    metrics: _vm.metrics,
                    favourite: false,
                    settings: { dashboard: false }
                  },
                  on: { selectCountry: _vm.selectCountry }
                })
              }),
              1
            )
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.ui.metrics,
                expression: "ui.metrics"
              }
            ],
            staticClass: "bg-hoverslab absolute inset-0 p-4"
          },
          [
            _c("div", { staticClass: "flex flex-1 justify-between" }, [
              _vm._m(0),
              _vm._v(" "),
              _c("div", { staticClass: "text-right" }, [
                _c(
                  "div",
                  {
                    staticClass:
                      "text-xs p-2 border rounded border-lightslab hover:bg-lightslab inline-block cursor-pointer",
                    on: {
                      click: function($event) {
                        return _vm.toggleMetrics()
                      }
                    }
                  },
                  [
                    _vm._v(
                      "\n                        Back\n                    "
                    )
                  ]
                )
              ])
            ]),
            _vm._v(" "),
            _c(
              "simplebar",
              {
                staticClass: "inset-x-0 bottom-0 top-4 m-2",
                staticStyle: { position: "absolute" }
              },
              [
                _c(
                  "div",
                  {},
                  _vm._l(_vm.metrics, function(metric, index) {
                    return _c(
                      "div",
                      {
                        staticClass:
                          "p-2 my-1 rounded border border-lightslab hover:border-white cursor-pointer text-sm",
                        class:
                          _vm.active.indexOf(index) >= 0
                            ? "bg-heading text-slab"
                            : "",
                        on: {
                          click: function($event) {
                            return _vm.selectMetric(index)
                          }
                        }
                      },
                      [
                        _vm._v(
                          "\n                        " + _vm._s(metric) + " "
                        ),
                        _vm.active.indexOf(index) >= 0
                          ? _c(
                              "div",
                              {
                                staticClass:
                                  "inline-block text-xs bg-white text-hoverslab px-1 ml-2"
                              },
                              [_vm._v(_vm._s(_vm.active.indexOf(index) + 1))]
                            )
                          : _vm._e()
                      ]
                    )
                  }),
                  0
                )
              ]
            )
          ],
          1
        )
      ]
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", [
      _c("div", { staticClass: "tracking-tight font-bold" }, [
        _vm._v(
          "\n                        Displayed metrics\n                    "
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "text-xs" }, [_vm._v("Choose up to 3 metrics")])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/ui/CountryStateItem.vue":
/*!*********************************************************!*\
  !*** ./resources/js/components/ui/CountryStateItem.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CountryStateItem_vue_vue_type_template_id_00a0ffe4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CountryStateItem.vue?vue&type=template&id=00a0ffe4&scoped=true& */ "./resources/js/components/ui/CountryStateItem.vue?vue&type=template&id=00a0ffe4&scoped=true&");
/* harmony import */ var _CountryStateItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CountryStateItem.vue?vue&type=script&lang=js& */ "./resources/js/components/ui/CountryStateItem.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _CountryStateItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CountryStateItem_vue_vue_type_template_id_00a0ffe4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _CountryStateItem_vue_vue_type_template_id_00a0ffe4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "00a0ffe4",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/ui/CountryStateItem.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/ui/CountryStateItem.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/ui/CountryStateItem.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CountryStateItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./CountryStateItem.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ui/CountryStateItem.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CountryStateItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/ui/CountryStateItem.vue?vue&type=template&id=00a0ffe4&scoped=true&":
/*!****************************************************************************************************!*\
  !*** ./resources/js/components/ui/CountryStateItem.vue?vue&type=template&id=00a0ffe4&scoped=true& ***!
  \****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CountryStateItem_vue_vue_type_template_id_00a0ffe4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./CountryStateItem.vue?vue&type=template&id=00a0ffe4&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ui/CountryStateItem.vue?vue&type=template&id=00a0ffe4&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CountryStateItem_vue_vue_type_template_id_00a0ffe4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CountryStateItem_vue_vue_type_template_id_00a0ffe4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/ui/Sidebar.vue":
/*!************************************************!*\
  !*** ./resources/js/components/ui/Sidebar.vue ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Sidebar_vue_vue_type_template_id_ebfc9a68_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Sidebar.vue?vue&type=template&id=ebfc9a68&scoped=true& */ "./resources/js/components/ui/Sidebar.vue?vue&type=template&id=ebfc9a68&scoped=true&");
/* harmony import */ var _Sidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Sidebar.vue?vue&type=script&lang=js& */ "./resources/js/components/ui/Sidebar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Sidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Sidebar_vue_vue_type_template_id_ebfc9a68_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Sidebar_vue_vue_type_template_id_ebfc9a68_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "ebfc9a68",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/ui/Sidebar.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/ui/Sidebar.vue?vue&type=script&lang=js&":
/*!*************************************************************************!*\
  !*** ./resources/js/components/ui/Sidebar.vue?vue&type=script&lang=js& ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Sidebar.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ui/Sidebar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/ui/Sidebar.vue?vue&type=template&id=ebfc9a68&scoped=true&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/components/ui/Sidebar.vue?vue&type=template&id=ebfc9a68&scoped=true& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_template_id_ebfc9a68_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Sidebar.vue?vue&type=template&id=ebfc9a68&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ui/Sidebar.vue?vue&type=template&id=ebfc9a68&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_template_id_ebfc9a68_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_template_id_ebfc9a68_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);