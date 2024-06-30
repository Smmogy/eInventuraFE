import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { InventuraService } from '../../services/inventura/inventura.service';
import { Inventura } from '../../models/inventura';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  inventuraList: Inventura[] = [];

  constructor(private inventuraService: InventuraService) {
    this.getListOfInventuras();
  }

  getListOfInventuras() {
    this.inventuraService.getAllInventura().subscribe((value) => {
      this.inventuraList = value;
    });
  }
}
