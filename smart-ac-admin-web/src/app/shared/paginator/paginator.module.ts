import { NgModule } from "@angular/core";
import { MatPaginatorModule } from "@angular/material/paginator";

import { PaginatorComponent } from "./paginator.component";

@NgModule({
  imports: [MatPaginatorModule],
  declarations: [PaginatorComponent],
  exports: [MatPaginatorModule, PaginatorComponent],
})
export class PaginatorModule {}
