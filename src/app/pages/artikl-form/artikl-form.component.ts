import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../services/article/article.service';
import { RoomService } from '../../services/room/room.service';
import { Artikl } from '../../models/artikl';
import { Prostorija } from '../../models/prostorija';
import { MessageService } from 'primeng/api';

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
  filteredArtikli: Artikl[] = [];
  searchQuery: string = '';
  displayConfirmDialog: boolean = false;
  artiklToDelete: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private prostorijaService: RoomService,
    private artiklService: ArticleService,
    private messageService: MessageService
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
        this.filteredArtikli = data;
      },
      (error: any) => {
        console.error('Error fetching artikli:', error);
      }
    );
  }

  filterArtikli(): void {
    this.filteredArtikli = this.artikli.filter((artikl) =>
      artikl.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  showConfirmDialog(idArtikl: number): void {
    this.artiklToDelete = idArtikl;
    this.displayConfirmDialog = true;
  }

  closeConfirmDialog(): void {
    this.displayConfirmDialog = false;
    this.artiklToDelete = null;
  }

  confirmDelete(): void {
    if (this.artiklToDelete !== null) {
      this.artiklService.deleteArtikl(this.artiklToDelete).subscribe(
        () => {
          this.artikli = this.artikli.filter(
            (artikl) => artikl.idArtikl !== this.artiklToDelete
          );
          this.filterArtikli();
          this.closeConfirmDialog();
        },
        (error: any) => {
          console.error('Error deleting artikl:', error);
          this.closeConfirmDialog();

          this.messageService.add({
            severity: 'error',
            summary: 'Greška',
            detail: 'Nije moguće obrisati artikl koji se koristi u inventuri.',
          });
        }
      );
    }
  }
}
