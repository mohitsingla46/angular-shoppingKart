import { environment } from "@env/environment";

export const ApiEndpoint = {
  Roles: `${environment.apiBaseUrl}/roles/list`,
  SignIn: `${environment.apiBaseUrl}/auth/signin`,
  SignUp: `${environment.apiBaseUrl}/auth/signup`,
  Profile: `${environment.apiBaseUrl}/auth/profile`,
  ProductList: `${environment.apiBaseUrl}/product/list`
};
