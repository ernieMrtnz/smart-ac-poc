import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";

import { PagePreviousComponent } from "./page-previous.component";
import { IconModule } from "@app/shared/icons/icon.module";

@NgModule({
  imports: [CommonModule, RouterModule, IconModule, MatButtonModule],
  declarations: [PagePreviousComponent],
  exports: [PagePreviousComponent],
})
export class PagePreviousModule {}
