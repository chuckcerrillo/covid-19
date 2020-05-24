(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/CountryStateItem.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/CountryStateItem.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "CountryStateItem",
  props: ['data', 'country_key', 'compare', 'sidebarExpanded', 'settings'],
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

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Sidebar.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Sidebar.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var simplebar_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! simplebar-vue */ "./node_modules/simplebar-vue/dist/simplebar-vue.esm.js");
/* harmony import */ var _components_CountryStateItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/CountryStateItem */ "./resources/js/components/CountryStateItem.vue");
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



/* harmony default export */ __webpack_exports__["default"] = ({
  name: "Sidebar",
  components: {
    simplebar: simplebar_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    CountryStateItem: _components_CountryStateItem__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  props: ['global', 'sort_stats', 'countriesIndex', 'countries_sorted', 'selectCountry', 'compare'],
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
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/CountryStateItem.vue?vue&type=template&id=32c9afb9&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/CountryStateItem.vue?vue&type=template&id=32c9afb9&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************/
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
            (_vm.isSelected(_vm.data.name, false)
              ? "bg-hoverslab "
              : _vm.country_key % 2 == 1
              ? "bg-slab-primary "
              : "bg-slab-secondary ")
        },
        [
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
                  return _vm.selectCountry(_vm.data["name"], false)
                }
              }
            },
            [_vm._v(_vm._s(_vm.data["name"]))]
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "text-xs pl-2 py-1 w-20",
              on: {
                click: function($event) {
                  return _vm.selectCountry(_vm.data["name"], false)
                }
              }
            },
            [
              _vm._v(
                _vm._s(_vm._f("numeralFormat")(_vm.data["total"]["confirmed"]))
              )
            ]
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "text-xs pl-2 py-1 w-20",
              on: {
                click: function($event) {
                  return _vm.selectCountry(_vm.data["name"], false)
                }
              }
            },
            [
              _vm._v(
                _vm._s(_vm._f("numeralFormat")(_vm.data["total"]["deaths"]))
              )
            ]
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "text-xs pl-2 py-1 w-20",
              on: {
                click: function($event) {
                  return _vm.selectCountry(_vm.data["name"], false)
                }
              }
            },
            [
              _vm._v(
                _vm._s(_vm._f("numeralFormat")(_vm.data["total"]["recovered"]))
              )
            ]
          )
        ]
      ),
      _vm._v(" "),
      _vm._l(_vm.data.states, function(row, key, index) {
        return _c(
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
              (_vm.isSelected(_vm.data.name, row.name)
                ? "bg-hoverslab"
                : "bg-darkslab")
          },
          [
            _c("div", { staticClass: "w-4 p-2 m-1 ml-0" }),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "w-32 px-2",
                on: {
                  click: function($event) {
                    return _vm.selectCountry(_vm.data["name"], row["name"])
                  }
                }
              },
              [_c("div", [_vm._v(_vm._s(row["name"]))])]
            ),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "w-20 pl-2",
                on: {
                  click: function($event) {
                    return _vm.selectCountry(_vm.data["name"], row["name"])
                  }
                }
              },
              [
                _vm._v(
                  _vm._s(
                    _vm._f("numeralFormat")(
                      row.total && row.total.confirmed
                        ? row["total"]["confirmed"]
                        : 0
                    )
                  )
                )
              ]
            ),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "w-20 pl-2",
                on: {
                  click: function($event) {
                    return _vm.selectCountry(_vm.data["name"], row["name"])
                  }
                }
              },
              [
                _vm._v(
                  _vm._s(
                    _vm._f("numeralFormat")(
                      row.total && row.total.deaths ? row["total"]["deaths"] : 0
                    )
                  )
                )
              ]
            ),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "w-20 pl-2",
                on: {
                  click: function($event) {
                    return _vm.selectCountry(_vm.data["name"], row["name"])
                  }
                }
              },
              [
                _vm._v(
                  _vm._s(
                    _vm._f("numeralFormat")(
                      row.total && row.total.recovered
                        ? row["total"]["recovered"]
                        : 0
                    )
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
      })
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Sidebar.vue?vue&type=template&id=81fbb27e&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Sidebar.vue?vue&type=template&id=81fbb27e&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************/
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
      { staticClass: "m-4 mb-0 overflow-hidden bg-lightslab rounded h-56 p-4" },
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
          "overflow-hidden bg-slab rounded m-4 flex flex-col items-start h-full p-4 relative"
      },
      [
        _c("div", {}, [
          _c("div", { staticClass: "tracking-tight font-bold" }, [
            _vm._v("Countries and states "),
            _c("br"),
            _vm._v("(" + _vm._s(_vm.countriesIndex.length) + " total)")
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "text-xs text-right" }, [
            _vm._v(
              "Sorting by " +
                _vm._s(_vm.sort_stats.key) +
                " " +
                _vm._s(_vm.sort_stats.order)
            )
          ]),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass:
                "flex font-bold py-2 text-xs items-center bg-slab-primary"
            },
            [
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
                staticStyle: { position: "absolute" },
                attrs: { "data-simplebar-auto-hide": "false" }
              },
              _vm._l(_vm.countries_sorted, function(data, key, index) {
                return _c("CountryStateItem", {
                  key: key,
                  attrs: {
                    data: data,
                    country_key: key,
                    compare: _vm.compare,
                    settings: { dashboard: false }
                  },
                  on: { selectCountry: _vm.selectCountry }
                })
              }),
              1
            )
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

/***/ "./resources/js/components/CountryStateItem.vue":
/*!******************************************************!*\
  !*** ./resources/js/components/CountryStateItem.vue ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CountryStateItem_vue_vue_type_template_id_32c9afb9_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CountryStateItem.vue?vue&type=template&id=32c9afb9&scoped=true& */ "./resources/js/components/CountryStateItem.vue?vue&type=template&id=32c9afb9&scoped=true&");
