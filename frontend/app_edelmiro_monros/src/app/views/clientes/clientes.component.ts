import { Component } from '@angular/core';
import { CardClienteComponent } from '../../components/card-cliente/card-cliente.component';
import { RatingStarComponent } from '../../rating-star/rating-star.component';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CardClienteComponent, RatingStarComponent],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {
  // Definir la estructura de los datos con una interfaz opcional
  public personas: { Nombre: string; fecha: Date; comentario: string; valoracion: number }[] = [
    {
      Nombre: 'Juan Pérez',
      fecha: new Date(2005, 4, 12),
      comentario: 'Excelente servicio y atención.',
      valoracion: 3
    },
    {
      Nombre: 'María López',
      fecha: new Date(1998, 10, 25),
      comentario: 'Muy buena experiencia, recomendado.',
      valoracion: 5
    },
    {
      Nombre: 'Carlos Gómez',
      fecha: new Date(2000, 6, 8),
      comentario: 'El servicio fue bueno, pero podría mejorar.',
      valoracion: 4.5
    },
    {
      Nombre: 'Ana Torres',
      fecha: new Date(1995, 1, 15),
      comentario: 'No quedé satisfecha con la atención.',
      valoracion: 2
    }
  ];

  actualizarValoracion(index: number, valor: number) {
    if (index >= 0 && index < this.personas.length) {
      this.personas[index].valoracion = valor;
    } else {
      console.error('Índice fuera de rango');
    }
  }
}
