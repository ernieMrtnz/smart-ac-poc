import { Directive, ElementRef, EventEmitter, HostListener, Output } from "@angular/core";
import { FormGroupDirective } from "@angular/forms";

@Directive({
  selector: "form[appSubmit]",
})
export class AppFormSubmitDirective {
  @Output() appSubmit = new EventEmitter<void>();

  constructor(private elementRef: ElementRef, private formGroup: FormGroupDirective) {}

  @HostListener("submit", ["$event"])
  onClick(): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    (this.formGroup as any).submitted = true;

    if (this.isValid()) {
      this.appSubmit.emit();

      window.setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        (this.formGroup as any).submitted = false;
        this.formGroup.form.markAsUntouched();
      }, 5);
    }
  }

  private isValid(): boolean {
    for (let key of Object.keys(this.formGroup.form.controls)) {
      let control = this.formGroup.form.controls[key];
      let isValid = control.valid || control.disabled;

      if (!isValid) {
        //Check if the input exists in markup
        let controlInput = this.elementRef.nativeElement.querySelector(
          `app-input-error[control-name-for-validation="${key}"]`
        );

        if (controlInput) {
          return false;
        }
      }
    }

    return true;
  }
}
