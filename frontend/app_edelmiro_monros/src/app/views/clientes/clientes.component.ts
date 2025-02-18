import { Component } from '@angular/core';
import { CardClienteComponent } from '../../components/card-cliente/card-cliente.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes',
  imports: [CardClienteComponent],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {
  public photo: string = 'https://frutasolivar.com/wp-content/uploads/2019/02/rawpixel-603025-unsplash-e1579691765526.jpg';
  public Nombre: string = 'Juan Pérez';
  public fecha: Date = new Date(2005, 4, 12);
  public comentario: string = 'Excelente servicio y atención.';
  public valoracion: number = 5;
}
