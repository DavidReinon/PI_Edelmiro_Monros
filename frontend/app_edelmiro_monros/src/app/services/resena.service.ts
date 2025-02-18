import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Resena } from '../models/resena.interfaces';





@Injectable({
  providedIn: 'root'
})
export class ResenaService {

  constructor(public http: HttpClient) {}
  public getResena(url: string): Observable<Resena[]> {
      return this.http.get<Resena[]>(url);
    }
}
