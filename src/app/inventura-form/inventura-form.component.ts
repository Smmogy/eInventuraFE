import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InventuraService } from '../services/inventura/inventura.service';
import { InstitutionService } from '../services/institution/institution.service';
import { DjelatniciService } from '../services/djelatnici/dijelatnici.service';
import { Institution } from '../models/institution';
import { Djelatnici } from '../models/djelatnici';
import { Inventura } from '../models/inventura';
import { CreateInventuraDTO } from '../models/create-inventura-dto';
import { Location } from '@angular/common';

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
    this.inventuraForm = this.fb.group({
      naziv: ['', Validators.required],
      datumPocetka: ['', Validators.required],
      datumZavrsetka: ['', Validators.required],
      akademskaGod: ['', Validators.required],
      institution: [null, Validators.required],
      loadUsers: [[], Validators.required],
    });
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
    // Handle any additional logic when institution changes
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
          // Redirect to the relevant form or list
          this.location.back();
        },
        (error) => {
          console.error('Failed to create inventura:', error);
          // Handle error if necessary
        }
      );
    } else {
      this.inventuraForm.markAllAsTouched();
    }
  }
}
