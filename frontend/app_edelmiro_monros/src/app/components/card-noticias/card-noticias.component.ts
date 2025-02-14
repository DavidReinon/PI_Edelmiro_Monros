import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

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
  @Input() isAdmin: boolean = false;
  @Output() onEliminar = new EventEmitter<void>();

  constructor(private router: Router) {}

  editarNoticia() {
    this.router.navigate(['/noticias/editar']);
  }

  eliminarNoticia() {
    this.onEliminar.emit();
  }

  formatearFecha(fecha: Date): string {
    return fecha.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
