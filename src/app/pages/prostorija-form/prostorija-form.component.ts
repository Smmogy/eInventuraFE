import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from '../../services/room/room.service';
import { InstitutionService } from '../../services/institution/institution.service';
import { Prostorija } from '../../models/prostorija';
import { Institution } from '../../models/institution';

@Component({
  selector: 'app-prostorija-form',
  templateUrl: './prostorija-form.component.html',
  styleUrls: ['./prostorija-form.component.css'],
})
export class ProstorijaFormComponent implements OnInit {
  idInstitution!: number;
  idProstorija!: number;
  selectedInstitution: Institution | undefined;
  rooms: Prostorija[] = [];

  constructor(
    private route: ActivatedRoute,
    private institutionService: InstitutionService,
    private roomService: RoomService
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
      },
      (error: any) => {
        console.error('Error fetching rooms:', error);
      }
    );
  }

  deleteRoom(idProstorija: number): void {
    this.roomService.deleteRoom(idProstorija).subscribe(
      () => {
        this.rooms = this.rooms.filter(
          (room) => room.idProstorija !== idProstorija
        );
      },
      (error: any) => {
        console.error('Error deleting room:', error);
      }
    );
  }
}
