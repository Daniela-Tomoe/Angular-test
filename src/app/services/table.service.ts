import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/enviroment';
import { IBusiness } from 'src/app/IBusiness';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private baseApiUrl = environment.baseApiUrl

  constructor(
    private http: HttpClient
  ) { }

  getAllData() {
    return this.http.get<IBusiness[]>(this.baseApiUrl)
  }
}
