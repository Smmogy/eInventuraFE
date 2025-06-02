import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InventuraService } from '../../services/inventura/inventura.service';
import { InventuraDetailProstorija } from '../../models/inventura';
import { Artikl, ArtiklPrisutan } from '../../models/artikl';
import { BarcodeFormat, BrowserMultiFormatReader } from '@zxing/library';
import { Location } from '@angular/common';

@Component({
  selector: 'app-inventura-detai-prostorija',
  templateUrl: './inventura-detail-prostorija.component.html',
  styleUrls: ['./inventura-detail-prostorija.component.css'],
})
export class InventuraDetailProstorijaComponent implements OnInit {
  inventuraId!: number;
  prostorijaId!: number;
  detailData?: InventuraDetailProstorija;
  scannerEnabled: boolean = false;
  scannedLoading: boolean = false;
  scannedError: boolean = false;
  lastScannedArtikl?: Artikl = undefined;

  allowedFormats = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.EAN_13,
    BarcodeFormat.EAN_8,
    BarcodeFormat.CODE_39,
    BarcodeFormat.UPC_A,
  ];

  availableDevices: MediaDeviceInfo[] = [];
  selectedDevice?: MediaDeviceInfo;

  constructor(
    private route: ActivatedRoute,
    private inventuraService: InventuraService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.inventuraId = +this.route.snapshot.paramMap.get('idInventura')!;
    this.prostorijaId = +this.route.snapshot.paramMap.get('idProstorija')!;
    this.loadDetails();
    this.initCameras();
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

  goBack(): void {
    this.location.back();
  }

  startScanner() {
    this.scannerEnabled = true;
    this.lastScannedArtikl = undefined;
    this.scannedLoading = false;
    this.scannedError = false;

    setTimeout(() => (this.selectedDevice = this.availableDevices[0]));
  }

  initCameras() {
    const codeReader = new BrowserMultiFormatReader();
    codeReader
      .listVideoInputDevices()
      .then((devices) => {
        this.availableDevices = devices.map((d) => ({
          ...d,
          label: d.label || `Kamera ${devices.indexOf(d) + 1}`,
        }));
      })
      .catch((err) => {
        console.error('Greška pri dohvaćanju kamera:', err);
      });
  }

  onCodeResult(resultString: string) {
    if (this.scannedLoading || this.lastScannedArtikl || this.scannedError) {
      return;
    }

    const artiklId = parseInt(resultString, 10);
    if (!isNaN(artiklId)) {
      const payload: ArtiklPrisutan = {
        idArtikl: artiklId,
        idInventura: this.inventuraId,
        prisutan: true,
      };

      this.scannedLoading = true;
      this.inventuraService.updateArticlePresence(payload).subscribe({
        next: (artiklDTO) => {
          const artikl = this.detailData?.artikls.find(
            (a) => a.idArtikl === artiklId
          );
          if (artikl) artikl.prisutan = true;

          this.lastScannedArtikl = artiklDTO;
          this.scannedLoading = false;
        },
        error: () => {
          this.scannedLoading = false;
          this.scannedError = true;
        },
      });
    }
  }
}
