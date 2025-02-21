import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from './loading.service';
import { firstValueFrom, Observable } from 'rxjs';
import { Productos } from '../models/productos.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private apiUrl = 'http://44.214.111.49/api/productos';

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService
  ) {}

  async createProducto(producto: Productos): Promise<any> {
    try {
      this.loadingService.show();
      // Convertir el Observable a Promise
      return await firstValueFrom(
        this.http.post<Productos>(this.apiUrl, producto)
      );
    } finally {
      this.loadingService.hide();
    }
  }

  getProductos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getProductoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  async updateProducto(id: number, productoData: FormData): Promise<any> {
    try {
      this.loadingService.show();
      return await firstValueFrom(
        this.http.put<any>(`${this.apiUrl}/${id}`, productoData)
      );
    } finally {
      this.loadingService.hide();
    }
  }

  async deleteProducto(id: number): Promise<any> {
    try {
      this.loadingService.show();
      return await firstValueFrom(
        this.http.delete<any>(`${this.apiUrl}/${id}`)
      );
    } finally {
      this.loadingService.hide();
    }
  }
}
