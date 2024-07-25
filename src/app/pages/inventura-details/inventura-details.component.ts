import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { InventuraService } from '../../services/inventura/inventura.service';
import { RoomService } from '../../services/room/room.service';
import { ArticleService } from '../../services/article/article.service';
import { AuthService } from '../../services/auth/auth.service';
import { InventuraDetail } from '../../models/inventura';
import { ArtiklPrisutan } from '../../models/artikl';

@Component({
  selector: 'app-inventura-details',
  templateUrl: './inventura-details.component.html',
  styleUrls: ['./inventura-details.component.css'],
})
export class InventuraDetailsComponent implements OnInit {
  inventura!: InventuraDetail;
  scanning = false;
  isAdmin: boolean = false;
  displayConfirmDialog: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private inventuraService: InventuraService,
    private roomService: RoomService,
    private articleService: ArticleService,
    private authService: AuthService
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

    this.isAdmin = this.authService.hasAdminRole();
  }

  startScanning() {
    this.scanning = true;
  }

  onBarcodeScanned(result: string) {
    console.log(result);
    this.scanning = false;

    const idArtikl = +result;
    if (!isNaN(idArtikl)) {
      this.updateArticlePresence(idArtikl, true);
    } else {
      console.error('Invalid barcode scanned:', result);
    }
  }

  private updateArticlePresence(idArtikl: number, prisutan: boolean) {
    const artiklPrisutan: ArtiklPrisutan = {
      idArtikl: idArtikl,
      idInventura: this.inventura.idInventura,
      prisutan: prisutan,
    };

    this.inventuraService.updateArticlePresence(artiklPrisutan).subscribe({
      next: () => {
        console.log('Article presence updated successfully.');
        this.updateArticleStatusInUI(idArtikl, prisutan);
      },
      error: (err) => {
        console.error('Error updating article presence:', err);
      },
    });
  }

  private updateArticleStatusInUI(idArtikl: number, prisutan: boolean) {
    this.inventura.institution.prostorijas.forEach((room) => {
      room.artikls.forEach((artikl) => {
        if (artikl.idArtikl === idArtikl) {
          artikl.prisutan = prisutan;
        }
      });
    });
  }

  showConfirmDialog() {
    this.displayConfirmDialog = true;
  }

  finishInventura() {
    this.inventuraService
      .zavrsiInventuru(this.inventura.idInventura)
      .subscribe({
        next: () => {
          console.log('Inventura finished successfully.');
          this.displayConfirmDialog = false;
          this.location.back();
        },
        error: (err) => {
          console.error('Error finishing inventura:', err);
        },
      });
  }

  public onPrisutanChanged(artiklId: number, event: any) {
    this.updateArticlePresence(artiklId, event.target.checked);
  }

  goBack() {
    this.location.back();
  }
}
