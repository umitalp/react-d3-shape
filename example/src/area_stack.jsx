"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var Chart = require('../../src').Chart;
var AreaStack = require('../../src').AreaStack;
var Xaxis = require('mhs-d3-core').Xaxis;
var Yaxis = require('mhs-d3-core').Yaxis;

var generalChartData = require('dsv?delimiter=\t!./data/browser.tsv')
var formatPercent = d3.format(".0%");

var chartSeries = [
    {
      field: 'IE',
      name: 'IE browser',
      style: {
        "fill-opacity": .5
      }
    },
    {
      field: 'Chrome',
      name: 'Chrome browser'
    },
    {
      field: 'Firefox'
    },
    {
      field: 'Safari',
      name: 'Safari browser'
    },
    {
      field: 'Opera',
      name: 'Opera browser'
    }
  ],
  x = function(d) {
    var parseDate = d3.time.format("%y-%b-%d").parse;
    return parseDate(d.date);
  },
  xScale = 'time',
  y = function(d) {
    return d / 100;
  };

var Container = React.createClass({
  getInitialState: function() {
    return {
      width: 600,
      height: 500,
      series: chartSeries
    }
  },
  onClick: function() {
    this.setState({
      width: this.state.width === 600? 500: 600,
      height: this.state.width === 600? 600: 500,
      series: this.state.width === 600? [
          {
            field: 'IE',
            name: 'IE browser',
            style: {
              "fill-opacity": .5
            }
          },
          {
            field: 'Chrome',
            name: 'Chrome browser'
          },
          {
            field: 'Firefox'
          }
        ]: chartSeries
    })
  },
  render: function() {

    return (
      <div>
        <button onClick={this.onClick}>toggle</button>
        <Chart
          width= {this.state.width}
          height= {this.state.height}
          data = {generalChartData}
          chartSeries = {this.state.series}
          x= {x}
          xScale = {xScale}
          y= {y}
          yTickFormat= {formatPercent}
          stack= {true}
          >
          <AreaStack
            chartSeries = {this.state.series}
          />
          <Xaxis style= {{
            "transform": "rotate(45deg)",
            "text-anchor": "start"
          }}/>
          <Yaxis/>
        </Chart>
      </div>
    )
  }
})

module.exports = Container