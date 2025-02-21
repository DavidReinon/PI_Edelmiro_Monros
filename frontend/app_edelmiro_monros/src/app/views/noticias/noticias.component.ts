import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CardNoticiasComponent } from '../../components/card-noticias/card-noticias.component';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { NoticiasService } from '../../services/noticias.service';
import { Noticias } from '../../models/noticias.interfaces';
import { CommonModule } from '@angular/common';

interface Noticia {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: Date;
  foto: string | null;
}

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [CardNoticiasComponent, CommonModule],
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.css',
})

export class NoticiasComponent {
  public isAdmin$!: Observable<boolean>;
  public noticias: Noticias[] = []

  constructor(private router: Router, private authService: AuthService, public service: NoticiasService) {
    this.isAdmin$ = this.authService.isAdmin$;
  }

  public getNoticias(): void {
    this.noticias = []
    this.service.getNoticias().subscribe((response) => {
      this.noticias = response
    });
  }

  ngOnInit() {
    this.getNoticias();
    this.isAdmin$ = this.authService.isAdmin$;
    this.isAdmin$.subscribe(isAdmin => {
      console.log('isAdmin:', isAdmin);
    });
  }

  agregarNoticia() {
    this.router.navigate(['/noticias/crear']);
  }

  public eliminarNoticia(id: string): void {
    this.service.deleteNoticia(id).subscribe(() => {
      this.noticias = this.noticias.filter(noticia => noticia.id !== id);
    });
  }
}
