import { Component, ElementRef, Input, Optional } from "@angular/core";
import { AbstractControl, FormGroupDirective, FormGroupName } from "@angular/forms";
import { defaultErrorMessages } from "./default-error-messages";
import { interval, Subscription } from "rxjs";
import { distinctUntilChanged, map } from "rxjs/operators";

@Component({
  selector: "app-input-error",
  templateUrl: "./input-error.component.html",
})
export class AppInputErrorComponent {
  @Input() control: AbstractControl;
  @Input() controlName: string;
  @Input() minlength: number;
  @Input() maxlength: number;
  @Input() dateNameToCompare: string;
  @Input() customErrors: { [key: string]: string };

  _control: AbstractControl;
  errorMessage: string;
  _subscription: Subscription;

  constructor(
    private elementRef: ElementRef,
    private formGroup: FormGroupDirective,
    @Optional() private formGroupName: FormGroupName
  ) {}

  ngOnInit(): void {
    this._control =
      this.control ||
      this.formGroupName?.control.get(this.controlName) ||
      this.formGroup.form.get(this.controlName);
  }

  get showError(): boolean {
    return this._control.touched || this.formGroup.submitted;
  }

  get errorName(): string {
    if (this._control.invalid && this._control.errors != null) {
      return Object.keys(this._control.errors)[0];
    }

    return null;
  }

  onStatusChange(): void {
    let errorMessage = null;

    let errorName = this.errorName;

    if (errorName && this.showError) {
      errorMessage = this.customErrors && this.customErrors[errorName];
      errorMessage = errorMessage || (defaultErrorMessages[errorName] as string);

      if (errorName == "maxlength") {
        errorMessage = errorMessage.replace("{0}", this.maxlength.toString());
      }

      if (errorName == "minlength") {
        errorMessage = errorMessage.replace("{0}", this.minlength.toString());
      }
    }

    if (this.errorMessage != errorMessage) {
      this.errorMessage = errorMessage;

      this.elementRef.nativeElement.querySelector("mat-error").textContent = errorMessage || "";
    }
  }

  ngAfterViewInit(): void {
    this._subscription = interval(100)
      .pipe(
        map(() => {
          if (this.showError) {
            return this.errorName;
          } else {
            return null;
          }
        }),
        distinctUntilChanged()
      )
      .subscribe(() => this.onStatusChange());

    let controlName = this.getFormControlName();

    (this.elementRef.nativeElement as HTMLElement).setAttribute(
      "control-name-for-validation",
      controlName
    );
  }

  ngOnDestroy(): void {
    this._subscription && this._subscription.unsubscribe();
  }

  private getFormControlName(): string {
    let result = this.controlName;

    let controlsObj = this.formGroup?.form?.controls || this.formGroupName?.control.controls;

    if (!result && controlsObj) {
      for (let key of Object.keys(controlsObj)) {
        let control = controlsObj[key];

        if (control == this.control) {
          return key;
        }
      }
    }

    return result;
  }
}
