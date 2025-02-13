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
    public postResponse(url: string, data: any): Observable<Response> {
      return this.http.post<Response>(url, data);
    }
    public putResponse(url: string, id: number, data: any): Observable<Response> {
      return this.http.put<Response>(`${url}/${id}`, data);
    }  
    public patchResponse(url: string, id: number, data: any): Observable<Response> {
      return this.http.patch<Response>(`${url}/${id}`, data);
    }  
    public deleteResponse(url: string, id: number): Observable<void> {
      return this.http.delete<void>(`${url}/${id}`);
    }

}
