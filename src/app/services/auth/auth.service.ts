import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl = environment.apiUrl + '/auth';
  helper = new JwtHelperService();
  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string) {
    return this.httpClient.post(this.authUrl, { username, password });
  }

  newAccessToken() {
    return this.httpClient.get(this.authUrl + '/refresh');
  }

  logout() {
    return this.httpClient.post(this.authUrl + '/logout', '');
  }

  async isLoggedIn(): Promise<boolean> {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) return false;
    if (this.helper.isTokenExpired(accessToken)) {
      const refresh$ = this.newAccessToken();
      try {
        const result: any = await lastValueFrom(refresh$);
        const { accessToken } = result;
        if (!accessToken) return false;
        localStorage.setItem('accessToken', accessToken);
        return true;
      }
      catch (error) {
        console.error('error: ', error);
        return false;
      }
    } else {
      return true;
    }
  }

  getParsedAccessToken() {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) return null;
    return this.helper.decodeToken(accessToken);
  }
}
