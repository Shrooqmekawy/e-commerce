import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const laodscr = inject(NgxSpinnerService);
  if (req.url.includes('cart')) {
    laodscr.hide();
  } else {
    laodscr.show();
  }
  return next(req).pipe(
    finalize(() => {
      laodscr.hide();
    })
  );
};
