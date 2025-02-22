import { Injectable } from '@angular/core';
import { Productos } from '../models/productos.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductosStateService {
  private productoSeleccionado: Productos = {
    nombre: 'Noticia Nueva',
    descripcion: 'Descripción Noticia Nueva',
    precio: 0,
    stock: 0,
    usuario: 1,
    foto: 'ruta/por/defecto/imagen.jpg'
  };

  setProducto(producto: Productos): void {
    this.productoSeleccionado = producto;
  }

  getProducto(): Productos {
    return this.productoSeleccionado;
  }

  clearProducto(): void {
    this.productoSeleccionado = {
      nombre: 'Producto Nueva',
      descripcion: 'Descripción Producto Nueva',
      precio: 0,
      stock: 0,
      usuario: 1,
      foto: 'ruta/por/defecto/imagen.jpg'
    };;
  }
}

