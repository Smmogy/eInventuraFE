import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RoomService } from '../../services/room/room.service';
import { Prostorija } from '../../models/prostorija';

@Component({
  selector: 'app-prostorija-create-form',
  templateUrl: './prostorija-create-form.component.html',
  styleUrls: ['./prostorija-create-form.component.css'],
})
export class ProstorijaCreateFormComponent implements OnInit {
  prostorijaForm: FormGroup;
  idInstitution!: number;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private prostorijaService: RoomService
  ) {
    this.prostorijaForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.idInstitution = +id;
      } else {
        console.error('Institution ID is missing from route parameters.');
      }
    });
  }

  onSubmit(): void {
    if (this.prostorijaForm.valid && !this.isLoading) {
      this.isLoading = true;

      const prostorijaData: Prostorija = {
        name: this.prostorijaForm.value.name,
        idInstitution: this.idInstitution,
        idProstorija: 0,
      };

      this.prostorijaService.createRoom(prostorijaData).subscribe({
        next: (createdProstorija) => {
          console.log('Prostorija created successfully:', createdProstorija);
          this.isLoading = false;
          this.location.back();
        },
        error: (error) => {
          console.error('Failed to create prostorija:', error);
          this.isLoading = false;
        }
      });
    } else {
      this.prostorijaForm.markAllAsTouched();
    }
  }
}
