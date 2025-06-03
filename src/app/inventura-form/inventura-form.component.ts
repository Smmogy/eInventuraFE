import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
import { switchMap, catchError } from 'rxjs/operators';

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
  loadingInventura: boolean = false;
  isEditMode: boolean = false;

  roomUserTouchedMap: { [key: number]: boolean } = {};
  institutionHasRooms: boolean = false;
  roomsHaveArticles: boolean = false;

  private inventuraId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
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
        akademskaGod: [
          '',
          [Validators.required, academicYearValidator(currentYear)],
        ],
        institution: [null, Validators.required],
      },
      { validators: dateValidator() }
    );
  }

  ngOnInit(): void {
    this.loadInstitutions();
    this.loadUsers();

    const id = this.activatedRoute.snapshot.params['id'];
    if (id !== undefined) {
      this.isEditMode = true;
      this.inventuraId = Number(id);
      this.loadInventuraData(this.inventuraId);
    }
  }

  loadInventuraData(id: number): void {
    this.loadingInventura = true;

    this.inventuraService.getInventuraById(id).subscribe({
      next: (inventura) => {
        const patchForm = () => {
          this.inventuraForm.patchValue({
            naziv: inventura.naziv,
            datumPocetka: new Date(inventura.datumPocetka),
            datumZavrsetka: new Date(inventura.datumZavrsetka),
            akademskaGod: inventura.akademskaGod,
            institution: this.institutions.find(
              (i) => i.idInstitution === inventura.institutionId
            ),
          });
          this.loadRoomsAndUsersForEdit(
            inventura.institutionId,
            inventura.roomUserMap
          );

          this.inventuraForm.get('institution')?.disable();
          this.loadingInventura = false;
        };

        if (this.institutions.length > 0) {
          patchForm();
        } else {
          this.institutionService
            .getInstitutions()
            .subscribe((institutions) => {
              this.institutions = institutions;
              patchForm();
            });
        }
      },
      error: (err) => {
        console.error('Greška kod učitavanja inventure:', err);
        this.loadingInventura = false;
      },
    });
  }

  loadRoomsAndUsersForEdit(
    institutionId: number,
    roomUserMapFromBackend: any
  ): void {
    this.isRoomsLoading = true;
    this.rooms = [];

    this.roomService
      .getRoomsByInstitutionId(institutionId)
      .pipe(
        switchMap((rooms: Prostorija[]) => {
          this.rooms = rooms;
          this.institutionHasRooms = rooms.length > 0;

          if (!this.institutionHasRooms) {
            this.isRoomsLoading = false;
            return of([]);
          }

          const articlesObservables: Observable<Artikl[]>[] = rooms.map(
            (room) =>
              this.artiklService
                .getArticlesByRoomId(room.idProstorija)
                .pipe(catchError(() => of([])))
          );

          return forkJoin(articlesObservables);
        })
      )
      .subscribe({
        next: (articlesArray: Artikl[][]) => {
          this.roomsHaveArticles =
            articlesArray.length === this.rooms.length &&
            articlesArray.every((artikli) => artikli.length > 0);

          if (this.institutionHasRooms && this.roomsHaveArticles) {
            this.rooms.forEach((room) => {
              this.roomUserMap[room.idProstorija] =
                roomUserMapFromBackend[room.idProstorija] || [];
            });
          } else {
            this.roomUserMap = {};
          }
          this.isRoomsLoading = false;
        },
        error: (err) => {
          console.error('Greška kod prostorija/artikala:', err);
          this.isRoomsLoading = false;
        },
      });
  }

  loadInstitutions(): void {
    this.institutionService.getInstitutions().subscribe(
      (data) => (this.institutions = data),
      (error) => console.error('Greška kod institucija:', error)
    );
  }

  loadUsers(): void {
    this.userService.getDjelatnici().subscribe(
      (data) => (this.users = data),
      (error) => console.error('Greška kod korisnika:', error)
    );
  }

  onInstitutionChange(event: any): void {
    const institutionId = event.value.idInstitution;
    this.loadRoomsAndUsersForEdit(institutionId, {});
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
    if (!this.canCreateInventura()) {
      this.inventuraForm.markAllAsTouched();
      Object.keys(this.roomUserMap).forEach((roomIdStr) => {
        const roomId = Number(roomIdStr);
        if (this.roomUserMap[roomId].length === 0) {
          this.roomUserTouchedMap[roomId] = true;
        }
      });
      return;
    }

    this.isLoading = true;
    const institution: Institution =
      this.inventuraForm.getRawValue().institution;

    const usersIds: number[] = [];
    for (const roomUsers of Object.values(this.roomUserMap)) {
      roomUsers.forEach((user) => {
        if (!usersIds.includes(user.id)) {
          usersIds.push(user.id);
        }
      });
    }

    const inventuraData: CreateInventuraDTO = {
      idInventura: this.inventuraId || 0,
      naziv: this.inventuraForm.value.naziv,
      datumPocetka: this.inventuraForm.value.datumPocetka,
      datumZavrsetka: this.inventuraForm.value.datumZavrsetka,
      akademskaGod: this.inventuraForm.value.akademskaGod,
      institutionId: institution.idInstitution,
      usersIds: usersIds,
      roomUserMap: this.roomUserMap,
    };

    this.inventuraService.saveInventura(inventuraData).subscribe({
      next: (res) => {
        console.log('Inventura spremljena:', res);
        this.isLoading = false;
        this.location.back();
      },
      error: (error) => {
        console.error('Greška kod spremanja:', error);
        this.isLoading = false;
      },
    });
  }
}
