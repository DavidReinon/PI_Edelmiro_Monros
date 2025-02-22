import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NoticiasStateService } from '../../services/noticias-state.service';
import { Noticias } from '../../models/noticias.interfaces';
import { NoticiasService } from '../../services/noticias.service';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-card-noticias',
  standalone: true,
  imports: [CommonModule, ConfirmModalComponent],
  templateUrl: './card-noticias.component.html',
  styleUrl: './card-noticias.component.css',
})
export class CardNoticiasComponent {
  constructor(private router: Router,
    public stateService: NoticiasStateService,
    public service: NoticiasService,
    private authService: AuthService
  ) { }

  public isAdmin$!: Observable<boolean>;
  showConfirmModal: boolean = false;

  public apiUrl: string = 'http://44.214.111.49' /* 'http://127.0.0.1:8000' */;
  @Input() titulo: string = '';
  @Input() descripcion: string = '';
  @Input() fecha: string = '';
  @Input() foto: string | null | undefined = null;
  @Input() id: string | undefined = '';
  @Input() usuario: string = '';
  @Output() onEliminar = new EventEmitter<string>();

  public editarNoticia(noticia: Noticias): void {
    this.router.navigate(['/noticias/editar/']);
    this.stateService.setNoticia(noticia);
  }

  public eliminarNoticia(id: string | undefined): void {
    this.service.deleteNoticia(id)
    this.onEliminar.emit(id)
    this.showConfirmModal = false;
    this.router.navigate(['/noticias/']);
  }

  public confirmarEliminar() {
    this.showConfirmModal = true;
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


  ngOnInit() {
    this.isAdmin$ = this.authService.isAdmin$;
    this.isAdmin$.subscribe((isAdmin) => {
      console.log('isAdmin:', isAdmin);
    });
  }



  public cancelarEliminar() {
    this.showConfirmModal = false;
  }

}
