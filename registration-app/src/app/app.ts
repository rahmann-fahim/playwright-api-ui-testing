import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { Login } from './login/login';

@Component({
  selector: 'app-root',
  imports: [
    FormsModule,
    RouterOutlet,
    Login
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  name = '';
  email = '';
  password = '';
  otp = '';

  step = signal(1);

  message = signal('');
  error = signal('');

  users = signal<any[]>([]);

  constructor(
    private http: HttpClient
  ) {}

  register() {

    console.log('REGISTER CLICKED');

    this.message.set('');
    this.error.set('');

    const data = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    console.log('REGISTER DATA:', data);

    this.http.post<any>(
      'http://localhost:8081/api/auth/register',
      data
    ).subscribe({

      next: (response) => {

        console.log('REGISTER SUCCESS:', response);

        this.message.set(response.message);

        this.step.set(2);
      },

      error: (error) => {

        console.log('REGISTER ERROR:', error);

        this.error.set(
          error.error?.message ||
          'Registration failed'
        );

      }

    });
  }

  verifyOtp() {

    this.message.set('');
    this.error.set('');

    const data = {
      name: this.name,
      email: this.email,
      password: this.password,
      otp: this.otp
    };

    this.http.post<any>(
      'http://localhost:8081/api/auth/verify-otp',
      data
    ).subscribe({

      next: (response) => {

        this.message.set(response.message);

        this.step.set(3);

      },

      error: (error) => {

        this.error.set(
          error.error?.message ||
          'Invalid OTP'
        );

      }

    });
  }

  handleLoginSuccess() {

    this.step.set(4);

    this.getUsers();
  }

  getUsers() {

    this.http.get<any[]>(
      'http://localhost:8081/api/auth/users'
    ).subscribe({

      next: (response) => {

        this.users.set(response);

      },

      error: () => {

        this.error.set('Failed to load users');

      }

    });
  }
}