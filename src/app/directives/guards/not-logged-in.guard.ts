import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { DjelatniciService } from '../../services/djelatnici/dijelatnici.service';

@Injectable({
  providedIn: 'root',
})
export class NotLoggedInGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private djelatniciService: DjelatniciService
  ) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      if (this.authService.hasAdminRole()) {
        this.router.navigate(['/dashboard/list/admin']);
      } else {
        const email = this.authService.getEmailFromToken();
        if (email) {
          this.djelatniciService.getUserIdByEmail(email).subscribe({
            next: (userId: number) => {
              this.router.navigate([`/dashboard/${userId}`]);
            },
            error: () => {
              this.router.navigate(['/login']);
            },
          });
        } else {
          this.router.navigate(['/login']);
        }
      }
      return false;
    }
    return true;
  }
}
