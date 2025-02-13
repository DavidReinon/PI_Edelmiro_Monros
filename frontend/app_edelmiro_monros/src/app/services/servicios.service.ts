import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  constructor(public http: HttpClient) { }
  public getResponse(url: string): Observable<Response[]> {
    return this.http.get<Response[]>(url);
    }
}
