import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InventuraService } from '../services/inventura/inventura.service';
import { InstitutionService } from '../services/institution/institution.service';
import { DjelatniciService } from '../services/djelatnici/dijelatnici.service';
import { Institution } from '../models/institution';
import { Djelatnici } from '../models/djelatnici';
import { CreateInventuraDTO } from '../models/create-inventura-dto';
import { Location } from '@angular/common';
import {
  dateValidator,
  academicYearValidator,
} from '../customValidators/date-range.validator';

@Component({
  selector: 'app-inventura-form',
  templateUrl: './inventura-form.component.html',
  styleUrls: ['./inventura-form.component.css'],
})
export class InventuraFormComponent implements OnInit {
  inventuraForm: FormGroup;
  institutions: Institution[] = [];
  users: Djelatnici[] = [];
  selectedUsers: Djelatnici[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private inventuraService: InventuraService,
    private institutionService: InstitutionService,
    private userService: DjelatniciService,
    private location: Location
  ) {
    const currentYear = new Date().getFullYear();
    this.inventuraForm = this.fb.group(
      {
        naziv: ['', Validators.required],
        datumPocetka: ['', Validators.required],
        datumZavrsetka: ['', Validators.required],
        akademskaGod: [
          '',
          [Validators.required, academicYearValidator(currentYear)],
        ],
        institution: [null, Validators.required],
        loadUsers: [[], Validators.required],
      },
      { validators: dateValidator() }
    );
  }

  ngOnInit(): void {
    this.loadInstitutions();
    this.loadUsers();
  }

  loadInstitutions(): void {
    this.institutionService.getInstitutions().subscribe(
      (data: Institution[]) => {
        this.institutions = data;
      },
      (error) => {
        console.error('Error loading institutions:', error);
      }
    );
  }

  loadUsers(): void {
    this.userService.getDjelatnici().subscribe(
      (data: Djelatnici[]) => {
        this.users = data;
      },
      (error) => {
        console.error('Error loading users:', error);
      }
    );
  }

  onInstitutionChange(event: any): void {
    console.log('Institution changed:', event.value);
  }

  onSubmit(): void {
    if (this.inventuraForm.valid) {
      let users: Djelatnici[] = this.inventuraForm.value.loadUsers;
      let institution: Institution = this.inventuraForm.value.institution;
      const inventuraData: CreateInventuraDTO = {
        idInventura: 0,
        naziv: this.inventuraForm.value.naziv,
        datumPocetka: this.inventuraForm.value.datumPocetka,
        datumZavrsetka: this.inventuraForm.value.datumZavrsetka,
        akademskaGod: this.inventuraForm.value.akademskaGod,
        institutionId: institution.idInstitution,
        usersIds: users.map((user) => user.id),
      };

      this.inventuraService.createInventura(inventuraData).subscribe(
        (createdInventura) => {
          console.log('Inventura created successfully:', createdInventura);
          this.location.back();
        },
        (error) => {
          console.error('Failed to create inventura:', error);
        }
      );
    } else {
      this.inventuraForm.markAllAsTouched();
    }
  }
}
