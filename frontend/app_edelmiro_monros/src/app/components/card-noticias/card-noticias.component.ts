import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-noticias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-noticias.component.html',
  styleUrl: './card-noticias.component.css',
})
export class CardNoticiasComponent {
  public isAdmin$!: Observable<boolean>;

  constructor(private router: Router, private authService: AuthService) {}

  @Input() titulo: string = '';
  @Input() descripcion: string = '';
  @Input() fecha: Date = new Date();
  @Input() foto: string | null = null;
  @Output() onEliminar = new EventEmitter<void>();

  ngOnInit() {
    this.isAdmin$ = this.authService.isAdmin$;
    this.isAdmin$.subscribe((isAdmin) => {
      console.log('isAdmin:', isAdmin);
    });
  }

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
      day: 'numeric',
    });
  }
}
