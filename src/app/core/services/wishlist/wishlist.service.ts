import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  constructor(private http: HttpClient) {}
  numOfWishlistItem: WritableSignal<number> = signal(0);

  postFavItem(id: string): Observable<any> {
    return this.http.post(`${environment.base_url}/api/v1/wishlist`, {
      productId: id,
    });
  }

  getFavItems(): Observable<any> {
    return this.http.get(`${environment.base_url}/api/v1/wishlist`);
  }
  removefavItem(id: string): Observable<any> {
    return this.http.delete(`${environment.base_url}/api/v1/wishlist/${id}`);
  }

  // change icon
}
