"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var Chart = require('../../src').Chart;
var Bar = require('../../src').Bar;
var Xaxis = require('mhs-d3-core').Xaxis;
var Yaxis = require('mhs-d3-core').Yaxis;
var Xgrid = require('mhs-d3-core').Xgrid;
var Ygrid = require('mhs-d3-core').Ygrid;

var generalChartData = require('dsv?delimiter=\t!./data/letter.tsv')

var chartSeries = [
    {
      field: 'frequency',
      name: 'Frequency',
      style: {
        'fillOpacity': .2
      }
    }
  ],
  x = function(d) {
    return d.letter;
  },
  xScale = 'ordinal',
  y = function(d) {
    return +d;
  },
  yTicks = [10, "%"],
  onMouseOver = function(e, d) {
    console.log(d);
    console.log(e.clientX)
    console.log(e.clientY)
  },
  onMouseOut = function(e, d) {
    console.log(d);
    console.log(e.clientX)
    console.log(e.clientY)
  }

generalChartData.map(function(d, i) {
  if(i % 2 === 0) {
    d._style = {
      "color": "red",
      "fillOpacity": .8
    }
  }else {
    d._style = {
      "color": "blue",
      "fillOpacity": .2
    }
  }
  return d;
})

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
            field: 'frequency',
            name: 'Frequency',
            style: {
              'fill': 'red',
              'fillOpacity': .8
            }
          }
        ]: chartSeries
    })
  },
  render: function() {

    var xgrid, ygrid;

    return (
      <div>
        <button onClick={this.onClick}>toggle</button>
        <Chart
          xBandPaddingInner={.2}
          xBandPaddingOuter={.2}
          width= {this.state.width}
          height= {this.state.height}
          data= {generalChartData}
          chartSeries = {this.state.series}
          x= {x}
          xScale= {xScale}
          y= {y}
          yTicks= {yTicks}
          >
          <Bar
            chartSeries = {this.state.series}
            onMouseOver= {onMouseOver}
            onMouseOut= {onMouseOut}
          />
          {xgrid}
          {ygrid}
          <Xaxis/>
          <Yaxis/>
        </Chart>
      </div>
    )
  }
})

module.exports = Container
