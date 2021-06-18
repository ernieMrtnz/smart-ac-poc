import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { NoDataFoundComponent } from "./no-data-found.component";

@NgModule({
  imports: [MatCardModule],
  declarations: [NoDataFoundComponent],
  exports: [NoDataFoundComponent],
})
export class NoDataFoundModule {}
