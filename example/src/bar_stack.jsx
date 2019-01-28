"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var Chart = require('../../src').Chart;
var BarStack = require('../../src').BarStack;
var Xaxis = require('mhs-d3-core').Xaxis;
var Yaxis = require('mhs-d3-core').Yaxis;

var generalChartData = require('dsv?delimiter=,!./data/age.csv')

var chartSeries = [
    {
      field: 'Under 5 Years',
      name: 'Under 5 Years'
    },
    {
      field: '5 to 13 Years',
      name: '5 to 13 Years'
    },
    {
      field: '14 to 17 Years',
      name: '14 to 17 Years'
    },
    {
      field: '18 to 24 Years',
      name: '18 to 24 Years'
    },
    {
      field: '25 to 44 Years',
      name: '25 to 44 Years',
      style: {
        "fillOpacity": .4
      }
    },
    {
      field: '45 to 64 Years',
      name: '45 to 64 Years'
    },
    {
      field: '65 Years and Over',
      name: '65 Years and Over'
    },

  ],
  x = function(d) {
    return d.State;
  },
  xScale = 'ordinal',
  y = function(d) {
    return +d;
  },
  yTickFormat = d3.format(".2s");

module.exports = React.createClass({
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
            field: '5 to 13 Years',
            name: '5 to 13 Years'
          },
          {
            field: '14 to 17 Years',
            name: '14 to 17 Years'
          },
          {
            field: '18 to 24 Years',
            name: '18 to 24 Years'
          },
          {
            field: '25 to 44 Years',
            name: '25 to 44 Years',
            style: {
              "fillOpacity": .4
            }
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
          data= {generalChartData}
          chartSeries = {this.state.series}
          x= {x}
          xScale= {xScale}
          y= {y}
          yTickFormat= {yTickFormat}
          stack= {true}
          >
          <BarStack
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

