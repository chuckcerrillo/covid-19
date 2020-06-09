(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/policies/ComparePolicies.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/policies/ComparePolicies.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var simplebar_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! simplebar-vue */ "./node_modules/simplebar-vue/dist/simplebar-vue.esm.js");
/* harmony import */ var _FullCountry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../FullCountry */ "./resources/js/components/FullCountry.vue");
/* harmony import */ var vue_slider_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue-slider-component */ "./node_modules/vue-slider-component/dist/vue-slider-component.umd.min.js");
/* harmony import */ var vue_slider_component__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(vue_slider_component__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var vue_slider_component_theme_default_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vue-slider-component/theme/default.css */ "./node_modules/vue-slider-component/theme/default.css");
/* harmony import */ var vue_slider_component_theme_default_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(vue_slider_component_theme_default_css__WEBPACK_IMPORTED_MODULE_4__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "Latest",
  components: {
    simplebar: simplebar_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    FullCountry: _FullCountry__WEBPACK_IMPORTED_MODULE_2__["default"],
    VueSlider: vue_slider_component__WEBPACK_IMPORTED_MODULE_3___default.a
  },
  props: ['data', 'settings'],
  data: function data() {
    return {
      growth_factor: [],
      recomputed_data: [],
      expanded: false,
      date: '',
      options: {
        date: {
          min: new Date('2020-01-22'),
          max: false
        }
      }
    };
  },
  created: function created() {
    this.date = this.dateSliderRange[this.dateSliderRange.length - 1];
    this.options.date.max = this.date;
  },
  methods: {
    getDayNotes: function getDayNotes(date) {
      var data = [];

      for (var x in this.annotations) {
        if (this.annotations[x].date == date) {
          data.push(this.annotations[x]);
        }
      }

      return data;
    },
    toggleExpand: function toggleExpand() {
      this.expanded = !this.expanded;
    },
    remove: function remove(item) {
      this.$emit('removeCompare', item);
    },
    dataset: function dataset(x) {
      var data = [];

      if (x >= 0 && this.data && this.data[x]) {
        data.push(_.clone(this.data[x]));
      }

      return data;
    }
  },
  computed: {
    config: function config() {
      return {
        'absolute': this.settings && this.settings.absolute ? this.settings.absolute : false,
        'solo': this.settings && this.settings.solo ? this.settings.solo : false
      };
    },
    comparison: function comparison() {
      // console.log('data');
      // console.log(this.data);
      var data = [];

      for (var x in this.data) {
        if (this.data[x]) {
          var policies = _.cloneDeep(this.data[x]);

          var row = {
            'name': policies.name,
            'stringencyindex': 'N/A',
            'latest': {}
          };

          if (policies && policies.name !== 'Global' && policies.daily) {
            row.latest = _.cloneDeep(policies.daily[this.date].latest);
            row.stringencyindex = _.clone(policies.daily[this.date].stringencyindex);
          }

          var list = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'E1', 'E2', 'E3', 'E4', 'H1', 'H2', 'H3', 'H4', 'H5', 'M1'];

          for (var y in list) {
            var field = _.clone(list[y]);

            if (!row.latest[field]) {
              row.latest[field] = {
                value: false,
                target: false
              };
            }
          }

          data.push(_.cloneDeep(row));
        }
      }

      return data;
    },
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
        data.push(moment__WEBPACK_IMPORTED_MODULE_0___default()(date1.addDays(x)).format('YYYY-MM-DD'));
      }

      return data;
    },
    isMobile: function isMobile() {
      if (screen.width <= 760) {
        return true;
      } else {
        return false;
      }
    }
  },
  watch: {
    date: function date(newValue, oldValue) {
      if (typeof newValue != 'string') {
        this.date = moment__WEBPACK_IMPORTED_MODULE_0___default()(newValue).format('YYYY-MM-DD');
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/policies/GovtResponse.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/policies/GovtResponse.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "GovtResponse",
  props: ['policy'],
  data: function data() {
    return {
      expanded: false
    };
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/PoliciesView.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/PoliciesView.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_policies_ComparePolicies__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/policies/ComparePolicies */ "./resources/js/components/policies/ComparePolicies.vue");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var simplebar_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! simplebar-vue */ "./node_modules/simplebar-vue/dist/simplebar-vue.esm.js");
/* harmony import */ var _components_policies_GovtResponse__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/policies/GovtResponse */ "./resources/js/components/policies/GovtResponse.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "PoliciesView",
  props: ['selectedCompareTab', 'uniqueCountries', 'comparePolicies', 'compareLength', 'database', 'countries', 'compare'],
  data: function data() {
    return {
      expanded: false
    };
  },
  components: {
    ComparePolicies: _components_policies_ComparePolicies__WEBPACK_IMPORTED_MODULE_0__["default"],
    simplebar: simplebar_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
    GovtResponse: _components_policies_GovtResponse__WEBPACK_IMPORTED_MODULE_3__["default"]
  },
  mounted: function mounted() {},
  methods: {
    getGovtResponse: function getGovtResponse(country) {
      if (country) {
        if (this.database && this.database.processed && this.database.processed.oxford && this.database.processed.oxford[country]) {
          return this.database.processed.oxford[country];
        }

        if (this.database.raw.raw_oxford && this.database.raw.raw_oxford.latest && this.database.raw.raw_oxford.latest[country]) {
          return {
            key: this.database.raw.raw_oxford.key,
            latest: this.database.raw.raw_oxford.latest[country],
            daily: this.getDailyGovtResponse(this.database.raw.raw_oxford.daily[country], '2020-01-01', moment__WEBPACK_IMPORTED_MODULE_1___default()().format('YYYY-MM-DD')) // daily: this.database.raw.raw_oxford.daily[country],

          };
        }
      }

      return false;
    },
    getDailyGovtResponse: function getDailyGovtResponse(daily, start_date, end_date) {
      Date.prototype.addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };

      var data = {},
          temp = {};
      var date1 = new Date(start_date);
      var date2 = new Date(end_date);
      date2.setDate(date2.getDate() - 1);
      var daysTotal = (date2.getTime() - date1.getTime()) / (1000 * 3600 * 24);
      var row = {};

      for (var x = 0; x <= daysTotal; x++) {
        var new_date = moment__WEBPACK_IMPORTED_MODULE_1___default()(date1.addDays(x)).format('YYYY-MM-DD');

        if (daily && daily[new_date]) {
          row = {
            date: new_date,
            stringencyindex: false,
            latest: {}
          };

          if (daily[new_date].si) {
            row.stringencyindex = daily[new_date].si;
          }

          for (var y in daily[new_date].policies) {
            row.latest[y] = {
              value: daily[new_date].policies[y].v,
              target: daily[new_date].policies[y].t
            };
          }

          data[new_date] = _.clone(row);
          temp = _.clone(row);
        } else {
          row = _.clone(temp);
          row.date = new_date;
          data[new_date] = _.clone(row);
        }
      }

      return data;
    },
    getLatestGovtResponse: function getLatestGovtResponse(country) {
      var response = this.getGovtResponse(country);
      var data = [];

      if (response && response.latest && response.latest.policies) {
        for (var x in response.latest.policies) {
          var row = response.latest.policies[x];
          var key = response.key[x];
          var target = '';
          var value = row.value;

          if (key && key.values) {
            var help = key.values;
          } else {
            var help = [];
          }

          if (key.hasTarget) {
            if (key.targets && key.targets.length > 0) {
              target = 'Scope: ' + key.targets[row.t];
            } else {
              if (row.t == 1) {
                target = 'Scope: Targeted';
              } else {
                target = 'Scope: General';
              }
            }
          }

          if (row.v.length == 0) {
            value = '';
            target = '';
          } else if (key.type == 'lookup') {
            value = key.values[parseInt(row.v)];
          } else {
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
            notes: row.n
          });
          data = data.sort(function (a, b) {
            return a.id > b.id ? 1 : -1;
          });
        }
      }

      return data;
    }
  },
  computed: {
    isMobile: function isMobile() {
      if (screen.width <= 760) {
        return true;
      } else {
        return false;
      }
    },
    selectedTab: function selectedTab() {
      var selected = 'all';

      if (this.compare && this.compare.length > 0) {
        if (this.selectedCompareTab !== false && this.compare[this.selectedCompareTab]) {
          selected = _.clone(this.compare[this.selectedCompareTab].country);
        }
      }

      return selected;
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/policies/ComparePolicies.vue?vue&type=style&index=0&lang=css&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/policies/ComparePolicies.vue?vue&type=style&index=0&lang=css& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".inner-scrollbar .simplebar-track.simplebar-horizontal {\n  visibility: hidden !important;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/policies/ComparePolicies.vue?vue&type=style&index=0&lang=css&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/policies/ComparePolicies.vue?vue&type=style&index=0&lang=css& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./ComparePolicies.vue?vue&type=style&index=0&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/policies/ComparePolicies.vue?vue&type=style&index=0&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/policies/ComparePolicies.vue?vue&type=template&id=6b9f1a7e&":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/policies/ComparePolicies.vue?vue&type=template&id=6b9f1a7e& ***!
  \***************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "h-full" }, [
    _c(
      "div",
      { staticClass: "m-2 xl:m-4 py-2 pb-4 px-4 bg-slab-primary rounded" },
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
        _c("vue-slider", {
          attrs: { data: _vm.dateSliderRange, lazy: true, adsorb: true },
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
    ),
    _vm._v(" "),
    _c(
      "div",
      {
        staticClass:
          "absolute top-5.5 left-0 right-0 bottom-4.25 xl:bottom-0 m-2 xl:m-4",
        staticStyle: { position: "absolute", top: "5.5rem" }
      },
      [
        _c(
          "simplebar",
          {
            staticClass: "w-full h-full",
            attrs: { "data-simplebar-auto-hide": "false" }
          },
          [
            _c(
              "div",
              {
                staticClass:
                  "flex justify-start rounded-t z-10 relative bg-slab-primary",
                class:
                  "min-w-" +
                  _vm.comparison.length * 32 +
                  " xl:min-w-" +
                  (_vm.comparison.length * 64 + 36)
              },
              [
                _c(
                  "div",
                  {
                    staticClass:
                      "hidden xl:block bg-slab-primary border-lightslab w-36 text-xs font-bold flex-shrink-0"
                  },
                  [
                    _c("div", { staticClass: "px-4 py-2 h-20" }),
                    _vm._v(" "),
                    _c("div", { staticClass: "px-4 py-2" }, [
                      _vm._v("Stringency Index")
                    ])
                  ]
                ),
                _vm._v(" "),
                _vm._l(_vm.comparison, function(row, key, index) {
                  return row
                    ? _c(
                        "div",
                        {
                          key: key,
                          staticClass:
                            "border-l flex-shrink-0\n                        border-lightslab w-32 xl:w-64"
                        },
                        [
                          _c("div", { staticClass: "w-full" }, [
                            _c(
                              "div",
                              {
                                staticClass:
                                  "px-4 py-2 text-sm xl:text-2xl xl:h-12 bg-slab-primary"
                              },
                              [
                                _c(
                                  "div",
                                  { staticClass: "truncate ... font-bold" },
                                  [_vm._v(_vm._s(row.name))]
                                )
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "div",
                              {
                                staticClass:
                                  "px-4 py-2 xl:h-24 text-2xl xl:text-5xl font-bold"
                              },
                              [
                                !isNaN(row.stringencyindex)
                                  ? _c("div", [
                                      _vm._v(
                                        _vm._s(
                                          _vm._f("numeralFormat")(
                                            row.stringencyindex,
                                            "0.00"
                                          )
                                        )
                                      )
                                    ])
                                  : _c("div", [_vm._v("N/A")])
                              ]
                            )
                          ])
                        ]
                      )
                    : _vm._e()
                }),
                _vm._v(" "),
                _c("div", {
                  staticClass:
                    "hidden xl:block px-4 py-2 xl:h-36 border-l border-lightslab"
                })
              ],
              2
            ),
            _vm._v(" "),
            _c(
              "simplebar",
              {
                staticClass:
                  "inner-scrollbar bg-slab rounded absolute inset-x-0 bottom-0 top-5.625 xl:top-9",
                class:
                  "min-w-" +
                  _vm.comparison.length * 32 +
                  " xl:min-w-" +
                  (_vm.comparison.length * 64 + 36),
                staticStyle: { position: "absolute" },
                attrs: { "data-simplebar-auto-hide": "false" }
              },
              [
                _c(
                  "div",
                  {
                    staticClass:
                      "flex justify-start rounded-t z-10 relative bg-slab"
                  },
                  [
                    _c(
                      "div",
                      {
                        staticClass:
                          "hidden xl:block bg-slab-primary justify-start items-end border-b border-lightslab w-36 text-xs font-bold flex-shrink-0"
                      },
                      [
                        _c(
                          "div",
                          {
                            staticClass:
                              "px-4 py-2 h-16 bg-darkslab border-b border-slab"
                          },
                          [_vm._v("Containment and closure")]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "px-4 py-2 h-24 border-b border-slab"
                          },
                          [_vm._v("C1 - Schools")]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "px-4 py-2 h-24 border-b border-slab"
                          },
                          [_vm._v("C2 - Workplaces")]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "px-4 py-2 h-24 border-b border-slab"
                          },
                          [_vm._v("C3 - Public events")]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "px-4 py-2 h-24 border-b border-slab"
                          },
                          [_vm._v("C4 - Restrictions on gatherings")]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "px-4 py-2 h-28 border-b border-slab"
                          },
                          [_vm._v("C5 - Public transport")]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "px-4 py-2 h-28 border-b border-slab"
                          },
                          [_vm._v("C6 - Stay at home")]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "px-4 py-2 h-28 border-b border-slab"
                          },
                          [_vm._v("C7 - Internal movements")]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "px-4 py-2 h-16 border-b border-slab"
                          },
                          [_vm._v("C8 - International travel")]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass:
                              "px-4 py-2 h-16 bg-darkslab border-b border-slab"
                          },
                          [_vm._v("Economic response")]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "px-4 py-2 h-28 border-b border-slab"
                          },
                          [_vm._v("E1 - Income support")]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "px-4 py-2 h-20 border-b border-slab"
                          },
                          [_vm._v("E2 - Debt/contract relief")]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "px-4 py-2 h-20 border-b border-slab"
                          },
                          [_vm._v("E3 - Fiscal measures")]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "px-4 py-2 h-20 border-b border-slab"
                          },
                          [_vm._v("E4 - International support")]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass:
                              "px-4 py-2 h-16 bg-darkslab border-b border-slab"
                          },
                          [_vm._v("Health systems")]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "px-4 py-2 h-24 border-b border-slab"
                          },
                          [_vm._v("H1 - Public information campaign")]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "px-4 py-2 h-32 border-b border-slab"
                          },
                          [_vm._v("H2 - Testing policy")]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "px-4 py-2 h-20 border-b border-slab"
                          },
                          [_vm._v("H3 - Contact tracing")]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "px-4 py-2 h-20 border-b border-slab"
                          },
                          [_vm._v("H4 - Emergency healthcare investment")]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "px-4 py-2 h-20 border-b border-slab"
                          },
                          [_vm._v("H5 - COVID-19 vaccine investment")]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass:
                              "px-4 py-2 h-16 bg-darkslab border-b border-slab"
                          },
                          [_vm._v("Miscellaneous")]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "px-4 py-2 h-24 border-b border-slab"
                          },
                          [_vm._v("M1 - Other responses")]
                        )
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "flex-shrink-0 flex" },
                      [
                        _vm._l(_vm.comparison, function(row, key, index) {
                          return row
                            ? _c(
                                "div",
                                {
                                  key: index,
                                  staticClass:
                                    "border-l border-b border-lightslab flex-shrink-0 w-32 xl:w-64"
                                },
                                [
                                  _c(
                                    "div",
                                    {
                                      class:
                                        index % 2 == 1 ? "bg-slab-primary" : ""
                                    },
                                    [
                                      _c("div", { staticClass: "w-full" }, [
                                        _c(
                                          "div",
                                          {
                                            staticClass:
                                              "px-4 py-2 xl:h-16 bg-darkslab border-b border-lightslab"
                                          },
                                          [
                                            _c(
                                              "div",
                                              {
                                                staticClass: "xl:hidden text-xs"
                                              },
                                              [
                                                _vm._v(
                                                  "Containment and closure"
                                                )
                                              ]
                                            )
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          {
                                            staticClass:
                                              "px-4 py-2 h-24 border-b border-lightslab"
                                          },
                                          [
                                            _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "xl:hidden text-xss text-lightlabel xl:text-xs font-bold"
                                              },
                                              [_vm._v("C1 - Schools")]
                                            ),
                                            _vm._v(" "),
                                            row.latest.C1.value && _vm.isMobile
                                              ? _c(
                                                  "div",
                                                  { staticClass: "text-xs" },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        row.latest.C1.value
                                                      )
                                                    )
                                                  ]
                                                )
                                              : row.latest.C1.value &&
                                                row.latest.C1.value.length > 60
                                              ? _c(
                                                  "div",
                                                  { staticClass: "text-xs" },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        row.latest.C1.value
                                                      )
                                                    )
                                                  ]
                                                )
                                              : row.latest.C1.value &&
                                                row.latest.C1.value.length > 30
                                              ? _c(
                                                  "div",
                                                  { staticClass: "text-sm" },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        row.latest.C1.value
                                                      )
                                                    )
                                                  ]
                                                )
                                              : row.latest.C1.value &&
                                                row.latest.C1.value
                                              ? _c("div", [
                                                  _vm._v(
                                                    _vm._s(row.latest.C1.value)
                                                  )
                                                ])
                                              : _c("div", [_vm._v("N/A")]),
                                            _vm._v(" "),
                                            row.latest.C1.target
                                              ? _c(
                                                  "div",
                                                  {
                                                    staticClass:
                                                      "text-xs text-lightlabel"
                                                  },
                                                  [
                                                    _vm._v(
                                                      "(" +
                                                        _vm._s(
                                                          row.latest.C1.target
                                                        ) +
                                                        ")"
                                                    )
                                                  ]
                                                )
                                              : _vm._e()
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          {
                                            staticClass:
                                              "px-4 py-2 h-36 xl:h-24 border-b border-lightslab"
                                          },
                                          [
                                            _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "xl:hidden text-xss text-lightlabel xl:text-xs font-bold"
                                              },
                                              [_vm._v("C2 - Workplaces")]
                                            ),
                                            _vm._v(" "),
                                            row.latest.C2.value && _vm.isMobile
                                              ? _c(
                                                  "div",
                                                  { staticClass: "text-xs" },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        row.latest.C2.value
                                                      )
                                                    )
                                                  ]
                                                )
                                              : row.latest.C2.value &&
                                                row.latest.C2.value.length > 60
                                              ? _c(
                                                  "div",
                                                  { staticClass: "text-xs" },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        row.latest.C2.value
                                                      )
                                                    )
                                                  ]
                                                )
                                              : row.latest.C2.value &&
                                                row.latest.C2.value.length > 30
                                              ? _c(
                                                  "div",
                                                  { staticClass: "text-sm" },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        row.latest.C2.value
                                                      )
                                                    )
                                                  ]
                                                )
                                              : row.latest.C2.value &&
                                                row.latest.C2.value
                                              ? _c("div", [
                                                  _vm._v(
                                                    _vm._s(row.latest.C2.value)
                                                  )
                                                ])
                                              : _c("div", [_vm._v("N/A")]),
                                            _vm._v(" "),
                                            row.latest.C2.target
                                              ? _c(
                                                  "div",
                                                  {
                                                    staticClass:
                                                      "text-xs text-lightlabel"
                                                  },
                                                  [
                                                    _vm._v(
                                                      "(" +
                                                        _vm._s(
                                                          row.latest.C2.target
                                                        ) +
                                                        ")"
                                                    )
                                                  ]
                                                )
                                              : _vm._e()
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          {
                                            staticClass:
                                              "px-4 py-2 h-24 border-b border-lightslab"
                                          },
                                          [
                                            _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "xl:hidden text-xss text-lightlabel xl:text-xs font-bold"
                                              },
                                              [_vm._v("C3 - Public events")]
                                            ),
                                            _vm._v(" "),
                                            row.latest.C3.value && _vm.isMobile
                                              ? _c(
                                                  "div",
                                                  { staticClass: "text-xs" },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        row.latest.C3.value
                                                      )
                                                    )
                                                  ]
                                                )
                                              : row.latest.C3.value &&
                                                row.latest.C3.value.length > 60
                                              ? _c(
                                                  "div",
                                                  { staticClass: "text-xs" },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        row.latest.C3.value
                                                      )
                                                    )
                                                  ]
                                                )
                                              : row.latest.C3.value &&
                                                row.latest.C3.value.length > 30
                                              ? _c(
                                                  "div",
                                                  { staticClass: "text-sm" },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        row.latest.C3.value
                                                      )
                                                    )
                                                  ]
                                                )
                                              : row.latest.C3.value &&
                                                row.latest.C3.value
                                              ? _c("div", [
                                                  _vm._v(
                                                    _vm._s(row.latest.C3.value)
                                                  )
                                                ])
                                              : _c("div", [_vm._v("N/A")]),
                                            _vm._v(" "),
                                            row.latest.C3.target
                                              ? _c(
                                                  "div",
                                                  {
                                                    staticClass:
                                                      "text-xs text-lightlabel"
                                                  },
                                                  [
                                                    _vm._v(
                                                      "(" +
                                                        _vm._s(
                                                          row.latest.C3.target
                                                        ) +
                                                        ")"
                                                    )
                                                  ]
                                                )
                                              : _vm._e()
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          {
                                            staticClass:
                                              "px-4 py-2 h-32 xl:h-24 border-b border-lightslab"
                                          },
                                          [
                                            _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "xl:hidden text-xss text-lightlabel xl:text-xs font-bold"
                                              },
                                              [
                                                _vm._v(
                                                  "C4 - Restrictions on gatherings"
                                                )
                                              ]
                                            ),
                                            _vm._v(" "),
                                            row.latest.C4.value && _vm.isMobile
                                              ? _c(
                                                  "div",
                                                  { staticClass: "text-xs" },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        row.latest.C4.value
                                                      )
                                                    )
                                                  ]
                                                )
                                              : row.latest.C4.value &&
                                                row.latest.C4.value.length > 60
                                              ? _c(
                                                  "div",
                                                  { staticClass: "text-xs" },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        row.latest.C4.value
                                                      )
                                                    )
                                                  ]
                                                )
                                              : row.latest.C4.value &&
                                                row.latest.C4.value.length > 30
                                              ? _c(
                                                  "div",
                                                  { staticClass: "text-sm" },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        row.latest.C4.value
                                                      )
                                                    )
                                                  ]
                                                )
                                              : row.latest.C4.value &&
                                                row.latest.C4.value
                                              ? _c("div", [
                                                  _vm._v(
                                                    _vm._s(row.latest.C4.value)
                                                  )
                                                ])
                                              : _c("div", [_vm._v("N/A")]),
                                            _vm._v(" "),
                                            row.latest.C4.target
                                              ? _c(
                                                  "div",
                                                  {
                                                    staticClass:
                                                      "text-xs text-lightlabel"
                                                  },
                                                  [
                                                    _vm._v(
                                                      "(" +
                                                        _vm._s(
                                                          row.latest.C4.target
                                                        ) +
                                                        ")"
                                                    )
                                                  ]
                                                )
                                              : _vm._e()
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          {
                                            staticClass:
                                              "px-4 py-2 h-48 xl:h-28 border-b border-lightslab"
                                          },
                                          [
                                            _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "xl:hidden text-xss text-lightlabel xl:text-xs font-bold"
                                              },
                                              [_vm._v("C5 - Public transport")]
                                            ),
                                            _vm._v(" "),
                                            row.latest.C5.value && _vm.isMobile
                                              ? _c(
                                                  "div",
                                                  { staticClass: "text-xs" },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        row.latest.C5.value
                                                      )
                                                    )
                                                  ]
                                                )
                                              : row.latest.C5.value &&
                                                row.latest.C5.value.length > 60
                                              ? _c(
                                                  "div",
                                                  { staticClass: "text-xs" },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        row.latest.C5.value
                                                      )
                                                    )
                                                  ]
                                                )
                                              : row.latest.C5.value &&
                                                row.latest.C5.value.length > 30
                                              ? _c(
                                                  "div",
                                                  { staticClass: "text-sm" },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        row.latest.C5.value
                                                      )
                                                    )
                                                  ]
                                                )
                                              : row.latest.C5.value &&
                                                row.latest.C5.value
                                              ? _c("div", [
                                                  _vm._v(
                                                    _vm._s(row.latest.C5.value)
                                                  )
                                                ])
                                              : _c("div", [_vm._v("N/A")]),
                                            _vm._v(" "),
                                            row.latest.C5.target
                                              ? _c(
                                                  "div",
                                                  {
                                                    staticClass:
                                                      "text-xs text-lightlabel"
                                                  },
                                                  [
                                                    _vm._v(
                                                      "(" +
                                                        _vm._s(
                                                          row.latest.C5.target
                                                        ) +
                                                        ")"
                                                    )
                                                  ]
                                                )
                                              : _vm._e()
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          {
                                            staticClass:
                                              "px-4 py-2 h-60 xl:h-28 border-b border-lightslab"
                                          },
                                          [
                                            _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "xl:hidden text-xss text-lightlabel xl:text-xs font-bold"
                                              },
                                              [_vm._v("C6 - Stay at home")]
                                            ),
                                            _vm._v(" "),
                                            row.latest.C6.value && _vm.isMobile
                                              ? _c(
                                                  "div",
                                                  { staticClass: "text-xs" },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        row.latest.C6.value
                                                      )
                                                    )
                                                  ]
                                                )
                                              : row.latest.C6.value &&
                                                row.latest.C6.value.length > 60
                                              ? _c(
                                                  "div",
                                                  { staticClass: "text-xs" },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        row.latest.C6.value
                                                      )
                                                    )
                                                  ]
                                                )
                                              : row.latest.C6.value &&
                                                row.latest.C6.value.length > 30
                                              ? _c(
                                                  "div",
                                                  { staticClass: "text-sm" },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        row.latest.C6.value
                                                      )
                                                    )
                                                  ]
                                                )
                                              : row.latest.C6.value &&
                                                row.latest.C6.value
                                              ? _c("div", [
                                                  _vm._v(
                                                    _vm._s(row.latest.C6.value)
                                                  )
                                                ])
                                              : _c("div", [_vm._v("N/A")]),
                                            _vm._v(" "),
                                            row.latest.C6.target
                                              ? _c(
                                                  "div",
                                                  {
                                                    staticClass:
                                                      "text-xs text-lightlabel"
                                                  },
                                                  [
                                                    _vm._v(
                                                      "(" +
                                                        _vm._s(
                                                          row.latest.C6.target
                                                        ) +
                                                        ")"
                                                    )
                                                  ]
                                                )
                                              : _vm._e()
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          {
                                            staticClass:
                                              "px-4 py-2 h-36 xl:h-28 border-b border-lightslab"
                                          },
                                          [
                                            _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "xl:hidden text-xss text-lightlabel xl:text-xs font-bold"
                                              },
                                              [
                                                _vm._v(
                                                  "C7 - Internal movements"
                                                )
                                              ]
                                            ),
                                            _vm._v(" "),
                                            row.latest.C7.value && _vm.isMobile
                                              ? _c(
                                                  "div",
                                                  { staticClass: "text-xs" },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        row.latest.C7.value
                                                      )
                                                    )
                                                  ]
                                                )
                                              : row.latest.C7.value &&
                                                row.latest.C7.value.length > 60
                                              ? _c(
                                                  "div",
                                                  { staticClass: "text-xs" },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        row.latest.C7.value
                                                      )
                                                    )
                                                  ]
                                                )
                                              : row.latest.C7.value &&
                                                row.latest.C7.value.length > 30
                                              ? _c(
                                                  "div",
                                                  { staticClass: "text-sm" },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        row.latest.C7.value
                                                      )
                                                    )
                                                  ]
                                                )
                                              : row.latest.C7.value &&
                                                row.latest.C7.value
                                              ? _c("div", [
                                                  _vm._v(
                                                    _vm._s(row.latest.C7.value)
                                                  )
                                                ])
                                              : _c("div", [_vm._v("N/A")]),
                                            _vm._v(" "),
                                            row.latest.C7.target
                                              ? _c(
                                                  "div",
                                                  {
                                                    staticClass:
                                                      "text-xs text-lightlabel"
                                                  },
                                                  [
                                                    _vm._v(
                                                      "(" +
                                                        _vm._s(
                                                          row.latest.C7.target
                                                        ) +
                                                        ")"
                                                    )
                                                  ]
                                                )
                                              : _vm._e()
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          {
                                            staticClass:
                                              "px-4 py-2 h-24 xl:h-16 border-b border-lightslab"
                                          },
                                          [
                                            _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "xl:hidden text-xss text-lightlabel xl:text-xs font-bold"
                                              },
                                              [
                                                _vm._v(
                                                  "C8 - International travel"
                                                )
                                              ]
                                            ),
                                            _vm._v(" "),
                                            row.latest.C8.value && _vm.isMobile
                                              ? _c(
                                                  "div",
                                                  { staticClass: "text-xs" },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        row.latest.C8.value
                                                      )
                                                    )
                                                  ]
                                                )
                                              : row.latest.C8.value &&
                                                row.latest.C8.value.length > 60
                                              ? _c(
                                                  "div",
                                                  { staticClass: "text-xs" },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        row.latest.C8.value
                                                      )
                                                    )
                                                  ]
                                                )
                                              : row.latest.C8.value &&
                                                row.latest.C8.value.length > 30
                                              ? _c(
                                                  "div",
                                                  { staticClass: "text-sm" },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        row.latest.C8.value
                                                      )
                                                    )
                                                  ]
                                                )
                                              : row.latest.C8.value &&
                                                row.latest.C8.value
                                              ? _c("div", [
                                                  _vm._v(
                                                    _vm._s(row.latest.C8.value)
                                                  )
                                                ])
                                              : _c("div", [_vm._v("N/A")])
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          {
                                            staticClass:
                                              "px-4 py-2 xl:h-16 bg-darkslab border-b border-lightslab"
                                          },
                                          [
                                            _c(
                                              "div",
                                              {
                                                staticClass: "xl:hidden text-xs"
                                              },
                                              [_vm._v("Economic response")]
                                            )
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          {
                                            staticClass:
                                              "px-4 py-2 h-56 xl:h-28 border-b border-lightslab"
                                          },
                                          [
                                            _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "xl:hidden text-xss text-lightlabel xl:text-xs font-bold"
                                              },
                                              [_vm._v("E1 - Income support")]
                                            ),
                                            _vm._v(" "),
                                            row.latest.E1.value && _vm.isMobile
                                              ? _c(
                                                  "div",
                                                  { staticClass: "text-xs" },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        row.latest.E1.value
                                                      )
                                                    )
                                                  ]
                                                )
                                              : row.latest.E1.value &&
                                                row.latest.E1.value.length > 60
                                              ? _c(
                                                  "div",
                                                  { staticClass: "text-xs" },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        row.latest.E1.value
                                                      )
                                                    )
                                                  ]
                                                )
                                              : row.latest.E1.value &&
                                                row.latest.E1.value.length > 30
                                              ? _c(
                                                  "div",
                                                  { staticClass: "text-sm" },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        row.latest.E1.value
                                                      )
                                                    )
                                                  ]
                                                )
                                              : row.latest.E1.value &&
                                                row.latest.E1.value
                                              ? _c("div", [
                                                  _vm._v(
                                                    _vm._s(row.latest.E1.value)
                                                  )
                                                ])
                                              : _c("div", [_vm._v("N/A")]),
                                            _vm._v(" "),
                                            row.latest.E1.target
                                              ? _c(
                                                  "div",
                                                  {
                                                    staticClass:
                                                      "text-xs text-lightlabel"
                                                  },
                                                  [
                                                    _vm._v(
                                                      "(" +
                                                        _vm._s(
                                                          row.latest.E1.target
                                                        ) +
                                                        ")"
                                                    )
                                                  ]
                                                )
                                              : _vm._e()
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          {
                                            staticClass:
                                              "px-4 py-2 h-28 xl:h-20 border-b border-lightslab"
                                          },
                                          [
                                            _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "xl:hidden text-xss text-lightlabel xl:text-xs font-bold"
                                              },
                                              [
                                                _vm._v(
                                                  "E2 - Debt / contract relief"
                                                )
                                              ]
                                            ),
                                            _vm._v(" "),
                                            row.latest.E2.value && _vm.isMobile
                                              ? _c(
                                                  "div",
                                                  { staticClass: "text-xs" },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        row.latest.E2.value
                                                      )
                                                    )
                                                  ]
                                                )
                                              : row.latest.E2.value &&
                                                row.latest.E2.value.length > 60
                                              ? _c(
                                                  "div",
                                                  { staticClass: "text-xs" },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        row.latest.E2.value
                                                      )
                                                    )
                                                  ]
                                                )
                                              : row.latest.E2.value &&
                                                row.latest.E2.value.length > 30
                                              ? _c(
                                                  "div",
                                                  { staticClass: "text-sm" },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        row.latest.E2.value
                                                      )
                                                    )
                                                  ]
                                                )
                                              : row.latest.E2.value &&
                                                row.latest.E2.value
                                              ? _c("div", [
                                                  _vm._v(
                                                    _vm._s(row.latest.E2.value)
                                                  )
                                                ])
                                              : _c("div", [_vm._v("N/A")])
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          {
                                            staticClass:
                                              "px-4 py-2 h-20 border-b border-lightslab"
                                          },
                                          [
                                            _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "xl:hidden text-xss text-lightlabel xl:text-xs font-bold"
                                              },
                                              [_vm._v("E3 - Fiscal measures")]
                                            ),
                                            _vm._v(" "),
                                            _vm.isMobile &&
                                            row.latest.E3.value >= 1000000000000
                                              ? _c("div", [
                                                  _vm._v(
                                                    "US$" +
                                                      _vm._s(
                                                        _vm._f("numeralFormat")(
                                                          row.latest.E3.value /
                                                            1000000000000,
                                                          "0,000.00"
                                                        )
                                                      ) +
                                                      "T"
                                                  )
                                                ])
                                              : _vm.isMobile &&
                                                row.latest.E3.value >=
                                                  1000000000
                                              ? _c("div", [
                                                  _vm._v(
                                                    "US$" +
                                                      _vm._s(
                                                        _vm._f("numeralFormat")(
                                                          row.latest.E3.value /
                                                            1000000000,
                                                          "0,000.00"
                                                        )
                                                      ) +
                                                      "B"
                                                  )
                                                ])
                                              : _vm.isMobile &&
                                                row.latest.E3.value >= 1000000
                                              ? _c("div", [
                                                  _vm._v(
                                                    "US$" +
                                                      _vm._s(
                                                        _vm._f("numeralFormat")(
                                                          row.latest.E3.value /
                                                            1000000,
                                                          "0,000.00"
                                                        )
                                                      ) +
                                                      "M"
                                                  )
                                                ])
                                              : _vm.isMobile &&
                                                row.latest.E3.value >= 1000
                                              ? _c("div", [
                                                  _vm._v(
                                                    "US$" +
                                                      _vm._s(
                                                        _vm._f("numeralFormat")(
                                                          row.latest.E3.value /
                                                            1000,
                                                          "0,000.00"
                                                        )
                                                      ) +
                                                      "K"
                                                  )
                                                ])
                                              : row.latest.E3.value
                                              ? _c("div", [
                                                  _vm._v(
                                                    "US$" +
                                                      _vm._s(
                                                        _vm._f("numeralFormat")(
                                                          row.latest.E3.value,
                                                          "0,000.00"
                                                        )
                                                      )
                                                  )
                                                ])
                                              : _c("div", [_vm._v("N/A")])
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          {
                                            staticClass:
                                              "px-4 py-2 h-20 border-b border-lightslab"
                                          },
                                          [
                                            _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "xl:hidden text-xss text-lightlabel xl:text-xs font-bold"
                                              },
                                              [
                                                _vm._v(
                                                  "E4 - International support"
                                                )
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _vm.isMobile &&
                                            row.latest.E4.value >= 1000000000000
                                              ? _c("div", [
                                                  _vm._v(
                                                    "US$" +
                                                      _vm._s(
                                                        _vm._f("numeralFormat")(
                                                          row.latest.E4.value /
                                                            1000000000000,
                                                          "0,000.00"
                                                        )
                                                      ) +
                                                      "T"
                                                  )
                                                ])
                                              : _vm.isMobile &&
                                                row.latest.E4.value >=
                                                  1000000000
                                              ? _c("div", [
                                                  _vm._v(
                                                    "US$" +
                                                      _vm._s(
                                                        _vm._f("numeralFormat")(
                                                          row.latest.E4.value /
                                                            1000000000,
                                                          "0,000.00"
                                                        )
                                                      ) +
                                                      "B"
                                                  )
                                                ])
                                              : _vm.isMobile &&
                                                row.latest.E4.value >= 1000000
                                              ? _c("div", [
                                                  _vm._v(
                                                    "US$" +
                                                      _vm._s(
                                                        _vm._f("numeralFormat")(
                                                          row.latest.E4.value /
                                                            1000000,
                                                          "0,000.00"
                                                        )
                                                      ) +
                                                      "M"
                                                  )
                                                ])
                                              : _vm.isMobile &&
                                                row.latest.E4.value >= 1000
                                              ? _c("div", [
                                                  _vm._v(
                                                    "US$" +
                                                      _vm._s(
                                                        _vm._f("numeralFormat")(
                                                          row.latest.E4.value /
                                                            1000,
                                                          "0,000.00"
                                                        )
                                                      ) +
                                                      "K"
                                                  )
                                                ])
                                              : row.latest.E4.value
                                              ? _c("div", [
                                                  _vm._v(
                                                    "US$" +
                                                      _vm._s(
                                                        _vm._f("numeralFormat")(
                                                          row.latest.E4.value,
                                                          "0,000.00"
                                                        )
                                                      )
                                                  )
                                                ])
                                              : _c("div", [_vm._v("N/A")])
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          {
                                            staticClass:
                                              "px-4 py-2 xl:h-16 bg-darkslab border-b border-lightslab"
                                          },
                                          [
                                            _c(
                                              "div",
                                              {
                                                staticClass: "xl:hidden text-xs"
                                              },
                                              [_vm._v("Health systems")]
                                            )
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          {
                                            staticClass:
                                              "px-4 py-2 h-48 xl:h-24 border-b border-lightslab"
                                          },
                                          [
                                            _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "xl:hidden text-xss text-lightlabel xl:text-xs font-bold"
                                              },
                                              [
                                                _vm._v(
                                                  "H1 - Public information campaign"
                                                )
                                              ]
                                            ),
                                            _vm._v(" "),
                                            row.latest.H1.value && _vm.isMobile
                                              ? _c(
                                                  "div",
                                                  { staticClass: "text-xs" },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        row.latest.H1.value
                                                      )
                                                    )
                                                  ]
                                                )
                                              : row.latest.H1.value &&
                                                row.latest.H1.value.length > 60
                                              ? _c(
                                                  "div",
                                                  { staticClass: "text-xs" },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        row.latest.H1.value
                                                      )
                                                    )
                                                  ]
                                                )
                                              : row.latest.H1.value &&
                                                row.latest.H1.value.length > 30
                                              ? _c(
                                                  "div",
                                                  { staticClass: "text-sm" },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        row.latest.H1.value
                                                      )
                                                    )
                                                  ]
                                                )
                                              : row.latest.H1.value &&
                                                row.latest.H1.value
                                              ? _c("div", [
                                                  _vm._v(
                                                    _vm._s(row.latest.H1.value)
                                                  )
                                                ])
                                              : _c("div", [_vm._v("N/A")]),
                                            _vm._v(" "),
                                            row.latest.H1.target
                                              ? _c(
                                                  "div",
                                                  {
                                                    staticClass:
                                                      "text-xs text-lightlabel"
                                                  },
                                                  [
                                                    _vm._v(
                                                      "(" +
                                                        _vm._s(
                                                          row.latest.H1.target
                                                        ) +
                                                        ")"
                                                    )
                                                  ]
                                                )
                                              : _vm._e()
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          {
                                            staticClass:
                                              "px-4 py-2 h-40 xl:h-32 border-b border-lightslab"
                                          },
                                          [
                                            _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "xl:hidden text-xss text-lightlabel xl:text-xs font-bold"
                                              },
                                              [_vm._v("H2 - Testing policy")]
                                            ),
                                            _vm._v(" "),
                                            row.latest.H2.value && _vm.isMobile
                                              ? _c(
                                                  "div",
                                                  { staticClass: "text-xs" },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        row.latest.H2.value
                                                      )
                                                    )
                                                  ]
                                                )
                                              : row.latest.H2.value &&
                                                row.latest.H2.value.length > 60
                                              ? _c(
                                                  "div",
                                                  { staticClass: "text-xs" },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        row.latest.H2.value
                                                      )
                                                    )
                                                  ]
                                                )
                                              : row.latest.H2.value &&
                                                row.latest.H2.value.length > 30
                                              ? _c(
                                                  "div",
                                                  { staticClass: "text-sm" },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        row.latest.H2.value
                                                      )
                                                    )
                                                  ]
                                                )
                                              : row.latest.H2.value &&
                                                row.latest.H2.value
                                              ? _c("div", [
                                                  _vm._v(
                                                    _vm._s(row.latest.H2.value)
                                                  )
                                                ])
                                              : _c("div", [_vm._v("N/A")])
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          {
                                            staticClass:
                                              "px-4 py-2 h-28 xl:h-20 border-b border-lightslab"
                                          },
                                          [
                                            _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "xl:hidden text-xss text-lightlabel xl:text-xs font-bold"
                                              },
                                              [_vm._v("H3 - Contact tracing")]
                                            ),
                                            _vm._v(" "),
                                            row.latest.H3.value && _vm.isMobile
                                              ? _c(
                                                  "div",
                                                  { staticClass: "text-xs" },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        row.latest.H3.value
                                                      )
                                                    )
                                                  ]
                                                )
                                              : row.latest.H3.value &&
                                                row.latest.H3.value.length > 60
                                              ? _c(
                                                  "div",
                                                  { staticClass: "text-xs" },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        row.latest.H3.value
                                                      )
                                                    )
                                                  ]
                                                )
                                              : row.latest.H3.value &&
                                                row.latest.H3.value.length > 30
                                              ? _c(
                                                  "div",
                                                  { staticClass: "text-sm" },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        row.latest.H3.value
                                                      )
                                                    )
                                                  ]
                                                )
                                              : row.latest.H3.value &&
                                                row.latest.H3.value
                                              ? _c("div", [
                                                  _vm._v(
                                                    _vm._s(row.latest.H3.value)
                                                  )
                                                ])
                                              : _c("div", [_vm._v("N/A")])
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          {
                                            staticClass:
                                              "px-4 py-2 h-24 xl:h-20 border-b border-lightslab"
                                          },
                                          [
                                            _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "xl:hidden text-xss text-lightlabel xl:text-xs font-bold"
                                              },
                                              [
                                                _vm._v(
                                                  "H4 - Emergency healthcare investment"
                                                )
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _vm.isMobile &&
                                            row.latest.H4.value >= 1000000000000
                                              ? _c("div", [
                                                  _vm._v(
                                                    "US$" +
                                                      _vm._s(
                                                        _vm._f("numeralFormat")(
                                                          row.latest.H4.value /
                                                            1000000000000,
                                                          "0,000.00"
                                                        )
                                                      ) +
                                                      "T"
                                                  )
                                                ])
                                              : _vm.isMobile &&
                                                row.latest.H4.value >=
                                                  1000000000
                                              ? _c("div", [
                                                  _vm._v(
                                                    "US$" +
                                                      _vm._s(
                                                        _vm._f("numeralFormat")(
                                                          row.latest.H4.value /
                                                            1000000000,
                                                          "0,000.00"
                                                        )
                                                      ) +
                                                      "B"
                                                  )
                                                ])
                                              : _vm.isMobile &&
                                                row.latest.H4.value >= 1000000
                                              ? _c("div", [
                                                  _vm._v(
                                                    "US$" +
                                                      _vm._s(
                                                        _vm._f("numeralFormat")(
                                                          row.latest.H4.value /
                                                            1000000,
                                                          "0,000.00"
                                                        )
                                                      ) +
                                                      "M"
                                                  )
                                                ])
                                              : _vm.isMobile &&
                                                row.latest.H4.value >= 1000
                                              ? _c("div", [
                                                  _vm._v(
                                                    "US$" +
                                                      _vm._s(
                                                        _vm._f("numeralFormat")(
                                                          row.latest.H4.value /
                                                            1000,
                                                          "0,000.00"
                                                        )
                                                      ) +
                                                      "K"
                                                  )
                                                ])
                                              : row.latest.H4.value
                                              ? _c("div", [
                                                  _vm._v(
                                                    "US$" +
                                                      _vm._s(
                                                        _vm._f("numeralFormat")(
                                                          row.latest.H4.value,
                                                          "0,000.00"
                                                        )
                                                      )
                                                  )
                                                ])
                                              : _c("div", [_vm._v("N/A")])
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          {
                                            staticClass:
                                              "px-4 py-2 h-24 xl:h-20 border-b border-lightslab"
                                          },
                                          [
                                            _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "xl:hidden text-xss text-lightlabel xl:text-xs font-bold"
                                              },
                                              [
                                                _vm._v(
                                                  "H5 - COVID-19 vaccine investment"
                                                )
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _vm.isMobile &&
                                            row.latest.H5.value >= 1000000000000
                                              ? _c("div", [
                                                  _vm._v(
                                                    "US$" +
                                                      _vm._s(
                                                        _vm._f("numeralFormat")(
                                                          row.latest.H5.value /
                                                            1000000000000,
                                                          "0,000.00"
                                                        )
                                                      ) +
                                                      "T"
                                                  )
                                                ])
                                              : _vm.isMobile &&
                                                row.latest.H5.value >=
                                                  1000000000
                                              ? _c("div", [
                                                  _vm._v(
                                                    "US$" +
                                                      _vm._s(
                                                        _vm._f("numeralFormat")(
                                                          row.latest.H5.value /
                                                            1000000000,
                                                          "0,000.00"
                                                        )
                                                      ) +
                                                      "B"
                                                  )
                                                ])
                                              : _vm.isMobile &&
                                                row.latest.H5.value >= 1000000
                                              ? _c("div", [
                                                  _vm._v(
                                                    "US$" +
                                                      _vm._s(
                                                        _vm._f("numeralFormat")(
                                                          row.latest.H5.value /
                                                            1000000,
                                                          "0,000.00"
                                                        )
                                                      ) +
                                                      "M"
                                                  )
                                                ])
                                              : _vm.isMobile &&
                                                row.latest.H5.value >= 1000
                                              ? _c("div", [
                                                  _vm._v(
                                                    "US$" +
                                                      _vm._s(
                                                        _vm._f("numeralFormat")(
                                                          row.latest.H5.value /
                                                            1000,
                                                          "0,000.00"
                                                        )
                                                      ) +
                                                      "K"
                                                  )
                                                ])
                                              : row.latest.H5.value
                                              ? _c("div", [
                                                  _vm._v(
                                                    "US$" +
                                                      _vm._s(
                                                        _vm._f("numeralFormat")(
                                                          row.latest.H5.value,
                                                          "0,000.00"
                                                        )
                                                      )
                                                  )
                                                ])
                                              : _c("div", [_vm._v("N/A")])
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          {
                                            staticClass:
                                              "px-4 py-2 xl:h-16 bg-darkslab border-b border-lightslab"
                                          },
                                          [
                                            _c(
                                              "div",
                                              {
                                                staticClass: "xl:hidden text-xs"
                                              },
                                              [_vm._v("Miscellaneous")]
                                            )
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          {
                                            staticClass:
                                              "px-4 py-2 h-24 border-b border-lightslab"
                                          },
                                          [
                                            _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "xl:hidden text-xss text-lightlabel xl:text-xs font-bold"
                                              },
                                              [_vm._v("M1 - Other responses")]
                                            ),
                                            _vm._v(" "),
                                            row.latest.M1.value && _vm.isMobile
                                              ? _c(
                                                  "div",
                                                  { staticClass: "text-xs" },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        row.latest.M1.value
                                                      )
                                                    )
                                                  ]
                                                )
                                              : row.latest.M1.value.length > 60
                                              ? _c(
                                                  "div",
                                                  { staticClass: "text-xs" },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        row.latest.M1.value
                                                      )
                                                    )
                                                  ]
                                                )
                                              : row.latest.M1.value.length > 30
                                              ? _c(
                                                  "div",
                                                  { staticClass: "text-sm" },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        row.latest.M1.value
                                                      )
                                                    )
                                                  ]
                                                )
                                              : row.latest.M1.value
                                              ? _c("div", [
                                                  _vm._v(
                                                    _vm._s(row.latest.M1.value)
                                                  )
                                                ])
                                              : _c("div", [_vm._v("N/A")])
                                          ]
                                        )
                                      ])
                                    ]
                                  )
                                ]
                              )
                            : _vm._e()
                        }),
                        _vm._v(" "),
                        _c("div", {
                          staticClass:
                            "hidden xl:block border-l border-lightslab h-full"
                        })
                      ],
                      2
                    )
                  ]
                )
              ]
            )
          ],
          1
        )
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/policies/GovtResponse.vue?vue&type=template&id=22f0536a&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/policies/GovtResponse.vue?vue&type=template&id=22f0536a&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "py-1 w-100" }, [
    _c("div", { staticClass: "rounded bg-slab-primary xl:mr-4 xl:h-44" }, [
      _c("div", { staticClass: "w-full h-full pb-8 xl:pb-2 p-2 relative" }, [
        _c("div", { staticClass: "font-bold mb-4 text-lightlabel" }, [
          _c("span", { staticClass: "uppercase" }, [
            _vm._v(_vm._s(_vm.policy.id))
          ]),
          _vm._v(" - " + _vm._s(_vm.policy.name))
        ]),
        _vm._v(" "),
        _vm.policy.id == "E3" ||
        _vm.policy.id == "E4" ||
        _vm.policy.id == "H4" ||
        _vm.policy.id == "H5"
          ? _c("div", { staticClass: "text-2xl font-bold" }, [
              _vm._v("US$" + _vm._s(_vm._f("numeralFormat")(_vm.policy.value)))
            ])
          : _vm.policy.value.length > 85
          ? _c("div", { staticClass: "font-bold text-sm" }, [
              _vm._v(_vm._s(_vm.policy.value))
            ])
          : _vm.policy.value.length > 30
          ? _c("div", { staticClass: "font-bold" }, [
              _vm._v(_vm._s(_vm.policy.value))
            ])
          : _vm.policy.value.length > 15
          ? _c("div", { staticClass: "font-bold xl:text-2xl" }, [
              _vm._v(_vm._s(_vm.policy.value))
            ])
          : _c("div", { staticClass: "xl:text-3xl font-bold" }, [
              _vm._v(_vm._s(_vm.policy.value))
            ]),
        _vm._v(" "),
        _c(
          "div",
          {
            staticClass:
              "text-xs hover:underline text-lightlabel hover:text-heading cursor-pointer absolute bottom-0 left-0 mb-2 ml-2",
            on: {
              click: function($event) {
                _vm.expanded = true
              }
            }
          },
          [_vm._v("More info...")]
        )
      ])
    ]),
    _vm._v(" "),
    _vm.expanded
      ? _c(
          "div",
          {
            staticClass:
              "fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center z-40",
            staticStyle: { background: "rgba(0,0,0,0.5)" }
          },
          [
            _c("div", {
              staticClass: "absolute top-0 left-0 right-0 bottom-0 z-0",
              on: {
                click: function($event) {
                  _vm.expanded = false
                }
              }
            }),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass:
                  "bg-slab rounded p-4 relative z-10 w-full m-6 xl:m-0 xl:w-1/2",
                staticStyle: { "max-width": "800px" }
              },
              [
                _c("div", { staticClass: "font-bold text-2xl" }, [
                  _c("span", { staticClass: "uppercase" }, [
                    _vm._v(_vm._s(_vm.policy.id))
                  ]),
                  _vm._v(" - " + _vm._s(_vm.policy.name))
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "text-lightlabel text-xs mb-4" }, [
                  _vm._v(_vm._s(_vm.policy.description))
                ]),
                _vm._v(" "),
                _vm.policy.id == "E3" ||
                _vm.policy.id == "E4" ||
                _vm.policy.id == "H4" ||
                _vm.policy.id == "H5"
                  ? _c(
                      "div",
                      {
                        staticClass: "text-2xl xl:text-3xl text-white font-bold"
                      },
                      [
                        _vm._v(
                          "US$" +
                            _vm._s(_vm._f("numeralFormat")(_vm.policy.value))
                        )
                      ]
                    )
                  : _c(
                      "div",
                      { staticClass: "text-2xl text-white font-bold" },
                      [_vm._v(_vm._s(_vm.policy.value))]
                    ),
                _vm._v(" "),
                _c("div", { staticClass: "text-sm mt-2" }, [
                  _vm._v(_vm._s(_vm.policy.target))
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "text-sm" }, [
                  _vm._v("Implemented on " + _vm._s(_vm.policy.since))
                ]),
                _vm._v(" "),
                _vm.policy.help.length == 1
                  ? _c("div", { staticClass: "text-lightlabel text-xs" }, [
                      _vm._v(_vm._s(_vm.policy.help[0]))
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.policy.notes
                  ? _c("div", { staticClass: "mt-4 text-xs text-lightlabel" }, [
                      _vm._v(_vm._s(_vm.policy.notes))
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    staticClass:
                      "text-xs hover:underline text-lightlabel hover:text-heading cursor-pointer mt-4",
                    on: {
                      click: function($event) {
                        _vm.expanded = false
                      }
                    }
                  },
                  [_vm._v("Close")]
                )
              ]
            )
          ]
        )
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/PoliciesView.vue?vue&type=template&id=21124e34&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/PoliciesView.vue?vue&type=template&id=21124e34&scoped=true& ***!
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
  return _c("div", { staticClass: "h-full relative" }, [
    _c(
      "div",
      {
        staticClass:
          "absolute top-0 left-0 right-0 bottom-0 rounded bg-hoverslab",
        staticStyle: { bottom: "2rem" }
      },
      [
        _c(
          "div",
          {
            staticClass: "h-full relative",
            class: _vm.selectedTab != "all" ? "hidden" : ""
          },
          [
            _c(
              "simplebar",
              { staticClass: "h-full overflow-x-hidden" },
              [
                _vm.compareLength == 0
                  ? _c("div", [
                      _c("div", { staticClass: "p-2 xl:p-4" }, [
                        _c("h1", { staticClass: "xl:text-3xl font-bold" }, [
                          _vm._v("Government Response Tracker")
                        ]),
                        _vm._v(" "),
                        _c(
                          "div",
                          { staticClass: "text-xs xl:text-base mt-2" },
                          [
                            _c("p", [
                              _vm._v("These data are based on the "),
                              _c(
                                "a",
                                {
                                  staticClass:
                                    "text-orangeslab hover:text-blue-400 hover:underline",
                                  attrs: {
                                    target: "_blank",
                                    href:
                                      "https://www.bsg.ox.ac.uk/research/research-projects/coronavirus-government-response-tracker"
                                  }
                                },
                                [
                                  _vm._v(
                                    "Coronavirus Government Response Tracker"
                                  )
                                ]
                              ),
                              _vm._v(" by the University of Oxford.")
                            ]),
                            _vm._v(" "),
                            _c(
                              "blockquote",
                              {
                                staticClass:
                                  "italic m-2 ml-4 border-l-4 p-4 border-lightslab"
                              },
                              [
                                _c("p", { staticClass: "py-2" }, [
                                  _vm._v(
                                    "Systematic information on which governments have taken which measures, and when, can help decision-makers and citizens understand the robustness of governmental responses in a consistent way, aiding efforts to fight the pandemic. The Oxford COVID-19 Government Response Tracker (OxCGRT) systematically collects information on several different common policy responses governments have taken, scores the stringency of such measures, and aggregates these scores into a common Stringency Index."
                                  )
                                ]),
                                _vm._v(" "),
                                _c("p", { staticClass: "py-2" }, [
                                  _vm._v(
                                    "Data is collected from public sources by a team of over one hundred Oxford University students and staff from every part of the world."
                                  )
                                ])
                              ]
                            ),
                            _vm._v(" "),
                            _c("p", { staticClass: "mt-2 xl:mt-8" }, [
                              _vm._v(
                                "Select a country or state to begin comparing."
                              )
                            ])
                          ]
                        )
                      ])
                    ])
                  : !_vm.isMobile ||
                    (_vm.isMobile && _vm.selectedCompareTab === "all")
                  ? _c("ComparePolicies", {
                      attrs: { data: _vm.comparePolicies }
                    })
                  : _vm._e()
              ],
              1
            )
          ],
          1
        ),
        _vm._v(" "),
        _vm._l(_vm.uniqueCountries, function(row, key, index) {
          return row.country && _vm.selectedTab === row.country
            ? _c(
                "div",
                {
                  key: index,
                  staticClass:
                    "absolute inset-0 bg-hoverslab rounded p-2 xl:p-4 bottom-4.25 xl:bottom-0"
                },
                [
                  !_vm.isMobile ||
                  (_vm.isMobile && _vm.selectedTab === row.country)
                    ? _c("simplebar", { staticClass: "h-full z-0" }, [
                        _c("div", { staticClass: "my-4" }, [
                          _c(
                            "div",
                            {
                              staticClass:
                                "xl:w-128 text-2xl xl:text-4xl font-bold"
                            },
                            [_vm._v(_vm._s(row.country))]
                          ),
                          _vm._v(" "),
                          _vm.getGovtResponse(row.country)
                            ? _c(
                                "div",
                                {
                                  staticClass: "xl:text-6xl text-3xl font-bold"
                                },
                                [
                                  _vm._v(
                                    _vm._s(
                                      _vm.getGovtResponse(row.country).latest.si
                                    )
                                  )
                                ]
                              )
                            : _c(
                                "div",
                                {
                                  staticClass: "xl:text-6xl text-3xl font-bold"
                                },
                                [_vm._v("N/A")]
                              ),
                          _vm._v(" "),
                          _c("div", { staticClass: "flex items-center" }, [
                            _c(
                              "div",
                              {
                                staticClass:
                                  "text-lightlabel font-bold tracking-tight"
                              },
                              [_vm._v("stringency index")]
                            ),
                            _vm._v(" "),
                            _c(
                              "div",
                              {
                                staticClass:
                                  "xl:hidden ml-2 text-xs text-heading",
                                on: {
                                  click: function($event) {
                                    _vm.expanded = !_vm.expanded
                                  }
                                }
                              },
                              [
                                _vm._v(
                                  "\n                                (info)\n                            "
                                )
                              ]
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
                                  value: _vm.expanded,
                                  expression: "expanded"
                                }
                              ],
                              staticClass: "xl:hidden"
                            },
                            [
                              _c(
                                "div",
                                { staticClass: "py-2 text-xs xl:text-sm" },
                                [
                                  _vm._v(
                                    "OxCGRT collects publicly available information on 17 indicators of government response. This information is collected by a team of over 100 volunteers from the Oxford community and is updated continuously."
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "py-2 text-xs xl:text-sm" },
                                [
                                  _vm._v(
                                    "Eight of the policy indicators (C1-C8) record information on containment and closure policies, such as school closures and restrictions in movement. Four of the indicators (E1-E4) record economic policies such as income support to citizens or provision of foreign aid. And five indicators (H1-H5) record health system policies such as the Covid-19 testing regime or emergency investments into healthcare."
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "py-2 text-xs xl:text-sm" },
                                [
                                  _vm._v(
                                    "For a full description of the data and how it is collected, check out the "
                                  ),
                                  _c(
                                    "a",
                                    {
                                      staticClass:
                                        "text-orangeslab hover:text-blue-400 hover:underline",
                                      attrs: {
                                        target: "_blank",
                                        href:
                                          "https://www.bsg.ox.ac.uk/research/research-projects/coronavirus-government-response-tracker"
                                      }
                                    },
                                    [
                                      _vm._v(
                                        "University of Oxford's coronavirus government response tracker (OxCGRT)"
                                      )
                                    ]
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "py-2 text-xs xl:text-sm" },
                                [
                                  _vm._v(
                                    "A higher position in the Stringency Index does not necessarily mean that a country's response is ‘better’ than others lower on the index."
                                  )
                                ]
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c("div", { staticClass: "hidden xl:block" }, [
                            _c(
                              "div",
                              { staticClass: "py-2 text-xs xl:text-sm" },
                              [
                                _vm._v(
                                  "OxCGRT collects publicly available information on 17 indicators of government response. This information is collected by a team of over 100 volunteers from the Oxford community and is updated continuously."
                                )
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "py-2 text-xs xl:text-sm" },
                              [
                                _vm._v(
                                  "Eight of the policy indicators (C1-C8) record information on containment and closure policies, such as school closures and restrictions in movement. Four of the indicators (E1-E4) record economic policies such as income support to citizens or provision of foreign aid. And five indicators (H1-H5) record health system policies such as the Covid-19 testing regime or emergency investments into healthcare."
                                )
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "py-2 text-xs xl:text-sm" },
                              [
                                _vm._v(
                                  "For a full description of the data and how it is collected, check out the "
                                ),
                                _c(
                                  "a",
                                  {
                                    staticClass:
                                      "text-orangeslab hover:text-blue-400 hover:underline",
                                    attrs: {
                                      target: "_blank",
                                      href:
                                        "https://www.bsg.ox.ac.uk/research/research-projects/coronavirus-government-response-tracker"
                                    }
                                  },
                                  [
                                    _vm._v(
                                      "University of Oxford's coronavirus government response tracker (OxCGRT)"
                                    )
                                  ]
                                )
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "py-2 text-xs xl:text-sm" },
                              [
                                _vm._v(
                                  "A higher position in the Stringency Index does not necessarily mean that a country's response is ‘better’ than others lower on the index."
                                )
                              ]
                            )
                          ])
                        ]),
                        _vm._v(" "),
                        _c(
                          "div",
                          { staticClass: "flex flex-wrap" },
                          _vm.getGovtResponse(row.country)
                            ? _vm._o(
                                _vm._l(
                                  _vm.getLatestGovtResponse(row.country),
                                  function(policy, key, index) {
                                    return _c("GovtResponse", {
                                      key: index,
                                      attrs: { policy: policy }
                                    })
                                  }
                                ),
                                0,
                                index
                              )
                            : _vm._e(),
                          1
                        )
                      ])
                    : _vm._e()
                ],
                1
              )
            : _vm._e()
        })
      ],
      2
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/policies/ComparePolicies.vue":
/*!**************************************************************!*\
  !*** ./resources/js/components/policies/ComparePolicies.vue ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ComparePolicies_vue_vue_type_template_id_6b9f1a7e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ComparePolicies.vue?vue&type=template&id=6b9f1a7e& */ "./resources/js/components/policies/ComparePolicies.vue?vue&type=template&id=6b9f1a7e&");
/* harmony import */ var _ComparePolicies_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ComparePolicies.vue?vue&type=script&lang=js& */ "./resources/js/components/policies/ComparePolicies.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _ComparePolicies_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ComparePolicies.vue?vue&type=style&index=0&lang=css& */ "./resources/js/components/policies/ComparePolicies.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _ComparePolicies_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ComparePolicies_vue_vue_type_template_id_6b9f1a7e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ComparePolicies_vue_vue_type_template_id_6b9f1a7e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/policies/ComparePolicies.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/policies/ComparePolicies.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/policies/ComparePolicies.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ComparePolicies_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./ComparePolicies.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/policies/ComparePolicies.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ComparePolicies_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/policies/ComparePolicies.vue?vue&type=style&index=0&lang=css&":
/*!***********************************************************************************************!*\
  !*** ./resources/js/components/policies/ComparePolicies.vue?vue&type=style&index=0&lang=css& ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ComparePolicies_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./ComparePolicies.vue?vue&type=style&index=0&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/policies/ComparePolicies.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ComparePolicies_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ComparePolicies_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ComparePolicies_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ComparePolicies_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ComparePolicies_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/components/policies/ComparePolicies.vue?vue&type=template&id=6b9f1a7e&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/components/policies/ComparePolicies.vue?vue&type=template&id=6b9f1a7e& ***!
  \*********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ComparePolicies_vue_vue_type_template_id_6b9f1a7e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./ComparePolicies.vue?vue&type=template&id=6b9f1a7e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/policies/ComparePolicies.vue?vue&type=template&id=6b9f1a7e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ComparePolicies_vue_vue_type_template_id_6b9f1a7e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ComparePolicies_vue_vue_type_template_id_6b9f1a7e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/policies/GovtResponse.vue":
/*!***********************************************************!*\
  !*** ./resources/js/components/policies/GovtResponse.vue ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _GovtResponse_vue_vue_type_template_id_22f0536a_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GovtResponse.vue?vue&type=template&id=22f0536a&scoped=true& */ "./resources/js/components/policies/GovtResponse.vue?vue&type=template&id=22f0536a&scoped=true&");
/* harmony import */ var _GovtResponse_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GovtResponse.vue?vue&type=script&lang=js& */ "./resources/js/components/policies/GovtResponse.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _GovtResponse_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _GovtResponse_vue_vue_type_template_id_22f0536a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _GovtResponse_vue_vue_type_template_id_22f0536a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "22f0536a",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/policies/GovtResponse.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/policies/GovtResponse.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/js/components/policies/GovtResponse.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GovtResponse_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./GovtResponse.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/policies/GovtResponse.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GovtResponse_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/policies/GovtResponse.vue?vue&type=template&id=22f0536a&scoped=true&":
/*!******************************************************************************************************!*\
  !*** ./resources/js/components/policies/GovtResponse.vue?vue&type=template&id=22f0536a&scoped=true& ***!
  \******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GovtResponse_vue_vue_type_template_id_22f0536a_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./GovtResponse.vue?vue&type=template&id=22f0536a&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/policies/GovtResponse.vue?vue&type=template&id=22f0536a&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GovtResponse_vue_vue_type_template_id_22f0536a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GovtResponse_vue_vue_type_template_id_22f0536a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/views/PoliciesView.vue":
/*!*********************************************!*\
  !*** ./resources/js/views/PoliciesView.vue ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PoliciesView_vue_vue_type_template_id_21124e34_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PoliciesView.vue?vue&type=template&id=21124e34&scoped=true& */ "./resources/js/views/PoliciesView.vue?vue&type=template&id=21124e34&scoped=true&");
/* harmony import */ var _PoliciesView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PoliciesView.vue?vue&type=script&lang=js& */ "./resources/js/views/PoliciesView.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _PoliciesView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _PoliciesView_vue_vue_type_template_id_21124e34_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _PoliciesView_vue_vue_type_template_id_21124e34_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "21124e34",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/PoliciesView.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/PoliciesView.vue?vue&type=script&lang=js&":
/*!**********************************************************************!*\
  !*** ./resources/js/views/PoliciesView.vue?vue&type=script&lang=js& ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PoliciesView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./PoliciesView.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/PoliciesView.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PoliciesView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/PoliciesView.vue?vue&type=template&id=21124e34&scoped=true&":
/*!****************************************************************************************!*\
  !*** ./resources/js/views/PoliciesView.vue?vue&type=template&id=21124e34&scoped=true& ***!
  \****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PoliciesView_vue_vue_type_template_id_21124e34_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./PoliciesView.vue?vue&type=template&id=21124e34&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/PoliciesView.vue?vue&type=template&id=21124e34&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PoliciesView_vue_vue_type_template_id_21124e34_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PoliciesView_vue_vue_type_template_id_21124e34_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);