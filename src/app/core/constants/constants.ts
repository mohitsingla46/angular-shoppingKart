import { environment } from "@env/environment";

export const ApiEndpoint = {
  SignIn: `${environment.apiBaseUrl}/auth/signin`,
  SignUp: `${environment.apiBaseUrl}/auth/signup`,
  BookList: `${environment.apiBaseUrl}/book/list`
};
