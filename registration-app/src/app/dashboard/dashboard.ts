import { Component, signal } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive
} from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  // Logged-in user's name
  userName = signal(
    localStorage.getItem('userName') || 'User'
  );

  // Total users from database
  totalUsers = signal(0);

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.getTotalUsers();
  }

  getTotalUsers() {

    this.http.get<any[]>(
      'http://localhost:8081/api/auth/users'
    ).subscribe({

      next: (users) => {
        this.totalUsers.set(users.length);
      },

      error: (error) => {
        console.error(
          'Failed to load users:',
          error
        );
      }

    });
  }

  logout() {

    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');

    this.router.navigate(['/login']);
  }
}