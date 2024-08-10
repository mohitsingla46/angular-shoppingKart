import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly SIGNIN_API = `${environment.apiBaseUrl}/auth/signin`;
  private readonly SIGNUP_API = `${environment.apiBaseUrl}/auth/signup`;

  constructor(private http: HttpClient) { }

  signin(email: string, password: string): Observable<any> {
    return this.http.post<string>(this.SIGNIN_API, { email, password })
      .pipe(map((result: any) => {
        if (result.status === 200) {
          localStorage.setItem('token', result.data.token);
        }
        return result;
      }));
  }

  signup(name: string, email: string, password: string, role: string): Observable<any> {
    return this.http.post<string>(this.SIGNUP_API, { name, email, password, role });
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }

  logout() {
    localStorage.removeItem('token');
  }
}
