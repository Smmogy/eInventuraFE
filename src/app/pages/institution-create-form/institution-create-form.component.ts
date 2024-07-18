import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InstitutionService } from '../../services/institution/institution.service';

@Component({
  selector: 'app-institution-create-form',
  templateUrl: './institution-create-form.component.html',
  styleUrls: ['./institution-create-form.component.css'],
})
export class InstitutionCreateFormComponent implements OnInit {
  institutionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private institutionService: InstitutionService
  ) {
    this.institutionForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.institutionForm.valid) {
      const institutionData = this.institutionForm.value;
      this.institutionService.createInstitution(institutionData).subscribe(
        (createdInstitution) => {
          console.log('Institution created successfully:', createdInstitution);
          // Redirect to '/inventura-form' after successful creation
          this.router.navigateByUrl('/institutions-form');
        },
        (error) => {
          console.error('Failed to create institution:', error);
          // Handle error if necessary
        }
      );
    } else {
      // Mark form controls as touched to display validation errors
      this.institutionForm.markAllAsTouched();
    }
  }
}
