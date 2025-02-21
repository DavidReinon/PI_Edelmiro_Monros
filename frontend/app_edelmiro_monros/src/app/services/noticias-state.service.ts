import { Injectable } from '@angular/core';
import { Noticias } from '../models/noticias.interfaces';

@Injectable({
  providedIn: 'root'
})
export class NoticiasStateService {
  private noticiaSeleccionada: Noticias = {
    titulo: 'Noticia Nueva',
    descripcion: 'Descripción Noticia Nueva',
    fecha: '01-01-2025',
    usuario: '1',
    foto: 'ruta/por/defecto/imagen.jpg'
  };

  setNoticia(noticia: Noticias): void {
    this.noticiaSeleccionada = noticia;
  }

  getNoticia(): Noticias {
    return this.noticiaSeleccionada;
  }

  clearNoticia(): void {
    this.noticiaSeleccionada = {
      titulo: 'Noticia Nueva',
      descripcion: 'Descripción Noticia Nueva',
      fecha: '01-01-2025',
      usuario: '1',
      foto: 'ruta/por/defecto/imagen.jpg'
    };;
  }
}
