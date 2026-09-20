import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  name = '';
  email = '';
  password = '';

  message = signal('');
  error = signal('');

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  register() {

    this.message.set('');
    this.error.set('');

    const data = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    this.http.post<any>(
      'http://localhost:8081/api/auth/register',
      data
    ).subscribe({

      next: (response) => {

        this.message.set(response.message);

        this.router.navigate(['/verify-otp'], {
          state: {
            name: this.name,
            email: this.email,
            password: this.password
          }
        });

      },

      error: (error) => {

        this.error.set(
          error.error?.message ||
          'Registration failed'
        );

      }

    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}