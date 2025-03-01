import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  constructor(private http: HttpClient) {}
  getBrandData(): Observable<any> {
    return this.http.get(`${environment.base_url}/api/v1/brands`);
  }
}
