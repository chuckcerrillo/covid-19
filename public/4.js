(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/DashboardView.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/DashboardView.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var simplebar_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! simplebar-vue */ "./node_modules/simplebar-vue/dist/simplebar-vue.esm.js");
/* harmony import */ var _components_Map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Map */ "./resources/js/components/Map.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "DashboardView",
  components: {
    Map: _components_Map__WEBPACK_IMPORTED_MODULE_1__["default"],
    simplebar: simplebar_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  props: ['annotations', 'countries_sorted', 'getDaily', 'database'],
  data: function data() {
    return {
      layers: {
        confirmed: false,
        deaths: false,
        recovered: false,
        confirmedSurge: false
      },
      ajax: {
        rankings: {}
      }
    };
  },
  mounted: function mounted() {
    var _this = this;

    axios.get('/api/stats/rankings').then(function (res) {
      _this.ajax.rankings = res.data;
    })["catch"](function (error) {});
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/DashboardView.vue?vue&type=template&id=e5fdcf6c&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/DashboardView.vue?vue&type=template&id=e5fdcf6c&scoped=true& ***!
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
  return _c(
    "div",
    { staticClass: "h-full relative flex flex-1" },
    [
      _c(
        "keep-alive",
        [
          _c(
            "simplebar",
            {
              staticClass: "h-full w-full",
              attrs: { "data-simplebar-auto-hide": "true" }
            },
            [
              _c("div", { staticClass: "xl:flex items-start" }, [
                _c(
                  "div",
                  { staticClass: "w-full h-64 md:h-120 xl:h-148 wqhd:h-200" },
                  [
                    _c(
                      "keep-alive",
                      [
                        _c("Map", {
                          staticClass:
                            "w-full xl:rounded-lg overflow-hidden h-full",
                          attrs: {
                            id: "world_map",
                            enable: true,
                            data: _vm.countries_sorted,
                            rankings: _vm.ajax.rankings,
                            layers: _vm.layers,
                            settings: { interactive: true, zoom: 1 }
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
                    staticClass:
                      "w-80 flex-shrink-0 rounded bg-hoverslab p-4 ml-4"
                  },
                  [
                    _c("div", { staticClass: "font-bold mb-2" }, [
                      _vm._v("Events")
                    ]),
                    _vm._v(" "),
                    _c(
                      "simplebar",
                      {
                        staticClass:
                          "text-sm h-48 md:h-120 xl:h-132 wqhd:h-184",
                        attrs: { "data-simplebar-auto-hide": "true" }
                      },
                      [
                        _c(
                          "ul",
                          [
                            _vm.annotations.length == 0
                              ? _c("li", { staticClass: "text-xs p-4" }, [
                                  _vm._v(
                                    "\n                                    Nothing to show here.\n                                "
                                  )
                                ])
                              : _vm._e(),
                            _vm._v(" "),
                            _vm._l(_vm.annotations, function(note) {
                              return _c(
                                "li",
                                {
                                  key: _vm.key,
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
                                      ? _c(
                                          "span",
                                          { staticClass: "font-bold mr-1" },
                                          [
                                            _vm._v(
                                              "[" + _vm._s(note.state) + "]"
                                            )
                                          ]
                                        )
                                      : _vm._e(),
                                    _vm._v(" "),
                                    _c("span", [_vm._v(_vm._s(note.notes))]),
                                    _vm._v(" "),
                                    note.url
                                      ? _c("span", [
                                          _c(
                                            "a",
                                            {
                                              staticClass:
                                                "underline hover:text-white",
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
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "flex mt-4" }, [
                _c(
                  "div",
                  {
                    staticClass:
                      "ml-1 rounded text-xs p-2 border cursor-pointer hover:bg-hoverslab hover:text-white",
                    class:
                      _vm.layers && _vm.layers.confirmed
                        ? "border-heading text-white"
                        : "text-lightlabel border-lightslab",
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
                      "ml-1 rounded text-xs p-2 border cursor-pointer hover:bg-hoverslab hover:text-white",
                    class:
                      _vm.layers && _vm.layers.deaths
                        ? "border-heading text-white"
                        : "text-lightlabel border-lightslab",
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
                      "ml-1 rounded text-xs p-2 border cursor-pointer hover:bg-hoverslab hover:text-white",
                    class:
                      _vm.layers && _vm.layers.recovered
                        ? "border-heading text-white"
                        : "text-lightlabel border-lightslab",
                    on: {
                      click: function($event) {
                        _vm.layers.recovered = !_vm.layers.recovered
                      }
                    }
                  },
                  [_vm._v("Total Recoveries")]
                ),
                _vm._v(" "),
                _vm.ajax &&
                _vm.ajax.rankings &&
                _vm.ajax.rankings.confirmedSurge
                  ? _c(
                      "div",
                      {
                        staticClass:
                          "ml-1 rounded text-xs p-2 border cursor-pointer hover:bg-hoverslab hover:text-white",
                        class:
                          _vm.layers && _vm.layers.confirmedSurge
                            ? "border-heading text-white"
                            : "text-lightlabel border-lightslab",
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
              ])
            ]
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/views/DashboardView.vue":
/*!**********************************************!*\
  !*** ./resources/js/views/DashboardView.vue ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DashboardView_vue_vue_type_template_id_e5fdcf6c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DashboardView.vue?vue&type=template&id=e5fdcf6c&scoped=true& */ "./resources/js/views/DashboardView.vue?vue&type=template&id=e5fdcf6c&scoped=true&");
/* harmony import */ var _DashboardView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DashboardView.vue?vue&type=script&lang=js& */ "./resources/js/views/DashboardView.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _DashboardView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _DashboardView_vue_vue_type_template_id_e5fdcf6c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _DashboardView_vue_vue_type_template_id_e5fdcf6c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "e5fdcf6c",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/DashboardView.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/DashboardView.vue?vue&type=script&lang=js&":
/*!***********************************************************************!*\
  !*** ./resources/js/views/DashboardView.vue?vue&type=script&lang=js& ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DashboardView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./DashboardView.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/DashboardView.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DashboardView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/DashboardView.vue?vue&type=template&id=e5fdcf6c&scoped=true&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/views/DashboardView.vue?vue&type=template&id=e5fdcf6c&scoped=true& ***!
  \*****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DashboardView_vue_vue_type_template_id_e5fdcf6c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./DashboardView.vue?vue&type=template&id=e5fdcf6c&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/DashboardView.vue?vue&type=template&id=e5fdcf6c&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DashboardView_vue_vue_type_template_id_e5fdcf6c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DashboardView_vue_vue_type_template_id_e5fdcf6c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);