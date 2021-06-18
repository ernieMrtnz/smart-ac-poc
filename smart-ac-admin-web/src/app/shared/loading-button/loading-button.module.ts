import { NgModule } from "@angular/core";
import { LoadingButtonComponent } from "./loading-button.component";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
  imports: [MatButtonModule, MatProgressSpinnerModule],
  declarations: [LoadingButtonComponent],
  exports: [LoadingButtonComponent],
})
export class LoadingButtonModule {}
