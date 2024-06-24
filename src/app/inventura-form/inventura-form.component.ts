import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { InventuraService } from '../services/inventura/inventura.service';

@Component({
  selector: 'app-inventura-form',
  templateUrl: './inventura-form.component.html',
  styleUrls: ['./inventura-form.component.css'],
})
export class InventuraFormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private inventuraService: InventuraService,
    private router: Router
  ) {}

  inventuraForm: FormGroup = this.fb.group({
    naziv: ['', Validators.required],
    datumPocetka: ['', Validators.required],
    datumZavrsetka: ['', Validators.required],
    akademskaGod: [null, Validators.required],
  });

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.inventuraForm.valid) {
      this.inventuraService
        .createInventura(this.inventuraForm.getRawValue())
        .subscribe((_) => {
          this.router.navigateByUrl('/dashboard');
        });
    }
  }
}
