import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { DjelatniciService } from '../../services/djelatnici/dijelatnici.service';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  registerForm: FormGroup;
  successVisible = false;
  loginErrorVisible = false;
  loginErrorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userService: DjelatniciService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
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
              error: () => this.showLoginErrorDialog('Failed to get user details'),
            });
          } else {
            this.showLoginErrorDialog('Failed to extract email from token');
          }
        },
        error: () => this.showLoginErrorDialog('Prijava nije uspjela'),
      });
    }
  }

  registerUser() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: () => (this.successVisible = true),
        error: () => this.showLoginErrorDialog('Email se već koristi'),
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
