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
import { RoomService } from '../services/room/room.service';
import {
  dateValidator,
  academicYearValidator,
} from '../customValidators/date-range.validator';
import { Prostorija } from '../models/prostorija';

@Component({
  selector: 'app-inventura-form',
  templateUrl: './inventura-form.component.html',
  styleUrls: ['./inventura-form.component.css'],
})
export class InventuraFormComponent implements OnInit {
  selectedUsers: Djelatnici[] = [];
  inventuraForm: FormGroup;
  institutions: Institution[] = [];
  users: Djelatnici[] = [];
  rooms: Prostorija[] = [];
  roomUserMap: { [key: number]: Djelatnici[] } = {};
  isLoading: boolean = false;
  isRoomsLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private inventuraService: InventuraService,
    private institutionService: InstitutionService,
    private userService: DjelatniciService,
    private roomService: RoomService,
    private location: Location
  ) {
    const currentYear = new Date().getFullYear();
    this.inventuraForm = this.fb.group({
      naziv: ['', Validators.required],
      datumPocetka: ['', Validators.required],
      datumZavrsetka: ['', Validators.required],
      akademskaGod: [
        '',
        [Validators.required, academicYearValidator(currentYear)],
      ],
      institution: [null, Validators.required],
    },
  
    { validators: dateValidator() });
  }

  ngOnInit(): void {
    this.loadInstitutions();
    this.loadUsers();
  }

  loadInstitutions(): void {
    this.institutionService.getInstitutions().subscribe(
      (data) => (this.institutions = data),
      (error) => console.error('Error loading institutions:', error)
    );
  }

  loadUsers(): void {
    this.userService.getDjelatnici().subscribe(
      (data) => (this.users = data),
      (error) => console.error('Error loading users:', error)
    );
  }

  onInstitutionChange(event: any): void {
    const institutionId = event.value.idInstitution;
    this.isRoomsLoading = true;

    this.roomService.getRoomsByInstitutionId(institutionId).subscribe(
      (data) => {
        this.rooms = data;
        this.roomUserMap = {};
        this.rooms.forEach((room) => {
          this.roomUserMap[room.idProstorija] = [];
        });
        this.isRoomsLoading = false;
      },
      (error) => {
        console.error('Greška pri dohvaćanju prostorija:', error);
        this.isRoomsLoading = false;
      }
    );
  }

  allRoomsValid(): boolean {
    return Object.values(this.roomUserMap).every((users) => users.length > 0);
  }

  onSubmit(): void {
    if (
      this.inventuraForm.valid &&
      this.allRoomsValid() &&
      !this.isLoading &&
      !this.isRoomsLoading
    ) {
      this.isLoading = true;

      const institution: Institution = this.inventuraForm.value.institution;
      const usersIds = this.selectedUsers.map((user) => user.id);

      const inventuraData: CreateInventuraDTO = {
        idInventura: 0,
        naziv: this.inventuraForm.value.naziv,
        datumPocetka: this.inventuraForm.value.datumPocetka,
        datumZavrsetka: this.inventuraForm.value.datumZavrsetka,
        akademskaGod: this.inventuraForm.value.akademskaGod,
        institutionId: institution.idInstitution,
        usersIds: usersIds,
        roomUserMap: this.roomUserMap,
      };

      this.inventuraService.createInventura(inventuraData).subscribe({
        next: (createdInventura) => {
          console.log('Inventura uspješno spremljena:', createdInventura);
          this.isLoading = false;
          this.location.back();
        },
        error: (error) => {
          console.error('Greška kod kreiranja inventure:', error);
          this.isLoading = false;
        },
      });
    } else {
      this.inventuraForm.markAllAsTouched();
    }
  }
}
