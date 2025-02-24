import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Productos } from '../models/productos.interfaces';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'http://44.214.111.49/api/productos'; // URL de tu API
  /* private apiUrl = 'http://127.0.0.1:8000/api/productos'; */

  constructor(private http: HttpClient) { }

  public createProducto(producto: Productos): Observable<any> {
    const payload = {
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      stock: producto.stock,
      usuario: 1,  // Forzamos el id_usuario a 1 para probar
      foto: producto.foto
    };

    console.log('Payload enviado al servidor:', payload);

    return this.http.post(this.apiUrl, payload).pipe(
      tap(response => console.log('Respuesta del servidor:', response)),
      catchError(error => {
        console.log('Error completo:', error);
        console.log('Cuerpo del error:', error.error);
        throw error;
      })
    );
  }

  getProductos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  deleteProducto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  putProducto(id: number | undefined, producto: Productos): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, producto);
  }

  patchProducto(id: number | undefined, producto: Partial<Productos>): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, producto);
  }
}
