import { Component } from '@angular/core';
import { format, parse } from "@formkit/tempo";
import { CardClienteComponent } from '../../components/card-cliente/card-cliente.component';
import { ResenaService } from '../../services/resena.service';
import { Member } from '../../models/resena.interfaces';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CardClienteComponent],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {
  public constructor(public service: ResenaService) {}

  public personas: Member[] = [];
  public vista: number = 8; 

  public getResena(): void {
    this.service.getResena().subscribe((response) => {
      this.personas = response.member.map(persona => ({
        ...persona,
        fecha: this.formatFecha(persona.fecha) 
      }));
      console.log(this.personas);
    });
  }

  public ngOnInit(): void {
    this.getResena();
  }

  

  actualizarValoracion(index: number, valor: number): void {
    if (index >= 0 && index < this.personas.length) {
      this.personas = this.personas.map((persona, i) =>
        i === index ? { ...persona, valoracion: valor } : persona
      );
    }
  }


  
  private formatFecha(fecha: string): string {
    const parsedDate = parse(fecha, 'YYYY-MM-DD');
    return format(parsedDate, 'DD/MM/YYYY');
  }
}
