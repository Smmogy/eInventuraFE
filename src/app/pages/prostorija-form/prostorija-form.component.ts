import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from '../../services/room/room.service';
import { InstitutionService } from '../../services/institution/institution.service';
import { Prostorija } from '../../models/prostorija';
import { Institution } from '../../models/institution';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-prostorija-form',
  templateUrl: './prostorija-form.component.html',
  styleUrls: ['./prostorija-form.component.css'],
})
export class ProstorijaFormComponent implements OnInit {
  idInstitution!: number;
  idProstorijaToDelete!: number;
  selectedInstitution: Institution | undefined;
  rooms: Prostorija[] = [];
  filteredRooms: Prostorija[] = [];
  searchQuery: string = '';
  displayDialog: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private institutionService: InstitutionService,
    private roomService: RoomService,
    private messageService: MessageService
  ) {
    this.idInstitution = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.getInstitution();
    this.getRooms();
  }

  getInstitution(): void {
    this.institutionService.getInstitutionById(this.idInstitution).subscribe(
      (data: Institution) => {
        this.selectedInstitution = data;
      },
      (error: any) => {
        console.error('Error fetching institution:', error);
      }
    );
  }

  getRooms(): void {
    this.roomService.getRoomsByInstitutionId(this.idInstitution).subscribe(
      (data: Prostorija[]) => {
        this.rooms = data;
        this.filteredRooms = data;
      },
      (error: any) => {
        console.error('Error fetching rooms:', error);
      }
    );
  }

  filterRooms(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredRooms = this.rooms.filter((room) =>
      room.name.toLowerCase().includes(query)
    );
  }

  prepareDeleteRoom(idProstorija: number): void {
    this.idProstorijaToDelete = idProstorija;
    this.displayDialog = true;
  }

  closeDialog(): void {
    this.displayDialog = false;
    this.idProstorijaToDelete = 0;
  }

  confirmDelete(): void {
    if (this.idProstorijaToDelete) {
      this.roomService.deleteRoom(this.idProstorijaToDelete).subscribe(
        () => {
          this.rooms = this.rooms.filter(
            (room) => room.idProstorija !== this.idProstorijaToDelete
          );
          this.filteredRooms = this.filteredRooms.filter(
            (room) => room.idProstorija !== this.idProstorijaToDelete
          );
          this.closeDialog();
        },
        (error: any) => {
          console.error('Error deleting room:', error);
          this.closeDialog();

          this.messageService.add({
            severity: 'error',
            summary: 'Greška',
            detail:
              'Nije moguće obrisati prostoriju koja se koristi u inventuri.',
          });
        }
      );
    }
  }
}
