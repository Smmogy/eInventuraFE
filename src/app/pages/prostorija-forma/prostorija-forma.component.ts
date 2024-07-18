import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Prostorija } from '../../models/prostorija';
import { RoomService } from '../../services/room/room.service';

@Component({
  selector: 'app-prostorija-forma',
  templateUrl: './prostorija-forma.component.html',
  styleUrls: ['./prostorija-forma.component.css'],
})
export class ProstorijaFormaComponent implements OnInit {
  institutionId!: number;
  institutionName?: string;
  prostorija?: Prostorija[];
  prostorijaForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private roomService: RoomService
  ) {
    this.prostorijaForm = this.fb.group({
      // Define form controls if needed
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.institutionId = +params['id'];
      this.loadRooms();
    });
  }

  loadRooms(): void {
    this.roomService
      .getRoomsByInstitutionId(this.institutionId)
      .subscribe((prostorija) => {
        this.prostorija = this.prostorija;
      });
  }

  // Implement other methods as needed (e.g., saveRoom, deleteRoom, etc.)
}
