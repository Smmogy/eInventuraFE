import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InventuraService } from '../../services/inventura/inventura.service';
import { RoomService } from '../../services/room/room.service';
import { ArticleService } from '../../services/article/article.service';
import { Inventura, InventuraDetail } from '../../models/inventura';
import { Prostorija, ProstorijaDetail } from '../../models/prostorija';
import { Artikl, ArtiklPrisutan } from '../../models/artikl';

@Component({
  selector: 'app-inventura-details',
  templateUrl: './inventura-details.component.html',
  styleUrls: ['./inventura-details.component.css'],
})
export class InventuraDetailsComponent implements OnInit {
  inventura!: InventuraDetail;
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
    console.log(result);
    this.scanning = false; // Stop scanning after a successful scan

    const idArtikl = +result;
    if (!isNaN(idArtikl)) {
      this.updateArticlePresence(idArtikl);
    } else {
      console.error('Invalid barcode scanned:', result);
    }
  }

  private updateArticlePresence(idArtikl: number) {
    const artiklPrisutan: ArtiklPrisutan = {
      idArtikl: idArtikl,
      idInventura: this.inventura.idInventura,
    };

    this.inventuraService.updateArticlePresence(artiklPrisutan).subscribe({
      next: () => {
        console.log('Article presence updated successfully.');
        this.updateArticleStatusInUI(idArtikl);
      },
      error: (err) => {
        console.error('Error updating article presence:', err);
      },
    });
  }

  private updateArticleStatusInUI(idArtikl: number) {
    this.inventura.institution.prostorijas.forEach((room) => {
      room.artikls.forEach((artikl) => {
        if (artikl.idArtikl === idArtikl) {
          artikl.prisutan = true; // Update the article's presence status
        }
      });
    });
  }
}
