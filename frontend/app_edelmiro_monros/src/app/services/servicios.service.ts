import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Noticias } from '../models/noticias.interfaces';
import { Resena } from '../models/resena.interfaces';
import { Productos } from '../models/productos.interfaces';
import { Usuario } from '../models/usuario.interfaz';


@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  constructor(public http: HttpClient) { }
  public getNoticias(url: string): Observable<Noticias[]> {
    return this.http.get<Noticias[]>(url);

    }
    public getProductos(url: string): Observable<Productos[]> {
      return this.http.get<Productos[]>(url);
  
      }
      public getResena(url: string): Observable<Resena[]> {
        return this.http.get<Resena[]>(url);
    
        }
        public getUsuario(url: string): Observable<Usuario[]> {
          return this.http.get<Usuario[]>(url);
      
          }
          public postNoticia(url: string, noticia: Noticias): Observable<Noticias> {
            return this.http.post<Noticias>(url, noticia);
          }
        
          public postProducto(url: string, producto: Productos): Observable<Productos> {
            return this.http.post<Productos>(url, producto);
          }
        
          public postResena(url: string, resena: Resena): Observable<Resena> {
            return this.http.post<Resena>(url, resena);
          }
        
          public postUsuario(url: string, usuario: Usuario): Observable<Usuario> {
            return this.http.post<Usuario>(url, usuario);
          }
        
          
          public putNoticia(url: string, id: number, noticia: Noticias): Observable<Noticias> {
            return this.http.put<Noticias>(`${url}/${id}`, noticia);
          }
        
          public putProducto(url: string, id: number, producto: Productos): Observable<Productos> {
            return this.http.put<Productos>(`${url}/${id}`, producto);
          }
        
          public putResena(url: string, id: number, resena: Resena): Observable<Resena> {
            return this.http.put<Resena>(`${url}/${id}`, resena);
          }
        
          public putUsuario(url: string, id: number, usuario: Usuario): Observable<Usuario> {
            return this.http.put<Usuario>(`${url}/${id}`, usuario);
          }
        
          
          public patchNoticia(url: string, id: number, noticia: Partial<Noticias>): Observable<Noticias> {
            return this.http.patch<Noticias>(`${url}/${id}`, noticia);
          }
        
          public patchProducto(url: string, id: number, producto: Partial<Productos>): Observable<Productos> {
            return this.http.patch<Productos>(`${url}/${id}`, producto);
          }
        
          public patchResena(url: string, id: number, resena: Partial<Resena>): Observable<Resena> {
            return this.http.patch<Resena>(`${url}/${id}`, resena);
          }
        
          public patchUsuario(url: string, id: number, usuario: Partial<Usuario>): Observable<Usuario> {
            return this.http.patch<Usuario>(`${url}/${id}`, usuario);
          }
        
          
          public deleteNoticia(url: string, id: number): Observable<void> {
            return this.http.delete<void>(`${url}/${id}`);
          }
        
          public deleteProducto(url: string, id: number): Observable<void> {
            return this.http.delete<void>(`${url}/${id}`);
          }
        
          public deleteResena(url: string, id: number): Observable<void> {
            return this.http.delete<void>(`${url}/${id}`);
          }
        
          public deleteUsuario(url: string, id: number): Observable<void> {
            return this.http.delete<void>(`${url}/${id}`);
          }

}
