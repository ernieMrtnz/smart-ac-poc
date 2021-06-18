import { NgModule } from "@angular/core";

import { NgShowDirective } from "./ng-show";
import { AppFormSubmitDirective } from "./app-form-submit";

let directives = [NgShowDirective, AppFormSubmitDirective];

@NgModule({
  declarations: directives,
  exports: directives,
})
export class DirectivesModule {}
