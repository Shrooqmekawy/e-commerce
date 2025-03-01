import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ChangetypepassDirective } from '../../shared/directives/show/changetypepass.directive';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    TranslatePipe,
    ChangetypepassDirective,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  // inject service
  private readonly authservice = inject(AuthService);
  private readonly router = inject(Router);

  isLoading: boolean = false;
  errormsg!: string;
  successmsg: string = '';

  // inputs-value-tide it with VALIDATOR
  login: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z]\w{6,}$/),
    ]),
  });

  // send data by auth sevice
  submitForm(): void {
    this.isLoading = true;
    if (this.login.valid) {
      this.authservice.sendLoginData(this.login.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message === 'success') {
            this.successmsg = res.message;

            setTimeout(() => {
              this.router.navigate(['/welcome']);
              localStorage.setItem('userToken', res.token);
              this.authservice.getToken();
            }, 3000);
          }
          this.isLoading = false;
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          this.errormsg = err.error.message;
          this.isLoading = false;
        },
      });
    } else {
      this.login.markAllAsTouched();
      this.isLoading = false;
    }
  }
}
