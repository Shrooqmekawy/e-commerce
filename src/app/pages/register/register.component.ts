import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { ChangetypepassDirective } from '../../shared/directives/show/changetypepass.directive';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    ChangetypepassDirective,
    RouterLink,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  // inject service
  private readonly authservice = inject(AuthService);
  private readonly router = inject(Router);
  private readonly formbuilder = inject(FormBuilder);

  isLoading: boolean = false;
  errormsg!: string;
  successmsg: string = '';

  // form group
  register = this.formbuilder.group(
    {
      name: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [Validators.required, Validators.pattern(/^[A-Z]\w{6,}$/)],
      ],
      rePassword: [null, Validators.required],
      phone: [
        null,
        [Validators.required, Validators.pattern(/^01(0|1|2|5)[0-9]{8}/)],
      ],
    },
    this.repassValid
  );

  // send data by auth sevice
  submitForm(): void {
    this.isLoading = true;
    if (this.register.valid) {
      this.authservice.sendSignupData(this.register.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message === 'success') {
            this.successmsg = res.message;
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 500);
          }
          this.isLoading = false;
        },
      });
    } else {
      this.isLoading = false;
      this.register.markAllAsTouched();
    }
  }

  // validation style

  // confirm password
  repassValid(repass: AbstractControl) {
    let password = repass.get('password')?.value;
    let repassword = repass.get('rePassword')?.value;

    return password === repassword ? null : { mismatch: true };
  }
}
