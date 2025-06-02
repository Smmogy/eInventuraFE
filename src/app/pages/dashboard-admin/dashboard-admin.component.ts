import { Component, OnInit } from '@angular/core';
import { InventuraService } from '../../services/inventura/inventura.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InventuraList } from '../../models/inventura';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.css',
})
export class DashboardAdminComponent implements OnInit {
  inventuraList: InventuraList[] = [];
  institution?: String;
  displayDialog: boolean = false;
  itemToDeleteId: number | null = null;
  isLoading: boolean = true;
  constructor(
    private inventuraService: InventuraService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getListOfInventuras();
  }

  getListOfInventuras() {
    this.inventuraService.getAllInventura().subscribe({
      next: (inventuras) => {
        this.inventuraList = inventuras.sort(
          (a, b) =>
            new Date(a.datumPocetka).getTime() -
            new Date(b.datumPocetka).getTime()
        );
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching inventuras:', err);
        this.isLoading = false;
      },
    });
  }
  openDeleteDialog(id: number) {
    this.itemToDeleteId = id;
    this.displayDialog = true;
  }

  closeDialog() {
    this.displayDialog = false;
    this.itemToDeleteId = null;
  }

  confirmDelete() {
    if (this.itemToDeleteId !== null) {
      this.inventuraService.deleteInventura(this.itemToDeleteId).subscribe(
        () => {
          this.getListOfInventuras();
          this.closeDialog();
        },
        (error) => {
          console.error('Error deleting item:', error);
          this.closeDialog();
        }
      );
    }
  }
  editInventura(id: number) {
    this.router.navigate(['inventura-form', id]);
  }
  viewInventuraDetails(id: number) {
    this.router.navigate(['inventura/edit/', id]);
  }
}
