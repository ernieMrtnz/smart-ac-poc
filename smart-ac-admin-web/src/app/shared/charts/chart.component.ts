import { Component, Input } from "@angular/core";

import { ChartOptions, ChartType, ChartDataSets } from "chart.js";
import { Colors, Label } from "ng2-charts";

@Component({
  selector: "app-chart",
  templateUrl: "./chart.component.html",
})
export class ChartComponent {
  @Input() barChartOptions: ChartOptions;
  @Input() barChartLabels: Label[];
  @Input() barChartType: ChartType;
  @Input() barChartData: ChartDataSets[];
  @Input() barChartColors: Colors[];
}
