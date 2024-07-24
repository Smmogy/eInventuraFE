import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InventuraService } from '../../services/inventura/inventura.service';
import { RoomService } from '../../services/room/room.service';
import { ArticleService } from '../../services/article/article.service';
import { Inventura, InventuraDetail } from '../../models/inventura';
import { Prostorija, ProstorijaDetail } from '../../models/prostorija';
import { Artikl } from '../../models/artikl';

@Component({
  selector: 'app-inventura-details',
  templateUrl: './inventura-details.component.html',
  styleUrls: ['./inventura-details.component.css'],
})
export class InventuraDetailsComponent implements OnInit {
  inventura!: InventuraDetail;
  rooms: ProstorijaDetail[] = [];
  articles: Map<number, Artikl[]> = new Map();
  scanning = false;

  constructor(
    private route: ActivatedRoute,
    private inventuraService: InventuraService,
    private roomService: RoomService,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.inventuraService
        .getInventuraDetailById(+id)
        .subscribe((data: InventuraDetail) => {
          this.inventura = data;
        });
    }
  }

  startScanning() {
    this.scanning = true;
  }

  onBarcodeScanned(result: string) {
    this.scanning = false; // Stop scanning after a successful scan

    // Assuming idArtikl is a number, convert scannedCode to number
    const idArtikl = +result;
    if (!isNaN(idArtikl)) {
      this.updateArticlePresence(idArtikl);
    } else {
      console.error('Invalid barcode scanned:', result);
    }
  }

  private updateArticlePresence(idArtikl: number) {
    this.rooms.forEach((room) => {
      const articles = this.articles.get(room.idProstorija) || [];
      articles.forEach((artikl) => {
        if (artikl.idArtikl === idArtikl) {
          artikl.prisutan = true; // Update the article's presence status
        }
      });
    });
  }
}
