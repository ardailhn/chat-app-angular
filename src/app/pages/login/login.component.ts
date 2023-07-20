import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

interface LoginForm {
  username: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup<LoginForm>({
    username: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  constructor(private authService: AuthService, private router: Router) { }

  async onSubmit() {
    console.warn(this.loginForm.value);
    const { username, password }: any = this.loginForm.value;
    const login$ = this.authService.login(username, password);
    try {
      const result:any = await lastValueFrom(login$);
      const { accessToken } = result;
      localStorage.setItem('accessToken', accessToken);
      this.router.navigate(['/']);
    }
    catch (error) {
      console.error('error: ', error);
    }
  }

}
