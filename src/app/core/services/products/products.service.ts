import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get(`${environment.base_url}/api/v1/products`);
  }
  getSpecificProducts(id: string): Observable<any> {
    return this.http.get(`${environment.base_url}/api/v1/products/${id}`);
  }
}
