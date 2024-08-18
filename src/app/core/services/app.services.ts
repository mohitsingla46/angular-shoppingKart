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

  signup(user: { name: any; email: any; password: any; role: any; }): Observable<any> {
    return this.http.post<string>(`${ApiEndpoint.SignUp}`, user);
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

  categoryList(): Observable<any> {
    return this.http.get<string>(`${ApiEndpoint.CategoryList}`, { headers: getHeaders() });
  }

  addProduct(product: { category_id: any; name: any; description: any; price: any; inStock: any; }): Observable<any> {
    return this.http.post<string>(`${ApiEndpoint.AddProduct}`, product, { headers: getHeaders() });
  }

}
