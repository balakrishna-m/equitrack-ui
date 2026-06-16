import { Injectable } from "@angular/core";

const TOKEN_KEY = 'auth_token';
const DUMMY_TOKEN = 'equitrack_authenticated'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  login(): void {
    localStorage.setItem(TOKEN_KEY, DUMMY_TOKEN);
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(TOKEN_KEY) === DUMMY_TOKEN;
  }
}

