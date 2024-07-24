import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Artikl } from '../../models/artikl';
import { ArticleService } from '../../services/article/article.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-artikl-edit-form',
  templateUrl: './artikl-edit-form.component.html',
  styleUrls: ['./artikl-edit-form.component.css'],
})
export class ArtiklEditFormComponent implements OnInit {
  artiklForm: FormGroup;
  idArtikl!: number;
  artikl: Artikl | undefined;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private artiklService: ArticleService,
    private location: Location
  ) {
    this.artiklForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.idArtikl = +params['id'];
      this.loadArtikl(this.idArtikl);
    });
  }

  loadArtikl(id: number): void {
    this.artiklService.getArticleById(id).subscribe({
      next: (data) => {
        this.artikl = data;
        this.artiklForm.patchValue({
          name: this.artikl.name,
        });
      },
      error: (error) => {
        console.error('Error loading artikl:', error);
      },
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
}
