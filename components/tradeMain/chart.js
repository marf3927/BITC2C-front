import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'
import axios from 'axios'


let am4core = null
let am4charts = null
let am4themesAnimated = null
if (process.browser) {
  am4core = require('@amcharts/amcharts4/core')
  am4charts = require('@amcharts/amcharts4/charts')
  am4themesAnimated = require('@amcharts/amcharts4/themes/animated')
  am4core.useTheme(am4themesAnimated.default)
}



class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData : [],
      token: 'Atoken'
    }
  }

  TokenChange(key) {
    switch (key) {
      case 1:
        this.setState({ token: 'Atoken' })
        console.log(this.state.token)
        break;
      case 2:
        this.setState({ token: 'Btoken' })
        console.log(this.state.token)

        break;
      case 3:
        this.setState({ token: 'Ctoken' })
        console.log(this.state.token)
        break;
    }
  }

  getData(token) {
    let arraydata = [];
    let data = [];
    axios.get('chart/getdata/', {
      params: {
        token: token
      }
    })
      .then((res) => {
        arraydata = res.data
        console.log(arraydata)
        for (var ele in arraydata) {
          console.log("ele: ", ele);
          var object = new Object();
          object.date = arraydata[ele].date
          object.open = arraydata[ele].begin
          object.close = arraydata[ele].end
          object.low = arraydata[ele].low
          object.high = arraydata[ele].high
          data.push(object);
        }
      }).then(() => {
        this.setState({chartData:data});
      })
  }

  chartOptions(){
    let dateAxis = this.chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    let valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;

    let series = this.chart.series.push(new am4charts.CandlestickSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "close";
    series.dataFields.openValueY = "open";
    series.dataFields.lowValueY = "low";
    series.dataFields.highValueY = "high";
    series.simplifiedProcessing = true;
    series.tooltipText = "Open:${openValueY.value}\nLow:${lowValueY.value}\nHigh:${highValueY.value}\nClose:${valueY.value}";
    this.chart.cursor = new am4charts.XYCursor();

    let lineSeries = this.chart.series.push(new am4charts.LineSeries());
    lineSeries.dataFields.dateX = "date";
    lineSeries.dataFields.valueY = "close";
    // need to set on default state, as initially series is "show"
    lineSeries.defaultState.properties.visible = false;

    // hide from legend too (in case there is one)
    lineSeries.hiddenInLegend = true;
    lineSeries.fillOpacity = 0.5;
    lineSeries.strokeOpacity = 0.5;

    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(lineSeries);
    this.chart.scrollbarX = scrollbarX;

  }

  componentDidMount() {
    let chart = am4core.create("chartdiv", am4charts.XYChart);
    chart.paddingRight = 20;
    chart.dateFormatter.inputDateFormat = "yyyy-MM-dd hh:mm";


    this.getData(this.state.token);
    chart.data = this.state.chartData;
    this.chart = chart;
    this.chartOptions();
  }


  componentDidUpdate(oldProps) {
    if (oldProps.paddingRight !== this.props.paddingRight) {
      this.chart.paddingRight = this.props.paddingRight;
    }
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return (
      <>
        <div class="ui buttons">
          <button class="ui button" onClick={() => this.TokenChange(1)}>Atoken</button>
          <button class="ui button" onClick={() => this.TokenChange(2)}>Btoken</button>
          <button class="ui button" onClick={() => this.TokenChange(3)}>Ctoken</button>
        </div>
        <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
      </>
    );
  }
}


export default Chart;

