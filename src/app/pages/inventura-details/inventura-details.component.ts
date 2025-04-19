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
  isAdmin: boolean = false;
  displayConfirmDialog: boolean = false;

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

  goBack() {
    this.location.back();
  }
}
