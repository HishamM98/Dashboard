import { User } from './../types/user';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { EMPTY, Observable, expand, map, reduce, take } from 'rxjs';
import { environment as env } from '../../../environments/environment.development';
import { ApiResponse } from '../types/apiresponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = env.apiUrl;

  getUsersByPage(page: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/users`, {
      params: {
        page
      }
    });
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/users?page=${1}`).pipe(
      take(1),
      expand((response) => response.page !== response.total_pages ? this.http.get<ApiResponse>(`${this.apiUrl}/users?page=${response.page + 1}`) : EMPTY
      ),
      reduce((acc: User[], current) => acc.concat(current.data), [])
    );
  }

  getUser(id: string): Observable<User> {
    return this.http.get<{ data: User; }>(`${this.apiUrl}/users/${id}`).pipe(
      map((response) => response.data)
    );
  }
}
