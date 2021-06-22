import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

import { PageHeaderComponent } from "./page-header.component";

@NgModule({
  imports: [MatButtonModule, MatIconModule],
  declarations: [PageHeaderComponent],
  exports: [PageHeaderComponent],
})
export class PageHeaderModule {}
