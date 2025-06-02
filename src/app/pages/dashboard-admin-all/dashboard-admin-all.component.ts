import { Component } from '@angular/core';
import { InventuraService } from '../../services/inventura/inventura.service';
import { InventuraList } from '../../models/inventura';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-admin-all',
  templateUrl: './dashboard-admin-all.component.html',
  styleUrl: './dashboard-admin-all.component.css',
})
export class DashboardAdminAllComponent {
  inventuraList: InventuraList[] = [];
  institution?: String;
  displayDialog: boolean = false;
  itemToDeleteId: number | null = null;

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
        this.inventuraList = inventuras;
      },
      error: (err) => {
        console.error('Error fetching inventuras:', err);
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

  viewInventuraDetails(id: number) {
    this.router.navigate(['inventura/edit', id]);
  }

  editInventura(id: number) {
    this.router.navigate(['inventura/edit', id]);
  }
}
