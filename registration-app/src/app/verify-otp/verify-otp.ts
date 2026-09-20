import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-otp',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './verify-otp.html',
  styleUrl: './verify-otp.css'
})
export class VerifyOtp {

  name = '';
  email = '';
  password = '';
  otp = '';

  message = signal('');
  error = signal('');

  constructor(
    private http: HttpClient,
    private router: Router
  ) {

    const navigation = this.router.getCurrentNavigation();

    const state = navigation?.extras.state;

    if (state) {
      this.name = state['name'] || '';
      this.email = state['email'] || '';
      this.password = state['password'] || '';
    }
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

        this.router.navigate(['/login']);

      },

      error: (error) => {

        this.error.set(
          error.error?.message ||
          'Invalid OTP'
        );

      }

    });
  }
}