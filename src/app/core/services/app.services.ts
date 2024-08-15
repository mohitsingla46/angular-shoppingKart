import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { ApiEndpoint } from "../constants/constants";
import { getHeaders } from "../utils/helpers";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  http = inject(HttpClient);

  roles(): Observable<any> {
    return this.http.get<string>(`${ApiEndpoint.Roles}`);
  }

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

  profile(): Observable<any> {
    return this.http.get<string>(`${ApiEndpoint.Profile}`, { headers: getHeaders() });
  }

  productList(): Observable<any> {
    return this.http.get<string>(`${ApiEndpoint.ProductList}`, { headers: getHeaders() });
  }

}
