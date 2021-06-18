import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-loading-button",
  
  template: `
<button mat-raised-button
      [color]="color"
      [type]="type"
      (click)="buttonClick.emit($event)"
      class="loading-button"
      [class.active]="isLoading"
      [disabled]="isLoading || disabled">
  <ng-content></ng-content>
  <mat-spinner diameter="19"></mat-spinner>
</button>`
})
export class LoadingButtonComponent {
  @Input() type: string;
  @Input() color: string;
  @Input() isLoading: boolean;
  @Input() disabled: boolean = false;

  @Output() click = new EventEmitter<void>();
  @Output() buttonClick = new EventEmitter<void>();

  ngOnInit() {
    if (this.click.observers.length > 0) {
      throw new Error("Please use (buttonClick) instead of (click) for app-loading-button");
    }
  }
}
