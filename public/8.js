(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/MapViewMobile.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/MapViewMobile.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var simplebar_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! simplebar-vue */ "./node_modules/simplebar-vue/dist/simplebar-vue.esm.js");
/* harmony import */ var _components_Map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Map */ "./resources/js/components/Map.vue");
/* harmony import */ var vue_slider_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue-slider-component */ "./node_modules/vue-slider-component/dist/vue-slider-component.umd.min.js");
/* harmony import */ var vue_slider_component__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(vue_slider_component__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var vue_slider_component_theme_default_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue-slider-component/theme/default.css */ "./node_modules/vue-slider-component/theme/default.css");
/* harmony import */ var vue_slider_component_theme_default_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(vue_slider_component_theme_default_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_4__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "MapView",
  components: {
    Map: _components_Map__WEBPACK_IMPORTED_MODULE_1__["default"],
    simplebar: simplebar_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    VueSlider: vue_slider_component__WEBPACK_IMPORTED_MODULE_2___default.a
  },
  props: ['annotations', 'countries_sorted', 'getDaily', 'database'],
  data: function data() {
    return {
      layers: {
        confirmed: true,
        deaths: false,
        recovered: false,
        confirmedSurge: false
      },
      ajax: {
        rankings: {}
      },
      date: '',
      options: {
        date: {
          min: new Date('2020-01-01'),
          max: false
        }
      },
      ui: {
        events: false,
        markers: false
      },
      playing: false,
      interval: false,
      location: false
    };
  },
  created: function created() {
    this.date = this.dateSliderRange[this.dateSliderRange.length - 1];
    this.options.date.max = this.date;
  },
  mounted: function mounted() {
    var _this = this;

    axios.get('/api/stats/rankings').then(function (res) {
      _this.ajax.rankings = res.data;
    })["catch"](function (error) {});
    var self = this;
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    function success(pos) {
      var crd = pos.coords; // console.log('Your current position is:');
      // console.log(`Latitude : ${crd.latitude}`);
      // console.log(`Longitude: ${crd.longitude}`);
      // console.log(`More or less ${crd.accuracy} meters.`);

      self.location = crd;
    }

    function error(err) {
      console.warn("ERROR(".concat(err.code, "): ").concat(err.message));
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  },
  computed: {
    dateSliderRange: function dateSliderRange() {
      Date.prototype.addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };

      var date1 = new Date('2020-01-01');
      var date2 = new Date();
      date2.setDate(date2.getDate() - 1);
      var daysTotal = (date2.getTime() - date1.getTime()) / (1000 * 3600 * 24);
      var data = [];

      for (var x = 0; x < daysTotal; x++) {
        data.push(moment__WEBPACK_IMPORTED_MODULE_4___default()(date1.addDays(x)).format('YYYY-MM-DD'));
      }

      return data;
    },
    filteredAnnotations: function filteredAnnotations() {
      var data = [];

      for (var x in this.annotations) {
        if (this.annotations[x] && this.annotations[x].date) {
          if (moment__WEBPACK_IMPORTED_MODULE_4___default()(this.annotations[x].date) <= moment__WEBPACK_IMPORTED_MODULE_4___default()(this.date)) {
            data.push(_.clone(this.annotations[x]));
          }
        }
      }

      return data;
    }
  },
  methods: {
    play: function play() {
      var self = this;
      this.playing = true;
      this.interval = setInterval(function () {
        var date = new Date(self.date);
        var max = new Date(self.options.date.max);

        if (date < max) {
          self.date = moment__WEBPACK_IMPORTED_MODULE_4___default()(date.addDays(1)).format('YYYY-MM-DD');
        } else {
          clearInterval(self.interval);
          setTimeout(function () {
            self.date = self.options.date.min;
            setTimeout(function () {
              self.play();
            }, 500);
          }, 500);
        }
      }, 100);
    },
    pause: function pause() {
      this.playing = false;
      clearInterval(this.interval);
    }
  },
  watch: {
    date: function date(newValue, oldValue) {
      if (typeof newValue != 'string') {
        this.date = moment__WEBPACK_IMPORTED_MODULE_4___default()(newValue).format('YYYY-MM-DD');
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/MapViewMobile.vue?vue&type=template&id=71f15a14&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/MapViewMobile.vue?vue&type=template&id=71f15a14&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "absolute inset-x-0 top-0 bottom-4" }, [
    _c(
      "div",
      { staticClass: "absolute inset-x-0 top-0 bottom-5" },
      [
        _c(
          "keep-alive",
          [
            _c("Map", {
              staticClass: "absolute inset-x-0 inset-y-0",
              attrs: {
                id: "world_map",
                enable: true,
                data: _vm.countries_sorted,
                database: _vm.database,
                date: _vm.date,
                rankings: _vm.ajax.rankings,
                layers: _vm.layers,
                settings: {
                  interactive: true,
                  zoom: 0,
                  stops: _vm.options.stops
                },
                location: _vm.location
              }
            })
          ],
          1
        )
      ],
      1
    ),
    _vm._v(" "),
    _c(
      "div",
      {
        staticClass: "absolute top-0 left-0 z-20 p-2 rounded",
        class: _vm.ui.events || _vm.ui.markers ? "hidden" : "block",
        staticStyle: {
          background: "rgba(0,0,0,0.5)",
          top: "1rem",
          left: "1rem"
        },
        on: {
          click: function($event) {
            _vm.ui.events = true
          }
        }
      },
      [_vm._v("Events")]
    ),
    _vm._v(" "),
    _vm.ui.events
      ? _c(
          "div",
          {
            staticClass: "absolute top-0 bottom-5 inset-x-0 p-2 z-30",
            staticStyle: { background: "rgba(0,0,0,0.75)" }
          },
          [
            _c(
              "div",
              {
                staticClass: "font-bold mb-2",
                on: {
                  click: function($event) {
                    _vm.ui.events = false
                  }
                }
              },
              [_vm._v("Close")]
            ),
            _vm._v(" "),
            _c(
              "simplebar",
              {
                staticClass: "p-2 text-sm absolute top-3 bottom-1 inset-x-0",
                staticStyle: { position: "absolute" },
                attrs: { "data-simplebar-auto-hide": "true" }
              },
              [
                _c(
                  "ul",
                  [
                    _vm.filteredAnnotations.length == 0
                      ? _c("li", { staticClass: "text-xs p-4" }, [
                          _vm._v(
                            "\n                    Nothing to show here.\n                "
                          )
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm._l(_vm.filteredAnnotations, function(note, key, index) {
                      return _c(
                        "li",
                        {
                          key: key,
                          staticClass:
                            "flex text-xs items-start justify-start mr-4"
                        },
                        [
                          _c(
                            "div",
                            {
                              staticClass:
                                "mr-1 w-20 flex-shrink-0 text-date-slab"
                            },
                            [_vm._v(_vm._s(note.date))]
                          ),
                          _vm._v(" "),
                          _c("div", { staticClass: "w-full" }, [
                            note.state.length > 0
                              ? _c("span", { staticClass: "font-bold mr-1" }, [
                                  _vm._v("[" + _vm._s(note.state) + "]")
                                ])
                              : _vm._e(),
                            _vm._v(" "),
                            _c("span", [_vm._v(_vm._s(note.notes))]),
                            _vm._v(" "),
                            note.url
                              ? _c("span", [
                                  _c(
                                    "a",
                                    {
                                      staticClass: "underline hover:text-white",
                                      attrs: { href: note.url }
                                    },
                                    [_vm._v("(source)")]
                                  )
                                ])
                              : _vm._e()
                          ])
                        ]
                      )
                    })
                  ],
                  2
                )
              ]
            )
          ],
          1
        )
      : _vm._e(),
    _vm._v(" "),
    _c(
      "div",
      {
        staticClass: "absolute top-0 right-0 z-20 p-2 rounded",
        class: _vm.ui.events || _vm.ui.markers ? "hidden" : "block",
        staticStyle: {
          background: "rgba(0,0,0,0.5)",
          top: "1rem",
          right: "1rem"
        },
        on: {
          click: function($event) {
            _vm.ui.markers = true
          }
        }
      },
      [_vm._v("Markers")]
    ),
    _vm._v(" "),
    _vm.ui.markers
      ? _c(
          "div",
          {
            staticClass: "absolute top-0 bottom-5 inset-x-0 p-2 z-30",
            staticStyle: { background: "rgba(0,0,0,0.75)" }
          },
          [
            _c(
              "div",
              {
                staticClass: "font-bold mb-2 text-right",
                on: {
                  click: function($event) {
                    _vm.ui.markers = false
                  }
                }
              },
              [_vm._v("Close")]
            ),
            _vm._v(" "),
            _c(
              "simplebar",
              {
                staticClass: "p-2 text-sm absolute top-3 bottom-1 inset-x-0",
                staticStyle: { position: "absolute" },
                attrs: { "data-simplebar-auto-hide": "true" }
              },
              [
                _c("div", { staticClass: "text-xs p-2 font-bold" }, [
                  _vm._v("Time Series")
                ]),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    staticClass:
                      "my-1 rounded text-xs p-2 border cursor-pointer",
                    class:
                      _vm.layers && _vm.layers.confirmed
                        ? "bg-heading border-heading text-baseslab"
                        : "text-heading border-heading",
                    on: {
                      click: function($event) {
                        _vm.layers.confirmed = !_vm.layers.confirmed
                      }
                    }
                  },
                  [_vm._v("Total Confirmed Cases")]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    staticClass:
                      "my-1 rounded text-xs p-2 border cursor-pointer",
                    class:
                      _vm.layers && _vm.layers.deaths
                        ? "bg-heading border-heading text-baseslab"
                        : "text-heading border-heading",
                    on: {
                      click: function($event) {
                        _vm.layers.deaths = !_vm.layers.deaths
                      }
                    }
                  },
                  [_vm._v("Total Deaths")]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    staticClass:
                      "my-1 rounded text-xs p-2 border cursor-pointer",
                    class:
                      _vm.layers && _vm.layers.recovered
                        ? "bg-heading border-heading text-baseslab"
                        : "text-heading border-heading",
                    on: {
                      click: function($event) {
                        _vm.layers.recovered = !_vm.layers.recovered
                      }
                    }
                  },
                  [_vm._v("Total Recoveries")]
                ),
                _vm._v(" "),
                _c("div", { staticClass: "text-xs p-2 font-bold" }, [
                  _vm._v("Report")
                ]),
                _vm._v(" "),
                _vm.ajax &&
                _vm.ajax.rankings &&
                _vm.ajax.rankings.confirmedSurge
                  ? _c(
                      "div",
                      {
                        staticClass:
                          "my-1 rounded text-xs p-2 border cursor-pointer",
                        class:
                          _vm.layers && _vm.layers.confirmedSurge
                            ? "bg-heading border-heading text-baseslab"
                            : "text-heading border-heading",
                        on: {
                          click: function($event) {
                            _vm.layers.confirmedSurge = !_vm.layers
                              .confirmedSurge
                          }
                        }
                      },
                      [_vm._v("Surge of new cases (Top 10)")]
                    )
                  : _vm._e()
              ]
            )
          ],
          1
        )
      : _vm._e(),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "bg-slab-primary absolute inset-x-0 bottom-0 h-20 z-40" },
      [
        _c(
          "div",
          { staticClass: "py-2 pb-4 px-4 bg-slab-primary text-xs" },
          [
            _c("span", { staticClass: "font-bold" }, [_vm._v("Select date")]),
            _vm._v(" "),
            _c(
              "v-date-picker",
              {
                attrs: {
                  "min-date": _vm.options.date.min,
                  "max-date": _vm.options.date.max,
                  masks: {
                    data: ["YYYY-MM-DD", "YYYY/MM/DD"],
                    input: ["YYYY-MM-DD", "YYYY/MM/DD"]
                  },
                  popover: { placement: "bottom", visibility: "click" }
                },
                model: {
                  value: _vm.date,
                  callback: function($$v) {
                    _vm.date = $$v
                  },
                  expression: "date"
                }
              },
              [
                _c(
                  "button",
                  {
                    staticClass:
                      "p-2 hover:bg-lightlabel text-white rounded focus:outline-none"
                  },
                  [
                    _c(
                      "svg",
                      {
                        staticClass: "w-4 h-4 fill-current",
                        attrs: {
                          xmlns: "http://www.w3.org/2000/svg",
                          viewBox: "0 0 20 20"
                        }
                      },
                      [
                        _c("path", {
                          attrs: {
                            d:
                              "M1 4c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4zm2 2v12h14V6H3zm2-6h2v2H5V0zm8 0h2v2h-2V0zM5 9h2v2H5V9zm0 4h2v2H5v-2zm4-4h2v2H9V9zm0 4h2v2H9v-2zm4-4h2v2h-2V9zm0 4h2v2h-2v-2z"
                          }
                        })
                      ]
                    )
                  ]
                )
              ]
            ),
            _vm._v(
              " " +
                _vm._s(_vm.moment(_vm.date).format("YYYY-MM-DD")) +
                "\n            "
            ),
            _c("div", { staticClass: "flex w-full items-center" }, [
              !_vm.playing
                ? _c(
                    "div",
                    {
                      staticClass:
                        "text-xs cursor-pointer hover:text-white text-hoverslab",
                      on: {
                        click: function($event) {
                          return _vm.play()
                        }
                      }
                    },
                    [
                      _c(
                        "svg",
                        {
                          staticClass: "w-6 fill-current mr-6",
                          attrs: {
                            xmlns: "http://www.w3.org/2000/svg",
                            "xmlns:xlink": "http://www.w3.org/1999/xlink",
                            viewBox: "0 0 28 28"
                          }
                        },
                        [
                          _c("g", [
                            _c("path", {
                              attrs: {
                                d:
                                  "M22.52,13.47,6.06,2a.54.54,0,0,0-.52,0,.5.5,0,0,0-.27.44V25.62a.5.5,0,0,0,.27.44.46.46,0,0,0,.23.06.53.53,0,0,0,.29-.1L22.52,14.29a.52.52,0,0,0,.21-.41A.51.51,0,0,0,22.52,13.47ZM6.27,24.65V3.34L21.36,13.89Z"
                              }
                            })
                          ])
                        ]
                      )
                    ]
                  )
                : _c(
                    "div",
                    {
                      staticClass:
                        "text-xs cursor-pointer hover:text-white text-hoverslab",
                      on: {
                        click: function($event) {
                          return _vm.pause()
                        }
                      }
                    },
                    [
                      _c(
                        "svg",
                        {
                          staticClass: "w-6 fill-current mr-6",
                          attrs: {
                            xmlns: "http://www.w3.org/2000/svg",
                            "xmlns:xlink": "http://www.w3.org/1999/xlink",
                            viewBox: "0 0 28 28"
                          }
                        },
                        [
                          _c("g", [
                            _c("path", {
                              attrs: {
                                d:
                                  "M12.37,1.88H5.85a.51.51,0,0,0-.5.5V25.62a.51.51,0,0,0,.5.5h6.52a.5.5,0,0,0,.5-.5V2.38A.5.5,0,0,0,12.37,1.88Zm-.5,23.24H6.35V2.88h5.52Z"
                              }
                            }),
                            _c("path", {
                              attrs: {
                                d:
                                  "M22.15,1.88H15.63a.5.5,0,0,0-.5.5V25.62a.5.5,0,0,0,.5.5h6.52a.51.51,0,0,0,.5-.5V2.38A.51.51,0,0,0,22.15,1.88Zm-.5,23.24H16.13V2.88h5.52Z"
                              }
                            })
                          ])
                        ]
                      )
                    ]
                  ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "w-full" },
                [
                  _c("vue-slider", {
                    attrs: { data: _vm.dateSliderRange, adsorb: true },
                    model: {
                      value: _vm.date,
                      callback: function($$v) {
                        _vm.date = $$v
                      },
                      expression: "date"
                    }
                  })
                ],
                1
              )
            ])
          ],
          1
        )
      ]
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/views/MapViewMobile.vue":
/*!**********************************************!*\
  !*** ./resources/js/views/MapViewMobile.vue ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MapViewMobile_vue_vue_type_template_id_71f15a14_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MapViewMobile.vue?vue&type=template&id=71f15a14&scoped=true& */ "./resources/js/views/MapViewMobile.vue?vue&type=template&id=71f15a14&scoped=true&");
/* harmony import */ var _MapViewMobile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MapViewMobile.vue?vue&type=script&lang=js& */ "./resources/js/views/MapViewMobile.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _MapViewMobile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _MapViewMobile_vue_vue_type_template_id_71f15a14_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _MapViewMobile_vue_vue_type_template_id_71f15a14_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "71f15a14",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/MapViewMobile.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/MapViewMobile.vue?vue&type=script&lang=js&":
/*!***********************************************************************!*\
  !*** ./resources/js/views/MapViewMobile.vue?vue&type=script&lang=js& ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MapViewMobile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./MapViewMobile.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/MapViewMobile.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MapViewMobile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/MapViewMobile.vue?vue&type=template&id=71f15a14&scoped=true&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/views/MapViewMobile.vue?vue&type=template&id=71f15a14&scoped=true& ***!
  \*****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MapViewMobile_vue_vue_type_template_id_71f15a14_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./MapViewMobile.vue?vue&type=template&id=71f15a14&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/MapViewMobile.vue?vue&type=template&id=71f15a14&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MapViewMobile_vue_vue_type_template_id_71f15a14_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MapViewMobile_vue_vue_type_template_id_71f15a14_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);