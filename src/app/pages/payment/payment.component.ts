import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { AllordersService } from '../../core/services/allorders/allorders.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../core/services/auth/auth.service';
import { TranslatePipe } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-payment',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
})
export class PaymentComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly allordersService = inject(AllordersService);
  private readonly route = inject(Router);
  private readonly toastr = inject(ToastrService);
  private readonly formbuilder = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  cartId: string = '';
  success: string = ' ';
  isLoading: boolean = false;
  checkoutforms!: FormGroup;
  errormsg: string = '';

  ngOnInit(): void {
    this.getID();
    this.formvalue();
  }

  getID(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (param) => {
        this.cartId = param.get('id')!;
      },
    });
  }

  formvalue(): void {
    this.checkoutforms = this.formbuilder.group({
      details: [null],
      phone: [null, [Validators.required]],
      city: [null, [Validators.required]],
    });
  }

  onSubmitcard(): void {
    if (this.checkoutforms.valid) {
      this.allordersService
        .getorder(this.cartId, this.checkoutforms.value)
        .subscribe({
          next: (res) => {
            if (res.status == 'success') {
              setTimeout(() => {
                this.success == res.status;
                open(res.session.url, '_self');
              }, 300);
              console.log(res);
            }
            this.isLoading = false;
            localStorage.setItem('userorders', res.data.user);
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
            this.errormsg = err.error.message;
            this.isLoading = false;
          },
        });
    } else {
      this.checkoutforms.markAllAsTouched();
      this.isLoading = false;
    }
  }

  onSubmitcash(): void {
    if (this.checkoutforms.valid) {
      this.allordersService
        .getOrderCash(this.cartId, this.checkoutforms.value)
        .subscribe({
          next: (res) => {
            if (res.status == 'success') {
              setTimeout(() => {
                this.success == res.status;
                this.toastr.success('Payment successful', 'bazaar');
                this.route.navigate(['./allorders']);
              }, 300);
              localStorage.setItem('userorders', res.data.user);
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
      this.checkoutforms.markAllAsTouched();
      this.isLoading = false;
    }
  }
}
