import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { ApiEndpoint } from "../constants/constants";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  http = inject(HttpClient);

  headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });

  signin(email: string, password: string): Observable<any> {
    return this.http.post<string>(`${ApiEndpoint.SignIn}`, { email, password })
      .pipe(map((result: any) => {
        if (result.status === 200) {
          localStorage.setItem('token', result.data.token);
        }
        return result;
      }));
  }

  signup(name: string, email: string, password: string, role: string): Observable<any> {
    return this.http.post<string>(`${ApiEndpoint.SignUp}`, { name, email, password, role });
  }

  logout() {
    localStorage.removeItem('token');
  }

  bookList(): Observable<any> {
    return this.http.get<string>(`${ApiEndpoint.BookList}`, { headers: this.headers });
  }

}
