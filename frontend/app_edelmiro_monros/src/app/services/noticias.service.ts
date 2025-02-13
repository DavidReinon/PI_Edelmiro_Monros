import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {
  private apiUrl = 'http://127.0.0.1:8000/api/noticias';  // Cambia esta URL a la de tu API Symfony

  constructor(private http: HttpClient) {}

  crearNoticia(noticiaData: any): Observable<any> {
    const formData = new FormData();
    formData.append('titulo', noticiaData.titulo);
    formData.append('descripcion', noticiaData.descripcion);
    formData.append('fecha', noticiaData.fecha);
    formData.append('foto', noticiaData.foto);

    return this.http.post(this.apiUrl, formData, {
      headers: new HttpHeaders(),
    });
  }
}
