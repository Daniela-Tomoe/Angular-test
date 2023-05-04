import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {
  private apiUrl = environment.baseApiUrl

  constructor(
    private http: HttpClient
  ) { }

  getItem(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`
    return this.http.get<any>(url)
  }

  updateItem(id: number, data: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`
    return this.http.put<any>(url, data)
  }
}
