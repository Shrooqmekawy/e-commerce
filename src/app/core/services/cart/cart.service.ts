import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}
  mytoken: any = localStorage.getItem('userToken');
  cartItemCount: WritableSignal<number> = signal(0);

  postCartItems(id: string): Observable<any> {
    return this.http.post(`${environment.base_url}/api/v1/cart`, {
      productId: id,
    });
  }
  getCartItems(): Observable<any> {
    return this.http.get(`${environment.base_url}/api/v1/cart`);
  }

  removeCartItems(id: string): Observable<any> {
    return this.http.delete(`${environment.base_url}/api/v1/cart/${id}`);
  }
  updateCartItem(id: string, count: number): Observable<any> {
    return this.http.put(`${environment.base_url}/api/v1/cart/${id}`, {
      count: count,
    });
  }
  clearCartItems(): Observable<any> {
    return this.http.delete(`${environment.base_url}/api/v1/cart`);
  }
}
