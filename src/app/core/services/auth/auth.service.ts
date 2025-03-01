import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  private readonly router = inject(Router);
  userToken: string = '';
  sendSignupData(data: object): Observable<any> {
    return this.http.post(`${environment.base_url}/api/v1/auth/signup`, data);
  }
  sendLoginData(data: object): Observable<any> {
    return this.http.post(`${environment.base_url}/api/v1/auth/signin`, data);
  }
  getToken(): void {
    if (localStorage.getItem('userToken') !== null) {
      this.userToken = jwtDecode(localStorage.getItem('userToken')!);
    }
  }

  logout(): void {
    localStorage.removeItem('userToken');
    this.userToken == null;
    this.router.navigate(['/login']);
  }

  // reset password

  verifyemail(data: object): Observable<any> {
    return this.http.post(
      `${environment.base_url}/api/v1/auth/forgotPasswords`,
      data
    );
  }
  verifycode(data: object): Observable<any> {
    return this.http.post(
      `${environment.base_url}/api/v1/auth/verifyResetCode`,
      data
    );
  }
  resetPassword(data: object): Observable<any> {
    return this.http.put(
      `${environment.base_url}/api/v1/auth/resetPassword`,
      data
    );
  }
}
