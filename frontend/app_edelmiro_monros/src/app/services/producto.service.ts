import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Productos } from '../models/productos.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private apiUrl = 'http://44.214.111.49/api/productos';

  constructor(private http: HttpClient) {}

  createProducto(productoData: Productos): Observable<Productos> {
    return this.http.post<Productos>(this.apiUrl, productoData);
  }

  getProductos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getProductoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateProducto(id: number, productoData: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, productoData);
  }

  deleteProducto(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
