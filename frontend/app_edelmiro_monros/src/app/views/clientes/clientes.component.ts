import { Component } from '@angular/core';
import { CardClienteComponent } from '../../components/card-cliente/card-cliente.component';

@Component({
  selector: 'app-clientes',
  imports: [CardClienteComponent],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {
  public photo: string = '';
  public Nombre: string = '';
  public fecha: Date = new Date(2005, 4, 12);
  public comentario: string = 'This is a description';
  public valoracion: number = 5;


}
