import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../services/article/article.service';
import { RoomService } from '../../services/room/room.service';
import { Artikl } from '../../models/artikl'; // Import the Artikl model
import { Prostorija } from '../../models/prostorija'; // Import the Prostorija model

@Component({
  selector: 'app-artikl-form',
  templateUrl: './artikl-form.component.html',
  styleUrls: ['./artikl-form.component.css'],
})
export class ArtiklFormComponent implements OnInit {
  idProstorija!: number;
  idArtikl!: number;
  selectedProstorija: Prostorija | undefined;
  artikli: Artikl[] = [];

  constructor(
    private route: ActivatedRoute,
    private prostorijaService: RoomService,
    private artiklService: ArticleService
  ) {
    this.idProstorija = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.getProstorija();
    this.getArtikli();
  }

  getProstorija(): void {
    this.prostorijaService.getProstorijaById(this.idProstorija).subscribe(
      (data: Prostorija) => {
        this.selectedProstorija = data;
      },
      (error: any) => {
        console.error('Error fetching prostorija:', error);
      }
    );
  }

  getArtikli(): void {
    this.artiklService.getArticlesByRoomId(this.idProstorija).subscribe(
      (data: Artikl[]) => {
        this.artikli = data;
      },
      (error: any) => {
        console.error('Error fetching artikli:', error);
      }
    );
  }

  deleteArtikl(idArtikl: number): void {
    this.artiklService.deleteArtikl(idArtikl).subscribe(
      () => {
        this.artikli = this.artikli.filter(
          (artikl) => artikl.idArtikl !== idArtikl
        );
      },
      (error: any) => {
        console.error('Error deleting artikl:', error);
      }
    );
  }
}
