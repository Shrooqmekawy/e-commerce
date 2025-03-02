import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((err) => {
      // if (!req.url.includes('cart') && !req.url.includes('wishlist')) {
      //   toastr.error(err.error.message, 'bazaar');
      // }
      toastr.error(err.error.message, 'bazaar');
      return throwError(() => err);
    })
  );
};
