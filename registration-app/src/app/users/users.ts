import {
  Component,
  signal,
  computed
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  RouterLink,
  RouterLinkActive
} from '@angular/router';


@Component({
  selector: 'app-users',
  standalone: true,

  imports: [
    RouterLink,
    RouterLinkActive
  ],

  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users {

  users = signal<any[]>([]);

  error = signal('');

  loading = signal(true);

  searchTerm = signal('');


  filteredUsers = computed(() => {

    const search =
      this.searchTerm()
        .toLowerCase()
        .trim();


    if (!search) {
      return this.users();
    }


    return this.users().filter(user =>

      user.name
        ?.toLowerCase()
        .includes(search)

      ||

      user.email
        ?.toLowerCase()
        .includes(search)

    );

  });


  constructor(
    private http: HttpClient
  ) {

    this.getUsers();

  }


  getUsers() {

    this.loading.set(true);

    this.error.set('');


    this.http.get<any[]>(

      'http://localhost:8081/api/auth/users'

    ).subscribe({

      next: (response) => {

        this.users.set(response);

        this.loading.set(false);

      },


      error: (error) => {

        this.error.set(

          error.error?.message ||

          'Failed to load users'

        );

        this.loading.set(false);

      }

    });

  }


  updateSearch(event: Event) {

    const input =
      event.target as HTMLInputElement;

    this.searchTerm.set(
      input.value
    );

  }

}