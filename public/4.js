(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "CountryStateItem",
  props: ['data', 'country_key', 'compare', 'sidebarExpanded', 'settings', 'fields', 'rank'],
  data: function data() {
    return {
      'expanded': false
    };
  },
  methods: {
    isSelected: function isSelected(country, state) {
      for (var x in this.compare) {
        var item = this.compare[x];

        if (country == item.country) {
          if (state == false) {
            return true;
          } else if (state == item.state) {
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
        dashboard: this.settings && this.settings.dashboard == true ? this.settings.dashboard : false
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



/* harmony default export */ __webpack_exports__["default"] = ({
  name: "Sidebar",
  components: {
    simplebar: simplebar_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    CountryStateItem: _CountryStateItem__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  props: ['global', 'sort_stats', 'countriesIndex', 'countries_sorted', 'countries_states', 'selectCountry', 'compare', 'rankings'],
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
        'confirmedDelta': 'New confirmed cases',
        'deathsDelta': 'New deaths',
        'recoveredDelta': 'New recoveries',
        'confirmedCapita': 'Confirmed per 1M population',
        'deathsCapita': 'Deaths per 1M population',
        'recoveredCapita': 'Recovered per 1M population',
        'activeCapita': 'Active per 1M population',
        'confirmedAverage': 'Average confirmed cases',
        'deathsAverage': 'Average deaths',
        'recoveredAverage': 'Average recoveries',
        'growthFactor': 'Growth Factor'
      },
      active: ['confirmed', 'deaths', 'recovered']
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
              : _vm.country_key % 2 == 1
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
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.fields.indexOf("confirmed") >= 0,
                  expression: "fields.indexOf('confirmed') >= 0"
                }
              ],
              staticClass: "text-xs pl-2 py-1 w-20",
              on: {
                click: function($event) {
                  return _vm.selectCountry(_vm.data.name.country, false)
                }
              }
            },
            [_vm._v(_vm._s(_vm._f("numeralFormat")(_vm.data.total.c)))]
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.fields.indexOf("deaths") >= 0,
                  expression: "fields.indexOf('deaths') >= 0"
                }
              ],
              staticClass: "text-xs pl-2 py-1 w-20",
              on: {
                click: function($event) {
                  return _vm.selectCountry(_vm.data.name.country, false)
                }
              }
            },
            [_vm._v(_vm._s(_vm._f("numeralFormat")(_vm.data.total.d)))]
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.fields.indexOf("recovered") >= 0,
                  expression: "fields.indexOf('recovered') >= 0"
                }
              ],
              staticClass: "text-xs pl-2 py-1 w-20",
              on: {
                click: function($event) {
                  return _vm.selectCountry(_vm.data.name.country, false)
                }
              }
            },
            [_vm._v(_vm._s(_vm._f("numeralFormat")(_vm.data.total.r)))]
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.fields.indexOf("active") >= 0,
                  expression: "fields.indexOf('active') >= 0"
                }
              ],
              staticClass: "text-xs pl-2 py-1 w-20",
              on: {
                click: function($event) {
                  return _vm.selectCountry(_vm.data.name.country, false)
                }
              }
            },
            [_vm._v(_vm._s(_vm._f("numeralFormat")(_vm.data.total.a)))]
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.fields.indexOf("confirmedDelta") >= 0,
                  expression: "fields.indexOf('confirmedDelta') >= 0"
                }
              ],
              staticClass: "text-xs pl-2 py-1 w-20",
              on: {
                click: function($event) {
                  return _vm.selectCountry(_vm.data.name.country, false)
                }
              }
            },
            [_vm._v(_vm._s(_vm._f("numeralFormat")(_vm.data.total.delta.c)))]
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.fields.indexOf("deathsDelta") >= 0,
                  expression: "fields.indexOf('deathsDelta') >= 0"
                }
              ],
              staticClass: "text-xs pl-2 py-1 w-20",
              on: {
                click: function($event) {
                  return _vm.selectCountry(_vm.data.name.country, false)
                }
              }
            },
            [_vm._v(_vm._s(_vm._f("numeralFormat")(_vm.data.total.delta.d)))]
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.fields.indexOf("recoveredDelta") >= 0,
                  expression: "fields.indexOf('recoveredDelta') >= 0"
                }
              ],
              staticClass: "text-xs pl-2 py-1 w-20",
              on: {
                click: function($event) {
                  return _vm.selectCountry(_vm.data.name.country, false)
                }
              }
            },
            [_vm._v(_vm._s(_vm._f("numeralFormat")(_vm.data.total.delta.r)))]
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.fields.indexOf("confirmedCapita") >= 0,
                  expression: "fields.indexOf('confirmedCapita') >= 0"
                }
              ],
              staticClass: "text-xs pl-2 py-1 w-20",
              on: {
                click: function($event) {
                  return _vm.selectCountry(_vm.data.name.country, false)
                }
              }
            },
            [
              _vm._v(
                _vm._s(
                  _vm._f("numeralFormat")(_vm.data.total.capita.c, "0,000.00")
                )
              )
            ]
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.fields.indexOf("deathsCapita") >= 0,
                  expression: "fields.indexOf('deathsCapita') >= 0"
                }
              ],
              staticClass: "text-xs pl-2 py-1 w-20",
              on: {
                click: function($event) {
                  return _vm.selectCountry(_vm.data.name.country, false)
                }
              }
            },
            [
              _vm._v(
                _vm._s(
                  _vm._f("numeralFormat")(_vm.data.total.capita.d, "0,000.00")
                )
              )
            ]
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.fields.indexOf("recoveredCapita") >= 0,
                  expression: "fields.indexOf('recoveredCapita') >= 0"
                }
              ],
              staticClass: "text-xs pl-2 py-1 w-20",
              on: {
                click: function($event) {
                  return _vm.selectCountry(_vm.data.name.country, false)
                }
              }
            },
            [
              _vm._v(
                _vm._s(
                  _vm._f("numeralFormat")(_vm.data.total.capita.r, "0,000.00")
                )
              )
            ]
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.fields.indexOf("activeCapita") >= 0,
                  expression: "fields.indexOf('activeCapita') >= 0"
                }
              ],
              staticClass: "text-xs pl-2 py-1 w-20",
              on: {
                click: function($event) {
                  return _vm.selectCountry(_vm.data.name.country, false)
                }
              }
            },
            [
              _vm._v(
                _vm._s(
                  _vm._f("numeralFormat")(_vm.data.total.capita.a, "0,000.00")
                )
              )
            ]
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.fields.indexOf("confirmedAverage") >= 0,
                  expression: "fields.indexOf('confirmedAverage') >= 0"
                }
              ],
              staticClass: "text-xs pl-2 py-1 w-20",
              on: {
                click: function($event) {
                  return _vm.selectCountry(_vm.data.name.country, false)
                }
              }
            },
            [
              _vm._v(
                _vm._s(
                  _vm._f("numeralFormat")(_vm.data.total.average.c, "0,000.0")
                )
              )
            ]
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.fields.indexOf("deathsAverage") >= 0,
                  expression: "fields.indexOf('deathsAverage') >= 0"
                }
              ],
              staticClass: "text-xs pl-2 py-1 w-20",
              on: {
                click: function($event) {
                  return _vm.selectCountry(_vm.data.name.country, false)
                }
              }
            },
            [
              _vm._v(
                _vm._s(
                  _vm._f("numeralFormat")(_vm.data.total.average.d, "0,000.0")
                )
              )
            ]
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.fields.indexOf("recoveredAverage") >= 0,
                  expression: "fields.indexOf('recoveredAverage') >= 0"
                }
              ],
              staticClass: "text-xs pl-2 py-1 w-20",
              on: {
                click: function($event) {
                  return _vm.selectCountry(_vm.data.name.country, false)
                }
              }
            },
            [
              _vm._v(
                _vm._s(
                  _vm._f("numeralFormat")(_vm.data.total.average.r, "0,000.0")
                )
              )
            ]
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.fields.indexOf("growthFactor") >= 0,
                  expression: "fields.indexOf('growthFactor') >= 0"
                }
              ],
              staticClass: "text-xs pl-2 py-1 w-20",
              on: {
                click: function($event) {
                  return _vm.selectCountry(_vm.data.name.country, false)
                }
              }
            },
            [
              _vm._v(
                _vm._s(_vm._f("numeralFormat")(_vm.data.total.growth.c, "0.00"))
              )
            ]
          )
        ]
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
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.fields.indexOf("confirmed") >= 0,
                        expression: "fields.indexOf('confirmed') >= 0"
                      }
                    ],
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
                  [_vm._v(_vm._s(_vm._f("numeralFormat")(row.total.c)))]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.fields.indexOf("deaths") >= 0,
                        expression: "fields.indexOf('deaths') >= 0"
                      }
                    ],
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
                  [_vm._v(_vm._s(_vm._f("numeralFormat")(row.total.d)))]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.fields.indexOf("recovered") >= 0,
                        expression: "fields.indexOf('recovered') >= 0"
                      }
                    ],
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
                  [_vm._v(_vm._s(_vm._f("numeralFormat")(row.total.r)))]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.fields.indexOf("active") >= 0,
                        expression: "fields.indexOf('active') >= 0"
                      }
                    ],
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
                  [_vm._v(_vm._s(_vm._f("numeralFormat")(row.total.a)))]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.fields.indexOf("confirmedDelta") >= 0,
                        expression: "fields.indexOf('confirmedDelta') >= 0"
                      }
                    ],
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
                  [_vm._v(_vm._s(_vm._f("numeralFormat")(row.total.delta.c)))]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.fields.indexOf("deathsDelta") >= 0,
                        expression: "fields.indexOf('deathsDelta') >= 0"
                      }
                    ],
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
                  [_vm._v(_vm._s(_vm._f("numeralFormat")(row.total.delta.d)))]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.fields.indexOf("recoveredDelta") >= 0,
                        expression: "fields.indexOf('recoveredDelta') >= 0"
                      }
                    ],
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
                  [_vm._v(_vm._s(_vm._f("numeralFormat")(row.total.delta.r)))]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.fields.indexOf("confirmedCapita") >= 0,
                        expression: "fields.indexOf('confirmedCapita') >= 0"
                      }
                    ],
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
                    _vm._v(
                      _vm._s(
                        _vm._f("numeralFormat")(row.total.capita.c, "0,000.00")
                      )
                    )
                  ]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.fields.indexOf("deathsCapita") >= 0,
                        expression: "fields.indexOf('deathsCapita') >= 0"
                      }
                    ],
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
                    _vm._v(
                      _vm._s(
                        _vm._f("numeralFormat")(row.total.capita.d, "0,000.00")
                      )
                    )
                  ]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.fields.indexOf("recoveredCapita") >= 0,
                        expression: "fields.indexOf('recoveredCapita') >= 0"
                      }
                    ],
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
                    _vm._v(
                      _vm._s(
                        _vm._f("numeralFormat")(row.total.capita.r, "0,000.00")
                      )
                    )
                  ]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.fields.indexOf("activeCapita") >= 0,
                        expression: "fields.indexOf('activeCapita') >= 0"
                      }
                    ],
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
                    _vm._v(
                      _vm._s(
                        _vm._f("numeralFormat")(row.total.capita.a, "0,000.00")
                      )
                    )
                  ]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.fields.indexOf("confirmedAverage") >= 0,
                        expression: "fields.indexOf('confirmedAverage') >= 0"
                      }
                    ],
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
                    _vm._v(
                      _vm._s(
                        _vm._f("numeralFormat")(row.total.average.c, "0,000.0")
                      )
                    )
                  ]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.fields.indexOf("deathsAverage") >= 0,
                        expression: "fields.indexOf('deathsAverage') >= 0"
                      }
                    ],
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
                    _vm._v(
                      _vm._s(
                        _vm._f("numeralFormat")(row.total.average.d, "0,000.0")
                      )
                    )
                  ]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.fields.indexOf("recoveredAverage") >= 0,
                        expression: "fields.indexOf('recoveredAverage') >= 0"
                      }
                    ],
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
                    _vm._v(
                      _vm._s(
                        _vm._f("numeralFormat")(row.total.average.r, "0,000.0")
                      )
                    )
                  ]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.fields.indexOf("growthFactor") >= 0,
                        expression: "fields.indexOf('growthFactor') >= 0"
                      }
                    ],
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
                    _vm._v(
                      _vm._s(
                        _vm._f("numeralFormat")(row.total.growth.c, "0.00")
                      )
                    )
                  ]
                ),
                _vm._v(" "),
                _vm.config.dashboard
                  ? _c("div", { staticClass: "w-120" })
                  : _vm._e()
              ]
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
                _vm._v(
                  _vm._s(_vm._f("numeralFormat")(_vm.global.total.confirmed))
                )
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "m-2" }, [
              _c("div", { staticClass: "text-sm" }, [_vm._v("Deaths")]),
              _vm._v(" "),
              _c("div", { staticClass: "text-2xl text-white" }, [
                _vm._v(_vm._s(_vm._f("numeralFormat")(_vm.global.total.deaths)))
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "m-2 mr-0" }, [
              _c("div", { staticClass: "text-sm" }, [_vm._v("Recovered")]),
              _vm._v(" "),
              _c("div", { staticClass: "text-2xl text-white" }, [
                _vm._v(
                  _vm._s(_vm._f("numeralFormat")(_vm.global.total.recovered))
                )
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
              _c(
                "div",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.active.indexOf("confirmed") >= 0,
                      expression: "active.indexOf('confirmed') >= 0"
                    }
                  ],
                  staticClass: "w-20 cursor-pointer p-2 overflow-hidden",
                  class:
                    _vm.sort_stats.key === "confirmed" ? "bg-hoverslab" : "",
                  on: {
                    click: function($event) {
                      return _vm.toggleSort("confirmed")
                    }
                  }
                },
                [_vm._v("Confirmed")]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.active.indexOf("deaths") >= 0,
                      expression: "active.indexOf('deaths') >= 0"
                    }
                  ],
                  staticClass: "w-20 cursor-pointer p-2 overflow-hidden",
                  class: _vm.sort_stats.key === "deaths" ? "bg-hoverslab" : "",
                  on: {
                    click: function($event) {
                      return _vm.toggleSort("deaths")
                    }
                  }
                },
                [_vm._v("Deaths")]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.active.indexOf("recovered") >= 0,
                      expression: "active.indexOf('recovered') >= 0"
                    }
                  ],
                  staticClass: "w-20 cursor-pointer p-2 overflow-hidden",
                  class:
                    _vm.sort_stats.key === "recovered" ? "bg-hoverslab" : "",
                  on: {
                    click: function($event) {
                      return _vm.toggleSort("recovered")
                    }
                  }
                },
                [_vm._v("Recovered")]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.active.indexOf("active") >= 0,
                      expression: "active.indexOf('active') >= 0"
                    }
                  ],
                  staticClass: "w-20 cursor-pointer p-2 overflow-hidden",
                  class: _vm.sort_stats.key === "active" ? "bg-hoverslab" : "",
                  on: {
                    click: function($event) {
                      return _vm.toggleSort("active")
                    }
                  }
                },
                [_vm._v("Active")]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.active.indexOf("confirmedDelta") >= 0,
                      expression: "active.indexOf('confirmedDelta') >= 0"
                    }
                  ],
                  staticClass: "w-20 cursor-pointer p-2 overflow-hidden",
                  class:
                    _vm.sort_stats.key === "confirmedDelta"
                      ? "bg-hoverslab"
                      : "",
                  on: {
                    click: function($event) {
                      return _vm.toggleSort("confirmedDelta")
                    }
                  }
                },
                [_vm._v("New confirmed")]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.active.indexOf("deathsDelta") >= 0,
                      expression: "active.indexOf('deathsDelta') >= 0"
                    }
                  ],
                  staticClass: "w-20 cursor-pointer p-2 overflow-hidden",
                  class:
                    _vm.sort_stats.key === "deathsDelta" ? "bg-hoverslab" : "",
                  on: {
                    click: function($event) {
                      return _vm.toggleSort("deathsDelta")
                    }
                  }
                },
                [_vm._v("New deaths")]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.active.indexOf("recoveredDelta") >= 0,
                      expression: "active.indexOf('recoveredDelta') >= 0"
                    }
                  ],
                  staticClass: "w-20 cursor-pointer p-2 overflow-hidden",
                  class:
                    _vm.sort_stats.key === "recoveredDelta"
                      ? "bg-hoverslab"
                      : "",
                  on: {
                    click: function($event) {
                      return _vm.toggleSort("recoveredDelta")
                    }
                  }
                },
                [_vm._v("New recovered")]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.active.indexOf("confirmedCapita") >= 0,
                      expression: "active.indexOf('confirmedCapita') >= 0"
                    }
                  ],
                  staticClass: "w-20 cursor-pointer p-2 overflow-hidden",
                  class:
                    _vm.sort_stats.key === "confirmedCapita"
                      ? "bg-hoverslab"
                      : "",
                  on: {
                    click: function($event) {
                      return _vm.toggleSort("confirmedCapita")
                    }
                  }
                },
                [_vm._v("Confirmed per capita")]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.active.indexOf("deathsCapita") >= 0,
                      expression: "active.indexOf('deathsCapita') >= 0"
                    }
                  ],
                  staticClass: "w-20 cursor-pointer p-2 overflow-hidden",
                  class:
                    _vm.sort_stats.key === "deathsCapita" ? "bg-hoverslab" : "",
                  on: {
                    click: function($event) {
                      return _vm.toggleSort("deathsCapita")
                    }
                  }
                },
                [_vm._v("Deaths per capita")]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.active.indexOf("activeCapita") >= 0,
                      expression: "active.indexOf('activeCapita') >= 0"
                    }
                  ],
                  staticClass: "w-20 cursor-pointer p-2 overflow-hidden",
                  class:
                    _vm.sort_stats.key === "activeCapita" ? "bg-hoverslab" : "",
                  on: {
                    click: function($event) {
                      return _vm.toggleSort("activeCapita")
                    }
                  }
                },
                [_vm._v("Active per capita")]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.active.indexOf("recoveredCapita") >= 0,
                      expression: "active.indexOf('recoveredCapita') >= 0"
                    }
                  ],
                  staticClass: "w-20 cursor-pointer p-2 overflow-hidden",
                  class:
                    _vm.sort_stats.key === "recoveredCapita"
                      ? "bg-hoverslab"
                      : "",
                  on: {
                    click: function($event) {
                      return _vm.toggleSort("recoveredCapita")
                    }
                  }
                },
                [_vm._v("Recovered per capita")]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.active.indexOf("confirmedAverage") >= 0,
                      expression: "active.indexOf('confirmedAverage') >= 0"
                    }
                  ],
                  staticClass: "w-20 cursor-pointer p-2 overflow-hidden",
                  class:
                    _vm.sort_stats.key === "confirmedAverage"
                      ? "bg-hoverslab"
                      : "",
                  on: {
                    click: function($event) {
                      return _vm.toggleSort("confirmedAverage")
                    }
                  }
                },
                [_vm._v("Average confirmed")]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.active.indexOf("deathsAverage") >= 0,
                      expression: "active.indexOf('deathsAverage') >= 0"
                    }
                  ],
                  staticClass: "w-20 cursor-pointer p-2 overflow-hidden",
                  class:
                    _vm.sort_stats.key === "deathsAverage"
                      ? "bg-hoverslab"
                      : "",
                  on: {
                    click: function($event) {
                      return _vm.toggleSort("deathsAverage")
                    }
                  }
                },
                [_vm._v("Average deaths")]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.active.indexOf("recoveredAverage") >= 0,
                      expression: "active.indexOf('recoveredAverage') >= 0"
                    }
                  ],
                  staticClass: "w-20 cursor-pointer p-2 overflow-hidden",
                  class:
                    _vm.sort_stats.key === "recoveredAverage"
                      ? "bg-hoverslab"
                      : "",
                  on: {
                    click: function($event) {
                      return _vm.toggleSort("recoveredAverage")
                    }
                  }
                },
                [_vm._v("Average recovered")]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.active.indexOf("growthFactor") >= 0,
                      expression: "active.indexOf('growthFactor') >= 0"
                    }
                  ],
                  staticClass: "w-20 cursor-pointer p-2 overflow-hidden",
                  class:
                    _vm.sort_stats.key === "growthFactor" ? "bg-hoverslab" : "",
                  on: {
                    click: function($event) {
                      return _vm.toggleSort("growthFactor")
                    }
                  }
                },
                [_vm._v("Growth factor")]
              )
            ]
          )
        ]),
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
              _vm._l(_vm.countries_sorted, function(data, key, index) {
                return _c("CountryStateItem", {
                  key: key,
                  attrs: {
                    data: data,
                    country_key: key,
                    rank: _vm.get_rank(data.name.country),
                    compare: _vm.compare,
                    fields: _vm.active,
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
                          "\n                        " +
                            _vm._s(metric) +
                            "\n                    "
                        )
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