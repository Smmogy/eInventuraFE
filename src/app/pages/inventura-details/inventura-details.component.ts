import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { InventuraService } from '../../services/inventura/inventura.service';
import { AuthService } from '../../services/auth/auth.service';
import { InventuraDetail } from '../../models/inventura';

@Component({
  selector: 'app-inventura-details',
  templateUrl: './inventura-details.component.html',
  styleUrls: ['./inventura-details.component.css'],
})
export class InventuraDetailsComponent implements OnInit {
  inventura!: InventuraDetail;
  isAdmin: boolean = false;
  displayConfirmDialog: boolean = false;
  isDownloading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private inventuraService: InventuraService,
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

  navigateToRoomDetails(roomId: number) {
    this.router.navigate(['prostorija', roomId], {
      relativeTo: this.route,
      state: {
        stanje: this.inventura.stanje,
      },
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

  generatePdf(): void {
    if (this.isDownloading) return;
    this.isDownloading = true;

    this.inventuraService.getGeneratedPdf(this.inventura.idInventura).subscribe({
      next: (pdfBlob: Blob) => {
        const blob = new Blob([pdfBlob], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `inventura_${this.inventura.idInventura}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
        this.isDownloading = false;
      },
      error: (err) => {
        console.error('Failed to download PDF:', err);
        alert('Greška pri generiranju PDF-a.');
        this.isDownloading = false;
      }
    });
  }

  goBack() {
    this.location.back();
  }
}
