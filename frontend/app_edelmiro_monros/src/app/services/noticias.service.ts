import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Noticias } from '../models/noticias.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  private apiUrl = 'http://127.0.0.1:8000/api/noticias';

  constructor(private http: HttpClient) { }

  /* public postNoticia(url: string, noticia: Noticias): Observable<Noticias> {
    return this.http.post<Noticias>(url, noticia);
  } */

  public postNoticia(noticia: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<Noticias>(this.apiUrl, JSON.stringify(noticia));
  }

  public getNoticias(): Observable<Noticias[]> {
    return this.http.get<Noticias[]>(this.apiUrl);
  }

  public putNoticia(id: number, noticia: Noticias): Observable<Noticias> {
    return this.http.put<Noticias>(`${this.apiUrl}/${id}`, noticia);
  }

  public patchNoticia(id: number, noticia: Partial<Noticias>): Observable<Noticias> {
    return this.http.patch<Noticias>(`${this.apiUrl}/${id}`, noticia);
  }

  public deleteNoticia(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
