import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NoticiasStateService } from '../../services/noticias-state.service';
import { Noticias } from '../../models/noticias.interfaces';

@Component({
  selector: 'app-card-noticias',
  standalone: true,
  imports: [],
  templateUrl: './card-noticias.component.html',
  styleUrl: './card-noticias.component.css'
})
export class CardNoticiasComponent {
  constructor(private router: Router, public service: NoticiasStateService) { }

  public apiUrl: string = 'http://127.0.0.1:8000';
  @Input() titulo: string = '';
  @Input() descripcion: string = '';
  @Input() fecha: string = '';
  @Input() foto: string | null = null;
  @Input() id: string | undefined = '';
  @Input() usuario: string = '';
  @Output() onEliminar = new EventEmitter<void>();

  public editarNoticia(noticia: Noticias): void {
    this.router.navigate(['/noticias/editar/']);
    this.service.setNoticia(noticia);
  }

  public eliminarNoticia(): void {
    this.onEliminar.emit();
  }

  public formatearFecha(fechaString: string): string {
    const fecha = new Date(fechaString.split(" ")[0]);
    const opciones: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric"
    };

    return fecha.toLocaleDateString("es-ES", opciones);
  }
}
