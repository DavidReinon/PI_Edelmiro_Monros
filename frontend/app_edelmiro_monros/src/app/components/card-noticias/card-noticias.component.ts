import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-noticias',
  standalone: true,
  imports: [],
  templateUrl: './card-noticias.component.html',
  styleUrl: './card-noticias.component.css'
})
export class CardNoticiasComponent {
  @Input() titulo: string = '';
  @Input() descripcion: string = '';
  @Input() fecha: Date = new Date();
  @Input() foto: string | null = null;

  formatearFecha(fecha: Date): string {
    return fecha.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
