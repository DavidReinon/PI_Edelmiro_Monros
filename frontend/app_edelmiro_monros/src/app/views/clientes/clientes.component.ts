import { Component } from '@angular/core';
import { CardClienteComponent } from '../../components/card-cliente/card-cliente.component';
import { RatingStarComponent } from '../../rating-star/rating-star.component';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CardClienteComponent,],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {


  public personas: { Nombre: string; fecha: string; comentario: string; valoracion: number }[] = [
    {
      Nombre: 'Juan Pérez',
      fecha: '12/05/2005',
      comentario: 'Excelente servicio y atención.',
      valoracion: 3
    },
    {
      Nombre: 'María López',
      fecha: '19/03/1999',
      comentario: 'Muy buena experiencia, recomendado.Muy buena experiencia, recomendadoMuy buena experiencia, recomendadoMuy buena experiencia, recomendadoMuy buena experiencia, recomendadoMuy buena experiencia, recomendadoMuy buena experiencia, recomendadoMuy buena experiencia, recomendadoMuy buena experiencia, recomendadoMuy buena experiencia, recomendadoMuy buena experiencia, recomendadoMuy buena experiencia, recomendadoMuy buena experiencia, recomendadoMuy buena experiencia, recomendadoMuy buena experiencia, recomendadoMuy buena experiencia, recomendadoMuy buena experiencia, recomendadoMuy buena experiencia, recomendadoMuy buena experiencia, recomendado',
      valoracion: 5
    },
    {
      Nombre: 'Carlos Gómez',
      fecha:  '08/06/2000' ,
      comentario: 'El servicio fue bueno, pero podría mejorar.',
      valoracion: 4.5
    },
    {
      Nombre: 'Ana Torres',
      fecha: '15/01/1995',
      comentario: 'No quedé satisfecha con la atención.',
      valoracion: 2
    }
  ];

  actualizarValoracion(index: number, valor: number) {
    if (index >= 0 && index < this.personas.length) {
      this.personas[index].valoracion = valor;
    } 
  }

}
