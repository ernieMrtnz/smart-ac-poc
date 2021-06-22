import { Component } from "@angular/core";

@Component({
  selector: "app-cancel-icon",
  template: `
  <mat-icon class="icon-button icon-button-primary"
            matTooltip="Cancel" matTooltipPosition="above">
    close
  </mat-icon>
`
})
export class CancelIconComponent { }
