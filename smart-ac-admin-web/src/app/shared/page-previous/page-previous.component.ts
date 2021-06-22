import { Component } from "@angular/core";
import { Location } from "@angular/common";

@Component({
  selector: "app-page-previous",
  templateUrl: "./page-previous.component.html",
})
export class PagePreviousComponent {
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
