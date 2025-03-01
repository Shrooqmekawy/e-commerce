import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslatePipe } from '@ngx-translate/core';
import { ChangetypepassDirective } from '../../shared/directives/show/changetypepass.directive';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgetpassword',
  imports: [ReactiveFormsModule, TranslatePipe, ChangetypepassDirective],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss',
})
export class ForgetpasswordComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);
  statue: string = '';

  step: number = 1;

  verify_email: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required]),
  });
  verify_code: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^\w{6,}$/),
    ]),
  });
  reset_password: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),

    newPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z]\w{6,}$/),
    ]),
  });

  // logic

  verifyemail(): void {
    let emailvalue = this.verify_email.get('email')?.value;
    this.reset_password.get('email')?.patchValue(emailvalue);

    this.auth.verifyemail(this.verify_email.value).subscribe({
      next: (res) => {
        if (res.statusMsg === 'success') {
          this.step = 2;
        }
      },
      // error: (err: HttpErrorResponse) => {
      //   console.log(err);
      //   this.statue = err.error.message || 'email is not found';
      // },
    });
  }
  verifyCode(): void {
    this.auth.verifycode(this.verify_code.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'Success') {
          this.step = 3;
        }
      },
    });
  }
  resetPassword(): void {
    this.auth.resetPassword(this.reset_password.value).subscribe({
      next: (res) => {
        localStorage.setItem('userToken', res.token);
        this.router.navigate(['/login']);
        this.toastr.success(res.message, 'bazaar');
        this.auth.getToken();
      },
    });
  }
}
