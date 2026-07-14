import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  signup() {
    this.authService.signup(this.email, this.password)
      .then(() => {
        alert('Account Created Successfully');

        // Clear the fields
        this.email = '';
        this.password = '';

        // Stay on the Login page
        this.router.navigate(['/']);
      })
      .catch(err => alert(err.message));
  }

  login() {
    this.authService.login(this.email, this.password)
      .then(() => {
        alert('Login Successful');

        // Go to Dashboard
        this.router.navigate(['/dashboard']);
      })
      .catch(err => alert(err.message));
  }

  googleLogin() {
    this.authService.loginWithGoogle()
      .then(() => {
        alert('Google Login Successful');

        // Go to Dashboard
        this.router.navigate(['/dashboard']);
      })
      .catch(err => alert(err.message));
  }
}