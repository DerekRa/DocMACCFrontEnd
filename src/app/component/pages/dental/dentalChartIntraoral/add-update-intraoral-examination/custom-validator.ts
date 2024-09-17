import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function toothSurfaceValidator(controlName: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
        const surfaceCheckResponses = formGroup.get(controlName);

        console.log('surfaceCheckResponses == ' + surfaceCheckResponses);
        //   const passwordControl = formGroup.get(controlName);
        //   const confirmPasswordControl = formGroup.get(matchingControlName);

        //   if (!passwordControl || !confirmPasswordControl) {
        //     return null;
        //   }

        //   if (passwordControl.value !== confirmPasswordControl.value) {
        //     confirmPasswordControl.setErrors({ passwordMismatch: true });
        //   } else {
        //     confirmPasswordControl.setErrors(null);
        //   }

        return null;
    };
}
