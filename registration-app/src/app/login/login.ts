import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email = '';
  password = '';

  error = signal('');
  message = signal('');

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login() {

    this.error.set('');
    this.message.set('');

    const data = {
      email: this.email,
      password: this.password
    };

    this.http.post<any>(
      'http://localhost:8081/api/auth/login',
      data
    ).subscribe({

      next: (response) => {

        // Save JWT token
        localStorage.setItem(
          'token',
          response.token
        );

        // Save logged-in user's name
        localStorage.setItem(
          'userName',
          response.name
        );

        // Save logged-in user's email
        localStorage.setItem(
          'userEmail',
          response.email
        );

        this.message.set(
          response.message
        );

        console.log(
          'JWT Token:',
          response.token
        );

        console.log(
          'Logged-in User:',
          response.name
        );

        // Go to Dashboard
        this.router.navigate(['/dashboard']);

      },

      error: (error) => {

        this.error.set(
          error.error?.message ||
          'Login failed'
        );

      }

    });
  }
}