/* harmony import */ var _CountryStateItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CountryStateItem.vue?vue&type=script&lang=js& */ "./resources/js/components/CountryStateItem.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _CountryStateItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CountryStateItem_vue_vue_type_template_id_32c9afb9_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _CountryStateItem_vue_vue_type_template_id_32c9afb9_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "32c9afb9",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/CountryStateItem.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/CountryStateItem.vue?vue&type=script&lang=js&":
/*!*******************************************************************************!*\
  !*** ./resources/js/components/CountryStateItem.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CountryStateItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./CountryStateItem.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/CountryStateItem.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CountryStateItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/CountryStateItem.vue?vue&type=template&id=32c9afb9&scoped=true&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/components/CountryStateItem.vue?vue&type=template&id=32c9afb9&scoped=true& ***!
  \*************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CountryStateItem_vue_vue_type_template_id_32c9afb9_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./CountryStateItem.vue?vue&type=template&id=32c9afb9&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/CountryStateItem.vue?vue&type=template&id=32c9afb9&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CountryStateItem_vue_vue_type_template_id_32c9afb9_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CountryStateItem_vue_vue_type_template_id_32c9afb9_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/Sidebar.vue":
/*!*********************************************!*\
  !*** ./resources/js/components/Sidebar.vue ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Sidebar_vue_vue_type_template_id_81fbb27e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Sidebar.vue?vue&type=template&id=81fbb27e&scoped=true& */ "./resources/js/components/Sidebar.vue?vue&type=template&id=81fbb27e&scoped=true&");
/* harmony import */ var _Sidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Sidebar.vue?vue&type=script&lang=js& */ "./resources/js/components/Sidebar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Sidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Sidebar_vue_vue_type_template_id_81fbb27e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Sidebar_vue_vue_type_template_id_81fbb27e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "81fbb27e",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Sidebar.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Sidebar.vue?vue&type=script&lang=js&":
/*!**********************************************************************!*\
  !*** ./resources/js/components/Sidebar.vue?vue&type=script&lang=js& ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Sidebar.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Sidebar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Sidebar.vue?vue&type=template&id=81fbb27e&scoped=true&":
/*!****************************************************************************************!*\
  !*** ./resources/js/components/Sidebar.vue?vue&type=template&id=81fbb27e&scoped=true& ***!
  \****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_template_id_81fbb27e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./Sidebar.vue?vue&type=template&id=81fbb27e&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Sidebar.vue?vue&type=template&id=81fbb27e&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_template_id_81fbb27e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_template_id_81fbb27e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);