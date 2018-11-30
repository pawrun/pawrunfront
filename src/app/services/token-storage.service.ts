import { Injectable } from '@angular/core';

const TOKEN_KEY = 'PawAuthToken';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  signOut() {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.clear();
  }
}
