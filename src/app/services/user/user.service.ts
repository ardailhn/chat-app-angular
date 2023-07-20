import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersUrl = environment.apiUrl + '/users';
  constructor(private httpClient: HttpClient) { }

  register(username: string, password: string) {
    return this.httpClient.post(this.usersUrl, { username, password });
  }
}
