import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
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
      this.loading = true;
      const artiklData: Artikl = {
        idArtikl: 0,
        name: this.artiklForm.value.name,
        idProstorija: this.idProstorija,
      };

      this.artiklService.createArticle(artiklData).subscribe(
        (createdArtikl) => {
          console.log('Artikl created successfully:', createdArtikl);
          this.router.navigate(['artikl', 'edit', createdArtikl.idArtikl], {
            replaceUrl: true,
          });
          this.loading = false;
        },
        (error) => {
          console.error('Failed to create artikl:', error);
          this.loading = false;
        }
      );
    } else {
      this.artiklForm.markAllAsTouched();
    }
  }
}
