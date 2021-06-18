import { NgModule } from "@angular/core";
import { LoadingBarComponent } from "./loading-bar.component";
import { MatProgressBarModule } from "@angular/material/progress-bar";

@NgModule({
  imports: [MatProgressBarModule],
  declarations: [LoadingBarComponent],
  exports: [LoadingBarComponent],
})
export class LoadingBarModule {}
