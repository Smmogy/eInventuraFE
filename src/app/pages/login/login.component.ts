import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
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

  onLogin() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.getRawValue());
      this.authService.login(this.loginForm.getRawValue()).subscribe({
        next: (res: any) => {
          this.authService.setToken(res.token);
          console.log(this.authService.getUserData());
          this.router.navigateByUrl('/dashboard');
        },
        error: (res: any) => {
          alert('login failed');
        },
      });
    }
  }

  registerUser() {
    console.log(this.registerForm.getRawValue());
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.getRawValue()).subscribe({
        next: () => {
          alert('Sign up was successful');
          this.router.navigateByUrl('/login'); // Redirect to login page after successful registration
        },
        error: (err: any) => {
          console.error('Registration failed:', err);
          alert('email vec postoi');
        },
      });
    }
  }
}
