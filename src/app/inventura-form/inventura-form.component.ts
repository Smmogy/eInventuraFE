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
import { ArticleService } from '../services/article/article.service';
import { Artikl } from '../models/artikl';
import {
  dateValidator,
  academicYearValidator,
} from '../customValidators/date-range.validator';
import { Prostorija } from '../models/prostorija';
import { forkJoin, Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

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
  roomUserTouchedMap: { [key: number]: boolean } = {};

  institutionHasRooms: boolean = false;
  roomsHaveArticles: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private inventuraService: InventuraService,
    private institutionService: InstitutionService,
    private userService: DjelatniciService,
    private roomService: RoomService,
    private artiklService: ArticleService,
    private location: Location
  ) {
    const currentYear = new Date().getFullYear();
    this.inventuraForm = this.fb.group(
      {
        naziv: ['', Validators.required],
        datumPocetka: ['', Validators.required],
        datumZavrsetka: ['', Validators.required],
        akademskaGod: ['', [Validators.required, academicYearValidator(currentYear)]],
        institution: [null, Validators.required],
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
    this.rooms = [];
    this.roomUserMap = {};
    this.roomUserTouchedMap = {};
    this.institutionHasRooms = false;
    this.roomsHaveArticles = false;

    this.roomService.getRoomsByInstitutionId(institutionId).pipe(
      switchMap((rooms: Prostorija[]) => {
        this.rooms = rooms;
        this.institutionHasRooms = rooms.length > 0;

        if (!this.institutionHasRooms) {
          this.isRoomsLoading = false;
          return of([]);
        }
        const articlesObservables: Observable<Artikl[]>[] = rooms.map((room) =>
          this.artiklService.getArticlesByRoomId(room.idProstorija).pipe(
            catchError(() => of([]))
          )
        );

        return forkJoin(articlesObservables);
      })
    ).subscribe({
      next: (articlesArray: Artikl[][]) => {
        this.roomsHaveArticles = articlesArray.length === this.rooms.length &&
          articlesArray.every((artikli) => artikli.length > 0);

        if (this.institutionHasRooms && this.roomsHaveArticles) {
          this.rooms.forEach((room) => {
            this.roomUserMap[room.idProstorija] = [];
          });
        } else {
          this.roomUserMap = {};
        }
        this.isRoomsLoading = false;
      },
      error: (error) => {
        console.error('Greška pri dohvaćanju prostorija ili artikala:', error);
        this.isRoomsLoading = false;
      },
    });
  }

  allRoomsValid(): boolean {
    return Object.values(this.roomUserMap).every((users) => users.length > 0);
  }

  canCreateInventura(): boolean {
    return (
      this.inventuraForm.valid &&
      this.institutionHasRooms &&
      this.roomsHaveArticles &&
      this.allRoomsValid() &&
      !this.isLoading &&
      !this.isRoomsLoading
    );
  }

  markRoomUserTouched(roomId: number) {
    this.roomUserTouchedMap[roomId] = true;
  }

  roomUserMapTouched(roomId: number): boolean {
    return !!this.roomUserTouchedMap[roomId];
  }

  onSubmit(): void {
    if (this.canCreateInventura()) {
      this.isLoading = true;

      const institution: Institution = this.inventuraForm.value.institution;

      const usersIds: number[] = [];
      for (const roomUsers of Object.values(this.roomUserMap)) {
        roomUsers.forEach((user) => {
          if (!usersIds.includes(user.id)) {
            usersIds.push(user.id);
          }
        });
      }

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
      Object.keys(this.roomUserMap).forEach((roomIdStr) => {
        const roomId = Number(roomIdStr);
        if (this.roomUserMap[roomId].length === 0) {
          this.roomUserTouchedMap[roomId] = true;
        }
      });
    }
  }
}
