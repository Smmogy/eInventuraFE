import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { jwtDecode } from 'jwt-decode';
import { DjelatniciService } from '../../services/djelatnici/dijelatnici.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  registerForm = this.fb.group({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  successVisible: boolean = false;
  loginErrorVisible: boolean = false;
  loginErrorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private userService: DjelatniciService
  ) {}

  onLogin() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.getRawValue()).subscribe({
        next: (res: any) => {
          this.authService.setToken(res.token);
          const email = this.getEmailFromToken(res.token);
          if (email) {
            this.userService.getUserIdByEmail(email).subscribe({
              next: (userId: number) => {
                if (this.authService.hasAdminRole()) {
                  this.router.navigateByUrl(`/dashboard/list/admin`);
                } else {
                  this.router.navigateByUrl(`/dashboard/${userId}`);
                }
              },
              error: (err) => {
                console.error('Failed to get user ID by email:', err);
                this.showLoginErrorDialog('Failed to get user details');
              },
            });
          } else {
            console.error('Email could not be extracted from token');
            this.showLoginErrorDialog('Failed to extract email from token');
          }
        },
        error: (res: any) => {
          this.showLoginErrorDialog('Prijava nije uspjela');
        },
      });
    }
  }

  registerUser() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.getRawValue()).subscribe({
        next: () => {
          this.successVisible = true;
        },
        error: (err: any) => {
          console.error('Registracija neuspijela:', err);
          this.showLoginErrorDialog('Email se već koristi');
        },
      });
    }
  }

  private showLoginErrorDialog(message: string) {
    this.loginErrorMessage = message;
    this.loginErrorVisible = true;
  }

  closeLoginErrorDialog() {
    this.loginErrorVisible = false;
  }

  closeSuccessDialog() {
    this.successVisible = false;
    this.router.navigateByUrl('/login');
  }

  private getEmailFromToken(token: string): string | null {
    try {
      const decodedToken = jwtDecode<any>(token);
      return decodedToken.sub || null;
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  }
}
