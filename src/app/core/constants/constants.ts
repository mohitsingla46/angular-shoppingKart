import { environment } from "@env/environment";

export const ApiEndpoint = {
  Roles: `${environment.apiBaseUrl}/roles/list`,
  SignIn: `${environment.apiBaseUrl}/auth/signin`,
  SignUp: `${environment.apiBaseUrl}/auth/signup`,
  Profile: `${environment.apiBaseUrl}/auth/profile`,

  CategoryList: `${environment.apiBaseUrl}/category/list`,

  Product: `${environment.apiBaseUrl}/product`,
};
