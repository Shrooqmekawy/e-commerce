import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}
  getCategory(): Observable<any> {
    return this.http.get(`${environment.base_url}/api/v1/categories`);
  }
  getSpecificCategory(id: string): Observable<any> {
    return this.http.get(`${environment.base_url}/api/v1/categories/${id}`);
  }
}
