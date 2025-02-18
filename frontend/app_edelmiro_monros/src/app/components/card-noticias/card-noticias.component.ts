import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
<<<<<<< HEAD
import { AuthService } from '../../services/auth.service';
=======
import { Auth } from '../../services/auth.service';
>>>>>>> 97f87e0fcc1f141f8efd3939d9cdff4680eee7c7
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

<<<<<<< HEAD
  constructor(private router: Router, private authService: AuthService) {}
=======
  constructor(private router: Router, private authService: Auth) {}
>>>>>>> 97f87e0fcc1f141f8efd3939d9cdff4680eee7c7

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
