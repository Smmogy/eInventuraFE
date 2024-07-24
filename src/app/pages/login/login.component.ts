import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { DjelatniciService } from '../../services/djelatnici/dijelatnici.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private userService: DjelatniciService // Inject UserService to fetch user ID
  ) {}

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

  successVisible: boolean = false; // Controls the visibility of the success dialog

  onLogin() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.getRawValue()).subscribe({
        next: (res: any) => {
          this.authService.setToken(res.token);
          const email = this.getEmailFromToken(res.token);
          if (email) {
            this.userService.getUserIdByEmail(email).subscribe({
              next: (userId: number) => {
                this.router.navigateByUrl(`/dashboard/${userId}`);
              },
              error: (err) => {
                console.error('Failed to get user ID by email:', err);
                alert('Failed to get user details');
              },
            });
          } else {
            console.error('Email could not be extracted from token');
            alert('Failed to extract email from token');
          }
        },
        error: (res: any) => {
          alert('Login failed');
        },
      });
    }
  }

  registerUser() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.getRawValue()).subscribe({
        next: () => {
          this.successVisible = true; // Show success dialog
          setTimeout(() => {
            this.successVisible = false; // Hide dialog after some time
            this.router.navigateByUrl('/login'); // Redirect to login page after showing success message
          }, 3000); // Adjust the delay as needed
        },
        error: (err: any) => {
          console.error('Registration failed:', err);
          alert('Email already exists');
        },
      });
    }
  }

  // Method to extract email from JWT token
  private getEmailFromToken(token: string): string | null {
    try {
      const decodedToken = jwtDecode<any>(token); // Decode token
      return decodedToken.sub || null; // Adjust this if your token structure is different
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  }
}
