import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  private apiUrl = 'http://44.214.111.49/api/noticias';

  constructor(private http: HttpClient) { }

  crearNoticia(noticia: any) {
    console.log(JSON.stringify(noticia))
    const headers = new HttpHeaders({
      'Content-Type': 'application/ld+json' 
    });
    return this.http.post(this.apiUrl, JSON.stringify(noticia), { headers });
  }
}
