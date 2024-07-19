import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RoomService } from '../../services/room/room.service';
import { Prostorija } from '../../models/prostorija';

@Component({
  selector: 'app-prostorija-create-form',
  templateUrl: './prostorija-create-form.component.html',
  styleUrls: ['./prostorija-create-form.component.css'],
})
export class ProstorijaCreateFormComponent implements OnInit {
  prostorijaForm: FormGroup;
  idInstituion!: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private prostorijaService: RoomService
  ) {
    this.prostorijaForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Extract the institutionId from route parameters
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.idInstituion = +id;
      } else {
        console.error('Institution ID is missing from route parameters.');
        // Optionally, redirect or handle the missing ID case
      }
    });
  }

  onSubmit(): void {
    console.log('' + this.idInstituion);
    if (this.prostorijaForm.valid) {
      const prostorijaData: Prostorija = {
        name: this.prostorijaForm.value.name,
        idInstitution: this.idInstituion,
        idProstorija: 0, // Provide default value if necessary
        artikls: [], // Provide default value if necessary
      };

      this.prostorijaService.createRoom(prostorijaData).subscribe(
        (createdProstorija) => {
          console.log('Prostorija created successfully:', createdProstorija);
          // Redirect to the relevant room form or list
          this.router.navigate([
            '/prostorija-form',
            createdProstorija.idProstorija,
          ]);
        },
        (error) => {
          console.error('Failed to create prostorija:', error);
          // Handle error if necessary
        }
      );
    } else {
      this.prostorijaForm.markAllAsTouched();
    }
  }
}
