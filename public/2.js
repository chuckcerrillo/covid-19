(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/StatsChartMobile.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/StatsChartMobile.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _charts_LineChart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./charts/LineChart */ "./resources/js/components/charts/LineChart.vue");
/* harmony import */ var simplebar_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! simplebar-vue */ "./node_modules/simplebar-vue/dist/simplebar-vue.esm.js");
/* harmony import */ var simplebar_dist_simplebar_min_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! simplebar/dist/simplebar.min.css */ "./node_modules/simplebar/dist/simplebar.min.css");
/* harmony import */ var simplebar_dist_simplebar_min_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(simplebar_dist_simplebar_min_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "Comparison",
  components: {
    simplebar: simplebar_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    LineChart: _charts_LineChart__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      'gradualDataset': {
        datasets: false,
        labels: false
      },
      'options': {
        'mode': 'chronological',
        'controls': {
          'primary': 'deltaConfirmed',
          'secondary': '',
          'scaleType': 'linear',
          'menu': true
        },
        'chartsettings': [],
        colors: [{
          bg: 'rgba(102,14,255,0.5)',
          border: 'rgba(102,14,255,1)'
        }, {
          bg: 'rgba(183,148,244,0.5)',
          border: 'rgba(183,148,244,1)'
        }, {
          bg: 'rgba(246,135,179,0.5)',
          border: 'rgba(246,135,179,1)'
        }, {
          bg: 'rgba(252,129,129,0.5)',
          border: 'rgba(252,129,129,1)'
        }, {
          bg: 'rgba(255,36,36,0.5)',
          border: 'rgba(255,36,36,1)'
        }, {
          bg: 'rgba(158,86,0,0.5)',
          border: 'rgba(158,86,0,1)'
        }, {
          bg: 'rgba(247,139,10,0.5)',
          border: 'rgba(247,139,10,1)'
        }, {
          bg: 'rgba(228,197,16,0.5)',
          border: 'rgba(228,197,16,1)'
        }, {
          bg: 'rgba(104,211,145,0.5)',
          border: 'rgba(104,211,145,1)'
        }, {
          bg: 'rgba(79,209,197,0.5)',
          border: 'rgba(79,209,197,1)'
        }, {
          bg: 'rgba(99,179,237,0.5)',
          border: 'rgba(99,179,237,1)'
        }, {
          bg: 'rgba(127,156,245,0.5)',
          border: 'rgba(127,156,245,1)'
        }, {
          bg: 'rgba(3,65,255,0.5)',
          border: 'rgba(3,65,255,1)'
        }, {
          bg: 'rgba(23,47,82,0.5)',
          border: 'rgba(23,47,82,1)'
        }, {
          bg: 'rgba(113,128,150,0.5)',
          border: 'rgba(113,128,150,1)'
        }],
        'background': [{
          primary: 'rgba(38,73,146,1)',
          secondary: 'rgba(207,79,41,0.5)',
          borderPrimary: 'rgba(38,73,146,0.1)',
          borderSecondary: 'rgba(207,79,41,1)'
        }, {
          primary: 'rgba(57,132,182,1)',
          secondary: 'rgba(233,126,59,0.5)',
          borderPrimary: 'rgba(57,132,182,1)',
          borderSecondary: 'rgba(233,126,59,1)'
        }, {
          primary: 'rgba(90,186,209,1)',
          secondary: 'rgba(243,179,85,0.5)',
          borderPrimary: 'rgba(90,186,209,1)',
          borderSecondary: 'rgba(243,179,85,1)'
        }, {
          primary: 'rgba(56,182,36,1)',
          secondary: 'rgba(106,205,90,0.5)',
          borderPrimary: 'rgba(56,182,36,1)',
          borderSecondary: 'rgba(106,205,90,1)'
        }, {
          primary: 'rgba(192,36,36,1)',
          secondary: 'rgba(205,90,90,0.5)',
          borderPrimary: 'rgba(192,36,36,1)',
          borderSecondary: 'rgba(205,90,90,1)'
        }]
      },
      ui: {
        'primary': false,
        'secondary': false,
        'settings': false,
        'colordropdown': {
          show: false,
          id: false
        },
        section: 'metrics'
      },
      'graphControls': {
        'x': [['chronological', 'Chronological'], ['from1', 'From first case'], ['from100', 'From 100 cases'], ['from1death', 'From first death']],
        'y': [['confirmed', 'Confirmed cases'], ['deltaConfirmed', 'Daily confirmed cases'], ['deaths', 'Confirmed deaths'], ['deltaDeaths', 'Daily confirmed deaths'], ['recovered', 'Confirmed recoveries'], ['active', 'Active cases'], ['deltaRecovered', 'Daily confirmed recoveries'], ['average', 'Average new cases (5 day spread)'], ['growthFactor', 'Growth factor']],
        'scaleType': [['logarithmic', 'Logarithmic'], ['linear', 'Linear']]
      },
      stats: {}
    };
  },
  props: ['data', 'full', 'config', 'active'],
  methods: {
    setColor: function setColor(name, color) {
      this.addSetting(name, color);
      this.ui.colordropdown.show = false;
    },
    toggleColorDropdown: function toggleColorDropdown(name, event) {
      if (this.ui.colordropdown.id == name) {
        this.ui.colordropdown.show = !this.ui.colordropdown.show;
      } else {
        this.ui.colordropdown.id = name;
        this.ui.colordropdown.show = true;
      }

      event.stopPropagation();
    },
    addSetting: function addSetting(name, settings) {
      var data = [];
      var current = this.options.chartsettings;
      var found = false;

      var getRandomIntInclusive = function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
      }; // Copy over locations that are still used


      for (var x in this.data) {
        for (var y in current) {
          if (current[y].name == this.data[x].name.full) {
            data.push(current[y]);
            break;
          }
        }
      } // Check if we are adding a new location


      if (data.length > 0) {
        for (var y in data) {
          if (data[y].name == name) {
            found = y;
            break;
          }
        }
      }

      if (!found) {
        var random1 = getRandomIntInclusive(1, this.options.colors.length) - 1;
        var random2 = getRandomIntInclusive(1, this.options.colors.length) - 1;
        var scaleType = {
          primary: 'linear',
          secondary: 'linear'
        };

        if (data.length > 0) {
          scaleType.primary = data[0].primary.scale;
          scaleType.secondary = data[0].secondary.scale;
        }

        data.push({
          name: name,
          primary: {
            color: this.options.colors[random1].bg,
            border: this.options.colors[random1].border,
            type: 'bar',
            scale: scaleType.primary
          },
          secondary: {
            color: this.options.colors[random2].bg,
            border: this.options.colors[random2].border,
            type: 'line',
            scale: scaleType.secondary
          }
        });
      } else {
        if (settings && settings.primary && settings.primary.color) {
          data[found].primary.color = settings.primary.color;
        }

        if (settings && settings.primary && settings.primary.border) {
          data[found].primary.border = settings.primary.border;
        }

        if (settings && settings.primary && settings.primary.type) {
          data[found].primary.type = settings.primary.type;
        }

        if (settings && settings.primary && settings.primary.scale) {
          data[found].primary.scale = settings.primary.scale;

          for (var x in data) {
            data[x].primary.scale = settings.primary.scale;
          }
        }

        if (settings && settings.secondary && settings.secondary.color) {
          data[found].secondary.color = settings.secondary.color;
        }

        if (settings && settings.secondary && settings.secondary.border) {
          data[found].secondary.border = settings.secondary.border;
        }

        if (settings && settings.secondary && settings.secondary.type) {
          data[found].secondary.type = settings.secondary.type;
        }

        if (settings && settings.secondary && settings.secondary.scale) {
          data[found].secondary.scale = settings.secondary.scale;

          for (var x in data) {
            data[x].secondary.scale = settings.secondary.scale;
          }
        }
      }

      this.options.chartsettings = data;
    },
    getFieldName: function getFieldName(key) {
      if (key) {
        for (var x in this.graphControls['y']) {
          if (this.graphControls['y'][x][0] == key) {
            return this.graphControls['y'][x][1];
          }
        }
      }

      return '';
    },
    selectedMode: function selectedMode(key) {
      if (key == this.options.mode) {
        return true;
      }

      return false;
    },
    selectMode: function selectMode(key) {
      this.options.mode = key;
    },
    selectedScaleType: function selectedScaleType(key) {
      if (key == this.options.controls.scaleType) {
        return true;
      }

      return false;
    },
    selectScaleType: function selectScaleType(key) {
      this.options.controls.scaleType = key;
    },
    selectField: function selectField(key, level) {
      if (level) {
        this.options.controls[level] = key;
      }

      this.ui[level] = false;
    },
    selectedField: function selectedField(key, level) {
      if (level) {
        if (this.options.controls[level] == key) {
          return true;
        }
      }

      return false;
    },
    getLabels: function getLabels() {
      var data = [];

      for (var x in this.data) {}

      return data;
    },
    getRows: function getRows(options) {
      for (var x in this.data) {
        var country = this.data[x];
      }
    },
    resetDropdowns: function resetDropdowns() {
      this.ui.primary = false;
      this.ui.secondary = false;
      this.ui.settings = false;
    }
  },
  computed: {
    chartsettings: function chartsettings() {
      var data = [];

      for (var x in this.data) {
        this.addSetting(this.data[x].name.full);
      }

      return this.options.chartsettings;
    },
    settings: function settings() {
      return _objectSpread({}, this.options, {}, this.config);
    },
    xAxis: function xAxis() {
      return [this.options.mode];
    },
    yAxis: function yAxis() {
      var data = [];
      if (this.options.controls.primary) data.push(this.options.controls.primary);
      if (this.options.controls.secondary) data.push(this.options.controls.secondary);
      return data;
    },
    comparison: function comparison() {
      return this.data;
    },
    full_stats: function full_stats() {
      var data = _.cloneDeep(this.data);

      for (var x in data) {}

      return data;
    },
    dataset: function dataset() {
      var xAxis = this.xAxis,
          yAxis = this.yAxis,
          data = false;

      if (this.options.mode == 'chronological') {
        data = _.clone(this.datasetChronological);
      } else if (this.options.mode == 'from1' || this.options.mode == 'from100' || this.options.mode == 'from1death') {
        data = _.clone(this.datasetCaseCount);
      }

      return data;
    },
    datasetChronological: function datasetChronological() {
      var data = {
        labels: [],
        datasets: []
      },
          options,
          key,
          content = [],
          background = this.options.background; // OPTIONS

      options = {
        responsive: true,
        maintainAspectRatio: false,
        hoverMode: 'index',
        stacked: false,
        legend: {
          labels: {
            fontColor: '#2c3531'
          }
        },
        scales: {
          xAxes: [{
            ticks: {
              fontColor: '#2c3531',
              callback: function callback(dataLabel, index) {
                return index % 2 === 0 ? dataLabel : '';
              }
            }
          }],
          yAxes: []
        },
        plugins: {
          zoom: {
            pan: {
              enabled: true,
              mode: 'xy'
            },
            zoom: {
              enabled: true,
              mode: 'xy'
            }
          }
        },
        watermark: {
          image: '/img/logo/logo-text.png',
          width: 100,
          height: 129,
          x: 30,
          y: 50,
          opacity: 0.1,
          alignX: "right",
          alignY: "bottom",
          alignToChartArea: false,
          position: "back"
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

          if (start.length === 0 || moment__WEBPACK_IMPORTED_MODULE_3___default()(date).format('YYYY-MM-DD') < start) {
            start = moment__WEBPACK_IMPORTED_MODULE_3___default()(date).format('YYYY-MM-DD');
          }

          if (end.length === 0 || moment__WEBPACK_IMPORTED_MODULE_3___default()(date).format('YYYY-MM-DD') > end) {
            end = moment__WEBPACK_IMPORTED_MODULE_3___default()(date).format('YYYY-MM-DD');
          }
        }
      } // Assemble content


      for (var x = 0; x <= moment__WEBPACK_IMPORTED_MODULE_3___default()(end).diff(moment__WEBPACK_IMPORTED_MODULE_3___default()(start), 'days'); x++) {
        var current_date = _.clone(moment__WEBPACK_IMPORTED_MODULE_3___default()(start).add(x, 'days').format('YYYY-MM-DD'));

        data.labels.push(current_date);

        for (var y = 0; y < this.data.length; y++) {
          if (!content[y]) {
            content.push({
              confirmed: [],
              deaths: [],
              recovered: [],
              active: [],
              deltaConfirmed: [],
              deltaDeaths: [],
              deltaRecovered: [],
              average: [],
              growthFactor: []
            });
          }

          if (this.data[y].daily) {
            var found = false;
            var stats = this.data[y].daily;

            for (var z in stats) {
              var row = stats[z];

              if (moment__WEBPACK_IMPORTED_MODULE_3___default()(row.date).format('YYYY-MM-DD') === current_date) {
                content[y].confirmed.push(row.c);
                content[y].deaths.push(row.d);
                content[y].recovered.push(row.r);
                content[y].active.push(row.a);
                content[y].deltaConfirmed.push(row.delta.c);
                content[y].deltaDeaths.push(row.delta.d);
                content[y].deltaRecovered.push(row.delta.r);
                content[y].average.push(Math.round(row.average.c * 100) / 100);
                content[y].growthFactor.push(Math.round(row.growth.c * 100) / 100);
                found = true;
              }
            } // If today's data is missing, use previous day's


            if (!found) {
              if (content[y].confirmed.length > 0) {
                content[y].confirmed.push(content[y].confirmed.slice(-1));
                content[y].deaths.push(content[y].deaths.slice(-1));
                content[y].recovered.push(content[y].recovered.slice(-1));
                content[y].active.push(content[y].active.slice(-1));
                content[y].deltaConfirmed.push(content[y].deltaConfirmed.slice(-1));
                content[y].deltaDeaths.push(content[y].deltaDeaths.slice(-1));
                content[y].deltaRecovered.push(content[y].deltaRecovered.slice(-1));
                content[y].average.push(content[y].average.slice(-1));
                content[y].growthFactor.push(content[y].growthFactor.slice(-1));
              } else {
                content[y].confirmed.push(0);
                content[y].deaths.push(0);
                content[y].recovered.push(0);
                content[y].active.push(0);
                content[y].deltaConfirmed.push(0);
                content[y].deltaDeaths.push(0);
                content[y].deltaRecovered.push(0);
                content[y].average.push(0);
                content[y].growthFactor.push(0);
              }
            }
          }
        }
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

          if (this.yAxis[y] == 'confirmed') {
            data.datasets.push({
              label: 'Confirmed (' + this.data[x].name.full + ')',
              type: this.options.chartsettings[x][metric].type,
              backgroundColor: this.options.chartsettings[x][metric].color,
              borderColor: this.options.chartsettings[x][metric].border,
              borderDash: [10, 5],
              borderWidth: 2,
              pointRadius: 5,
              fill: false,
              data: _.clone(content[x].confirmed),
              yAxisID: 'y-confirmed'
            });
            options.scales.yAxes.push({
              responsive: true,
              scaleLabel: {
                display: true,
                labelString: 'Confirmed'
              },
              type: this.options.chartsettings[x][metric].scale,
              display: true,
              position: position,
              id: 'y-confirmed',
              // grid line settings
              gridLines: {
                drawOnChartArea: false // only want the grid lines for one axis to show up

              },
              ticks: {
                fontColor: '#2c3531',
                callback: function callback(tick, index, ticks) {
                  if (tick.toString().substr(0, 1) == 1 || tick.toString().substr(0, 1) == 5) {
                    return tick.toLocaleString();
                  }
                }
              }
            });
          } else if (this.yAxis[y] == 'deaths') {
            data.datasets.push({
              label: 'Deaths (' + this.data[x].name.full + ')',
              type: this.options.chartsettings[x][metric].type,
              backgroundColor: this.options.chartsettings[x][metric].color,
              borderColor: this.options.chartsettings[x][metric].border,
              borderDash: [10, 5],
              borderWidth: 2,
              pointRadius: 5,
              fill: false,
              data: _.clone(content[x].deaths),
              yAxisID: 'y-deaths'
            });
            options.scales.yAxes.push({
              responsive: true,
              scaleLabel: {
                display: true,
                labelString: 'Deaths'
              },
              type: this.options.chartsettings[x][metric].scale,
              display: true,
              position: position,
              id: 'y-deaths',
              // grid line settings
              gridLines: {
                drawOnChartArea: false // only want the grid lines for one axis to show up

              },
              ticks: {
                fontColor: '#2c3531',
                callback: function callback(tick, index, ticks) {
                  if (tick.toString().substr(0, 1) == 1 || tick.toString().substr(0, 1) == 5) {
                    return tick.toLocaleString();
                  }
                }
              }
            });
          } else if (this.yAxis[y] == 'recovered') {
            data.datasets.push({
              label: 'Recovered (' + this.data[x].name.full + ')',
              type: this.options.chartsettings[x][metric].type,
              backgroundColor: this.options.chartsettings[x][metric].color,
              borderColor: this.options.chartsettings[x][metric].border,
              borderDash: [10, 5],
              borderWidth: 2,
              pointRadius: 5,
              fill: false,
              data: _.clone(content[x].recovered),
              yAxisID: 'y-recovered'
            });
            options.scales.yAxes.push({
              responsive: true,
              scaleLabel: {
                display: true,
                labelString: 'Recovered'
              },
              type: this.options.chartsettings[x][metric].scale,
              display: true,
              position: position,
              id: 'y-recovered',
              // grid line settings
              gridLines: {
                drawOnChartArea: false // only want the grid lines for one axis to show up

              },
              ticks: {
                fontColor: '#2c3531',
                callback: function callback(tick, index, ticks) {
                  if (tick.toString().substr(0, 1) == 1 || tick.toString().substr(0, 1) == 5) {
                    return tick.toLocaleString();
                  }
                }
              }
            });
          } else if (this.yAxis[y] == 'active') {
            data.datasets.push({
              label: 'Active (' + this.data[x].name.full + ')',
              type: this.options.chartsettings[x][metric].type,
              backgroundColor: this.options.chartsettings[x][metric].color,
              borderColor: this.options.chartsettings[x][metric].border,
              borderDash: [10, 5],
              borderWidth: 2,
              pointRadius: 5,
              fill: false,
              data: _.clone(content[x].active),
              yAxisID: 'y-active'
            });
            options.scales.yAxes.push({
              responsive: true,
              scaleLabel: {
                display: true,
                labelString: 'Active'
              },
              type: this.options.chartsettings[x][metric].scale,
              display: true,
              position: position,
              id: 'y-active',
              // grid line settings
              gridLines: {
                drawOnChartArea: false // only want the grid lines for one axis to show up

              },
              ticks: {
                fontColor: '#2c3531',
                callback: function callback(tick, index, ticks) {
                  if (tick.toString().substr(0, 1) == 1 || tick.toString().substr(0, 1) == 5) {
                    return tick.toLocaleString();
                  }
                }
              }
            });
          } else if (this.yAxis[y] == 'deltaConfirmed') {
            data.datasets.push({
              label: 'New cases per day (' + this.data[x].name.full + ')',
              type: this.options.chartsettings[x][metric].type,
              backgroundColor: this.options.chartsettings[x][metric].color,
              borderColor: this.options.chartsettings[x][metric].border,
              borderDash: [10, 5],
              borderWidth: 2,
              pointRadius: 5,
              fill: false,
              data: _.clone(content[x].deltaConfirmed),
              yAxisID: 'y-deltaConfirmed'
            });
            options.scales.yAxes.push({
              responsive: true,
              scaleLabel: {
                display: true,
                labelString: 'New cases per day'
              },
              type: this.options.chartsettings[x][metric].scale,
              display: true,
              position: position,
              id: 'y-deltaConfirmed',
              // grid line settings
              gridLines: {
                drawOnChartArea: false // only want the grid lines for one axis to show up

              },
              ticks: {
                fontColor: '#2c3531',
                callback: function callback(tick, index, ticks) {
                  if (tick.toString().substr(0, 1) == 1 || tick.toString().substr(0, 1) == 5) {
                    return tick.toLocaleString();
                  }
                }
              }
            });
          } else if (this.yAxis[y] == 'deltaDeaths') {
            data.datasets.push({
              label: 'New deaths per day (' + this.data[x].name.full + ')',
              type: this.options.chartsettings[x][metric].type,
              backgroundColor: this.options.chartsettings[x][metric].color,
              borderColor: this.options.chartsettings[x][metric].border,
              borderDash: [10, 5],
              borderWidth: 2,
              pointRadius: 5,
              fill: false,
              data: _.clone(content[x].deltaDeaths),
              yAxisID: 'y-deltaDeaths'
            });
            options.scales.yAxes.push({
              responsive: true,
              scaleLabel: {
                display: true,
                labelString: 'New deaths per day'
              },
              type: this.options.chartsettings[x][metric].scale,
              display: true,
              position: position,
              id: 'y-deltaDeaths',
              // grid line settings
              gridLines: {
                drawOnChartArea: false // only want the grid lines for one axis to show up

              },
              ticks: {
                fontColor: '#2c3531',
                callback: function callback(tick, index, ticks) {
                  if (tick.toString().substr(0, 1) == 1 || tick.toString().substr(0, 1) == 5) {
                    return tick.toLocaleString();
                  }
                }
              }
            });
          } else if (this.yAxis[y] == 'deltaRecovered') {
            data.datasets.push({
              label: 'New recoveries per day (' + this.data[x].name.full + ')',
              type: this.options.chartsettings[x][metric].type,
              backgroundColor: this.options.chartsettings[x][metric].color,
              borderColor: this.options.chartsettings[x][metric].border,
              borderDash: [10, 5],
              borderWidth: 2,
              pointRadius: 5,
              fill: false,
              data: _.clone(content[x].deltaRecovered),
              yAxisID: 'y-deltaRecovered'
            });
            options.scales.yAxes.push({
              responsive: true,
              scaleLabel: {
                display: true,
                labelString: 'New recoveries per day'
              },
              type: this.options.chartsettings[x][metric].scale,
              display: true,
              position: position,
              id: 'y-deltaRecovered',
              // grid line settings
              gridLines: {
                drawOnChartArea: false // only want the grid lines for one axis to show up

              },
              ticks: {
                fontColor: '#2c3531',
                callback: function callback(tick, index, ticks) {
                  if (tick.toString().substr(0, 1) == 1 || tick.toString().substr(0, 1) == 5) {
                    return tick.toLocaleString();
                  }
                }
              }
            });
          } else if (this.yAxis[y] == 'average') {
            data.datasets.push({
              label: 'Average growth (' + this.data[x].name.full + ')',
              type: this.options.chartsettings[x][metric].type,
              backgroundColor: this.options.chartsettings[x][metric].color,
              borderColor: this.options.chartsettings[x][metric].border,
              borderDash: [10, 5],
              borderWidth: 2,
              pointRadius: 5,
              fill: false,
              data: _.clone(content[x].average),
              yAxisID: 'y-average'
            });
            options.scales.yAxes.push({
              responsive: true,
              scaleLabel: {
                display: true,
                labelString: 'Average growth'
              },
              type: this.options.chartsettings[x][metric].scale,
              display: true,
              position: position,
              id: 'y-average',
              // grid line settings
              gridLines: {
                drawOnChartArea: false // only want the grid lines for one axis to show up

              },
              ticks: {
                fontColor: '#2c3531',
                callback: function callback(tick, index, ticks) {
                  if (tick.toString().substr(0, 1) == 1 || tick.toString().substr(0, 1) == 5) {
                    return tick.toLocaleString();
                  }
                }
              }
            });
          } else if (this.yAxis[y] == 'growthFactor') {
            data.datasets.push({
              label: 'Growth factor (' + this.data[x].name.full + ')',
              type: this.options.chartsettings[x][metric].type,
              backgroundColor: this.options.chartsettings[x][metric].color,
              borderColor: this.options.chartsettings[x][metric].border,
              borderDash: [10, 5],
              borderWidth: 2,
              pointRadius: 5,
              fill: false,
              data: _.clone(content[x].growthFactor),
              yAxisID: 'y-growthFactor'
            });
            options.scales.yAxes.push({
              responsive: true,
              scaleLabel: {
                display: true,
                labelString: 'Growth Factor'
              },
              type: this.options.chartsettings[x][metric].scale,
              display: true,
              position: position,
              id: 'y-growthFactor',
              // grid line settings
              gridLines: {
                drawOnChartArea: false // only want the grid lines for one axis to show up

              },
              ticks: {
                fontColor: '#2c3531',
                callback: function callback(tick, index, ticks) {
                  return tick.toLocaleString();
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
    },
    datasetCaseCount: function datasetCaseCount() {
      var data = {
        labels: [],
        datasets: []
      },
          options,
          key,
          totalDays = 0,
          content = [],
          background = this.options.background; // OPTIONS

      options = {
        responsive: true,
        maintainAspectRatio: false,
        hoverMode: 'index',
        stacked: false,
        legend: {
          labels: {
            fontColor: '#2c3531'
          }
        },
        scales: {
          xAxes: [{
            ticks: {
              fontColor: '#2c3531',
              callback: function callback(dataLabel, index) {
                return index % 4 === 0 ? dataLabel : '';
              }
            }
          }],
          yAxes: []
        },
        plugins: {
          zoom: {
            pan: {
              enabled: true,
              mode: 'xy'
            },
            zoom: {
              enabled: true,
              mode: 'xy'
            }
          }
        },
        watermark: {
          image: '/img/logo/logo-text.png',
          x: 100,
          y: 70,
          width: 194,
          height: 250,
          opacity: 0.1,
          alignX: "right",
          alignY: "bottom",
          alignToChartArea: false,
          position: "back"
        }
      };
      var count = 0;

      for (var x in this.data) {
        count++;
      } // Exit if there are no countries to compare


      if (count == 0) return data; // Assemble content

      for (var country_index = 0; country_index < this.data.length; country_index++) {
        var start = false;

        for (var x in this.data[country_index].daily) {
          var row = this.data[country_index].daily[x]; // We haven't started logging yet

          if (!start) {
            if (this.options.mode == 'from1' && parseInt(row.c) >= 1) {
              start = true;
            } else if (this.options.mode == 'from100' && parseInt(row.c) >= 100) {
              start = true;
            } else if (this.options.mode == 'from1death' && parseInt(row.d) >= 1) {
              start = true;
            }
          } // Now let's get ready to log


          if (start) {
            // Initialise this new row
            if (!content[x]) {
              content.push({
                confirmed: [],
                deaths: [],
                recovered: [],
                active: [],
                deltaConfirmed: [],
                deltaDeaths: [],
                deltaRecovered: [],
                average: [],
                growthFactor: []
              });
            }

            content[country_index].confirmed.push(row.c);
            content[country_index].deaths.push(row.d);
            content[country_index].recovered.push(row.r);
            content[country_index].active.push(row.a);
            content[country_index].deltaConfirmed.push(row.delta.c);
            content[country_index].deltaDeaths.push(row.delta.d);
            content[country_index].deltaRecovered.push(row.delta.r);
            content[country_index].average.push(Math.round(row.average.c * 100) / 100);
            content[country_index].growthFactor.push(Math.round(row.growth.c * 100) / 100);
          }
        }

        if (totalDays < content[country_index].confirmed.length) {
          totalDays = content[country_index].confirmed.length;
        }
      }

      for (var x = 1; x <= totalDays; x++) {
        data.labels.push('Day ' + x);
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

          if (this.yAxis[y] == 'confirmed') {
            data.datasets.push({
              label: 'Confirmed (' + this.data[x].name.full + ')',
              type: this.options.chartsettings[x][metric].type,
              backgroundColor: this.options.chartsettings[x][metric].color,
              borderColor: this.options.chartsettings[x][metric].border,
              borderDash: [10, 5],
              borderWidth: 2,
              pointRadius: 5,
              fill: false,
              data: _.cloneDeep(content[x].confirmed),
              yAxisID: 'y-confirmed'
            });
            options.scales.yAxes.push({
              responsive: true,
              scaleLabel: {
                display: true,
                labelString: 'Confirmed'
              },
              type: this.options.chartsettings[x][metric].scale,
              display: true,
              position: position,
              id: 'y-confirmed',
              // grid line settings
              gridLines: {
                drawOnChartArea: false // only want the grid lines for one axis to show up

              },
              ticks: {
                fontColor: '#2c3531',
                callback: function callback(tick, index, ticks) {
                  if (tick.toString().substr(0, 1) == 1 || tick.toString().substr(0, 1) == 5) {
                    return tick.toLocaleString();
                  }
                }
              }
            });
          } else if (this.yAxis[y] == 'deaths') {
            data.datasets.push({
              label: 'Deaths (' + this.data[x].name.full + ')',
              type: this.options.chartsettings[x][metric].type,
              backgroundColor: this.options.chartsettings[x][metric].color,
              borderColor: this.options.chartsettings[x][metric].border,
              borderDash: [10, 5],
              borderWidth: 2,
              pointRadius: 5,
              fill: false,
              data: _.cloneDeep(content[x].deaths),
              yAxisID: 'y-deaths'
            });
            options.scales.yAxes.push({
              responsive: true,
              scaleLabel: {
                display: true,
                labelString: 'Deaths'
              },
              type: this.options.chartsettings[x][metric].scale,
              display: true,
              position: position,
              id: 'y-deaths',
              // grid line settings
              gridLines: {
                drawOnChartArea: false // only want the grid lines for one axis to show up

              },
              ticks: {
                fontColor: '#2c3531',
                callback: function callback(tick, index, ticks) {
                  if (tick.toString().substr(0, 1) == 1 || tick.toString().substr(0, 1) == 5) {
                    return tick.toLocaleString();
                  }
                }
              }
            });
          } else if (this.yAxis[y] == 'recovered') {
            data.datasets.push({
              label: 'Recovered (' + this.data[x].name.full + ')',
              type: this.options.chartsettings[x][metric].type,
              backgroundColor: this.options.chartsettings[x][metric].color,
              borderColor: this.options.chartsettings[x][metric].border,
              borderDash: [10, 5],
              borderWidth: 2,
              pointRadius: 5,
              fill: false,
              data: _.cloneDeep(content[x].recovered),
              yAxisID: 'y-recovered'
            });
            options.scales.yAxes.push({
              responsive: true,
              scaleLabel: {
                display: true,
                labelString: 'Recovered'
              },
              type: this.options.chartsettings[x][metric].scale,
              display: true,
              position: position,
              id: 'y-recovered',
              // grid line settings
              gridLines: {
                drawOnChartArea: false // only want the grid lines for one axis to show up

              },
              ticks: {
                fontColor: '#2c3531',
                callback: function callback(tick, index, ticks) {
                  if (tick.toString().substr(0, 1) == 1 || tick.toString().substr(0, 1) == 5) {
                    return tick.toLocaleString();
                  }
                }
              }
            });
          } else if (this.yAxis[y] == 'active') {
            data.datasets.push({
              label: 'Active (' + this.data[x].name.full + ')',
              type: this.options.chartsettings[x][metric].type,
              backgroundColor: this.options.chartsettings[x][metric].color,
              borderColor: this.options.chartsettings[x][metric].border,
              borderDash: [10, 5],
              borderWidth: 2,
              pointRadius: 5,
              fill: false,
              data: _.cloneDeep(content[x].active),
              yAxisID: 'y-active'
            });
            options.scales.yAxes.push({
              responsive: true,
              scaleLabel: {
                display: true,
                labelString: 'Active'
              },
              type: this.options.chartsettings[x][metric].scale,
              display: true,
              position: position,
              id: 'y-active',
              // grid line settings
              gridLines: {
                drawOnChartArea: false // only want the grid lines for one axis to show up

              },
              ticks: {
                fontColor: '#2c3531',
                callback: function callback(tick, index, ticks) {
                  if (tick.toString().substr(0, 1) == 1 || tick.toString().substr(0, 1) == 5) {
                    return tick.toLocaleString();
                  }
                }
              }
            });
          } else if (this.yAxis[y] == 'deltaConfirmed') {
            data.datasets.push({
              label: 'New cases per day (' + this.data[x].name.full + ')',
              type: this.options.chartsettings[x][metric].type,
              backgroundColor: this.options.chartsettings[x][metric].color,
              borderColor: this.options.chartsettings[x][metric].border,
              borderDash: [10, 5],
              borderWidth: 2,
              pointRadius: 5,
              fill: false,
              data: _.cloneDeep(content[x].deltaConfirmed),
              yAxisID: 'y-deltaConfirmed'
            });
            options.scales.yAxes.push({
              responsive: true,
              scaleLabel: {
                display: true,
                labelString: 'New cases per day'
              },
              type: this.options.chartsettings[x][metric].scale,
              display: true,
              position: position,
              id: 'y-deltaConfirmed',
              // grid line settings
              gridLines: {
                drawOnChartArea: false // only want the grid lines for one axis to show up

              },
              ticks: {
                fontColor: '#2c3531',
                callback: function callback(tick, index, ticks) {
                  if (tick.toString().substr(0, 1) == 1 || tick.toString().substr(0, 1) == 5) {
                    return tick.toLocaleString();
                  }
                }
              }
            });
          } else if (this.yAxis[y] == 'deltaDeaths') {
            data.datasets.push({
              label: 'New deaths per day (' + this.data[x].name.full + ')',
              type: this.options.chartsettings[x][metric].type,
              backgroundColor: this.options.chartsettings[x][metric].color,
              borderColor: this.options.chartsettings[x][metric].border,
              borderDash: [10, 5],
              borderWidth: 2,
              pointRadius: 5,
              fill: false,
              data: _.cloneDeep(content[x].deltaDeaths),
              yAxisID: 'y-deltaDeaths'
            });
            options.scales.yAxes.push({
              responsive: true,
              scaleLabel: {
                display: true,
                labelString: 'New deaths per day'
              },
              type: this.options.chartsettings[x][metric].scale,
              display: true,
              position: position,
              id: 'y-deltaDeaths',
              // grid line settings
              gridLines: {
                drawOnChartArea: false // only want the grid lines for one axis to show up

              },
              ticks: {
                fontColor: '#2c3531',
                callback: function callback(tick, index, ticks) {
                  if (tick.toString().substr(0, 1) == 1 || tick.toString().substr(0, 1) == 5) {
                    return tick.toLocaleString();
                  }
                }
              }
            });
          } else if (this.yAxis[y] == 'deltaRecovered') {
            data.datasets.push({
              label: 'New recoveries per day (' + this.data[x].name.full + ')',
              type: this.options.chartsettings[x][metric].type,
              backgroundColor: this.options.chartsettings[x][metric].color,
              borderColor: this.options.chartsettings[x][metric].border,
              borderDash: [10, 5],
              borderWidth: 2,
              pointRadius: 5,
              fill: false,
              data: _.cloneDeep(content[x].deltaRecovered),
              yAxisID: 'y-deltaRecovered'
            });
            options.scales.yAxes.push({
              responsive: true,
              scaleLabel: {
                display: true,
                labelString: 'New recoveries per day'
              },
              type: this.options.chartsettings[x][metric].scale,
              display: true,
              position: position,
              id: 'y-deltaRecovered',
              // grid line settings
              gridLines: {
                drawOnChartArea: false // only want the grid lines for one axis to show up

              },
              ticks: {
                fontColor: '#2c3531',
                callback: function callback(tick, index, ticks) {
                  if (tick.toString().substr(0, 1) == 1 || tick.toString().substr(0, 1) == 5) {
                    return tick.toLocaleString();
                  }
                }
              }
            });
          } else if (this.yAxis[y] == 'average') {
            data.datasets.push({
              label: 'Average growth (' + this.data[x].name.full + ')',
              type: this.options.chartsettings[x][metric].type,
              backgroundColor: this.options.chartsettings[x][metric].color,
              borderColor: this.options.chartsettings[x][metric].border,
              borderDash: [10, 5],
              borderWidth: 2,
              pointRadius: 5,
              fill: false,
              data: _.cloneDeep(content[x].average),
              yAxisID: 'y-average'
            });
            options.scales.yAxes.push({
              responsive: true,
              scaleLabel: {
                display: true,
                labelString: 'Average growth'
              },
              type: this.options.chartsettings[x][metric].scale,
              display: true,
              position: position,
              id: 'y-average',
              // grid line settings
              gridLines: {
                drawOnChartArea: false // only want the grid lines for one axis to show up

              },
              ticks: {
                fontColor: '#2c3531',
                callback: function callback(tick, index, ticks) {
                  if (tick.toString().substr(0, 1) == 1 || tick.toString().substr(0, 1) == 5) {
                    return tick.toLocaleString();
                  }
                }
              }
            });
          } else if (this.yAxis[y] == 'growthFactor') {
            data.datasets.push({
              label: 'Growth factor (' + this.data[x].name.full + ')',
              type: this.options.chartsettings[x][metric].type,
              backgroundColor: this.options.chartsettings[x][metric].color,
              borderColor: this.options.chartsettings[x][metric].border,
              borderDash: [10, 5],
              borderWidth: 2,
              pointRadius: 5,
              fill: false,
              data: _.cloneDeep(content[x].growthFactor),
              yAxisID: 'y-growthFactor'
            });
            options.scales.yAxes.push({
              responsive: true,
              scaleLabel: {
                display: true,
                labelString: 'Growth factor'
              },
              type: this.options.chartsettings[x][metric].scale,
              display: true,
              position: position,
              id: 'y-growthFactor',
              // grid line settings
              gridLines: {
                drawOnChartArea: false // only want the grid lines for one axis to show up

              },
              ticks: {
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
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/StatsChartMobile.vue?vue&type=template&id=601239ec&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/StatsChartMobile.vue?vue&type=template&id=601239ec&scoped=true& ***!
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
    {
      staticClass: "absolute top-0 left-0 right-0 bottom-4",
      on: {
        click: function($event) {
          return _vm.resetDropdowns()
        }
      }
    },
    [
      _c(
        "div",
        {
          staticClass:
            "absolute inset-x-0 top-0 bottom-3 bg-slab flex items-start",
          class: _vm.ui.settings ? "z-10" : "w-64 z-0 hidden",
          on: {
            click: function($event) {
              $event.stopPropagation()
              return false($event)
            }
          }
        },
        [
          _c("div", [
            _c(
              "div",
              { staticClass: "flex items-center justify-between mb-2" },
              [
                _c(
                  "div",
                  {
                    staticClass: "rounded m-2 mx-1 p-2 px-4 text-xs",
                    class: _vm.ui.section === "metrics" ? "bg-hoverslab" : "",
                    on: {
                      click: function($event) {
                        _vm.ui.section = "metrics"
                      }
                    }
                  },
                  [_vm._v("Metrics")]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    staticClass: "rounded m-2 mx-1 p-2 px-4 text-xs",
                    class: _vm.ui.section === "settings" ? "bg-hoverslab" : "",
                    on: {
                      click: function($event) {
                        _vm.ui.section = "settings"
                      }
                    }
                  },
                  [_vm._v("Colours and Scales")]
                )
              ]
            ),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "w-full" },
              [
                _c(
                  "simplebar",
                  {
                    staticClass:
                      "absolute bg-hoverslab inset-x-0 bottom-0 top-3 z-10 overflow-x-hidden",
                    staticStyle: { position: "absolute" }
                  },
                  [
                    _c(
                      "div",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: _vm.ui.section === "metrics",
                            expression: "ui.section === 'metrics'"
                          }
                        ]
                      },
                      [
                        _c("div", { staticClass: "p-2" }, [
                          _vm._v("Primary Metric")
                        ]),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass:
                              "border border-lightslab bg-slab m-1 cursor-pointer p-2 text-xs"
                          },
                          [
                            _vm.options.controls.primary
                              ? _c(
                                  "div",
                                  {
                                    on: {
                                      click: function($event) {
                                        $event.stopPropagation()
                                        _vm.ui.primary = !_vm.ui.primary
                                      }
                                    }
                                  },
                                  [
                                    _vm._v(
                                      _vm._s(
                                        _vm.getFieldName(
                                          _vm.options.controls.primary
                                        )
                                      )
                                    )
                                  ]
                                )
                              : _c(
                                  "div",
                                  {
                                    on: {
                                      click: function($event) {
                                        $event.stopPropagation()
                                        _vm.ui.primary = !_vm.ui.primary
                                      }
                                    }
                                  },
                                  [_vm._v("Select primary metric")]
                                )
                          ]
                        ),
                        _vm._v(" "),
                        _c("div", { staticClass: "p-2" }, [
                          _vm._v("Secondary Metric")
                        ]),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass:
                              "border border-lightslab bg-slab m-1 cursor-pointer p-2 text-xs"
                          },
                          [
                            _vm.options.controls.secondary
                              ? _c(
                                  "div",
                                  {
                                    on: {
                                      click: function($event) {
                                        $event.stopPropagation()
                                        _vm.ui.secondary = !_vm.ui.secondary
                                      }
                                    }
                                  },
                                  [
                                    _vm._v(
                                      _vm._s(
                                        _vm.getFieldName(
                                          _vm.options.controls.secondary
                                        )
                                      )
                                    )
                                  ]
                                )
                              : _c(
                                  "div",
                                  {
                                    on: {
                                      click: function($event) {
                                        $event.stopPropagation()
                                        _vm.ui.secondary = !_vm.ui.secondary
                                      }
                                    }
                                  },
                                  [_vm._v("Select secondary metric")]
                                )
                          ]
                        ),
                        _vm._v(" "),
                        _c("div", { staticClass: "p-2" }, [
                          _vm._v("Time mode")
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "p-2" }, [
                          _c(
                            "div",
                            { staticClass: "flex text-xs" },
                            _vm._l(_vm.graphControls.x, function(row) {
                              return _c(
                                "div",
                                {
                                  staticClass:
                                    "p-2 border border-lightslab m-1 cursor-pointer",
                                  class: _vm.selectedMode(row[0])
                                    ? "bg-lightslab"
                                    : "",
                                  on: {
                                    click: function($event) {
                                      $event.stopPropagation()
                                      return _vm.selectMode(row[0])
                                    }
                                  }
                                },
                                [
                                  _vm._v(
                                    "\n                                    " +
                                      _vm._s(row[1]) +
                                      "\n                                "
                                  )
                                ]
                              )
                            }),
                            0
                          )
                        ])
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
                            value: _vm.ui.section === "settings",
                            expression: "ui.section === 'settings'"
                          }
                        ]
                      },
                      [
                        _vm.chartsettings.length == 0
                          ? _c("div", { staticClass: "p-4 text-xs" }, [
                              _vm._v(
                                "\n                            Choose countries or states to begin comparing.\n                        "
                              )
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        _vm._l(_vm.chartsettings, function(row, key, index) {
                          return _c(
                            "div",
                            {
                              directives: [
                                {
                                  name: "show",
                                  rawName: "v-show",
                                  value: _vm.chartsettings.length > 0,
                                  expression: "chartsettings.length > 0"
                                }
                              ],
                              key: key,
                              staticClass: "p-2 w-full"
                            },
                            [
                              _c(
                                "div",
                                {
                                  staticClass:
                                    "font-bold text-sm p-2 bg-slab-primary rounded-t"
                                },
                                [_vm._v(_vm._s(row.name))]
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "flex text-xs flex-1 bg-slab" },
                                [
                                  _c("div", { staticClass: "w-24 p-2" }),
                                  _vm._v(" "),
                                  _c("div", { staticClass: "w-32 p-2" }, [
                                    _vm._v("Primary Metric")
                                  ]),
                                  _vm._v(" "),
                                  _c("div", { staticClass: "w-32 p-2" }, [
                                    _vm._v("Secondary Metric")
                                  ])
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                {
                                  staticClass:
                                    "flex text-xs items-center flex-1 bg-slab"
                                },
                                [
                                  _c("div", { staticClass: "w-24 p-2" }, [
                                    _vm._v("Colour")
                                  ]),
                                  _vm._v(" "),
                                  _c("div", { staticClass: "w-32 p-2" }, [
                                    _c(
                                      "div",
                                      {
                                        staticClass:
                                          "p-1 border border-gray-500"
                                      },
                                      [
                                        _c("div", {
                                          staticClass: "p-2",
                                          style:
                                            "background: " + row.primary.border,
                                          on: {
                                            click: function($event) {
                                              $event.stopPropagation()
                                              return _vm.toggleColorDropdown(
                                                row.name + "primary",
                                                $event
                                              )
                                            }
                                          }
                                        })
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      {
                                        staticClass:
                                          "p-1 absolute inset-x-0 inset-y-0 z-10 bg-lightslab",
                                        class:
                                          _vm.ui.colordropdown.id ==
                                            row.name + "primary" &&
                                          _vm.ui.colordropdown.show
                                            ? ""
                                            : "hidden"
                                      },
                                      [
                                        _c(
                                          "div",
                                          {
                                            staticClass:
                                              "m-1 my-4 text-base font-bold"
                                          },
                                          [_vm._v("Pick a colour")]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          {
                                            staticClass:
                                              "flex flex-wrap items-center justify-start"
                                          },
                                          _vm._l(_vm.options.colors, function(
                                            color,
                                            key,
                                            index
                                          ) {
                                            return _c("div", {
                                              staticClass:
                                                "cursor-pointer w-20 m-1 border border-lightlabel p-4",
                                              style:
                                                "background: " + color.border,
                                              on: {
                                                click: function($event) {
                                                  $event.stopPropagation()
                                                  return _vm.setColor(
                                                    row.name,
                                                    {
                                                      primary: {
                                                        color: color.bg,
                                                        border: color.border
                                                      }
                                                    }
                                                  )
                                                }
                                              }
                                            })
                                          }),
                                          0
                                        )
                                      ]
                                    )
                                  ]),
                                  _vm._v(" "),
                                  _c("div", { staticClass: "w-32 p-2" }, [
                                    _c(
                                      "div",
                                      {
                                        staticClass:
                                          "p-1 border border-gray-500"
                                      },
                                      [
                                        _c("div", {
                                          staticClass: "p-2",
                                          style:
                                            "background: " +
                                            row.secondary.border,
                                          on: {
                                            click: function($event) {
                                              $event.stopPropagation()
                                              return _vm.toggleColorDropdown(
                                                row.name + "secondary",
                                                $event
                                              )
                                            }
                                          }
                                        })
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      {
                                        staticClass:
                                          "p-1 absolute inset-x-0 inset-y-0 z-10 bg-lightslab",
                                        class:
                                          _vm.ui.colordropdown.id ==
                                            row.name + "secondary" &&
                                          _vm.ui.colordropdown.show
                                            ? ""
                                            : "hidden"
                                      },
                                      [
                                        _c(
                                          "div",
                                          {
                                            staticClass:
                                              "m-1 my-4 text-base font-bold"
                                          },
                                          [_vm._v("Pick a colour")]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          {
                                            staticClass:
                                              "flex flex-wrap items-center justify-start"
                                          },
                                          _vm._l(_vm.options.colors, function(
                                            color,
                                            key,
                                            index
                                          ) {
                                            return _c("div", {
                                              staticClass:
                                                "cursor-pointer w-20 m-1 border border-lightlabel p-2",
                                              style:
                                                "background: " + color.border,
                                              on: {
                                                click: function($event) {
                                                  $event.stopPropagation()
                                                  return _vm.setColor(
                                                    row.name,
                                                    {
                                                      secondary: {
                                                        color: color.bg,
                                                        border: color.border
                                                      }
                                                    }
                                                  )
                                                }
                                              }
                                            })
                                          }),
                                          0
                                        )
                                      ]
                                    )
                                  ])
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                {
                                  staticClass:
                                    "flex text-xs items-center flex-1 bg-slab"
                                },
                                [
                                  _c("div", { staticClass: "w-24 p-2" }, [
                                    _vm._v("Chart Type")
                                  ]),
                                  _vm._v(" "),
                                  _c("div", { staticClass: "w-32 flex p-1" }, [
                                    _c(
                                      "div",
                                      {
                                        staticClass:
                                          "cursor-pointer border rounded p-2 px-3 m-1",
                                        class:
                                          row.primary.type == "bar"
                                            ? "bg-blue-400 border-blue-400 text-white"
                                            : "border-gray-500 ",
                                        on: {
                                          click: function($event) {
                                            $event.stopPropagation()
                                            return _vm.addSetting(row.name, {
                                              primary: { type: "bar" }
                                            })
                                          }
                                        }
                                      },
                                      [_vm._v("Bar")]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      {
                                        staticClass:
                                          "cursor-pointer border rounded p-2 px-3 ml-0 m-1",
                                        class:
                                          row.primary.type == "line"
                                            ? "bg-blue-400 border-blue-400  text-white"
                                            : "border-gray-500 ",
                                        on: {
                                          click: function($event) {
                                            $event.stopPropagation()
                                            return _vm.addSetting(row.name, {
                                              primary: { type: "line" }
                                            })
                                          }
                                        }
                                      },
                                      [_vm._v("Line")]
                                    )
                                  ]),
                                  _vm._v(" "),
                                  _c("div", { staticClass: "w-32 flex p-1" }, [
                                    _c(
                                      "div",
                                      {
                                        staticClass:
                                          "cursor-pointer border rounded p-2 px-3 m-1",
                                        class:
                                          row.secondary.type == "bar"
                                            ? "bg-blue-400 border-blue-400 text-white"
                                            : "border-gray-500 ",
                                        on: {
                                          click: function($event) {
                                            $event.stopPropagation()
                                            return _vm.addSetting(row.name, {
                                              secondary: { type: "bar" }
                                            })
                                          }
                                        }
                                      },
                                      [_vm._v("Bar")]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      {
                                        staticClass:
                                          "cursor-pointer border rounded p-2 px-3 ml-0 m-1",
                                        class:
                                          row.secondary.type == "line"
                                            ? "bg-blue-400 border-blue-400  text-white"
                                            : "border-gray-500 ",
                                        on: {
                                          click: function($event) {
                                            $event.stopPropagation()
                                            return _vm.addSetting(row.name, {
                                              secondary: { type: "line" }
                                            })
                                          }
                                        }
                                      },
                                      [_vm._v("Line")]
                                    )
                                  ])
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                {
                                  staticClass:
                                    "flex text-xs items-center flex-1 bg-slab rounded-b"
                                },
                                [
                                  _c("div", { staticClass: "w-24 p-2" }, [
                                    _vm._v("Scale Type")
                                  ]),
                                  _vm._v(" "),
                                  _c("div", { staticClass: "w-32 flex p-1" }, [
                                    _c(
                                      "div",
                                      {
                                        staticClass:
                                          "cursor-pointer border rounded p-2 m-1",
                                        class:
                                          row.primary.scale == "linear"
                                            ? "bg-blue-400 border-blue-400 text-white"
                                            : "border-gray-500 ",
                                        on: {
                                          click: function($event) {
                                            $event.stopPropagation()
                                            return _vm.addSetting(row.name, {
                                              primary: { scale: "linear" }
                                            })
                                          }
                                        }
                                      },
                                      [_vm._v("Linear")]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      {
                                        staticClass:
                                          "cursor-pointer border rounded p-2 m-1",
                                        class:
                                          row.primary.scale == "logarithmic"
                                            ? "bg-blue-400 border-blue-400  text-white"
                                            : "border-gray-500 ",
                                        on: {
                                          click: function($event) {
                                            $event.stopPropagation()
                                            return _vm.addSetting(row.name, {
                                              primary: { scale: "logarithmic" }
                                            })
                                          }
                                        }
                                      },
                                      [_vm._v("Log")]
                                    )
                                  ]),
                                  _vm._v(" "),
                                  _c("div", { staticClass: "w-32 flex p-1" }, [
                                    _c(
                                      "div",
                                      {
                                        staticClass:
                                          "cursor-pointer border rounded p-2 m-1",
                                        class:
                                          row.secondary.scale == "linear"
                                            ? "bg-blue-400 border-blue-400 text-white"
                                            : "border-gray-500 ",
                                        on: {
                                          click: function($event) {
                                            $event.stopPropagation()
                                            return _vm.addSetting(row.name, {
                                              secondary: { scale: "linear" }
                                            })
                                          }
                                        }
                                      },
                                      [_vm._v("Linear")]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      {
                                        staticClass:
                                          "cursor-pointer border rounded p-2 ml-0 m-1",
                                        class:
                                          row.secondary.scale == "logarithmic"
                                            ? "bg-blue-400 border-blue-400  text-white"
                                            : "border-gray-500 ",
                                        on: {
                                          click: function($event) {
                                            $event.stopPropagation()
                                            return _vm.addSetting(row.name, {
                                              secondary: {
                                                scale: "logarithmic"
                                              }
                                            })
                                          }
                                        }
                                      },
                                      [_vm._v("Log")]
                                    )
                                  ])
                                ]
                              )
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
          ])
        ]
      ),
      _vm._v(" "),
      _vm.ui.primary
        ? _c(
            "div",
            {
              staticClass:
                "absolute z-20 inset-x-0 inset-y-0 p-2 bg-slab text-xs"
            },
            [
              _vm._l(_vm.graphControls.y, function(row) {
                return _c(
                  "div",
                  {
                    staticClass: "p-2 m-1 hover:bg-hoverslab",
                    on: {
                      click: function($event) {
                        $event.stopPropagation()
                        return _vm.selectField(row[0], "primary")
                      }
                    }
                  },
                  [_vm._v("\n            " + _vm._s(row[1]) + "\n        ")]
                )
              }),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass:
                    "absolute bottom-0 m-2 p-2 inset-x-0 bg-hoverslab text-center",
                  on: {
                    click: function($event) {
                      $event.stopPropagation()
                      _vm.ui.primary = false
                    }
                  }
                },
                [_vm._v("Back")]
              )
            ],
            2
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.ui.secondary
        ? _c(
            "div",
            {
              staticClass:
                "absolute z-20 inset-x-0 inset-y-0 p-2 bg-slab text-xs"
            },
            [
              _c(
                "div",
                {
                  staticClass: "p-2 m-1 hover:bg-hoverslab",
                  on: {
                    click: function($event) {
                      return _vm.selectField("", "secondary")
                    }
                  }
                },
                [_vm._v("None")]
              ),
              _vm._v(" "),
              _vm._l(_vm.graphControls.y, function(row) {
                return _c(
                  "div",
                  {
                    staticClass: "p-2 m-1 hover:bg-hoverslab",
                    on: {
                      click: function($event) {
                        $event.stopPropagation()
                        return _vm.selectField(row[0], "secondary")
                      }
                    }
                  },
                  [_vm._v("\n            " + _vm._s(row[1]) + "\n        ")]
                )
              }),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass:
                    "absolute bottom-0 p-4 inset-x-0 bg-hoverslab text-center",
                  on: {
                    click: function($event) {
                      $event.stopPropagation()
                      _vm.ui.secondary = false
                    }
                  }
                },
                [_vm._v("Back")]
              )
            ],
            2
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.full
        ? _c("div", { staticClass: "absolute top-0 right-0 bottom-3 left-0" }, [
            _vm.settings.controls.menu && false
              ? _c("div", { staticClass: "py-4" }, [
                  _c(
                    "div",
                    { staticClass: "text-xs flex items-start justify-between" },
                    [
                      _c("div", [
                        _c(
                          "div",
                          {
                            staticClass:
                              "hover:bg-lightlabel p-2 border border-lightlabel m-2 cursor-pointer",
                            class: _vm.ui.settings ? "bg-lightlabel" : "",
                            on: {
                              click: function($event) {
                                $event.stopPropagation()
                                _vm.ui.settings = !_vm.ui.settings
                              }
                            }
                          },
                          [_vm._v("Chart Settings")]
                        )
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "flex items-center" }, [
                        _c("div", { staticClass: "mr-2" }, [_vm._v("Metrics")]),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass:
                              "flex border border-hoverslab bg-hoverslab m-1 cursor-pointer p-2 relative"
                          },
                          [
                            _vm.options.controls.primary
                              ? _c(
                                  "div",
                                  {
                                    staticClass: "w-32 truncate ...",
                                    on: {
                                      click: function($event) {
                                        $event.stopPropagation()
                                        _vm.ui.primary = !_vm.ui.primary
                                      }
                                    }
                                  },
                                  [
                                    _vm._v(
                                      _vm._s(
                                        _vm.getFieldName(
                                          _vm.options.controls.primary
                                        )
                                      )
                                    )
                                  ]
                                )
                              : _c(
                                  "div",
                                  {
                                    staticClass: "w-32",
                                    on: {
                                      click: function($event) {
                                        $event.stopPropagation()
                                        _vm.ui.primary = !_vm.ui.primary
                                      }
                                    }
                                  },
                                  [_vm._v("Select primary metric")]
                                ),
                            _vm._v(" "),
                            _c(
                              "div",
                              {
                                directives: [
                                  {
                                    name: "show",
                                    rawName: "v-show",
                                    value: _vm.ui.primary,
                                    expression: "ui.primary"
                                  }
                                ],
                                staticClass:
                                  "absolute z-10 bg-slab border-hoverslab shadow w-44 right-0 top-0 p-2 border border-hoverslab"
                              },
                              _vm._l(_vm.graphControls.y, function(row) {
                                return _c(
                                  "div",
                                  {
                                    staticClass: "p-2 m-1 hover:bg-hoverslab",
                                    on: {
                                      click: function($event) {
                                        $event.stopPropagation()
                                        return _vm.selectField(
                                          row[0],
                                          "primary"
                                        )
                                      }
                                    }
                                  },
                                  [
                                    _vm._v(
                                      "\n                                " +
                                        _vm._s(row[1]) +
                                        "\n                            "
                                    )
                                  ]
                                )
                              }),
                              0
                            )
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass:
                              "flex border border-hoverslab bg-hoverslab m-1 mr-0 cursor-pointer p-2 relative"
                          },
                          [
                            _vm.options.controls.secondary
                              ? _c(
                                  "div",
                                  {
                                    staticClass: "w-32 truncate ...",
                                    on: {
                                      click: function($event) {
                                        $event.stopPropagation()
                                        _vm.ui.secondary = !_vm.ui.secondary
                                      }
                                    }
                                  },
                                  [
                                    _vm._v(
                                      _vm._s(
                                        _vm.getFieldName(
                                          _vm.options.controls.secondary
                                        )
                                      )
                                    )
                                  ]
                                )
                              : _c(
                                  "div",
                                  {
                                    staticClass: "w-32",
                                    on: {
                                      click: function($event) {
                                        $event.stopPropagation()
                                        _vm.ui.secondary = !_vm.ui.secondary
                                      }
                                    }
                                  },
                                  [_vm._v("Select secondary metric")]
                                ),
                            _vm._v(" "),
                            _c(
                              "div",
                              {
                                directives: [
                                  {
                                    name: "show",
                                    rawName: "v-show",
                                    value: _vm.ui.secondary,
                                    expression: "ui.secondary"
                                  }
                                ],
                                staticClass:
                                  "absolute z-10 bg-slab border-hoverslab shadow w-44 right-0 top-0 p-2 border border-hoverslab"
                              },
                              [
                                _c(
                                  "div",
                                  {
                                    staticClass: "p-2 m-1 hover:bg-hoverslab",
                                    on: {
                                      click: function($event) {
                                        return _vm.selectField("", "secondary")
                                      }
                                    }
                                  },
                                  [_vm._v("None")]
                                ),
                                _vm._v(" "),
                                _vm._l(_vm.graphControls.y, function(row) {
                                  return _c(
                                    "div",
                                    {
                                      staticClass: "p-2 m-1 hover:bg-hoverslab",
                                      on: {
                                        click: function($event) {
                                          return _vm.selectField(
                                            row[0],
                                            "secondary"
                                          )
                                        }
                                      }
                                    },
                                    [
                                      _vm._v(
                                        "\n                                " +
                                          _vm._s(row[1]) +
                                          "\n                            "
                                      )
                                    ]
                                  )
                                })
                              ],
                              2
                            )
                          ]
                        )
                      ])
                    ]
                  )
                ])
              : _vm._e(),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "absolute inset-x-0 inset-y-0" },
              [
                _vm.active && _vm.data.length > 0
                  ? _c("LineChart", {
                      staticClass:
                        "bg-heading rounded absolute top-0 bottom-0 right-0 left-0 m-2 p-2",
                      attrs: {
                        data: _vm.dataset.data,
                        options: _vm.dataset.options
                      }
                    })
                  : _vm._e(),
                _vm._v(" "),
                _vm.settings.controls.menu && false
                  ? _c(
                      "div",
                      {
                        staticClass:
                          "text-xs absolute left-0 right-0 bottom-0 h-12 flex items-start justify-between"
                      },
                      [
                        _c(
                          "div",
                          { staticClass: "flex items-center justify-start" },
                          [
                            _c("div", { staticClass: "mx-2" }, [
                              _vm._v("Time mode")
                            ]),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "flex" },
                              _vm._l(_vm.graphControls.x, function(row) {
                                return _c(
                                  "div",
                                  {
                                    staticClass:
                                      "p-2 border border-lightslab m-1 cursor-pointer",
                                    class: _vm.selectedMode(row[0])
                                      ? "bg-lightslab"
                                      : "",
                                    on: {
                                      click: function($event) {
                                        return _vm.selectMode(row[0])
                                      }
                                    }
                                  },
                                  [
                                    _vm._v(
                                      "\n                            " +
                                        _vm._s(row[1]) +
                                        "\n                        "
                                    )
                                  ]
                                )
                              }),
                              0
                            )
                          ]
                        )
                      ]
                    )
                  : _vm._e()
              ],
              1
            )
          ])
        : _vm._e(),
      _vm._v(" "),
      !_vm.ui.settings
        ? _c(
            "div",
            {
              staticClass:
                "absolute bottom-0 inset-x-0 text-center p-4 bg-hoverslab text-xs",
              on: {
                click: function($event) {
                  $event.stopPropagation()
                  _vm.ui.settings = !_vm.ui.settings
                }
              }
            },
            [_vm._v("Chart Settings")]
          )
        : _c(
            "div",
            {
              staticClass:
                "absolute bottom-0 inset-x-0 text-center p-4 bg-slab text-xs",
              on: {
                click: function($event) {
                  $event.stopPropagation()
                  _vm.ui.settings = !_vm.ui.settings
                }
              }
            },
            [_vm._v("Close")]
          )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/StatsChartMobile.vue":
/*!******************************************************!*\
  !*** ./resources/js/components/StatsChartMobile.vue ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _StatsChartMobile_vue_vue_type_template_id_601239ec_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StatsChartMobile.vue?vue&type=template&id=601239ec&scoped=true& */ "./resources/js/components/StatsChartMobile.vue?vue&type=template&id=601239ec&scoped=true&");
/* harmony import */ var _StatsChartMobile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StatsChartMobile.vue?vue&type=script&lang=js& */ "./resources/js/components/StatsChartMobile.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _StatsChartMobile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _StatsChartMobile_vue_vue_type_template_id_601239ec_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _StatsChartMobile_vue_vue_type_template_id_601239ec_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "601239ec",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/StatsChartMobile.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/StatsChartMobile.vue?vue&type=script&lang=js&":
/*!*******************************************************************************!*\
  !*** ./resources/js/components/StatsChartMobile.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StatsChartMobile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./StatsChartMobile.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/StatsChartMobile.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StatsChartMobile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/StatsChartMobile.vue?vue&type=template&id=601239ec&scoped=true&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/components/StatsChartMobile.vue?vue&type=template&id=601239ec&scoped=true& ***!
  \*************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_StatsChartMobile_vue_vue_type_template_id_601239ec_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./StatsChartMobile.vue?vue&type=template&id=601239ec&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/StatsChartMobile.vue?vue&type=template&id=601239ec&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_StatsChartMobile_vue_vue_type_template_id_601239ec_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_StatsChartMobile_vue_vue_type_template_id_601239ec_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);