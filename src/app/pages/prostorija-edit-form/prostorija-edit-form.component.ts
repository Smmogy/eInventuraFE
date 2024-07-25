import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Prostorija } from '../../models/prostorija';
import { RoomService } from '../../services/room/room.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-prostorija-edit-form',
  templateUrl: './prostorija-edit-form.component.html',
  styleUrls: ['./prostorija-edit-form.component.css'],
})
export class ProstorijaEditFormComponent implements OnInit {
  prostorijaForm: FormGroup;
  idProstorija!: number;
  prostorija: Prostorija | undefined;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private prostorijaService: RoomService,
    private location: Location
  ) {
    this.prostorijaForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.idProstorija = +params['id'];
      this.loadProstorija(this.idProstorija);
    });
  }

  loadProstorija(id: number): void {
    this.prostorijaService.getProstorijaById(id).subscribe({
      next: (data) => {
        this.prostorija = data;
        this.prostorijaForm.patchValue({
          name: this.prostorija.name,
        });
      },
      error: (error) => {
        console.error('Error loading prostorija:', error);
      },
    });
  }

  onSubmit(): void {
    if (this.prostorijaForm.valid && this.prostorija) {
      const updatedProstorija: Prostorija = {
        idProstorija: this.prostorija.idProstorija,
        name: this.prostorijaForm.value.name,
        idInstitution: this.prostorija.idInstitution,
        artikls: this.prostorija.artikls,
      };

      this.prostorijaService.updateProstorija(updatedProstorija).subscribe({
        next: () => {
          console.log('Prostorija updated successfully');
          this.location.back();
        },
        error: (error) => {
          console.error('Error updating prostorija:', error);
        },
      });
    }
  }

  cancel(): void {
    this.location.back();
  }
}
