import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InventuraService } from '../services/inventura/inventura.service';
import { formatDate } from '@angular/common';
import { dateRangeValidator } from '../customValidators/date-range.validator';

@Component({
  selector: 'app-inventura-form',
  templateUrl: './inventura-form.component.html',
  styleUrls: ['./inventura-form.component.css'],
})
export class InventuraFormComponent implements OnInit {
  inventuraForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private inventuraService: InventuraService,
    private router: Router
  ) {
    this.inventuraForm = this.fb.group(
      {
        naziv: ['', Validators.required],
        datumPocetka: ['', Validators.required],
        datumZavrsetka: ['', Validators.required],
        akademskaGod: [null, Validators.required],
      },
      {
        validator: dateRangeValidator('datumPocetka', 'datumZavrsetka'),
      }
    );
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.inventuraForm.valid) {
      const formValue = this.inventuraForm.getRawValue();

      formValue.datumPocetka = this.formatDate(formValue.datumPocetka);
      formValue.datumZavrsetka = this.formatDate(formValue.datumZavrsetka);
      alert('Inventura successfully created!');
      this.inventuraService.createInventura(formValue).subscribe(() => {
        this.router.navigateByUrl('/dashboard');
      });
    }
  }

  private formatDate(date: string): string {
    return formatDate(date, 'yyyy-MM-dd', 'en');
  }
}
