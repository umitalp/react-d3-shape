"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var Chart = require('../../src').Chart;
var Line = require('../../src').Line;
var Area = require('../../src').Area;
var Xgrid = require('mhs-d3-core').Xgrid;
var Ygrid = require('mhs-d3-core').Ygrid;
var Xaxis = require('mhs-d3-core').Xaxis;
var Yaxis = require('mhs-d3-core').Yaxis;
var series = require('../../src').series;

var generalChartData = require('./data/user.json');

var chartSeries = [
    {
      field: 'age',
      name: 'Age',
      color: '#ff7f0e',
      style: {
        "strokeWidth": 2,
        "strokeOpacity": .2,
        "fillOpacity": .2
      }
    }
  ],
  x = function(d) {
    return d.index;
  }

module.exports = React.createClass({
  getInitialState: function() {
    return {
      width: 600,
      height: 400,
      series: chartSeries,
      series2: [{
        field: 'BMI',
        name: 'BMI',
        color: 'red',
        style: {
          "strokeWidth": 5,
          "strokeOpacity": .2,
          "fillOpacity": .2
        }
      }]
    }
  },
  onClick: function() {
    this.setState({
      width: this.state.width === 600? 400: 600,
      height: this.state.width === 600? 600: 400,
      series: this.state.width === 600? [{
        field: 'age',
        name: 'Age',
        color: '#ff7f0e',
        style: {
          "strokeWidth": 5,
          "strokeOpacity": .2,
          "fillOpacity": .2
        }
      }]: chartSeries
    })
  },
  render: function() {

    return (
      <div>
        <button onClick={this.onClick}>toggle</button>
        <Chart
          width= {this.state.width}
          height= {this.state.height}
          data= {generalChartData}
          chartSeries= {this.state.series}
          x= {x}
          >
          <Line
            chartSeries= {this.state.series}
          />
          <Area
            chartSeries= {this.state.series2}
          />
          <Xaxis/>
          <Yaxis/>
          <Xgrid/>
          <Ygrid/>
        </Chart>
      </div>
    )
  }
})
