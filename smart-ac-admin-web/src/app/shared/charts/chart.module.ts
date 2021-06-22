import { NgModule } from "@angular/core";
import { ChartsModule } from "ng2-charts";

import { ChartComponent } from "./chart.component";

@NgModule({
  imports: [ChartsModule],
  declarations: [ChartComponent],
  exports: [ChartComponent],
})
export class AppChartModule {}
