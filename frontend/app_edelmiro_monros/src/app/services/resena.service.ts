import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Resena } from '../models/resena.interfaces';





@Injectable({
  providedIn: 'root'
})
export class ResenaService {
  public apiUrl = 'http://44.214.111.49/api/resenas'
  constructor(public http: HttpClient) { }
  public getResena(): Observable<Resena> {
    return this.http.get<Resena>(this.apiUrl);
  }
}
