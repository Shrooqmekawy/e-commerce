import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AllordersService {
  constructor(private http: HttpClient) {}
  mytoken: any = localStorage.getItem('userToken');

  // visa
  getorder(id: string, data: any): Observable<any> {
    return this.http.post(
      `${environment.base_url}/api/v1/orders/checkout-session/${id}?url=${window.location.origin}`,
      {
        shippingAddress: data,
      }
    );
  }

  // cash
  getOrderCash(id: string, data: any): Observable<any> {
    return this.http.post(
      `${environment.base_url}/api/v1/orders/${id}`,

      {
        shippingAddress: data,
      }
    );
  }

  // user order
  getOrderAfterPyment(id: string): Observable<any> {
    return this.http.get(`${environment.base_url}/api/v1/orders/user/${id}`);
  }
}
