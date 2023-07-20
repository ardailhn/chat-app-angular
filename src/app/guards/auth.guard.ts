import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) { }

  async canActivate() {
    if (await this.authService.isLoggedIn()) {
      return true;
    }
    this.router.navigateByUrl('/login');
    return false;
  }
}