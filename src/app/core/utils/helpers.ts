import { HttpHeaders } from "@angular/common/http";

export function isLoggedIn() {
  return localStorage.getItem('token') !== null;
}

export function getHeaders() {
  return new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });
}
