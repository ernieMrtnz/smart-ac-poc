import { FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";

function isNotNullOrEmpty(value: any) {
  return (
    value !== null &&
    value !== "" &&
    value !== undefined &&
    (!(value instanceof Array) || value.length > 0)
  );
}

export function requiredIf(
  otherControlName: string,
  conditionalFunc: (otherControlValue: any) => boolean = null
): ValidatorFn {
  let thisControl: FormControl;
  let otherControl: FormControl;

  return function requiredIfValidate(control: FormControl): ValidationErrors {
    if (!control.parent) {
      return null;
    }

    // Initializing the validator.
    if (!thisControl) {
      thisControl = control;
      otherControl = control.parent.get(otherControlName) as FormControl;
      if (!otherControl) {
        throw new Error("requiredIfValidator(): other control is not found in parent group");
      }
      otherControl.valueChanges.subscribe(() => {
        thisControl.updateValueAndValidity({ emitEvent: false });
      });
    }

    if (!otherControl) {
      return null;
    }

    let needToValidate = conditionalFunc
      ? conditionalFunc(otherControl.value)
      : isNotNullOrEmpty(otherControl.value);
    let isRequired = needToValidate && !isNotNullOrEmpty(thisControl.value);

    if (isRequired) {
      return {
        required: true,
      };
    }

    return null;
  };
}
