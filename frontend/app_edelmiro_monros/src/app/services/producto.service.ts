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

  constructor(private http: HttpClient) {}

  createProducto(producto: Productos): Observable<any> {
    const payload = {
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      stock: producto.stock,
      id_usuario: 1,  // Forzamos el id_usuario a 1 para probar
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

  updateProducto(id: number, producto: Productos): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, producto);
  }
}
