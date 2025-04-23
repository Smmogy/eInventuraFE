import { Component, OnInit } from '@angular/core';
import { InventuraService } from '../../services/inventura/inventura.service';
import { InventuraList } from '../../models/inventura';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  inventuraList: InventuraList[] = [];
  userId!: number;
  isLoading: boolean = false;

  constructor(
    private inventuraService: InventuraService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const userIdParam = params.get('id');
      if (userIdParam) {
        this.userId = +userIdParam;
        this.getListOfInventuras();
      } else {
        console.error('User ID is not present in the route parameters');
      }
    });
  }

  getListOfInventuras() {
    this.isLoading = true; 
    if (this.userId) {
      this.inventuraService
        .getInventurasByUserIdByStanje(this.userId)
        .subscribe({
          next: (inventuras) => {
            this.inventuraList = inventuras;
            this.isLoading = false; 
          },
          error: (err) => {
            console.error('Error fetching inventuras:', err);
            this.isLoading = false; 
          },
        });
    } else {
      console.error('User ID is not defined');
    }
  }

  viewInventuraDetails(id: number) {
    this.router.navigate(['inventura/edit/', id]);
  }
}
