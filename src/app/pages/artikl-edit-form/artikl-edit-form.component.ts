import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Artikl } from '../../models/artikl';
import { ArticleService } from '../../services/article/article.service';
import { Location } from '@angular/common';
import { RoomService } from '../../services/room/room.service';
import { Prostorija } from '../../models/prostorija';

@Component({
  selector: 'app-artikl-edit-form',
  templateUrl: './artikl-edit-form.component.html',
  styleUrls: ['./artikl-edit-form.component.css'],
})
export class ArtiklEditFormComponent implements OnInit {
  artiklForm: FormGroup;
  idArtikl!: number;
  artikl: Artikl | undefined;
  prostorije: Prostorija[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private artiklService: ArticleService,
    private location: Location,
    private roomService: RoomService
  ) {
    this.artiklForm = this.fb.group({
      name: ['', Validators.required],
      idProstorija: [null, Validators.required]
    });
  }

  ngOnInit(): void {
  this.route.params.subscribe((params) => {
    this.idArtikl = +params['id'];
    this.loadArtikl(this.idArtikl);
  });
}
 
  loadArtikl(id: number): void {
    this.artiklService.getArticleProstorijaById(id).subscribe({
      next: (data) => {
        this.artikl = data;
        this.artiklForm.patchValue({
          name: this.artikl.name,
          idProstorija: this.artikl.idProstorija
        });
  
        this.roomService.getInstitutionByRoomId(this.artikl.idProstorija).subscribe({
          next: (prostorija) => {
            const idInstitution = prostorija.idInstitution;
  
            this.loadProstorije(idInstitution);
          },
          error: (err) => {
            console.error('Greška kod dohvaćanja prostorije:', err);
          }
        });
      },
      error: (error) => {
        console.error('Error loading artikl:', error);
      },
    });
  }

  loadProstorije(idInstitution: number): void {
    this.roomService.getRoomsByInstitutionId(idInstitution).subscribe({
      next: (data) => {
        this.prostorije = data;
      },
      error: (err) => {
        console.error('Greška kod dohvaćanja prostorija:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.artiklForm.valid && this.artikl) {
      const updatedArtikl: Artikl = {
        idArtikl: this.artikl.idArtikl,
        name: this.artiklForm.value.name,
        idProstorija: this.artikl.idProstorija,
        prisutan: this.artikl.prisutan,
      };

      this.artiklService.updateArticle(updatedArtikl).subscribe({
        next: () => {
          console.log('Artikl updated successfully');
          this.location.back();
        },
        error: (error) => {
          console.error('Error updating artikl:', error);
        },
      });
    }
  }
  cancel(): void {
    this.location.back();
  }
}
