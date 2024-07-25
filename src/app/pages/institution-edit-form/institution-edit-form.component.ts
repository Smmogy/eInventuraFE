// institution-edit-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Institution } from '../../models/institution';
import { InstitutionService } from '../../services/institution/institution.service';

@Component({
  selector: 'app-institution-edit-form',
  templateUrl: './institution-edit-form.component.html',
  styleUrls: ['./institution-edit-form.component.css'],
})
export class InstitutionEditFormComponent implements OnInit {
  institutionForm: FormGroup;
  id!: number;
  institution: Institution | undefined;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location, // Inject Location service
    private institutionService: InstitutionService
  ) {
    this.institutionForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id']; // Get the id parameter from the route
      this.loadInstitution(this.id);
    });
  }

  loadInstitution(id: number): void {
    this.institutionService.getInstitutionById(id).subscribe({
      next: (data) => {
        this.institution = data;
        this.institutionForm.patchValue({
          name: this.institution.name,
          // Patch other form controls with institution data
        });
      },
      error: (error) => {
        console.error('Error loading institution:', error);
      },
    });
  }

  onSubmit(): void {
    if (this.institutionForm.valid && this.institution) {
      const updatedInstitution: Institution = {
        idInstitution: this.institution.idInstitution,
        name: this.institutionForm.value.name,
        // Ensure to include all required properties
        inventura: this.institution.inventura, // Assign other form control values to updatedInstitution
      };

      this.institutionService.updateInstitution(updatedInstitution).subscribe({
        next: () => {
          console.log('Institution updated successfully');
          // Navigate back to the previous page
          this.location.back();
        },
        error: (error) => {
          console.error('Error updating institution:', error);
        },
      });
    }
  }

  cancel(): void {
    this.location.back();
  }
}
