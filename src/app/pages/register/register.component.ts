import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
    ) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required]
    },
      { validator: [this.passwordMatchValidator] }
    );
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('passwordConfirm')?.value ? null : { mismatch: true }
  }

  async onSubmit() {
    console.warn(this.registerForm.value);
    const { username, password }: any = this.registerForm.value;
    const register$ = this.userService.register(username, password);
    try {
      const result = await lastValueFrom(register$);
      this.router.navigate(['/login']);
    }
    catch (error) {
      console.error('error: ', error);
    }
  }

}
