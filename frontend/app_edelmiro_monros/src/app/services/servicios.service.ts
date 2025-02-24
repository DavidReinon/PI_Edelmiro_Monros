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
  
  public getProductos(url: string): Observable<Productos[]> {
    return this.http.get<Productos[]>(url);

  }
  public getResena(url: string): Observable<Resena[]> {
    return this.http.get<Resena[]>(url);

  }
  public getUsuario(url: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(url);

  }

  public postProducto(url: string, producto: Productos): Observable<Productos> {
    return this.http.post<Productos>(url, producto);
  }

  public postUsuario(url: string, usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(url, usuario);
  }

  public putProducto(url: string, id: number, producto: Productos): Observable<Productos> {
    return this.http.put<Productos>(`${url}/${id}`, producto);
  }


  public putUsuario(url: string, id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${url}/${id}`, usuario);
  }

  public patchProducto(url: string, id: number, producto: Partial<Productos>): Observable<Productos> {
    return this.http.patch<Productos>(`${url}/${id}`, producto);
  }


  public patchUsuario(url: string, id: number, usuario: Partial<Usuario>): Observable<Usuario> {
    return this.http.patch<Usuario>(`${url}/${id}`, usuario);
  }

  public deleteProducto(url: string, id: number): Observable<void> {
    return this.http.delete<void>(`${url}/${id}`);
  }


  public deleteUsuario(url: string, id: number): Observable<void> {
    return this.http.delete<void>(`${url}/${id}`);
  }

}
