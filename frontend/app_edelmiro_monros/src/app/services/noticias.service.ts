import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  private apiUrl = 'http://127.0.0.1:8000/api/noticias';

  constructor(private http: HttpClient) {}

  crearNoticia(formData: FormData) {
    return this.http.post(this.apiUrl, formData); 
  }
}
