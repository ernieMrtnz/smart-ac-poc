import { Component, Input, Optional } from "@angular/core";
import { FormGroupDirective, AbstractControl } from "@angular/forms";

@Component({
  selector: "app-input-clear-icon",
  template: `
  <button mat-button
          [class.hidden]="!showIcon"
          mat-icon-button
          aria-label="Clear"
          (click)="onClick($event)"
          matTooltip="Clear the field"
          matTooltipPosition="above"
          type="button"
          tabindex="-1"
          [disabled]="isDisabled">
    <mat-icon>close</mat-icon>
  </button>
`
})
export class InputClearIconComponent {
  private _control: AbstractControl;

  @Input() controlName: string;
  @Input() control: AbstractControl;
  errorMessage: string;

  constructor(
    @Optional() private formGroup: FormGroupDirective
  ) { }

  ngOnInit(): void {
    this._control = this.control || this.formGroup.form.get(this.controlName);
  }

  get showIcon() {
    let value = this._control.value;
    let hasValue = value !== null && value !== undefined && value !== '';
    return hasValue;
  }

  get isDisabled(): boolean {
    return this._control.disabled;
  }

  onClick($event) {
    this._control.setValue(null);
    $event.stopPropagation();
  }
}
