import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const startDate = control.get('datumPocetka')?.value;
    const endDate = control.get('datumZavrsetka')?.value;

    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    if (!startDate || !endDate) {
      return null;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      return { dateInvalid: true };
    }

    if (start < today) {
      return { startDateInPast: true };
    }

    return null;
  };
}

export function academicYearValidator(currentYear: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const year = control.value;
    const minYear = currentYear;
    const maxYear = currentYear + 6; 

    if (!Number.isInteger(year) || year < minYear || year > maxYear) {
      return { invalidAcademicYear: true };
    }
    return null;
  };
}



