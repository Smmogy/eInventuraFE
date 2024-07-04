import { AbstractControl, ValidatorFn } from '@angular/forms';

export function dateRangeValidator(
  startDateField: string,
  endDateField: string
): ValidatorFn {
  return (formGroup: AbstractControl): { [key: string]: boolean } | null => {
    const startDate = formGroup.get(startDateField)?.value;
    const endDate = formGroup.get(endDateField)?.value;

    if (!startDate || !endDate) {
      return null;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    return start <= end ? null : { dateRangeInvalid: true };
  };
}
