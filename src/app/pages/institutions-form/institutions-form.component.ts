import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InstitutionService } from '../../services/institution/institution.service';
import { Institution } from '../../models/institution';

@Component({
  selector: 'app-institutions-form',
  templateUrl: './institutions-form.component.html',
  styleUrls: ['./institutions-form.component.css'],
})
export class InstitutionsFormComponent implements OnInit {
  institutions: Institution[] = [];
  institutionForm: FormGroup;
  selectedInstitution: Institution | null = null;

  constructor(
    private fb: FormBuilder,
    private institutionService: InstitutionService
  ) {
    this.institutionForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadInstitutions();
  }

  loadInstitutions(): void {
    this.institutionService
      .getInstitutions()
      .subscribe((data: Institution[]) => {
        this.institutions = data;
      });
  }

  deleteInstitution(id: number): void {
    this.institutionService.deleteInstitution(id).subscribe(() => {
      this.institutions = this.institutions.filter(
        (institution) => institution.idInstitution !== id
      );
    });
  }
}
