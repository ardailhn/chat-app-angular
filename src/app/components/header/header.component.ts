import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  toggle: boolean = false;

  constructor(private authService: AuthService) { }

  async logout() {
    const logout$ = this.authService.logout();
    try {
      await lastValueFrom(logout$);
      localStorage.removeItem('accessToken');
      window.location.reload();
    }
    catch (error) {
      console.error('error: ', error);
    }
  }

  toggleMenu() {
    this.toggle = !this.toggle;
  }
}
