import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InventuraService } from '../services/inventura/inventura.service';
import { InstitutionService } from '../services/institution/institution.service';
import { RoomService } from '../services/room/room.service';
import { formatDate } from '@angular/common';
import { Institution } from '../models/institution';
import { Room } from '../models/room';
import { Artikl } from '../models/artikl';
import { Djelatnici } from '../models/djelatnici';
import { DjelatniciService } from '../services/djelatnici/dijelatnici.service';

@Component({
  selector: 'app-inventura-form',
  templateUrl: './inventura-form.component.html',
  styleUrls: ['./inventura-form.component.css'],
})
export class InventuraFormComponent implements OnInit {
  inventuraForm: FormGroup;
  institutions: Institution[] = [];
  selectedInstitution: Institution | null = null;
  rooms: Room[] = [];
  selectedRoom: Room | null = null;
  users: Djelatnici[] = [];
  selectedUsers: Djelatnici[] = [];

  constructor(
    private fb: FormBuilder,
    private inventuraService: InventuraService,
    private institutionService: InstitutionService,
    private roomService: RoomService,
    private djelatniciService: DjelatniciService,
    private router: Router
  ) {
    this.inventuraForm = this.fb.group({
      naziv: ['', Validators.required],
      datumPocetka: ['', Validators.required],
      datumZavrsetka: ['', Validators.required],
      akademskaGod: [null, Validators.required],
      institution: [null, Validators.required],
      newInstitutionName: [''],
      newRoomName: [''],
      selectedRoom: [null],
      selectedUsers: [[]],
    });
  }

  ngOnInit(): void {
    this.loadInstitutions();
    this.loadDjelatnici();
  }
  loadDjelatnici(): void {
    this.djelatniciService.getDjelatnici().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error loading Djelatnici:', error);
        // Handle error scenarios
      }
    );
  }

  loadInstitutions(): void {
    this.institutionService
      .getInstitutions()
      .subscribe((data: Institution[]) => {
        this.institutions = data;
      });
  }

  onInstitutionChange(event: any): void {
    this.selectedInstitution = event.value;
    this.rooms = [];
    this.selectedRoom = null;
    this.inventuraForm.patchValue({ selectedRoom: null });
  }

  addInstitution(): void {
    const newInstitutionName = this.inventuraForm
      .get('newInstitutionName')
      ?.value.trim();
    if (newInstitutionName) {
      const newInstitution = { name: newInstitutionName } as Institution;
      this.institutionService
        .createInstitution(newInstitution)
        .subscribe((data) => {
          this.institutions.push(data);
          this.selectedInstitution = data;
          this.inventuraForm.patchValue({ institution: data });
          this.inventuraForm.patchValue({ newInstitutionName: '' });
        });
    }
  }

  addRoom(): void {
    const newRoomName = this.inventuraForm.get('newRoomName')?.value.trim();
    if (this.selectedInstitution && newRoomName) {
      const newRoom = {
        name: newRoomName,
        institution: this.selectedInstitution,
        artikls: [],
      } as Room;
      this.roomService.createRoom(newRoom).subscribe((data) => {
        this.rooms.push(data);
        this.selectedRoom = data;
        this.inventuraForm.patchValue({ selectedRoom: data });
        this.inventuraForm.patchValue({ newRoomName: '' });
      });
    }
  }

  addArtikl(name: string): void {
    if (this.selectedRoom && name.trim()) {
      const newArtikl = {
        name: name.trim(),
        room: this.selectedRoom,
      } as Artikl;
      this.roomService.createArtikl(newArtikl).subscribe((data) => {
        if (!this.selectedRoom!.artikls) {
          this.selectedRoom!.artikls = [];
        }
        this.selectedRoom!.artikls.push(data);
      });
    }
  }

  removeArtikl(artikl: Artikl): void {
    if (this.selectedRoom && artikl.id) {
      this.roomService
        .deleteArtikl(this.selectedRoom.id!, artikl.id)
        .subscribe(() => {
          this.selectedRoom!.artikls = this.selectedRoom!.artikls.filter(
            (a) => a.id !== artikl.id
          );
        });
    }
  }

  onSubmit(): void {
    if (this.inventuraForm.valid) {
      const formValue = this.inventuraForm.getRawValue();
      formValue.datumPocetka = this.formatDate(formValue.datumPocetka);
      formValue.datumZavrsetka = this.formatDate(formValue.datumZavrsetka);
      alert('Inventura successfully created!');
      this.inventuraService.createInventura(formValue).subscribe(() => {
        this.router.navigateByUrl('/dashboard');
      });
    }
  }

  private formatDate(date: string): string {
    return formatDate(date, 'yyyy-MM-dd', 'en');
  }
}
