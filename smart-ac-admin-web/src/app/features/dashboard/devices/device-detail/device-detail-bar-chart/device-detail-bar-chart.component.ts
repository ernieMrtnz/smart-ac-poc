import { Component, Input } from "@angular/core";

import { DeviceDetailsForChartResponse } from "@app/core/data-services";
import { ChartOptions, ChartType, ChartDataSets } from "chart.js";
import { Label } from "ng2-charts";

@Component({
  selector: "app-device-detail-bar-chart",
  templateUrl: "./device-detail-bar-chart.component.html",
})
export class DeviceDetailBarChartComponent {
  @Input() deviceDetailsForChart: DeviceDetailsForChartResponse;

  barChartType: ChartType = "bar";

  // Temperature Chart Data Sets
  temperatureChartData: ChartDataSets[];
  temperatureChartLabels: Label[];
  temperatureChartOptions: ChartOptions;

  // Air Humidity Chart Data Sets
  airHumidityChartData: ChartDataSets[];
  airHumidityChartLabels: Label[];
  airHumidityChartOptions: ChartOptions;

  // Carbon Monoxide Chart Data Sets
  carbonMonChartData: ChartDataSets[];
  carbonMonChartLabels: Label[];
  carbonMonChartOptions: ChartOptions;

  ngOnInit(): void {
    this.buildCharts();
  }

  private buildCharts(): void {
    let chartLabels = ["Low", "High"];
    // Temperature
    let tempLow = this.deviceDetailsForChart.temperatureLow;
    let tempHigh = this.deviceDetailsForChart.temperatureHigh;
    this.temperatureChartData = [
      {
        label: "Temperature",
        data: [tempLow, tempHigh],
        backgroundColor: ["rgba(153, 102, 255, 1)", "rgba(255, 99, 132, 1)"],
      },
    ];
    this.temperatureChartLabels = chartLabels;
    this.temperatureChartOptions = {
      responsive: true,
    };

    // Air Humidity
    let airHumLow = this.deviceDetailsForChart.airHumidityLow;
    let airHumHigh = this.deviceDetailsForChart.airHumidityHigh;
    this.airHumidityChartData = [
      {
        label: "Air Humidity",
        data: [airHumLow, airHumHigh],
        backgroundColor: ["rgba(153, 102, 255, 1)", "rgba(255, 99, 132, 1)"],
      },
    ];
    this.airHumidityChartLabels = chartLabels;
    this.airHumidityChartOptions = {
      responsive: true,
    };

    // Carbon Monoxide
    let carbonMonLow = this.deviceDetailsForChart.carbonMonoxideLow;
    let carbonMonHigh = this.deviceDetailsForChart.carbonMonoxideHigh;
    this.carbonMonChartData = [
      {
        label: "Carbon Monoxide",
        data: [carbonMonLow, carbonMonHigh],
        backgroundColor: ["rgba(153, 102, 255, 1)", "rgba(255, 99, 132, 1)"],
      },
    ];
    this.carbonMonChartLabels = chartLabels;
    this.carbonMonChartOptions = {
      responsive: true,
    };
  }
}
