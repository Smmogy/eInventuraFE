import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InventuraDetailProstorija } from '../../models/inventura';
import { InventuraService } from '../../services/inventura/inventura.service';
import { ArtiklPrisutan } from '../../models/artikl';

@Component({
  selector: 'app-inventura-detai-prostorija',
  templateUrl: './inventura-detail-prostorija.component.html',
  styleUrls: ['./inventura-detail-prostorija.component.css'],
})
export class InventuraDetailProstorijaComponent implements OnInit {
  inventuraId!: number;
  prostorijaId!: number;
  detailData?: InventuraDetailProstorija;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private inventuraService: InventuraService
  ) {}

  ngOnInit(): void {
    this.inventuraId = +this.route.snapshot.paramMap.get('idInventura')!;
    this.prostorijaId = +this.route.snapshot.paramMap.get('idProstorija')!;

    this.loadDetails();
  }

  loadDetails() {
    this.inventuraService
      .getInventuraDetailProstorijaById(this.inventuraId, this.prostorijaId)
      .subscribe((data) => {
        this.detailData = data;
      });
  }

  togglePrisutan(artiklId: number, currentValue: boolean) {
    const payload: ArtiklPrisutan = {
      idArtikl: artiklId,
      idInventura: this.inventuraId,
      prisutan: !currentValue,
    };

    this.inventuraService.updateArticlePresence(payload).subscribe(() => {
      const artikl = this.detailData?.artikls.find(
        (a) => a.idArtikl === artiklId
      );
      if (artikl) artikl.prisutan = !currentValue;
    });
  }
}
