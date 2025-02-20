import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Noticias } from '../models/noticias.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  private apiUrl = 'http://127.0.0.1:8000/api/noticias';
  /* private apiUrl = 'http://44.214.111.49/api/noticias'; */

  constructor(private http: HttpClient) { }

  public postNoticia(noticia: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<Noticias>(this.apiUrl, JSON.stringify(noticia));
  }

  public getNoticias(): Observable<Noticias[]> {
    return this.http.get<Noticias[]>(this.apiUrl);
  }

  public putNoticia(id: string, noticia: Noticias): Observable<Noticias> {
    return this.http.put<Noticias>(`${this.apiUrl}/${id}`, noticia);
  }

  public patchNoticia(id: string, noticia: Partial<Noticias>): Observable<Noticias> {
    return this.http.patch<Noticias>(`${this.apiUrl}/${id}`, noticia);
  }

  public deleteNoticia(id: string | undefined): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
