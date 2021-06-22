import { NgModule } from "@angular/core";

import { UsaDateTimePipe } from "./usa-date-time.pipe";

@NgModule({
  declarations: [UsaDateTimePipe],
  providers: [UsaDateTimePipe],
  exports: [UsaDateTimePipe],
})
export class PipesModule {}
