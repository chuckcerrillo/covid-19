(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Latest.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Latest.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var simplebar_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! simplebar-vue */ "./node_modules/simplebar-vue/dist/simplebar-vue.esm.js");
/* harmony import */ var _FullCountry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FullCountry */ "./resources/js/components/FullCountry.vue");
/* harmony import */ var vue_slider_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue-slider-component */ "./node_modules/vue-slider-component/dist/vue-slider-component.umd.min.js");
/* harmony import */ var vue_slider_component__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(vue_slider_component__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var vue_slider_component_theme_default_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vue-slider-component/theme/default.css */ "./node_modules/vue-slider-component/theme/default.css");
/* harmony import */ var vue_slider_component_theme_default_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(vue_slider_component_theme_default_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _MiniChart__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./MiniChart */ "./resources/js/components/MiniChart.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





 // const MiniChart = () => ({
//     component: import("./MiniChart"),
//
// });

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "Latest",
  components: {
    MiniChart: _MiniChart__WEBPACK_IMPORTED_MODULE_5__["default"],
    simplebar: simplebar_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    FullCountry: _FullCountry__WEBPACK_IMPORTED_MODULE_2__["default"],
    VueSlider: vue_slider_component__WEBPACK_IMPORTED_MODULE_3___default.a
  },
  props: ['data', 'settings', 'active'],
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
      },
      range: {
        start: moment__WEBPACK_IMPORTED_MODULE_0___default()().subtract(30, 'days').format('YYYY-MM-DD'),
        end: moment__WEBPACK_IMPORTED_MODULE_0___default()().subtract(1, 'days').format('YYYY-MM-DD')
      },
      graphReady: false
    };
  },
  created: function created() {
    this.prepare();
    var self = this;
    setTimeout(function () {
      self.graphReady = true;
    }, 200);
  },
  methods: {
    prepare: function prepare() {
      if (this.data[0] && this.data[0].daily) {
        this.date = this.data[0].daily[this.data[0].daily.length - 1].date;
        this.range.end = _.clone(this.date);
      }

      this.options.date.max = this.date;
    },
    toggleExpand: function toggleExpand() {
      this.expanded = !this.expanded;
    },
    remove: function remove(item) {
      this.$emit('removeCompare', item);
    },
    getBiggestValue: function getBiggestValue(field, value) {
      var result = false;
      var data = [];

      for (var x in this.comparison) {
        var row = this.comparison[x];

        if (field == 'confirmed') {
          data.push(row.latest.c);
        } else if (field == 'deaths') {
          data.push(row.latest.d);
        } else if (field == 'recovered') {
          data.push(row.latest.r);
        } else if (field == 'active') {
          data.push(row.latest.a);
        } else if (field == 'confirmedDelta') {
          data.push(row.latest.delta.c);
        } else if (field == 'deathsDelta') {
          data.push(row.latest.delta.d);
        } else if (field == 'recoveredDelta') {
          data.push(row.latest.delta.r);
        } else if (field == 'population') {
          data.push(row.population);
        } else if (field == 'confirmedCapita') {
          data.push(row.latest.capita.c);
        } else if (field == 'deathsCapita') {
          data.push(row.latest.capita.d);
        } else if (field == 'recoveredCapita') {
          data.push(row.latest.capita.r);
        } else if (field == 'confirmedAverage') {
          data.push(row.latest.average.c);
        } else if (field == 'confirmedGrowth') {
          data.push(row.latest.growth.c);
        } else if (field == 'stringencyIndex') {
          data.push(row.latest.stringencyindex);
        }
      }

      if (data.length > 1 && value && Math.max.apply(Math, data) == value) {
        result = true;
      }

      return result;
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
    dateRange: {
      get: function get() {
        var data = [_.clone(this.range.start), _.clone(this.range.end)];
        return data;
      },
      set: function set(newvalue) {
        this.range.start = newvalue[0];
        this.range.end = newvalue[1];
      }
    },
    config: function config() {
      return {
        'absolute': this.settings && this.settings.absolute ? this.settings.absolute : false,
        'solo': this.settings && this.settings.solo ? this.settings.solo : false
      };
    },
    comparison: function comparison() {
      var data = [];
      var date = moment__WEBPACK_IMPORTED_MODULE_0___default()(this.date).format('YYYY-MM-DD');

      for (var x in this.data) {
        var row = {};
        row.latest = {
          c: 0,
          d: 0,
          r: 0,
          a: 0,
          delta: {
            c: 0,
            d: 0,
            r: 0,
            a: 0
          },
          capita: {
            c: 0,
            d: 0,
            r: 0,
            a: 0
          },
          percent: {
            c: 0,
            d: 0,
            r: 0,
            a: 0
          },
          average: {
            c: 0,
            d: 0,
            r: 0,
            a: 0
          },
          growth: {
            c: 0,
            d: 0,
            r: 0,
            a: 0
          },
          stringencyindex: 0
        };
        row.name = this.data[x].name;
        row.population = this.data[x].population;

        for (var y in this.data[x].daily) {
          if (date === this.data[x].daily[y].date) {
            row.latest = this.data[x].daily[y];
            break;
          }
        }

        data.push(_.clone(row));
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
    }
  },
  watch: {
    date: function date(newValue, oldValue) {
      if (typeof newValue != 'string') {
        this.date = moment__WEBPACK_IMPORTED_MODULE_0___default()(newValue).format('YYYY-MM-DD');
      }
    },
    range: function range(newvalue) {
      if (typeof newvalue.start != 'string') {
        this.range.start = moment__WEBPACK_IMPORTED_MODULE_0___default()(newvalue.start).format('YYYY-MM-DD');
        this.range.end = moment__WEBPACK_IMPORTED_MODULE_0___default()(newvalue.end).format('YYYY-MM-DD');
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/MiniChart.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/MiniChart.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
//
//
//
//
//
//
//
//
//
//
//


var LineChart = function LineChart() {
  return {
    component: Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! ./charts/LineChart */ "./resources/js/components/charts/LineChart.vue"))
  };
};

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "MiniChart",
  components: {
    LineChart: LineChart
  },
  props: ['minValue', 'maxValue', 'data', 'minDate', 'maxDate', 'active'],
  data: function data() {
    return {
      yAxis: ['deltaConfirmed'],
      dataReady: false
    };
  },
  methods: {
    dataset: function dataset() {
      var data = {
        labels: [],
        datasets: []
      },
          options,
          content = []; // OPTIONS

      options = {
        responsive: true,
        maintainAspectRatio: false,
        hoverMode: 'index',
        stacked: false,
        legend: {
          display: false
        },
        title: {
          display: false
        },
        scales: {
          xAxes: [{
            display: false,
            ticks: {
              fontColor: '#2c3531',
              callback: function callback(dataLabel, index) {
                return index % 2 === 0 ? dataLabel : '';
              }
            }
          }],
          yAxes: []
        }
      };
      var count = 0;

      for (var x in this.data) {
        count++;
      }

      if (count == 0) return data;
      var start = '',
          end = ''; // Get start and end dates

      for (var x in this.data) {
        var stats = this.data[x].daily;

        for (var y in stats) {
          var date = stats[y].date;

          if (start.length === 0 || moment__WEBPACK_IMPORTED_MODULE_0___default()(date).format('YYYY-MM-DD') < start) {
            start = moment__WEBPACK_IMPORTED_MODULE_0___default()(date).format('YYYY-MM-DD');
          }

          if (end.length === 0 || moment__WEBPACK_IMPORTED_MODULE_0___default()(date).format('YYYY-MM-DD') > end) {
            end = moment__WEBPACK_IMPORTED_MODULE_0___default()(date).format('YYYY-MM-DD');
          }
        }
      }

      if (this.minDate) {
        start = moment__WEBPACK_IMPORTED_MODULE_0___default()(this.minDate).format('YYYY-MM-DD');
      }

      if (this.maxDate) {
        end = moment__WEBPACK_IMPORTED_MODULE_0___default()(this.maxDate).format('YYYY-MM-DD');
      }

      data.labels.push('2019-12-31'); // Assemble content

      for (var x = 0; x <= moment__WEBPACK_IMPORTED_MODULE_0___default()(end).diff(moment__WEBPACK_IMPORTED_MODULE_0___default()(start), 'days'); x++) {
        var current_date = _.clone(moment__WEBPACK_IMPORTED_MODULE_0___default()(start).add(x, 'days').format('YYYY-MM-DD'));

        data.labels.push(current_date);

        for (var y = 0; y < this.data.length; y++) {
          if (!content[y]) {
            content.push({
              deltaConfirmed: []
            });
          }

          if (this.data[y].daily) {
            var found = false;
            var stats = this.data[y].daily;

            for (var z in stats) {
              var row = stats[z];

              if (moment__WEBPACK_IMPORTED_MODULE_0___default()(row.date).format('YYYY-MM-DD') === current_date) {
                if (row.delta.c >= 0) content[y].deltaConfirmed.push(row.delta.c);else content[y].deltaConfirmed.push(0);
                found = true;
              }
            } // If today's data is missing, use previous day's


            if (!found) {
              if (content[y] && content[y].confirmed && content[y].confirmed.length > 0) {
                content[y].deltaConfirmed.push(content[y].deltaConfirmed.slice(-1));
              } else {
                content[y].deltaConfirmed.push(0);
              }
            }
          }
        }
      }

      if (data.labels.length <= 1) {
        data.labels.push('2020-01-01');
      }

      var position = '',
          chartType = '',
          metric = '',
          border = ''; // Assemble labels

      for (var x = 0; x < this.data.length; x++) {
        for (var y in this.yAxis) {
          if (y == 0) {
            position = 'left';
            chartType = 'bar';
            metric = 'primary';
            border = 'borderPrimary';
          } else {
            position = 'right';
            chartType = 'bar';
            metric = 'secondary';
            border = 'borderSecondary';
          }

          if (this.yAxis[y] == 'deltaConfirmed') {
            var datavalues = [0, 0];

            if (content && content[x] && content[x].deltaConfirmed) {
              if (content[x].deltaConfirmed.length > 0) {
                datavalues = [0];

                for (var z in content[x].deltaConfirmed) {
                  datavalues.push(content[x].deltaConfirmed[z]);
                }
              } else {
                datavalues = content[x].deltaConfirmed;
              }
            }

            data.datasets.push({
              label: 'New cases per day ',
              type: 'line',
              backgroundColor: 'white',
              borderColor: 'white',
              // borderDash: [10, 5],
              display: false,
              borderWidth: 1,
              pointRadius: 0,
              fill: false,
              data: datavalues,
              yAxisID: 'y-deltaConfirmed'
            });
            options.scales.yAxes.push({
              responsive: true,
              scaleLabel: {
                display: false,
                labelString: 'New cases per day'
              },
              type: 'linear',
              display: false,
              position: position,
              id: 'y-deltaConfirmed',
              // grid line settings
              gridLines: {
                drawOnChartArea: false // only want the grid lines for one axis to show up

              },
              ticks: {
                display: true,
                fontColor: '#2c3531',
                callback: function callback(tick, index, ticks) {
                  if (tick.toString().substr(0, 1) == 1 || tick.toString().substr(0, 1) == 5) {
                    return tick.toLocaleString();
                  }
                }
              }
            });
          }
        }
      }

      return {
        data: data,
        options: options
      };
    }
  },
  created: function created() {
    var self = this; // setTimeout(function(){

    self.dataset();
    self.dataReady = true; // },10)
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/DailyView.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/DailyView.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_Daily__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/Daily */ "./resources/js/components/Daily.vue");
/* harmony import */ var _components_Latest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Latest */ "./resources/js/components/Latest.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "DailyView",
  props: ['selectedCompareTab', 'options', 'compareLength', 'comparisonData', 'compare', 'view'],
  components: {
    Daily: _components_Daily__WEBPACK_IMPORTED_MODULE_0__["default"],
    Latest: _components_Latest__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  methods: {
    removeCompare: function removeCompare(item) {
      var found = this.findCompare(item);

      if (found) {
        var key = item.country + item.state;
        delete this.compare[found];

        if (key === this.selectedCompareTab) {
          this.updateSelected(this.getLastCompareItem());
        }
      }

      this.$emit('updateCompare', this.compare);
    },
    findCompare: function findCompare(item) {
      var found = false;

      for (var x in this.compare) {
        if (this.compare[x].country === item.country) {
          if (this.compare[x].state === item.state) {
            found = x;
            break;
          }
        }
      }

      return found;
    },
    updateSelected: function updateSelected(key) {
      this.$emit('updateSelected', key);
    },
    getLastCompareItem: function getLastCompareItem() {
      var last = false;

      var compare = _.cloneDeep(this.compare);

      for (var x in compare) {
        if (compare[x]) last = x;
      }

      return last;
    },
    getCompareLength: function getCompareLength() {
      var count = 0;

      for (var x in this.compare) {
        if (this.compare[x]) count++;
      }

      return count;
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Latest.vue?vue&type=style&index=0&lang=css&":
/*!************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Latest.vue?vue&type=style&index=0&lang=css& ***!
  \************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".inner-scrollbar .simplebar-track.simplebar-horizontal {\n  visibility: hidden !important;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Latest.vue?vue&type=style&index=0&lang=css&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Latest.vue?vue&type=style&index=0&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--6-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--6-2!../../../node_modules/vue-loader/lib??vue-loader-options!./Latest.vue?vue&type=style&index=0&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Latest.vue?vue&type=style&index=0&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Latest.vue?vue&type=template&id=730f2232&":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Latest.vue?vue&type=template&id=730f2232& ***!
  \*********************************************************************************************************************************************************************************************************/
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
    _c("div", { staticClass: "m-2 xl:m-4" }, [
      _c(
        "div",
        { staticClass: "my-2 py-2 pb-4 px-4 bg-slab-primary rounded" },
        [
          _c("span", { staticClass: "font-bold" }, [_vm._v("Select date")]),
          _vm._v(" "),
          _c(
            "v-date-picker",
            {
              attrs: {
                mode: "range",
                "min-date": _vm.options.date.min,
                "max-date": _vm.options.date.max,
                masks: {
                  data: ["YYYY-MM-DD", "YYYY/MM/DD"],
                  input: ["YYYY-MM-DD", "YYYY/MM/DD"]
                },
                popover: { placement: "bottom", visibility: "click" }
              },
              model: {
                value: _vm.range,
                callback: function($$v) {
                  _vm.range = $$v
                },
                expression: "range"
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
              "\n                "
          ),
          _c("vue-slider", {
            attrs: { data: _vm.dateSliderRange, lazy: true, adsorb: true },
            model: {
              value: _vm.dateRange,
              callback: function($$v) {
                _vm.dateRange = $$v
              },
              expression: "dateRange"
            }
          })
        ],
        1
      )
    ]),
    _vm._v(" "),
    _c(
      "div",
      {
        staticClass:
          "absolute left-0 right-0 bottom-4.25 xl:bottom-0 m-2 xl:m-4 top-5.5",
        staticStyle: { position: "absolute" }
      },
      [
        _c(
          "simplebar",
          { staticClass: "w-full h-full" },
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
                    _c("div", { staticClass: "px-4 py-2 h-12" }),
                    _vm._v(" "),
                    _c("div", {
                      staticClass: "px-4 py-2 h-8 border-b border-slab"
                    })
                  ]
                ),
                _vm._v(" "),
                _vm._l(_vm.comparison, function(row, key, index) {
                  return _c(
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
                              [_vm._v(_vm._s(row.name.country))]
                            )
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass:
                              "text-xs xl:text-base px-4 py-2 font-bold xl:h-8 border-b border-lightslab bg-slab-primary text-xs"
                          },
                          [
                            row.name.state
                              ? _c("div", [_vm._v(_vm._s(row.name.state))])
                              : _c("div")
                          ]
                        )
                      ])
                    ]
                  )
                }),
                _vm._v(" "),
                _c("div", {
                  staticClass: "px-4 py-2 xl:h-20 border-l border-lightslab"
                })
              ],
              2
            ),
            _vm._v(" "),
            _c(
              "simplebar",
              {
                staticClass:
                  "inner-scrollbar bg-slab rounded absolute inset-x-0 bottom-0 top-3.5 xl:top-5 overflow-x-show w-full",
                class:
                  "min-w-" +
                  _vm.comparison.length * 32 +
                  " xl:min-w-" +
                  (_vm.comparison.length * 64 + 36),
                staticStyle: { position: "absolute" }
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
                          "hidden xl:block bg-slab-primary border-b border-lightslab w-36 text-xs font-bold flex-shrink-0"
                      },
                      [
                        _c(
                          "div",
                          {
                            staticClass: "px-4 py-2 h-32 border-b border-slab"
                          },
                          [_vm._v("New cases per day")]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "px-4 py-2 h-16 border-b border-slab"
                          },
                          [_vm._v("Confirmed")]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "px-4 py-2 h-16 border-b border-slab"
                          },
                          [_vm._v("Deaths")]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "px-4 py-2 h-16 border-b border-slab"
                          },
                          [_vm._v("Recovered")]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "px-4 py-2 h-24 border-b border-slab"
                          },
                          [_vm._v("Active")]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "px-4 py-2 h-12 border-b border-slab"
                          },
                          [_vm._v("New Cases")]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "px-4 py-2 h-12 border-b border-slab"
                          },
                          [_vm._v("New Deaths")]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "px-4 py-2 h-12 border-b border-slab"
                          },
                          [_vm._v("New Recovered")]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "px-4 py-2 h-12 border-b border-slab"
                          },
                          [_vm._v("Population")]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "px-4 py-2 h-16 border-b border-slab"
                          },
                          [_vm._v("Confirmed Per 1M population")]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "px-4 py-2 h-16 border-b border-slab"
                          },
                          [_vm._v("Deaths Per 1M population")]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "px-4 py-2 h-16 border-b border-slab"
                          },
                          [_vm._v("Recovered Per 1M population")]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "px-4 py-2 h-12 border-b border-slab"
                          },
                          [_vm._v("5D Ave")]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "px-4 py-2 h-12 border-b border-slab"
                          },
                          [_vm._v("Growth Factor")]
                        ),
                        _vm._v(" "),
                        _c("div", { staticClass: "px-4 py-2 h-12" }, [
                          _vm._v("Stringency Index")
                        ])
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "flex-shrink-0 flex" },
                      [
                        _vm._l(_vm.comparison, function(row, key, index) {
                          return _c(
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
                                  class: index % 2 == 1 ? "bg-slab-primary" : ""
                                },
                                [
                                  _c(
                                    "div",
                                    {
                                      staticClass: "w-full text-xs xl:text-base"
                                    },
                                    [
                                      _c(
                                        "div",
                                        {
                                          staticClass:
                                            "p-2 h-24 xl:h-32 border-b border-lightslab"
                                        },
                                        [
                                          _vm.active && _vm.graphReady
                                            ? _c("MiniChart", {
                                                attrs: {
                                                  data: _vm.dataset(key),
                                                  minDate: _vm.range.start,
                                                  maxDate: _vm.range.end,
                                                  active: _vm.active
                                                }
                                              })
                                            : _vm._e()
                                        ],
                                        1
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "div",
                                        {
                                          staticClass:
                                            "px-4 py-2 h-16 border-b border-lightslab",
                                          class: _vm.getBiggestValue(
                                            "confirmed",
                                            row.latest.c
                                          )
                                            ? "bg-darkslab"
                                            : ""
                                        },
                                        [
                                          _vm._v(
                                            "\n                                            " +
                                              _vm._s(
                                                _vm._f("numeralFormat")(
                                                  isNaN(row.latest.c)
                                                    ? 0
                                                    : row.latest.c
                                                )
                                              )
                                          ),
                                          _c("br"),
                                          _vm._v(" "),
                                          row.latest.percent.c > 0
                                            ? _c(
                                                "span",
                                                {
                                                  staticClass:
                                                    "text-xs text-red-400"
                                                },
                                                [
                                                  _vm._v(
                                                    "(+" +
                                                      _vm._s(
                                                        _vm._f("numeralFormat")(
                                                          row.latest.percent.c,
                                                          "0.0%"
                                                        )
                                                      ) +
                                                      ")"
                                                  )
                                                ]
                                              )
                                            : _c(
                                                "span",
                                                {
                                                  staticClass:
                                                    "text-xs text-green-400"
                                                },
                                                [
                                                  _vm._v(
                                                    "(" +
                                                      _vm._s(
                                                        _vm._f("numeralFormat")(
                                                          row.latest.percent.c,
                                                          "0.0%"
                                                        )
                                                      ) +
                                                      ")"
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
                                            "px-4 py-2 h-16 border-b border-lightslab",
                                          class: _vm.getBiggestValue(
                                            "deaths",
                                            row.latest.d
                                          )
                                            ? "bg-darkslab"
                                            : ""
                                        },
                                        [
                                          _vm._v(
                                            "\n                                            " +
                                              _vm._s(
                                                _vm._f("numeralFormat")(
                                                  isNaN(row.latest.d)
                                                    ? 0
                                                    : row.latest.d
                                                )
                                              )
                                          ),
                                          _c("br"),
                                          _vm._v(" "),
                                          row.latest.percent.d > 0
                                            ? _c(
                                                "span",
                                                {
                                                  staticClass:
                                                    "text-xs text-red-400"
                                                },
                                                [
                                                  _vm._v(
                                                    "(+" +
                                                      _vm._s(
                                                        _vm._f("numeralFormat")(
                                                          row.latest.percent.d,
                                                          "0.0%"
                                                        )
                                                      ) +
                                                      ")"
                                                  )
                                                ]
                                              )
                                            : _c(
                                                "span",
                                                {
                                                  staticClass:
                                                    "text-xs text-green-400"
                                                },
                                                [
                                                  _vm._v(
                                                    "(" +
                                                      _vm._s(
                                                        _vm._f("numeralFormat")(
                                                          row.latest.percent.d,
                                                          "0.0%"
                                                        )
                                                      ) +
                                                      ")"
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
                                            "px-4 py-2 h-16 border-b border-lightslab",
                                          class: _vm.getBiggestValue(
                                            "recovered",
                                            row.latest.r
                                          )
                                            ? "bg-darkslab"
                                            : ""
                                        },
                                        [
                                          _vm._v(
                                            "\n                                            " +
                                              _vm._s(
                                                _vm._f("numeralFormat")(
                                                  isNaN(row.latest.r)
                                                    ? 0
                                                    : row.latest.r
                                                )
                                              )
                                          ),
                                          _c("br"),
                                          _vm._v(" "),
                                          row.latest.percent.r > 0
                                            ? _c(
                                                "span",
                                                {
                                                  staticClass:
                                                    "text-xs text-green-400"
                                                },
                                                [
                                                  _vm._v(
                                                    "(+" +
                                                      _vm._s(
                                                        _vm._f("numeralFormat")(
                                                          row.latest.percent.r,
                                                          "0.0%"
                                                        )
                                                      ) +
                                                      ")"
                                                  )
                                                ]
                                              )
                                            : row.latest.percent.r == 0
                                            ? _c(
                                                "span",
                                                {
                                                  staticClass:
                                                    "text-xs text-green-400"
                                                },
                                                [
                                                  _vm._v(
                                                    "(" +
                                                      _vm._s(
                                                        _vm._f("numeralFormat")(
                                                          row.latest.percent.r,
                                                          "0.0%"
                                                        )
                                                      ) +
                                                      ")"
                                                  )
                                                ]
                                              )
                                            : _c(
                                                "span",
                                                {
                                                  staticClass:
                                                    "text-xs text-red-400"
                                                },
                                                [
                                                  _vm._v(
                                                    "(" +
                                                      _vm._s(
                                                        _vm._f("numeralFormat")(
                                                          row.latest.percent.r,
                                                          "0.0%"
                                                        )
                                                      ) +
                                                      ")"
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
                                            "px-4 py-2 h-24 border-b border-lightslab",
                                          class: _vm.getBiggestValue(
                                            "active",
                                            row.latest.a
                                          )
                                            ? "bg-darkslab"
                                            : ""
                                        },
                                        [
                                          _vm._v(
                                            "\n                                            " +
                                              _vm._s(
                                                _vm._f("numeralFormat")(
                                                  isNaN(row.latest.a)
                                                    ? 0
                                                    : row.latest.a
                                                )
                                              )
                                          ),
                                          _c("br"),
                                          _vm._v(" "),
                                          row.latest.delta.a < 0
                                            ? _c(
                                                "span",
                                                {
                                                  staticClass:
                                                    "text-xs text-green-400"
                                                },
                                                [
                                                  _vm._v(
                                                    "(" +
                                                      _vm._s(
                                                        _vm._f("numeralFormat")(
                                                          row.latest.delta.a
                                                        )
                                                      ) +
                                                      ")"
                                                  )
                                                ]
                                              )
                                            : row.latest.delta.a == 0
                                            ? _c(
                                                "span",
                                                {
                                                  staticClass:
                                                    "text-xs text-green-400"
                                                },
                                                [
                                                  _vm._v(
                                                    "(" +
                                                      _vm._s(
                                                        _vm._f("numeralFormat")(
                                                          row.latest.delta.a
                                                        )
                                                      ) +
                                                      ")"
                                                  )
                                                ]
                                              )
                                            : _c(
                                                "span",
                                                {
                                                  staticClass:
                                                    "text-xs text-red-400"
                                                },
                                                [
                                                  _vm._v(
                                                    "(+" +
                                                      _vm._s(
                                                        _vm._f("numeralFormat")(
                                                          row.latest.delta.a
                                                        )
                                                      ) +
                                                      ")"
                                                  )
                                                ]
                                              ),
                                          _c("br"),
                                          _vm._v(" "),
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "text-xs text-blue-400"
                                            },
                                            [
                                              _vm._v(
                                                _vm._s(
                                                  _vm._f("numeralFormat")(
                                                    row.latest.a /
                                                      row.latest.population,
                                                    "0.000%"
                                                  )
                                                ) + " of total population"
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
                                            "px-4 py-2 h-12 border-b border-lightslab",
                                          class: _vm.getBiggestValue(
                                            "confirmedDelta",
                                            row.latest.delta.c
                                          )
                                            ? "bg-darkslab"
                                            : ""
                                        },
                                        [
                                          _vm._v(
                                            "\n                                            " +
                                              _vm._s(
                                                _vm._f("numeralFormat")(
                                                  row.latest.delta.c
                                                )
                                              ) +
                                              "\n                                        "
                                          )
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "div",
                                        {
                                          staticClass:
                                            "px-4 py-2 h-12 border-b border-lightslab",
                                          class: _vm.getBiggestValue(
                                            "deathsDelta",
                                            row.latest.delta.d
                                          )
                                            ? "bg-darkslab"
                                            : ""
                                        },
                                        [
                                          _vm._v(
                                            "\n                                            " +
                                              _vm._s(
                                                _vm._f("numeralFormat")(
                                                  row.latest.delta.d
                                                )
                                              ) +
                                              "\n                                        "
                                          )
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "div",
                                        {
                                          staticClass:
                                            "px-4 py-2 h-12 border-b border-lightslab",
                                          class: _vm.getBiggestValue(
                                            "recoveredDelta",
                                            row.latest.delta.r
                                          )
                                            ? "bg-darkslab"
                                            : ""
                                        },
                                        [
                                          _vm._v(
                                            "\n                                            " +
                                              _vm._s(
                                                _vm._f("numeralFormat")(
                                                  row.latest.delta.r
                                                )
                                              ) +
                                              "\n                                        "
                                          )
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "div",
                                        {
                                          staticClass:
                                            "px-4 py-2 h-12 border-b border-lightslab",
                                          class: _vm.getBiggestValue(
                                            "population",
                                            row.population
                                          )
                                            ? "bg-darkslab"
                                            : ""
                                        },
                                        [
                                          _vm._v(
                                            "\n                                            " +
                                              _vm._s(
                                                _vm._f("numeralFormat")(
                                                  row.population,
                                                  "0,000"
                                                )
                                              ) +
                                              "\n                                        "
                                          )
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "div",
                                        {
                                          staticClass:
                                            "px-4 py-2 h-16 border-b border-lightslab",
                                          class: _vm.getBiggestValue(
                                            "confirmedCapita",
                                            row.latest.capita.c
                                          )
                                            ? "bg-darkslab"
                                            : ""
                                        },
                                        [
                                          _vm._v(
                                            "\n                                            " +
                                              _vm._s(
                                                _vm._f("numeralFormat")(
                                                  row.latest.capita.c,
                                                  "0,000.00"
                                                )
                                              ) +
                                              "\n                                        "
                                          )
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "div",
                                        {
                                          staticClass:
                                            "px-4 py-2 h-16 border-b border-lightslab",
                                          class: _vm.getBiggestValue(
                                            "deathsCapita",
                                            row.latest.capita.d
                                          )
                                            ? "bg-darkslab"
                                            : ""
                                        },
                                        [
                                          _vm._v(
                                            "\n                                            " +
                                              _vm._s(
                                                _vm._f("numeralFormat")(
                                                  row.latest.capita.d,
                                                  "0,000.00"
                                                )
                                              ) +
                                              "\n                                        "
                                          )
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "div",
                                        {
                                          staticClass:
                                            "px-4 py-2 h-16 border-b border-lightslab",
                                          class: _vm.getBiggestValue(
                                            "recoveredCapita",
                                            row.latest.capita.r
                                          )
                                            ? "bg-darkslab"
                                            : ""
                                        },
                                        [
                                          _vm._v(
                                            "\n                                            " +
                                              _vm._s(
                                                _vm._f("numeralFormat")(
                                                  row.latest.capita.r,
                                                  "0,000.00"
                                                )
                                              ) +
                                              "\n                                        "
                                          )
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "div",
                                        {
                                          staticClass:
                                            "px-4 py-2 h-12 border-b border-lightslab",
                                          class: _vm.getBiggestValue(
                                            "confirmedAverage",
                                            row.latest.average.c
                                          )
                                            ? "bg-darkslab"
                                            : ""
                                        },
                                        [
                                          _vm._v(
                                            "\n                                            " +
                                              _vm._s(
                                                _vm._f("numeralFormat")(
                                                  row.latest.average.c,
                                                  "0,000.0"
                                                )
                                              ) +
                                              "\n                                        "
                                          )
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "div",
                                        {
                                          staticClass:
                                            "px-4 py-2 h-12 border-b border-lightslab",
                                          class: _vm.getBiggestValue(
                                            "confirmedGrowth",
                                            row.latest.growth.c
                                          )
                                            ? "bg-darkslab"
                                            : ""
                                        },
                                        [
                                          row.latest.growth.c > 1
                                            ? _c(
                                                "span",
                                                { staticClass: "text-red-400" },
                                                [
                                                  _vm._v(
                                                    _vm._s(
                                                      _vm._f("numeralFormat")(
                                                        row.latest.growth.c,
                                                        "0.00"
                                                      )
                                                    )
                                                  )
                                                ]
                                              )
                                            : _c(
                                                "span",
                                                {
                                                  staticClass: "text-green-400"
                                                },
                                                [
                                                  _vm._v(
                                                    _vm._s(
                                                      _vm._f("numeralFormat")(
                                                        row.latest.growth.c,
                                                        "0.00"
                                                      )
                                                    )
                                                  )
                                                ]
                                              )
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "div",
                                        {
                                          staticClass: "px-4 py-2 h-12",
                                          class: _vm.getBiggestValue(
                                            "stringencyIndex",
                                            row.latest.stringencyindex
                                          )
                                            ? "bg-darkslab"
                                            : ""
                                        },
                                        [
                                          _vm._v(
                                            "\n                                            " +
                                              _vm._s(
                                                _vm._f("numeralFormat")(
                                                  row.latest.stringencyindex,
                                                  "0.00"
                                                )
                                              ) +
                                              "\n                                        "
                                          )
                                        ]
                                      )
                                    ]
                                  )
                                ]
                              )
                            ]
                          )
                        }),
                        _vm._v(" "),
                        _c("div", {
                          staticClass: "border-l border-lightslab h-240"
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/MiniChart.vue?vue&type=template&id=350f5f28&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/MiniChart.vue?vue&type=template&id=350f5f28&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "h-full" },
    [
      _c(
        "keep-alive",
        [
          _vm.active && _vm.dataReady
            ? _c("LineChart", {
                staticClass: "rounded h-full",
                attrs: {
                  data: _vm.dataset().data,
                  options: _vm.dataset().options
                }
              })
            : _vm._e()
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/DailyView.vue?vue&type=template&id=a09de962&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/DailyView.vue?vue&type=template&id=a09de962&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************/
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
          "absolute top-0 right-0 bottom-0 left-0 bg-hoverslab rounded",
        staticStyle: { bottom: "32px" }
      },
      [
        _c(
          "div",
          {
            staticClass: "h-full",
            class: _vm.selectedCompareTab !== "all" ? "hidden" : ""
          },
          [
            _vm.getCompareLength() === 0
              ? _c("div", { staticClass: "m-4" }, [
                  _vm._v(
                    "\n                Select up to " +
                      _vm._s(_vm.options.compare_limit) +
                      " countries or states to begin comparing.\n            "
                  )
                ])
              : _c("Latest", {
                  attrs: {
                    data: _vm.comparisonData,
                    active:
                      _vm.view === "daily" && _vm.selectedCompareTab === "all"
                  }
                })
          ],
          1
        ),
        _vm._v(" "),
        _vm._l(_vm.compare, function(row, key, index) {
          return _vm.getCompareLength() > 0
            ? _c("div", { key: key }, [
                _c(
                  "div",
                  {
                    staticClass: "h-full",
                    class: _vm.selectedCompareTab != key ? "hidden" : ""
                  },
                  [
                    _c("Daily", {
                      attrs: {
                        data: _vm.comparisonData[index],
                        settings: { absolute: true, solo: false }
                      },
                      on: { removeCompare: _vm.removeCompare }
                    })
                  ],
                  1
                )
              ])
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

/***/ "./resources/js/components/Latest.vue":
/*!********************************************!*\
  !*** ./resources/js/components/Latest.vue ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Latest_vue_vue_type_template_id_730f2232___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Latest.vue?vue&type=template&id=730f2232& */ "./resources/js/components/Latest.vue?vue&type=template&id=730f2232&");
/* harmony import */ var _Latest_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Latest.vue?vue&type=script&lang=js& */ "./resources/js/components/Latest.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Latest_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Latest.vue?vue&type=style&index=0&lang=css& */ "./resources/js/components/Latest.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Latest_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Latest_vue_vue_type_template_id_730f2232___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Latest_vue_vue_type_template_id_730f2232___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Latest.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Latest.vue?vue&type=script&lang=js&":
/*!*********************************************************************!*\
  !*** ./resources/js/components/Latest.vue?vue&type=script&lang=js& ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Latest_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Latest.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Latest.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Latest_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Latest.vue?vue&type=style&index=0&lang=css&":
/*!*****************************************************************************!*\
  !*** ./resources/js/components/Latest.vue?vue&type=style&index=0&lang=css& ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Latest_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader!../../../node_modules/css-loader??ref--6-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--6-2!../../../node_modules/vue-loader/lib??vue-loader-options!./Latest.vue?vue&type=style&index=0&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Latest.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Latest_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Latest_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Latest_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Latest_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Latest_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/components/Latest.vue?vue&type=template&id=730f2232&":
/*!***************************************************************************!*\
  !*** ./resources/js/components/Latest.vue?vue&type=template&id=730f2232& ***!
  \***************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Latest_vue_vue_type_template_id_730f2232___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./Latest.vue?vue&type=template&id=730f2232& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Latest.vue?vue&type=template&id=730f2232&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Latest_vue_vue_type_template_id_730f2232___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Latest_vue_vue_type_template_id_730f2232___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/MiniChart.vue":
/*!***********************************************!*\
  !*** ./resources/js/components/MiniChart.vue ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MiniChart_vue_vue_type_template_id_350f5f28_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MiniChart.vue?vue&type=template&id=350f5f28&scoped=true& */ "./resources/js/components/MiniChart.vue?vue&type=template&id=350f5f28&scoped=true&");
/* harmony import */ var _MiniChart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MiniChart.vue?vue&type=script&lang=js& */ "./resources/js/components/MiniChart.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _MiniChart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _MiniChart_vue_vue_type_template_id_350f5f28_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _MiniChart_vue_vue_type_template_id_350f5f28_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "350f5f28",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/MiniChart.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/MiniChart.vue?vue&type=script&lang=js&":
/*!************************************************************************!*\
  !*** ./resources/js/components/MiniChart.vue?vue&type=script&lang=js& ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MiniChart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./MiniChart.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/MiniChart.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MiniChart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/MiniChart.vue?vue&type=template&id=350f5f28&scoped=true&":
/*!******************************************************************************************!*\
  !*** ./resources/js/components/MiniChart.vue?vue&type=template&id=350f5f28&scoped=true& ***!
  \******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MiniChart_vue_vue_type_template_id_350f5f28_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./MiniChart.vue?vue&type=template&id=350f5f28&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/MiniChart.vue?vue&type=template&id=350f5f28&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MiniChart_vue_vue_type_template_id_350f5f28_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MiniChart_vue_vue_type_template_id_350f5f28_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/views/DailyView.vue":
/*!******************************************!*\
  !*** ./resources/js/views/DailyView.vue ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DailyView_vue_vue_type_template_id_a09de962_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DailyView.vue?vue&type=template&id=a09de962&scoped=true& */ "./resources/js/views/DailyView.vue?vue&type=template&id=a09de962&scoped=true&");
/* harmony import */ var _DailyView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DailyView.vue?vue&type=script&lang=js& */ "./resources/js/views/DailyView.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _DailyView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _DailyView_vue_vue_type_template_id_a09de962_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _DailyView_vue_vue_type_template_id_a09de962_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "a09de962",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/DailyView.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/DailyView.vue?vue&type=script&lang=js&":
/*!*******************************************************************!*\
  !*** ./resources/js/views/DailyView.vue?vue&type=script&lang=js& ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DailyView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./DailyView.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/DailyView.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DailyView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/DailyView.vue?vue&type=template&id=a09de962&scoped=true&":
/*!*************************************************************************************!*\
  !*** ./resources/js/views/DailyView.vue?vue&type=template&id=a09de962&scoped=true& ***!
  \*************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DailyView_vue_vue_type_template_id_a09de962_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./DailyView.vue?vue&type=template&id=a09de962&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/DailyView.vue?vue&type=template&id=a09de962&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DailyView_vue_vue_type_template_id_a09de962_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DailyView_vue_vue_type_template_id_a09de962_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);