import { Injectable } from '@angular/core';
import * as L from 'leaflet';  // Importamos Leaflet para trabajar con mapas

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map: L.Map | undefined;

  constructor() {}

  /**
   * Inicializa el mapa de Leaflet con la capa de OpenStreetMap.
   * @param mapElement El elemento HTML donde se va a mostrar el mapa.
   * @param lat Latitud inicial.
   * @param lng Longitud inicial.
   * @param zoom Nivel de zoom inicial.
   */
  initializeMap(mapElement: HTMLElement, lat: number, lng: number, zoom: number): void {
    // Crear el mapa y configurarlo
    this.map = L.map(mapElement).setView([lat, lng], zoom);

    // Añadir la capa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    // Añadir un marcador en la ubicación inicial
    L.marker([lat, lng]).addTo(this.map)
      .bindPopup('Ubicación del Taller')
      .openPopup();
  }

  /**
   * Función para actualizar la ubicación del marcador.
   * @param lat Nueva latitud.
   * @param lng Nueva longitud.
   */
  updateMarker(lat: number, lng: number): void {
    if (this.map) {
      const marker = L.marker([lat, lng]).addTo(this.map);
      marker.bindPopup('Nueva Ubicación').openPopup();
      this.map.setView([lat, lng]);  // Opcional: actualizar vista al nuevo marcador
    }
  }
}
