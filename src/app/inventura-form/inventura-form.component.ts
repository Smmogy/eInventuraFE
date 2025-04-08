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
import { Prostorija, ProstorijaUser } from '../models/prostorija';

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
  rooms: any[] = [];
  roomUserMap: { [key: number]: Djelatnici[] } = {};

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
    const institutionId = event.value.idInstitution;
    this.roomService.getRoomsByInstitutionId(institutionId).subscribe(
      (data) => {
        this.rooms = data;
        // Inicijaliziraj prazne liste za korisnike po prostorijama
        this.roomUserMap = {};
        for (let room of this.rooms) {
          this.roomUserMap[room.idProstorija] = [];
        }
      },
      (error) => {
        console.error('Greška pri dohvaćanju prostorija:', error);
      }
    );
  }

  onUserChange(): void {
    // Ovdje možeš dodati kod za filtriranje korisnika
    for (let roomId in this.roomUserMap) {
      this.roomUserMap[+roomId] = this.roomUserMap[+roomId].filter(user =>
        this.selectedUsers.some(u => u.id === user.id)
      );
    }
  }

  onSubmit(): void {
    if (this.inventuraForm.valid) {
      const users: Djelatnici[] = this.inventuraForm.value.loadUsers;
      const institution: Institution = this.inventuraForm.value.institution;

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

          // Iteriramo po mapiranim prostorijama i dodijeljenim korisnicima
          Object.entries(this.roomUserMap).forEach(([roomId, usersInRoom]) => {
            if (usersInRoom.length === 0) return;

            const dto: ProstorijaUser = {
              idProstorija: Number(roomId),
              name: this.rooms.find(r => r.idProstorija == Number(roomId))?.name || '',
              usersIds: usersInRoom.map(u => u.id)
            };

            this.roomService.createRoomWithUsers(dto).subscribe({
              next: () => console.log(`Dodani korisnici u prostoriju ${dto.name}`),
              error: (err) => console.error('Greška kod dodavanja korisnika u prostoriju:', err),
            });
          });

          this.location.back();
        },
        (error) => {
          console.error('Greška kod kreiranja inventure:', error);
        }
      );
    }
  }
  }