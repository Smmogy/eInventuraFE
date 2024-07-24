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
    if (this.userId) {
      this.inventuraService.getInventurasByUserId(this.userId).subscribe({
        next: (inventuras) => {
          this.inventuraList = inventuras;
        },
        error: (err) => {
          console.error('Error fetching inventuras:', err);
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
