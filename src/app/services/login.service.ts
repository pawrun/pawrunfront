import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private remoteServerURL = '//77.55.221.43:8086';
  private remoteLoginDirectory = '/oauth/token';
  private remoteRegistrationDirectory = '/registration';

  constructor(private http: HttpClient, private token: TokenStorageService, private router: Router) { }

  attemptLogin(email: string, password: string) {
    const params = new HttpParams()
      .set('grant_type', 'password')
      .set('username', email)
      .set('password', password);
    const headerJson = {
      'Authorization': 'Basic ' + btoa('pawrun-client:pawrun-secret')
    };
    const headers = new HttpHeaders(headerJson);
    const httpOptions = {
      headers: headers,
      params: params,
      withCredentials: true
    };

    console.log('attemptAuth ::');
    return this.http.post<any>(this.remoteServerURL + this.remoteLoginDirectory, new FormData(),
      httpOptions);
  }

  logout() {
    this.token.signOut();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    if (this.token.getToken() === null) {
      return false;
    } else {
      return true;
    }
  }
}
