import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../services/article/article.service';
import { Artikl } from '../../models/artikl';
@Component({
  selector: 'app-artikl-create-form',
  templateUrl: './artikl-create-form.component.html',
  styleUrls: ['./artikl-create-form.component.css'],
})
export class ArtiklCreateFormComponent implements OnInit {
  artiklForm: FormGroup;
  idProstorija!: number;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private route: ActivatedRoute,
    private artiklService: ArticleService
  ) {
    this.artiklForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = +params.get('id')!;
      if (id) {
        this.idProstorija = id;
      } else {
        console.error('Prostorija ID is missing from route parameters.');
      }
    });
  }

  onSubmit(): void {
    if (this.artiklForm.valid) {
      const artiklData: Artikl = {
        idArtikl: 0,
        name: this.artiklForm.value.name,
        idProstorija: this.idProstorija,
        prisutan: false,
      };

      this.artiklService.createArticle(artiklData).subscribe(
        (createdArtikl) => {
          console.log('Artikl created successfully:', createdArtikl);
          this.location.back();
        },
        (error) => {
          console.error('Failed to create artikl:', error);
        }
      );
    } else {
      this.artiklForm.markAllAsTouched();
    }
  }
}
