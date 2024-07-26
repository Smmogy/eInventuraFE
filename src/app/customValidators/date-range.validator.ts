import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const startDate = control.get('datumPocetka')?.value;
    const endDate = control.get('datumZavrsetka')?.value;
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      return { dateInvalid: true };
    }
    return null;
  };
}

export function academicYearValidator(currentYear: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const year = control.value;
    const minYear = currentYear - 1;
    if (!Number.isInteger(year) || year < minYear) {
      return { yearInvalid: true };
    }
    return null;
  };
}
