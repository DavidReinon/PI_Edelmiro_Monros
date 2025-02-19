import { Component } from '@angular/core';
import { format, parse } from "@formkit/tempo";
import { CardClienteComponent } from '../../components/card-cliente/card-cliente.component';
import { ResenaService } from '../../services/resena.service';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CardClienteComponent],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {
  public constructor(public service: ResenaService) {}
  public personas: { Nombre: string; fecha: string; comentario: string; valoracion: number }[] = [
    {
      Nombre: 'Juan Pérez',
      fecha: this.formatFecha('2009-05-12'),
      comentario: 'Excelente servicio y atención.',
      valoracion: 3
    },
    {
      Nombre: 'María López',
      fecha: this.formatFecha('1999-03-19'),
      comentario: 'Muy buena experiencia, recomendado.',
      valoracion: 5
    },
    {
      Nombre: 'Carlos Gómez',
      fecha: this.formatFecha('2000-06-08'),
      comentario: 'El servicio fue bueno, pero podría mejorar.',
      valoracion: 4.5
    },
    {
      Nombre: 'Ana Torres',
      fecha: this.formatFecha('1995-01-15'),
      comentario: 'No quedé satisfecha con la atención.',
      valoracion: 2
    }
  ];
  public getResena(url: string): void {
    this.service.getResena(url).subscribe((response) => {
      console.log(response);

    });
  }
  public ngOnInit(): void {
    this.getResena('http://44.214.111.49/api/resena');
  }
  

  actualizarValoracion(index: number, valor: number) {
    if (index >= 0 && index < this.personas.length) {
      this.personas[index].valoracion = valor;
    }
  }

  private formatFecha(fecha: string): string {
    const parsedDate = parse(fecha, 'YYYY-MM-DD');
    return format(parsedDate, 'DD/MM/YYYY');
  }
}
